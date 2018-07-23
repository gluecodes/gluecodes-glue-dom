const generateGlueDomComponent = require('./../src/generate-glue-dom-component');

(async () => {
  const code = await generateGlueDomComponent({
    pageUrl: process.argv[2],
    pageSelector: process.argv[3]
  });

  console.log(code);
})();
