var assert = require('assert')

var compiler = require('../lib/compiler')

describe('compiler', function() {

  it('should compile a one-line script', function() {
    var script = "(add 1 2)"
    var output = compiler(script)
    var expected = "add(1, 2);"
    assert.equal(output, expected)
  })

  it('should compile a multi-line script', function() {
    var script = "(add 1 2)\n(mul 2 4)"
    var output = compiler(script)
    var expected = "add(1, 2);\nmul(2, 4);"
    assert.equal(output, expected)
  })

  it('should compile a function with identifier with mixed characters', function() {
    var script = 'def log1 [a b] (add a b)'
    var output = compiler(script)
    var expected = "function log1(a, b) {\n    return add(a, b);\n}"
    assert.equal(output, expected)
  })

  describe('arrays', function () {

    it('should compile arrays containing numbers', function () {
      var script = '[ 1 2.3 4 ]'
      assert.equal(compiler(script), '[\n    1,\n    2.3,\n    4\n];')
    })

    it('should compile arrays containing strings', function () {
      var script = "[ 'hello' 'world' '1234' ]\n"
      assert.equal(compiler(script), "[\n    'hello',\n    'world',\n    '1234'\n];")
    })

  })

})
