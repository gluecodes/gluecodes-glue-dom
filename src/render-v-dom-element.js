const createVDomElement = require('./create-v-dom-element');

const formatters = {

};

const renderVDomElement = (
  name,
  nestedRenderOrProps = null
) => {
  const isSecondArgNestedRenderHook = typeof nestedRenderOrProps === 'function';
  const renderedElementProps = isSecondArgNestedRenderHook ? {} : (nestedRenderOrProps || {});
  const creatorArgList = [name, renderedElementProps];

  if (isSecondArgNestedRenderHook) {
    nestedRenderOrProps(renderedElementProps, {
      component: (component, ...args) => creatorArgList.push(component(...args)) && undefined,
      tag: (...args) => creatorArgList.push(renderVDomElement(...args)) && undefined,
      text: (...args) => {
        const { shouldRender, chunks } = args.reduce((a, chunk) => {
          const wrappers = [];
          const traverseChunk = (level) => {
            const [formatterName] = Object.keys(level);

            if (typeof formatters[formatterName] !== 'function') {
              throw new Error(`Missing formatter: ${formatterName}`);
            }

            const isItFormattedValue = !(level[formatterName] instanceof Object
            && level[formatterName].constructor.name === 'Object');

            if (isItFormattedValue) {
              wrappers.push(formatters[formatterName]({}));
              a.shouldRender = a.shouldRender && !!level[formatterName];
              a.chunks.push({ wrappers, value: level[formatterName] });
              return a;
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

              a.shouldRender = a.shouldRender && !!level[formatterName].value;
              a.chunks.push({ wrappers, value: level[formatterName].value });
              return a;
            }

            return traverseChunk(level[formatterName]);
          };

          const isItUnformattedChunk = !(chunk instanceof Object && chunk.constructor.name === 'Object');

          if (isItUnformattedChunk) {
            a.shouldRender = a.shouldRender && !!chunk;
            a.chunks.push({ wrappers, value: chunk });
            return a;
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

  return createVDomElement(...creatorArgList);
};

module.exports = renderVDomElement;
