/**
 * 
 * @authors ZiQiangWang
 * @email   814120507@qq.com
 * @date    2017-07-11 16:23:02
 */

import React, { Component } from 'react';
import Toolbar from '../components/Toolbar';
import Editor from '../components/Editor';
import Preview from '../components/Preview';
import { requestFullScreen, exitFullscreen, checkFull } from '../utils/fullscreen';

import '../style/common.less';
import '../style/editor.less';

class MarkdownEditor extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      markdownSrc: '',
      codemirror: undefined,
      toolState: {
        showMode: 0,
        fullscreen: false,
        order: false
      },
      height: undefined
    };

    this.onMarkdownChange = this.onMarkdownChange.bind(this);
  }

  componentDidMount() {
    window.addEventListener('resize', this.onWindowResize)
    this.setState({
      ...this.state,
      height: window.innerHeight | document.body.clientHeight
    })
  }
  componentWillUnmount() {
    window.removeEventListener('resize', this.onWindowResize)
  }

  onWindowResize = (e) => {
    const height = window.innerHeight | document.body.clientHeight;
    this.setState({
      ...this.state,
      height: height
    })
  }

  onMarkdownChange = (md) =>  {
    this.setState({
      ...this.state,
      markdownSrc: md
    });
  }

   handleFullscreen = () => {
        
      if (checkFull()) {
          exitFullscreen();
      } else {
          requestFullScreen();
      }
    }

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

    const registBtns =
    {
      'test':{
        mark: ['# ', ' #'],
        type: 'around',
        icon: 'icon-font-size',
        tips: 'Hello',
        text: 'world'
      },
      'test2':{
        mark: ['## ', ' ##'],
        type: 'around',
        icon: 'icon-font-size',
        tips: 'Hello'
      },
    };
    return (
      <div className="wrap markdown-editor" style={{flexDirection: this.state.toolState.order ? 'row-reverse' : 'row', height: this.state.height}}>
        <Toolbar 
          onClick={this.onChangeToolState}
          toolState={this.state.toolState}
        />
        <Editor 
          showMode={this.state.toolState.showMode}
          value={this.state.markdownSrc}
          onChange={this.onMarkdownChange}
          registBtns={registBtns}
        />
        <Preview
          showMode={this.state.toolState.showMode}
          source={this.state.markdownSrc}
        />
      </div>
    );
  }
}

export default MarkdownEditor;

