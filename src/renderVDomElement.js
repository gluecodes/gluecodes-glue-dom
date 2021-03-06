const renderVDomElement = (
  tagName,
  nestedRenderOrProps = null,
  config = {}
) => {
  if (typeof tagName !== 'string' || !tagName) {
    throw new Error('\'tagName\' must be provided')
  }

  const {
    createDomElement,
    formatters = {}
  } = config

  const isSecondArgNestedRenderHook = typeof nestedRenderOrProps === 'function'
  const renderedElementProps = isSecondArgNestedRenderHook ? {} : (nestedRenderOrProps || {})
  const creatorArgList = [tagName, renderedElementProps]

  if (isSecondArgNestedRenderHook) {
    nestedRenderOrProps(renderedElementProps, {
      component: (component, props) => {
        creatorArgList.push(component(props))
      },
      tag: (...args) => creatorArgList.push(renderVDomElement(...(args.length === 2 ? args : [args[0], null]), config)) && undefined,
      text: (...args) => {
        const { shouldRender, chunks } = args.reduce((acc, chunk) => {
          const wrappers = []
          const traverseChunk = (level) => {
            const [formatterName] = Object.keys(level)

            if (typeof formatters[formatterName] !== 'function') {
              throw new Error(`Missing formatter: ${formatterName}`)
            }

            const isItFormattedValue = !(
              level[formatterName] instanceof Object && level[formatterName].constructor.name === 'Object'
            )

            if (isItFormattedValue) {
              wrappers.push(formatters[formatterName]({}))
              acc.shouldRender = acc.shouldRender && !!level[formatterName]
              acc.chunks.push({ wrappers, value: level[formatterName] })
              return acc
            }

            // eslint-disable-next-line no-prototype-builtins
            const isItFormatterWithSettings = level[formatterName].hasOwnProperty('value')

            wrappers.push(formatters[formatterName](isItFormatterWithSettings ? level[formatterName] : {}))

            if (isItFormatterWithSettings) {
              const isItsValueNestedFormatter = level[formatterName].value instanceof Object &&
                level[formatterName].constructor.name === 'Object'

              if (isItsValueNestedFormatter) {
                return traverseChunk(level[formatterName].value)
              }

              acc.shouldRender = acc.shouldRender && !!level[formatterName].value
              acc.chunks.push({ wrappers, value: level[formatterName].value })
              return acc
            }

            return traverseChunk(level[formatterName])
          }

          const isItUnformattedChunk = !(chunk instanceof Object && chunk.constructor.name === 'Object')

          if (isItUnformattedChunk) {
            acc.shouldRender = acc.shouldRender && (!!chunk || chunk === 0)
            acc.chunks.push({ wrappers, value: chunk })
            return acc
          }

          return traverseChunk(chunk)
        }, { shouldRender: true, chunks: [] })

        if (!shouldRender) { return }

        chunks.forEach(({ value, wrappers }) => {
          if (wrappers.length === 0) {
            creatorArgList.push(value)
            return
          }

          const wrappingTag = wrappers
            .reverse()
            .reduce((a, { tag, props }, index) => createDomElement(...(
              index === 0 ? [tag, props, value] : [tag, props, a]
            )), undefined)

          creatorArgList.push(wrappingTag)
        })
      }
    })
  }

  return createDomElement(...creatorArgList)
}

export default renderVDomElement
