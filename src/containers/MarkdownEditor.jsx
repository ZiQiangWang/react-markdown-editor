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
      markdownSrc: this.props.defaultValue,
      toolState: {
        showMode: 0,
        fullscreen: false,
        order: false
      },
    };

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

    this.props.onChange(md);
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
    
    let state;
    if (toolType === 'showMode') {
        state = this.state.toolState[toolType] === 2 ? 0 : this.state.toolState[toolType] + 1;
    } else {
      state = !this.state.toolState[toolType] ;
    }

    if (toolType === 'fullscreen') {
      this.handleFullscreen();
    }

    this.setState({
      ...this.state,
      toolState: {
        ...this.state.toolState,
        [toolType]: state
      }
    });
  }

  render() {
    const {codemirrorOptions, height, markedOptions, value, onChange,...mirrorConfig} = this.props;
    
    return (
      <div className="markdown-editor" style={{flexDirection: this.state.toolState.order ? 'row-reverse' : 'row', height: height}}>
        <Toolbar 
          className={this.props.tool}
          onClick={this.onChangeToolState}
          toolState={this.state.toolState}
        />
        <Editor 
          showMode={this.state.toolState.showMode}
          value={this.state.markdownSrc}
          onChange={this.onMarkdownChange}
          options={codemirrorOptions}
          { ...mirrorConfig }
        />
        <Preview
          showMode={this.state.toolState.showMode}
          source={this.state.markdownSrc}
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
  height: PropTypes.string,
  editorOptions: PropTypes.object,
  markedOptions: PropTypes.object
};

export default MarkdownEditor;

