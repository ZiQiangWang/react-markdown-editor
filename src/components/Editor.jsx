/**
 * markdown语法编辑模块，依赖于codemirror
 * @authors ZiQiangWang
 * @email   814120507@qq.com
 * @date    2017-07-12 16:01:07
 */


import React, { Component } from 'react';
import PropTypes from 'prop-types';
import 'codemirror/mode/markdown/markdown';
import 'codemirror/lib/codemirror.css';
import ReactCodeMirror from './ReactCodemirror';
import IconBtn from './IconBtn';

class Editor extends Component {
  constructor(props) {
    super(props);

    this.codemirror = undefined;

    this.markdownBtns = [
      'heading', 'bold', 'italic', 'underline',
      'strikethrough', 'blockquote', 'code', 'list-ol',
      'list-ul', 'link', 'table', 'line', 'image',
    ];

    this.markdownMap = {
      heading: {
        mark: '# ',
        type: 'insert',
        icon: 'icon-font-size',
        tips: '标题 <h1> Alt+H',
        keys: ['Alt', 'h'],
      },
      bold: {
        mark: ['**', '**'],
        type: 'around',
        icon: 'icon-bold',
        tips: '粗体 <strong> Ctrl+B',
        keys: ['Control', 'b'],
      },
      italic: {
        mark: ['*', '*'],
        type: 'around',
        icon: 'icon-italic',
        tips: '斜体 <em> Ctrl+I',
        keys: ['Control', 'i'],
      },
      underline: {
        mark: ['<u>', '</u>'],
        type: 'around',
        icon: 'icon-underline',
        tips: '下划线 <u> Ctrl+U',
        keys: ['Control', 'u'],
      },
      strikethrough: {
        mark: ['~~', '~~'],
        type: 'around',
        icon: 'icon-strikethrough',
        tips: '删除线 <del> Alt+S',
        keys: ['Alt', 's'],
      },
      blockquote: {
        mark: '> ',
        type: 'insert',
        icon: 'icon-quotes-left',
        tips: '引用 <blockquote> Alt+Q',
        keys: ['Alt', 'q'],
      },
      code: {
        mark: ['```js\n', '\n```'],
        type: 'around',
        icon: 'icon-embed2',
        tips: '代码段 <code> Alt+C',
        keys: ['Alt', 'c'],
      },
      'list-ol': {
        mark: '1. ',
        type: 'insert',
        icon: 'icon-list-numbered',
        tips: '有序列表 <ol> Alt+O',
        keys: ['Alt', 'o'],
      },
      'list-ul': {
        mark: '* ',
        type: 'insert',
        icon: 'icon-list2',
        tips: '无序列表 <ul> Alt+U',
        keys: ['Alt', 'u'],
      },
      link: {
        mark: ['[', ']()'],
        type: 'around',
        icon: 'icon-link',
        tips: '链接 <a> Alt+L',
        keys: ['Alt', 'l'],
      },
      table: {
        mark: '\ncolumn1 | column2 | column3  \n------- | ------- | -------  \ncolumn1 | column2 | column3  \ncolumn1 | column2 | column3  \ncolumn1 | column2 | column3 \n',
        type: 'insert',
        icon: 'icon-table2',
        tips: '表格 <table> Alt+T',
        keys: ['Alt', 't'],
      },
      line: {
        mark: '\n----\n',
        type: 'insert',
        icon: 'icon-minus',
        tips: '分割线 <hr> Ctrl+Alt+L',
        keys: ['Control', 'Alt', 'l'],
      },
      image: {
        mark: ['![', ']()'],
        type: 'around',
        icon: 'icon-image',
        tips: '图片 <img> Alt+I',
        keys: ['Alt', 'i'],
      },
    };

    this.shortcutMap = {};

    this.registMarkdownBtn();

    this.selectedMarkdownBtns();
  }
  componentDidMount = () => {
    // 在加载完成时获取codemirror实例
    this.codemirror = this.refs.mirror.getCodeMirror();

    window.addEventListener('keydown', this.handleKeydown);
  }

  componentWillUnmount = () => {
    window.removeEventListener('keydown', this.handleKeydown);
  }

  // 响应使用按钮插入markdown语法的需求，主要调用codemirror的函数进行
  onQuickMarkdown = (type) => {
    // 获取codemirror实例
    const mirror = this.codemirror;

    const config = this.markdownMap[type];

    // 获取选中的内容，以及对应的位置，
    // 如果未选中，则selection为空，开始和结束位置为光标所在位置
    const selection = mirror.getSelection();
    const from = mirror.getCursor('from');
    const to = mirror.getCursor('to');

    // 插入的语法分为两大类，一类是around，会在选中的文字两边插入语法
    // 另一类为insert，在当前位置插入语法
    if (config.type === 'around') {
      const leftLen = config.mark[0].length;

      const newFrom = {
        ...from,
        ch: from.ch + leftLen,
      };
      const newTo = {
        ...to,
        ch: to.ch + leftLen,
      };
      mirror.replaceSelection(`${config.mark[0]}${selection}${config.mark[1]}`);
      mirror.setSelection(newFrom, newTo);
    } else if (config.type === 'insert') {
      mirror.replaceSelection(`${config.mark}${selection}`);
    }

    // 插入完成后，编辑框继续获得焦点
    mirror.focus();
  }

  // 自定义新的快速markdown按钮
  registMarkdownBtn = () => {
    if (this.props.registMarkBtns) {
      Object.assign(this.markdownMap, this.props.registMarkBtns);
    }


    const btns = Object.keys(this.markdownMap);
    btns.forEach((item) => {
      const btnConfig = this.markdownMap[item];
      if (btnConfig.keys) {
        this.shortcutMap[btnConfig.keys.join('-')] = item;
      }
    });
  }

  // 选择显示哪些按钮
  selectedMarkdownBtns = () => {
    const btns = this.props.markBtns;

    if (btns === undefined) {
      return;
    }

    if (btns[0] === '*') {
      this.markdownBtns = [...this.markdownBtns, ...btns.slice(1)];
    } else {
      this.markdownBtns = btns;
    }
  }

  handleKeydown = (e) => {
    if ((e.ctrlKey || e.altKey || e.shiftKey) && (!['Control', 'Alt', 'Shift'].includes(e.key))) {
      const keyArray = [];
      if (e.ctrlKey) {
        keyArray.push('Control');
      }
      if (e.altKey) {
        keyArray.push('Alt');
      }
      if (e.shiftKey) {
        keyArray.push('Shift');
      }
      keyArray.push(e.key);

      const shortcut = keyArray.join('-');
      const btn = this.shortcutMap[shortcut];
      if (btn !== undefined) {
        this.onQuickMarkdown(btn);
      }
    }
  }

  editorInstance = () => this.codemirror

  render() {
    const { show, showNav, width, height, markBtns, registMarkBtns, options, onMouseEnter, ...mirrorEvent } = this.props;
    const mirrorOptions = {
      ...options,
      mode: 'markdown',
      autofocus: true,
      lineWrapping: true,
    };

    return (
      <div
        className={`editor-container ${show ? '' : 'disappear'}`}
        onMouseEnter={onMouseEnter}
        style={{ width, height }}
      >
        <div className="markdown-bar" style={{ height: showNav ? '48px' : '0' }}>
          <div className="inner-bar">
            { this.markdownBtns.map((ele, index) => <IconBtn key={index} config={this.markdownMap[ele]} onClick={() => this.onQuickMarkdown(ele)} />) }
          </div>
        </div>
        <ReactCodeMirror
          ref="mirror"
          className={showNav ? '' : 'show-nav'}
          options={mirrorOptions}
          {...mirrorEvent}
        />
      </div>
    );
  }
}

Editor.defaultProps = {
  show: true,
  showNav: true,
  height: '100%',
  width: '100%',
  markBtns: ['*'],
  registMarkBtns: {},
  options: {},
};

Editor.propTypes = {
  show: PropTypes.bool,
  showNav: PropTypes.bool,
  height: PropTypes.string,
  width: PropTypes.string,
  markBtns: PropTypes.array,
  registMarkBtns: PropTypes.objectOf(
    PropTypes.shape({
      mark: PropTypes.oneOfType([PropTypes.string, PropTypes.array]).isRequired,
      type: PropTypes.oneOf(['around', 'insert']).isRequired,
      icon: PropTypes.string.isRequired,
      iconTheme: PropTypes.string,
      tips: PropTypes.string,
      text: PropTypes.string,
    }),
  ),
  options: PropTypes.object,
  /* eslint-disable react/require-default-props */
  onMouseEnter: PropTypes.func,
};

export default Editor;
