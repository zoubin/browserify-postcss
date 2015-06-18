# browserify-postcss
transform contents using postcss

## Usage

example/var.js:

```javascript
var plugin = require("browserify-postcss")

var tr = plugin("fake.css", {
    plugin: "postcss-simple-vars",
    resolve: {
        basedir: __dirname
    }
})
tr.end("$color: red; .fake { color: $color; }")
tr.pipe(process.stdout)

```

output:

```
⌘ node example/vars.js
.fake { color: red;  }
```

### tr = plugin(file, opts)

### Options

#### plugin

Type: `String|Array`
Default: `null`

postcss plugins used to transform the content

#### options

Type: `Object`
Default: `null`

options for postcss plugins specified by `opts.plugin`

#### resolve

Type: `Object|Function`
Default: `null`

If `Object`, will be passed to [resolve.sync](https://github.com/substack/node-resolve#resolvesyncid-opts) to resolve the plugins.
If `Function`, will be used instead of [resolve.sync](https://github.com/substack/node-resolve#resolvesyncid-opts)
