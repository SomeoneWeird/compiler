
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
    NumberLiteral: function(node) {
      return {
        type: 'Literal',
        value: parseInt(node.value),
        raw: node.value.toString()
      }
    },
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
    }
  }

  function visit(node, parent) {
    if (!visitor[node.type]) return node
    return visitor[node.type](node, parent)
  }

  return visit(ast);
}

module.exports = transformAST

