const renderVDomElement = require('./render-v-dom-element');

const renderVDomTree = (tagName, nestedRender) => {
  let vDomTree = null;

  // eslint-disable-next-line no-shadow
  ($ => $(tagName, nestedRender))((tagName, render) => {
    vDomTree = renderVDomElement(tagName, render);
  });

  return vDomTree;
};

module.exports = renderVDomTree;
