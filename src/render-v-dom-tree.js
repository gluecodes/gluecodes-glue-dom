const renderVDomElement = require('./render-v-dom-element');

const renderVDomTree = (tagName, nestedRender, config) => {
  let vDomTree = null;

  // eslint-disable-next-line no-shadow
  (tag => tag(tagName, nestedRender))((tagName, render) => {
    vDomTree = renderVDomElement(tagName, render, config);
  });

  return vDomTree;
};

module.exports = renderVDomTree;
