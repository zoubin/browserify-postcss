var Processor = require("postcss-processor")
var sink = require("sink-transform")

var processor
module.exports = function (file, opts) {
    opts = opts || {}
    if (!processor) {
        processor = Processor(opts.plugin, opts.options, opts.resolve)
    }
    return sink.str(function (body, done) {
        var self = this
        processor.process(body, { from: file })
            .then(function (result) {
                self.push(result.css)
                done()
            })
    })
}
