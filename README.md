# glue.codes
## GlueDOM

GlueDOM is a set of functions to let developers declare and generate Virtual-DOM-based, "functional" components with the least effort.

It has been designed based on the following statements:
- Using JavaScript instead of a templating language reduces necessity of learning and maintaining another syntax which is always more limited than JavaScript.
- Nesting tags in HTML makes it readable and quite likely it was the reason to accept having HTML inside JavaScript i.e. JSX.
- JSX isn't just HTML injected inside JavaScript. It can contain JavaScript expressions inside curly brackets, and those expressions can contain nested JSX. Having `JavaScript -> HTML -> JavaScript -> HTML...`, can get (and often gets) overwhelmingly complex.
- We find HTML easy to read because it's sequential and we read it from top to bottom without jumping around.
- There is Hyperscript. However, when you need to use "if" statements or loops, you end up declaring variables, sacrificing the sequential nature of HTML. Also it doesn't really reflect tag nesting which makes reading the code even harder.

Compare the following two snippets and judge for yourself which one is more readable and less pain for iterative improvements:

```jsx
import React from 'react';

class SomeComponent extends React.Component {
  render() {
    const listItems = this.props.items.map((item, index) => {
      const isItemIndexEven = (index % 2) === 0;
      const style = {};

      if (isItemIndexEven) {
        style.backgroundColor = '#CCC';
      }

      if (!item.isRelevant) {
        style.textDecoration = 'line-through';
      }

      return <li style={style}>{item.name}</li>
    });

    return (
      <div>
      {
        this.props.items.length === 0
          ? <span>no items</span>
          : <ul>{listItems}</ul>
      }
      </div>
    );
  }
}
```

vs.

WIP

### Features
- Virtual DOM declaration
- initialising and updating DOM
- support of `onTurnedIntoDom` event which passes created DOM element as `{ target }`
- ???handling local links (`/^\//.test(a.href)`) by using `window.history.pushState`

### Element declaration
WIP


### Tests
WIP

### Contributing
WIP

### License

[MIT](https://github.com/gluecodes/gluecodes-glue-dom/blob/master/LICENSE.md)
