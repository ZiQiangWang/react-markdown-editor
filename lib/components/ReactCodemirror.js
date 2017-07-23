'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _codemirror = require('codemirror');

var _codemirror2 = _interopRequireDefault(_codemirror);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @authors ZiQiangWang
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @email   814120507@qq.com
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @date    2017-07-23 16:02:33
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var ReactCodeMirror = function (_Component) {
  _inherits(ReactCodeMirror, _Component);

  function ReactCodeMirror(props) {
    _classCallCheck(this, ReactCodeMirror);

    var _this = _possibleConstructorReturn(this, (ReactCodeMirror.__proto__ || Object.getPrototypeOf(ReactCodeMirror)).call(this, props));

    _this.getEventHandleFromProps = function () {
      var propNames = Object.keys(_this.props);
      var eventHandle = propNames.filter(function (prop) {
        var p = /^on+/;
        return p.test(prop);
      });

      var eventDict = {};
      eventHandle.forEach(function (ele) {
        eventDict[ele] = ele.replace(/^on[A-Z]/g, function (s) {
          return s.slice(2).toLowerCase();
        });
      });

      return eventDict;
    };

    _this.getCodeMirror = function () {
      return _this.codemirror;
    };

    _this.codemirror = undefined;
    return _this;
  }

  _createClass(ReactCodeMirror, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      // 生成codemirror实例
      this.codemirror = _codemirror2.default.fromTextArea(this.refs.textarea, this.props.options);

      // 事件处理映射
      var eventDict = this.getEventHandleFromProps();

      for (var event in eventDict) {
        this.codemirror.on(eventDict[event], this.props[event]);
      }
      // 初始化值
      this.codemirror.setValue(this.props.value || '');
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      if (this.codeMirror) {
        this.codeMirror.toTextArea();
      }
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {

      if (nextProps.value !== undefined && nextProps.value !== this.props.value) {
        this.codemirror.setValue(nextProps.value);
      }
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        { className: 'ReactCodeMirror' },
        _react2.default.createElement('textarea', { ref: 'textarea' })
      );
    }
  }]);

  return ReactCodeMirror;
}(_react.Component);

ReactCodeMirror.propTypes = {
  value: _propTypes2.default.string,
  options: _propTypes2.default.object
};

exports.default = ReactCodeMirror;