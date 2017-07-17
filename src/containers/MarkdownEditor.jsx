/**
 * 
 * @authors ZiQiangWang
 * @email   814120507@qq.com
 * @date    2017-07-11 16:23:02
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Toolbar from '../components/Toolbar';
import Editor from '../components/Editor';
import Preview from '../components/Preview';
import { requestFullScreen, exitFullscreen, checkFull } from '../utils/fullscreen';
import '../style/editor.less';

class MarkdownEditor extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      markdownSrc: this.props.defaultValue ? this.props.defaultValue : "",
      previewY: 0,
      editorY: 0,
      showEditor: true,
      showPreview: true,
      showNav: true,
      fullscreen: false,
      order: false
    };

    this.sourceMap = {};

    this.onMarkdownChange = this.onMarkdownChange.bind(this);
  }

  getMarkdownSrc = ()=> {
    return this.state.markdownSrc;
  }

  onMarkdownChange = (md) =>  {
    this.setState({
      ...this.state,
      markdownSrc: md
    });

    if (this.props.onChange) {
      this.props.onChange(md);
    }
  }

  handleFullscreen = () => {
      
    if (checkFull()) {
        exitFullscreen();
    } else {
        requestFullScreen();
    }
  }

  // 响应工具栏按钮，包括显示模式，全屏，左右顺序
  onChangeToolState = (toolType) => {
    if (toolType === 'split') {
      this.setState({
          ...this.state,
          showEditor: true,
          showPreview: true
        });
    }
    if (toolType === 'editorOrPreview') {
        if (this.state.showEditor && this.state.showPreview) {
          this.setState({
            ...this.state,
            showPreview: false
          });
        } else{
          this.setState({
            ...this.state,
            showEditor: !this.state.showEditor,
            showPreview: !this.state.showPreview
          });
        }
    } else if (toolType === 'fullscreen') {
      
      this.handleFullscreen();
      this.setState({
        ...this.state,
        fullscreen: !this.state.fullscreen
      });
    } else if(toolType === 'order') {

      this.setState({
        ...this.state,
        order: !this.state.order
      });
    } else if (toolType === 'mobileSwitch') {
        if (this.state.showEditor) {
        this.setState({
          ...this.state,
          showEditor: false,
          showPreview: true
        });
      } else {
        this.setState({
          ...this.state,
          showEditor: true,
          showPreview: false
        });
      }
    } else if (toolType ==='switchNav') {
      this.setState({
        ...this.state,
        showNav: !this.state.showNav
      });
    }
  }

  onBuildScrollMap = (sourceMap) => {
    this.sourceMap = sourceMap;
  }

  onEditorScroll = (cm) => {
    const scrollInfo = cm.getScrollInfo();
    const line = cm.lineAtHeight(scrollInfo.top,'local');
    const previewY = this.sourceMap[line+1];
    if (previewY !== undefined) {
      this.setState({
        ...this.state,
        previewY: previewY
      })
    }
  }

  onPreviewScroll = (previewY) => {
    this.setState({
      ...this.state,
      previewY: previewY
    });
  }

  render() {
    const {codemirrorOptions, height, markedOptions, value, onChange,...mirrorConfig} = this.props;
    
    return (
      <div className="markdown-editor" style={{flexDirection: this.state.order ? 'row-reverse' : 'row', height: height}}>
        <Toolbar 
          className={this.props.toolbar}
          onClick={this.onChangeToolState}
        />
        <Editor 
          show={this.state.showEditor}
          showNav={this.state.showNav}
          value={this.state.markdownSrc}
          onChange={this.onMarkdownChange}
          scrollY={this.state.editorY}
          onScroll={this.onEditorScroll}
          options={codemirrorOptions}
          { ...mirrorConfig }
        />
        <Preview
          showNav={this.state.showNav}
          show={this.state.showPreview}
          source={this.state.markdownSrc}
          buildScrollMap={this.onBuildScrollMap}
          scrollY={this.state.previewY}
          onScroll={this.onPreviewScroll}
          options={markedOptions}
        />
      </div>
    );
  }
}

MarkdownEditor.defaultProps = {
  height: '400px'
}

MarkdownEditor.propTypes = {
  toolbar: PropTypes.string,
  height: PropTypes.string,
  editorOptions: PropTypes.object,
  markedOptions: PropTypes.object
};

export default MarkdownEditor;

