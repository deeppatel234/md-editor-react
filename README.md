<p align="center">
  <img src="site/public/logo.png" width="40%"/>
</p>

<h2 align="center">Markdown Editor React</h2>

<p align="center">
  <img src="site/public/screenshot.png" />
</p>

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT) [![NPM Download](https://img.shields.io/npm/dt/md-editor-react.svg)](https://www.npmjs.com/package/md-editor-react) [![NPM](https://img.shields.io/npm/v/md-editor-react.svg)](https://www.npmjs.com/package/md-editor-react) [![npm bundle size](https://img.shields.io/bundlephobia/min/md-editor-react)](https://bundlephobia.com/result?p=md-editor-react) [![npm bundle size](https://img.shields.io/bundlephobia/minzip/md-editor-react)](https://bundlephobia.com/result?p=md-editor-react)

## Installation

```sh
$ npm install md-editor-react codemirror --save
```

## MDEditor Usage

MDEditor is used for show editor with editing controlls and live preview

```javascript
import { MDEditor } from 'md-editor-react';

import 'md-editor-react/dist/style.css';

import 'codemirror/mode/gfm/gfm';
import 'codemirror/lib/codemirror.css';

<MDEditor
  defaultValue="Hello World"
/>

```

[CodeMirror](https://github.com/codemirror/CodeMirror "CodeMirror") is dependancy so you have to import codemirror css file and gfm mode for syntax highlighitng.

## MDEditor Props

|props|type|default|description|
| ------ | ------ | ------ | ------ |
|`delay`|number|`300`|input delay for parsing markdown and show html preview|
|`fullScreen`|boolean|`false`|enable fullscreen mode|
|`watchMode`|boolean|`true`|show html view|
|`className`|string||class name applied in wrapper|
|`options`|object|   |codemirror [options](https://codemirror.net/doc/manual.html "options")|
|`onChange`|function|   |editor value on chagne event handler|
|`menuConfig`|list|   |add a menu items in menubar|
|`defaultValue`|string|   |set editor initial value|
|`parserOptions`|object|   |used [marked](https://github.com/markedjs/marked "marked") markdown parser [options](https://marked.js.org/#/USING_ADVANCED.md#options "options")|



## MDPreview Usage

MDPreview is used for parse markdown and preview html

```javascript
import { MDPreview } from 'md-editor-react';

import 'md-editor-react/dist/style.css';

<MDPreview value="markdown value" />

```

## MDPreview Props

|props|type|description|
| ------ | ------ | ------ |
|`value`|string|markdown value to parse and displayed|
|`parserOptions`|object|used [marked](https://github.com/markedjs/marked "marked") markdown parser [options](https://marked.js.org/#/USING_ADVANCED.md#options "options")|
|`sanitizerOptions`|object|[DOMPurify](https://github.com/cure53/DOMPurify "DOMPurify") senitizer [options](https://github.com/cure53/DOMPurify#can-i-configure-dompurify "options")|


## Highlight code in html preview

for highlight code you can used [highlightjs](https://highlightjs.org "highlightjs") library.


#### how to use in MDEditor

```javascript
import { MDEditor } from 'md-editor-react';
import hljs from 'highlight.js';

import 'md-editor-react/dist/style.css';
import 'highlight.js/styles/github-gist.css';

import 'codemirror/mode/gfm/gfm';
import 'codemirror/lib/codemirror.css';

<MDEditor
  defaultValue="Hello World"
  parserOptions={{
    highlight: code => hljs.highlightAuto(code).value,
  }}
/>

```

#### how to use in MDPreview

```javascript
import { MDPreview } from 'md-editor-react';
import hljs from 'highlight.js';

import 'md-editor-react/dist/style.css';
import 'highlight.js/styles/github-gist.css';

<MDPreview
  value="markdown value"
  parserOptions={{
    highlight: code => hljs.highlightAuto(code).value,
  }}
/>

```


## Add Menu Item in Editor

use `menuConfig` props in MDEditor component

```javascript
<MDEditor
  menuConfig={[{
    id: 'uniq_id',
    title: 'Menu Title',
    icon: <MenuIcon />,
    command: editor => { /* write your code here */ },
  }]}
/>

```

|props|type|description|
| ------ | ------ | ------ |
|`id`|string|uniq id|
|`title`|string|title of menu item|
|`icon`|string or component|icon display in menu bar|
|`position`|number|menu item position starting from 1 (divider count included)|
|`command`|function|trigger after menu button clicked. `editor` passed as argument you can modify editor value|
|`component`|component|a react component render after menu clicked. component has `close()` and `editor` props|


#### add divider in menu bar

```javascript
<MDEditor
  menuConfig={[{
     divider: true
  }]}
/>

```

#### Menu item component props

if you want to display model like table, link menu. just import and use MDModel component.

```javascript
import { MDModal, MDInput, MDButton } from 'md-editor-react';


class MenuComponet extends React.PureComponent {
	constructor(props) {
      super(props);

      this.state = {
        text: '',
      };

      this.onClickSuccess = this.onClickSuccess.bind(this);
      this.onChangeInput = this.onChangeInput.bind(this);
    }

    onChangeInput(event) {
      const { name, value } = event.target;
      this.setState({
        [name]: value,
      });
    }

    onClickSuccess() {
      const { text } = this.state;
      const { editor, close } = this.props;

      if (text) {
        editor.replaceSelection(text);
        close();
      }
    }

    render() {
      const { close } = this.props;
      const { text } = this.state;

      return (
        <MDModal visible closable header="Menu Header" onClose={close}>
          <MDModal.Body className="menu-modal">
            <MDInput
              value={text}
              name="text"
              onChange={this.onChangeInput}
            />
          </MDModal.Body>
          <MDModal.Footer onSuccess={this.onClickSuccess} onCancel={close} />
        </MDModal>
      );
  }
}

```

## License

md-editor-react is [MIT licensed](./LICENSE).
