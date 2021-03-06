var assert = require('assert')

var tokenizer = require('../lib/tokenizer')
var ast = require('../lib/ast')

describe('ast', function () {

  it('should generate ast for basic number', function() {
    var tokens = tokenizer('42')
    assert.deepEqual(ast(tokens), {
      type: 'Program',
      body: [ {
        type: 'NumberLiteral',
        value: '42'
      }]
    })
  })

  it('should generate ast for basic float', function () {
    var tokens = tokenizer('1.2')
    assert.deepEqual(ast(tokens), {
      type: 'Program',
      body: [ {
        type: 'FloatLiteral',
        value: '1.2'
      } ]
    })
  })

  it('should generate ast for basic identifier', function () {
    var tokens = tokenizer('hello')
    assert.deepEqual(ast(tokens), {
      type: 'Program',
      body: [ {
        type: 'Identifier',
        name: 'hello'
      } ]
    })
  })

  it('should generate ast for basic string', function () {
    var tokens = tokenizer("'hello'")
    assert.deepEqual(ast(tokens), {
      type: 'Program',
      body: [ {
        type: 'StringLiteral',
        value: 'hello'
      } ]
    })
  })

  it('should generate ast for basic function call', function () {
    var tokens = tokenizer('(hello world 42)')
    assert.deepEqual(ast(tokens), {
      type: 'Program',
      body: [ {
        type: 'CallExpression',
        function: 'hello',
        params: [
          {
            type: 'Identifier',
            name: 'world'
          },
          {
            type: 'NumberLiteral',
            value: 42
          }
        ]
      }]
    })
  })

  it('should generate ast for basic array', function () {
    var tokens = tokenizer('[ 1 2.3 4 ]')
    assert.deepEqual(ast(tokens), {
      type: 'Program',
      body: [ {
        type: 'Array',
        values: [ {
          type: 'NumberLiteral',
          value: 1
        }, {
          type: 'FloatLiteral',
          value: 2.3
        }, {
          type: 'NumberLiteral',
          value: 4
        } ]
      } ]
    })
  })

  it('should generate ast for nested function calls', function () {
    var tokens = tokenizer('(hello (world (subtract 4 (add 5 1))))')
    assert.deepEqual(ast(tokens), {
      type: 'Program',
      body: [ {
        type: 'CallExpression',
        function: 'hello',
        params: [ {
          type: 'CallExpression',
          function: 'world',
          params: [ {
            type: 'CallExpression',
            function: 'subtract',
            params: [ {
              type: 'NumberLiteral',
              value: 4
            }, {
              type: 'CallExpression',
              function: 'add',
              params: [ {
                type: 'NumberLiteral',
                value: 5
              }, {
                type: 'NumberLiteral',
                value: 1
              } ]
            } ]
          } ]
        } ]
      } ]
    })
  })

  it('should generate ast for consecutive lines', function() {
    var tokens = ['(hello 1 2)', '(add 2 3)'].map(tokenizer).reduce((acc, l) => acc.concat(l), [])
    var out = ast(tokens)
    var expected = {
      type: "Program",
      body: [ {
        type: 'CallExpression',
        function: 'hello',
        params: [ {
          type: 'NumberLiteral',
          value: '1'
        }, {
          type: 'NumberLiteral',
          value: '2'
        } ]
      }, {
        type: 'CallExpression',
        function: 'add',
        params: [ {
          type: 'NumberLiteral',
          value: '2'
        }, {
          type: 'NumberLiteral',
          value: '3'
        } ]
      } ]
    }
    assert.deepEqual(out, expected)
  })

  describe('assignment', function () {
    it('should generate AST for assignment', function () {
      var tokens = tokenizer('($ a 5)')
      assert.deepEqual(ast(tokens), {
        type: 'Program',
        body: [ {
          type: 'Assignment',
          name: 'a',
          value: [ {
            type: 'NumberLiteral',
            value: 5
          } ]
        } ]
      })
    })
    it('should throw for invalid variable name', function () {
      assert.throws(function () {
        var tokens = tokenizer('($ 5 5)')
        ast(tokens)
      }, /variable names must be strings/)
    })
  })
})
