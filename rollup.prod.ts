const pkg = require("./package.json")
const del = require("rollup-plugin-delete").default
const ts = require("@rollup/plugin-typescript")

export default [{// for umd publish
    input: './src/main.ts',
    output: {
        file: pkg.main,
        format: 'umd',
        name: pkg.name,
    },
    plugins: [
        del({ targets: ['./dist'], }),
        del({ targets: ['./dist/rollup**'], hook: 'closeBundle' }),
        ts({
            tsconfig: './tsconfig.json',
        }),
    ],
}]