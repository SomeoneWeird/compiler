
function toAST (tokens) {
  var current = 0

  function walk () {
    var out = []

    while(current < tokens.length) {
      var token = tokens[current++]

      switch(token.type) {

        case 'paren': {
          if (token.paren === '(') {
            var fn = tokens[current++]
            if (fn.type !== 'Identifier') {
              throw new Error('function calls require name as string')
            }
            out.push({
              type: 'CallExpression',
              function: fn.value,
              params: walk()
            })
            continue
          } else {
            return out
          }
        }

        case 'StringIdentifier': {
          var str = ''
          while(true) {
            var next = tokens[current + str.length]
            if (next && next.type !== 'StringIdentifier') {
              str += next.value
            } else {
              break
            }
          }
          out.push({
            type: 'StringLiteral',
            value: str
          })
          current += str.length
          continue
        }

        case 'NumberLiteral': {
          out.push(token)
          continue
        }

        case 'Identifier': {
          if (token.value !== 'def') {
            out.push(token)
            continue
          }

          var fnNameToken = tokens[current++]

          if (fnNameToken.type !== 'Identifier') {
            throw new Error('function names must be strings')
          }

          var args = []

          var argumentListStartToken = tokens[current]

          if (argumentListStartToken.type !== 'argumentList' || argumentListStartToken.char !== '[') {
            throw new Error('Argument list must start with [')
          }

          current++

          while(true) {
            var next = tokens[current + args.length]
            if (next.type === 'argumentList' && next.char === ']') {
              break
            }
            args.push(next)
          }

          current += args.length

          out.push({
            type: 'FunctionDeclaration',
            name: fnNameToken.value,
            arguments: args,
            function: walk()
          })

          continue
        }

        case 'argumentList': {
          continue
        }

        default: {
          throw new TypeError('unknown token type: ' + token.type)
        }

      }
    }

    return out
  }

  return {
    type: 'Program',
    body: walk()
  }
}

module.exports = toAST
