/**
 * 图标按钮
 * @authors ZiQiangWang
 * @email   814120507@qq.com
 * @date    2017-07-13 23:51:58
 */


import React from 'react';
import PropTypes from 'prop-types';

const IconBtn = (props) => {
  const { config, style, ...rest } = props;

  return (
    <div
      className={`btn-icon ${config.iconTheme || 'default'}`}
      title={config.tips}
      style={style}
      {...rest}
    >
      <span className={config.icon} />
      {config.text}
    </div>
  );
};

IconBtn.defaultProps = {
  style: {},
};
IconBtn.propTypes = {
  config: PropTypes.shape({
    icon: PropTypes.string,
    iconTheme: PropTypes.string,
    tips: PropTypes.string,
    text: PropTypes.string,
  }).isRequired,
  style: PropTypes.object,
};


export default IconBtn;
