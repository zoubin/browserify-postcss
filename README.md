# browserify-postcss
transform contents using postcss

## Usage

example/var.js:

```javascript
var plugin = require("browserify-postcss")

var tr = plugin("fake.css", {
    plugin: "postcss-simple-vars",
    basedir: __dirname
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

If `Array`, each element can be `String`, `Function`, or `Array`.
