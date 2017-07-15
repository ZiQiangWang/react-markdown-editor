/**
 * 预览部分的导航栏，可以添加一些保存按钮之类的
 * @authors ZiQiangWang
 * @email   814120507@qq.com
 * @date    2017-07-13 12:53:21
 */


import React, { Component } from 'react';
import '../style/components.less';
import IconBtn from '../components/IconBtn';

class PreivewNav extends Component {

  constructor(props) {
    super(props);

  }

  render() {

    return (
      <div className="preview-toolbar">
        { btnList.map((ele, index) => {
          return <IconBtn key={index} config={ele}/>
        }) }
      </div>
    );
  }
}

const btnList = [
  {
    icon: 'icon-display',
    tips: '阅读模式'
  },{
    icon: 'icon-quill',
    tips: '编辑模式'
  },{
    icon: 'icon-enlarge',
    tips: '全屏模式'
  },{
    icon: 'icon-tab',
    tips: '交换左右视图'
  }
];
export default PreivewNav;
