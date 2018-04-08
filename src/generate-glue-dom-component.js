const buildGlueDomComponentAst = require('./build-glue-dom-component-ast');
const generator = require('@babel/generator');

const generate = generator.default;

async function generateGlueDomComponent({
  pageUrl,
  pageSelector
} = {}) {
  const { code } = generate(await buildGlueDomComponentAst({
    pageUrl,
    pageSelector
  }));

  return code;
}

module.exports = generateGlueDomComponent;
