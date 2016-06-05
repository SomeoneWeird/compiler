var assert = require('assert')

var tokenizer = require('../lib/tokenizer')

describe('tokenizer', function () {
  var tests = {
    'hello': [ {
      type: 'Identifier',
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
      type: 'Identifier',
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
    } ],
    "'hello'": [ {
      type: 'StringIdentifier'
    }, {
      type: 'Identifier',
      value: 'hello'
    }, {
      type: 'StringIdentifier'
    } ],
    "concat('hello' 'world')": [ {
      type: 'Identifier',
      value: 'concat'
    }, {
      type: 'paren',
      paren: '('
    }, {
      type: 'StringIdentifier'
    }, {
      type: 'Identifier',
      value: 'hello'
    }, {
      type: 'StringIdentifier'
    }, {
      type: 'StringIdentifier'
    }, {
      type: 'Identifier',
      value: 'world'
    }, {
      type: 'StringIdentifier'
    }, {
      type: 'paren',
      paren: ')'
    } ],
    '123.23': [ {
      type: 'FloatLiteral',
      value: "123.23"
    } ]
  }

  for(var k in tests) {
    it('should parse "' + k + '"', function () {
      assert.deepEqual(tokenizer(k), tests[k])
    })
  }
})
