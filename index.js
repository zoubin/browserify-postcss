var sink = require("sink-transform")
var resolve = require("resolve")
var postcss = require("postcss")

var processor
module.exports = function (file, opts) {
    opts = opts || {}
    if (!processor) {
        processor = getProcessor(opts)
    }
    var stream = sink.str(function (body, done) {
        var self = this
        processor.process(body, { from: file })
            .then(function (result) {
                self.push(result.css)
                done()
            }, function (err) {
                stream.emit("error", err)
            })
    })
    return stream
}

function getProcessor(opts) {
    var plugins = [].concat(opts.plugin).filter(Boolean)
    plugins = plugins.map(function (p) {
        var op
        if (Array.isArray(p)) {
            op = p[1]
            p = p[0]
        }
        if (typeof p !== "function") {
            var pfile = resolve.sync(String(p), { basedir: opts.basedir || process.cwd() })
            p = require(pfile)
        }
        return p(op)
    })

    return postcss(plugins.concat(
        opts.processor && opts.processor.plugins || []
    ))
}
