# glue.codes
## Glue DOM

Glue DOM is a set of functions which improve Virtual DOM declaration and allow to generate components out of HTML files.

### Generating components
```bash
npm run generate-component --silent -- file:///path/to/input.html 'VALID CSS SELECTOR' > output.js
```

### Component example
Run:

```bash
npm run generate-component --silent -- https://blackrockdigital.github.io/startbootstrap-bare/ .navbar-collapse
```

Result:

```javascript
import { renderVDomTree } from 'gluecodes-glue-dom';

export default (({} = {}) => renderVDomTree('div', (props, $) => {
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
