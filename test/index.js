var test = require('tape')
var assertTransform = require('assert-transform')

test('assert that start ends up looking like target', function (t) {
  t.plan(1)
  assertTransform(
    __dirname + '/start.js',
    __dirname + '/target.js',
    {
      presets: ['es2015'],
      plugins: [
        ['transform-react-jsx', {'pragma': 'h'}],
        '../index.js'
      ]
    }
  )
  .then(function () {
    t.pass('produced contents of target.js')
  })
  .catch(function (err) {
    console.log(err)
    t.fail()
  })
})
