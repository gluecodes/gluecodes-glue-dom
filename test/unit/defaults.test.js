const { expect } = require('chai')
const sinon = require('sinon')

const { createRenderer } = require('../../dist/main.bundle')

describe('defaults', () => {
  it('should throw an error when tagName not provided', (done) => {
    const tagName = undefined
    const nestedRenderOrProps = undefined
    const config = {
      createDomElement: undefined,
      formatters: undefined,
      propEnhancers: undefined
    }
    const tag = createRenderer(config)

    try {
      tag(
        tagName,
        nestedRenderOrProps
      )

      done(new Error('should throw an error'))
    } catch (err) {
      expect(err).to.nested.include({ message: '\'tagName\' must be provided' })
      done()
    }
  })

  it('should create empty span element', () => {
    const tagName = 'span'
    const nestedRenderOrProps = undefined
    const config = {
      createDomElement: (tagName, props, ...children) => ({ tagName, properties: props, children }),
      formatters: undefined,
      propEnhancers: undefined
    }
    const tag = createRenderer(config)

    const result = tag(
      tagName,
      nestedRenderOrProps
    )

    expect(result).to.nested.include({ tagName: 'span' })
    expect(result).to.have.nested.property('properties').that.is.an('object').and.is.empty
    expect(result).to.have.nested.property('children').that.is.an('array').and.is.empty
  })

  it('should create a span element with a className but no children', () => {
    const EX_CLASS_NAME = 'some-class'
    const tagName = 'span'
    const nestedRenderOrProps = { className: EX_CLASS_NAME }
    const config = {
      createDomElement: (tagName, props, ...children) => ({ tagName, properties: props, children }),
      formatters: undefined,
      propEnhancers: undefined
    }
    const tag = createRenderer(config)

    const result = tag(
      tagName,
      nestedRenderOrProps
    )

    expect(result).to.nested.include({ tagName: 'span' })
    expect(result).to.nested.include({ 'properties.className': EX_CLASS_NAME })
    expect(result).to.have.nested.property('children').that.is.an('array').and.is.empty
  })

  it('should create a div element with a className and child span', () => {
    const EX_CLASS_NAME = 'some-class'
    const tagName = 'div'
    const nestedRenderOrProps = (props, { tag }) => {
      props.className = EX_CLASS_NAME
      tag('span')
    }
    const config = {
      createDomElement: (tagName, props, ...children) => ({ tagName, properties: props, children }),
      formatters: undefined,
      propEnhancers: undefined
    }
    const tag = createRenderer(config)

    const result = tag(
      tagName,
      nestedRenderOrProps
    )

    expect(result).to.nested.include({ tagName: 'div' })
    expect(result).to.nested.include({ 'properties.className': EX_CLASS_NAME })
    expect(result).to.nested.include({ 'children[0].tagName': 'span' })
  })
})
