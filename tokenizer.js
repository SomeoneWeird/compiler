function tokenizer (input) {
  var tokens = []

  input = input.split('')

  if (input[input.length - 1] === '\n') {
    input.splice(input.length - 1, 1)
  }

  var current = 0

  while (current < input.length) {
    var token = input[current]

    if (token === "'") {
      tokens.push({
        type: 'StringIdentifier'
      })
      current++
      continue
    }

    if (token === '(' || token === ')') {
      tokens.push({
        type: 'paren',
        paren: token
      })
      current++
      continue
    }

    if (token === '[' || token === ']') {
      tokens.push({
        type: 'argumentList',
        char: token
      })
      current++
      continue
    }

    if (token === ' ') {
      // ignore
      current++
      continue
    }

    var letterMatch = /[a-zA-Z]/

    if (letterMatch.test(token)) {
      var str = ''
      while(true) {
        var next = input[current + str.length]
        if (next && letterMatch.test(next)) {
          str += next
        } else {
          break
        }
      }
      tokens.push({
        type: 'Identifier',
        value: str
      })
      current += str.length
      continue
    }

    var numberMatch = /[0-9]/

    if (numberMatch.test(token)) {
      var str = ''
      type = "NumberLiteral"
      while(true) {
        var next = input[current + str.length]
        if (next && numberMatch.test(next)) {
          str += next
        } else {
          if (next === '.') {
            type = "FloatLiteral"
            str += next
          }
          else {
            break
          }
        }
      }
      tokens.push({
        type: type,
        value: str
      })
      current += str.length
      continue
    }

    throw new TypeError('unknown token: ' + token)
  }

  return tokens
}

module.exports = tokenizer
