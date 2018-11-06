const renderVDomTree = require('./render-v-dom-tree');

module.exports = config => (...args) => renderVDomTree(...args, config);
