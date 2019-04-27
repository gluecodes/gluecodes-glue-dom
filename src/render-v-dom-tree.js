import renderVDomElement from './render-v-dom-element'

export default (tagName, nestedRender, config) => {
  let vDomTree = null;

  // eslint-disable-next-line no-shadow
  (tag => tag(tagName, nestedRender))((tagName, render) => {
    vDomTree = renderVDomElement(tagName, render, config)
  })

  return vDomTree
}
