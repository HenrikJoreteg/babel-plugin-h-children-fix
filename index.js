module.exports = function(babel) {
  return {
    visitor: {
      CallExpression: function (path) {
        if (path.node.callee.name === 'h' && path.node.arguments.length > 3) {
          var args = path.node.arguments
          path.node.arguments = args.slice(0, 2)
          path.node.arguments.push(babel.types.arrayExpression(args.slice(2)))
        }
      }
    }
  };
};
