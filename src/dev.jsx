/**
 * @authors ZiQiangWang
 * @email   814120507@qq.com
 * @date    2017-07-19 21:24:46
 */

/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import { render } from 'react-dom';
import MarkdownPreview from './components/MarkdownPreview';
import Editor from './components/Editor';
import MarkdownEditor from './containers/MarkdownEditor';
import './style/index.less';


class Test extends Component {
  handleArticleChange = (text) => {

  }


  render() {
    return <MarkdownEditor onArticleChange={this.handleArticleChange} />;
  }
}
render(
  <Test />,
  document.getElementById('root'),
);
