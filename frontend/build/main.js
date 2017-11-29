/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var actions = {};

actions.loadCourses = function (store) {
  fetch('http://mwa.pages.mi.hdm-stuttgart.de/examples/simple/courses.json').then(function (response) {
    return response.json();
  }).then(function (courses) {
    store.courses = courses;
    store.notify();
  });
};

actions.toggleAddForm = function (store) {
  store.addFormOpen = !store.addFormOpen;
  store.notify();
};

actions.addCourse = function (course, store) {
  store.courses.push(course);
  actions.toggleAddForm(store);
  store.notify();
};

actions.removeCourse = function (index, store) {
  store.courses.splice(index, 1);
  store.notify();
};

exports.default = actions;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _react = __webpack_require__(2);

var _react2 = _interopRequireDefault(_react);

var _reactDom = __webpack_require__(3);

var _reactDom2 = _interopRequireDefault(_reactDom);

var _app = __webpack_require__(4);

var _app2 = _interopRequireDefault(_app);

var _utils = __webpack_require__(5);

var _utils2 = _interopRequireDefault(_utils);

var _actions = __webpack_require__(0);

var _actions2 = _interopRequireDefault(_actions);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// init
document.addEventListener('DOMContentLoaded', function () {
  var store = _utils2.default.createStore();
  _actions2.default.loadCourses(store);

  _reactDom2.default.render(_react2.default.createElement(_app2.default, { store: store }), document.getElementById('app'));
}, false);

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = React;

/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = ReactDOM;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _actions = __webpack_require__(0);

var _actions2 = _interopRequireDefault(_actions);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var App = function (_React$Component) {
  _inherits(App, _React$Component);

  function App(props) {
    _classCallCheck(this, App);

    var _this = _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this, props));

    _this.state = {
      store: props.store
    };

    props.store.subscribe(function (s) {
      return _this.setState({ store: s });
    });
    return _this;
  }

  _createClass(App, [{
    key: 'render',
    value: function render() {
      return React.createElement(
        'div',
        null,
        React.createElement(Navigation, { store: this.state.store }),
        React.createElement(AddCourseForm, { store: this.state.store }),
        React.createElement(Courses, { store: this.state.store, courses: this.state.store.courses })
      );
    }
  }]);

  return App;
}(React.Component);

exports.default = App;


var Navigation = function Navigation(props) {
  var style = {
    container: {
      height: '50px',
      background: 'linear-gradient(#00bcd4, #03a9f4)',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      color: 'white',
      paddingLeft: '1em',
      paddingRight: '1em'
    },
    button: {
      color: 'white',
      textDecoration: 'none',
      paddingLeft: '1em',
      paddingRight: '1em',
      border: 'solid 1px white',
      borderRadius: '15px',
      height: '30px',
      display: 'inline-flex',
      alignItems: 'center',
      marginLeft: '1em'
    }
  };

  return React.createElement(
    'nav',
    { style: style.container },
    React.createElement(
      'h2',
      null,
      'Courses: React'
    ),
    React.createElement(
      'div',
      null,
      React.createElement(
        'a',
        {
          href: '#',
          onClick: function onClick() {
            return _actions2.default.loadCourses(props.store);
          },
          style: style.button },
        'Reload'
      ),
      React.createElement(
        'a',
        {
          href: '#',
          onClick: function onClick() {
            return _actions2.default.toggleAddForm(props.store);
          },
          style: style.button },
        'Add'
      )
    )
  );
};

// Courses component creates an array of course components
var Courses = function Courses(props) {
  var style = {
    collection: {
      marginTop: '2em',
      display: 'flex',
      flexWrap: 'wrap'
    }
  };

  if (props.courses.length == 0) {
    return React.createElement(
      'div',
      null,
      React.createElement(
        'h1',
        null,
        'No Courses'
      ),
      React.createElement(
        'p',
        null,
        'No courses loaded yet'
      )
    );
  }

  return React.createElement(
    'div',
    null,
    React.createElement(
      'h1',
      null,
      props.courses.length,
      ' Courses'
    ),
    React.createElement(
      'div',
      { style: style.collection },
      props.courses.map(function (c, i) {
        return React.createElement(Course, { key: i, index: i, course: c, store: props.store });
      })
    )
  );
};

// Course component renders a course
var Course = function Course(props) {
  var style = {
    panel: {
      borderRadius: '15px',
      padding: '1em',
      textAlign: 'center',
      background: '#fafafa',
      border: '5px solid white',
      width: '300px',
      cursor: 'pointer'
    }
  };

  return React.createElement(
    'div',
    {
      style: style.panel,
      onClick: function onClick() {
        return _actions2.default.removeCourse(props.index, props.store);
      } },
    React.createElement(
      'p',
      null,
      props.course.id
    ),
    React.createElement(
      'h2',
      null,
      props.course.course
    ),
    props.course.staff.map(function (s, i) {
      return React.createElement(
        'div',
        { key: i },
        s
      );
    }),
    React.createElement(
      'p',
      null,
      props.course.location
    )
  );
};

var AddCourseForm = function (_React$Component2) {
  _inherits(AddCourseForm, _React$Component2);

  function AddCourseForm(props) {
    _classCallCheck(this, AddCourseForm);

    var _this2 = _possibleConstructorReturn(this, (AddCourseForm.__proto__ || Object.getPrototypeOf(AddCourseForm)).call(this, props));

    _this2.state = {
      store: props.store,
      id: '',
      name: '',
      staff: '',
      location: '',
      style: {
        input: {
          margin: '1em',
          padding: '1em',
          fontSize: '1em',
          width: '400px',
          border: 'none',
          borderBottom: '1px solid #eaeaea'
        },
        button: {
          margin: '1em',
          padding: '1em',
          fontSize: '1em',
          width: '400px',
          border: 'none',
          background: 'linear-gradient(#00bcd4, #03a9f4)',
          color: 'white',
          borderRadius: '15px'
        }
      }
    };
    return _this2;
  }

  _createClass(AddCourseForm, [{
    key: 'render',
    value: function render() {
      var _this3 = this;

      if (!this.state.store.addFormOpen) {
        return null;
      }

      return React.createElement(
        'div',
        null,
        React.createElement(
          'h1',
          null,
          'Add Course'
        ),
        React.createElement(
          'form',
          null,
          React.createElement('input', {
            type: 'text',
            value: this.state.id,
            onChange: function onChange(e) {
              return _this3.setState({ id: e.target.value });
            },
            placeholder: 'ID',
            style: this.state.style.input
          }),
          React.createElement('br', null),
          React.createElement('input', {
            type: 'text',
            value: this.state.name,
            onChange: function onChange(e) {
              return _this3.setState({ name: e.target.value });
            },
            placeholder: 'Name',
            style: this.state.style.input
          }),
          React.createElement('br', null),
          React.createElement('input', {
            type: 'text',
            value: this.state.staff,
            onChange: function onChange(e) {
              return _this3.setState({ staff: e.target.value });
            },
            placeholder: 'Staff',
            style: this.state.style.input
          }),
          React.createElement('br', null),
          React.createElement('input', {
            type: 'text',
            value: this.state.location,
            onChange: function onChange(e) {
              return _this3.setState({ location: e.target.value });
            },
            placeholder: 'Location',
            style: this.state.style.input
          }),
          React.createElement('br', null),
          React.createElement('input', {
            type: 'button',
            value: 'Add',
            style: this.state.style.button,
            onClick: function onClick() {
              _actions2.default.addCourse({
                id: _this3.state.id,
                course: _this3.state.name,
                staff: [_this3.state.staff],
                location: _this3.state.location
              }, _this3.state.store);
            }
          })
        )
      );
    }
  }]);

  return AddCourseForm;
}(React.Component);

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var utils = {};

// create a new store
utils.createStore = function () {
  return {
    courses: [],
    addFormOpen: false,
    subscribers: [],
    subscribe: function subscribe(s) {
      this.subscribers.push(s);
    },
    notify: function notify() {
      for (var i = 0; i < this.subscribers.length; i++) {
        this.subscribers[i](this);
      }
    }
  };
};

exports.default = utils;

/***/ })
/******/ ]);