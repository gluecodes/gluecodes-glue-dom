const createRenderer = require('./src/create-renderer');
const initDom = require('./src/init-dom');
const renderVDomTree = require('./src/render-v-dom-tree');
const updateDom = require('./src/update-dom');

module.exports = {
  createRenderer,
  initDom,
  renderVDomTree,
  updateDom
};
