/**
 * markdown语法编辑模块，依赖于codemirror
 * @authors ZiQiangWang
 * @email   814120507@qq.com
 * @date    2017-07-12 16:01:07
 */


import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactCodeMirror from 'react-cmirror';
import 'codemirror/mode/markdown/markdown';
import IconBtn from './IconBtn';

class Editor extends Component {
  constructor(props) {
    super(props);

    this.markdownBtns = [
      'heading', 'bold', 'italic', 'underline',
      'strikethrough', 'blockquote', 'code', 'listol',
      'listul', 'link', 'table', 'line', 'image',
    ];

    this.markdownMap = {
      heading: {
        mark: '# ',
        type: 'insert',
        icon: 'icon-font-size',
        tips: '标题 <h1> Alt+H',
        keys: ['Alt', 'H'],
      },
      bold: {
        mark: ['**', '**'],
        type: 'around',
        icon: 'icon-bold',
        tips: '粗体 <strong> Ctrl+B',
        keys: ['Ctrl', 'B'],
      },
      italic: {
        mark: ['*', '*'],
        type: 'around',
        icon: 'icon-italic',
        tips: '斜体 <em> Ctrl+I',
        keys: ['Ctrl', 'I'],
      },
      underline: {
        mark: ['<u>', '</u>'],
        type: 'around',
        icon: 'icon-underline',
        tips: '下划线 <u> Ctrl+U',
        keys: ['Ctrl', 'U'],
      },
      strikethrough: {
        mark: ['~~', '~~'],
        type: 'around',
        icon: 'icon-strikethrough',
        tips: '删除线 <del> Alt+S',
        keys: ['Alt', 'S'],
      },
      blockquote: {
        mark: '> ',
        type: 'insert',
        icon: 'icon-quotes-left',
        tips: '引用 <blockquote> Alt+Q',
        keys: ['Alt', 'Q'],
      },
      code: {
        mark: ['```js\n', '\n```'],
        type: 'around',
        icon: 'icon-embed2',
        tips: '代码段 <code> Alt+C',
        keys: ['Alt', 'C'],
      },
      'listol': {
        mark: '1. ',
        type: 'insert',
        icon: 'icon-list-numbered',
        tips: '有序列表 <ol> Alt+O',
        keys: ['Alt', 'O'],
      },
      'listul': {
        mark: '* ',
        type: 'insert',
        icon: 'icon-list2',
        tips: '无序列表 <ul> Alt+U',
        keys: ['Alt', 'U'],
      },
      link: {
        mark: ['[', ']()'],
        type: 'around',
        icon: 'icon-link',
        tips: '链接 <a> Alt+L',
        keys: ['Alt', 'L'],
      },
      table: {
        mark: '\ncolumn1 | column2 | column3  \n------- | ------- | -------  \ncolumn1 | column2 | column3  \ncolumn1 | column2 | column3  \ncolumn1 | column2 | column3 \n',
        type: 'insert',
        icon: 'icon-table2',
        tips: '表格 <table> Alt+T',
        keys: ['Alt', 'T'],
      },
      line: {
        mark: '\n----\n',
        type: 'insert',
        icon: 'icon-minus',
        tips: '分割线 <hr> Ctrl+Alt+L',
        keys: ['Ctrl', 'Alt', 'L'],
      },
      image: {
        mark: ['![', ']()'],
        type: 'around',
        icon: 'icon-image',
        tips: '图片 <img> Alt+I'
      },
    };

    this.extraKeys = {};

    this.registMarkdownBtn();

    this.selectedMarkdownBtns();
  }

  componentDidMount = () => {
    // 在加载完成时获取codemirror实例
    this.codemirrorInstance = this.refs.mirror.codemirrorInstance;
    this.codemirror = this.refs.mirror.codemirror;
    
    const mac = this.codemirror.keyMap.default == this.codemirror.keyMap.macDefault;

    if (mac) {
      Object.keys(this.markdownMap).forEach(type => {
        const config = this.markdownMap[type];
        if (config.keys !== undefined) {
          const index = config.keys.findIndex(value => value === 'Ctrl');
          if (index != -1) {
            config.keys[index] = 'Cmd';
          }
        }
      });
    }

    Object.keys(this.markdownMap).forEach(type => {
      this.codemirror.commands[type] = (cm) => {
        this.onQuickMarkdown(type);
      }
      const keys = this.markdownMap[type].keys;
      if (keys != undefined) {
        const runKey = keys.join('-');
        this.extraKeys[runKey] = type;
      }
    });
  }

  // 响应使用按钮插入markdown语法的需求，主要调用codemirror的函数进行
  onQuickMarkdown = (type) => {
    // 获取codemirror实例
    const mirror = this.codemirrorInstance;

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

  editorInstance = () => this.codemirrorInstance

  render() {
    const { show, showNav, width, height, markBtns, registMarkBtns, options, onMouseEnter, ...mirrorEvent } = this.props;
    const mirrorOptions = {
      ...options,
      mode: 'markdown',
      autofocus: true,
      lineWrapping: true,
      extraKeys: this.extraKeys
    };

    console.log(mirrorOptions);
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
          style={{
              height: '100%',
              paddingTop: '48px',
              transition: 'padding-top .5s'
          }}
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
