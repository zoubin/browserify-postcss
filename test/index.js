var path = require('path')
var browserify = require('browserify')
var tapeRun = require('tape-run')
var tapSpec = require('tap-spec')

var reporter = tapSpec()
reporter.pipe(process.stdout)

function runTest (dir, opts, runOpts) {
  var b = browserify(path.join(__dirname, 'fixtures', dir, 'index.js'))
  opts = opts || {
    inject: true,
    plugin: ['postcss-import', 'postcss-advanced-variables', 'postcss-nested']
  }
  b.transform(path.resolve(__dirname, '..', 'index.js'), opts)
  b.require(path.resolve(__dirname, '..', 'index.js'), { expose: 'browserify-postcss' })
  return new Promise(function (resolve, reject) {
    b.bundle()
      .pipe(tapeRun(runOpts || {}))
      .on('end', resolve)
      .on('error', reject)
      .pipe(reporter, { end: false })
  })
}

runTest('basic')
  .then(function () {
    return runTest('import')
  })
  .then(function () {
    return runTest('backslash')
  })
  .then(function () {
    reporter.end()
  })
