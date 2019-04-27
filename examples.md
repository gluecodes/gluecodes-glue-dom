## Examples

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

- `tagName` - A string that specifies the type of element to be created 
- `props` - An object to assign element props/attributes
- `component` - A function to render component
- `tag` - A function to create an element
- `text` - A function to create text

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

### Examples

Rendering text

```javascript
text('some text')
```

Rendering tags without any props/attributes nor child elements

```javascript
tag('br')
```

Rendering tags with props/attributes but no child elements

```javascript
tag('input', {
  attributes: { // assigning attributes
    'data-some-data-arg': 'some value',
    role: 'some-role'
  },
  type: 'checkbox' // assigning props
})
```

Rendering nested tags

```javascript
tag('ul', (props, { tag }) => {
  props.attributes = { // assigning attributes
    'data-some-data-arg': 'some value',
     role: 'some-role'
  }
  props.className = 'some-list' // assigning props
    
  for (const interestName of interests) {
    tag('li', (props, { text }) => { // rendering Array items
      text(interestName)
    })
  }  
})
```

### Rendering components

renderer.js

```javascript
import { createRenderer } from '@gluecodes/glue-dom'

export default createRenderer()
```

reusableHtmlPiece.js

```javascript
import tag from './renderer'

export default ({ someProp }) => tag('input', {
  type: 'text',
  value: someProp
})
```

hostComponent.js

```javascript
import tag from './renderer'
import reusableHtmlPiece from 'reusableHtmlPiece'

export default () => tag('div', (props, { component }) => {
  component(reusableHtmlPiece, { // rendering reusable HTML
    someProp: 'some value' // passing props to reusable reusableHtmlPiece() function
  })  
})
```
