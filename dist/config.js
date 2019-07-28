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
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/ 	__webpack_require__.p = "./";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./project-folder/web-blog/src/js/entry/config.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./project-folder/web-blog/src/js/config/cdn-host.js":
/*!***********************************************************!*\
  !*** ./project-folder/web-blog/src/js/config/cdn-host.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _env = __webpack_require__(/*! ./env */ \"./project-folder/web-blog/src/js/config/env.js\");\n\nvar _env2 = _interopRequireDefault(_env);\n\nvar _param = __webpack_require__(/*! util/param */ \"./project-folder/web-blog/src/js/util/param.js\");\n\nvar _param2 = _interopRequireDefault(_param);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nvar _window = window,\n    location = _window.location;\n// import 'common/widget/whatwg-fetch';\n// 设置公私有cdn云地址\n\nvar _protocol = location.protocol === 'file:' ? 'http:' : location.protocol;\n\nvar host = {\n  production: '' + _param2.default.cdnHref,\n  test: _protocol + '//192.168.1.251:8282/fed/web-cdn',\n  cloud: location.origin + '/fed/web-cdn'\n}[_env2.default];\n\nexports.default = host;\n\n//# sourceURL=webpack:///./project-folder/web-blog/src/js/config/cdn-host.js?");

/***/ }),

/***/ "./project-folder/web-blog/src/js/config/env.js":
/*!******************************************************!*\
  !*** ./project-folder/web-blog/src/js/config/env.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _param = __webpack_require__(/*! util/param */ \"./project-folder/web-blog/src/js/util/param.js\");\n\nvar _param2 = _interopRequireDefault(_param);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\n// 参数对象\n\nvar _window = window,\n    location = _window.location;\n/**\r\n * 环境ios中默认 2为正式 3为外侧\r\n * 如果是应用内部本地调用去除 !location.host 的条件\r\n */\n/**\r\n * 环境判断\r\n * shaokr 2017.1.13\r\n */\n\nvar env = function () {\n  var envmark = 3;\n\n  if (!location.host || ~location.host.lastIndexOf('127.0.0.1') || ~location.host.lastIndexOf('localhost') || ~location.host.lastIndexOf('192.168.1.48:8080')) {\n    envmark = 2;\n  }\n\n  envmark = _param2.default.env || _param2.default.envmark || window.envmark || window.env || envmark;\n  var type = [\n  // 环境配置\n  {\n    env: 'production', // 正式\n    scope: {\n      // 环境条件\n      1: 1\n    }\n  }, {\n    env: 'test', // 外侧\n    scope: {\n      2: 1\n    }\n  }, {\n    env: 'cloud', // 私有\n    scope: {\n      3: 1\n    }\n  }];\n\n  var _env = type[0].env; // 默认第一个元素为正式环境\n\n  for (var i = 0, l = type.length; i < l; i++) {\n    if (type[i].scope[envmark]) {\n      _env = type[i].env;\n      break;\n    }\n  }\n  return _env;\n}();\n\nexports.default = env;\n\n//# sourceURL=webpack:///./project-folder/web-blog/src/js/config/env.js?");

/***/ }),

/***/ "./project-folder/web-blog/src/js/entry/config.js":
/*!********************************************************!*\
  !*** ./project-folder/web-blog/src/js/entry/config.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar _systemjs = __webpack_require__(/*! systemjs */ \"systemjs\");\n\nvar _systemjs2 = _interopRequireDefault(_systemjs);\n\nvar _cdnHost2 = __webpack_require__(/*! config/cdn-host */ \"./project-folder/web-blog/src/js/config/cdn-host.js\");\n\nvar _cdnHost3 = _interopRequireDefault(_cdnHost2);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\n/* eslint guard-for-in: \"off\", quote-props: \"off\", dot-notation: \"off\" */\n/**\r\n * systemjs加载配置\r\n */\n\nvar _window = window,\n    SystemJSConfig = _window.SystemJSConfig,\n    fedBuildDate = _window.fedBuildDate;\n\n\nvar cdnHost = _cdnHost3.default;\n\nif (true) {\n  cdnHost = 'http://localhost:8080/web-cdn/release';\n}\n\nvar mapListObj = {\n  // 自定义map和依赖关系,可覆盖cdn中的配置(注释的是例子\n  map: {\n    // 旯里去获取到这个module\n  },\n  meta: {\n    // map的依赖关系\n    // 'ReactDom': {\n    //     deps: ['React']\n    // }\n  }\n};\n\nvar mainListObj = {\n  // 载入文件的配置\n  _main: {\n    // 入口文件 签名\n    ToLoad: true, // 是否马上加载\n    // 依赖库\n    deps: ['react', 'react-router-dom', 'mobx', 'mobx-react']\n  }\n};\nfor (var key in SystemJSConfig.meta) {\n  var itme = SystemJSConfig.meta[key];\n  var _key = key;\n  if (!mainListObj[_key]) {\n    // 如果全局文件配置中没有config这里的依赖\n    mainListObj[_key] = {\n      // 就给依赖加上空deps\n      deps: []\n    };\n  }\n  if (!mainListObj[_key].deps) {\n    // 如果全局配置中有config的依赖但没有设置deps,加之\n    mainListObj[_key].deps = [];\n  }\n  if (itme.depsCss) {\n    // 如果全局配置中有depsCss,config的也把它依赖上\n    mainListObj[_key].deps = mainListObj[_key].deps.concat(itme.depsCss);\n  }\n}\n_systemjs2.default.import(cdnHost + '/config/2.3.0/config.js?' + fedBuildDate).then(function (res) {\n  // console.log(res);\n  // res中的map查看cdn目录下config.js文件\n  _systemjs2.default.config(res(cdnHost));\n  _systemjs2.default.config(mapListObj);\n  _systemjs2.default.config({\n    meta: mainListObj\n  });\n\n  for (var _key2 in mainListObj) {\n    var item = mainListObj[_key2];\n    if (item.ToLoad) {\n      _systemjs2.default.import(_key2);\n    }\n  }\n});\n\n//# sourceURL=webpack:///./project-folder/web-blog/src/js/entry/config.js?");

/***/ }),

/***/ "./project-folder/web-blog/src/js/util/param.js":
/*!******************************************************!*\
  !*** ./project-folder/web-blog/src/js/util/param.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n/**\r\n * 解析参数等\r\n * shaokr 2018.3.14\r\n */\nvar _window = window,\n    location = _window.location;\n/**\r\n * 传入url可解析url中的参数\r\n */\n\nvar getParam = exports.getParam = function getParam(url) {\n  var args = {};\n  var match = null;\n  var search = url.match(/\\?([^#]+)/);\n  if (search) {\n    search = search[1];\n    var reg = /(?:([^&]+)=([^&]*))/g;\n    while ((match = reg.exec(search)) !== null) {\n      if (match[1]) {\n        args[match[1]] = decodeURIComponent(match[2].replace(/\\+/g, '%20'));\n      }\n    }\n  }\n  return args;\n};\nvar getGash = exports.getGash = function getGash(url) {\n  var gash = url.match(/#(.+)/);\n  if (gash) {\n    return decodeURIComponent(gash[1].replace(/\\+/g, '%20'));\n  }\n};\n\n// 输出给外面的param处理\nvar param = getParam(location.href);\nvar debug = param.debug || window.debug;\nif (typeof debug !== 'undefined') {\n  param.debug = debug;\n}\nexports.default = param;\n\n//# sourceURL=webpack:///./project-folder/web-blog/src/js/util/param.js?");

/***/ }),

/***/ "systemjs":
/*!***************************!*\
  !*** external "SystemJS" ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = SystemJS;\n\n//# sourceURL=webpack:///external_%22SystemJS%22?");

/***/ })

/******/ });