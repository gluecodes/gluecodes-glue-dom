const h = require('virtual-dom/h');
const createElement = require('virtual-dom/create-element');

const initDom = ({
  domContainerElement = window.document.body // eslint-disable-line no-undef
} = {}) => {
  const currentVDomTree = h('div');
  const rootNode = createElement(currentVDomTree);

  domContainerElement.appendChild(rootNode);

  return {
    rootNode,
    currentVDomTree
  };
};

module.exports = initDom;
