const createRenderer = require('./src/create-renderer').default;
const generateGlueDomComponent = require('./src/generate-glue-dom-component');
const initDom = require('./src/init-dom');
const renderVDomTree = require('./src/render-v-dom-tree');
const updateDom = require('./src/update-dom');

module.exports = {
  createRenderer,
  generateGlueDomComponent,
  initDom,
  renderVDomTree,
  updateDom
};
