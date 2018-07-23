const puppeteer = require('puppeteer'); // eslint-disable-line import/no-extraneous-dependencies

const getComponentEnvelope = () => ({
  type: 'Program',
  body: [
    {
      type: 'ImportDeclaration',
      specifiers: [
        {
          type: 'ImportSpecifier',
          local: {
            type: 'Identifier',
            name: 'renderVDomTree'
          },
          imported: {
            type: 'Identifier',
            name: 'renderVDomTree'
          }
        }
      ],
      source: {
        type: 'StringLiteral',
        extra: {
          rawValue: 'gluecodes-glue-dom',
          raw: "'gluecodes-glue-dom'"
        },
        value: 'gluecodes-glue-dom'
      }
    },
    {
      type: 'ExportDefaultDeclaration',
      declaration: {
        type: 'ArrowFunctionExpression',
        id: null,
        params: [
          {
            type: 'AssignmentPattern',
            left: {
              type: 'ObjectPattern',
              properties: [
                {
                  type: 'ObjectProperty',
                  key: {
                    type: 'Identifier',
                    name: 'actionResults'
                  },
                  computed: false,
                  value: {
                    type: 'Identifier',
                    name: 'actionResults'
                  },
                  kind: 'init',
                  method: false,
                  shorthand: true
                },
                {
                  type: 'ObjectProperty',
                  key: {
                    type: 'Identifier',
                    name: 'actions'
                  },
                  computed: false,
                  value: {
                    type: 'Identifier',
                    name: 'actions'
                  },
                  kind: 'init',
                  method: false,
                  shorthand: true
                }
              ]
            },
            right: {
              type: 'ObjectExpression',
              properties: []
            }
          }
        ],
        body: {},
        generator: false,
        expression: true,
        async: false
      }
    }
  ],
  sourceType: 'module'
});

async function buildGlueDomComponentAst({
  pageUrl,
  pageSelector = 'body'
} = {}) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(pageUrl);

  page.on('console', msg => console.log(msg.text())); // eslint-disable-line no-console

  const vDomTreeAst = await page.evaluate((selector) => {
    const attrToPropMappings = {
      class: 'className'
    };

    const getTagCallHavingChildNodesExpression = ({
      tagName
    } = {}) => ({
      type: 'ExpressionStatement',
      expression: {
        type: 'CallExpression',
        callee: {
          type: 'Identifier',
          name: '$'
        },
        arguments: [
          {
            type: 'StringLiteral',
            extra: {
              rawValue: tagName,
              raw: `'${tagName}'`
            },
            value: tagName
          },
          {
            type: 'ArrowFunctionExpression',
            id: null,
            params: [
              {
                type: 'Identifier',
                name: 'props'
              },
              {
                type: 'Identifier',
                name: '$'
              }
            ],
            body: {
              type: 'BlockStatement',
              body: [
                {
                  type: 'ReturnStatement',
                  argument: {
                    type: 'Identifier',
                    name: 'props'
                  }
                }
              ]
            },
            generator: false,
            expression: false,
            async: false
          }
        ]
      }
    });

    const getTagCallWithoutChildrenExpression = ({
      tagName
    } = {}) => ({
      type: 'ExpressionStatement',
      expression: {
        type: 'CallExpression',
        callee: {
          type: 'Identifier',
          name: '$'
        },
        arguments: [
          {
            type: 'StringLiteral',
            extra: {
              rawValue: tagName,
              raw: `'${tagName}'`
            },
            value: tagName
          },
          {
            type: 'ObjectExpression',
            properties: []
          }
        ]
      }
    });

    const getInlinePropObjectPropertyExpression = ({
      name,
      value
    } = {}) => ({
      type: 'ObjectProperty',
      key: {
        type: 'Identifier',
        name
      },
      computed: false,
      value: {
        type: 'StringLiteral',
        extra: {
          rawValue: value,
          raw: `'${value}'`
        },
        value
      },
      kind: 'init',
      method: false,
      shorthand: false
    });

    const getTextCallExpression = ({
      text
    } = {}) => ({
      type: 'ExpressionStatement',
      expression: {
        type: 'CallExpression',
        callee: {
          type: 'Identifier',
          name: '$'
        },
        arguments: [
          {
            type: 'StringLiteral',
            extra: {
              rawValue: text,
              raw: `'${text}'`
            },
            value: text
          }
        ]
      }
    });

    const getPropAssignmentExpression = ({
      name,
      value
    } = {}) => ({
      type: 'ExpressionStatement',
      expression: {
        type: 'AssignmentExpression',
        operator: '=',
        left: {
          type: 'MemberExpression',
          computed: false,
          object: {
            type: 'Identifier',
            name: 'props'
          },
          property: {
            type: 'Identifier',
            name
          }
        },
        right: {
          type: 'StringLiteral',
          extra: {
            rawValue: value,
            raw: `'${value}'`
          },
          value
        }
      }
    });

    const getCustomAttrAssignmentExpression = ({
      customAttrObjectProperties
    } = {}) => ({
      type: 'ExpressionStatement',
      expression: {
        type: 'AssignmentExpression',
        operator: '=',
        left: {
          type: 'MemberExpression',
          computed: false,
          object: {
            type: 'Identifier',
            name: 'props'
          },
          property: {
            type: 'Identifier',
            name: 'attributes'
          }
        },
        right: {
          type: 'ObjectExpression',
          properties: customAttrObjectProperties
        }
      }
    });

    const getCustomAttrObjectProperty = ({
      key,
      value
    } = {}) => ({
      type: 'ObjectProperty',
      key: {
        type: 'StringLiteral',
        extra: {
          rawValue: key,
          raw: `'${key}'`
        },
        value: key
      },
      computed: false,
      value: {
        type: 'StringLiteral',
        extra: {
          rawValue: value,
          raw: `'${value}'`
        },
        value
      },
      kind: 'init',
      method: false,
      shorthand: false
    });

    const buildAst = ({
      selector // eslint-disable-line no-shadow
    } = {}) => {
      const processDomElement = ({
        domElement
      } = {}) => {
        if (!domElement) { return null; }

        const tagName = domElement.nodeName.toLowerCase();
        const tagAttrs = domElement.attributes;
        const tagChildren = domElement.childNodes;

        if (tagChildren.length === 0) {
          const astTemplate = getTagCallWithoutChildrenExpression({ tagName });
          const propRef = astTemplate.expression.arguments[1].properties;
          const customAttrObjectProperties = [];

          if (tagAttrs) {
            for (const tagAttr of tagAttrs) { // eslint-disable-line no-restricted-syntax
              const isItCustomAttr = tagAttr.nodeName.indexOf('-') !== -1;

              if (isItCustomAttr) {
                customAttrObjectProperties.push(getCustomAttrObjectProperty({
                  key: tagAttr.nodeName,
                  value: tagAttr.nodeValue
                }));

                continue;
              }

              propRef.push(getInlinePropObjectPropertyExpression({
                name: attrToPropMappings[tagAttr.nodeName] || tagAttr.nodeName,
                value: tagAttr.nodeValue
              }));
            }
          }

          if (customAttrObjectProperties.length > 0) {
            propRef.push({
              type: 'ObjectProperty',
              key: {
                type: 'Identifier',
                name: 'attributes'
              },
              computed: false,
              value: {
                type: 'ObjectExpression',
                properties: customAttrObjectProperties
              }
            });
          }

          return astTemplate;
        }

        const astTemplate = getTagCallHavingChildNodesExpression({ tagName });
        const tagBodyRef = astTemplate.expression.arguments[1].body;
        const bodyExpressions = [];
        const customAttrObjectProperties = [];

        if (tagAttrs) {
          for (const tagAttr of tagAttrs) { // eslint-disable-line no-restricted-syntax
            const isItCustomAttr = tagAttr.nodeName.indexOf('-') !== -1;

            if (isItCustomAttr) {
              customAttrObjectProperties.push(getCustomAttrObjectProperty({
                key: tagAttr.nodeName,
                value: tagAttr.nodeValue
              }));

              continue;
            }

            bodyExpressions.push(getPropAssignmentExpression({
              name: attrToPropMappings[tagAttr.nodeName] || tagAttr.nodeName,
              value: tagAttr.nodeValue
            }));
          }
        }

        if (customAttrObjectProperties.length > 0) {
          bodyExpressions.push(getCustomAttrAssignmentExpression({
            customAttrObjectProperties
          }));
        }

        if (tagChildren) {
          for (const nestedElement of tagChildren) { // eslint-disable-line no-restricted-syntax
            const isItText = nestedElement.nodeType === 3;
            const isTextEmpty = !nestedElement.nodeValue || nestedElement.nodeValue.trim() === '';
            const isItDomElement = nestedElement.nodeType === 1;

            if (isItText && !isTextEmpty) {
              bodyExpressions.push(getTextCallExpression({
                text: nestedElement.nodeValue
                  .replace(/\s+/, ' ')
                  .replace(/\n/g, '\\n')
              }));

              continue;
            }

            if (!isItDomElement) { continue; }

            bodyExpressions.push(processDomElement({
              domElement: nestedElement
            }));
          }
        }

        tagBodyRef.body = bodyExpressions.concat(tagBodyRef.body);

        return astTemplate;
      };

      return processDomElement({
        domElement: document.querySelector(selector) // eslint-disable-line no-undef
      });
    };

    return buildAst({ selector });

  }, pageSelector);

  if (!vDomTreeAst) {
    await browser.close();
    return null;
  }

  vDomTreeAst.expression.callee.name = 'renderVDomTree';

  const ast = getComponentEnvelope();

  ast.body[1].declaration.body = vDomTreeAst.expression;

  await browser.close();
  return ast;
}

module.exports = buildGlueDomComponentAst;
