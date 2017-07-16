/**
 * 工具栏，用于对界面进行一些操作
 * @authors ZiQiangWang
 * @email   814120507@qq.com
 * @date    2017-07-14 16:45:58
 */


import React from 'react';
import PropTypes from 'prop-types';
import '../style/components.less';
import IconBtn from '../components/IconBtn';


const Toolbar = (props) => {
  return (
    <div className={props.className}>
      <div id="pc">
      { 
        btnList.map((ele, index) => {
          return (
            <IconBtn 
              key={index} 
              config={ele}
              onClick={() => props.onClick(ele.name)}
            />
          );
        })
      }
      </div>
      <button id="mobile" className="btn btn-round btn-orange" onClick={ () => props.onClick('mobile-switch') }>
        点我
      </button>
    </div>
  );
}

Toolbar.defaultProps = {
  className: 'toolbar'
}
Toolbar.propTypes = {
  onClick: PropTypes.func.isRequired
}

const btnList = [
  {
    name: 'split',
    icon: 'icon-sphere',
    tips: '分屏显示',
    iconTheme: 'bluegray',
  },
  {
    name: 'editorOrPreview',
    icon: 'icon-display',
    tips: '切换阅读模式和编辑模式',
    iconTheme: 'bluegray',
  },{
    name: 'fullscreen',
    icon: 'icon-enlarge',
    tips: '全屏模式',
    iconTheme: 'bluegray',
  },{
    name: 'order',
    icon: 'icon-tab',
    tips: '交换左右视图',
    iconTheme: 'bluegray',
  }
];
export default Toolbar;
