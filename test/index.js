var processor = require("..")
var sink = require("sink-transform")
var test = require("tape")

test('transform', function(t) {
    t.plan(1)
    var tr = processor("fake.css", {
        plugin: "postcss-simple-vars",
        resolve: {
            basedir: __dirname
        }
    })
    tr.end("$color: red; .fake { color: $color; }")
    tr.pipe(sink.str(function (body) {
        t.equal(body, ".fake { color: red; }")
    }))
})

