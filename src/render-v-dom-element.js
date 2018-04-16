const createVDomElement = require('./create-v-dom-element');

const renderVDomElement = (
  name,
  triggerNestedRenderOrProps = null,
  _createVDomElement = createVDomElement
) => {
  const isItTextNodeRendering = (typeof name === 'string' || typeof name === 'number')
    && triggerNestedRenderOrProps === null;

  const isItComponentRendering = typeof name === 'function';

  if (isItTextNodeRendering) {
    const text = name;

    return text;
  }

  const isSecondArgNestedRenderHook = typeof triggerNestedRenderOrProps === 'function';
  const props = isSecondArgNestedRenderHook ? {} : (triggerNestedRenderOrProps || {});
  const argsToBePassedToElementCreator = [name, props];

  // eslint-disable-next-line no-shadow
  const nestedRender = (name, triggerNestedRender) => {
    const nestedElement = renderVDomElement(name, triggerNestedRender, _createVDomElement);

    argsToBePassedToElementCreator.push(nestedElement);
  };

  if (!isItComponentRendering) {
    if (isSecondArgNestedRenderHook) {
      triggerNestedRenderOrProps(props, nestedRender);
    }

    if (typeof props.onTurnedIntoDom === 'function') {
      const Hook = function () {};
      const { onTurnedIntoDom } = props;

      Hook.prototype.hook = node => onTurnedIntoDom({ target: node });
      props.onTurnedIntoDom = new Hook();
    }

    return createVDomElement(...argsToBePassedToElementCreator);
  }

  const component = name;

  return component(props);
};

module.exports = renderVDomElement;
