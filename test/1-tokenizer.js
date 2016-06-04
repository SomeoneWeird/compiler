var assert = require('assert')

var tokenizer = require('../tokenizer')

describe('tokenizer', function () {
  var tests = {
    'hello': [ {
      type: 'StringLiteral',
      value: 'hello'
    }],
    '32': [ {
      type: 'NumberLiteral',
      value: '32'
    }],
    '(hello 3 21)': [ {
      type: 'paren',
      paren: '('
    }, {
      type: 'StringLiteral',
      value: 'hello'
    }, {
      type: 'NumberLiteral',
      value: '3'
    }, {
      type: 'NumberLiteral',
      value: '21'
    }, {
      type: 'paren',
      paren: ')'
    } ]
  }

  for(var k in tests) {
    it('should parse "' + k + '"', function () {
      assert.deepEqual(tokenizer(k), tests[k])
    })
  }
})