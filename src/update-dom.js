const diff = require('virtual-dom/diff');
const patch = require('virtual-dom/patch');

const updateDom = ({
  rootNode,
  currentVDomTree,
  newVDomTree
} = {}) => {
  const patches = diff(currentVDomTree, newVDomTree);
  const affectedNodes = [];
  const updatedRootNode = patch(rootNode, patches, {
    onPatchBeingApplied({ node }) {
      affectedNodes.push(node);
    }
  });

  return {
    affectedNodes,
    currentVDomTree: newVDomTree,
    rootNode: updatedRootNode
  };
};

module.exports = updateDom;
