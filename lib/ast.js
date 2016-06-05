
function toAST (tokens) {
  var current = 0

  function walk () {
    var out = []

    while(current < tokens.length) {
      var token = tokens[current++]

      switch(token.type) {

        case 'paren': {
          if (token.paren === '(') {
            var next = tokens[current++]
            if (next.type === 'AssignmentOperator') {
              var variable = tokens[current++]
              if (variable.type !== 'Identifier') {
                throw new Error('variable names must be strings')
              }
              var t = {
                type: 'Assignment',
                name: variable.name,
                value: walk()
              }
              out.push(t)
              continue
            }
            if (next.type !== 'Identifier') {
              throw new Error('function calls require name as string')
            }
            out.push({
              type: 'CallExpression',
              function: next.name,
              params: walk()
            })

            continue
          } else {
            return out
          }
        }

        case 'StringLiteral': {
          out.push(token)
          continue
        }

        case 'NumberLiteral': {
          out.push(token)
          continue
        }

        case 'FloatLiteral': {
          out.push(token)
          continue
        }

        case 'Identifier': {
          if (token.name !== 'def') {
            out.push(token)
            continue
          }

          var fnNameToken = tokens[current++]

          if (fnNameToken.type !== 'Identifier') {
            throw new Error('function names must be string identifiers')
          }

          var args = []

          var arrayListStartToken = tokens[current]

          if (arrayListStartToken.type !== 'ArrayIdentifier' || arrayListStartToken.char !== '[') {
            throw new Error('Argument list must start with [')
          }

          current++

          while(true) {
            var next = tokens[current + args.length]
            if (next.type === 'ArrayIdentifier' && next.char === ']') {
              current++ // skip end ArrayIdentifier
              break
            }
            args.push(next)
          }

          current += args.length

          out.push({
            type: 'FunctionDeclaration',
            name: fnNameToken.name,
            arguments: args,
            function: walk()
          })

          continue
        }

        case 'ArrayIdentifier': {
          var arrayItems = []
          while(true) {
            var next = tokens[current + arrayItems.length]
            if (next.type === 'ArrayIdentifier' && next.char === ']') {
              break
            }
            arrayItems.push(next)
          }

          current += arrayItems.length

          out.push({
            type: 'Array',
            values: arrayItems
          })

          current += 1 // skip next ArrayIdentifier

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
