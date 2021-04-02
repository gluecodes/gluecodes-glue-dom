# @gluecodes

## GlueDOM

Makes non-trivial UI components easy to read and maintain.

Also, bye bye Virtual DOM! Instead, we're shifting our solutions towards compilation-time DOM diffing using [Solid](https://github.com/ryansolid/solid)

<p align="center"><img width="100%" src="https://github.com/gluecodes/gluecodes-glue-dom/blob/master/glue-dom.png" alt="GlueDOM"></p>

- Gradual learning curve, no need to learn another templating syntax (directives etc.).
- Reads sequentially as HTML while remaining readable and maintainable.
- Isn't a mix of HTML and JavaScript drawing a clear border between view and logic.
- Allows to format texts without writing nested inline tags.
- Makes writing dynamic texts easier with no need for checking whether variables are non-empty.

### Table of Contents

- [Problem](#problem)
- [Syntax Comparison](#syntax-comparison)
  - [JSX](#jsx)
  - [HyperScript](#hyperscript)
  - [GlueDOM](#gluedom)
- [Installation](#installation)
- [Basic Usage](#basic-usage)
- [Advanced Usage](#advanced-usage)
- [GlueDOM Syntax](#gluedom-syntax)
  - [Rendering a Tag](#rendering-a-tag)
  - [Inside Tag Callback](#inside-tag-callback)
- [Api](#api)
- [Contributing](#contributing)
- [License](#license)

### Problem

The ideal syntax for rendering DOM should mimic HTML in a way it reads sequentially from top to bottom.
For single logical UI unit, there shouldn't be a need for local variable declarations or using partial functions. 

Consider the two most common ways of rendering DOM; JSX and HyperScript. They work well in simple demo scenarios with no nested conditional logic. 
When the nested conditionals are required, you end up using a mix of logical expressions, ternary and spread operators.

### Syntax Comparison

Consider the following example; Write a function which renders condition-based HTML. 
There is `someCondition` prop which needs to be truthy to display a section which contains other nested conditionals. 
`firstProgrammer` and `secondProgrammer` are both optional.

#### JSX

Since you can't use block statements, you're forced to use unreadable mix of logical and ternary operators.

```jsx
({ 
  firstProgrammer,
  secondProgrammer,
  someCondition
}) => (
  <div>
    {someCondition
    && (firstProgrammer && secondProgrammer
      ? <p><bold>{firstProgrammer}</bold>, you're going to do pair-programming with {secondProgrammer}.</p>
      : (firstProgrammer && !secondProgrammer
        ? <p><bold>{firstProgrammer}</bold>, you'll code this task by yourself.</p>
        : <p>Hey man! Can you tell us your name before we give you job to do?</p>))

    }
  </div>
)
```

#### HyperScript

Similarly to JSX, yet to the mix of unreadable ternary operators you're forced to add spread operator.

```javascript
({ 
  firstProgrammer,
  secondProgrammer,
  someCondition
}) => h('div', {}, [
  ...(someCondition ? [h('p', {}, [
    ...(firstProgrammer && secondProgrammer ? [
      h('strong', {}, [
        firstProgrammer
      ]),
      `, you're going to do pair-programming with ${secondProgrammer}.`,
    ] : []),
    ...(firstProgrammer && !secondProgrammer ? [
      h('strong', {}, [
        firstProgrammer
      ]),
      ', you\'ll code this task by yourself.',
    ] : []),
  ...(!firstProgrammer && !secondProgrammer ? [
      'Hey man! Can you tell us your name before we give you job to do?',
    ] : [])
  ])] : [])
])
```

#### GlueDOM

Here you can use block statements. When calling `text`, all its arguments are checked whether they are truthy and only if they are, they will be concatenated and rendered. 
There is also a concept of formatters which are configured when initializing the top-most `tag`, and they can wrap texts inside a chosen tag and apply CSS classes on it. 
In this case `bold` is configured to wrap props inside `<strong/>` tag. 
Nesting is possible by simply nesting objects e.g. `{ bold: { italic: 'some text' } }`.

```javascript
({ 
  firstProgrammer,
  secondProgrammer,
  someCondition
}) => (
  tag('div', (props, { tag }) => {
    if (someCondition) {
      tag('p', (props, { text }) => {
        text({ bold: firstProgrammer }, ', you\'re going to do pair-programming with ', secondProgrammer, '.')
        
        if (!secondProgrammer) {
          text({ bold: { italic: firstProgrammer } }, ', you\'ll code this task by yourself.')
        }
        
        if (!firstProgrammer && !secondProgrammer) {
          text('Hey man! Can you tell us your name before we give you job to do?')
        }
      })
    }
  })
)
```

### Installation

Run:
```bash
yarn add http://gluecodes-components.s3-website-eu-west-1.amazonaws.com/glueDom-3.0.0.tar.gz
```
Or:
```bash
npm i http://gluecodes-components.s3-website-eu-west-1.amazonaws.com/glueDom-3.0.0.tar.gz --save
```

### Basic usage

`renderer.js`:

```javascript
import React from 'react'
import { createRenderer } from '@gluecodes/glueDom'

export default createRenderer({
  createVDomElement: React.createElement
})
```

`component.js`:

```javascript
import tag from './renderer'

export default () => tag('div', (props, { text }) => {
  text('hello world!')
}) 
```

### Advanced Usage

`renderer.js`:

```javascript
import React from 'react'
import { createRenderer } from '@gluecodes/glueDom'
import styles from './textFormatters.css'

export default createRenderer({
  createVDomElement: React.createElement,
  formatters: {
    bold: () => ({
      tag: 'strong',
      props: { className: styles.bold }
    }),
    italic: () => ({
      tag: 'span',
      props: { className: styles.italic }
    })
  }
})
```

`component.js`:

```javascript
import tag from './renderer'

export default ({
  email,
  firstName,
  interests,
  surname
}) => (
  tag('p', (props, { text }) => {
    text(
      'You can format an email like this: "', { bold: { italic: email } },
      '" and the whole sentence will appear only if email: ', email, ', firstName: ', firstName, ' and surname: ', surname, 'aren\'t empty. ',
      'It can be especially useful when generating documents from ', { bold: 'dynamic' }, ' fields coming from backend.'
    )
  })
)
```

	
### GlueDOM Syntax 

#### Rendering a tag

**Nesting**

```
tag(tagName, (props, { component, tag, text }) => { 
  props.className = 'outerMostTag'
  
  tag(tagName, (props, { component, tag, text }) => { 
    props.className = 'innerTag'
    
    tag(tagName, (props, { component, tag, text }) => { 
      props.className = 'innerMostTag'
      
      ...      
    })
  })
})
```

**Assigning props to an element containing child elements or text**

```
tag(tagName, (props, { text }) => {
  props.className = 'someClass'
  props.title = 'some tooltip'
  
  ...

  text('some text')
})
```

**No child elements nor text**

```
tag(tagName, {
  [props]
})
```

**No child elements nor props**
```
tag(tagName)
```

#### Inside Tag Callback

**Nested Tag**

```
tag(tagName, ...)
```

**Components**

```
component(reusableUiPiece, props)
```

**Text**

```
text(...[textChunk,])
```

- `tagName` A string that specifies the type of element to be created 
- `props` An object to assign element props/attributes
- `component` A function to render component
- `tag` A function to create an element
- `text` A function to create text
- `reusableUiPiece` A function returning reusable DOM
- `textChunk` Either a string or an object which uses text formatters. If any chunk is empty, the whole sentence won't be rendered

### API

```javascript
createRenderer(config)
```

- `createRenderer()` A function to create initial `tag()` function based on provided `config`
- `config` (optional) An object containing configuration
  - `config.createDomElement` (optional) A function to create DOM element. 
  When specified, it should implement HyperScript-like interface/API   
  - `config.formatters` An object of functions. They may be used in `text()` to wrap given string into `tag` with `props` of `config.formatters[formatterName]() => ({ tag, props })`
    - `formatterName` A string identifying a formatter which may be used in `text()` like `text({ [formatterName]: 'given string' })`
    - `tag` A string that specifies the type of element to be used for text wrapping
    - `props` An object of props to be set on the wrapping element

### Contributing

Feel free to rise issues, open PRs or contact at hello@glue.codes about any ideas/criticism.

### License

[MIT](https://github.com/gluecodes/gluecodes-glue-dom/blob/master/LICENSE.md)
