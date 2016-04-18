var postcss = require('..')
var sink = require('sink-transform')
var test = require('tap').test
var fs = require('fs')
var path = require('path')
var fixtures = path.resolve.bind(path, __dirname, 'fixtures')

test('transform', function(t) {
  t.plan(1)
  var file = fixtures('entry.css')
  fs.createReadStream(file)
    .pipe(postcss(file, {
      plugin: [
        'postcss-import',
        'postcss-advanced-variables',
        'postcss-custom-url',
      ],
      basedir: __dirname,
    }))
    .pipe(sink.str(function (body) {
      t.equal(
        body,
        fs.readFileSync(fixtures('expected.js'), 'utf8')
      )
    }))
})

