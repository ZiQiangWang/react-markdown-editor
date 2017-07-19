'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * 图标按钮
 * @authors ZiQiangWang
 * @email   814120507@qq.com
 * @date    2017-07-13 23:51:58
 */

var IconBtn = function IconBtn(props) {
  var config = props.config;

  return _react2.default.createElement(
    'a',
    { className: "btn-icon " + (config.iconTheme || "default"), onClick: props.onClick, title: config.tips },
    _react2.default.createElement('span', { className: config.icon }),
    config.text
  );
};

IconBtn.propTypes = {
  onClick: _propTypes2.default.func,
  config: _propTypes2.default.shape({
    icon: _propTypes2.default.string,
    iconTheme: _propTypes2.default.string,
    tips: _propTypes2.default.string,
    text: _propTypes2.default.string
  })
};

exports.default = IconBtn;