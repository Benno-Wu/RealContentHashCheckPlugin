# RealContentHashCheckPlugin

Run the logic same as [RealContentHashPlugin](https://webpack.js.org/plugins/internal-plugins/#realcontenthashplugin) but early and check for any sketchy matches

## config & example

### process.env

```js
// output assets info to debug plugin
process.env.debug
// disable webpack emit blocking, but still output any sketchy matches
process.env.DisableRealContentHashCheckPlugin
```

### plugin config

```js
const { RealContentHashCheckPlugin } = require('webpack-real-content-hash-check-plugin')

// webpack.config
plugins: [
    new RealContentHashCheckPlugin({
        // default config is list below, overwrite any as your need
        // output assets filter by ext
        extensions: ['.js', '.css'],
        // check assets filter by filename
        // https://webpack.js.org/concepts/manifest/#runtime
        excludes: ['runtime'],
    }),
]
```
