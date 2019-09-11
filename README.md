# @gluecodes
## GlueDOM

Makes non-trivial UI components easy to read and maintain.

- gradual learning curve, no need to learn another templating syntax (directives etc.)
- reads sequentially as HTML while remaining readable and maintainable
- isn't a mix of HTML and JavaScript drawing a clear border between view and logic
- allows to format texts without writing nested inline tags
- makes writing dynamic texts easier with no need for checking whether variables are non-empty
- provides an intuitive way to reference generated DOM elements e.g. to `.focus()`
- is made to facilitate reusing existing libs and APIs
	- integration with third-party libs to enhance generated DOM, e.g. to use Google ReCaptcha or jQuery plugins
	- creating links for SPA websites
	
### Syntax 

Nesting

```
tag(tagName, (props, { component, tag, text }) => { 
  tag(tagName, (props, { component, tag, text }) => { 
    tag(tagName, (props, { component, tag, text }) => { 
      ...
    })
  })
})
```

No child elements

```
tag(tagName, {
  [props]
})
```

No child elements nor props/attributes
```
tag(tagName)
```

Components

```
component(reusableUiPiece, props)
```

Text

```
text(...[textChunk,])
```

- `tagName` A string that specifies the type of element to be created 
- `props` An object to assign element props/attributes
- `component` A function to render component
- `tag` A function to create an element
- `text` A function to create text
- `reusableUiPiece` A function returning reusable virtual DOM
- `textChunk` Either a string or an object which uses text formatters (see below). If any chunk is empty, the whole sentence won't be rendered

### Basic usage

renderer.js

```javascript
import { createRenderer } from '@gluecodes/glue-dom'

export default createRenderer()
```

component.js
```javascript
import tag from './renderer'

export default tag('div', (props, { text }) => {
  text('hello world!')
}) 
```

#### API

createRenderer()

```javascript
createRenderer(config)
```

- `createRenderer()` A function to create initial `tag()` function based on provided `config`
- `config` (optional) An object containing configuration
  - `config.createVDomElement` (optional) A function to create virtual DOM element. By default `virtual-dom/h` module is used. 
  When specified, it should implement HyperScript-like interface/API   
  - `config.formatters` An object of functions. They may be used in `text()` to wrap given string into `tag` with `props` of `config.formatters[formatterName]() => ({ tag, props })`
    - `formatterName` A string identifying a formatter which may be used in `text()` like `text({ [formatterName]: 'given string' })`
    - `tag` A string that specifies the type of element to be used for text wrapping
    - `props` An object of props to be set on the wrapping element
  - `config.propEnhancers` An object of functions. They may be used to capture a prop assignation in order to rewrite a tag props object. 
  It's done by assigning a `prop` on tag props, then if one exists in `config.propEnhancers`, 
  the prop is passed to: `config.propEnhancers[enhancerName](propValue) => ([reassignedProps])`
    - `propValue` A mixed value of a prop being assigned  
    - `enhancerName` A string identifying a propEnhancer which should match a prop name to be "emphasized"
    - `reassignedProps` An object to be merged into given tag props

createVirtualDomEnhancer()

```javascript
createVDomEnhancer({
  customFilter,
  enhance,
  filesToLoad,
  name
})
```

- `createVirtualDomEnhancer()` A function to create a prop enhancer that have access to created DOM node. It uses `virtual-dom` hook mechanism (https://github.com/Matt-Esch/virtual-dom/blob/master/docs/hooks.md)
  - `customFilter` A function to determine whether `enhance()` should be called (`({ node, propValue }) => Boolean`)
  - `enhance` A function...
  - `filesToLoad` An object...
  - `name` A string used for the name of a `virtual-dom` hook prop
  
WIP


### Readability & maintainability

Compare the below examples in terms of readability and maintainability.

GlueDOM

```javascript
tag('div', (props, { tag }) => {
  if (someCondition) {
    tag('p', (props, { text }) => {
      text({ emphasized: firstProgrammer }, ', you\'re going to do pair-programming with ', secondProgrammer, '.')
      text({ emphasized: firstProgrammer }, ', you\'ll code this task by yourself.')

      if (!firstProgrammer && !secondProgrammer) {
        text('Hey man! Can you tell us your name before we give you job to do?')
      }
    })
  }
})
```

JSX

```jsx
return (
  <div>
    {someCondition
    && (firstProgrammer && secondProgrammer
      ? <p><bold>{firstProgrammer}</bold>, you're going to do pair-programming with {secondProgrammer}.</p>
      : (firstProgrammer
        ? <p><bold>{firstProgrammer}</bold>, you'll code this task by yourself.</p>
        : <p>Hey man! Can you tell us your name before we give you job to do?</p>))

    }
  </div>
)
```

HyperScript

```javascript
return h('div', {}, [
  ...(someCondition ? [h('p', {}, [
    ...(firstProgrammer && secondProgrammer ? [
      h('strong', {}, [
        firstProgrammer
      ]),
      `, you're going to do pair-programming with ${secondProgrammer}.`,
    ] : []),
    ...(firstProgrammer ? [
      h('strong', {}, [
        firstProgrammer
      ]),
      `, you'll code this task by yourself.`,
    ] : []),
  ...(!firstProgrammer && !secondProgrammer ? [
      'Hey man! Can you tell us your name before we give you job to do?',
    ] : [])
  ])] : [])
])
```

### Highlighted features

Given `renderer.js`

```javascript
import { createRenderer, createVirtualDomEnhancer } from '@gluecodes/glue-dom'
import styles from './textFormatters.css'

export default createRenderer({
  formatters: {
    emphasized: () => ({
      tag: 'strong',
      props: { className: styles.bold }
    }),
    italic: () => ({
      tag: 'span',
      props: { className: styles.italic }
    })
  },
  propEnhancers: {
    autoFocus: createVirtualDomEnhancer({
      name: 'autoFocus',
      enhance ({ node }) {
        node.focus()
      }
    }),
    href: (propValue) => {
      if (!/^\//.test(propValue)) { return {} }

      return {
        onclick (e) {
          e.preventDefault()
          global.history.pushState({}, null, prop)
        }
      }
    },
    initGoogleRecaptcha: createVirtualDomEnhancer({
      name: 'initGoogleRecaptcha',
      filesToLoad: {
        googleRecaptchaApi: 'https://www.google.com/recaptcha/api.js?render=explicit'
      },
      enhance ({ node, propValue }) {
        global.grecaptcha.ready(() => global.grecaptcha.render(node, propValue))
      }
    })
  }
})
```

#### Rendering complex texts

```javascript
import tag from './renderer'

export default ({
  email,
  firstName,
  interests,
  surname
}) => tag('p', (props, { text }) => {
  text(
    'You can e.g. format an email like this: "', { emphasized: { italic: email } },
    '" and the whole sentence will appear only if the email, firstName: ', firstName, ' and surname: ', surname, 'aren\'t empty. ',
    'It can be especially useful when generating documents from ', { emphasized: 'dynamic' }, ' fields coming from backend.'
  )
})
```

#### Enhancing props and referencing generated DOM elements

Setting autofocus on a text input

```javascript
import tag from './renderer'

export default () => tag('div', (props, { tag }) => {
  tag('input', {
    type: 'text',
    autoFocus: true, // see renderer.propEnhancers.autoFocus
    onchange: (e) => {
      console.log(e.target.value)
    }
  })
})
```

Specifying a link which uses browser history.pushState()

```javascript
import tag from './renderer'

export default () => tag('div', (props, { tag }) => {
  tag('a', (props, { text }) => {
    props.href = '/about' // see renderer.propEnhancers.href

    text('some SPA link')
  })
})
```

Embedding external libs e.g. Google ReCaptcha

```javascript
import tag from './renderer'

export default () => tag('div', (props, { tag }) => {
  tag('div', {
    className: 'g-recaptcha',
    initGoogleRecaptcha: { // see renderer.propEnhancers.initGoogleRecaptcha
      callback: () => {
        // do something
      },
      sitekey: 'some key'
    }
  })
})
```

### Tests
WIP

### Contributing

Email hello@glue.codes

### License

[MIT](https://github.com/gluecodes/gluecodes-glue-dom/blob/master/LICENSE.md)
