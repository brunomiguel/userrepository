# vue-context-menu-popup

[![GitHub open issues](https://img.shields.io/github/issues/Johnathan/vue-context-menu-popup.svg)](https://github.com/Johnathan/vue-context-menu-popup/issues)
[![Npm version](https://img.shields.io/npm/v/vue-context-menu-popup.svg)](https://www.npmjs.com/package/vue-context-menu-popup)

## Usage

```HTML
<ContextMenu ref="contextMenu" :menu-items="menuItems"/>

<div class="context-menu-trigger"
	@click.right.prevent="$refs.contextMenu.open($event)">
    Right Click Me!
</div>
```

```javascript
import ContextMenu from 'vue-context-menu-popup'
import 'vue-context-menu-popup/dist/vue-context-menu-popup.css';

export default {
  data() {
    return {
        menuItems: [
        {
          label: 'First Menu Item',
        },
        {
          label: 'Disabled Menu Item',
          disabled: true,
        },
        {
          label: 'I have children',
          children: [
            {
              label: 'Child Item 1',
            },
            {
              label: 'I also have children',
              children: [
                {
                  label: 'Child Item 2',
                },
              ],
            },
          ],
        },
        ]
    }
  },
  components: {
    ContextMenu
  }
}
```

## API

### context-menu 

A simple context menu component

```html
<ContextMenu :menu-items="[....]"/>
``` 

#### props 

- `menu-items` ***Array*** (*required*) 

#### data 

- `visible` 

**initial value:** `false` 

- `contextMenuPosition` 

**initial value:** `[object Object]` 

- `openPosition` 

**initial value:** `'context-menu-open-right'` 

#### methods 

- `close()` 

- `open(position)` 

  Accepts an Object with an `x, y` position or an instance of Event 

## Installation

```
npm install vue-context-menu-popup
```

## Project setup

```
npm install
```

### Compiles and hot-reloads for development

```
npm run serve
```

### Compiles and minifies for production

```
npm run build
```

### Lints and fixes files

```
npm run lint
```

### Run your unit tests

```
npm run test:unit
```

### Update the API section of README.md with generated documentation

```
npm run doc:build
```
