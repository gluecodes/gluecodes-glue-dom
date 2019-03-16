const createRenderer = require('./src/create-renderer');
const createVirtualDomEnhancer = require('./src/create-virtual-dom-enhancer');
const initDom = require('./src/init-dom');
const renderVDomTree = require('./src/render-v-dom-tree');
const updateDom = require('./src/update-dom');

module.exports = {
  createRenderer,
  createVirtualDomEnhancer,
  initDom,
  renderVDomTree,
  updateDom
};
