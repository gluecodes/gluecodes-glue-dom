const diff = require('virtual-dom/diff');
const patch = require('virtual-dom/patch');

const updateDom = ({
  rootNode,
  currentVDomTree,
  newVDomTree
} = {}) => {
  const patches = diff(currentVDomTree, newVDomTree);

  return {
    rootNode: patch(rootNode, patches),
    currentVDomTree: newVDomTree
  };
};

module.exports = updateDom;
