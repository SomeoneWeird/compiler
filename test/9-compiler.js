var assert = require('assert')

var compiler = require('../compiler')

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

})
