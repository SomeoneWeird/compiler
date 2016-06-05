
function transformAST (ast) {
  var visitor = {
    Program: function(node) {
      return {
        type: 'Program',
        body: node.body.map(function(child) {
          return visit(child, node)
        })
      }
    },
    CallExpression: function(node, parent) {
      var out = {
        type: 'CallExpression',
        callee: {
          type: 'Identifier',
          name: node.function
        },
        arguments: node.params.map(function(child) {
          return visit(child, node)
        })
      }
      if (parent.type === 'Program') {
        out = {
          type: 'ExpressionStatement',
          expression: out
        }
      }
      return out
    },
    StringLiteral: toLiteral,
    NumberLiteral: toNumberFloatLiteral,
    FloatLiteral: toNumberFloatLiteral,
    FunctionDeclaration: function(node) {
      var out = {
        type: 'FunctionDeclaration',
        id: {
          type: 'Identifier',
          name: node.name
        },
        params: node.arguments,
        defaults: [],
        body: {
          type: 'BlockStatement',
          body: [
            {
              type: 'ReturnStatement',
              argument: visit(node.function[0], node)
            }
          ]
        }
      }
      return out
    },
    Array: function (node, parent) {
      var out = {
        type: 'ArrayExpression',
        elements: node.values.map(function (child) {
          return visit(child, node)
        })
      }
      if (parent.type === 'Program') {
        out = {
          type: 'ExpressionStatement',
          expression: out
        }
      }
      return out
    },

    Assignment: function (node, parent) {
      var out = {
        type: 'VariableDeclaration',
        declarations: [
          {
            type: 'VariableDeclarator',
            id: {
              type: 'Identifier',
              name: node.name
            },
            init: toLiteral(node.value[0])
          }
        ],
        kind: 'var'
      }
      return out
    }

  }

  function visit(node, parent) {
    if (!visitor[node.type]) return node
    return visitor[node.type](node, parent)
  }

  return visit(ast);
}

function toNumberFloatLiteral(node) {
  return {
    type: 'Literal',
    value: parseFloat(node.value),
    raw: node.value.toString()
  }
}

function toLiteral (node) {
  if (node.type === 'NumberLiteral' || node.type === 'FloatLiteral') {
    return toNumberFloatLiteral(node)
  }
  return {
    type: 'Literal',
    value: node.value,
    raw: "'" + node.value + "'"
  }
}

module.exports = transformAST

