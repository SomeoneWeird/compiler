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
      type: 'Parenthesis',
      value: '('
    }, {
      type: 'Identifier',
      name: 'hello'
    }, {
      type: 'NumberLiteral',
      value: '3'
    }, {
      type: 'NumberLiteral',
      value: '21'
    }, {
      type: 'Parenthesis',
      value: ')'
    } ],
    "'hello'": [ {
      type: 'StringIdentifier'
    }, {
      type: 'Identifier',
      name: 'hello'
    }, {
      type: 'StringIdentifier'
    } ],
    "concat('hello' 'world')": [ {
      type: 'Identifier',
      name: 'concat'
    }, {
      type: 'Parenthesis',
      value: '('
    }, {
      type: 'StringIdentifier'
    }, {
      type: 'Identifier',
      name: 'hello'
    }, {
      type: 'StringIdentifier'
    }, {
      type: 'StringIdentifier'
    }, {
      type: 'Identifier',
      name: 'world'
    }, {
      type: 'StringIdentifier'
    }, {
      type: 'Parenthesis',
      value: ')'
    } ],
    '123.23': [ {
      type: 'FloatLiteral',
      value: "123.23"
    } ],
    'log1': [ {
      type: 'Identifier',
      name: 'log1'
    } ],
    '[ 1 2.3 4 ]': [ {
      type: 'ArrayIdentifier',
      char: '['
    }, {
      type: 'NumberLiteral',
      value: '1'
    }, {
      type: 'FloatLiteral',
      value: '2.3'
    }, {
      type: 'NumberLiteral',
      value: '4'
    }, {
      type: 'ArrayIdentifier',
      char: ']'
    } ],
    "[ 'hello world' 4 4.2 ]": [ {
      type: 'ArrayIdentifier',
      char: '['
    }, {
      type: 'StringLiteral',
      value: 'hello world'
    }, {
      type: 'NumberLiteral',
      value: "4"
    }, {
      type: 'FloatLiteral',
      value: "4.2"
    }, {
      type: 'ArrayIdentifier',
      char: ']'
    } ],
    '($ a 5)': [ {
      type: 'Parenthesis',
      value: '('
    }, {
      type: 'AssignmentOperator'
    }, {
      type: 'Identifier',
      name: 'a'
    }, {
      type: 'NumberLiteral',
      value: '5'
    }, {
      type: 'Parenthesis',
      value: ')'
    } ]
  }

  for(var k in tests) {
    it('should parse "' + k + '"', function () {
      assert.deepEqual(tokenizer(k), tests[k])
    })
  }
})
