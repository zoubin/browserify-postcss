var browserify = require('browserify')
var fs = require('fs')

var del = require('del')

del.sync(__dirname + '/static/assets')
del.sync(__dirname + '/static/bundle.js')

var to = __dirname + '/static/bundle.js'
var b = browserify(__dirname + '/src/entry.js')
b.transform(require('..'), {
  plugin: [
    'postcss-import',
    'postcss-advanced-variables',
    ['postcss-custom-url', [
      ['inline', { maxSize: 10 }],
      ['copy', { assetOutFolder: __dirname + '/static/assets' }],
    ]],
  ],
  basedir: __dirname + '/src',
  postCssOptions: function (file) {
    return { from: file, to: to }
  },
  inject: true,
})
b.bundle().pipe(
  fs.createWriteStream(to)
)
