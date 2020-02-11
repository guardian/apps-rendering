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
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/client/liveblog.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/client/liveblog.ts":
/*!********************************!*\
  !*** ./src/client/liveblog.ts ***!
  \********************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var client_setup__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! client/setup */ \"./src/client/setup.ts\");\n// ----- Imports ----- //\n // ----- Run ----- //\n\nObject(client_setup__WEBPACK_IMPORTED_MODULE_0__[\"default\"])();\n\n//# sourceURL=webpack:///./src/client/liveblog.ts?");

/***/ }),

/***/ "./src/client/setup.ts":
/*!*****************************!*\
  !*** ./src/client/setup.ts ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n// ----- Procedures ----- //\nfunction handleMessage(interactive, message) {\n  try {\n    var {\n      type,\n      value\n    } = JSON.parse(message);\n\n    if (type === 'set-height') {\n      interactive.height = value;\n    }\n  } catch (e) {\n    console.error(e);\n  }\n}\n\nvar updateInteractives = interactives => (_ref) => {\n  var {\n    data,\n    source\n  } = _ref;\n  return interactives.forEach(elem => {\n    if (elem instanceof HTMLIFrameElement && source === elem.contentWindow) {\n      handleMessage(elem, data);\n    }\n  });\n};\n\nfunction interactives() {\n  var interactives = Array.from(document.querySelectorAll('.interactive iframe'));\n  window.addEventListener('message', updateInteractives(interactives), false);\n}\n\nfunction twitter() {\n  var _a, _b, _c;\n\n  var isDarkMode = (_b = (_a = window) === null || _a === void 0 ? void 0 : _a.matchMedia('(prefers-color-scheme: dark)').matches, _b !== null && _b !== void 0 ? _b : false);\n  var themeMeta = document.getElementById('twitter-theme');\n\n  if (isDarkMode) {\n    (_c = themeMeta) === null || _c === void 0 ? void 0 : _c.setAttribute('content', 'dark');\n  }\n}\n\nfunction setup() {\n  interactives();\n  twitter();\n} // ----- Exports ----- //\n\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (setup);\n\n//# sourceURL=webpack:///./src/client/setup.ts?");

/***/ })

/******/ });