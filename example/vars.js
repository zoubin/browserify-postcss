var plugin = require("..")

var tr = plugin("fake.css", {
    plugin: "postcss-simple-vars",
    basedir: __dirname
})
tr.end("$color: red; .fake { color: $color; }")
tr.pipe(process.stdout)
