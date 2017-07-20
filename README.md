# react-markdown-editor
A markdown editor component for react based on marked, you can edit and preview at same time.

## 1. Installation 
> npm install --save react-markdown-preview-editor

## 2. Usage
Minimal usage:
```js
import { render } from 'react-dom';
import { MarkdownEditor } from 'react-markdown-preview-editor';
import 'react-markdown-preview-editor/lib/css/style.css';

render(
    <MarkdownPreview  />,
    document.getElementById('root')
);
```
**Attention:** style.css must be import.


You can use also **Editor** or  **Preview** alone. Of course, style.css is needed.
```js
import { Editor, MarkdownPreview } from 'react-markdown-preview-editor';
import 'react-markdown-preview-editor/lib/css/style.css';
```
## 3. Options
### height
Type: `string` Default: `300px`  
Height of the whole editor, can be 'px' or '%'

### defaultValue
Type: `string`  
Initial value of editor and preview

### showEditor
Type: `boolean` Default: `true`  
Show editor or not

### showEditorNav
Type: `boolean` Default: `true`  
Show editor nav or not

### showPreview
Type: `boolean` Default: `true`  
Show preview or not

### showOrder
Type: `boolean` Default: `true`  
Change order of editor and preview 

### registMarkBtns
Type: `object`  
Regist custom markdown buttons for `markBtns` option.

```
 {
   heading: {
         mark: '# ',
         type: 'insert',
         icon: 'icon-font-size',
         iconTheme: 'color',
         tips: 'heading',
         text: 'test'
     },
      italic: {
        mark: ['*','*'],
        type: 'around',
        icon: 'icon-italic',
        tips: 'italic'
      },
}
```
**heading:** name of the button.

**mark:** markdown sign, string for insert or array for around.

**type:** define the way markdown insert in, `insert` and `around` can be used.`insert` is insert mark at cursor, `around` is add mark  on both sides of selected part.

**icon:** the button icon, is a class add to span, icomoon and font awesome are avalible.

**iconTheme:** define the appearance of button, such as color, hover .

**tips:** tips when mouse hover.

**text:** define text after icon.

### markBtns
Type: `array`
Default buttons: 
* heading
* bold
* italic
* underline
* strikethrough
* blockquote
* code
* list-ol
* list-ul
* link
* table
* line
* picture

You can also add buttons registed. For example, new button `code` is registed, you can set prop `markBtns=['*', 'code']` to add `code` button to the navbar. 
**Attention:** `*` in markBtns array means keep default buttons, if  set prop `markBtns=['code']`, the navbar will only have a `code` button.
```js
<MarkdownEditor 
  registMarkBtns={{ 
      code: {
          mark: ['`','`'],
          type: 'around',
          icon: 'icon-code',
          tips: 'code'
      }
    }}
    markBtns={['*', 'code']}
/>
```
### markedOptions
Type: `object` 
Default:
> gfm: true,

> tables: true,

>breaks: true,

>pedantic: false,

>sanitize: false,

>smartLists: true,

>smartypants: false

You can click [Here](https://github.com/chjj/marked/blob/master/README.md#options-1) to get detail infomation.
### codemirrorOptions
Type: `object` 
define the apprance and behavior of editor
you can click [here](http://codemirror.net/doc/manual.html#config) for detail.

## Editor theme and preview code color
You can set theme of edditor. Theme files can be found in `node_modules/codemirror/theme`, and used like the example below:
```js
import 'codemirror/theme/monokai.css';
<MarkdownEditor  codemirrorOptions={{theme:'monokai'}}/>
```
The code color of preview can be setted.Just import highlight style file what you like. Style files can be found in `node_modules/highlight.js/style`, you can do like this:
```js
import '/highlight.js/style/gitbub.css';
```

## License
See LICENSE for more info.
