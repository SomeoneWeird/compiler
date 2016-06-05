var assert = require('assert')

var compiler = require('../lib/compiler')

describe('regressions', function() {

  it('should compile functions', function () {
    var fn = 'def myFn [ one two ] (add one two)'
    var out = 'function myFn(one, two) {\n    return add(one, two);\n}'
    assert.equal(compiler(fn), out)
  })

  it('should compile inline function calls', function () {
    var fn = '(add 5 (subtract 5 1))'
    var out = 'add(5, subtract(5, 1));'
    assert.equal(compiler(fn), out)
  })

})
