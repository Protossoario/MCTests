(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _alt = require('../alt');

var _alt2 = _interopRequireDefault(_alt);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var AddTestActions = (function () {
    function AddTestActions() {
        _classCallCheck(this, AddTestActions);

        this.generateActions('getAllQuestionsSuccess', 'getAllQuestionsFail', 'addTestSuccess', 'addTestFail', 'updateIdentifier', 'invalidTestIdentifier', 'invalidNumberOfQuestions', 'updateFilter');
    }

    _createClass(AddTestActions, [{
        key: 'getAllQuestions',
        value: function getAllQuestions() {
            var _this = this;

            $.ajax({ url: 'http://localhost:8080/MCQuestions/api/questions' }).done(function (data) {
                _this.actions.getAllQuestionsSuccess(data);
            }).fail(function (jqXhr) {
                _this.actions.getAllQuestionsFail(jqXhr);
            });
        }
    }, {
        key: 'toggleQuestionSelected',
        value: function toggleQuestionSelected(id) {
            this.dispatch(id);
        }
    }, {
        key: 'addTest',
        value: function addTest(testIdentifier, questionIds) {
            var _this2 = this;

            $.ajax({
                type: 'POST',
                contentType: 'application/json',
                url: '/api/tests',
                data: JSON.stringify({
                    testIdentifier: testIdentifier,
                    questionIds: questionIds
                })
            }).done(function (data) {
                _this2.actions.addTestSuccess(data.message);
            }).fail(function (jqXhr) {
                _this2.actions.addTestFail(jqXhr.responseJSON ? jqXhr.responseJSON.message : 'Server unreachable.');
            });
        }
    }]);

    return AddTestActions;
})();

exports.default = _alt2.default.createActions(AddTestActions);

},{"../alt":6}],2:[function(require,module,exports){
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _alt = require('../alt');

var _alt2 = _interopRequireDefault(_alt);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var PreviewTestActions = (function () {
    function PreviewTestActions() {
        _classCallCheck(this, PreviewTestActions);

        this.generateActions('getTestSuccess', 'getTestFail', 'getQuestionsSuccess', 'getQuestionsFail');
    }

    _createClass(PreviewTestActions, [{
        key: 'getTest',
        value: function getTest(testIdentifier) {
            var _this = this;

            $.ajax({ url: '/api/tests/' + testIdentifier }).done(function (data) {
                _this.actions.getTestSuccess(data);
                _this.actions.getQuestions(data.questionIds);
            }).fail(function (jqXhr) {
                _this.actions.getTestFail(jqXhr.responseJSON ? jqXhr.responseJSON.message : 'Server unreachable.');
            });
        }
    }, {
        key: 'getQuestions',
        value: function getQuestions(questionIds) {
            var _this2 = this;

            // query MCQuestions for question data
            $.ajax({
                url: 'http://localhost:8080/MCQuestions/api/questions/find',
                type: 'POST',
                data: {
                    ids: questionIds
                },
                traditional: true // this tells jQuery not to encode arrays in the PHP way, which is incompatible with Jersey/Tomcat
            }).done(function (data) {
                _this2.actions.getQuestionsSuccess(data);
            }).fail(function (jqXhr) {
                _this2.actions.getQuestionsFail(jqXhr);
            });
        }
    }]);

    return PreviewTestActions;
})();

exports.default = _alt2.default.createActions(PreviewTestActions);

},{"../alt":6}],3:[function(require,module,exports){
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _alt = require('../alt');

var _alt2 = _interopRequireDefault(_alt);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var StudentTestActions = (function () {
    function StudentTestActions() {
        _classCallCheck(this, StudentTestActions);

        this.generateActions('getTestSuccess', 'getTestFail', 'getQuestionsSuccess', 'getQuestionsFail', 'submitTest');
    }

    _createClass(StudentTestActions, [{
        key: 'getTest',
        value: function getTest(testIdentifier) {
            var _this = this;

            $.ajax({ url: '/api/tests/' + testIdentifier }).done(function (data) {
                _this.actions.getTestSuccess(data);
                _this.actions.getQuestions(data.questionIds);
            }).fail(function (jqXhr) {
                _this.actions.getTestFail(jqXhr.responseJSON ? jqXhr.responseJSON.message : 'Server unreachable.');
            });
        }
    }, {
        key: 'getQuestions',
        value: function getQuestions(questionIds) {
            var _this2 = this;

            // query MCQuestions for question data
            $.ajax({
                url: 'http://localhost:8080/MCQuestions/api/questions/find',
                type: 'POST',
                data: {
                    ids: questionIds
                },
                traditional: true // this tells jQuery not to encode arrays in the PHP way, which is incompatible with Jersey/Tomcat
            }).done(function (data) {
                _this2.actions.getQuestionsSuccess(data);
            }).fail(function (jqXhr) {
                _this2.actions.getQuestionsFail(jqXhr);
            });
        }
    }, {
        key: 'updateQuestionAnswer',
        value: function updateQuestionAnswer(questionIndex, answerIndex) {
            this.dispatch({ questionIndex: questionIndex, answerIndex: answerIndex });
        }
    }]);

    return StudentTestActions;
})();

exports.default = _alt2.default.createActions(StudentTestActions);

},{"../alt":6}],4:[function(require,module,exports){
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _alt = require('../alt');

var _alt2 = _interopRequireDefault(_alt);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var TestActions = (function () {
    function TestActions() {
        _classCallCheck(this, TestActions);

        this.generateActions('getTestSuccess', 'getTestFail', 'getAllQuestionsSuccess', 'getAllQuestionsFail', 'updateTestSuccess', 'updateTestFail', 'invalidNumberOfQuestions', 'updateFilter');
    }

    // After succesfully obtaining test data, dispatch method to query all questions, otherwise there's no point

    _createClass(TestActions, [{
        key: 'getTest',
        value: function getTest(testIdentifier) {
            var _this = this;

            $.ajax({ url: '/api/tests/' + testIdentifier }).done(function (data) {
                _this.actions.getTestSuccess(data);
                _this.actions.getAllQuestions();
            }).fail(function (jqXhr) {
                _this.actions.getTestFail(jqXhr.responseJSON ? jqXhr.responseJSON.message : 'Server unreachable.');
            });
        }
    }, {
        key: 'getAllQuestions',
        value: function getAllQuestions() {
            var _this2 = this;

            $.ajax({ url: 'http://localhost:8080/MCQuestions/api/questions' }).done(function (data) {
                _this2.actions.getAllQuestionsSuccess(data);
            }).fail(function (jqXhr) {
                _this2.actions.getAllQuestionsFail(jqXhr);
            });
        }
    }, {
        key: 'toggleQuestionSelected',
        value: function toggleQuestionSelected(id) {
            this.dispatch(id);
        }
    }, {
        key: 'updateTest',
        value: function updateTest(testIdentifier, questionIds) {
            var _this3 = this;

            $.ajax({
                type: 'PUT',
                contentType: 'application/json',
                url: '/api/tests/' + testIdentifier,
                data: JSON.stringify({
                    questionIds: questionIds
                })
            }).done(function (data) {
                _this3.actions.updateTestSuccess(data.message);
            }).fail(function (jqXhr) {
                _this3.actions.updateTestFail(jqXhr.responseJSON ? jqXhr.responseJSON.message : 'Server unreachable.');
            });
        }
    }]);

    return TestActions;
})();

exports.default = _alt2.default.createActions(TestActions);

},{"../alt":6}],5:[function(require,module,exports){
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _alt = require('../alt');

var _alt2 = _interopRequireDefault(_alt);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var TestListActions = (function () {
    function TestListActions() {
        _classCallCheck(this, TestListActions);

        this.generateActions('getAllTestsSuccess', 'getAllTestFail');
    }

    _createClass(TestListActions, [{
        key: 'getAllTests',
        value: function getAllTests() {
            var _this = this;

            $.ajax({ url: '/api/tests' }).done(function (data) {
                _this.actions.getAllTestsSuccess(data);
            }).fail(function (jqXhr) {
                _this.actions.getAllTestFail(jqXhr);
            });
        }
    }]);

    return TestListActions;
})();

exports.default = _alt2.default.createActions(TestListActions);

},{"../alt":6}],6:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _alt = require('alt');

var _alt2 = _interopRequireDefault(_alt);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = new _alt2.default();

},{"alt":"alt"}],7:[function(require,module,exports){
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _AddTestStore = require('../stores/AddTestStore');

var _AddTestStore2 = _interopRequireDefault(_AddTestStore);

var _AddTestActions = require('../actions/AddTestActions');

var _AddTestActions2 = _interopRequireDefault(_AddTestActions);

var _QuestionCatalogue = require('./QuestionCatalogue');

var _QuestionCatalogue2 = _interopRequireDefault(_QuestionCatalogue);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AddTest = (function (_React$Component) {
    _inherits(AddTest, _React$Component);

    function AddTest(props) {
        _classCallCheck(this, AddTest);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(AddTest).call(this, props));

        _this.state = _AddTestStore2.default.getState();
        _this.onChange = _this.onChange.bind(_this);
        return _this;
    }

    _createClass(AddTest, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            _AddTestStore2.default.listen(this.onChange);
            _AddTestActions2.default.getAllQuestions();
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            _AddTestStore2.default.unlisten(this.onChange);
        }
    }, {
        key: 'onChange',
        value: function onChange(state) {
            this.setState(state);
        }
    }, {
        key: 'handleSubmit',
        value: function handleSubmit() {
            var testIdentifier = this.state.testIdentifier;
            // Filter out questions which are not selected, then return an array of their ids
            var questionIds = this.state.questions.filter(function (q) {
                return q.selected;
            }).map(function (q) {
                return q.id;
            });

            var valid = true;

            // Check if test identifier conforms to the valid format
            if (!/^\w{5,}-\d{4}-\d{2}-\d{2}/.test(testIdentifier)) {
                _AddTestActions2.default.invalidTestIdentifier();
                this.refs.testIdentifier.focus();
                valid = false;
            }

            if (questionIds.length == 0) {
                _AddTestActions2.default.invalidNumberOfQuestions();
                valid = false;
            }

            if (valid) {
                _AddTestActions2.default.addTest(testIdentifier, questionIds);
            }
        }
    }, {
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                'div',
                null,
                _react2.default.createElement(
                    'div',
                    { className: 'container' },
                    _react2.default.createElement(
                        'div',
                        { className: 'panel panel-default' },
                        _react2.default.createElement(
                            'div',
                            { className: 'panel-heading' },
                            _react2.default.createElement('i', { className: 'glyphicon glyphicon-plus' }),
                            ' Create a New Test'
                        ),
                        _react2.default.createElement(
                            'div',
                            { className: 'panel-body' },
                            _react2.default.createElement(
                                'div',
                                { className: "form-group " + this.state.testIdentifierState },
                                _react2.default.createElement(
                                    'label',
                                    { htmlFor: 'identifier' },
                                    'Test identifier:'
                                ),
                                _react2.default.createElement('input', { className: 'form-control', type: 'text', ref: 'testIdentifier', id: 'identifier', value: this.state.testIdentifier, onChange: _AddTestActions2.default.updateIdentifier, placeholder: 'Input an identifier for the test (e.g. \'CE902-2015-12-09\')' }),
                                _react2.default.createElement(
                                    'span',
                                    { className: 'help-block' },
                                    this.state.testIdentifierHelpBlock ? this.state.testIdentifierHelpBlock : "The identifier must consist of a module name that's at least 5 characters long, a dash, and date in the format 'YYYY-MM-DD'."
                                )
                            ),
                            _react2.default.createElement(
                                'button',
                                { className: 'btn btn-primary', onClick: this.handleSubmit.bind(this) },
                                _react2.default.createElement('i', { className: 'glyphicon glyphicon-ok' }),
                                ' Submit'
                            )
                        ),
                        _react2.default.createElement(
                            'div',
                            { className: 'panel-heading' },
                            _react2.default.createElement('i', { className: 'glyphicon glyphicon-th-list' }),
                            ' Question Catalogue',
                            _react2.default.createElement(
                                'a',
                                { className: 'pull-right btn btn-xs btn-info', href: 'http://localhost:8080/MCQuestions/addQuestion', target: '_blank', role: 'button' },
                                'Add More Questions ',
                                _react2.default.createElement('i', { className: 'glyphicon glyphicon-chevron-right' })
                            )
                        ),
                        _react2.default.createElement(
                            'div',
                            { className: 'panel-body' },
                            _react2.default.createElement(
                                'div',
                                { className: "form-group " + this.state.questionsState },
                                _react2.default.createElement(
                                    'label',
                                    { htmlFor: 'categories' },
                                    'Filter by category'
                                ),
                                _react2.default.createElement('input', { className: 'form-control', type: 'text', id: 'categories', onChange: _AddTestActions2.default.updateFilter, placeholder: 'Type the tag names separated by commas or spaces (e.g. math, geometry, physics)' }),
                                _react2.default.createElement(
                                    'span',
                                    { className: 'help-block' },
                                    this.state.questionsHelpBlock
                                )
                            ),
                            _react2.default.createElement(_QuestionCatalogue2.default, { questions: this.state.questions, toggleQuestion: _AddTestActions2.default.toggleQuestionSelected, filter: this.state.filter })
                        )
                    )
                )
            );
        }
    }]);

    return AddTest;
})(_react2.default.Component);

exports.default = AddTest;

},{"../actions/AddTestActions":1,"../stores/AddTestStore":21,"./QuestionCatalogue":13,"react":"react"}],8:[function(require,module,exports){
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Navbar = require('./Navbar');

var _Navbar2 = _interopRequireDefault(_Navbar);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var App = (function (_React$Component) {
    _inherits(App, _React$Component);

    function App() {
        _classCallCheck(this, App);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(App).apply(this, arguments));
    }

    _createClass(App, [{
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                'div',
                null,
                _react2.default.createElement(_Navbar2.default, { history: this.props.history }),
                this.props.children
            );
        }
    }]);

    return App;
})(_react2.default.Component);

exports.default = App;

},{"./Navbar":10,"react":"react"}],9:[function(require,module,exports){
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _TestList = require('./TestList');

var _TestList2 = _interopRequireDefault(_TestList);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Home = (function (_React$Component) {
  _inherits(Home, _React$Component);

  function Home() {
    _classCallCheck(this, Home);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(Home).apply(this, arguments));
  }

  _createClass(Home, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        { className: 'container' },
        _react2.default.createElement(_TestList2.default, null)
      );
    }
  }]);

  return Home;
})(_react2.default.Component);

exports.default = Home;

},{"./TestList":18,"react":"react"}],10:[function(require,module,exports){
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouter = require('react-router');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Navbar = (function (_React$Component) {
    _inherits(Navbar, _React$Component);

    function Navbar() {
        _classCallCheck(this, Navbar);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(Navbar).apply(this, arguments));
    }

    _createClass(Navbar, [{
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                'nav',
                { className: 'navbar navbar-default navbar-static-top' },
                _react2.default.createElement(
                    'div',
                    { className: 'navbar-header' },
                    _react2.default.createElement(
                        'button',
                        { type: 'button', className: 'navbar-toggle collapsed', 'data-toggle': 'collapse', 'data-target': '#navbar' },
                        _react2.default.createElement(
                            'span',
                            { className: 'sr-only' },
                            'Toggle navigation'
                        ),
                        _react2.default.createElement('span', { className: 'icon-bar' }),
                        _react2.default.createElement('span', { className: 'icon-bar' }),
                        _react2.default.createElement('span', { className: 'icon-bar' })
                    ),
                    _react2.default.createElement(
                        _reactRouter.Link,
                        { to: '/', className: 'navbar-brand' },
                        _react2.default.createElement(
                            'small',
                            null,
                            _react2.default.createElement('i', { className: 'glyphicon glyphicon-list-alt', style: { color: '#cc0000' } })
                        ),
                        ' MCT'
                    )
                ),
                _react2.default.createElement(
                    'div',
                    { id: 'navbar', className: 'navbar-collapse collapse' },
                    _react2.default.createElement(
                        'ul',
                        { className: 'nav navbar-nav' },
                        _react2.default.createElement(
                            'li',
                            null,
                            _react2.default.createElement(
                                _reactRouter.Link,
                                { to: '/' },
                                'Home'
                            )
                        ),
                        _react2.default.createElement(
                            'li',
                            null,
                            _react2.default.createElement(
                                _reactRouter.Link,
                                { to: '/addTest' },
                                'Add Test'
                            )
                        )
                    )
                )
            );
        }
    }]);

    return Navbar;
})(_react2.default.Component);

exports.default = Navbar;

},{"react":"react","react-router":"react-router"}],11:[function(require,module,exports){
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PreviewQuestion = (function (_React$Component) {
    _inherits(PreviewQuestion, _React$Component);

    function PreviewQuestion() {
        _classCallCheck(this, PreviewQuestion);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(PreviewQuestion).apply(this, arguments));
    }

    _createClass(PreviewQuestion, [{
        key: "render",
        value: function render() {
            var answers = this.props.question.answers;
            var correctAnswers = answers.reduce(function (count, answer) {
                return count + (answer.correct ? 1 : 0);
            }, 0);
            var renderAnswers = answers.map(function (a, index) {
                return _react2.default.createElement(
                    "div",
                    { key: a.id, className: correctAnswers > 1 ? "checkbox" : "radio" },
                    _react2.default.createElement(
                        "label",
                        null,
                        _react2.default.createElement("input", { type: correctAnswers > 1 ? "checkbox" : "radio", value: index }),
                        a.text
                    )
                );
            });
            return _react2.default.createElement(
                "div",
                { className: "panel panel-primary" },
                _react2.default.createElement(
                    "div",
                    { className: "panel-heading" },
                    this.props.question.text
                ),
                _react2.default.createElement(
                    "div",
                    { className: "panel-body" },
                    correctAnswers > 1 ? "Check all that apply (no more than " + correctAnswers + ")." : "Choose one.",
                    renderAnswers
                )
            );
        }
    }]);

    return PreviewQuestion;
})(_react2.default.Component);

exports.default = PreviewQuestion;

},{"react":"react"}],12:[function(require,module,exports){
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _PreviewTestStore = require('../stores/PreviewTestStore');

var _PreviewTestStore2 = _interopRequireDefault(_PreviewTestStore);

var _PreviewTestActions = require('../actions/PreviewTestActions');

var _PreviewTestActions2 = _interopRequireDefault(_PreviewTestActions);

var _PreviewQuestion = require('./PreviewQuestion');

var _PreviewQuestion2 = _interopRequireDefault(_PreviewQuestion);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PreviewTest = (function (_React$Component) {
    _inherits(PreviewTest, _React$Component);

    function PreviewTest(props) {
        _classCallCheck(this, PreviewTest);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(PreviewTest).call(this, props));

        _this.state = _PreviewTestStore2.default.getState();
        _this.onChange = _this.onChange.bind(_this);
        return _this;
    }

    _createClass(PreviewTest, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            _PreviewTestStore2.default.listen(this.onChange);
            _PreviewTestActions2.default.getTest(this.props.params.id);
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            _PreviewTestStore2.default.unlisten(this.onChange);
        }
    }, {
        key: 'componentDidUpdate',
        value: function componentDidUpdate(prevProps) {
            // When URL path changes, fetch new test data
            if (prevProps.params.id !== this.props.params.id) {
                _PreviewTestActions2.default.getTest(this.props.params.id);
            }
        }
    }, {
        key: 'onChange',
        value: function onChange(state) {
            this.setState(state);
        }
    }, {
        key: 'render',
        value: function render() {
            var questions = this.state.questions.map(function (q) {
                return _react2.default.createElement(_PreviewQuestion2.default, { key: q.id, question: q });
            });
            return _react2.default.createElement(
                'div',
                { className: 'container' },
                questions
            );
        }
    }]);

    return PreviewTest;
})(_react2.default.Component);

exports.default = PreviewTest;

},{"../actions/PreviewTestActions":2,"../stores/PreviewTestStore":22,"./PreviewQuestion":11,"react":"react"}],13:[function(require,module,exports){
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _QuestionItem = require('./QuestionItem');

var _QuestionItem2 = _interopRequireDefault(_QuestionItem);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var QuestionCatalogue = (function (_React$Component) {
    _inherits(QuestionCatalogue, _React$Component);

    function QuestionCatalogue() {
        _classCallCheck(this, QuestionCatalogue);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(QuestionCatalogue).apply(this, arguments));
    }

    _createClass(QuestionCatalogue, [{
        key: 'matchFilter',
        value: function matchFilter(question, regex) {
            return regex.test(question.categories.join());
        }
    }, {
        key: 'renderQuestionRows',
        value: function renderQuestionRows(selectedQuestions, filteredQuestions) {
            var questionRows = [];
            var questionBuffer = [];
            var perRow = 4;
            for (var i = 0; i < selectedQuestions.length; i++) {
                if (questionBuffer.length === perRow) {
                    console.log(questionBuffer);
                    questionRows.push(_react2.default.createElement(
                        'div',
                        { key: 'selected' + i, className: 'row' },
                        questionBuffer
                    ));
                    questionBuffer = [];
                    console.log('Hello');
                    console.log(questionBuffer);
                    console.log(questionRows);
                }
                questionBuffer.push(selectedQuestions[i]);
            }
            for (var i = 0; i < filteredQuestions.length; i++) {
                if (questionBuffer.length === perRow) {
                    questionRows.push(_react2.default.createElement(
                        'div',
                        { key: 'filtered' + i, className: 'row' },
                        questionBuffer
                    ));
                    questionBuffer = [];
                }
                questionBuffer.push(filteredQuestions[i]);
            }
            questionRows.push(_react2.default.createElement(
                'div',
                { key: 'last', className: 'row' },
                questionBuffer
            ));
            return questionRows;
        }
    }, {
        key: 'render',
        value: function render() {
            var selectedQuestions = [];
            var filteredQuestions = [];

            // Convert the user input into a regular expression to match any of the categories specified
            // 1. split the input by either commas or spaces
            // 2. then join the resulting array into a string, separating the tokens with the OR operator for regexes
            var filterRegex = new RegExp(this.props.filter.split(/\s|,/).join('|'), 'i');

            for (var i = 0; i < this.props.questions.length; i++) {
                var q = this.props.questions[i];
                var qRender = _react2.default.createElement(_QuestionItem2.default, { key: q.id, text: q.text, answers: q.answers, categories: q.categories, toggle: this.props.toggleQuestion, selected: q.selected, id: q.id });
                if (q.selected) {
                    selectedQuestions.push(qRender);
                } else if (this.matchFilter(q, filterRegex)) {
                    filteredQuestions.push(qRender);
                }
            }

            return _react2.default.createElement(
                'div',
                null,
                this.renderQuestionRows(selectedQuestions, filteredQuestions)
            );
        }
    }]);

    return QuestionCatalogue;
})(_react2.default.Component);

exports.default = QuestionCatalogue;

},{"./QuestionItem":14,"react":"react"}],14:[function(require,module,exports){
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var QuestionItem = (function (_React$Component) {
    _inherits(QuestionItem, _React$Component);

    function QuestionItem() {
        _classCallCheck(this, QuestionItem);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(QuestionItem).apply(this, arguments));
    }

    _createClass(QuestionItem, [{
        key: "render",
        value: function render() {
            var answers = this.props.answers.map(function (a, index) {
                return _react2.default.createElement(
                    "tr",
                    { key: index, className: a.correct ? "success" : "" },
                    _react2.default.createElement(
                        "td",
                        { className: "col-sm-2" },
                        _react2.default.createElement(
                            "small",
                            null,
                            "#",
                            index + 1
                        )
                    ),
                    _react2.default.createElement(
                        "td",
                        { className: "col-sm-8" },
                        a.text
                    ),
                    _react2.default.createElement(
                        "td",
                        { className: "col-sm-2" },
                        _react2.default.createElement("i", { className: a.correct ? "glyphicon glyphicon-ok" : "glyphicon glyphicon-remove" })
                    )
                );
            });
            var selectionIcon = _react2.default.createElement(
                "span",
                { className: this.props.selected ? "label label-info pull-right" : "label label-default pull-right", style: { display: this.props.selected === undefined ? "none" : "inline" } },
                _react2.default.createElement("i", { className: this.props.selected ? "glyphicon glyphicon-ok-circle" : "glyphicon glyphicon-ban-circle" })
            );
            return _react2.default.createElement(
                "div",
                { className: "col-sm-3" },
                _react2.default.createElement(
                    "div",
                    { className: "panel panel-question " + (this.props.selected ? "panel-info" : "panel-default"), onClick: this.props.toggle !== undefined ? this.props.toggle.bind(null, this.props.id) : null, style: { 'cursor': 'hand', 'cursor': 'pointer' } },
                    _react2.default.createElement(
                        "div",
                        { className: "panel-heading" },
                        _react2.default.createElement(
                            "h4",
                            null,
                            selectionIcon,
                            this.props.text
                        )
                    ),
                    _react2.default.createElement(
                        "table",
                        { className: "table" },
                        _react2.default.createElement(
                            "tbody",
                            null,
                            answers
                        )
                    ),
                    _react2.default.createElement(
                        "div",
                        { className: "panel-footer" },
                        this.props.categories.map(function (c, index) {
                            return (index > 0 ? ', ' : '') + c;
                        })
                    )
                )
            );
        }
    }]);

    return QuestionItem;
})(_react2.default.Component);

exports.default = QuestionItem;

},{"react":"react"}],15:[function(require,module,exports){
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var StudentQuestion = (function (_React$Component) {
    _inherits(StudentQuestion, _React$Component);

    function StudentQuestion() {
        _classCallCheck(this, StudentQuestion);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(StudentQuestion).apply(this, arguments));
    }

    _createClass(StudentQuestion, [{
        key: "render",
        value: function render() {
            var _this2 = this;

            var answers = this.props.question.answers;
            var correctAnswers = answers.reduce(function (count, answer) {
                return count + (answer.correct ? 1 : 0);
            }, 0);
            var renderAnswers = answers.map(function (a, index) {
                var rowClass = "row-answer";
                if (_this2.props.submitted) {
                    if (a.selected && a.correct) {
                        rowClass = rowClass + " success";
                    } else if (a.correct) {
                        rowClass = rowClass + " danger";
                    }
                } else if (a.selected) {
                    rowClass = rowClass + " active";
                }
                return _react2.default.createElement(
                    "tr",
                    { key: a.id, className: rowClass, onClick: _this2.props.selectAnswer.bind(null, _this2.props.index, index) },
                    _react2.default.createElement(
                        "td",
                        { className: "col-sm-12" },
                        _react2.default.createElement("i", { className: "glyphicon glyphicon-" + (a.selected ? "check" : "unchecked") }),
                        " ",
                        a.text
                    )
                );
            });
            return _react2.default.createElement(
                "div",
                { className: "panel panel-primary" },
                _react2.default.createElement(
                    "div",
                    { className: "panel-heading" },
                    this.props.question.text
                ),
                _react2.default.createElement(
                    "div",
                    { className: "panel-body" },
                    correctAnswers > 1 ? "Check all that apply (no more than " + correctAnswers + ")." : "Choose one."
                ),
                _react2.default.createElement(
                    "table",
                    { className: "table" },
                    _react2.default.createElement(
                        "tbody",
                        null,
                        renderAnswers
                    )
                )
            );
        }
    }]);

    return StudentQuestion;
})(_react2.default.Component);

exports.default = StudentQuestion;

},{"react":"react"}],16:[function(require,module,exports){
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _StudentTestStore = require('../stores/StudentTestStore');

var _StudentTestStore2 = _interopRequireDefault(_StudentTestStore);

var _StudentTestActions = require('../actions/StudentTestActions');

var _StudentTestActions2 = _interopRequireDefault(_StudentTestActions);

var _StudentQuestion = require('./StudentQuestion');

var _StudentQuestion2 = _interopRequireDefault(_StudentQuestion);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var StudentTest = (function (_React$Component) {
    _inherits(StudentTest, _React$Component);

    function StudentTest(props) {
        _classCallCheck(this, StudentTest);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(StudentTest).call(this, props));

        _this.state = _StudentTestStore2.default.getState();
        _this.onChange = _this.onChange.bind(_this);
        return _this;
    }

    _createClass(StudentTest, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            _StudentTestStore2.default.listen(this.onChange);
            _StudentTestActions2.default.getTest(this.props.params.id);
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            _StudentTestStore2.default.unlisten(this.onChange);
        }
    }, {
        key: 'componentDidUpdate',
        value: function componentDidUpdate(prevProps) {
            // When URL path changes, fetch new test data
            if (prevProps.params.id !== this.props.params.id) {
                _StudentTestActions2.default.getTest(this.props.params.id);
            }
        }
    }, {
        key: 'onChange',
        value: function onChange(state) {
            this.setState(state);
        }
    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

            var renderTestResult = '';
            if (this.state.submitted) {
                var result = 0;
                // compute the score weight for each question
                this.state.questions.forEach(function (q) {
                    var weight = 0;
                    var correctAnswers = q.answers.reduce(function (count, a) {
                        return count + (a.correct ? 1 : 0);
                    }, 0);
                    if (correctAnswers > 1) {
                        // question has multiple right answers, so weight score = ratio of correct answers
                        q.answers.forEach(function (a) {
                            return weight += a.selected == a.correct ? 1 : 0;
                        });
                        result += weight / q.answers.length;
                    } else {
                        // question has one answer, so only if the answer is correct they get 1 point, else 0 points
                        q.answers.forEach(function (a) {
                            return weight += a.selected && a.correct ? 1 : 0;
                        });
                        result += weight;
                    }
                });
                // average the question weights to get the final score
                result /= this.state.questions.length;

                renderTestResult = _react2.default.createElement(
                    'div',
                    { className: 'panel panel-default animated fadeIn' },
                    _react2.default.createElement(
                        'div',
                        { className: 'panel-heading' },
                        'Final Score: ',
                        result * 100,
                        '%'
                    )
                );
            }

            var questions = this.state.questions.map(function (q, index) {
                return _react2.default.createElement(_StudentQuestion2.default, { key: q.id, question: q, index: index, selectAnswer: _StudentTestActions2.default.updateQuestionAnswer, submitted: _this2.state.submitted });
            });
            return _react2.default.createElement(
                'div',
                { className: 'container' },
                questions,
                _react2.default.createElement(
                    'div',
                    { className: "form-group " + this.state.submitHelpBlockState },
                    _react2.default.createElement(
                        'button',
                        { className: 'btn btn-primary', onClick: _StudentTestActions2.default.submitTest, disabled: this.state.submitted },
                        'Submit'
                    ),
                    _react2.default.createElement(
                        'p',
                        { className: 'help-block' },
                        this.state.submitHelpBlock
                    )
                ),
                renderTestResult
            );
        }
    }]);

    return StudentTest;
})(_react2.default.Component);

exports.default = StudentTest;

},{"../actions/StudentTestActions":3,"../stores/StudentTestStore":23,"./StudentQuestion":15,"react":"react"}],17:[function(require,module,exports){
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _TestStore = require('../stores/TestStore');

var _TestStore2 = _interopRequireDefault(_TestStore);

var _TestActions = require('../actions/TestActions');

var _TestActions2 = _interopRequireDefault(_TestActions);

var _QuestionCatalogue = require('./QuestionCatalogue');

var _QuestionCatalogue2 = _interopRequireDefault(_QuestionCatalogue);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Test = (function (_React$Component) {
    _inherits(Test, _React$Component);

    function Test(props) {
        _classCallCheck(this, Test);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Test).call(this, props));

        _this.state = _TestStore2.default.getState();
        _this.onChange = _this.onChange.bind(_this);
        return _this;
    }

    _createClass(Test, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            _TestStore2.default.listen(this.onChange);
            _TestActions2.default.getTest(this.props.params.id);
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            _TestStore2.default.unlisten(this.onChange);
        }
    }, {
        key: 'componentDidUpdate',
        value: function componentDidUpdate(prevProps) {
            // When URL path changes, fetch new test data
            if (prevProps.params.id !== this.props.params.id) {
                _TestActions2.default.getTest(this.props.params.id);
            }
        }
    }, {
        key: 'onChange',
        value: function onChange(state) {
            this.setState(state);
        }
    }, {
        key: 'handleSubmit',
        value: function handleSubmit() {
            var testIdentifier = this.state.testIdentifier;
            // Filter out questions which are not selected and return an array of their ids
            var questionIds = this.state.questions.filter(function (q) {
                return q.selected;
            }).map(function (q) {
                return q.id;
            });

            if (questionIds.length === 0) {
                _TestActions2.default.invalidNumberOfQuestions();
            } else {
                _TestActions2.default.updateTest(testIdentifier, questionIds);
            }
        }
    }, {
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                'div',
                null,
                _react2.default.createElement(
                    'div',
                    { className: 'container' },
                    _react2.default.createElement(
                        'div',
                        { className: 'panel panel-default' },
                        _react2.default.createElement(
                            'div',
                            { className: 'panel-heading' },
                            _react2.default.createElement('i', { className: 'glyphicon glyphicon-wrench' }),
                            ' View / Edit Test'
                        ),
                        _react2.default.createElement(
                            'div',
                            { className: 'panel-body' },
                            _react2.default.createElement(
                                'div',
                                { className: 'form-group' },
                                _react2.default.createElement(
                                    'label',
                                    { htmlFor: 'identifier' },
                                    'Test identifier:'
                                ),
                                _react2.default.createElement('input', { className: 'form-control', type: 'text', id: 'identifier', value: this.state.testIdentifier, disabled: true })
                            ),
                            _react2.default.createElement(
                                'button',
                                { className: 'btn btn-primary', onClick: this.handleSubmit.bind(this) },
                                _react2.default.createElement('i', { className: 'glyphicon glyphicon-ok' }),
                                ' Save'
                            )
                        ),
                        _react2.default.createElement(
                            'div',
                            { className: 'panel-heading' },
                            _react2.default.createElement('i', { className: 'glyphicon glyphicon-th-list' }),
                            ' Question Catalogue',
                            _react2.default.createElement(
                                'a',
                                { className: 'pull-right btn btn-xs btn-info', href: 'http://localhost:8080/MCQuestions/addQuestion', target: '_blank', role: 'button' },
                                'Add More Questions ',
                                _react2.default.createElement('i', { className: 'glyphicon glyphicon-chevron-right' })
                            )
                        ),
                        _react2.default.createElement(
                            'div',
                            { className: 'panel-body' },
                            _react2.default.createElement(
                                'div',
                                { className: "form-group " + this.state.questionsState },
                                _react2.default.createElement(
                                    'label',
                                    { htmlFor: 'categories' },
                                    'Filter by category'
                                ),
                                _react2.default.createElement('input', { className: 'form-control', type: 'text', id: 'categories', onChange: _TestActions2.default.updateFilter, placeholder: 'Type the tag names separated by commas or spaces (e.g. math, geometry, physics)' }),
                                _react2.default.createElement(
                                    'span',
                                    { className: 'help-block' },
                                    this.state.questionsHelpBlock
                                )
                            ),
                            _react2.default.createElement(_QuestionCatalogue2.default, { questions: this.state.questions, toggleQuestion: _TestActions2.default.toggleQuestionSelected, filter: this.state.filter })
                        )
                    )
                )
            );
        }
    }]);

    return Test;
})(_react2.default.Component);

exports.default = Test;

},{"../actions/TestActions":4,"../stores/TestStore":25,"./QuestionCatalogue":13,"react":"react"}],18:[function(require,module,exports){
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouter = require('react-router');

var _TestListStore = require('../stores/TestListStore');

var _TestListStore2 = _interopRequireDefault(_TestListStore);

var _TestListActions = require('../actions/TestListActions');

var _TestListActions2 = _interopRequireDefault(_TestListActions);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TestList = (function (_React$Component) {
    _inherits(TestList, _React$Component);

    function TestList(props) {
        _classCallCheck(this, TestList);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(TestList).call(this, props));

        _this.state = _TestListStore2.default.getState();
        _this.onChange = _this.onChange.bind(_this);
        return _this;
    }

    _createClass(TestList, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            _TestListStore2.default.listen(this.onChange);
            _TestListActions2.default.getAllTests();
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            _TestListStore2.default.unlisten(this.onChange);
        }
    }, {
        key: 'onChange',
        value: function onChange(state) {
            this.setState(state);
        }
    }, {
        key: 'render',
        value: function render() {
            var tests = this.state.tests.map(function (t) {
                return _react2.default.createElement(
                    'div',
                    { key: t.testIdentifier, className: 'list-group-item animated fadeIn' },
                    _react2.default.createElement(
                        'h4',
                        { className: 'list-group-item-heading' },
                        _react2.default.createElement(
                            'strong',
                            null,
                            t.testIdentifier
                        )
                    ),
                    _react2.default.createElement(
                        'p',
                        { className: 'list-group-item-text' },
                        'Length: ',
                        _react2.default.createElement(
                            'strong',
                            null,
                            t.questionIds.length + (t.questionIds.length == 1 ? ' question' : ' questions')
                        )
                    ),
                    _react2.default.createElement('br', null),
                    _react2.default.createElement(
                        'div',
                        { className: 'btn-group btn-group-justified', role: 'group', 'aria-label': '...' },
                        _react2.default.createElement(
                            _reactRouter.Link,
                            { to: '/tests/' + t.testIdentifier, className: 'btn btn-warning', role: 'button' },
                            _react2.default.createElement('i', { className: 'glyphicon glyphicon-edit' }),
                            ' Edit'
                        ),
                        _react2.default.createElement(
                            _reactRouter.Link,
                            { to: '/students/' + t.testIdentifier, className: 'btn btn-info', role: 'button' },
                            _react2.default.createElement('i', { className: 'glyphicon glyphicon-exclamation-sign' }),
                            ' Attempt'
                        ),
                        _react2.default.createElement(
                            _reactRouter.Link,
                            { to: '/preview/' + t.testIdentifier, className: 'btn btn-primary', role: 'button' },
                            _react2.default.createElement('i', { className: 'glyphicon glyphicon-eye-open' }),
                            ' Preview'
                        )
                    )
                );
            });
            return _react2.default.createElement(
                'div',
                { className: 'container' },
                _react2.default.createElement(
                    'div',
                    { className: 'row' },
                    _react2.default.createElement(
                        'div',
                        { className: 'col-sm-6' },
                        _react2.default.createElement(
                            'div',
                            { className: 'list-group' },
                            tests
                        )
                    )
                )
            );
        }
    }]);

    return TestList;
})(_react2.default.Component);

exports.default = TestList;

},{"../actions/TestListActions":5,"../stores/TestListStore":24,"react":"react","react-router":"react-router"}],19:[function(require,module,exports){
'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouter = require('react-router');

var _reactRouter2 = _interopRequireDefault(_reactRouter);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _createBrowserHistory = require('history/lib/createBrowserHistory');

var _createBrowserHistory2 = _interopRequireDefault(_createBrowserHistory);

var _routes = require('./routes');

var _routes2 = _interopRequireDefault(_routes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var history = (0, _createBrowserHistory2.default)();

_reactDom2.default.render(_react2.default.createElement(
  _reactRouter2.default,
  { history: history },
  _routes2.default
), document.getElementById('app'));

},{"./routes":20,"history/lib/createBrowserHistory":34,"react":"react","react-dom":"react-dom","react-router":"react-router"}],20:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouter = require('react-router');

var _App = require('./components/App');

var _App2 = _interopRequireDefault(_App);

var _Home = require('./components/Home');

var _Home2 = _interopRequireDefault(_Home);

var _AddTest = require('./components/AddTest');

var _AddTest2 = _interopRequireDefault(_AddTest);

var _Test = require('./components/Test');

var _Test2 = _interopRequireDefault(_Test);

var _PreviewTest = require('./components/PreviewTest');

var _PreviewTest2 = _interopRequireDefault(_PreviewTest);

var _StudentTest = require('./components/StudentTest');

var _StudentTest2 = _interopRequireDefault(_StudentTest);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _react2.default.createElement(
  _reactRouter.Route,
  { component: _App2.default },
  _react2.default.createElement(_reactRouter.Route, { path: '/', component: _Home2.default }),
  _react2.default.createElement(_reactRouter.Route, { path: '/addTest', component: _AddTest2.default }),
  _react2.default.createElement(_reactRouter.Route, { path: '/tests/:id', component: _Test2.default }),
  _react2.default.createElement(_reactRouter.Route, { path: '/preview/:id', component: _PreviewTest2.default }),
  _react2.default.createElement(_reactRouter.Route, { path: '/students/:id', component: _StudentTest2.default })
);

},{"./components/AddTest":7,"./components/App":8,"./components/Home":9,"./components/PreviewTest":12,"./components/StudentTest":16,"./components/Test":17,"react":"react","react-router":"react-router"}],21:[function(require,module,exports){
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _alt = require('../alt');

var _alt2 = _interopRequireDefault(_alt);

var _AddTestActions = require('../actions/AddTestActions');

var _AddTestActions2 = _interopRequireDefault(_AddTestActions);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var AddTestStore = (function () {
    function AddTestStore() {
        _classCallCheck(this, AddTestStore);

        this.bindActions(_AddTestActions2.default);
        this.questions = [];
        this.testIdentifierState = '';
        this.testIdentifierHelpBlock = '';
        this.questionsState = '';
        this.questionsHelpBlock = '';
        this.filter = '';
    }

    _createClass(AddTestStore, [{
        key: 'onGetAllQuestionsSuccess',
        value: function onGetAllQuestionsSuccess(data) {
            this.questions = data.map(function (q) {
                q.selected = false;
                return q;
            });
        }
    }, {
        key: 'onGetAllQuestionsFail',
        value: function onGetAllQuestionsFail(jqXhr) {
            toastr.error(jqXhr.responseJSON && jqXhr.responseJSON.message || jqXhr.responseText || jqXhr.statusText);
        }
    }, {
        key: 'onToggleQuestionSelected',
        value: function onToggleQuestionSelected(id) {
            var found = false;
            var i = 0;
            while (!found && i < this.questions.length) {
                if (this.questions[i].id == id) {
                    found = true;
                    this.questions[i].selected = !this.questions[i].selected;
                }
                i++;
            }

            this.questionsState = '';
            this.questionsHelpBlock = '';
        }
    }, {
        key: 'onUpdateIdentifier',
        value: function onUpdateIdentifier(event) {
            this.testIdentifier = event.target.value;

            this.testIdentifierState = '';
            this.testIdentifierHelpBlock = '';
        }
    }, {
        key: 'onAddTestSuccess',
        value: function onAddTestSuccess(message) {
            toastr.success(message, 'Success!', { timeOut: 5000 });
        }
    }, {
        key: 'onAddTestFail',
        value: function onAddTestFail(message) {
            toastr.error(message);
        }
    }, {
        key: 'onInvalidTestIdentifier',
        value: function onInvalidTestIdentifier() {
            this.testIdentifierState = 'has-error';
            this.testIdentifierHelpBlock = 'Please make sure to enter a test identifier which conforms to the pattern of \'XXXXX-YYYY-MM-DD\'.';
        }
    }, {
        key: 'onInvalidNumberOfQuestions',
        value: function onInvalidNumberOfQuestions() {
            this.questionsState = 'has-error';
            this.questionsHelpBlock = 'Every test must include at least one question.';
        }
    }, {
        key: 'onUpdateFilter',
        value: function onUpdateFilter(event) {
            this.filter = event.target.value;
        }
    }]);

    return AddTestStore;
})();

exports.default = _alt2.default.createStore(AddTestStore);

},{"../actions/AddTestActions":1,"../alt":6}],22:[function(require,module,exports){
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _alt = require('../alt');

var _alt2 = _interopRequireDefault(_alt);

var _PreviewTestActions = require('../actions/PreviewTestActions');

var _PreviewTestActions2 = _interopRequireDefault(_PreviewTestActions);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var PreviewTestStore = (function () {
    function PreviewTestStore() {
        _classCallCheck(this, PreviewTestStore);

        this.bindActions(_PreviewTestActions2.default);
        this.questions = [];
    }

    _createClass(PreviewTestStore, [{
        key: 'onGetTestFail',
        value: function onGetTestFail(message) {
            toastr.error(message);
        }
    }, {
        key: 'onGetQuestionsSuccess',
        value: function onGetQuestionsSuccess(data) {
            this.questions = data;
        }
    }, {
        key: 'onGetQuestionsFail',
        value: function onGetQuestionsFail(jqXhr) {
            toastr.error(jqXhr.responseJSON && jqXhr.responseJSON.message || jqXhr.responseText || jqXhr.statusText);
        }
    }]);

    return PreviewTestStore;
})();

exports.default = _alt2.default.createStore(PreviewTestStore);

},{"../actions/PreviewTestActions":2,"../alt":6}],23:[function(require,module,exports){
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _alt = require('../alt');

var _alt2 = _interopRequireDefault(_alt);

var _StudentTestActions = require('../actions/StudentTestActions');

var _StudentTestActions2 = _interopRequireDefault(_StudentTestActions);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var StudentTestStore = (function () {
    function StudentTestStore() {
        _classCallCheck(this, StudentTestStore);

        this.bindActions(_StudentTestActions2.default);
        this.questions = [];
        this.submitted = false;
        this.submitHelpBlock = '';
        this.submitHelpBlockState = '';
    }

    _createClass(StudentTestStore, [{
        key: 'onGetTestSuccess',
        value: function onGetTestSuccess() {
            this.submitted = false;
            this.submitHelpBlock = '';
            this.submitHelpBlockState = '';
        }
    }, {
        key: 'onGetTestFail',
        value: function onGetTestFail(message) {
            toastr.error(message);
        }
    }, {
        key: 'onGetQuestionsSuccess',
        value: function onGetQuestionsSuccess(data) {
            // Set all answers as not selected
            this.questions = data.map(function (q) {
                q.answers = q.answers.map(function (a) {
                    a.selected = false;
                    return a;
                });
                return q;
            });
        }
    }, {
        key: 'onGetQuestionsFail',
        value: function onGetQuestionsFail(jqXhr) {
            toastr.error(jqXhr.responseJSON && jqXhr.responseJSON.message || jqXhr.responseText || jqXhr.statusText);
        }
    }, {
        key: 'onUpdateQuestionAnswer',
        value: function onUpdateQuestionAnswer(indexes) {
            // cannot change answers once they have been submitted
            if (this.submitted) {
                return;
            }

            this.submitHelpBlock = '';
            this.submitHelpBlockState = '';

            var questionIndex = indexes.questionIndex;
            var answerIndex = indexes.answerIndex;
            var question = this.questions[questionIndex];
            var correctAnswers = question.answers.reduce(function (count, a) {
                return count + (a.correct ? 1 : 0);
            }, 0);
            if (correctAnswers > 1) {
                // Toggle answer selection for clicked answer index
                this.questions[questionIndex].answers[answerIndex].selected = !this.questions[questionIndex].answers[answerIndex].selected;
            } else {
                // Set selected answer index as the only selected one for this question
                this.questions[questionIndex].answers = question.answers.map(function (a, index) {
                    a.selected = index == answerIndex;
                    return a;
                });
            }
        }
    }, {
        key: 'onSubmitTest',
        value: function onSubmitTest() {
            var allQuestionsHaveAnswers = this.questions.reduce(function (answered, q) {
                return answered && q.answers.reduce(function (answered, a) {
                    return answered || a.selected;
                }, false);
            }, true);
            if (allQuestionsHaveAnswers) {
                this.submitted = true;
            } else {
                this.submitHelpBlockState = 'has-error';
                this.submitHelpBlock = 'You must select an answer for every question before submitting.';
            }
        }
    }]);

    return StudentTestStore;
})();

exports.default = _alt2.default.createStore(StudentTestStore);

},{"../actions/StudentTestActions":3,"../alt":6}],24:[function(require,module,exports){
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _alt = require('../alt');

var _alt2 = _interopRequireDefault(_alt);

var _TestListActions = require('../actions/TestListActions');

var _TestListActions2 = _interopRequireDefault(_TestListActions);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var TestListStore = (function () {
    function TestListStore() {
        _classCallCheck(this, TestListStore);

        this.bindActions(_TestListActions2.default);
        this.tests = [];
    }

    _createClass(TestListStore, [{
        key: 'onGetAllTestsSuccess',
        value: function onGetAllTestsSuccess(data) {
            this.tests = data;
        }
    }, {
        key: 'onGetAllTestsFail',
        value: function onGetAllTestsFail(jqXhr) {
            toastr.error(jqXhr.responseJSON && jqXhr.responseJSON.message || jqXhr.responseText || jqXhr.statusText);
        }
    }]);

    return TestListStore;
})();

exports.default = _alt2.default.createStore(TestListStore);

},{"../actions/TestListActions":5,"../alt":6}],25:[function(require,module,exports){
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _alt = require('../alt');

var _alt2 = _interopRequireDefault(_alt);

var _TestActions = require('../actions/TestActions');

var _TestActions2 = _interopRequireDefault(_TestActions);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var TestStore = (function () {
    function TestStore() {
        _classCallCheck(this, TestStore);

        this.bindActions(_TestActions2.default);
        this.testIdentifier = '';
        this.questionIds = [];
        this.questions = [];
        this.questionsState = '';
        this.questionsHelpBlock = '';
        this.filter = '';
    }

    _createClass(TestStore, [{
        key: 'onGetTestSuccess',
        value: function onGetTestSuccess(data) {
            this.testIdentifier = data.testIdentifier;
            this.questionIds = data.questionIds;
            this.questionsState = '';
            this.questionsHelpBlock = '';
        }
    }, {
        key: 'onGetTestFail',
        value: function onGetTestFail(message) {
            toastr.error(message);
            this.testIdentifier = '';
            this.questionIds = [];
            this.questionsState = '';
            this.questionsHelpBlock = '';
        }
    }, {
        key: 'onGetAllQuestionsSuccess',
        value: function onGetAllQuestionsSuccess(data) {
            var _this = this;

            this.questions = data.map(function (q) {
                q.selected = _this.questionIds.indexOf(q.id) !== -1;
                return q;
            });
        }
    }, {
        key: 'onGetAllQuestionsFail',
        value: function onGetAllQuestionsFail(jqXhr) {
            toastr.error(jqXhr.responseJSON && jqXhr.responseJSON.message || jqXhr.responseText || jqXhr.statusText);
        }
    }, {
        key: 'onToggleQuestionSelected',
        value: function onToggleQuestionSelected(id) {
            var found = false;
            var i = 0;
            while (!found && i < this.questions.length) {
                if (this.questions[i].id == id) {
                    found = true;
                    this.questions[i].selected = !this.questions[i].selected;
                }
                i++;
            }

            this.questionsState = '';
            this.questionsHelpBlock = '';
        }
    }, {
        key: 'onUpdateTestSuccess',
        value: function onUpdateTestSuccess(message) {
            this.questionsState = 'has-success';
            this.questionsHelpBlock = '';
            toastr.success(message);
        }
    }, {
        key: 'onUpdateTestFail',
        value: function onUpdateTestFail(message) {
            toastr.error(message);
        }
    }, {
        key: 'onInvalidNumberOfQuestions',
        value: function onInvalidNumberOfQuestions() {
            this.questionsState = 'has-error';
            this.questionsHelpBlock = 'Every test must include at least one question.';
        }
    }, {
        key: 'onUpdateFilter',
        value: function onUpdateFilter(event) {
            this.filter = event.target.value;
        }
    }]);

    return TestStore;
})();

exports.default = _alt2.default.createStore(TestStore);

},{"../actions/TestActions":4,"../alt":6}],26:[function(require,module,exports){
var pSlice = Array.prototype.slice;
var objectKeys = require('./lib/keys.js');
var isArguments = require('./lib/is_arguments.js');

var deepEqual = module.exports = function (actual, expected, opts) {
  if (!opts) opts = {};
  // 7.1. All identical values are equivalent, as determined by ===.
  if (actual === expected) {
    return true;

  } else if (actual instanceof Date && expected instanceof Date) {
    return actual.getTime() === expected.getTime();

  // 7.3. Other pairs that do not both pass typeof value == 'object',
  // equivalence is determined by ==.
  } else if (!actual || !expected || typeof actual != 'object' && typeof expected != 'object') {
    return opts.strict ? actual === expected : actual == expected;

  // 7.4. For all other Object pairs, including Array objects, equivalence is
  // determined by having the same number of owned properties (as verified
  // with Object.prototype.hasOwnProperty.call), the same set of keys
  // (although not necessarily the same order), equivalent values for every
  // corresponding key, and an identical 'prototype' property. Note: this
  // accounts for both named and indexed properties on Arrays.
  } else {
    return objEquiv(actual, expected, opts);
  }
}

function isUndefinedOrNull(value) {
  return value === null || value === undefined;
}

function isBuffer (x) {
  if (!x || typeof x !== 'object' || typeof x.length !== 'number') return false;
  if (typeof x.copy !== 'function' || typeof x.slice !== 'function') {
    return false;
  }
  if (x.length > 0 && typeof x[0] !== 'number') return false;
  return true;
}

function objEquiv(a, b, opts) {
  var i, key;
  if (isUndefinedOrNull(a) || isUndefinedOrNull(b))
    return false;
  // an identical 'prototype' property.
  if (a.prototype !== b.prototype) return false;
  //~~~I've managed to break Object.keys through screwy arguments passing.
  //   Converting to array solves the problem.
  if (isArguments(a)) {
    if (!isArguments(b)) {
      return false;
    }
    a = pSlice.call(a);
    b = pSlice.call(b);
    return deepEqual(a, b, opts);
  }
  if (isBuffer(a)) {
    if (!isBuffer(b)) {
      return false;
    }
    if (a.length !== b.length) return false;
    for (i = 0; i < a.length; i++) {
      if (a[i] !== b[i]) return false;
    }
    return true;
  }
  try {
    var ka = objectKeys(a),
        kb = objectKeys(b);
  } catch (e) {//happens when one is a string literal and the other isn't
    return false;
  }
  // having the same number of owned properties (keys incorporates
  // hasOwnProperty)
  if (ka.length != kb.length)
    return false;
  //the same set of keys (although not necessarily the same order),
  ka.sort();
  kb.sort();
  //~~~cheap key test
  for (i = ka.length - 1; i >= 0; i--) {
    if (ka[i] != kb[i])
      return false;
  }
  //equivalent values for every corresponding key, and
  //~~~possibly expensive deep test
  for (i = ka.length - 1; i >= 0; i--) {
    key = ka[i];
    if (!deepEqual(a[key], b[key], opts)) return false;
  }
  return typeof a === typeof b;
}

},{"./lib/is_arguments.js":27,"./lib/keys.js":28}],27:[function(require,module,exports){
var supportsArgumentsClass = (function(){
  return Object.prototype.toString.call(arguments)
})() == '[object Arguments]';

exports = module.exports = supportsArgumentsClass ? supported : unsupported;

exports.supported = supported;
function supported(object) {
  return Object.prototype.toString.call(object) == '[object Arguments]';
};

exports.unsupported = unsupported;
function unsupported(object){
  return object &&
    typeof object == 'object' &&
    typeof object.length == 'number' &&
    Object.prototype.hasOwnProperty.call(object, 'callee') &&
    !Object.prototype.propertyIsEnumerable.call(object, 'callee') ||
    false;
};

},{}],28:[function(require,module,exports){
exports = module.exports = typeof Object.keys === 'function'
  ? Object.keys : shim;

exports.shim = shim;
function shim (obj) {
  var keys = [];
  for (var key in obj) keys.push(key);
  return keys;
}

},{}],29:[function(require,module,exports){
/**
 * Indicates that navigation was caused by a call to history.push.
 */
'use strict';

exports.__esModule = true;
var PUSH = 'PUSH';

exports.PUSH = PUSH;
/**
 * Indicates that navigation was caused by a call to history.replace.
 */
var REPLACE = 'REPLACE';

exports.REPLACE = REPLACE;
/**
 * Indicates that navigation was caused by some other action such
 * as using a browser's back/forward buttons and/or manually manipulating
 * the URL in a browser's location bar. This is the default.
 *
 * See https://developer.mozilla.org/en-US/docs/Web/API/WindowEventHandlers/onpopstate
 * for more information.
 */
var POP = 'POP';

exports.POP = POP;
exports['default'] = {
  PUSH: PUSH,
  REPLACE: REPLACE,
  POP: POP
};
},{}],30:[function(require,module,exports){
"use strict";

exports.__esModule = true;
exports.loopAsync = loopAsync;

function loopAsync(turns, work, callback) {
  var currentTurn = 0;
  var isDone = false;

  function done() {
    isDone = true;
    callback.apply(this, arguments);
  }

  function next() {
    if (isDone) return;

    if (currentTurn < turns) {
      work.call(this, currentTurn++, next, done);
    } else {
      done.apply(this, arguments);
    }
  }

  next();
}
},{}],31:[function(require,module,exports){
(function (process){
/*eslint-disable no-empty */
'use strict';

exports.__esModule = true;
exports.saveState = saveState;
exports.readState = readState;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _warning = require('warning');

var _warning2 = _interopRequireDefault(_warning);

var KeyPrefix = '@@History/';
var QuotaExceededError = 'QuotaExceededError';
var SecurityError = 'SecurityError';

function createKey(key) {
  return KeyPrefix + key;
}

function saveState(key, state) {
  try {
    window.sessionStorage.setItem(createKey(key), JSON.stringify(state));
  } catch (error) {
    if (error.name === SecurityError) {
      // Blocking cookies in Chrome/Firefox/Safari throws SecurityError on any
      // attempt to access window.sessionStorage.
      process.env.NODE_ENV !== 'production' ? _warning2['default'](false, '[history] Unable to save state; sessionStorage is not available due to security settings') : undefined;

      return;
    }

    if (error.name === QuotaExceededError && window.sessionStorage.length === 0) {
      // Safari "private mode" throws QuotaExceededError.
      process.env.NODE_ENV !== 'production' ? _warning2['default'](false, '[history] Unable to save state; sessionStorage is not available in Safari private mode') : undefined;

      return;
    }

    throw error;
  }
}

function readState(key) {
  var json = undefined;
  try {
    json = window.sessionStorage.getItem(createKey(key));
  } catch (error) {
    if (error.name === SecurityError) {
      // Blocking cookies in Chrome/Firefox/Safari throws SecurityError on any
      // attempt to access window.sessionStorage.
      process.env.NODE_ENV !== 'production' ? _warning2['default'](false, '[history] Unable to read state; sessionStorage is not available due to security settings') : undefined;

      return null;
    }
  }

  if (json) {
    try {
      return JSON.parse(json);
    } catch (error) {
      // Ignore invalid JSON.
    }
  }

  return null;
}
}).call(this,require('_process'))
},{"_process":43,"warning":44}],32:[function(require,module,exports){
'use strict';

exports.__esModule = true;
exports.addEventListener = addEventListener;
exports.removeEventListener = removeEventListener;
exports.getHashPath = getHashPath;
exports.replaceHashPath = replaceHashPath;
exports.getWindowPath = getWindowPath;
exports.go = go;
exports.getUserConfirmation = getUserConfirmation;
exports.supportsHistory = supportsHistory;
exports.supportsGoWithoutReloadUsingHash = supportsGoWithoutReloadUsingHash;

function addEventListener(node, event, listener) {
  if (node.addEventListener) {
    node.addEventListener(event, listener, false);
  } else {
    node.attachEvent('on' + event, listener);
  }
}

function removeEventListener(node, event, listener) {
  if (node.removeEventListener) {
    node.removeEventListener(event, listener, false);
  } else {
    node.detachEvent('on' + event, listener);
  }
}

function getHashPath() {
  // We can't use window.location.hash here because it's not
  // consistent across browsers - Firefox will pre-decode it!
  return window.location.href.split('#')[1] || '';
}

function replaceHashPath(path) {
  window.location.replace(window.location.pathname + window.location.search + '#' + path);
}

function getWindowPath() {
  return window.location.pathname + window.location.search + window.location.hash;
}

function go(n) {
  if (n) window.history.go(n);
}

function getUserConfirmation(message, callback) {
  callback(window.confirm(message));
}

/**
 * Returns true if the HTML5 history API is supported. Taken from modernizr.
 *
 * https://github.com/Modernizr/Modernizr/blob/master/LICENSE
 * https://github.com/Modernizr/Modernizr/blob/master/feature-detects/history.js
 * changed to avoid false negatives for Windows Phones: https://github.com/rackt/react-router/issues/586
 */

function supportsHistory() {
  var ua = navigator.userAgent;
  if ((ua.indexOf('Android 2.') !== -1 || ua.indexOf('Android 4.0') !== -1) && ua.indexOf('Mobile Safari') !== -1 && ua.indexOf('Chrome') === -1 && ua.indexOf('Windows Phone') === -1) {
    return false;
  }
  return window.history && 'pushState' in window.history;
}

/**
 * Returns false if using go(n) with hash history causes a full page reload.
 */

function supportsGoWithoutReloadUsingHash() {
  var ua = navigator.userAgent;
  return ua.indexOf('Firefox') === -1;
}
},{}],33:[function(require,module,exports){
'use strict';

exports.__esModule = true;
var canUseDOM = !!(typeof window !== 'undefined' && window.document && window.document.createElement);
exports.canUseDOM = canUseDOM;
},{}],34:[function(require,module,exports){
(function (process){
'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _invariant = require('invariant');

var _invariant2 = _interopRequireDefault(_invariant);

var _Actions = require('./Actions');

var _ExecutionEnvironment = require('./ExecutionEnvironment');

var _DOMUtils = require('./DOMUtils');

var _DOMStateStorage = require('./DOMStateStorage');

var _createDOMHistory = require('./createDOMHistory');

var _createDOMHistory2 = _interopRequireDefault(_createDOMHistory);

/**
 * Creates and returns a history object that uses HTML5's history API
 * (pushState, replaceState, and the popstate event) to manage history.
 * This is the recommended method of managing history in browsers because
 * it provides the cleanest URLs.
 *
 * Note: In browsers that do not support the HTML5 history API full
 * page reloads will be used to preserve URLs.
 */
function createBrowserHistory() {
  var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

  !_ExecutionEnvironment.canUseDOM ? process.env.NODE_ENV !== 'production' ? _invariant2['default'](false, 'Browser history needs a DOM') : _invariant2['default'](false) : undefined;

  var forceRefresh = options.forceRefresh;

  var isSupported = _DOMUtils.supportsHistory();
  var useRefresh = !isSupported || forceRefresh;

  function getCurrentLocation(historyState) {
    historyState = historyState || window.history.state || {};

    var path = _DOMUtils.getWindowPath();
    var _historyState = historyState;
    var key = _historyState.key;

    var state = undefined;
    if (key) {
      state = _DOMStateStorage.readState(key);
    } else {
      state = null;
      key = history.createKey();

      if (isSupported) window.history.replaceState(_extends({}, historyState, { key: key }), null, path);
    }

    return history.createLocation(path, state, undefined, key);
  }

  function startPopStateListener(_ref) {
    var transitionTo = _ref.transitionTo;

    function popStateListener(event) {
      if (event.state === undefined) return; // Ignore extraneous popstate events in WebKit.

      transitionTo(getCurrentLocation(event.state));
    }

    _DOMUtils.addEventListener(window, 'popstate', popStateListener);

    return function () {
      _DOMUtils.removeEventListener(window, 'popstate', popStateListener);
    };
  }

  function finishTransition(location) {
    var basename = location.basename;
    var pathname = location.pathname;
    var search = location.search;
    var hash = location.hash;
    var state = location.state;
    var action = location.action;
    var key = location.key;

    if (action === _Actions.POP) return; // Nothing to do.

    _DOMStateStorage.saveState(key, state);

    var path = (basename || '') + pathname + search + hash;
    var historyState = {
      key: key
    };

    if (action === _Actions.PUSH) {
      if (useRefresh) {
        window.location.href = path;
        return false; // Prevent location update.
      } else {
          window.history.pushState(historyState, null, path);
        }
    } else {
      // REPLACE
      if (useRefresh) {
        window.location.replace(path);
        return false; // Prevent location update.
      } else {
          window.history.replaceState(historyState, null, path);
        }
    }
  }

  var history = _createDOMHistory2['default'](_extends({}, options, {
    getCurrentLocation: getCurrentLocation,
    finishTransition: finishTransition,
    saveState: _DOMStateStorage.saveState
  }));

  var listenerCount = 0,
      stopPopStateListener = undefined;

  function listenBefore(listener) {
    if (++listenerCount === 1) stopPopStateListener = startPopStateListener(history);

    var unlisten = history.listenBefore(listener);

    return function () {
      unlisten();

      if (--listenerCount === 0) stopPopStateListener();
    };
  }

  function listen(listener) {
    if (++listenerCount === 1) stopPopStateListener = startPopStateListener(history);

    var unlisten = history.listen(listener);

    return function () {
      unlisten();

      if (--listenerCount === 0) stopPopStateListener();
    };
  }

  // deprecated
  function registerTransitionHook(hook) {
    if (++listenerCount === 1) stopPopStateListener = startPopStateListener(history);

    history.registerTransitionHook(hook);
  }

  // deprecated
  function unregisterTransitionHook(hook) {
    history.unregisterTransitionHook(hook);

    if (--listenerCount === 0) stopPopStateListener();
  }

  return _extends({}, history, {
    listenBefore: listenBefore,
    listen: listen,
    registerTransitionHook: registerTransitionHook,
    unregisterTransitionHook: unregisterTransitionHook
  });
}

exports['default'] = createBrowserHistory;
module.exports = exports['default'];
}).call(this,require('_process'))
},{"./Actions":29,"./DOMStateStorage":31,"./DOMUtils":32,"./ExecutionEnvironment":33,"./createDOMHistory":35,"_process":43,"invariant":42}],35:[function(require,module,exports){
(function (process){
'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _invariant = require('invariant');

var _invariant2 = _interopRequireDefault(_invariant);

var _ExecutionEnvironment = require('./ExecutionEnvironment');

var _DOMUtils = require('./DOMUtils');

var _createHistory = require('./createHistory');

var _createHistory2 = _interopRequireDefault(_createHistory);

function createDOMHistory(options) {
  var history = _createHistory2['default'](_extends({
    getUserConfirmation: _DOMUtils.getUserConfirmation
  }, options, {
    go: _DOMUtils.go
  }));

  function listen(listener) {
    !_ExecutionEnvironment.canUseDOM ? process.env.NODE_ENV !== 'production' ? _invariant2['default'](false, 'DOM history needs a DOM') : _invariant2['default'](false) : undefined;

    return history.listen(listener);
  }

  return _extends({}, history, {
    listen: listen
  });
}

exports['default'] = createDOMHistory;
module.exports = exports['default'];
}).call(this,require('_process'))
},{"./DOMUtils":32,"./ExecutionEnvironment":33,"./createHistory":36,"_process":43,"invariant":42}],36:[function(require,module,exports){
'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _deepEqual = require('deep-equal');

var _deepEqual2 = _interopRequireDefault(_deepEqual);

var _AsyncUtils = require('./AsyncUtils');

var _Actions = require('./Actions');

var _createLocation2 = require('./createLocation');

var _createLocation3 = _interopRequireDefault(_createLocation2);

var _runTransitionHook = require('./runTransitionHook');

var _runTransitionHook2 = _interopRequireDefault(_runTransitionHook);

var _deprecate = require('./deprecate');

var _deprecate2 = _interopRequireDefault(_deprecate);

function createRandomKey(length) {
  return Math.random().toString(36).substr(2, length);
}

function locationsAreEqual(a, b) {
  return a.pathname === b.pathname && a.search === b.search &&
  //a.action === b.action && // Different action !== location change.
  a.key === b.key && _deepEqual2['default'](a.state, b.state);
}

var DefaultKeyLength = 6;

function createHistory() {
  var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
  var getCurrentLocation = options.getCurrentLocation;
  var finishTransition = options.finishTransition;
  var saveState = options.saveState;
  var go = options.go;
  var keyLength = options.keyLength;
  var getUserConfirmation = options.getUserConfirmation;

  if (typeof keyLength !== 'number') keyLength = DefaultKeyLength;

  var transitionHooks = [];

  function listenBefore(hook) {
    transitionHooks.push(hook);

    return function () {
      transitionHooks = transitionHooks.filter(function (item) {
        return item !== hook;
      });
    };
  }

  var allKeys = [];
  var changeListeners = [];
  var location = undefined;

  function getCurrent() {
    if (pendingLocation && pendingLocation.action === _Actions.POP) {
      return allKeys.indexOf(pendingLocation.key);
    } else if (location) {
      return allKeys.indexOf(location.key);
    } else {
      return -1;
    }
  }

  function updateLocation(newLocation) {
    var current = getCurrent();

    location = newLocation;

    if (location.action === _Actions.PUSH) {
      allKeys = [].concat(allKeys.slice(0, current + 1), [location.key]);
    } else if (location.action === _Actions.REPLACE) {
      allKeys[current] = location.key;
    }

    changeListeners.forEach(function (listener) {
      listener(location);
    });
  }

  function listen(listener) {
    changeListeners.push(listener);

    if (location) {
      listener(location);
    } else {
      var _location = getCurrentLocation();
      allKeys = [_location.key];
      updateLocation(_location);
    }

    return function () {
      changeListeners = changeListeners.filter(function (item) {
        return item !== listener;
      });
    };
  }

  function confirmTransitionTo(location, callback) {
    _AsyncUtils.loopAsync(transitionHooks.length, function (index, next, done) {
      _runTransitionHook2['default'](transitionHooks[index], location, function (result) {
        if (result != null) {
          done(result);
        } else {
          next();
        }
      });
    }, function (message) {
      if (getUserConfirmation && typeof message === 'string') {
        getUserConfirmation(message, function (ok) {
          callback(ok !== false);
        });
      } else {
        callback(message !== false);
      }
    });
  }

  var pendingLocation = undefined;

  function transitionTo(nextLocation) {
    if (location && locationsAreEqual(location, nextLocation)) return; // Nothing to do.

    pendingLocation = nextLocation;

    confirmTransitionTo(nextLocation, function (ok) {
      if (pendingLocation !== nextLocation) return; // Transition was interrupted.

      if (ok) {
        // treat PUSH to current path like REPLACE to be consistent with browsers
        if (nextLocation.action === _Actions.PUSH) {
          var _getCurrentLocation = getCurrentLocation();

          var pathname = _getCurrentLocation.pathname;
          var search = _getCurrentLocation.search;

          var currentPath = pathname + search;
          var path = nextLocation.pathname + nextLocation.search;

          if (currentPath === path) nextLocation.action = _Actions.REPLACE;
        }

        if (finishTransition(nextLocation) !== false) updateLocation(nextLocation);
      } else if (location && nextLocation.action === _Actions.POP) {
        var prevIndex = allKeys.indexOf(location.key);
        var nextIndex = allKeys.indexOf(nextLocation.key);

        if (prevIndex !== -1 && nextIndex !== -1) go(prevIndex - nextIndex); // Restore the URL.
      }
    });
  }

  function pushState(state, path) {
    transitionTo(createLocation(path, state, _Actions.PUSH, createKey()));
  }

  function push(path) {
    pushState(null, path);
  }

  function replaceState(state, path) {
    transitionTo(createLocation(path, state, _Actions.REPLACE, createKey()));
  }

  function replace(path) {
    replaceState(null, path);
  }

  function goBack() {
    go(-1);
  }

  function goForward() {
    go(1);
  }

  function createKey() {
    return createRandomKey(keyLength);
  }

  function createPath(path) {
    if (path == null || typeof path === 'string') return path;

    var pathname = path.pathname;
    var search = path.search;
    var hash = path.hash;

    var result = pathname;

    if (search) result += search;

    if (hash) result += hash;

    return result;
  }

  function createHref(path) {
    return createPath(path);
  }

  function createLocation(path, state, action) {
    var key = arguments.length <= 3 || arguments[3] === undefined ? createKey() : arguments[3];

    return _createLocation3['default'](path, state, action, key);
  }

  // deprecated
  function setState(state) {
    if (location) {
      updateLocationState(location, state);
      updateLocation(location);
    } else {
      updateLocationState(getCurrentLocation(), state);
    }
  }

  function updateLocationState(location, state) {
    location.state = _extends({}, location.state, state);
    saveState(location.key, location.state);
  }

  // deprecated
  function registerTransitionHook(hook) {
    if (transitionHooks.indexOf(hook) === -1) transitionHooks.push(hook);
  }

  // deprecated
  function unregisterTransitionHook(hook) {
    transitionHooks = transitionHooks.filter(function (item) {
      return item !== hook;
    });
  }

  return {
    listenBefore: listenBefore,
    listen: listen,
    transitionTo: transitionTo,
    pushState: pushState,
    replaceState: replaceState,
    push: push,
    replace: replace,
    go: go,
    goBack: goBack,
    goForward: goForward,
    createKey: createKey,
    createPath: createPath,
    createHref: createHref,
    createLocation: createLocation,

    setState: _deprecate2['default'](setState, 'setState is deprecated; use location.key to save state instead'),
    registerTransitionHook: _deprecate2['default'](registerTransitionHook, 'registerTransitionHook is deprecated; use listenBefore instead'),
    unregisterTransitionHook: _deprecate2['default'](unregisterTransitionHook, 'unregisterTransitionHook is deprecated; use the callback returned from listenBefore instead')
  };
}

exports['default'] = createHistory;
module.exports = exports['default'];
},{"./Actions":29,"./AsyncUtils":30,"./createLocation":37,"./deprecate":38,"./runTransitionHook":41,"deep-equal":26}],37:[function(require,module,exports){
'use strict';

exports.__esModule = true;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _Actions = require('./Actions');

var _parsePath = require('./parsePath');

var _parsePath2 = _interopRequireDefault(_parsePath);

function createLocation() {
  var path = arguments.length <= 0 || arguments[0] === undefined ? '/' : arguments[0];
  var state = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];
  var action = arguments.length <= 2 || arguments[2] === undefined ? _Actions.POP : arguments[2];
  var key = arguments.length <= 3 || arguments[3] === undefined ? null : arguments[3];

  if (typeof path === 'string') path = _parsePath2['default'](path);

  var pathname = path.pathname || '/';
  var search = path.search || '';
  var hash = path.hash || '';

  return {
    pathname: pathname,
    search: search,
    hash: hash,
    state: state,
    action: action,
    key: key
  };
}

exports['default'] = createLocation;
module.exports = exports['default'];
},{"./Actions":29,"./parsePath":40}],38:[function(require,module,exports){
(function (process){
'use strict';

exports.__esModule = true;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _warning = require('warning');

var _warning2 = _interopRequireDefault(_warning);

function deprecate(fn, message) {
  return function () {
    process.env.NODE_ENV !== 'production' ? _warning2['default'](false, '[history] ' + message) : undefined;
    return fn.apply(this, arguments);
  };
}

exports['default'] = deprecate;
module.exports = exports['default'];
}).call(this,require('_process'))
},{"_process":43,"warning":44}],39:[function(require,module,exports){
"use strict";

exports.__esModule = true;
function extractPath(string) {
  var match = string.match(/^https?:\/\/[^\/]*/);

  if (match == null) return string;

  return string.substring(match[0].length);
}

exports["default"] = extractPath;
module.exports = exports["default"];
},{}],40:[function(require,module,exports){
(function (process){
'use strict';

exports.__esModule = true;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _warning = require('warning');

var _warning2 = _interopRequireDefault(_warning);

var _extractPath = require('./extractPath');

var _extractPath2 = _interopRequireDefault(_extractPath);

function parsePath(path) {
  var pathname = _extractPath2['default'](path);
  var search = '';
  var hash = '';

  process.env.NODE_ENV !== 'production' ? _warning2['default'](path === pathname, 'A path must be pathname + search + hash only, not a fully qualified URL like "%s"', path) : undefined;

  var hashIndex = pathname.indexOf('#');
  if (hashIndex !== -1) {
    hash = pathname.substring(hashIndex);
    pathname = pathname.substring(0, hashIndex);
  }

  var searchIndex = pathname.indexOf('?');
  if (searchIndex !== -1) {
    search = pathname.substring(searchIndex);
    pathname = pathname.substring(0, searchIndex);
  }

  if (pathname === '') pathname = '/';

  return {
    pathname: pathname,
    search: search,
    hash: hash
  };
}

exports['default'] = parsePath;
module.exports = exports['default'];
}).call(this,require('_process'))
},{"./extractPath":39,"_process":43,"warning":44}],41:[function(require,module,exports){
(function (process){
'use strict';

exports.__esModule = true;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _warning = require('warning');

var _warning2 = _interopRequireDefault(_warning);

function runTransitionHook(hook, location, callback) {
  var result = hook(location, callback);

  if (hook.length < 2) {
    // Assume the hook runs synchronously and automatically
    // call the callback with the return value.
    callback(result);
  } else {
    process.env.NODE_ENV !== 'production' ? _warning2['default'](result === undefined, 'You should not "return" in a transition hook with a callback argument; call the callback instead') : undefined;
  }
}

exports['default'] = runTransitionHook;
module.exports = exports['default'];
}).call(this,require('_process'))
},{"_process":43,"warning":44}],42:[function(require,module,exports){
(function (process){
/**
 * Copyright 2013-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

'use strict';

/**
 * Use invariant() to assert state which your program assumes to be true.
 *
 * Provide sprintf-style format (only %s is supported) and arguments
 * to provide information about what broke and what you were
 * expecting.
 *
 * The invariant message will be stripped in production, but the invariant
 * will remain to ensure logic does not differ in production.
 */

var invariant = function(condition, format, a, b, c, d, e, f) {
  if (process.env.NODE_ENV !== 'production') {
    if (format === undefined) {
      throw new Error('invariant requires an error message argument');
    }
  }

  if (!condition) {
    var error;
    if (format === undefined) {
      error = new Error(
        'Minified exception occurred; use the non-minified dev environment ' +
        'for the full error message and additional helpful warnings.'
      );
    } else {
      var args = [a, b, c, d, e, f];
      var argIndex = 0;
      error = new Error(
        format.replace(/%s/g, function() { return args[argIndex++]; })
      );
      error.name = 'Invariant Violation';
    }

    error.framesToPop = 1; // we don't care about invariant's own frame
    throw error;
  }
};

module.exports = invariant;

}).call(this,require('_process'))
},{"_process":43}],43:[function(require,module,exports){
// shim for using process in browser

var process = module.exports = {};
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = setTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    clearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        setTimeout(drainQueue, 0);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };

},{}],44:[function(require,module,exports){
(function (process){
/**
 * Copyright 2014-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

'use strict';

/**
 * Similar to invariant but only logs a warning if the condition is not met.
 * This can be used to log issues in development environments in critical
 * paths. Removing the logging code for production environments will keep the
 * same logic and follow the same code paths.
 */

var warning = function() {};

if (process.env.NODE_ENV !== 'production') {
  warning = function(condition, format, args) {
    var len = arguments.length;
    args = new Array(len > 2 ? len - 2 : 0);
    for (var key = 2; key < len; key++) {
      args[key - 2] = arguments[key];
    }
    if (format === undefined) {
      throw new Error(
        '`warning(condition, format, ...args)` requires a warning ' +
        'message argument'
      );
    }

    if (format.length < 10 || (/^[s\W]*$/).test(format)) {
      throw new Error(
        'The warning format should be able to uniquely identify this ' +
        'warning. Please, use a more descriptive format than: ' + format
      );
    }

    if (!condition) {
      var argIndex = 0;
      var message = 'Warning: ' +
        format.replace(/%s/g, function() {
          return args[argIndex++];
        });
      if (typeof console !== 'undefined') {
        console.error(message);
      }
      try {
        // This error was thrown as a convenience so that you can use this stack
        // to find the callsite that caused this warning to fire.
        throw new Error(message);
      } catch(x) {}
    }
  };
}

module.exports = warning;

}).call(this,require('_process'))
},{"_process":43}]},{},[19]);
