/**
 * @authors ZiQiangWang
 * @email   814120507@qq.com
 * @date    2017-07-23 16:02:33
 */

import Codemirror from 'codemirror';
import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ReactCodeMirror extends Component {
  constructor(props) {
    super(props);
    this.codemirror = undefined;
  }

  componentDidMount() {
    // 生成codemirror实例
    this.codemirror = Codemirror.fromTextArea(this.refs.textarea, this.props.options);

    // 事件处理映射
    const eventDict = this.getEventHandleFromProps();

    Object.keys(eventDict).forEach((event) => {
      this.codemirror.on(eventDict[event], this.props[event]);
    });

    // 初始化值
    this.codemirror.setValue(this.props.value || '');
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.value !== undefined && nextProps.value !== this.props.value) {
      this.codemirror.setValue(nextProps.value);
    }
  }

  componentWillUnmount() {
    if (this.codeMirror) {
      this.codeMirror.toTextArea();
    }
  }

  getCodeMirror = () => this.codemirror

  // 将props中所有的事件处理函数映射并保存
  getEventHandleFromProps = () => {
    const propNames = Object.keys(this.props);
    const eventHandle = propNames.filter((prop) => {
      const p = /^on+/;
      return p.test(prop);
    });

    const eventDict = {};
    eventHandle.forEach((ele) => {
      eventDict[ele] = ele.replace(/^on[A-Z]/g, s => s.slice(2).toLowerCase());
    });

    return eventDict;
  }

  render() {
    return (
      <div className={`ReactCodeMirror ${this.props.className}`}>
        <textarea ref="textarea" />
      </div>
    );
  }
}

ReactCodeMirror.defaultProps = {
  value: '',
  options: {},
  className: '',
};

ReactCodeMirror.propTypes = {
  value: PropTypes.string,
  className: PropTypes.string,
  options: PropTypes.object,
};

export default ReactCodeMirror;
