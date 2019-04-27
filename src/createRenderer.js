import renderVDomTree from './renderVDomTree'

export default (config = {}) => (...args) => renderVDomTree(...args, config)
