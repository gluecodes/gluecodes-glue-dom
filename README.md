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

```javascript
import { renderVDomTree } from 'gluecodes-glue-dom';

export default (({
  items
}) => renderVDomTree('div', (props, $) => {
  if (items.length === 0) {
    $('span', (props, $) => {
      $('no items');
      return props;
    });
    return props;
  }

  $('ul', (props, $) => {
    items.forEach((item, index) => {
      const isItemIndexEven = (index % 2) === 0;
      const style = {};

      $('li', (props, $) => {
        if (isItemIndexEven) {
          style.backgroundColor = '#CCC';
        }

        if (!item.isRelevant) {
          style.textDecoration = 'line-through';
        }

        props.style = style;

        $(item.name);
        return props;
      });
    });
    return props;
  });
  return props;
}));
```

### Features
- Virtual DOM declaration
- initialising and updating DOM
- support of `onTurnedIntoDom` event which passes created DOM element as `{ target }`
- handling local links (`/^\//.test(a.href)`) by using `window.history.pushState`
- generating GlueDOM component code from given URL/HTML file

### Element declaration

```javascript
renderVDomTree('div', (props, $) => {
  props.attributes = { // HTML attributes
    'data-some-data-key': 'someDataValue'
  };
  props.className = 'some-class'; // class
  props.style = { // styles, either object or string like: color: green; font-weight: bold
    color: 'green',
    fontWeight: 'bold'
  };



  $('br', {}); // no props, nested elements nor inner text



  $('i', { className: 'some-class' }); // no nested elements nor inner text



  $('span', (props, $) => {
    props.className = 'some-class';

    $('some text'); // declares inner text
    return props;
  });



  $('input', (props) => {
    props.type = 'text';
    props.onkeyup = e => console.log(e.target.value); // register event listener
    props.onTurnedIntoDom = ({ target }) => target.focus(); // gives focus to this input

    return props;
  });



  $(renderSomeComponent, { somePropKey: 'somePropValue' }); // renders other component to be nested (result of other renderVDomTree(...))



  $('span', (props, $) => { // nested elements
    props.className = 'some-class';

    $('some ');

    $('span', (props, $) => {
      props.style = {
        textDecoration: 'underline'
      };

      $('underlined text');
      return props;
    });

    return props;
  });



  return props;
};
```

### Simple SPA

```javascript
import {
  initDom,
  renderVDomTree,
  updateDom
} from 'gluecodes-glue-dom';

const domState = initDom({ domContainerElement: window.document.body }); // initialises V-DOM

const renderSomeComponent = ({ // example component, normally you'd have it in a separate file
  items
}) => renderVDomTree('div', (props, $) => { // creates a component V-DOM tree
  if (items.length) {
    $('span', (props, $) => {
      $('no items');
      return props;
    });
    return props;
  }

  $('ul', (props, $) => {
    items.forEach((item, index) => {
      const isItemIndexEven = (index % 2) === 0;
      const style = {};

      $('li', (props, $) => {
        if (isItemIndexEven) {
          style.backgroundColor = '#CCC';
        }

        if (!item.isRelevant) {
          style.textDecoration = 'line-through';
        }

        props.style = style;

        $(item.name);
        return props;
      });
    });
    return props;
  });
  return props;
});

const renderPage = async () => {
  const { rootNode, currentVDomTree } = domState;

  // async data providers to be called here

  const newVDomTree = renderVDomTree('div', (props, $) => { // creates container V-DOM tree to be diffed
    props.className = 'container';

    $(renderSomeComponent, {
      items: [
        {
          isRelevant: true,
          name: 'one'
        },
        {
          isRelevant: false,
          name: 'two'
        },
        {
          isRelevant: true,
          name: 'three'
        }
      ]
    });

    return props;
  });

  Object.assign(domState, updateDom({ // diffs V-DOM and applies resulted changes
    rootNode,
    currentVDomTree,
    newVDomTree
  }));
}

renderPage();
```

### Generating components
```bash
npm run generate-component --silent -- file:///path/to/input.html 'VALID CSS SELECTOR' > output.js
```

### Generated code example
Run:

```bash
npm run generate-component --silent -- https://blackrockdigital.github.io/startbootstrap-bare/ .navbar-collapse
```

Result:

```javascript
import { renderVDomTree } from 'gluecodes-glue-dom';

export default (({
  actionResults: {},
  actions: {}
} = {}) => renderVDomTree('div', (props, $) => {
  props.className = 'collapse navbar-collapse';
  props.id = 'navbarResponsive';
  $('ul', (props, $) => {
    props.className = 'navbar-nav ml-auto';
    $('li', (props, $) => {
      props.className = 'nav-item active';
      $('a', (props, $) => {
        props.className = 'nav-link';
        props.href = '#';
        $('Home ');
        $('span', (props, $) => {
          props.className = 'sr-only';
          $('(current)');
          return props;
        });
        return props;
      });
      return props;
    });
    $('li', (props, $) => {
      props.className = 'nav-item';
      $('a', (props, $) => {
        props.className = 'nav-link';
        props.href = '#';
        $('About');
        return props;
      });
      return props;
    });
    $('li', (props, $) => {
      props.className = 'nav-item';
      $('a', (props, $) => {
        props.className = 'nav-link';
        props.href = '#';
        $('Services');
        return props;
      });
      return props;
    });
    $('li', (props, $) => {
      props.className = 'nav-item';
      $('a', (props, $) => {
        props.className = 'nav-link';
        props.href = '#';
        $('Contact');
        return props;
      });
      return props;
    });
    return props;
  });
  return props;
}));
```

### Tests
WIP

### Contributing
WIP

### License

[MIT](https://github.com/gluecodes/gluecodes-glue-dom/blob/master/LICENSE.md)
