var plugin = require("..")
var sink = require("sink-transform")
var test = require("tape")

test('transform', function(t) {
    t.plan(1)
    var tr = plugin("fake.css", {
        plugin: "postcss-simple-vars",
        basedir: __dirname
    })
    tr.end("$color: red; .fake { color: $color; }")
    tr.pipe(sink.str(function (body) {
        t.equal(body, ".fake { color: red; }")
    }))
})

