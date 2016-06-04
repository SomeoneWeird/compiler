var assert = require('assert')

var tokenizer = require('../tokenizer')
var ast = require('../ast')

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

  it('should generate ast for basic identifier', function () {
    var tokens = tokenizer('hello')
    assert.deepEqual(ast(tokens), {
      type: 'Program',
      body: [ {
        type: 'Identifier',
        value: 'hello'
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
            value: 'world'
          },
          {
            type: 'NumberLiteral',
            value: 42
          }
        ]
      }]
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
})