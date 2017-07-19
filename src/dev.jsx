/**
 * @authors ZiQiangWang
 * @email   814120507@qq.com
 * @date    2017-07-19 21:24:46
 */


import React from 'react';
import {render} from 'react-dom';
import MarkdownEditor from './containers/MarkdownEditor';
import './style/index.less';

console.log(MarkdownEditor);

render(
  <MarkdownEditor />, 
  document.getElementById('root')
);
