const h = require('virtual-dom/h');

const defaultVDomCreator = (name, props, ...children) => h(name, props, children);

const defaultPropEnhancers = {
  onTurnedIntoDom: (prop) => {
    const Hook = function Hook() {};

    Hook.prototype.hook = node => prop({ target: node });
    return { onTurnedIntoDom: new Hook() };
  }
};

const renderVDomElement = (
  name,
  nestedRenderOrProps = null,
  config = {}
) => {
  const {
    createVDomElement = defaultVDomCreator,
    formatters = {},
    propEnhancers = defaultPropEnhancers
  } = config;

  const isSecondArgNestedRenderHook = typeof nestedRenderOrProps === 'function';
  const renderedElementProps = isSecondArgNestedRenderHook ? {} : (nestedRenderOrProps || {});
  const creatorArgList = [name, renderedElementProps];

  if (isSecondArgNestedRenderHook) {
    nestedRenderOrProps(renderedElementProps, {
      component: (component, ...args) => creatorArgList.push(component(...args)) && undefined,
      tag: (...args) => creatorArgList.push(renderVDomElement(...args, config)) && undefined,
      text: (...args) => {
        const { shouldRender, chunks } = args.reduce((acc, chunk) => {
          const wrappers = [];
          const traverseChunk = (level) => {
            const [formatterName] = Object.keys(level);

            if (typeof formatters[formatterName] !== 'function') {
              throw new Error(`Missing formatter: ${formatterName}`);
            }

            const isItFormattedValue = !(
              level[formatterName] instanceof Object && level[formatterName].constructor.name === 'Object'
            );

            if (isItFormattedValue) {
              wrappers.push(formatters[formatterName]({}));
              acc.shouldRender = acc.shouldRender && !!level[formatterName];
              acc.chunks.push({ wrappers, value: level[formatterName] });
              return acc;
            }

            // eslint-disable-next-line no-prototype-builtins
            const isItFormatterWithSettings = level[formatterName].hasOwnProperty('value');

            wrappers.push(formatters[formatterName](isItFormatterWithSettings ? level[formatterName] : {}));

            if (isItFormatterWithSettings) {
              const isItsValueNestedFormatter = level[formatterName].value instanceof Object
                && level[formatterName].constructor.name === 'Object';

              if (isItsValueNestedFormatter) {
                return traverseChunk(level[formatterName].value);
              }

              acc.shouldRender = acc.shouldRender && !!level[formatterName].value;
              acc.chunks.push({ wrappers, value: level[formatterName].value });
              return acc;
            }

            return traverseChunk(level[formatterName]);
          };

          const isItUnformattedChunk = !(chunk instanceof Object && chunk.constructor.name === 'Object');

          if (isItUnformattedChunk) {
            acc.shouldRender = acc.shouldRender && !!chunk;
            acc.chunks.push({ wrappers, value: chunk });
            return acc;
          }

          return traverseChunk(chunk);
        }, { shouldRender: true, chunks: [] });

        if (!shouldRender) { return; }

        chunks.forEach(({ value, wrappers }) => {
          if (wrappers.length === 0) {
            creatorArgList.push(value);
            return;
          }

          const wrappingTag = wrappers
            .reverse()
            .reduce((a, { tag, props }, index) => createVDomElement(...(
              index === 0 ? [tag, props, value] : [tag, props, a]
            )), undefined);

          creatorArgList.push(wrappingTag);
        });
      }
    });
  }

  Object.keys(propEnhancers).forEach((targetPropName) => {
    const enhancer = propEnhancers[targetPropName];

    if (typeof enhancer !== 'function') { return; }

    Object.assign(renderedElementProps, enhancer(renderedElementProps[targetPropName]));
  });

  return createVDomElement(...creatorArgList);
};

module.exports = renderVDomElement;
