/**
 * 解析markdown语法，生成对应的html结构
 * @authors ZiQiangWang
 * @email   814120507@qq.com
 * @date    2017-07-13 20:40:24
 */

import React,{ Component } from 'react';
import PropTypes from 'prop-types';
import marked from 'marked';
import hljs from 'highlight.js';
import 'highlight.js/styles/github.css';
class MarkdownPreview extends Component {

  constructor(props) {
    super(props);

    marked.setOptions(this.props.options);
  }

  componentDidMount() {
    this.parseMarkdown();
  }

  componentDidUpdate() {
    this.parseMarkdown();
  }

  parseMarkdown = () => {
    const {source} = this.props;

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

    const html = marked(source, { renderer: renderer });

    document.getElementById("markdown-preview").innerHTML = html;
  }

  render() {
    return <div id="markdown-preview" className="preview"></div>
  }
}

MarkdownPreview.defaultProps = {
  options: {breaks: true}
};

MarkdownPreview.propTypes = {
  source: PropTypes.string.isRequired,
  options: PropTypes.shape({
    gfm: PropTypes.bool,
    tables: PropTypes.bool,
    breaks: PropTypes.bool,
    pedantic: PropTypes.bool,
    sanitize: PropTypes.bool,
    smartLists: PropTypes.bool,
    smartypants: PropTypes.bool
  })
};

export default MarkdownPreview;
