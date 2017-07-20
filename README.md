# react-markdown
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

You can also add buttons registed.
### registMarkBtns
Type: `object` 
Regist custom markdown buttons for `markBtns` option.

```json
 {
   heading: {
         mark: '# ',
         type: 'insert',
         icon: 'icon-font-size',
         iconTheme: 'color',
         tips: 'heading',
         text: 'test'
     }
}
```
`heading` is name of the button, mark


