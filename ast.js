
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
            if (fn.type !== 'StringLiteral') {
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

        case 'NumberLiteral':
        case 'StringLiteral': {
          out.push(token)
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
