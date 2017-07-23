'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _ReactCodeMirror = require('./ReactCodeMirror');

var _ReactCodeMirror2 = _interopRequireDefault(_ReactCodeMirror);

require('codemirror/mode/markdown/markdown');

require('codemirror/lib/codemirror.css');

var _IconBtn = require('./IconBtn');

var _IconBtn2 = _interopRequireDefault(_IconBtn);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * markdown语法编辑模块，依赖于codemirror
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @authors ZiQiangWang
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @email   814120507@qq.com
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @date    2017-07-12 16:01:07
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var Editor = function (_Component) {
  _inherits(Editor, _Component);

  function Editor(props) {
    _classCallCheck(this, Editor);

    var _this = _possibleConstructorReturn(this, (Editor.__proto__ || Object.getPrototypeOf(Editor)).call(this, props));

    _this.selectedMarkdownBtns = function () {

      var btns = _this.props.markBtns;

      if (btns === undefined) {
        return;
      }

      if (btns[0] === '*') {
        _this.markdownBtns = [].concat(_toConsumableArray(_this.markdownBtns), _toConsumableArray(btns.slice(1)));
      } else {
        _this.markdownBtns = btns;
      }
    };

    _this.registMarkdownBtn = function () {
      if (_this.props.registMarkBtns) {
        Object.assign(_this.markdownMap, _this.props.registMarkBtns);
      }
    };

    _this.onQuickMarkdown = function (type) {

      // 获取codemirror实例
      var mirror = _this.codemirror;

      var config = _this.markdownMap[type];

      // 获取选中的内容，以及对应的位置，
      // 如果未选中，则selection为空，开始和结束位置为光标所在位置
      var selection = mirror.getSelection();
      var from = mirror.getCursor('from');
      var to = mirror.getCursor('to');

      // 插入的语法分为两大类，一类是around，会在选中的文字两边插入语法
      // 另一类为insert，在当前位置插入语法
      if (config.type === 'around') {
        var leftLen = config.mark[0].length;

        var new_from = _extends({}, from, {
          ch: from.ch + leftLen
        });
        var new_to = _extends({}, to, {
          ch: to.ch + leftLen
        });
        mirror.replaceSelection('' + config.mark[0] + selection + config.mark[1]);
        mirror.setSelection(new_from, new_to);
      } else if (config.type === 'insert') {
        mirror.replaceSelection('' + config.mark + selection);
      }

      // 插入完成后，编辑框继续获得焦点
      mirror.focus();
    };

    _this.editorInstance = function () {
      return _this.codemirror;
    };

    _this.codemirror = undefined;

    _this.markdownBtns = ['heading', 'bold', 'italic', 'underline', 'strikethrough', 'blockquote', 'code', 'list-ol', 'list-ul', 'link', 'table', 'line', 'picture'];

    _this.markdownMap = {
      heading: {
        mark: '# ',
        type: 'insert',
        icon: 'icon-font-size',
        tips: '标题'
      },
      bold: {
        mark: ['**', '**'],
        type: 'around',
        icon: 'icon-bold',
        tips: '粗体'
      },
      italic: {
        mark: ['*', '*'],
        type: 'around',
        icon: 'icon-italic',
        tips: '斜体'
      },
      underline: {
        mark: ['<u>', '</u>'],
        type: 'around',
        icon: 'icon-underline',
        tips: '下划线'
      },
      strikethrough: {
        mark: ['~~', '~~'],
        type: 'around',
        icon: 'icon-strikethrough',
        tips: '删除线'
      },
      blockquote: {
        mark: '> ',
        type: 'insert',
        icon: 'icon-quotes-left',
        tips: '引用'
      },
      code: {
        mark: ['```js\n', '\n```'],
        type: 'around',
        icon: 'icon-embed2',
        tips: '代码段'
      },
      'list-ol': {
        mark: '1. ',
        type: 'insert',
        icon: 'icon-list-numbered',
        tips: '有序列表'
      },
      'list-ul': {
        mark: '* ',
        type: 'insert',
        icon: 'icon-list2',
        tips: '无序列表'
      },
      link: {
        mark: ['[', ']()'],
        type: 'around',
        icon: 'icon-link',
        tips: '链接'
      },
      table: {
        mark: '\ncolumn1 | column2 | column3  \n------- | ------- | -------  \ncolumn1 | column2 | column3  \ncolumn1 | column2 | column3  \ncolumn1 | column2 | column3 \n',
        type: 'insert',
        icon: 'icon-table2',
        tips: '表格'
      },
      line: {
        mark: '\n----\n',
        type: 'insert',
        icon: 'icon-minus',
        tips: '分割线'
      },
      picture: {
        mark: ['![', ']()'],
        type: 'around',
        icon: 'icon-image',
        tips: '图片'
      }
    };

    _this.registMarkdownBtn();

    _this.selectedMarkdownBtns();
    return _this;
  }

  // 选择显示哪些按钮


  // 自定义新的快速markdown按钮


  _createClass(Editor, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      // 在加载完成时获取codemirror实例
      this.codemirror = this.refs.mirror.getCodeMirror();
    }

    // 响应使用按钮插入markdown语法的需求，主要调用codemirror的函数进行

  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          show = _props.show,
          showNav = _props.showNav,
          width = _props.width,
          height = _props.height,
          markBtns = _props.markBtns,
          registMarkBtns = _props.registMarkBtns,
          options = _props.options,
          onMouseEnter = _props.onMouseEnter,
          mirrorEvent = _objectWithoutProperties(_props, ['show', 'showNav', 'width', 'height', 'markBtns', 'registMarkBtns', 'options', 'onMouseEnter']);

      var mirrorOptions = _extends({}, options, defaultOptions);

      return _react2.default.createElement(
        'div',
        { className: "editor-container " + (show ? "" : "disappear"),
          onMouseEnter: onMouseEnter,
          style: { width: width, height: height } },
        _react2.default.createElement(
          'div',
          { className: 'markdown-bar', style: { height: showNav ? "48px" : "0" } },
          _react2.default.createElement(
            'div',
            { className: 'inner-bar' },
            this.markdownBtns.map(function (ele, index) {
              return _react2.default.createElement(_IconBtn2.default, { key: index, config: _this2.markdownMap[ele], onClick: function onClick() {
                  return _this2.onQuickMarkdown(ele);
                } });
            })
          )
        ),
        _react2.default.createElement(_ReactCodeMirror2.default, _extends({
          ref: 'mirror',
          className: showNav ? "" : "show-nav",
          options: mirrorOptions
        }, mirrorEvent))
      );
    }
  }]);

  return Editor;
}(_react.Component);

var defaultOptions = {
  mode: 'markdown',
  autofocus: true,
  lineWrapping: true
};

Editor.defaultProps = {
  show: true,
  showNav: true,
  height: "100%",
  width: "100%"
};

Editor.propTypes = {
  show: _propTypes2.default.bool,
  showNav: _propTypes2.default.bool,
  markBtns: _propTypes2.default.array,
  registMarkBtns: _propTypes2.default.objectOf(_propTypes2.default.shape({
    mark: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.array]).isRequired,
    type: _propTypes2.default.oneOf(['around', 'insert']).isRequired,
    icon: _propTypes2.default.string.isRequired,
    iconTheme: _propTypes2.default.string,
    tips: _propTypes2.default.string,
    text: _propTypes2.default.string
  }))
};

exports.default = Editor;