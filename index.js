var sink = require('sink-transform')
var PassThrough = require('stream').PassThrough
var resolve = require('resolve')
var postcss = require('postcss')
var path = require('path')

module.exports = function (file, opts) {
  opts = opts || {}
  var extensions = ['.css', '.scss', '.sass'].concat(opts.extensions).filter(Boolean)
  if (extensions.indexOf(path.extname(file)) === -1) {
    return PassThrough()
  }
  var processor = opts.processor || createProcessor(opts)
  var postCssOptions = opts.postCssOptions
  if (typeof postCssOptions === 'function') {
    postCssOptions = postCssOptions(file)
  }
  postCssOptions = postCssOptions || {}
  postCssOptions.from = postCssOptions.from || file
  postCssOptions.to = postCssOptions.to || file

  return sink.str(function (body, done) {
    var self = this
    processor.process(body, postCssOptions)
      .then(function (result) {
        self.push(moduleify(result.css, opts.inject))
        done()
      }, function (err) {
        self.emit('error', err)
      })
  })
}

function base64 (css) {
  css = Buffer.from(css).toString('base64')
  return 'data:text/css;base64,' + css
}

function moduleify (css, inject) {
  var exp
  if (inject === 'base64') {
    exp = 'require("browserify-postcss").byUrl("' + base64(css) + '")'
  } else if (inject) {
    exp = "require('browserify-postcss')('" + css.replace(/\\/g, '\\\\').replace(/'/gm, "\\'").replace(/[\r\n]+/gm, ' ') + "')"
  } else {
    exp = JSON.stringify(css)
  }
  return 'module.exports = ' + exp
}

function createProcessor (opts) {
  return postcss(
    [].concat(opts.plugin).filter(Boolean).map(function (p) {
      var opt
      if (Array.isArray(p)) {
        opt = p[1]
        p = p[0]
      }
      if (typeof p === 'string') {
        p = require(
          resolve.sync(String(p), {
            basedir: opts.basedir || process.cwd()
          })
        )
      }
      if (typeof p === 'function') {
        return p(opt)
      }
      return p
    })
  )
}
