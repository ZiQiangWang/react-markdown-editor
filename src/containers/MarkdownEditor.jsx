/**
 * 
 * @authors ZiQiangWang
 * @email   814120507@qq.com
 * @date    2017-07-11 16:23:02
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import deepAssign from 'deep-assign';
import Toolbar from '../components/Toolbar';
import Editor from '../components/Editor';
import MarkdownPreview from '../components/MarkdownPreview';
import '../style/editor.less';

class MarkdownEditor extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      markdownSrc: this.props.defaultValue ? this.props.defaultValue : "",
    };

    this.owner = 'editor';

    this.editorLine = 0;
  }

  getMarkdownSrc = ()=> {
    return this.state.markdownSrc;
  }

  componentDidMount() {
    this.editor = this.refs.editor.editorInstance();
    this.preview = this.refs.preview.previewInstance();
  }

  onMarkdownChange = (md) =>  {
    this.setState({
      ...this.state,
      markdownSrc: md
    });
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
        if (this.preview.scrollTop >= ele.offsetTop) {
          line = ele.getAttribute('line-number');
        }
      }

      const height = this.editor.heightAtLine(parseInt(line),'local');
      this.editor.scrollTo(null,height);
    }
  }

  render() {
    const {height, showEditor, showEditorNav, showPreview, showOrder,
            markedOptions, codemirrorOptions,markBtns,registMarkBtns } = this.props;

    return (
      <div className="markdown-editor" 
          style={{flexDirection: showOrder ? 'row' : 'row-reverse', height: height}}
      >
        <Toolbar 
          className={this.props.toolbar}
          onClick={this.onChangeToolState}
        />
        <Editor 
          ref="editor"
          show={showEditor}
          showNav={showEditorNav}
          options={codemirrorOptions}
          markBtns={this.props.markBtns}
          registMarkBtns={this.props.registMarkBtns}
          value={this.state.markdownSrc}
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
  showEditor: true,
  showEditorNav: true,
  showPreview: true,
  showOrder: true,
}

MarkdownEditor.propTypes = {
  toolbar: PropTypes.string,
  height: PropTypes.string,
  editorOptions: PropTypes.object,
  markedOptions: PropTypes.object
};

export default MarkdownEditor;

