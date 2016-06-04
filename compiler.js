var fs = require('fs')

var escodegen = require('escodegen')

var tokenizer = require('./tokenizer')
var toAST = require('./ast')
var transformAST = require('./transform')

var input = fs.readFileSync('./example.lisp').toString()

// tokenizer
var tokens = tokenizer(input)

// lexer
var ast = toAST(tokens)

// transform
var newAST = transformAST(ast)

console.log(JSON.stringify(newAST, null, 2))

// to JS
var JS = escodegen.generate(newAST)

console.log(JS)
