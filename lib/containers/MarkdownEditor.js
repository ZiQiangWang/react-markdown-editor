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

var _Editor = require('../components/Editor');

var _Editor2 = _interopRequireDefault(_Editor);

var _MarkdownPreview = require('../components/MarkdownPreview');

var _MarkdownPreview2 = _interopRequireDefault(_MarkdownPreview);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * 
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @authors ZiQiangWang
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @email   814120507@qq.com
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @date    2017-07-11 16:23:02
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var MarkdownEditor = function (_React$Component) {
  _inherits(MarkdownEditor, _React$Component);

  function MarkdownEditor(props) {
    _classCallCheck(this, MarkdownEditor);

    var _this = _possibleConstructorReturn(this, (MarkdownEditor.__proto__ || Object.getPrototypeOf(MarkdownEditor)).call(this, props));

    _this.onMarkdownChange = function (cm) {
      _this.setState(_extends({}, _this.state, {
        markdownSrc: cm.getValue()
      }));
      _this.props.onArticleChange(cm.getValue());
    };

    _this.previewOwner = function () {
      _this.owner = 'preview';
    };

    _this.editorOwner = function () {
      _this.owner = 'editor';
    };

    _this.onEditorScroll = function (cm) {

      if (_this.owner === 'editor') {

        var scrollInfo = _this.editor.getScrollInfo();
        _this.editorLine = _this.editor.lineAtHeight(scrollInfo.top, 'local');
        var previewPos = _this.preview.querySelector('[line-number="' + (_this.editorLine + 1) + '"]');
        if (previewPos != null) {
          _this.preview.scrollTop = previewPos.offsetTop - 10;
        }
      }
    };

    _this.onPreviewScroll = function (e) {
      if (_this.owner === 'preview') {

        var lineNumbers = _this.preview.getElementsByClassName('line-number');

        var line = 0;
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = lineNumbers[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var ele = _step.value;

            if (_this.preview.scrollTop > ele.offsetTop) {
              line = ele.getAttribute('line-number');
            }
          }
        } catch (err) {
          _didIteratorError = true;
          _iteratorError = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion && _iterator.return) {
              _iterator.return();
            }
          } finally {
            if (_didIteratorError) {
              throw _iteratorError;
            }
          }
        }

        var height = _this.editor.heightAtLine(parseInt(line - 1), 'local');
        _this.editor.scrollTo(null, height);
      }
    };

    _this.state = {
      markdownSrc: ""
    };

    _this.owner = 'editor';

    _this.editorLine = 0;
    return _this;
  }

  _createClass(MarkdownEditor, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.editor = this.refs.editor.editorInstance();
      this.preview = this.refs.preview.previewInstance();
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          height = _props.height,
          width = _props.width,
          value = _props.value,
          showEditor = _props.showEditor,
          showEditorNav = _props.showEditorNav,
          showPreview = _props.showPreview,
          showOrder = _props.showOrder,
          markBtns = _props.markBtns,
          registMarkBtns = _props.registMarkBtns,
          markedOptions = _props.markedOptions,
          codemirrorOptions = _props.codemirrorOptions;


      return _react2.default.createElement(
        'div',
        { className: 'markdown-editor',
          style: { flexDirection: showOrder ? 'row' : 'row-reverse', height: height } },
        _react2.default.createElement(_Editor2.default, {
          ref: 'editor',
          show: showEditor,
          showNav: showEditorNav,
          options: codemirrorOptions,
          markBtns: this.props.markBtns,
          registMarkBtns: this.props.registMarkBtns,
          value: value,
          onChange: this.onMarkdownChange,
          onMouseEnter: this.editorOwner,
          onScroll: this.onEditorScroll
        }),
        _react2.default.createElement(_MarkdownPreview2.default, {
          ref: 'preview',
          show: showPreview,
          source: this.state.markdownSrc,
          onMouseEnter: this.previewOwner,
          onScroll: this.onPreviewScroll,
          options: markedOptions
        })
      );
    }
  }]);

  return MarkdownEditor;
}(_react2.default.Component);

MarkdownEditor.defaultProps = {
  height: '400px',
  width: '100%',
  showEditor: true,
  showEditorNav: true,
  showPreview: true,
  showOrder: true
};

MarkdownEditor.propTypes = {
  value: _propTypes2.default.string,
  height: _propTypes2.default.string,
  showEditor: _propTypes2.default.bool,
  showEditorNav: _propTypes2.default.bool,
  showPreview: _propTypes2.default.bool,
  showOrder: _propTypes2.default.bool,
  editorOptions: _propTypes2.default.object,
  markedOptions: _propTypes2.default.object
};

exports.default = MarkdownEditor;