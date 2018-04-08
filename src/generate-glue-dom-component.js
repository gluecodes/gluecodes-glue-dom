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

/*(async () => {
  const code = await generateGlueDomComponent({
    pageUrl: process.argv[2],
    pageSelector: process.argv[3]
  });

  console.log(code);
})();*/

module.exports = generateGlueDomComponent;
