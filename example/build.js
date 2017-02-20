var browserify = require('browserify')
var fs = require('fs')
var path = require('path')

var del = require('del')

del.sync(__dirname + '/static/assets')
del.sync(__dirname + '/static/bundle.js')

var b = browserify(__dirname + '/src/entry.js')
b.transform(require('..'), {
  plugin: [
    'postcss-import',
    'postcss-advanced-variables',
    ['postcss-custom-url', [
      ['inline', { maxSize: 10 }],
      ['copy', {
        assetOutFolder: __dirname + '/static/assets',
        baseUrl: 'assets',
        name: '[name].[hash]',
      }],
    ]],
  ],
  basedir: __dirname + '/src',
  inject: true,
})
b.require('../index.js', { expose: 'browserify-postcss' })
b.bundle().pipe(
  fs.createWriteStream(__dirname + '/static/bundle.js')
)
