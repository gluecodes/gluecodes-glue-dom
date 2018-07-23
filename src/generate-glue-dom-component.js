const buildGlueDomComponentAst = require('./build-glue-dom-component-ast');
const generator = require('@babel/generator');

const generate = generator.default;

async function generateGlueDomComponent({
  pageUrl,
  pageSelector
} = {}) {
  const ast = await buildGlueDomComponentAst({
    pageUrl,
    pageSelector
  });

  if (!ast) { return null; }

  const { code } = generate(ast);

  return code;
}

module.exports = generateGlueDomComponent;
