'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _highlight = require('highlight.js');

var _highlight2 = _interopRequireDefault(_highlight);

require('highlight.js/styles/github.css');

var _marked = require('../3rd/marked');

var _marked2 = _interopRequireDefault(_marked);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * 解析markdown语法，生成对应的html结构
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @authors ZiQiangWang
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @email   814120507@qq.com
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @date    2017-07-13 20:40:24
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var MarkdownPreview = function (_Component) {
  _inherits(MarkdownPreview, _Component);

  function MarkdownPreview(props) {
    _classCallCheck(this, MarkdownPreview);

    var _this = _possibleConstructorReturn(this, (MarkdownPreview.__proto__ || Object.getPrototypeOf(MarkdownPreview)).call(this, props));

    _this.initRender = function () {
      var renderer = new _marked2.default.Renderer();

      renderer.heading = function (text, level) {
        var escapedText = text.toLowerCase().replace(/[^\u4e00-\u9fa5\w]+/g, '-');

        return '<h' + level + ' id="' + escapedText + '">' + text + '</h' + level + '>';
      };

      return renderer;
    };

    _this.previewInstance = function () {
      return _this.preview;
    };

    _marked2.default.setOptions(_extends({}, _this.props.options, {
      lineNumber: true,
      highlight: function highlight(code) {
        return _highlight2.default.highlightAuto(code).value;
      }
    }));

    _this.markRender = _this.initRender();

    _this.preview = undefined;
    return _this;
  }

  _createClass(MarkdownPreview, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.preview = (0, _reactDom.findDOMNode)(this.refs.preview);
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          show = _props.show,
          source = _props.source,
          options = _props.options,
          width = _props.width,
          height = _props.height,
          others = _objectWithoutProperties(_props, ['show', 'source', 'options', 'width', 'height']);

      var html = (0, _marked2.default)(source, { renderer: this.markRender });
      /* eslint-disable react/no-danger */
      return _react2.default.createElement('div', _extends({
        ref: 'preview',
        className: 'preview ' + (show ? '' : 'disappear'),
        style: { width: width, height: height },
        dangerouslySetInnerHTML: { __html: html }
      }, others));
    }
  }]);

  return MarkdownPreview;
}(_react.Component);

MarkdownPreview.defaultProps = {
  show: true,
  source: '',
  width: '100%',
  height: '100%',
  options: {}
};

MarkdownPreview.propTypes = {
  show: _propTypes2.default.bool,
  width: _propTypes2.default.string,
  height: _propTypes2.default.string,
  source: _propTypes2.default.string,
  options: _propTypes2.default.shape({
    gfm: _propTypes2.default.bool,
    tables: _propTypes2.default.bool,
    breaks: _propTypes2.default.bool,
    pedantic: _propTypes2.default.bool,
    sanitize: _propTypes2.default.bool,
    smartLists: _propTypes2.default.bool,
    smartypants: _propTypes2.default.bool,
    lineNumbers: _propTypes2.default.bool
  })
};

exports.default = MarkdownPreview;