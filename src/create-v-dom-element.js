const h = require('virtual-dom/h');

const createVDomElement = (name, props, ...children) => h(name, props, children);

module.exports = createVDomElement;
