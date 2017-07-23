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

class MarkdownEditor extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      markdownSrc: "",
    };

    this.owner = 'editor';

    this.editorLine = 0;
  }

  componentDidMount() {
    this.editor = this.refs.editor.editorInstance();
    this.preview = this.refs.preview.previewInstance();
  }

  onMarkdownChange = (cm) =>  {
    this.setState({
      ...this.state,
      markdownSrc: cm.getValue()
    });
    this.props.onArticleChange(cm.getValue());
  }

  previewOwner = () => {
    this.owner = 'preview';
  }

  editorOwner = () => {
    this.owner = 'editor';
  }
  onEditorScroll = (cm) => {

    if (this.owner === 'editor') {
       
      const scrollInfo = this.editor.getScrollInfo();
      this.editorLine = this.editor.lineAtHeight(scrollInfo.top,'local');
      const previewPos = this.preview.querySelector(`[line-number="${this.editorLine+1}"]`);
      if (previewPos != null) {
        this.preview.scrollTop = previewPos.offsetTop-10;
      }
    }
  }

  onPreviewScroll = (e) => {
    if (this.owner === 'preview') {

      const lineNumbers = this.preview.getElementsByClassName('line-number');

      let line = 0;
      for(let ele of lineNumbers) {
        if (this.preview.scrollTop > ele.offsetTop) {
          line = ele.getAttribute('line-number');
        }
      }
      const height = this.editor.heightAtLine(parseInt(line-1),'local');
      this.editor.scrollTo(null,height);
    }
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
      <div className="markdown-editor" 
          style={{flexDirection: showOrder ? 'row' : 'row-reverse', height: height}}>
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
  height: '400px',
  width: '100%',
  showEditor: true,
  showEditorNav: true,
  showPreview: true,
  showOrder: true,
}

MarkdownEditor.propTypes = {
  value: PropTypes.string,
  height: PropTypes.string,
  showEditor: PropTypes.bool,
  showEditorNav: PropTypes.bool,
  showPreview: PropTypes.bool,
  showOrder: PropTypes.bool,
  editorOptions: PropTypes.object,
  markedOptions: PropTypes.object
};

export default MarkdownEditor;

