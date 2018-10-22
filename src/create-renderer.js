import renderVDomTree from './render-v-dom-tree';

export default config => (...args) => renderVDomTree(...args, config);
