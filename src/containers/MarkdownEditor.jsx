/**
 * 
 * @authors ZiQiangWang
 * @email   814120507@qq.com
 * @date    2017-07-11 16:23:02
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Editor from '../components/Editor';
import MarkdownPreview from '../components/MarkdownPreview';

class MarkdownEditor extends Component {
  constructor(props) {
    super(props);

    this.state = {
      markdownSrc: '',
    };

    this.owner = 'editor';

    this.editorLine = 0;
  }

  componentDidMount() {
    this.editor = this.refs.editor.editorInstance();
    this.preview = this.refs.preview.previewInstance();
  }

  /* eslint-disable no-unused-vars */
  onMarkdownChange = (cm, change) => {
    this.setState({
      ...this.state,
      markdownSrc: cm.getValue(),
    });
    this.props.onArticleChange(cm.getValue());

    if (change.origin === 'setValue') {
      cm.clearHistory();
    }
  }

  /* eslint-disable no-unused-vars */
  onEditorScroll = (cm) => {
    if (this.owner === 'editor') {
      const scrollInfo = this.editor.getScrollInfo();
      this.editorLine = this.editor.lineAtHeight(scrollInfo.top, 'local');
      const previewPos = this.preview.querySelector(`[line-number="${this.editorLine + 1}"]`);
      if (previewPos != null) {
        this.preview.scrollTop = previewPos.offsetTop - 10;
      }
    }
  }

  /* eslint-disable no-unused-vars */
  onPreviewScroll = (e) => {
    if (this.owner === 'preview') {
      const lineNumbers = this.preview.getElementsByClassName('line-number');

      let line = 0;
      /* eslint-disable no-restricted-syntax */
      for (const ele of lineNumbers) {
        if (this.preview.scrollTop > ele.offsetTop) {
          line = ele.getAttribute('line-number');
        }
      }
      const height = this.editor.heightAtLine(parseInt(line - 1, 10), 'local');
      this.editor.scrollTo(null, height);
    }
  }

  previewOwner = () => {
    this.owner = 'preview';
  }

  editorOwner = () => {
    this.owner = 'editor';
  }

  render() {
    const {
      height,
      width,
      value,
      showEditor,
      showEditorNav,
      showPreview,
      showOrder,
      markBtns,
      registMarkBtns,
      markedOptions,
      codemirrorOptions,
    } = this.props;

    return (
      <div
        className="markdown-editor"
        style={{ flexDirection: showOrder ? 'row' : 'row-reverse', height }}
      >
        <Editor
          ref="editor"
          show={showEditor}
          showNav={showEditorNav}
          options={codemirrorOptions}
          markBtns={this.props.markBtns}
          registMarkBtns={this.props.registMarkBtns}
          value={value}
          onChange={this.onMarkdownChange}
          onMouseEnter={this.editorOwner}
          onScroll={this.onEditorScroll}
        />
        <span className="split" />
        <MarkdownPreview
          ref="preview"
          show={showPreview}
          source={this.state.markdownSrc}
          onMouseEnter={this.previewOwner}
          onScroll={this.onPreviewScroll}
          options={markedOptions}
        />
      </div>
    );
  }
}

MarkdownEditor.defaultProps = {
  value: '',
  height: '400px',
  width: '100%',
  showEditor: true,
  showEditorNav: true,
  showPreview: true,
  showOrder: true,
  markBtns: ['*'],
  registMarkBtns: {},
  markedOptions: {},
  codemirrorOptions: {},
};

MarkdownEditor.propTypes = {
  value: PropTypes.string,
  height: PropTypes.string,
  width: PropTypes.string,
  showEditor: PropTypes.bool,
  showEditorNav: PropTypes.bool,
  showPreview: PropTypes.bool,
  showOrder: PropTypes.bool,
  markedOptions: PropTypes.object,
  codemirrorOptions: PropTypes.object,
  markBtns: PropTypes.array,
  registMarkBtns: PropTypes.object,
  /* eslint-disable react/require-default-props */
  onArticleChange: PropTypes.func,
};

export default MarkdownEditor;

