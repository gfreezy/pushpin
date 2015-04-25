module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
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
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "./";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };
  
  /*
   * React.js Starter Kit
   * Copyright (c) 2014 Konstantin Tarkus (@koistya), KriaSoft LLC.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.txt file in the root directory of this source tree.
   */
  
  var _import = __webpack_require__(26);
  
  var _import2 = _interopRequireWildcard(_import);
  
  var _fs = __webpack_require__(24);
  
  var _fs2 = _interopRequireWildcard(_fs);
  
  var _path = __webpack_require__(27);
  
  var _path2 = _interopRequireWildcard(_path);
  
  var _express = __webpack_require__(21);
  
  var _express2 = _interopRequireWildcard(_express);
  
  var _React = __webpack_require__(1);
  
  var _React2 = _interopRequireWildcard(_React);
  
  var _Dispatcher = __webpack_require__(3);
  
  var _Dispatcher2 = _interopRequireWildcard(_Dispatcher);
  
  var _ActionTypes = __webpack_require__(2);
  
  var _ActionTypes2 = _interopRequireWildcard(_ActionTypes);
  
  var _AppStore = __webpack_require__(6);
  
  var _AppStore2 = _interopRequireWildcard(_AppStore);
  
  var server = _express2['default']();
  
  server.set('port', process.env.PORT || 5000);
  server.use(_express2['default']['static'](_path2['default'].join(__dirname)));
  
  //
  // Page API
  // -----------------------------------------------------------------------------
  server.get('/api/page/*', function (req, res) {
    var urlPath = req.path.substr(9);
    var page = _AppStore2['default'].getPage(urlPath);
    res.send(page);
  });
  
  //
  // Server-side rendering
  // -----------------------------------------------------------------------------
  
  // The top-level React component + HTML template for it
  var App = _React2['default'].createFactory(__webpack_require__(12));
  var templateFile = _path2['default'].join(__dirname, 'templates/index.html');
  var template = _import2['default'].template(_fs2['default'].readFileSync(templateFile, 'utf8'));
  
  server.get('*', function (req, res) {
    var data = { description: '' };
    var app = new App({
      path: req.path,
      onSetTitle: function onSetTitle(title) {
        data.title = title;
      },
      onSetMeta: function onSetMeta(name, content) {
        data[name] = content;
      },
      onPageNotFound: function onPageNotFound() {
        res.status(404);
      }
    });
    data.body = _React2['default'].renderToString(app);
    var html = template(data);
    res.send(html);
  });
  
  // Load pages from the `/src/content/` folder into the AppStore
  (function () {
    var assign = __webpack_require__(4);
    var fm = __webpack_require__(23);
    var jade = __webpack_require__(25);
    var sourceDir = _path2['default'].join(__dirname, './content');
    var getFiles = (function (_getFiles) {
      function getFiles(_x) {
        return _getFiles.apply(this, arguments);
      }
  
      getFiles.toString = function () {
        return _getFiles.toString();
      };
  
      return getFiles;
    })(function (dir) {
      var pages = [];
      _fs2['default'].readdirSync(dir).forEach(function (file) {
        var stat = _fs2['default'].statSync(_path2['default'].join(dir, file));
        if (stat && stat.isDirectory()) {
          pages = pages.concat(getFiles(file));
        } else {
          // Convert the file to a Page object
          var filename = _path2['default'].join(dir, file);
          var url = filename.substr(sourceDir.length, filename.length - sourceDir.length - 5).replace('\\', '/');
          if (url.indexOf('/index', url.length - 6) !== -1) {
            url = url.substr(0, url.length - (url.length > 6 ? 6 : 5));
          }
          var source = _fs2['default'].readFileSync(filename, 'utf8');
          var content = fm(source);
          var html = jade.render(content.body, null, '  ');
          var page = assign({}, { path: url, body: html }, content.attributes);
          _Dispatcher2['default'].handleServerAction({
            actionType: _ActionTypes2['default'].LOAD_PAGE,
            path: url,
            page: page
          });
        }
      });
      return pages;
    });
    return getFiles(sourceDir);
  })();
  
  server.listen(server.get('port'), function () {
    if (process.send) {
      process.send('online');
    } else {
      console.log('The server is running at http://localhost:' + server.get('port'));
    }
  });

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

  module.exports = require("react");

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };
  
  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  /*
   * React.js Starter Kit
   * Copyright (c) 2014 Konstantin Tarkus (@koistya), KriaSoft LLC.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.txt file in the root directory of this source tree.
   */
  
  var _keyMirror = __webpack_require__(10);
  
  var _keyMirror2 = _interopRequireWildcard(_keyMirror);
  
  exports['default'] = _keyMirror2['default']({
  
    LOAD_PAGE: null,
    LOAD_PAGE_SUCCESS: null,
    LOAD_PAGE_ERROR: null,
    CHANGE_LOCATION: null
  
  });
  module.exports = exports['default'];

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };
  
  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  /*
   * React.js Starter Kit
   * Copyright (c) 2014 Konstantin Tarkus (@koistya), KriaSoft LLC.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.txt file in the root directory of this source tree.
   */
  
  var _Flux = __webpack_require__(22);
  
  var _Flux2 = _interopRequireWildcard(_Flux);
  
  var _PayloadSources = __webpack_require__(5);
  
  var _PayloadSources2 = _interopRequireWildcard(_PayloadSources);
  
  var _assign = __webpack_require__(4);
  
  var _assign2 = _interopRequireWildcard(_assign);
  
  /**
   * A singleton that operates as the central hub for application updates.
   * For more information visit https://facebook.github.io/flux/
   */
  var Dispatcher = _assign2['default'](new _Flux2['default'].Dispatcher(), {
  
    /**
     * @param {object} action The details of the action, including the action's
     * type and additional data coming from the server.
     */
    handleServerAction: function handleServerAction(action) {
      var payload = {
        source: _PayloadSources2['default'].SERVER_ACTION,
        action: action
      };
      this.dispatch(payload);
    },
  
    /**
     * @param {object} action The details of the action, including the action's
     * type and additional data coming from the view.
     */
    handleViewAction: function handleViewAction(action) {
      var payload = {
        source: _PayloadSources2['default'].VIEW_ACTION,
        action: action
      };
      this.dispatch(payload);
    }
  
  });
  
  exports['default'] = Dispatcher;
  module.exports = exports['default'];

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

  /**
   * Copyright 2014-2015, Facebook, Inc.
   * All rights reserved.
   *
   * This source code is licensed under the BSD-style license found in the
   * LICENSE file in the root directory of this source tree. An additional grant
   * of patent rights can be found in the PATENTS file in the same directory.
   *
   * @providesModule Object.assign
   */
  
  // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-object.assign
  
  'use strict';
  
  function assign(target, sources) {
    if (target == null) {
      throw new TypeError('Object.assign target cannot be null or undefined');
    }
  
    var to = Object(target);
    var hasOwnProperty = Object.prototype.hasOwnProperty;
  
    for (var nextIndex = 1; nextIndex < arguments.length; nextIndex++) {
      var nextSource = arguments[nextIndex];
      if (nextSource == null) {
        continue;
      }
  
      var from = Object(nextSource);
  
      // We don't currently support accessors nor proxies. Therefore this
      // copy cannot throw. If we ever supported this then we must handle
      // exceptions and side-effects. We don't support symbols so they won't
      // be transferred.
  
      for (var key in from) {
        if (hasOwnProperty.call(from, key)) {
          to[key] = from[key];
        }
      }
    }
  
    return to;
  }
  
  module.exports = assign;


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };
  
  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  /*
   * React.js Starter Kit
   * Copyright (c) 2014 Konstantin Tarkus (@koistya), KriaSoft LLC.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.txt file in the root directory of this source tree.
   */
  
  var _keyMirror = __webpack_require__(10);
  
  var _keyMirror2 = _interopRequireWildcard(_keyMirror);
  
  exports['default'] = _keyMirror2['default']({
  
    VIEW_ACTION: null,
    SERVER_ACTION: null
  
  });
  module.exports = exports['default'];

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };
  
  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  /*
   * React.js Starter Kit
   * Copyright (c) 2014 Konstantin Tarkus (@koistya), KriaSoft LLC.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.txt file in the root directory of this source tree.
   */
  
  var _Dispatcher = __webpack_require__(3);
  
  var _Dispatcher2 = _interopRequireWildcard(_Dispatcher);
  
  var _ActionTypes = __webpack_require__(2);
  
  var _ActionTypes2 = _interopRequireWildcard(_ActionTypes);
  
  var _PayloadSources = __webpack_require__(5);
  
  var _PayloadSources2 = _interopRequireWildcard(_PayloadSources);
  
  var _EventEmitter = __webpack_require__(20);
  
  var _EventEmitter2 = _interopRequireWildcard(_EventEmitter);
  
  var _assign = __webpack_require__(4);
  
  var _assign2 = _interopRequireWildcard(_assign);
  
  var CHANGE_EVENT = 'change';
  
  var pages = {};
  var loading = false;
  
  if (true) {
    pages['/'] = { title: 'Home Page' };
    pages['/privacy'] = { title: 'Privacy Policy' };
  }
  
  var AppStore = _assign2['default']({}, _EventEmitter2['default'].prototype, {
  
    isLoading: function isLoading() {
      return loading;
    },
  
    /**
     * Gets page data by the given URL path.
     *
     * @param {String} path URL path.
     * @returns {*} Page data.
     */
    getPage: function getPage(path) {
      return path in pages ? pages[path] : {
        title: 'Page Not Found',
        type: 'notfound'
      };
    },
  
    /**
     * Emits change event to all registered event listeners.
     *
     * @returns {Boolean} Indication if we've emitted an event.
     */
    emitChange: function emitChange() {
      return this.emit(CHANGE_EVENT);
    },
  
    /**
     * Register a new change event listener.
     *
     * @param {function} callback Callback function.
     */
    onChange: function onChange(callback) {
      this.on(CHANGE_EVENT, callback);
    },
  
    /**
     * Remove change event listener.
     *
     * @param {function} callback Callback function.
     */
    off: function off(callback) {
      this.off(CHANGE_EVENT, callback);
    }
  
  });
  
  AppStore.dispatcherToken = _Dispatcher2['default'].register(function (payload) {
    var action = payload.action;
  
    switch (action.actionType) {
  
      case _ActionTypes2['default'].LOAD_PAGE:
        if (action.source === _PayloadSources2['default'].VIEW_ACTION) {
          loading = true;
        } else {
          loading = false;
          if (!action.err) {
            pages[action.path] = action.page;
          }
        }
        AppStore.emitChange();
        break;
  
      default:
      // Do nothing
  
    }
  });
  
  exports['default'] = AppStore;
  module.exports = exports['default'];

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

  /*
  	MIT License http://www.opensource.org/licenses/mit-license.php
  	Author Tobias Koppers @sokra
  */
  // css base code, injected by the css-loader
  module.exports = function() {
  	var list = [];
  
  	// return the list of modules as css string
  	list.toString = function toString() {
  		var result = [];
  		for(var i = 0; i < this.length; i++) {
  			var item = this[i];
  			if(item[2]) {
  				result.push("@media " + item[2] + "{" + item[1] + "}");
  			} else {
  				result.push(item[1]);
  			}
  		}
  		return result.join("");
  	};
  
  	// import a list of modules into the list
  	list.i = function(modules, mediaQuery) {
  		if(typeof modules === "string")
  			modules = [[null, modules, ""]];
  		var alreadyImportedModules = {};
  		for(var i = 0; i < this.length; i++) {
  			var id = this[i][0];
  			if(typeof id === "number")
  				alreadyImportedModules[id] = true;
  		}
  		for(i = 0; i < modules.length; i++) {
  			var item = modules[i];
  			// skip already imported module
  			// this implementation is not 100% perfect for weird media query combinations
  			//  when a module is imported multiple times with different media queries.
  			//  I hope this will never occur (Hey this way we have smaller bundles)
  			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
  				if(mediaQuery && !item[2]) {
  					item[2] = mediaQuery;
  				} else if(mediaQuery) {
  					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
  				}
  				list.push(item);
  			}
  		}
  	};
  	return list;
  };


/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

  /**
   * Copyright 2013-2015, Facebook, Inc.
   * All rights reserved.
   *
   * This source code is licensed under the BSD-style license found in the
   * LICENSE file in the root directory of this source tree. An additional grant
   * of patent rights can be found in the PATENTS file in the same directory.
   *
   * @providesModule ExecutionEnvironment
   */
  
  /*jslint evil: true */
  
  "use strict";
  
  var canUseDOM = !!(
    (typeof window !== 'undefined' &&
    window.document && window.document.createElement)
  );
  
  /**
   * Simple, lightweight module assisting with the detection and context of
   * Worker. Helps avoid circular dependencies and allows code to reason about
   * whether or not they are in a Worker, even if they never include the main
   * `ReactWorker` dependency.
   */
  var ExecutionEnvironment = {
  
    canUseDOM: canUseDOM,
  
    canUseWorkers: typeof Worker !== 'undefined',
  
    canUseEventListeners:
      canUseDOM && !!(window.addEventListener || window.attachEvent),
  
    canUseViewport: canUseDOM && !!window.screen,
  
    isInWorker: !canUseDOM // For now, this is true - might change in the future.
  
  };
  
  module.exports = ExecutionEnvironment;


/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

  /**
   * Copyright 2013-2015, Facebook, Inc.
   * All rights reserved.
   *
   * This source code is licensed under the BSD-style license found in the
   * LICENSE file in the root directory of this source tree. An additional grant
   * of patent rights can be found in the PATENTS file in the same directory.
   *
   * @providesModule invariant
   */
  
  "use strict";
  
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
    if (true) {
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
          'Invariant Violation: ' +
          format.replace(/%s/g, function() { return args[argIndex++]; })
        );
      }
  
      error.framesToPop = 1; // we don't care about invariant's own frame
      throw error;
    }
  };
  
  module.exports = invariant;


/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

  /**
   * Copyright 2013-2015, Facebook, Inc.
   * All rights reserved.
   *
   * This source code is licensed under the BSD-style license found in the
   * LICENSE file in the root directory of this source tree. An additional grant
   * of patent rights can be found in the PATENTS file in the same directory.
   *
   * @providesModule keyMirror
   * @typechecks static-only
   */
  
  'use strict';
  
  var invariant = __webpack_require__(9);
  
  /**
   * Constructs an enumeration with keys equal to their value.
   *
   * For example:
   *
   *   var COLORS = keyMirror({blue: null, red: null});
   *   var myColor = COLORS.blue;
   *   var isColorValid = !!COLORS[myColor];
   *
   * The last line could not be performed if the values of the generated enum were
   * not equal to their keys.
   *
   *   Input:  {key1: val1, key2: val2}
   *   Output: {key1: key1, key2: key2}
   *
   * @param {object} obj
   * @return {object}
   */
  var keyMirror = function(obj) {
    var ret = {};
    var key;
    (true ? invariant(
      obj instanceof Object && !Array.isArray(obj),
      'keyMirror(...): Argument must be an object.'
    ) : invariant(obj instanceof Object && !Array.isArray(obj)));
    for (key in obj) {
      if (!obj.hasOwnProperty(key)) {
        continue;
      }
      ret[key] = key;
    }
    return ret;
  };
  
  module.exports = keyMirror;


/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };
  
  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  /*
   * React.js Starter Kit
   * Copyright (c) 2014 Konstantin Tarkus (@koistya), KriaSoft LLC.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.txt file in the root directory of this source tree.
   */
  
  var _Dispatcher = __webpack_require__(3);
  
  var _Dispatcher2 = _interopRequireWildcard(_Dispatcher);
  
  var _ActionTypes = __webpack_require__(2);
  
  var _ActionTypes2 = _interopRequireWildcard(_ActionTypes);
  
  var _ExecutionEnvironment = __webpack_require__(8);
  
  var _ExecutionEnvironment2 = _interopRequireWildcard(_ExecutionEnvironment);
  
  var _http = __webpack_require__(28);
  
  var _http2 = _interopRequireWildcard(_http);
  
  exports['default'] = {
  
    navigateTo: function navigateTo(path, options) {
      if (_ExecutionEnvironment2['default'].canUseDOM) {
        if (options && options.replace) {
          window.history.replaceState({}, document.title, path);
        } else {
          window.history.pushState({}, document.title, path);
        }
      }
  
      _Dispatcher2['default'].handleViewAction({
        actionType: _ActionTypes2['default'].CHANGE_LOCATION,
        path: path
      });
    },
  
    loadPage: function loadPage(path, cb) {
      _Dispatcher2['default'].handleViewAction({
        actionType: _ActionTypes2['default'].LOAD_PAGE,
        path: path
      });
  
      _http2['default'].get('/api/page' + path).accept('application/json').end(function (err, res) {
        _Dispatcher2['default'].handleServerAction({
          actionType: _ActionTypes2['default'].LOAD_PAGE,
          path: path,
          err: err,
          page: res.body
        });
        if (cb) {
          cb();
        }
      });
    }
  
  };
  module.exports = exports['default'];

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };
  
  var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } };
  
  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
  
  var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
  
  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  /*
   * React.js Starter Kit
   * Copyright (c) 2014 Konstantin Tarkus (@koistya), KriaSoft LLC.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.txt file in the root directory of this source tree.
   */
  
  __webpack_require__(17);
  
  var _React$PropTypes = __webpack_require__(1);
  
  var _React$PropTypes2 = _interopRequireWildcard(_React$PropTypes);
  
  var _invariant = __webpack_require__(9);
  
  var _invariant2 = _interopRequireWildcard(_invariant);
  
  var _AppActions = __webpack_require__(11);
  
  var _AppActions2 = _interopRequireWildcard(_AppActions);
  
  var _AppStore = __webpack_require__(6);
  
  var _AppStore2 = _interopRequireWildcard(_AppStore);
  
  var _Navbar = __webpack_require__(15);
  
  var _Navbar2 = _interopRequireWildcard(_Navbar);
  
  var _ContentPage = __webpack_require__(14);
  
  var _ContentPage2 = _interopRequireWildcard(_ContentPage);
  
  var _NotFoundPage = __webpack_require__(16);
  
  var _NotFoundPage2 = _interopRequireWildcard(_NotFoundPage);
  
  var _setViewport = __webpack_require__(13);
  
  var _setViewport2 = _interopRequireWildcard(_setViewport);
  
  var App = (function () {
    function App() {
      _classCallCheck(this, App);
    }
  
    _createClass(App, [{
      key: 'componentDidMount',
      value: function componentDidMount() {
        window.addEventListener('popstate', this.handlePopState);
        window.addEventListener('click', this.handleClick);
      }
    }, {
      key: 'componentWillUnmount',
      value: function componentWillUnmount() {
        window.removeEventListener('popstate', this.handlePopState);
        window.removeEventListener('click', this.handleClick);
      }
    }, {
      key: 'shouldComponentUpdate',
      value: function shouldComponentUpdate(nextProps) {
        return this.props.path !== nextProps.path || this.props.viewport !== nextProps.viewport;
      }
    }, {
      key: 'render',
      value: function render() {
        var page = _AppStore2['default'].getPage(this.props.path);
        _invariant2['default'](page !== undefined, 'Failed to load page content.');
        this.props.onSetTitle(page.title);
  
        if (page.type === 'notfound') {
          this.props.onPageNotFound();
          return _React$PropTypes2['default'].createElement(_NotFoundPage2['default'], page);
        }
  
        return _React$PropTypes2['default'].createElement(
          'div',
          { className: 'App' },
          _React$PropTypes2['default'].createElement(_Navbar2['default'], null),
          this.props.path === '/' ? _React$PropTypes2['default'].createElement(
            'div',
            { className: 'jumbotron' },
            _React$PropTypes2['default'].createElement(
              'div',
              { className: 'container text-center' },
              _React$PropTypes2['default'].createElement(
                'h1',
                null,
                'React'
              ),
              _React$PropTypes2['default'].createElement(
                'p',
                null,
                'Complex web apps made easy'
              )
            )
          ) : _React$PropTypes2['default'].createElement(
            'div',
            { className: 'container' },
            _React$PropTypes2['default'].createElement(
              'h2',
              null,
              page.title
            )
          ),
          _React$PropTypes2['default'].createElement(_ContentPage2['default'], _extends({ className: 'container' }, page)),
          _React$PropTypes2['default'].createElement(
            'div',
            { className: 'navbar-footer' },
            _React$PropTypes2['default'].createElement(
              'div',
              { className: 'container' },
              _React$PropTypes2['default'].createElement(
                'p',
                { className: 'text-muted' },
                _React$PropTypes2['default'].createElement(
                  'span',
                  null,
                  '© Your Company'
                ),
                _React$PropTypes2['default'].createElement(
                  'span',
                  null,
                  _React$PropTypes2['default'].createElement(
                    'a',
                    { href: '/' },
                    'Home'
                  )
                ),
                _React$PropTypes2['default'].createElement(
                  'span',
                  null,
                  _React$PropTypes2['default'].createElement(
                    'a',
                    { href: '/privacy' },
                    'Privacy'
                  )
                ),
                _React$PropTypes2['default'].createElement(
                  'span',
                  null,
                  'Viewport: ' + this.props.viewport.width + 'x' + this.props.viewport.height
                )
              )
            )
          )
        );
      }
    }, {
      key: 'handlePopState',
      value: function handlePopState(event) {
        _AppActions2['default'].navigateTo(window.location.pathname, { replace: !!event.state });
      }
    }, {
      key: 'handleClick',
      value: function handleClick(event) {
        if (event.button === 1 || event.metaKey || event.ctrlKey || event.shiftKey || event.defaultPrevented) {
          return;
        }
  
        // Ensure link
        var el = event.target;
        while (el && el.nodeName !== 'A') {
          el = el.parentNode;
        }
        if (!el || el.nodeName !== 'A') {
          return;
        }
  
        // Ignore if tag has
        // 1. "download" attribute
        // 2. rel="external" attribute
        if (el.getAttribute('download') || el.getAttribute('rel') === 'external') {
          return;
        }
  
        // Ensure non-hash for the same path
        var link = el.getAttribute('href');
        if (el.pathname === location.pathname && (el.hash || link === '#')) {
          return;
        }
  
        // Check for mailto: in the href
        if (link && link.indexOf('mailto:') > -1) {
          return;
        }
  
        // Check target
        if (el.target) {
          return;
        }
  
        // X-origin
        var origin = window.location.protocol + '//' + window.location.hostname + (window.location.port ? ':' + window.location.port : '');
        if (!(el.href && el.href.indexOf(origin) === 0)) {
          return;
        }
  
        // Rebuild path
        var path = el.pathname + el.search + (el.hash || '');
  
        event.preventDefault();
        _AppActions2['default'].loadPage(path, function () {
          _AppActions2['default'].navigateTo(path);
        });
      }
    }], [{
      key: 'propTypes',
      value: {
        path: _React$PropTypes.PropTypes.string.isRequired,
        viewport: _React$PropTypes.PropTypes.object.isRequired,
        onSetTitle: _React$PropTypes.PropTypes.func.isRequired,
        onSetMeta: _React$PropTypes.PropTypes.func.isRequired,
        onPageNotFound: _React$PropTypes.PropTypes.func.isRequired
      },
      enumerable: true
    }]);
  
    return App;
  })();
  
  exports['default'] = _setViewport2['default'](App);
  module.exports = exports['default'];

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };
  
  var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } };
  
  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
  
  var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };
  
  var _inherits = function (subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };
  
  var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
  
  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  /*
   * React.js Starter Kit
   * Copyright (c) 2014 Konstantin Tarkus (@koistya), KriaSoft LLC.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.txt file in the root directory of this source tree.
   */
  
  var _React$Component = __webpack_require__(1);
  
  var _React$Component2 = _interopRequireWildcard(_React$Component);
  
  // eslint-disable-line no-unused-vars
  
  var _canUseDOM = __webpack_require__(8);
  
  function setViewport(ComposedComponent) {
    return (function (_Component) {
      function AppViewport() {
        var _this = this;
  
        _classCallCheck(this, AppViewport);
  
        _get(Object.getPrototypeOf(AppViewport.prototype), 'constructor', this).call(this);
  
        this.state = {
          viewport: _canUseDOM.canUseDOM ? { width: window.innerWidth, height: window.innerHeight } : { width: 1366, height: 768 } // Default size for server-side rendering
        };
  
        this.handleResize = function () {
          var viewport = { width: window.innerWidth, height: window.innerHeight };
          if (_this.state.viewport.width !== viewport.width || _this.state.viewport.height !== viewport.height) {
            _this.setState({ viewport: viewport });
          }
        };
      }
  
      _inherits(AppViewport, _Component);
  
      _createClass(AppViewport, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
          window.addEventListener('resize', this.handleResize);
          window.addEventListener('orientationchange', this.handleResize);
        }
      }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
          window.removeEventListener('resize', this.handleResize);
          window.removeEventListener('orientationchange', this.handleResize);
        }
      }, {
        key: 'render',
        value: function render() {
          return _React$Component2['default'].createElement(ComposedComponent, _extends({}, this.props, { viewport: this.state.viewport }));
        }
      }]);
  
      return AppViewport;
    })(_React$Component.Component);
  }
  
  exports['default'] = setViewport;
  module.exports = exports['default'];

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };
  
  var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } };
  
  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
  
  var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
  
  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  /*
   * React.js Starter Kit
   * Copyright (c) 2014 Konstantin Tarkus (@koistya), KriaSoft LLC.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.txt file in the root directory of this source tree.
   */
  
  __webpack_require__(18);
  
  var _React$PropTypes = __webpack_require__(1);
  
  var _React$PropTypes2 = _interopRequireWildcard(_React$PropTypes);
  
  // eslint-disable-line no-unused-vars
  
  var ContentPage = (function () {
    function ContentPage() {
      _classCallCheck(this, ContentPage);
    }
  
    _createClass(ContentPage, [{
      key: 'render',
      value: function render() {
        var _props = this.props;
        var className = _props.className;
        var body = _props.body;
        var other = _props.other;
  
        return _React$PropTypes2['default'].createElement('div', _extends({ className: 'ContentPage ' + className,
          dangerouslySetInnerHTML: { __html: body } }, other));
      }
    }], [{
      key: 'propTypes',
      value: {
        body: _React$PropTypes.PropTypes.string.isRequired
      },
      enumerable: true
    }]);
  
    return ContentPage;
  })();
  
  exports['default'] = ContentPage;
  module.exports = exports['default'];

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

  "use strict";
  
  var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { "default": obj }; };
  
  var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };
  
  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  /*
   * React.js Starter Kit
   * Copyright (c) 2014 Konstantin Tarkus (@koistya), KriaSoft LLC.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.txt file in the root directory of this source tree.
   */
  
  var _React = __webpack_require__(1);
  
  var _React2 = _interopRequireWildcard(_React);
  
  // eslint-disable-line no-unused-vars
  
  var Navbar = (function () {
    function Navbar() {
      _classCallCheck(this, Navbar);
    }
  
    _createClass(Navbar, [{
      key: "render",
      value: function render() {
        return _React2["default"].createElement(
          "div",
          { className: "navbar-top", role: "navigation" },
          _React2["default"].createElement(
            "div",
            { className: "container" },
            _React2["default"].createElement(
              "a",
              { className: "navbar-brand row", href: "/" },
              _React2["default"].createElement("img", { src: __webpack_require__(19), width: "38", height: "38", alt: "React" }),
              _React2["default"].createElement(
                "span",
                null,
                "React.js Starter Kit"
              )
            )
          )
        );
      }
    }]);
  
    return Navbar;
  })();
  
  exports["default"] = Navbar;
  module.exports = exports["default"];

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };
  
  var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } };
  
  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
  
  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  /*
   * React.js Starter Kit
   * Copyright (c) 2014 Konstantin Tarkus (@koistya), KriaSoft LLC.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.txt file in the root directory of this source tree.
   */
  
  //import './NotFoundPage.less';
  
  var _React = __webpack_require__(1);
  
  var _React2 = _interopRequireWildcard(_React);
  
  // eslint-disable-line no-unused-vars
  
  var NotFoundPage = (function () {
    function NotFoundPage() {
      _classCallCheck(this, NotFoundPage);
    }
  
    _createClass(NotFoundPage, [{
      key: 'render',
      value: function render() {
        return _React2['default'].createElement(
          'div',
          null,
          _React2['default'].createElement(
            'h1',
            null,
            'Page Not Found'
          ),
          _React2['default'].createElement(
            'p',
            null,
            'Sorry, but the page you were trying to view does not exist.'
          )
        );
      }
    }]);
  
    return NotFoundPage;
  })();
  
  exports['default'] = NotFoundPage;
  module.exports = exports['default'];

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

  exports = module.exports = __webpack_require__(7)();
  exports.push([module.id, "/*\n * React.js Starter Kit\n * Copyright (c) 2014 Konstantin Tarkus (@koistya), KriaSoft LLC.\n *\n * This source code is licensed under the MIT license found in the\n * LICENSE.txt file in the root directory of this source tree.\n */\n", ""]);

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

  exports = module.exports = __webpack_require__(7)();
  exports.push([module.id, "/*\n * React.js Starter Kit\n * Copyright (c) 2014 Konstantin Tarkus (@koistya), KriaSoft LLC.\n *\n * This source code is licensed under the MIT license found in the\n * LICENSE.txt file in the root directory of this source tree.\n */\n", ""]);

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

  module.exports = "data:image/png;base64,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"

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

  module.exports = require("eventemitter3");

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

  module.exports = require("express");

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

  module.exports = require("flux");

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

  module.exports = require("front-matter");

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

  module.exports = require("fs");

/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

  module.exports = require("jade");

/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

  module.exports = require("lodash");

/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

  module.exports = require("path");

/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

  module.exports = require("superagent");

/***/ }
/******/ ]);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgYTM3YTFhMDI4YjlhMDY2Nzc4MGUiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NlcnZlci5qcyIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJyZWFjdFwiIiwid2VicGFjazovLy8uL3NyYy9jb25zdGFudHMvQWN0aW9uVHlwZXMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvcmUvRGlzcGF0Y2hlci5qcyIsIndlYnBhY2s6Ly8vLi9+L3JlYWN0L2xpYi9PYmplY3QuYXNzaWduLmpzIiwid2VicGFjazovLy8uL3NyYy9jb25zdGFudHMvUGF5bG9hZFNvdXJjZXMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3N0b3Jlcy9BcHBTdG9yZS5qcyIsIndlYnBhY2s6Ly8vLi9+L2Nzcy1sb2FkZXIvbGliL2Nzcy1iYXNlLmpzIiwid2VicGFjazovLy8uL34vcmVhY3QvbGliL0V4ZWN1dGlvbkVudmlyb25tZW50LmpzIiwid2VicGFjazovLy8uL34vcmVhY3QvbGliL2ludmFyaWFudC5qcyIsIndlYnBhY2s6Ly8vLi9+L3JlYWN0L2xpYi9rZXlNaXJyb3IuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2FjdGlvbnMvQXBwQWN0aW9ucy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9BcHAvQXBwLmpzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL0FwcC9zZXRWaWV3cG9ydC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9Db250ZW50UGFnZS9Db250ZW50UGFnZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9OYXZiYXIvTmF2YmFyLmpzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL05vdEZvdW5kUGFnZS9Ob3RGb3VuZFBhZ2UuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvQXBwL0FwcC5sZXNzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL0NvbnRlbnRQYWdlL0NvbnRlbnRQYWdlLmxlc3MiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvTmF2YmFyL2xvZ28tc21hbGwucG5nIiwid2VicGFjazovLy9leHRlcm5hbCBcImV2ZW50ZW1pdHRlcjNcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJleHByZXNzXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiZmx1eFwiIiwid2VicGFjazovLy9leHRlcm5hbCBcImZyb250LW1hdHRlclwiIiwid2VicGFjazovLy9leHRlcm5hbCBcImZzXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiamFkZVwiIiwid2VicGFjazovLy9leHRlcm5hbCBcImxvZGFzaFwiIiwid2VicGFjazovLy9leHRlcm5hbCBcInBhdGhcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJzdXBlcmFnZW50XCIiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx1QkFBZTtBQUNmO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O29DQzlCYyxFQUFROzs7O2dDQUNQLEVBQUk7Ozs7a0NBQ0YsRUFBTTs7OztxQ0FDSCxFQUFTOzs7O21DQUNYLENBQU87Ozs7d0NBQ0YsQ0FBbUI7Ozs7eUNBQ2xCLENBQXlCOzs7O3NDQUM1QixDQUFtQjs7OztBQUV4QyxNQUFJLE1BQU0sR0FBRyxzQkFBUyxDQUFDOztBQUV2QixRQUFNLENBQUMsR0FBRyxDQUFDLE1BQU0sRUFBRyxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksSUFBSSxJQUFJLENBQUUsQ0FBQztBQUMvQyxRQUFNLENBQUMsR0FBRyxDQUFDLDhCQUFjLENBQUMsa0JBQUssSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQzs7Ozs7QUFLakQsUUFB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Qzs7Ozs7O0FDQUEsbUM7Ozs7OztBQ0FBLDJDOzs7Ozs7QUNBQSxpQzs7Ozs7O0FDQUEsbUM7Ozs7OztBQ0FBLHFDOzs7Ozs7QUNBQSxtQzs7Ozs7O0FDQUEseUMiLCJmaWxlIjoic2VydmVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pXG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG5cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGV4cG9ydHM6IHt9LFxuIFx0XHRcdGlkOiBtb2R1bGVJZCxcbiBcdFx0XHRsb2FkZWQ6IGZhbHNlXG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmxvYWRlZCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiLi9cIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXygwKTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIHdlYnBhY2svYm9vdHN0cmFwIGEzN2ExYTAyOGI5YTA2Njc3ODBlXG4gKiovIiwiLypcbiAqIFJlYWN0LmpzIFN0YXJ0ZXIgS2l0XG4gKiBDb3B5cmlnaHQgKGMpIDIwMTQgS29uc3RhbnRpbiBUYXJrdXMgKEBrb2lzdHlhKSwgS3JpYVNvZnQgTExDLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRS50eHQgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiAqL1xuXG5pbXBvcnQgXyBmcm9tICdsb2Rhc2gnO1xuaW1wb3J0IGZzIGZyb20gJ2ZzJztcbmltcG9ydCBwYXRoIGZyb20gJ3BhdGgnO1xuaW1wb3J0IGV4cHJlc3MgZnJvbSAnZXhwcmVzcyc7XG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IERpc3BhdGNoZXIgZnJvbSAnLi9jb3JlL0Rpc3BhdGNoZXInO1xuaW1wb3J0IEFjdGlvblR5cGVzIGZyb20gJy4vY29uc3RhbnRzL0FjdGlvblR5cGVzJztcbmltcG9ydCBBcHBTdG9yZSBmcm9tICcuL3N0b3Jlcy9BcHBTdG9yZSc7XG5cbnZhciBzZXJ2ZXIgPSBleHByZXNzKCk7XG5cbnNlcnZlci5zZXQoJ3BvcnQnLCAocHJvY2Vzcy5lbnYuUE9SVCB8fCA1MDAwKSk7XG5zZXJ2ZXIudXNlKGV4cHJlc3Muc3RhdGljKHBhdGguam9pbihfX2Rpcm5hbWUpKSk7XG5cbi8vXG4vLyBQYWdlIEFQSVxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbnNlcnZlci5nZXQoJy9hcGkvcGFnZS8qJywgZnVuY3Rpb24ocmVxLCByZXMpIHtcbiAgdmFyIHVybFBhdGggPSByZXEucGF0aC5zdWJzdHIoOSk7XG4gIHZhciBwYWdlID0gQXBwU3RvcmUuZ2V0UGFnZSh1cmxQYXRoKTtcbiAgcmVzLnNlbmQocGFnZSk7XG59KTtcblxuLy9cbi8vIFNlcnZlci1zaWRlIHJlbmRlcmluZ1xuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuLy8gVGhlIHRvcC1sZXZlbCBSZWFjdCBjb21wb25lbnQgKyBIVE1MIHRlbXBsYXRlIGZvciBpdFxudmFyIEFwcCA9IFJlYWN0LmNyZWF0ZUZhY3RvcnkocmVxdWlyZSgnLi9jb21wb25lbnRzL0FwcCcpKTtcbnZhciB0ZW1wbGF0ZUZpbGUgPSBwYXRoLmpvaW4oX19kaXJuYW1lLCAndGVtcGxhdGVzL2luZGV4Lmh0bWwnKTtcbnZhciB0ZW1wbGF0ZSA9IF8udGVtcGxhdGUoZnMucmVhZEZpbGVTeW5jKHRlbXBsYXRlRmlsZSwgJ3V0ZjgnKSk7XG5cbnNlcnZlci5nZXQoJyonLCBmdW5jdGlvbihyZXEsIHJlcykge1xuICB2YXIgZGF0YSA9IHtkZXNjcmlwdGlvbjogJyd9O1xuICB2YXIgYXBwID0gbmV3IEFwcCh7XG4gICAgcGF0aDogcmVxLnBhdGgsXG4gICAgb25TZXRUaXRsZTogZnVuY3Rpb24odGl0bGUpIHsgZGF0YS50aXRsZSA9IHRpdGxlOyB9LFxuICAgIG9uU2V0TWV0YTogZnVuY3Rpb24obmFtZSwgY29udGVudCkgeyBkYXRhW25hbWVdID0gY29udGVudDsgfSxcbiAgICBvblBhZ2VOb3RGb3VuZDogZnVuY3Rpb24oKSB7IHJlcy5zdGF0dXMoNDA0KTsgfVxuICB9KTtcbiAgZGF0YS5ib2R5ID0gUmVhY3QucmVuZGVyVG9TdHJpbmcoYXBwKTtcbiAgdmFyIGh0bWwgPSB0ZW1wbGF0ZShkYXRhKTtcbiAgcmVzLnNlbmQoaHRtbCk7XG59KTtcblxuLy8gTG9hZCBwYWdlcyBmcm9tIHRoZSBgL3NyYy9jb250ZW50L2AgZm9sZGVyIGludG8gdGhlIEFwcFN0b3JlXG4oZnVuY3Rpb24oKSB7XG4gIHZhciBhc3NpZ24gPSByZXF1aXJlKCdyZWFjdC9saWIvT2JqZWN0LmFzc2lnbicpO1xuICB2YXIgZm0gPSByZXF1aXJlKCdmcm9udC1tYXR0ZXInKTtcbiAgdmFyIGphZGUgPSByZXF1aXJlKCdqYWRlJyk7XG4gIHZhciBzb3VyY2VEaXIgPSBwYXRoLmpvaW4oX19kaXJuYW1lLCAnLi9jb250ZW50Jyk7XG4gIHZhciBnZXRGaWxlcyA9IGZ1bmN0aW9uKGRpcikge1xuICAgIHZhciBwYWdlcyA9IFtdO1xuICAgIGZzLnJlYWRkaXJTeW5jKGRpcikuZm9yRWFjaChmdW5jdGlvbihmaWxlKSB7XG4gICAgICB2YXIgc3RhdCA9IGZzLnN0YXRTeW5jKHBhdGguam9pbihkaXIsIGZpbGUpKTtcbiAgICAgIGlmIChzdGF0ICYmIHN0YXQuaXNEaXJlY3RvcnkoKSkge1xuICAgICAgICBwYWdlcyA9IHBhZ2VzLmNvbmNhdChnZXRGaWxlcyhmaWxlKSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyBDb252ZXJ0IHRoZSBmaWxlIHRvIGEgUGFnZSBvYmplY3RcbiAgICAgICAgdmFyIGZpbGVuYW1lID0gcGF0aC5qb2luKGRpciwgZmlsZSk7XG4gICAgICAgIHZhciB1cmwgPSBmaWxlbmFtZS5cbiAgICAgICAgICBzdWJzdHIoc291cmNlRGlyLmxlbmd0aCwgZmlsZW5hbWUubGVuZ3RoIC0gc291cmNlRGlyLmxlbmd0aCAtIDUpXG4gICAgICAgICAgLnJlcGxhY2UoJ1xcXFwnLCAnLycpO1xuICAgICAgICBpZiAodXJsLmluZGV4T2YoJy9pbmRleCcsIHVybC5sZW5ndGggLSA2KSAhPT0gLTEpIHtcbiAgICAgICAgICB1cmwgPSB1cmwuc3Vic3RyKDAsIHVybC5sZW5ndGggLSAodXJsLmxlbmd0aCA+IDYgPyA2IDogNSkpO1xuICAgICAgICB9XG4gICAgICAgIHZhciBzb3VyY2UgPSBmcy5yZWFkRmlsZVN5bmMoZmlsZW5hbWUsICd1dGY4Jyk7XG4gICAgICAgIHZhciBjb250ZW50ID0gZm0oc291cmNlKTtcbiAgICAgICAgdmFyIGh0bWwgPSBqYWRlLnJlbmRlcihjb250ZW50LmJvZHksIG51bGwsICcgICcpO1xuICAgICAgICB2YXIgcGFnZSA9IGFzc2lnbih7fSwge3BhdGg6IHVybCwgYm9keTogaHRtbH0sIGNvbnRlbnQuYXR0cmlidXRlcyk7XG4gICAgICAgIERpc3BhdGNoZXIuaGFuZGxlU2VydmVyQWN0aW9uKHtcbiAgICAgICAgICBhY3Rpb25UeXBlOiBBY3Rpb25UeXBlcy5MT0FEX1BBR0UsXG4gICAgICAgICAgcGF0aDogdXJsLFxuICAgICAgICAgIHBhZ2U6IHBhZ2VcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfSk7XG4gICAgcmV0dXJuIHBhZ2VzO1xuICB9O1xuICByZXR1cm4gZ2V0RmlsZXMoc291cmNlRGlyKTtcbn0pKCk7XG5cbnNlcnZlci5saXN0ZW4oc2VydmVyLmdldCgncG9ydCcpLCBmdW5jdGlvbigpIHtcbiAgaWYgKHByb2Nlc3Muc2VuZCkge1xuICAgIHByb2Nlc3Muc2VuZCgnb25saW5lJyk7XG4gIH0gZWxzZSB7XG4gICAgY29uc29sZS5sb2coJ1RoZSBzZXJ2ZXIgaXMgcnVubmluZyBhdCBodHRwOi8vbG9jYWxob3N0OicgKyBzZXJ2ZXIuZ2V0KCdwb3J0JykpO1xuICB9XG59KTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vfi9lc2xpbnQtbG9hZGVyIS4vc3JjL3NlcnZlci5qc1xuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInJlYWN0XCIpO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogZXh0ZXJuYWwgXCJyZWFjdFwiXG4gKiogbW9kdWxlIGlkID0gMVxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiLypcbiAqIFJlYWN0LmpzIFN0YXJ0ZXIgS2l0XG4gKiBDb3B5cmlnaHQgKGMpIDIwMTQgS29uc3RhbnRpbiBUYXJrdXMgKEBrb2lzdHlhKSwgS3JpYVNvZnQgTExDLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRS50eHQgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiAqL1xuXG5pbXBvcnQga2V5TWlycm9yIGZyb20gJ3JlYWN0L2xpYi9rZXlNaXJyb3InO1xuXG5leHBvcnQgZGVmYXVsdCBrZXlNaXJyb3Ioe1xuXG4gIExPQURfUEFHRTogbnVsbCxcbiAgTE9BRF9QQUdFX1NVQ0NFU1M6IG51bGwsXG4gIExPQURfUEFHRV9FUlJPUjogbnVsbCxcbiAgQ0hBTkdFX0xPQ0FUSU9OOiBudWxsXG5cbn0pO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9+L2VzbGludC1sb2FkZXIhLi9zcmMvY29uc3RhbnRzL0FjdGlvblR5cGVzLmpzXG4gKiovIiwiLypcbiAqIFJlYWN0LmpzIFN0YXJ0ZXIgS2l0XG4gKiBDb3B5cmlnaHQgKGMpIDIwMTQgS29uc3RhbnRpbiBUYXJrdXMgKEBrb2lzdHlhKSwgS3JpYVNvZnQgTExDLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRS50eHQgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiAqL1xuXG5pbXBvcnQgRmx1eCBmcm9tICdmbHV4JztcbmltcG9ydCBQYXlsb2FkU291cmNlcyBmcm9tICcuLi9jb25zdGFudHMvUGF5bG9hZFNvdXJjZXMnO1xuaW1wb3J0IGFzc2lnbiBmcm9tICdyZWFjdC9saWIvT2JqZWN0LmFzc2lnbic7XG5cbi8qKlxuICogQSBzaW5nbGV0b24gdGhhdCBvcGVyYXRlcyBhcyB0aGUgY2VudHJhbCBodWIgZm9yIGFwcGxpY2F0aW9uIHVwZGF0ZXMuXG4gKiBGb3IgbW9yZSBpbmZvcm1hdGlvbiB2aXNpdCBodHRwczovL2ZhY2Vib29rLmdpdGh1Yi5pby9mbHV4L1xuICovXG5sZXQgRGlzcGF0Y2hlciA9IGFzc2lnbihuZXcgRmx1eC5EaXNwYXRjaGVyKCksIHtcblxuICAvKipcbiAgICogQHBhcmFtIHtvYmplY3R9IGFjdGlvbiBUaGUgZGV0YWlscyBvZiB0aGUgYWN0aW9uLCBpbmNsdWRpbmcgdGhlIGFjdGlvbidzXG4gICAqIHR5cGUgYW5kIGFkZGl0aW9uYWwgZGF0YSBjb21pbmcgZnJvbSB0aGUgc2VydmVyLlxuICAgKi9cbiAgaGFuZGxlU2VydmVyQWN0aW9uKGFjdGlvbikge1xuICAgIHZhciBwYXlsb2FkID0ge1xuICAgICAgc291cmNlOiBQYXlsb2FkU291cmNlcy5TRVJWRVJfQUNUSU9OLFxuICAgICAgYWN0aW9uOiBhY3Rpb25cbiAgICB9O1xuICAgIHRoaXMuZGlzcGF0Y2gocGF5bG9hZCk7XG4gIH0sXG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7b2JqZWN0fSBhY3Rpb24gVGhlIGRldGFpbHMgb2YgdGhlIGFjdGlvbiwgaW5jbHVkaW5nIHRoZSBhY3Rpb24nc1xuICAgKiB0eXBlIGFuZCBhZGRpdGlvbmFsIGRhdGEgY29taW5nIGZyb20gdGhlIHZpZXcuXG4gICAqL1xuICBoYW5kbGVWaWV3QWN0aW9uKGFjdGlvbikge1xuICAgIHZhciBwYXlsb2FkID0ge1xuICAgICAgc291cmNlOiBQYXlsb2FkU291cmNlcy5WSUVXX0FDVElPTixcbiAgICAgIGFjdGlvbjogYWN0aW9uXG4gICAgfTtcbiAgICB0aGlzLmRpc3BhdGNoKHBheWxvYWQpO1xuICB9XG5cbn0pO1xuXG5leHBvcnQgZGVmYXVsdCBEaXNwYXRjaGVyO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9+L2VzbGludC1sb2FkZXIhLi9zcmMvY29yZS9EaXNwYXRjaGVyLmpzXG4gKiovIiwiLyoqXG4gKiBDb3B5cmlnaHQgMjAxNC0yMDE1LCBGYWNlYm9vaywgSW5jLlxuICogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBCU0Qtc3R5bGUgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS4gQW4gYWRkaXRpb25hbCBncmFudFxuICogb2YgcGF0ZW50IHJpZ2h0cyBjYW4gYmUgZm91bmQgaW4gdGhlIFBBVEVOVFMgZmlsZSBpbiB0aGUgc2FtZSBkaXJlY3RvcnkuXG4gKlxuICogQHByb3ZpZGVzTW9kdWxlIE9iamVjdC5hc3NpZ25cbiAqL1xuXG4vLyBodHRwczovL3Blb3BsZS5tb3ppbGxhLm9yZy9+am9yZW5kb3JmZi9lczYtZHJhZnQuaHRtbCNzZWMtb2JqZWN0LmFzc2lnblxuXG4ndXNlIHN0cmljdCc7XG5cbmZ1bmN0aW9uIGFzc2lnbih0YXJnZXQsIHNvdXJjZXMpIHtcbiAgaWYgKHRhcmdldCA9PSBudWxsKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignT2JqZWN0LmFzc2lnbiB0YXJnZXQgY2Fubm90IGJlIG51bGwgb3IgdW5kZWZpbmVkJyk7XG4gIH1cblxuICB2YXIgdG8gPSBPYmplY3QodGFyZ2V0KTtcbiAgdmFyIGhhc093blByb3BlcnR5ID0gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eTtcblxuICBmb3IgKHZhciBuZXh0SW5kZXggPSAxOyBuZXh0SW5kZXggPCBhcmd1bWVudHMubGVuZ3RoOyBuZXh0SW5kZXgrKykge1xuICAgIHZhciBuZXh0U291cmNlID0gYXJndW1lbnRzW25leHRJbmRleF07XG4gICAgaWYgKG5leHRTb3VyY2UgPT0gbnVsbCkge1xuICAgICAgY29udGludWU7XG4gICAgfVxuXG4gICAgdmFyIGZyb20gPSBPYmplY3QobmV4dFNvdXJjZSk7XG5cbiAgICAvLyBXZSBkb24ndCBjdXJyZW50bHkgc3VwcG9ydCBhY2Nlc3NvcnMgbm9yIHByb3hpZXMuIFRoZXJlZm9yZSB0aGlzXG4gICAgLy8gY29weSBjYW5ub3QgdGhyb3cuIElmIHdlIGV2ZXIgc3VwcG9ydGVkIHRoaXMgdGhlbiB3ZSBtdXN0IGhhbmRsZVxuICAgIC8vIGV4Y2VwdGlvbnMgYW5kIHNpZGUtZWZmZWN0cy4gV2UgZG9uJ3Qgc3VwcG9ydCBzeW1ib2xzIHNvIHRoZXkgd29uJ3RcbiAgICAvLyBiZSB0cmFuc2ZlcnJlZC5cblxuICAgIGZvciAodmFyIGtleSBpbiBmcm9tKSB7XG4gICAgICBpZiAoaGFzT3duUHJvcGVydHkuY2FsbChmcm9tLCBrZXkpKSB7XG4gICAgICAgIHRvW2tleV0gPSBmcm9tW2tleV07XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHRvO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGFzc2lnbjtcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L3JlYWN0L2xpYi9PYmplY3QuYXNzaWduLmpzXG4gKiogbW9kdWxlIGlkID0gNFxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiLypcbiAqIFJlYWN0LmpzIFN0YXJ0ZXIgS2l0XG4gKiBDb3B5cmlnaHQgKGMpIDIwMTQgS29uc3RhbnRpbiBUYXJrdXMgKEBrb2lzdHlhKSwgS3JpYVNvZnQgTExDLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRS50eHQgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiAqL1xuXG5pbXBvcnQga2V5TWlycm9yIGZyb20gJ3JlYWN0L2xpYi9rZXlNaXJyb3InO1xuXG5leHBvcnQgZGVmYXVsdCBrZXlNaXJyb3Ioe1xuXG4gIFZJRVdfQUNUSU9OOiBudWxsLFxuICBTRVJWRVJfQUNUSU9OOiBudWxsXG5cbn0pO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9+L2VzbGludC1sb2FkZXIhLi9zcmMvY29uc3RhbnRzL1BheWxvYWRTb3VyY2VzLmpzXG4gKiovIiwiLypcbiAqIFJlYWN0LmpzIFN0YXJ0ZXIgS2l0XG4gKiBDb3B5cmlnaHQgKGMpIDIwMTQgS29uc3RhbnRpbiBUYXJrdXMgKEBrb2lzdHlhKSwgS3JpYVNvZnQgTExDLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRS50eHQgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiAqL1xuXG5pbXBvcnQgRGlzcGF0Y2hlciBmcm9tICcuLi9jb3JlL0Rpc3BhdGNoZXInO1xuaW1wb3J0IEFjdGlvblR5cGVzIGZyb20gJy4uL2NvbnN0YW50cy9BY3Rpb25UeXBlcyc7XG5pbXBvcnQgUGF5bG9hZFNvdXJjZXMgZnJvbSAnLi4vY29uc3RhbnRzL1BheWxvYWRTb3VyY2VzJztcbmltcG9ydCBFdmVudEVtaXR0ZXIgZnJvbSAnZXZlbnRlbWl0dGVyMyc7XG5pbXBvcnQgYXNzaWduIGZyb20gJ3JlYWN0L2xpYi9PYmplY3QuYXNzaWduJztcblxudmFyIENIQU5HRV9FVkVOVCA9ICdjaGFuZ2UnO1xuXG52YXIgcGFnZXMgPSB7fTtcbnZhciBsb2FkaW5nID0gZmFsc2U7XG5cbmlmIChfX1NFUlZFUl9fKSB7XG4gIHBhZ2VzWycvJ10gPSB7dGl0bGU6ICdIb21lIFBhZ2UnfTtcbiAgcGFnZXNbJy9wcml2YWN5J10gPSB7dGl0bGU6ICdQcml2YWN5IFBvbGljeSd9O1xufVxuXG52YXIgQXBwU3RvcmUgPSBhc3NpZ24oe30sIEV2ZW50RW1pdHRlci5wcm90b3R5cGUsIHtcblxuICBpc0xvYWRpbmcoKSB7XG4gICAgcmV0dXJuIGxvYWRpbmc7XG4gIH0sXG5cbiAgLyoqXG4gICAqIEdldHMgcGFnZSBkYXRhIGJ5IHRoZSBnaXZlbiBVUkwgcGF0aC5cbiAgICpcbiAgICogQHBhcmFtIHtTdHJpbmd9IHBhdGggVVJMIHBhdGguXG4gICAqIEByZXR1cm5zIHsqfSBQYWdlIGRhdGEuXG4gICAqL1xuICBnZXRQYWdlKHBhdGgpIHtcbiAgICByZXR1cm4gcGF0aCBpbiBwYWdlcyA/IHBhZ2VzW3BhdGhdIDoge1xuICAgICAgdGl0bGU6ICdQYWdlIE5vdCBGb3VuZCcsXG4gICAgICB0eXBlOiAnbm90Zm91bmQnXG4gICAgfTtcbiAgfSxcblxuICAvKipcbiAgICogRW1pdHMgY2hhbmdlIGV2ZW50IHRvIGFsbCByZWdpc3RlcmVkIGV2ZW50IGxpc3RlbmVycy5cbiAgICpcbiAgICogQHJldHVybnMge0Jvb2xlYW59IEluZGljYXRpb24gaWYgd2UndmUgZW1pdHRlZCBhbiBldmVudC5cbiAgICovXG4gIGVtaXRDaGFuZ2UoKSB7XG4gICAgcmV0dXJuIHRoaXMuZW1pdChDSEFOR0VfRVZFTlQpO1xuICB9LFxuXG4gIC8qKlxuICAgKiBSZWdpc3RlciBhIG5ldyBjaGFuZ2UgZXZlbnQgbGlzdGVuZXIuXG4gICAqXG4gICAqIEBwYXJhbSB7ZnVuY3Rpb259IGNhbGxiYWNrIENhbGxiYWNrIGZ1bmN0aW9uLlxuICAgKi9cbiAgb25DaGFuZ2UoY2FsbGJhY2spIHtcbiAgICB0aGlzLm9uKENIQU5HRV9FVkVOVCwgY2FsbGJhY2spO1xuICB9LFxuXG4gIC8qKlxuICAgKiBSZW1vdmUgY2hhbmdlIGV2ZW50IGxpc3RlbmVyLlxuICAgKlxuICAgKiBAcGFyYW0ge2Z1bmN0aW9ufSBjYWxsYmFjayBDYWxsYmFjayBmdW5jdGlvbi5cbiAgICovXG4gIG9mZihjYWxsYmFjaykge1xuICAgIHRoaXMub2ZmKENIQU5HRV9FVkVOVCwgY2FsbGJhY2spO1xuICB9XG5cbn0pO1xuXG5BcHBTdG9yZS5kaXNwYXRjaGVyVG9rZW4gPSBEaXNwYXRjaGVyLnJlZ2lzdGVyKChwYXlsb2FkKSA9PiB7XG4gIHZhciBhY3Rpb24gPSBwYXlsb2FkLmFjdGlvbjtcblxuICBzd2l0Y2ggKGFjdGlvbi5hY3Rpb25UeXBlKSB7XG5cbiAgICBjYXNlIEFjdGlvblR5cGVzLkxPQURfUEFHRTpcbiAgICAgIGlmIChhY3Rpb24uc291cmNlID09PSBQYXlsb2FkU291cmNlcy5WSUVXX0FDVElPTikge1xuICAgICAgICBsb2FkaW5nID0gdHJ1ZTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGxvYWRpbmcgPSBmYWxzZTtcbiAgICAgICAgaWYgKCFhY3Rpb24uZXJyKSB7XG4gICAgICAgICAgcGFnZXNbYWN0aW9uLnBhdGhdID0gYWN0aW9uLnBhZ2U7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIEFwcFN0b3JlLmVtaXRDaGFuZ2UoKTtcbiAgICAgIGJyZWFrO1xuXG4gICAgZGVmYXVsdDpcbiAgICAgIC8vIERvIG5vdGhpbmdcblxuICB9XG5cbn0pO1xuXG5leHBvcnQgZGVmYXVsdCBBcHBTdG9yZTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vfi9lc2xpbnQtbG9hZGVyIS4vc3JjL3N0b3Jlcy9BcHBTdG9yZS5qc1xuICoqLyIsIi8qXHJcblx0TUlUIExpY2Vuc2UgaHR0cDovL3d3dy5vcGVuc291cmNlLm9yZy9saWNlbnNlcy9taXQtbGljZW5zZS5waHBcclxuXHRBdXRob3IgVG9iaWFzIEtvcHBlcnMgQHNva3JhXHJcbiovXHJcbi8vIGNzcyBiYXNlIGNvZGUsIGluamVjdGVkIGJ5IHRoZSBjc3MtbG9hZGVyXHJcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oKSB7XHJcblx0dmFyIGxpc3QgPSBbXTtcclxuXHJcblx0Ly8gcmV0dXJuIHRoZSBsaXN0IG9mIG1vZHVsZXMgYXMgY3NzIHN0cmluZ1xyXG5cdGxpc3QudG9TdHJpbmcgPSBmdW5jdGlvbiB0b1N0cmluZygpIHtcclxuXHRcdHZhciByZXN1bHQgPSBbXTtcclxuXHRcdGZvcih2YXIgaSA9IDA7IGkgPCB0aGlzLmxlbmd0aDsgaSsrKSB7XHJcblx0XHRcdHZhciBpdGVtID0gdGhpc1tpXTtcclxuXHRcdFx0aWYoaXRlbVsyXSkge1xyXG5cdFx0XHRcdHJlc3VsdC5wdXNoKFwiQG1lZGlhIFwiICsgaXRlbVsyXSArIFwie1wiICsgaXRlbVsxXSArIFwifVwiKTtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRyZXN1bHQucHVzaChpdGVtWzFdKTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdFx0cmV0dXJuIHJlc3VsdC5qb2luKFwiXCIpO1xyXG5cdH07XHJcblxyXG5cdC8vIGltcG9ydCBhIGxpc3Qgb2YgbW9kdWxlcyBpbnRvIHRoZSBsaXN0XHJcblx0bGlzdC5pID0gZnVuY3Rpb24obW9kdWxlcywgbWVkaWFRdWVyeSkge1xyXG5cdFx0aWYodHlwZW9mIG1vZHVsZXMgPT09IFwic3RyaW5nXCIpXHJcblx0XHRcdG1vZHVsZXMgPSBbW251bGwsIG1vZHVsZXMsIFwiXCJdXTtcclxuXHRcdHZhciBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzID0ge307XHJcblx0XHRmb3IodmFyIGkgPSAwOyBpIDwgdGhpcy5sZW5ndGg7IGkrKykge1xyXG5cdFx0XHR2YXIgaWQgPSB0aGlzW2ldWzBdO1xyXG5cdFx0XHRpZih0eXBlb2YgaWQgPT09IFwibnVtYmVyXCIpXHJcblx0XHRcdFx0YWxyZWFkeUltcG9ydGVkTW9kdWxlc1tpZF0gPSB0cnVlO1xyXG5cdFx0fVxyXG5cdFx0Zm9yKGkgPSAwOyBpIDwgbW9kdWxlcy5sZW5ndGg7IGkrKykge1xyXG5cdFx0XHR2YXIgaXRlbSA9IG1vZHVsZXNbaV07XHJcblx0XHRcdC8vIHNraXAgYWxyZWFkeSBpbXBvcnRlZCBtb2R1bGVcclxuXHRcdFx0Ly8gdGhpcyBpbXBsZW1lbnRhdGlvbiBpcyBub3QgMTAwJSBwZXJmZWN0IGZvciB3ZWlyZCBtZWRpYSBxdWVyeSBjb21iaW5hdGlvbnNcclxuXHRcdFx0Ly8gIHdoZW4gYSBtb2R1bGUgaXMgaW1wb3J0ZWQgbXVsdGlwbGUgdGltZXMgd2l0aCBkaWZmZXJlbnQgbWVkaWEgcXVlcmllcy5cclxuXHRcdFx0Ly8gIEkgaG9wZSB0aGlzIHdpbGwgbmV2ZXIgb2NjdXIgKEhleSB0aGlzIHdheSB3ZSBoYXZlIHNtYWxsZXIgYnVuZGxlcylcclxuXHRcdFx0aWYodHlwZW9mIGl0ZW1bMF0gIT09IFwibnVtYmVyXCIgfHwgIWFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaXRlbVswXV0pIHtcclxuXHRcdFx0XHRpZihtZWRpYVF1ZXJ5ICYmICFpdGVtWzJdKSB7XHJcblx0XHRcdFx0XHRpdGVtWzJdID0gbWVkaWFRdWVyeTtcclxuXHRcdFx0XHR9IGVsc2UgaWYobWVkaWFRdWVyeSkge1xyXG5cdFx0XHRcdFx0aXRlbVsyXSA9IFwiKFwiICsgaXRlbVsyXSArIFwiKSBhbmQgKFwiICsgbWVkaWFRdWVyeSArIFwiKVwiO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRsaXN0LnB1c2goaXRlbSk7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHR9O1xyXG5cdHJldHVybiBsaXN0O1xyXG59O1xyXG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9jc3MtbG9hZGVyL2xpYi9jc3MtYmFzZS5qc1xuICoqIG1vZHVsZSBpZCA9IDdcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIi8qKlxuICogQ29weXJpZ2h0IDIwMTMtMjAxNSwgRmFjZWJvb2ssIEluYy5cbiAqIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgQlNELXN0eWxlIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuIEFuIGFkZGl0aW9uYWwgZ3JhbnRcbiAqIG9mIHBhdGVudCByaWdodHMgY2FuIGJlIGZvdW5kIGluIHRoZSBQQVRFTlRTIGZpbGUgaW4gdGhlIHNhbWUgZGlyZWN0b3J5LlxuICpcbiAqIEBwcm92aWRlc01vZHVsZSBFeGVjdXRpb25FbnZpcm9ubWVudFxuICovXG5cbi8qanNsaW50IGV2aWw6IHRydWUgKi9cblxuXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBjYW5Vc2VET00gPSAhIShcbiAgKHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnICYmXG4gIHdpbmRvdy5kb2N1bWVudCAmJiB3aW5kb3cuZG9jdW1lbnQuY3JlYXRlRWxlbWVudClcbik7XG5cbi8qKlxuICogU2ltcGxlLCBsaWdodHdlaWdodCBtb2R1bGUgYXNzaXN0aW5nIHdpdGggdGhlIGRldGVjdGlvbiBhbmQgY29udGV4dCBvZlxuICogV29ya2VyLiBIZWxwcyBhdm9pZCBjaXJjdWxhciBkZXBlbmRlbmNpZXMgYW5kIGFsbG93cyBjb2RlIHRvIHJlYXNvbiBhYm91dFxuICogd2hldGhlciBvciBub3QgdGhleSBhcmUgaW4gYSBXb3JrZXIsIGV2ZW4gaWYgdGhleSBuZXZlciBpbmNsdWRlIHRoZSBtYWluXG4gKiBgUmVhY3RXb3JrZXJgIGRlcGVuZGVuY3kuXG4gKi9cbnZhciBFeGVjdXRpb25FbnZpcm9ubWVudCA9IHtcblxuICBjYW5Vc2VET006IGNhblVzZURPTSxcblxuICBjYW5Vc2VXb3JrZXJzOiB0eXBlb2YgV29ya2VyICE9PSAndW5kZWZpbmVkJyxcblxuICBjYW5Vc2VFdmVudExpc3RlbmVyczpcbiAgICBjYW5Vc2VET00gJiYgISEod2luZG93LmFkZEV2ZW50TGlzdGVuZXIgfHwgd2luZG93LmF0dGFjaEV2ZW50KSxcblxuICBjYW5Vc2VWaWV3cG9ydDogY2FuVXNlRE9NICYmICEhd2luZG93LnNjcmVlbixcblxuICBpc0luV29ya2VyOiAhY2FuVXNlRE9NIC8vIEZvciBub3csIHRoaXMgaXMgdHJ1ZSAtIG1pZ2h0IGNoYW5nZSBpbiB0aGUgZnV0dXJlLlxuXG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IEV4ZWN1dGlvbkVudmlyb25tZW50O1xuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vcmVhY3QvbGliL0V4ZWN1dGlvbkVudmlyb25tZW50LmpzXG4gKiogbW9kdWxlIGlkID0gOFxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiLyoqXG4gKiBDb3B5cmlnaHQgMjAxMy0yMDE1LCBGYWNlYm9vaywgSW5jLlxuICogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBCU0Qtc3R5bGUgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS4gQW4gYWRkaXRpb25hbCBncmFudFxuICogb2YgcGF0ZW50IHJpZ2h0cyBjYW4gYmUgZm91bmQgaW4gdGhlIFBBVEVOVFMgZmlsZSBpbiB0aGUgc2FtZSBkaXJlY3RvcnkuXG4gKlxuICogQHByb3ZpZGVzTW9kdWxlIGludmFyaWFudFxuICovXG5cblwidXNlIHN0cmljdFwiO1xuXG4vKipcbiAqIFVzZSBpbnZhcmlhbnQoKSB0byBhc3NlcnQgc3RhdGUgd2hpY2ggeW91ciBwcm9ncmFtIGFzc3VtZXMgdG8gYmUgdHJ1ZS5cbiAqXG4gKiBQcm92aWRlIHNwcmludGYtc3R5bGUgZm9ybWF0IChvbmx5ICVzIGlzIHN1cHBvcnRlZCkgYW5kIGFyZ3VtZW50c1xuICogdG8gcHJvdmlkZSBpbmZvcm1hdGlvbiBhYm91dCB3aGF0IGJyb2tlIGFuZCB3aGF0IHlvdSB3ZXJlXG4gKiBleHBlY3RpbmcuXG4gKlxuICogVGhlIGludmFyaWFudCBtZXNzYWdlIHdpbGwgYmUgc3RyaXBwZWQgaW4gcHJvZHVjdGlvbiwgYnV0IHRoZSBpbnZhcmlhbnRcbiAqIHdpbGwgcmVtYWluIHRvIGVuc3VyZSBsb2dpYyBkb2VzIG5vdCBkaWZmZXIgaW4gcHJvZHVjdGlvbi5cbiAqL1xuXG52YXIgaW52YXJpYW50ID0gZnVuY3Rpb24oY29uZGl0aW9uLCBmb3JtYXQsIGEsIGIsIGMsIGQsIGUsIGYpIHtcbiAgaWYgKFwicHJvZHVjdGlvblwiICE9PSBwcm9jZXNzLmVudi5OT0RFX0VOVikge1xuICAgIGlmIChmb3JtYXQgPT09IHVuZGVmaW5lZCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdpbnZhcmlhbnQgcmVxdWlyZXMgYW4gZXJyb3IgbWVzc2FnZSBhcmd1bWVudCcpO1xuICAgIH1cbiAgfVxuXG4gIGlmICghY29uZGl0aW9uKSB7XG4gICAgdmFyIGVycm9yO1xuICAgIGlmIChmb3JtYXQgPT09IHVuZGVmaW5lZCkge1xuICAgICAgZXJyb3IgPSBuZXcgRXJyb3IoXG4gICAgICAgICdNaW5pZmllZCBleGNlcHRpb24gb2NjdXJyZWQ7IHVzZSB0aGUgbm9uLW1pbmlmaWVkIGRldiBlbnZpcm9ubWVudCAnICtcbiAgICAgICAgJ2ZvciB0aGUgZnVsbCBlcnJvciBtZXNzYWdlIGFuZCBhZGRpdGlvbmFsIGhlbHBmdWwgd2FybmluZ3MuJ1xuICAgICAgKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIGFyZ3MgPSBbYSwgYiwgYywgZCwgZSwgZl07XG4gICAgICB2YXIgYXJnSW5kZXggPSAwO1xuICAgICAgZXJyb3IgPSBuZXcgRXJyb3IoXG4gICAgICAgICdJbnZhcmlhbnQgVmlvbGF0aW9uOiAnICtcbiAgICAgICAgZm9ybWF0LnJlcGxhY2UoLyVzL2csIGZ1bmN0aW9uKCkgeyByZXR1cm4gYXJnc1thcmdJbmRleCsrXTsgfSlcbiAgICAgICk7XG4gICAgfVxuXG4gICAgZXJyb3IuZnJhbWVzVG9Qb3AgPSAxOyAvLyB3ZSBkb24ndCBjYXJlIGFib3V0IGludmFyaWFudCdzIG93biBmcmFtZVxuICAgIHRocm93IGVycm9yO1xuICB9XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGludmFyaWFudDtcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L3JlYWN0L2xpYi9pbnZhcmlhbnQuanNcbiAqKiBtb2R1bGUgaWQgPSA5XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIvKipcbiAqIENvcHlyaWdodCAyMDEzLTIwMTUsIEZhY2Vib29rLCBJbmMuXG4gKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIEJTRC1zdHlsZSBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLiBBbiBhZGRpdGlvbmFsIGdyYW50XG4gKiBvZiBwYXRlbnQgcmlnaHRzIGNhbiBiZSBmb3VuZCBpbiB0aGUgUEFURU5UUyBmaWxlIGluIHRoZSBzYW1lIGRpcmVjdG9yeS5cbiAqXG4gKiBAcHJvdmlkZXNNb2R1bGUga2V5TWlycm9yXG4gKiBAdHlwZWNoZWNrcyBzdGF0aWMtb25seVxuICovXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIGludmFyaWFudCA9IHJlcXVpcmUoXCIuL2ludmFyaWFudFwiKTtcblxuLyoqXG4gKiBDb25zdHJ1Y3RzIGFuIGVudW1lcmF0aW9uIHdpdGgga2V5cyBlcXVhbCB0byB0aGVpciB2YWx1ZS5cbiAqXG4gKiBGb3IgZXhhbXBsZTpcbiAqXG4gKiAgIHZhciBDT0xPUlMgPSBrZXlNaXJyb3Ioe2JsdWU6IG51bGwsIHJlZDogbnVsbH0pO1xuICogICB2YXIgbXlDb2xvciA9IENPTE9SUy5ibHVlO1xuICogICB2YXIgaXNDb2xvclZhbGlkID0gISFDT0xPUlNbbXlDb2xvcl07XG4gKlxuICogVGhlIGxhc3QgbGluZSBjb3VsZCBub3QgYmUgcGVyZm9ybWVkIGlmIHRoZSB2YWx1ZXMgb2YgdGhlIGdlbmVyYXRlZCBlbnVtIHdlcmVcbiAqIG5vdCBlcXVhbCB0byB0aGVpciBrZXlzLlxuICpcbiAqICAgSW5wdXQ6ICB7a2V5MTogdmFsMSwga2V5MjogdmFsMn1cbiAqICAgT3V0cHV0OiB7a2V5MToga2V5MSwga2V5Mjoga2V5Mn1cbiAqXG4gKiBAcGFyYW0ge29iamVjdH0gb2JqXG4gKiBAcmV0dXJuIHtvYmplY3R9XG4gKi9cbnZhciBrZXlNaXJyb3IgPSBmdW5jdGlvbihvYmopIHtcbiAgdmFyIHJldCA9IHt9O1xuICB2YXIga2V5O1xuICAoXCJwcm9kdWN0aW9uXCIgIT09IHByb2Nlc3MuZW52Lk5PREVfRU5WID8gaW52YXJpYW50KFxuICAgIG9iaiBpbnN0YW5jZW9mIE9iamVjdCAmJiAhQXJyYXkuaXNBcnJheShvYmopLFxuICAgICdrZXlNaXJyb3IoLi4uKTogQXJndW1lbnQgbXVzdCBiZSBhbiBvYmplY3QuJ1xuICApIDogaW52YXJpYW50KG9iaiBpbnN0YW5jZW9mIE9iamVjdCAmJiAhQXJyYXkuaXNBcnJheShvYmopKSk7XG4gIGZvciAoa2V5IGluIG9iaikge1xuICAgIGlmICghb2JqLmhhc093blByb3BlcnR5KGtleSkpIHtcbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cbiAgICByZXRba2V5XSA9IGtleTtcbiAgfVxuICByZXR1cm4gcmV0O1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBrZXlNaXJyb3I7XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9yZWFjdC9saWIva2V5TWlycm9yLmpzXG4gKiogbW9kdWxlIGlkID0gMTBcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIi8qXG4gKiBSZWFjdC5qcyBTdGFydGVyIEtpdFxuICogQ29weXJpZ2h0IChjKSAyMDE0IEtvbnN0YW50aW4gVGFya3VzIChAa29pc3R5YSksIEtyaWFTb2Z0IExMQy5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UudHh0IGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4gKi9cblxuaW1wb3J0IERpc3BhdGNoZXIgZnJvbSAnLi4vY29yZS9EaXNwYXRjaGVyJztcbmltcG9ydCBBY3Rpb25UeXBlcyBmcm9tICcuLi9jb25zdGFudHMvQWN0aW9uVHlwZXMnO1xuaW1wb3J0IEV4ZWN1dGlvbkVudmlyb25tZW50IGZyb20gJ3JlYWN0L2xpYi9FeGVjdXRpb25FbnZpcm9ubWVudCc7XG5pbXBvcnQgaHR0cCBmcm9tICdzdXBlcmFnZW50JztcblxuZXhwb3J0IGRlZmF1bHQge1xuXG4gIG5hdmlnYXRlVG8ocGF0aCwgb3B0aW9ucykge1xuICAgIGlmIChFeGVjdXRpb25FbnZpcm9ubWVudC5jYW5Vc2VET00pIHtcbiAgICAgIGlmIChvcHRpb25zICYmIG9wdGlvbnMucmVwbGFjZSkge1xuICAgICAgICB3aW5kb3cuaGlzdG9yeS5yZXBsYWNlU3RhdGUoe30sIGRvY3VtZW50LnRpdGxlLCBwYXRoKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHdpbmRvdy5oaXN0b3J5LnB1c2hTdGF0ZSh7fSwgZG9jdW1lbnQudGl0bGUsIHBhdGgpO1xuICAgICAgfVxuICAgIH1cblxuICAgIERpc3BhdGNoZXIuaGFuZGxlVmlld0FjdGlvbih7XG4gICAgICBhY3Rpb25UeXBlOiBBY3Rpb25UeXBlcy5DSEFOR0VfTE9DQVRJT04sXG4gICAgICBwYXRoXG4gICAgfSk7XG4gIH0sXG5cbiAgbG9hZFBhZ2UocGF0aCwgY2IpIHtcbiAgICBEaXNwYXRjaGVyLmhhbmRsZVZpZXdBY3Rpb24oe1xuICAgICAgYWN0aW9uVHlwZTogQWN0aW9uVHlwZXMuTE9BRF9QQUdFLFxuICAgICAgcGF0aFxuICAgIH0pO1xuXG4gICAgaHR0cC5nZXQoJy9hcGkvcGFnZScgKyBwYXRoKVxuICAgICAgLmFjY2VwdCgnYXBwbGljYXRpb24vanNvbicpXG4gICAgICAuZW5kKChlcnIsIHJlcykgPT4ge1xuICAgICAgICBEaXNwYXRjaGVyLmhhbmRsZVNlcnZlckFjdGlvbih7XG4gICAgICAgICAgYWN0aW9uVHlwZTogQWN0aW9uVHlwZXMuTE9BRF9QQUdFLFxuICAgICAgICAgIHBhdGgsXG4gICAgICAgICAgZXJyLFxuICAgICAgICAgIHBhZ2U6IHJlcy5ib2R5XG4gICAgICAgIH0pO1xuICAgICAgICBpZiAoY2IpIHtcbiAgICAgICAgICBjYigpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgfVxuXG59O1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9+L2VzbGludC1sb2FkZXIhLi9zcmMvYWN0aW9ucy9BcHBBY3Rpb25zLmpzXG4gKiovIiwiLypcbiAqIFJlYWN0LmpzIFN0YXJ0ZXIgS2l0XG4gKiBDb3B5cmlnaHQgKGMpIDIwMTQgS29uc3RhbnRpbiBUYXJrdXMgKEBrb2lzdHlhKSwgS3JpYVNvZnQgTExDLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRS50eHQgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiAqL1xuXG5pbXBvcnQgJy4vQXBwLmxlc3MnO1xuaW1wb3J0IFJlYWN0LCB7IFByb3BUeXBlcyB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCBpbnZhcmlhbnQgZnJvbSAncmVhY3QvbGliL2ludmFyaWFudCc7XG5pbXBvcnQgQXBwQWN0aW9ucyBmcm9tICcuLi8uLi9hY3Rpb25zL0FwcEFjdGlvbnMnO1xuaW1wb3J0IEFwcFN0b3JlIGZyb20gJy4uLy4uL3N0b3Jlcy9BcHBTdG9yZSc7XG5pbXBvcnQgTmF2YmFyIGZyb20gJy4uL05hdmJhcic7XG5pbXBvcnQgQ29udGVudFBhZ2UgZnJvbSAnLi4vQ29udGVudFBhZ2UnO1xuaW1wb3J0IE5vdEZvdW5kUGFnZSBmcm9tICcuLi9Ob3RGb3VuZFBhZ2UnO1xuaW1wb3J0IHNldFZpZXdwb3J0IGZyb20gJy4vc2V0Vmlld3BvcnQnO1xuXG5jbGFzcyBBcHAge1xuXG4gIHN0YXRpYyBwcm9wVHlwZXMgPSB7XG4gICAgcGF0aDogUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkLFxuICAgIHZpZXdwb3J0OiBQcm9wVHlwZXMub2JqZWN0LmlzUmVxdWlyZWQsXG4gICAgb25TZXRUaXRsZTogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbiAgICBvblNldE1ldGE6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gICAgb25QYWdlTm90Rm91bmQ6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWRcbiAgfTtcblxuICBjb21wb25lbnREaWRNb3VudCgpIHtcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncG9wc3RhdGUnLCB0aGlzLmhhbmRsZVBvcFN0YXRlKTtcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLmhhbmRsZUNsaWNrKTtcbiAgfVxuXG4gIGNvbXBvbmVudFdpbGxVbm1vdW50KCkge1xuICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdwb3BzdGF0ZScsIHRoaXMuaGFuZGxlUG9wU3RhdGUpO1xuICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMuaGFuZGxlQ2xpY2spO1xuICB9XG5cbiAgc2hvdWxkQ29tcG9uZW50VXBkYXRlKG5leHRQcm9wcykge1xuICAgIHJldHVybiB0aGlzLnByb3BzLnBhdGggIT09IG5leHRQcm9wcy5wYXRoIHx8XG4gICAgICAgICAgIHRoaXMucHJvcHMudmlld3BvcnQgIT09IG5leHRQcm9wcy52aWV3cG9ydDtcbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICB2YXIgcGFnZSA9IEFwcFN0b3JlLmdldFBhZ2UodGhpcy5wcm9wcy5wYXRoKTtcbiAgICBpbnZhcmlhbnQocGFnZSAhPT0gdW5kZWZpbmVkLCAnRmFpbGVkIHRvIGxvYWQgcGFnZSBjb250ZW50LicpO1xuICAgIHRoaXMucHJvcHMub25TZXRUaXRsZShwYWdlLnRpdGxlKTtcblxuICAgIGlmIChwYWdlLnR5cGUgPT09ICdub3Rmb3VuZCcpIHtcbiAgICAgIHRoaXMucHJvcHMub25QYWdlTm90Rm91bmQoKTtcbiAgICAgIHJldHVybiBSZWFjdC5jcmVhdGVFbGVtZW50KE5vdEZvdW5kUGFnZSwgcGFnZSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiQXBwXCI+XG4gICAgICAgIDxOYXZiYXIgLz5cbiAgICAgICAge1xuICAgICAgICAgIHRoaXMucHJvcHMucGF0aCA9PT0gJy8nID9cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImp1bWJvdHJvblwiPlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb250YWluZXIgdGV4dC1jZW50ZXJcIj5cbiAgICAgICAgICAgICAgPGgxPlJlYWN0PC9oMT5cbiAgICAgICAgICAgICAgPHA+Q29tcGxleCB3ZWIgYXBwcyBtYWRlIGVhc3k8L3A+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj4gOlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29udGFpbmVyXCI+XG4gICAgICAgICAgICA8aDI+e3BhZ2UudGl0bGV9PC9oMj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgfVxuICAgICAgICA8Q29udGVudFBhZ2UgY2xhc3NOYW1lPVwiY29udGFpbmVyXCIgey4uLnBhZ2V9IC8+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibmF2YmFyLWZvb3RlclwiPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29udGFpbmVyXCI+XG4gICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJ0ZXh0LW11dGVkXCI+XG4gICAgICAgICAgICAgIDxzcGFuPsKpIFlvdXIgQ29tcGFueTwvc3Bhbj5cbiAgICAgICAgICAgICAgPHNwYW4+PGEgaHJlZj1cIi9cIj5Ib21lPC9hPjwvc3Bhbj5cbiAgICAgICAgICAgICAgPHNwYW4+PGEgaHJlZj1cIi9wcml2YWN5XCI+UHJpdmFjeTwvYT48L3NwYW4+XG4gICAgICAgICAgICAgIDxzcGFuPnsnVmlld3BvcnQ6ICcgKyB0aGlzLnByb3BzLnZpZXdwb3J0LndpZHRoICsgJ3gnICsgdGhpcy5wcm9wcy52aWV3cG9ydC5oZWlnaHR9PC9zcGFuPlxuICAgICAgICAgICAgPC9wPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cblxuICBoYW5kbGVQb3BTdGF0ZShldmVudCkge1xuICAgIEFwcEFjdGlvbnMubmF2aWdhdGVUbyh3aW5kb3cubG9jYXRpb24ucGF0aG5hbWUsIHtyZXBsYWNlOiAhIWV2ZW50LnN0YXRlfSk7XG4gIH1cblxuICBoYW5kbGVDbGljayhldmVudCkge1xuICAgIGlmIChldmVudC5idXR0b24gPT09IDEgfHwgZXZlbnQubWV0YUtleSB8fCBldmVudC5jdHJsS2V5IHx8IGV2ZW50LnNoaWZ0S2V5IHx8IGV2ZW50LmRlZmF1bHRQcmV2ZW50ZWQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICAvLyBFbnN1cmUgbGlua1xuICAgIHZhciBlbCA9IGV2ZW50LnRhcmdldDtcbiAgICB3aGlsZSAoZWwgJiYgZWwubm9kZU5hbWUgIT09ICdBJykge1xuICAgICAgZWwgPSBlbC5wYXJlbnROb2RlO1xuICAgIH1cbiAgICBpZiAoIWVsIHx8IGVsLm5vZGVOYW1lICE9PSAnQScpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICAvLyBJZ25vcmUgaWYgdGFnIGhhc1xuICAgIC8vIDEuIFwiZG93bmxvYWRcIiBhdHRyaWJ1dGVcbiAgICAvLyAyLiByZWw9XCJleHRlcm5hbFwiIGF0dHJpYnV0ZVxuICAgIGlmIChlbC5nZXRBdHRyaWJ1dGUoJ2Rvd25sb2FkJykgfHwgZWwuZ2V0QXR0cmlidXRlKCdyZWwnKSA9PT0gJ2V4dGVybmFsJykge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIC8vIEVuc3VyZSBub24taGFzaCBmb3IgdGhlIHNhbWUgcGF0aFxuICAgIHZhciBsaW5rID0gZWwuZ2V0QXR0cmlidXRlKCdocmVmJyk7XG4gICAgaWYgKGVsLnBhdGhuYW1lID09PSBsb2NhdGlvbi5wYXRobmFtZSAmJiAoZWwuaGFzaCB8fCBsaW5rID09PSAnIycpKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgLy8gQ2hlY2sgZm9yIG1haWx0bzogaW4gdGhlIGhyZWZcbiAgICBpZiAobGluayAmJiBsaW5rLmluZGV4T2YoJ21haWx0bzonKSA+IC0xKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgLy8gQ2hlY2sgdGFyZ2V0XG4gICAgaWYgKGVsLnRhcmdldCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIC8vIFgtb3JpZ2luXG4gICAgdmFyIG9yaWdpbiA9IHdpbmRvdy5sb2NhdGlvbi5wcm90b2NvbCArICcvLycgKyB3aW5kb3cubG9jYXRpb24uaG9zdG5hbWUgK1xuICAgICAgKHdpbmRvdy5sb2NhdGlvbi5wb3J0ID8gJzonICsgd2luZG93LmxvY2F0aW9uLnBvcnQgOiAnJyk7XG4gICAgaWYgKCEoZWwuaHJlZiAmJiBlbC5ocmVmLmluZGV4T2Yob3JpZ2luKSA9PT0gMCkpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICAvLyBSZWJ1aWxkIHBhdGhcbiAgICB2YXIgcGF0aCA9IGVsLnBhdGhuYW1lICsgZWwuc2VhcmNoICsgKGVsLmhhc2ggfHwgJycpO1xuXG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICBBcHBBY3Rpb25zLmxvYWRQYWdlKHBhdGgsICgpID0+IHtcbiAgICAgIEFwcEFjdGlvbnMubmF2aWdhdGVUbyhwYXRoKTtcbiAgICB9KTtcbiAgfVxuXG59XG5cbmV4cG9ydCBkZWZhdWx0IHNldFZpZXdwb3J0KEFwcCk7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL34vZXNsaW50LWxvYWRlciEuL3NyYy9jb21wb25lbnRzL0FwcC9BcHAuanNcbiAqKi8iLCIvKlxuICogUmVhY3QuanMgU3RhcnRlciBLaXRcbiAqIENvcHlyaWdodCAoYykgMjAxNCBLb25zdGFudGluIFRhcmt1cyAoQGtvaXN0eWEpLCBLcmlhU29mdCBMTEMuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFLnR4dCBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuICovXG5cbmltcG9ydCBSZWFjdCwgeyBDb21wb25lbnQgfSBmcm9tICdyZWFjdCc7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdW51c2VkLXZhcnNcbmltcG9ydCB7IGNhblVzZURPTSB9IGZyb20gJ3JlYWN0L2xpYi9FeGVjdXRpb25FbnZpcm9ubWVudCc7XG5cbmZ1bmN0aW9uIHNldFZpZXdwb3J0KENvbXBvc2VkQ29tcG9uZW50KSB7XG4gIHJldHVybiBjbGFzcyBBcHBWaWV3cG9ydCBleHRlbmRzIENvbXBvbmVudCB7XG5cbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgIHN1cGVyKCk7XG5cbiAgICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICAgIHZpZXdwb3J0OiBjYW5Vc2VET00gP1xuICAgICAgICAgIHt3aWR0aDogd2luZG93LmlubmVyV2lkdGgsIGhlaWdodDogd2luZG93LmlubmVySGVpZ2h0fSA6XG4gICAgICAgICAge3dpZHRoOiAxMzY2LCBoZWlnaHQ6IDc2OH0gLy8gRGVmYXVsdCBzaXplIGZvciBzZXJ2ZXItc2lkZSByZW5kZXJpbmdcbiAgICAgIH07XG5cbiAgICAgIHRoaXMuaGFuZGxlUmVzaXplID0gKCkgPT4ge1xuICAgICAgICBsZXQgdmlld3BvcnQgPSB7d2lkdGg6IHdpbmRvdy5pbm5lcldpZHRoLCBoZWlnaHQ6IHdpbmRvdy5pbm5lckhlaWdodH07XG4gICAgICAgIGlmICh0aGlzLnN0YXRlLnZpZXdwb3J0LndpZHRoICE9PSB2aWV3cG9ydC53aWR0aCB8fFxuICAgICAgICAgIHRoaXMuc3RhdGUudmlld3BvcnQuaGVpZ2h0ICE9PSB2aWV3cG9ydC5oZWlnaHQpIHtcbiAgICAgICAgICB0aGlzLnNldFN0YXRlKHt2aWV3cG9ydDogdmlld3BvcnR9KTtcbiAgICAgICAgfVxuICAgICAgfTtcbiAgICB9XG5cbiAgICBjb21wb25lbnREaWRNb3VudCgpIHtcbiAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCB0aGlzLmhhbmRsZVJlc2l6ZSk7XG4gICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignb3JpZW50YXRpb25jaGFuZ2UnLCB0aGlzLmhhbmRsZVJlc2l6ZSk7XG4gICAgfVxuXG4gICAgY29tcG9uZW50V2lsbFVubW91bnQoKSB7XG4gICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcigncmVzaXplJywgdGhpcy5oYW5kbGVSZXNpemUpO1xuICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ29yaWVudGF0aW9uY2hhbmdlJywgdGhpcy5oYW5kbGVSZXNpemUpO1xuICAgIH1cblxuICAgIHJlbmRlcigpIHtcbiAgICAgIHJldHVybiA8Q29tcG9zZWRDb21wb25lbnQgey4uLnRoaXMucHJvcHN9IHZpZXdwb3J0PXt0aGlzLnN0YXRlLnZpZXdwb3J0fS8+O1xuICAgIH1cblxuICB9O1xufVxuXG5leHBvcnQgZGVmYXVsdCBzZXRWaWV3cG9ydDtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vfi9lc2xpbnQtbG9hZGVyIS4vc3JjL2NvbXBvbmVudHMvQXBwL3NldFZpZXdwb3J0LmpzXG4gKiovIiwiLypcbiAqIFJlYWN0LmpzIFN0YXJ0ZXIgS2l0XG4gKiBDb3B5cmlnaHQgKGMpIDIwMTQgS29uc3RhbnRpbiBUYXJrdXMgKEBrb2lzdHlhKSwgS3JpYVNvZnQgTExDLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRS50eHQgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiAqL1xuXG5pbXBvcnQgJy4vQ29udGVudFBhZ2UubGVzcyc7XG5pbXBvcnQgUmVhY3QsIHsgUHJvcFR5cGVzIH0gZnJvbSAncmVhY3QnOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVudXNlZC12YXJzXG5cbmNsYXNzIENvbnRlbnRQYWdlIHtcblxuICBzdGF0aWMgcHJvcFR5cGVzID0ge1xuICAgIGJvZHk6IFByb3BUeXBlcy5zdHJpbmcuaXNSZXF1aXJlZFxuICB9O1xuXG4gIHJlbmRlcigpIHtcbiAgICB2YXIgeyBjbGFzc05hbWUsIGJvZHksIG90aGVyIH0gPSB0aGlzLnByb3BzO1xuXG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgY2xhc3NOYW1lPXsnQ29udGVudFBhZ2UgJyArIGNsYXNzTmFtZX1cbiAgICAgICAgZGFuZ2Vyb3VzbHlTZXRJbm5lckhUTUw9e3tfX2h0bWw6IGJvZHl9fSB7Li4ub3RoZXJ9IC8+XG4gICAgKTtcbiAgfVxuXG59XG5cbmV4cG9ydCBkZWZhdWx0IENvbnRlbnRQYWdlO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9+L2VzbGludC1sb2FkZXIhLi9zcmMvY29tcG9uZW50cy9Db250ZW50UGFnZS9Db250ZW50UGFnZS5qc1xuICoqLyIsIi8qXG4gKiBSZWFjdC5qcyBTdGFydGVyIEtpdFxuICogQ29weXJpZ2h0IChjKSAyMDE0IEtvbnN0YW50aW4gVGFya3VzIChAa29pc3R5YSksIEtyaWFTb2Z0IExMQy5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UudHh0IGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4gKi9cblxuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JzsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby11bnVzZWQtdmFyc1xuXG5jbGFzcyBOYXZiYXIge1xuXG4gIHJlbmRlcigpIHtcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJuYXZiYXItdG9wXCIgcm9sZT1cIm5hdmlnYXRpb25cIj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb250YWluZXJcIj5cbiAgICAgICAgICA8YSBjbGFzc05hbWU9XCJuYXZiYXItYnJhbmQgcm93XCIgaHJlZj1cIi9cIj5cbiAgICAgICAgICAgIDxpbWcgc3JjPXtyZXF1aXJlKCcuL2xvZ28tc21hbGwucG5nJyl9IHdpZHRoPVwiMzhcIiBoZWlnaHQ9XCIzOFwiIGFsdD1cIlJlYWN0XCIgLz5cbiAgICAgICAgICAgIDxzcGFuPlJlYWN0LmpzIFN0YXJ0ZXIgS2l0PC9zcGFuPlxuICAgICAgICAgIDwvYT5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG5cbn1cblxuZXhwb3J0IGRlZmF1bHQgTmF2YmFyO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9+L2VzbGludC1sb2FkZXIhLi9zcmMvY29tcG9uZW50cy9OYXZiYXIvTmF2YmFyLmpzXG4gKiovIiwiLypcbiAqIFJlYWN0LmpzIFN0YXJ0ZXIgS2l0XG4gKiBDb3B5cmlnaHQgKGMpIDIwMTQgS29uc3RhbnRpbiBUYXJrdXMgKEBrb2lzdHlhKSwgS3JpYVNvZnQgTExDLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRS50eHQgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiAqL1xuXG4vL2ltcG9ydCAnLi9Ob3RGb3VuZFBhZ2UubGVzcyc7XG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVudXNlZC12YXJzXG5cbmNsYXNzIE5vdEZvdW5kUGFnZSB7XG5cbiAgcmVuZGVyKCkge1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2PlxuICAgICAgICA8aDE+UGFnZSBOb3QgRm91bmQ8L2gxPlxuICAgICAgICA8cD5Tb3JyeSwgYnV0IHRoZSBwYWdlIHlvdSB3ZXJlIHRyeWluZyB0byB2aWV3IGRvZXMgbm90IGV4aXN0LjwvcD5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cblxufVxuXG5leHBvcnQgZGVmYXVsdCBOb3RGb3VuZFBhZ2U7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL34vZXNsaW50LWxvYWRlciEuL3NyYy9jb21wb25lbnRzL05vdEZvdW5kUGFnZS9Ob3RGb3VuZFBhZ2UuanNcbiAqKi8iLCJleHBvcnRzID0gbW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9saWIvY3NzLWJhc2UuanNcIikoKTtcbmV4cG9ydHMucHVzaChbbW9kdWxlLmlkLCBcIi8qXFxuICogUmVhY3QuanMgU3RhcnRlciBLaXRcXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTQgS29uc3RhbnRpbiBUYXJrdXMgKEBrb2lzdHlhKSwgS3JpYVNvZnQgTExDLlxcbiAqXFxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXFxuICogTElDRU5TRS50eHQgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cXG4gKi9cXG5cIiwgXCJcIl0pO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zcmMvY29tcG9uZW50cy9BcHAvQXBwLmxlc3NcbiAqKiBtb2R1bGUgaWQgPSAxN1xuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiZXhwb3J0cyA9IG1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvbGliL2Nzcy1iYXNlLmpzXCIpKCk7XG5leHBvcnRzLnB1c2goW21vZHVsZS5pZCwgXCIvKlxcbiAqIFJlYWN0LmpzIFN0YXJ0ZXIgS2l0XFxuICogQ29weXJpZ2h0IChjKSAyMDE0IEtvbnN0YW50aW4gVGFya3VzIChAa29pc3R5YSksIEtyaWFTb2Z0IExMQy5cXG4gKlxcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxcbiAqIExJQ0VOU0UudHh0IGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXFxuICovXFxuXCIsIFwiXCJdKTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc3JjL2NvbXBvbmVudHMvQ29udGVudFBhZ2UvQ29udGVudFBhZ2UubGVzc1xuICoqIG1vZHVsZSBpZCA9IDE4XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IFwiZGF0YTppbWFnZS9wbmc7YmFzZTY0LGlWQk9SdzBLR2dvQUFBQU5TVWhFVWdBQUFDWUFBQUFtQ0FZQUFBQ29QZW11QUFBQUdYUkZXSFJUYjJaMGQyRnlaUUJCWkc5aVpTQkpiV0ZuWlZKbFlXUjVjY2xsUEFBQUNyUkpSRUZVZU5xY1dBbFFsRmNTbm9zQmhtRm1CQWFWRzBSQUVCUVZVVWgyalJLamlLSkdFZkZFOFlpc0drdzA2NnJybWQybzViV2FhSXlhUXVNUm8vRUFpUkc4U29qeHdBTUZFUVdFa1VNWWtCbG1tSHRtdS8vOWYrcnRYemhGUWxYWFBON3IxOTJ2WC9mWC9YNCt4LzRmRjRnSHhBY1NBRG5RdndKNmprc1RoeGh6NlRVK3pVL3U0Ukg4ZHYvNDNUQ0tNVWhJa3lQOXkyY1p4K1ozWlBHVGgvblRocEZLR09GT0JBbHA1WHlhaisxVmh0K1o0Ty9LTU51N0RCUFlNWm94REpVNGk3Mzl4ZS85NitCSUIxZXBYRnRmKzdwNHg5cDdxdW9LTGF5WmdVeEFGdUt3MVBWSkEwTmNCbisySmNiRnk4L0gxSzVxTHZ6SHdtdWF1aG9OYlJ3YVphV3BTOCs4eTVOQytyU2lQaFBTZk9NMmYzTlk0T3dTempCWUxlYTNiUldsaDM2ZGwzaGMzOUprSkJUd25OdzloUjhkeVpzaEM0bkk0UEVGUFpnOVpwMjI3UGI2cFJrdnp4K3JoWDg3Z1BSQVJ1SlFkcStTdVVaSG1rU2pEK2R1QWs5RmxoL2ZuMW13ZU5KMkxwZGJpQjZVQnZTZEV6Wjk0UWhRK0t6NThWMzBtblA0N0wvMUhiWC83RDV4YjkveEhVME4xeXQrUFBUVjFjd3AyL2xDeDBKNTlMQ3BudEd4M3FWSGRsK2xqYkhTSHJkMXgyTmMybHNZSHlKWm56QzNpWmNlMzNuNy9FbjJoZVFoaDBuWHg2N2ROVGhrNnJ5TlBBY0hTVm4yM2kwNEZ6NW42VnFyeWFTdStPbkkranRic29ySjBKaVk4MkMrckcvRW5QUGpCc1MyVlphMzBsN1QwVjZ6c2VQSUxreUVwTXdQNFBKNG9wYlNody9wMHhscE1vSGlraXZ6eHkwenRMVXFJdVl1MzRpRVk1ekROVHIyR0g0emVQVWh5Z3BKeVFna0VvZjdyZ0IvbDJHVWNjNGVQYWtZMGI2cGE2ZFB4UVF0cmd2ZTNDL1V2emp6L1VVdW4rK0k5UHpIUXhkd2prNGNMczFMN2V0b2JrUVpIR2NQVHhsaEZQZVBaR1VuU0pwMUhkU0VrOHhkeXVLbnNpOHdNY1UvSXYzVEpSM05EZFU0R1pueFdXYmJpekpGZGQ1cERXRWNwY3RSNWliNTN5SHI5U3djdE9zeE5zcFQrTlY0djdBTkZ4MWxQWHJEand0SnJqNEJrcmhOWDYrMm1rM0cvUGxKKzVCd2pITzR4dUlYT2NuY1VBWkhXWEpQUXdDMm9LdHI1WFdCMmd3NFVyL1ZPYWZVb0t4ZDdCT0lVT0VLSklQcmxRZU5ueDc2NGVGTFdVS0p6S2ZsNllQZis4OWZFWVdFWTV6RE5lUkJYdHdESkJGN0IvUkRXYlg1RnpybzVISmtWWVpPZTlpMWpUbUZDMjJFQkxCTE9xV2dmSmZBV1NUVktac1V6cDY5QWgxRVlvL3VsaGFNTFZPSFJxbHJhcXlHMlBLRjBGQ2RTUWpMQW9oUndab2FDT05PU3lRSndvaUZTeFJZSVZGeVJLR3BDL3FHejE0NjI5VXZLQUV3Q0UvTTZYaFQ5N0pkVVYxbFVMMVYrWTFNbXF5cHIzMXk2NHQ1QncxdExVWk52UUtGYzhSZXZpNk9NbmZoKzF1UExCUjcrVVhXWHN2OTJWSGFRK3JxR3hnazZ1a2RqRHdXbzZHdHZiYXFvT3pvM3FQUFQzMzNnZ0JiQm5ETmZGWnRFL21PVFBJY2V5eC9VOUM0YWV1RVVwbC9lMDFsVVgxUlFVR1AwTWlZRjJlelQ5LzROQzAvSW4zNU1HZDVUKzliSzlPM3dWcXp2cVhaYURVYXJFZ3dOa0haMGFtckt5b0NrMUlTVEpyMmxrdXBmemtGUnVybEEyT0hWT1djM0E4SGJaY0VCSS8wR3psK1ptaHFoci82MWNzSHdHOGlzNTVQRkZyUjhQVjdCdy8rL010c0J4ZlhVT1dUNG9OWFA1bTg1ZUdlRFlVMVY4N1ZBS0svSjVMM2xvQzNHc0puWmFiWDNicHk5dUhlVFEvd1NvT1NVdjFqMSt4SURKNDBLOHBxTm12ZVZqeFZxMnRlZHNpallteTlZMGNrcWFxZTN3dEptVGNTTU15Y095VitEMVNRbTRwcnVXZmN3NlBid01CSkFXTStuZ1N5SDcyKytVc3pBVWRVWUhvSGpKMHlkTTR6blhMbW83ZlBnaWZPR2d0ejBVQ0RFT0NCUm8wK2ZDbDdicm5CbEhLenFoUjRXcHpjNUhOaFBqVjYyZnB0YzUvcFRla1ZKaHNTanFPWGI5aU9hM0NsYzRDM0dmZmdYcFNCc21pWktEc2FkYUZPMUkwMm9DMW9VeWM4RE14Y204TGw4bHh2L3pOekpSVFpSaHExOVhUSjBCWHZXSlBEc2Rrc0xyMTl3eFZYYzg3b1c1c3hMbXhoTXhhbkFyQjI0aHVPdzlJV1RjTTFpRDBkOFA2TWUyQ3Z0WGpYdWx4R0hpM2JoTHBRSitwR0d4ajQ2RXhQb2F2RTEyTFExMVZlUE5GTTlFcFdKa3RheWg2cGRhMU5MOUM0aDNzMy84YlVOaUcwUWV3MEpPWnNGQy9zd2IwQUpTcEdIbEVST0tnVGRZTU5Qa3kyOHhnRGRNbzNwUUFKL3RBL2hiRFFuOHBhdjRSa0w1RkhyMzZBTVB5aHE3ZVBaakJIMTl4WXpUWk0xOVRBelBFb1h0Z0RlOE5RUmhldE9RZDFvbTZ3b1l5Skx4N1Q2RUhhbndWc3FRU1EzRGw4dzc2QmRMWlNIUWIrUmk3NFBCbkEwUUNCL1p0WGZFS3lyRzg0bGloTzhjNTFQOUNZeFBSY3F1TGQ2NCtoVXVRQjNnbTRCL28zUTlTaVZjbWtUTlNCdWxBbjZrWWI2QkJDbXlnbWR5Qy9rS25wOFRPS2xYY2dpQzBwTnlweitzMWNrb2JCQ25HVGpFRTg0ZHpkbTVEeVdSQ29ocVNmaW43RkFFZUM4ak1mV3FEZFNEaG01cEVIZVhFUDdnVVpTcFNGTWxFMjZrQmRvUE11NmtZYmFGdEVYS0lrVUpBQnFDNUtQSGtqSFU2N2dDZHdrRUozV2dxZytncUVKd0YwN0h6MDlaZGxDUWZPamZYOVlOekUyeHVYcmlzLzhXMGwwOVNTOVJjYXlDRHd4aFlBMkhNQU81Y0hacTRKaDJ4ZDBmem9UaTZBYlFCMHVSRndBeW9vK04vbFRSL3hQVlNIRHJLcjVSTDNUVDQ2Uk5LZ1VJK1l2MitiNEI0UlBRYmlvei9HQ1FqU1F4elVBSWkrY1E4ZkdHOVF0ZGFWbnp4NHdtWTJXeUZMTlZRWDRpWVhjd1VDSGhpVzVpaDE4NEdrS1hSeWwvZUVtdWtQQjNYQ1JPaFFOajZGL3U3eXZhOVdYUUNNYXlFTU1qQmxxYXQzb0pDK1hnbE5ycWxGaXQwQWprTG9PcDlBUyswUFdlY3BjQkY3UUQvdlpLOUlRbHpwelZxTjB0aXVhb0pxVUFQZGNLVE5haldjaXZmTkl1cWttamJNU0R4cUxBSTZLeTJzVnd1UEtlalFLVGlCRi9xOEtTNDYvY3ZNVVNmSUt4dHpORCt0OTdBUnN4UTM4azdYRmx3c3gwbS9oQWxodmlNU1V4cCt2M0hzOHV3UC80OS83UEZyMDNzT2lwc0dNazFHZFp1ZXFJOTYyaWhHdjQzSHdpeW1kVFl3RytDRkpNUE9GQXA0QlgwNkZVM3Fna1VUajJzYlg1ZDR4eWVNaDY3Qlp0SnFiRGpHdWZ5TXBCL1kvUERzZTQ2eW9CNkxDQjNNOVpsSmJPT3hIcDgyQWdBcEl6MGlCMU5kSjdROERUUmlNMEdxZ3hUWFFXQnZBM0JVeDIzY2x4bS8rWnRNSEZOelJvT096YTl2VmFJTWpuekFVQW43NmdqOWRuditUZ081UEQ3MTVvT3MwUktJYmFHRm1pQ0lXMHNPYmovZ0lKWjRJT0VZNTFnUFlXb1B5TkJSbFVFczRiUFJ2N3M5UDdQQnFtMVFvQktPeEMvSWcwNFE4akZpZ1JiSWE4QW5xNWRZOURxS0Q4ZlEvcngrZW1SWEM2czc1dEV5T0xSTUs5bEpkUGVWMUZrblM3N2RWZzNaMVNZZkVCdEh3Z3FrdmhDQ2VWTE1xcTMvc1ZuTTJxSzFpMWNVcmxtVUJXUE5rSlgvM29OcnlFTzJ6aDVSUTRlakxKQlp4YnJDYm5tTVRBU3pTZHR1ME5ZcnpnTW96Z0JsTlZDSUs5ejZEUWoyaUJyeU1ZQnhDQVI2M2xWNG5RTmVVYzhwVmVXejlGRUh6cTNzRmZQK0YybjNteVlyUys2ZmFYMzIrS1Y3LzBFaDRMR3A3YTlmSFFlWlRMQy84enJ0ZmJ0d1lMN1l5SUw3dVkzSnZyTFZXZDRya2ZrZ1lsUzl2VnQvKzlxaDY4dFNpNGlNNnZ3WTg4R2VrM0ZlY2FNeWhOSWVzY3dlS1BoNStZdVNWOFBobEdUcjA5VzNDNjZkZHlYNVNZbnFjcUVJKzhtQ3d6MFYxL05xNGQzWVFnUzRtZlcxaCtrZzhOM3A3dlBYai93QTRadmdDbXVKSHM5QTdMWDlFY1BZYjB6eWljVWhJTVhVbGNlSUw0bDhJcUhJVHd4MnI1TGZuZWNYSys3STd4RkdBby9NUkVCYldJYVRmT1JCM2drWDNUSE1TaGhGS2pOMWNXb2JxN1NaQ1RMWkE5US9ZeGpiYXhiV3I4MU9abHU3NExWMlIrRi9CUmdBMkU5eGdYcDN4emdBQUFBQVNVVk9SSzVDWUlJPVwiXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NyYy9jb21wb25lbnRzL05hdmJhci9sb2dvLXNtYWxsLnBuZ1xuICoqIG1vZHVsZSBpZCA9IDE5XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJldmVudGVtaXR0ZXIzXCIpO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogZXh0ZXJuYWwgXCJldmVudGVtaXR0ZXIzXCJcbiAqKiBtb2R1bGUgaWQgPSAyMFxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiZXhwcmVzc1wiKTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIGV4dGVybmFsIFwiZXhwcmVzc1wiXG4gKiogbW9kdWxlIGlkID0gMjFcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImZsdXhcIik7XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiBleHRlcm5hbCBcImZsdXhcIlxuICoqIG1vZHVsZSBpZCA9IDIyXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJmcm9udC1tYXR0ZXJcIik7XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiBleHRlcm5hbCBcImZyb250LW1hdHRlclwiXG4gKiogbW9kdWxlIGlkID0gMjNcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImZzXCIpO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogZXh0ZXJuYWwgXCJmc1wiXG4gKiogbW9kdWxlIGlkID0gMjRcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImphZGVcIik7XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiBleHRlcm5hbCBcImphZGVcIlxuICoqIG1vZHVsZSBpZCA9IDI1XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJsb2Rhc2hcIik7XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiBleHRlcm5hbCBcImxvZGFzaFwiXG4gKiogbW9kdWxlIGlkID0gMjZcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInBhdGhcIik7XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiBleHRlcm5hbCBcInBhdGhcIlxuICoqIG1vZHVsZSBpZCA9IDI3XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJzdXBlcmFnZW50XCIpO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogZXh0ZXJuYWwgXCJzdXBlcmFnZW50XCJcbiAqKiBtb2R1bGUgaWQgPSAyOFxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIl0sInNvdXJjZVJvb3QiOiIifQ==