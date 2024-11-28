module.exports = function({ types: t }) {
    return {
        visitor: {
            AssignmentExpression(path, state) {
                const { addVar = false, useWindow = true } = state.opts;
                if (t.isIdentifier(path.node.left)) {
                    const binding = path.scope.getBinding(path.node.left.name);
                    if (!binding) {
                        if (addVar) {
                            // Trasforma l'assegnazione in una dichiarazione "var"
                            const declaration = t.variableDeclaration("var", [
                                t.variableDeclarator(
                                    t.identifier(path.node.left.name),
                                    path.node.right
                                ),
                            ]);
                            path.replaceWith(declaration);
                        } else if (useWindow) {
                            // Trasforma il lato sinistro in "window.<nomeVariabile>"
                            const newLeft = t.memberExpression(
                                t.identifier("window"),
                                t.identifier(path.node.left.name)
                            );
                            path.node.left = newLeft;
                        }
                    }
                }
            },
        },
    };
};


