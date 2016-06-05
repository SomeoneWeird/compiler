var escodegen = require('escodegen')

var tokenizer = require('./tokenizer')
var toAST = require('./ast')
var transformAST = require('./transform')

module.exports = function compiler(input) {

  // tokenizer
  var tokens = tokenizer(input)

  // lexer
  var ast = toAST(tokens)

  // transform
  var newAST = transformAST(ast)

  // to JS
  var JS = escodegen.generate(newAST)

  return JS
}
