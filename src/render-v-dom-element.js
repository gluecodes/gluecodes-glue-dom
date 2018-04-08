const createVDomElement = require('./create-v-dom-element');

const renderVDomElement = (
  name,
  triggerNestedRender = null,
  _createVDomElement = createVDomElement
) => {
  const isItTextNode = typeof name === 'string' && triggerNestedRender === null;

  if (isItTextNode) {
    const text = name;

    return text;
  }

  const props = {};
  const argsToBePassedToElementCreator = [name, props];

  // eslint-disable-next-line no-shadow
  const nestedRender = (name, triggerRestedRender) => {
    const nestedElement = renderVDomElement(name, triggerRestedRender, _createVDomElement);

    argsToBePassedToElementCreator.push(nestedElement);
  };

  const isItComponent = typeof name === 'function';

  triggerNestedRender(props, nestedRender);

  if (isItComponent) {
    const component = name;

    return component(props);
  }

  return createVDomElement(...argsToBePassedToElementCreator);
};

module.exports = renderVDomElement;
