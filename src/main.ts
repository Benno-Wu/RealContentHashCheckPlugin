import type { Compiler } from "webpack";

// copy from webpack 25f937cf08438e972787e75e0e1479f707212e69 lib\optimize\RealContentHashPlugin.js
const PROCESS_ASSETS_STAGE_SUMMARIZE = 1000
const quoteMeta = (str: string) => str.replace(/[-[\]\\/{}()*+?.^$|]/g, "\\$&");

const addToList = (itemOrItems: string | string[], list: Set<string>) => {
    if (Array.isArray(itemOrItems)) {
        for (const item of itemOrItems) {
            list.add(item)
        }
    } else if (itemOrItems) {
        list.add(itemOrItems)
    }
}

const debug = process.env.debug
const disable = process.env.DisableRealContentHashCheckPlugin

const toStringTag = Object.prototype.toString.call.bind(Object.prototype.toString)

const log = (...a: unknown[]) => {
    debug && console.log('RealContentHashCheckPlugin:', ...a)
}

interface Config {
    extensions?: string[]
    excludes?: (string | RegExp)[]
}
export class RealContentHashCheckPlugin {
    config: Config = {
        extensions: ['.js', '.css'],
        excludes: ['runtime'],
    }
    constructor(config: Config) {
        this.config = { ...this.config, ...config };
    }

    apply(compiler: Compiler) {
        if (compiler.options.target === 'node') return
        compiler.hooks.compilation.tap("RealContentHashCheckPlugin", compilation => {
            compilation.hooks.processAssets.tapPromise(
                {
                    name: "RealContentHashCheckPlugin",
                    stage: PROCESS_ASSETS_STAGE_SUMMARIZE
                }, async () => {
                    const assets = compilation.getAssets()
                    const jsCss = assets.filter(a => this.config.extensions?.some(ext => a.name.endsWith(ext)))
                    const hashes = new Set<string>()
                    jsCss.forEach(asset => { addToList(asset.info.contenthash ?? [], hashes) })
                    const fullLength = hashes.size
                    const regexp = new RegExp(
                        Array.from(hashes, quoteMeta).join("|"),
                        "g"
                    );
                    log(`hashes ${Array.from(hashes)}`)
                    const wrongAssets: { name: string; matches: string }[] = []
                    jsCss.forEach(asset => {
                        const source = asset.source.source();
                        if (asset.info.contenthash) {
                            log(`${asset.name} has contenthash ${(asset.info.contenthash)}`)
                            log(`${asset.name} with sourceTag ${toStringTag(source)}, hashTag ${toStringTag(asset.info.contenthash)}`)
                        }
                        if (typeof source === 'string' && regexp.test(source)) {
                            log(asset.name, asset.info.contenthash, typeof source, regexp.test(source))
                            const matches = Array.from(new Set(source.match(regexp)))
                            const matchesLength = matches.length
                            const hash = asset.info.contenthash
                            const hash2array = Array.isArray(hash) ? hash : [hash]
                            if (this.config.excludes?.some(str => {
                                if (typeof str === 'string') {
                                    return asset.name.includes(str)
                                } else {
                                    return str.test(asset.name)
                                }
                            })) {
                                log(`${asset.name} is skipping check`)
                            } else if (matchesLength == hash2array.length) {
                                if (matches.some(ch => !hash2array.includes(ch))) {
                                    log(`${asset.name} with hashes ${hash} matches ${matches} `)
                                    wrongAssets.push({ name: asset.name, matches: matches.join(', ') })
                                } else {
                                    log(`${asset.name} contenthash should only matched one and the same as ${Array.from(matches)}`)
                                }
                            } else if (matchesLength !== fullLength) {
                                wrongAssets.push({ name: asset.name, matches: matches.join(', ') })
                            }
                        }
                    })
                    if (wrongAssets.length > 0) {
                        console.log('RealContentHashCheckPlugin detected wrong assets:')
                        console.table(wrongAssets)
                        if (!disable) {
                            throw new Error(
                                `RealContentHashCheckPlugin: Detected contenthash collision during building.\n` +
                                `Possible hash collision or incorrect contenthash usage.\n` +
                                `Solution: change the sourcecode which has hash collision is the fast way`
                            )
                        }
                    }
                })
        })
    }
}
