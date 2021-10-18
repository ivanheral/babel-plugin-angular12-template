var template = require("@babel/template").default;
module.exports = (babel) => {
    const t = babel.types;
    return {
        visitor: {
            CallExpression(path) {
                if (path.node.callee.name === "Component" && path.node.arguments[0]) {
                    path.node.arguments[0].properties.map((item) => {
                        if (
                            item.key.name.match(/(template|styles|styleUrls|templateUrl)/i)
                        ) {
                            item.key.name = item.key.name.match(/(template|templateUrl)/i) ?
                                "template" :
                                "styles";
                            if (t.isStringLiteral(item.value)) {
                                item.key.name = "template";
                                if (item.value.value.match(/.(html|pug)$/i))
                                    item.value = template.expression `require("${
                    item.value.value
                  }").default`();
                            } else if (t.isArrayExpression(item.value)) {
                                let items = [];
                                item.value.elements.map((item) => {
                                    item.value.match(/.(css|stylus|scss|less)$/i) &&
                                        items.push(
                                            template.expression `require("${
                        item.value
                      }").default`()
                                        );
                                });
                                item.value.elements = items;
                            }
                        }
                    });
                }
            },
        },
    };
};