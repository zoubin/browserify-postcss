var test = require('tape')

test('backslash', function (t) {
  t.plan(2)
  var body = document.body

  var el = document.createElement('div')
  el.classList.add('basic')
  el.innerHTML = 'some text'
  body.appendChild(el)

  t.equal(
    window.getComputedStyle(el, '::before').getPropertyValue('content'),
    '',
    'default content should be empty string'
  )

  var link = require('./index.css')
  link.onload = function (e) {
    window.clearTimeout(timer)
    t.equal(
      window.getComputedStyle(el, '::before').getPropertyValue('content'),
      '"A"',
      'content should be "A" after styles imported.'
    )
  }
  link.onerror = function (e) {
    t.fail(e.message)
    t.end()
  }
  var timer = window.setTimeout(link.onload, 1000)
})
