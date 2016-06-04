var escodegen = require('escodegen')

var tokenizer = require('./tokenizer')
var toAST = require('./ast')
var transformAST = require('./transform')

module.exports = function compiler(input) {

  // tokenizer
  var lines = input.split('\n').filter((l) => l.length > 0)
  var line_tokens = lines.map(tokenizer).reduce((acc, l) => acc.concat(l), [])

  // lexer
  var ast = toAST(line_tokens)

  // transform
  var newAST = transformAST(ast)


  // to JS
  var JS = escodegen.generate(newAST)

  return JS
}

