var fs = require('fs')
var compiler = require('./compiler')

var input = fs.readFileSync('./example.lisp').toString()
console.log(compiler(input))
