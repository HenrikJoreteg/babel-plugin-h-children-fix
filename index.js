module.exports = function (babel) {
  return {
    visitor: {
      CallExpression: function (path) {
        if (path.node.callee.name === 'h' && path.node.arguments.length > 3) {
          var args = path.node.arguments
          path.node.arguments = args.slice(0, 2)
          path.node.arguments.push(babel.types.arrayExpression(args.slice(2)))
        }
      },

      JSXOpeningElement: function (path, meta) {
        meta.file.set('hasJSX', true)
      },

      Program: {
        enter: function (path, meta) {
          meta.file.set('hasJSX', false)
        },

        exit: function (path, meta) {
          // if it doesn't have JSX or "h" is already imported, stop here
          if (!meta.file.get('hasJSX') || path.scope.hasBinding('h')) {
            return
          }

          var vdomImportDeclaration = babel.types.importDeclaration([
            babel.types.importDefaultSpecifier(babel.types.identifier('h'))
          ], babel.types.stringLiteral('virtual-dom/h'))

          path.node.body.unshift(vdomImportDeclaration)
        }
      }
    }
  }
}
