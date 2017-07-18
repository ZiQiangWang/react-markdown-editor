/**
 * 解析markdown语法，生成对应的html结构
 * @authors ZiQiangWang
 * @email   814120507@qq.com
 * @date    2017-07-13 20:40:24
 */

import React,{ Component } from 'react';
import { findDOMNode } from 'react-dom';
import PropTypes from 'prop-types';
import marked from '../3rd/marked';
import hljs from 'highlight.js';
import 'highlight.js/styles/github.css';
class MarkdownPreview extends Component {

  constructor(props) {
    super(props);

    marked.setOptions({
      ...defaultOptions,
      ...this.props.options
    });

    this.markRender = this.initRender();

    this.preview = undefined;
  }

  componentDidMount() {
    
    this.preview = findDOMNode(this.refs.preview);

  }

  initRender = () => {
    const renderer = new marked.Renderer();
    // 重写render，使代码部分高亮显示，并添加行号
    renderer.code =  (code, lang) => {
      // 判断该语言是否能解析
      const validLang = !!(lang && hljs.getLanguage(lang));
      // 将代码分行
      const codeLines = code.split('\n');
      
      let codeBlock = '<pre><ol>';
      // 考虑语言可用性
      if (validLang) {
        codeLines.forEach((ele) => {
          codeBlock += `<li><code>${hljs.highlight(lang,ele).value}</code></li>`
        });
      } else {
        codeLines.forEach((ele) => {
          codeBlock += `<li><code>${ele}</code></li>`
        });
      }
      codeBlock += '</ol></pre>';
      return codeBlock;
    }

    return renderer;
  }

  previewInstance = () => {
    return this.preview;
  }

  render() {

    const {show,source,options, ...others} = this.props;

    const html = marked(source, {renderer: this.markRende});

    return (
      <div 
        ref="preview"
        className={"preview " + (show ? "":"disappear")}
        dangerouslySetInnerHTML={{ __html: html}}
        {...others}
      >
      </div>
    );
  }
}

const defaultOptions = {
  breaks: true, 
  lineNumber: true
}

MarkdownPreview.propTypes = {
  source: PropTypes.string.isRequired,
  options: PropTypes.shape({ 
    gfm: PropTypes.bool,
    tables: PropTypes.bool,
    breaks: PropTypes.bool,
    pedantic: PropTypes.bool,
    sanitize: PropTypes.bool,
    smartLists: PropTypes.bool,
    smartypants: PropTypes.bool,
    lineNumbers: PropTypes.bool
  })
};

export default MarkdownPreview;
