/**
 * 图标按钮
 * @authors ZiQiangWang
 * @email   814120507@qq.com
 * @date    2017-07-13 23:51:58
 */


import React from 'react';
import PropTypes from 'prop-types';

const IconBtn = (props) => {
  const config = props.config;

  return (
    <a className={ "btn-icon "+(config.iconTheme || "default") } onClick={ props.onClick } title={ config.tips }>
      <span className={config.icon}></span>
      {config.text}
    </a>
  )
}

IconBtn.propTypes = {
    onClick: PropTypes.func,
    config: PropTypes.shape({
      icon: PropTypes.string,
      iconTheme: PropTypes.string,
      tips: PropTypes.string,
      text: PropTypes.string
    })
};

export default IconBtn;
