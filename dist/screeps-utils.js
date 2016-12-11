/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _screepsUtils = __webpack_require__(1);

	Object.keys(_screepsUtils).forEach(function (key) {
	  if (key === "default" || key === "__esModule") return;
	  Object.defineProperty(exports, key, {
	    enumerable: true,
	    get: function get() {
	      return _screepsUtils[key];
	    }
	  });
	});

	var _screepsUtils2 = _interopRequireDefault(_screepsUtils);

	var _creepMemoryCleanup = __webpack_require__(2);

	var _creepMemoryCleanup2 = _interopRequireDefault(_creepMemoryCleanup);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	(0, _screepsUtils.use)(_creepMemoryCleanup2.default);

	exports.default = _screepsUtils2.default;

/***/ },
/* 1 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	exports.use = use;
	exports.tick = tick;
	exports.enable = enable;
	/**
	 * @namespace ScreepsUtils
	 */

	var DEFAULT_MEMORY_PATH = '__utils';
	var DEFAULT_ASSIGN_GLOBAL = true;
	var DEFAULT_PLUGIN_ENABLE = true;
	var DEFAULT_TICK_ENABLE = true;

	var pluginRegistry = new Map();

	var tickCallbacks = new Set();

	var enabled = false;
	var memoryRoot = void 0;

	var GLOBALS = {};

	/**
	 * @memberOf {ScreepsUtils}
	 * @param {ScreepsUtils~Plugin} plugin
	 */
	function use(plugin) {
	  if (typeof plugin !== 'function') {
	    throw new TypeError('plugin ' + plugin + ' is not a function');
	  }
	  if (typeof plugin.name === 'undefined') {
	    throw new TypeError('plugin is not a named function');
	  }
	  pluginRegistry.set(plugin.name, plugin);
	}

	/**
	 * @memberOf {ScreepsUtils}
	 *
	 * @param {ScreepsUtils~tickCallback} [tickCallback]
	 */
	function tick(tickCallback) {
	  if (typeof tickCallback === 'function') {
	    tickCallbacks.add(tickCallback);
	    return;
	  }
	  tickCallbacks.forEach(function (callback) {
	    return callback(Game.time, memoryRoot);
	  });
	}

	/**
	 * @callback ScreepsUtils~tickCallback
	 * @param {number} currentTick
	 * @param {object} memory
	 */

	/**
	 * @typedef {object} ScreepsUtils~PluginReturn
	 * @property {object} [globals]
	 * @property {ScreepsUtils~tickCallback} [tick]
	 */

	/**
	 * @typedef {object} ScreepsUtils~PluginOptions
	 * @property {boolean} [enable=true]
	 * @property {boolean} [global]
	 * @property {boolean} [tick]
	 */

	/**
	 * @callback ScreepsUtils~Plugin
	 * @param {ScreepsUtils~PluginOptions} [options]
	 * @returns {ScreepsUtils~PluginReturn|boolean} - return false if the plugin should be disabled
	 */

	/**
	 * @typedef {object} ScreepsUtils~Options
	 * @property {boolean} [global=true]
	 * @property {boolean} [tick=true]
	 * @property {object.<boolean>,<ScreepsUtils~PluginOptions>} [plugins={}]
	 * @property {object} [memory=Memory.__utils] - path
	 */

	/**
	 * @memberOf {ScreepsUtils}
	 *
	 * @param {ScreepsUtils~Options} [options]
	 *
	 * @throws {Error} - if ScreepsUtils has already been enabled
	 */
	function enable() {
	  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

	  if (enabled) {
	    throw new Error('ScreepsUtils is already enabled.');
	  }

	  var _options$global = options.global,
	      assignGlobal = _options$global === undefined ? DEFAULT_ASSIGN_GLOBAL : _options$global,
	      _options$plugins = options.plugins,
	      plugins = _options$plugins === undefined ? {} : _options$plugins,
	      _options$memory = options.memory,
	      memory = _options$memory === undefined ? Memory[DEFAULT_MEMORY_PATH] = Memory[DEFAULT_MEMORY_PATH] || {} : _options$memory,
	      _options$tick = options.tick,
	      tickEnable = _options$tick === undefined ? DEFAULT_TICK_ENABLE : _options$tick;


	  memoryRoot = memory;

	  pluginRegistry.forEach(function (plugin) {
	    var name = plugin.name;
	    var pluginOptions = plugins[name];

	    if (typeof pluginOptions === 'undefined') {
	      pluginOptions = {};
	    }

	    if (typeof pluginOptions === 'boolean') {
	      pluginOptions = {
	        enable: pluginOptions
	      };
	    }

	    var _pluginOptions = pluginOptions,
	        _pluginOptions$enable = _pluginOptions.enable,
	        pluginEnable = _pluginOptions$enable === undefined ? DEFAULT_PLUGIN_ENABLE : _pluginOptions$enable,
	        _pluginOptions$global = _pluginOptions.global,
	        pluginAssignGlobal = _pluginOptions$global === undefined ? assignGlobal : _pluginOptions$global,
	        _pluginOptions$tick = _pluginOptions.tick,
	        pluginTickEnable = _pluginOptions$tick === undefined ? tickEnable : _pluginOptions$tick;


	    if (!pluginEnable) {
	      return;
	    }

	    /** @var {ScreepsUtils~PluginReturn} result */
	    var result = plugin(pluginOptions);

	    if (typeof result === 'boolean' && !result) {
	      return;
	    }

	    if ((typeof result === 'undefined' ? 'undefined' : _typeof(result)) !== 'object') {
	      return;
	    }

	    if (result.globals) {
	      Object.assign(GLOBALS, result.globals);
	      if (pluginAssignGlobal) {
	        Object.assign(global, result.globals);
	      }
	    }

	    if (pluginTickEnable && result.tick) {
	      tick(result.tick);
	    }
	  });

	  enabled = true;
	}

	exports.default = GLOBALS;

	/**
	 * @memberOf {ScreepsUtils}
	 */

	exports.globals = GLOBALS;

/***/ },
/* 2 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = creepMemoryCleanup;
	/**
	 * @typedef {ScreepsUtils~PluginOptions} ScreepsUtils~CreepMemoryCleanupPluginOptions
	 * @property {number} [cleanupInterval=100]
	 */

	function cleanup() {
	  Object.keys(Memory.creeps).forEach(function (creepName) {
	    if (!Game.creeps[creepName]) {
	      Memory.creeps[creepName] = undefined;
	    }
	  });
	}

	/**
	 * @param {ScreepsUtils~CreepMemoryCleanupPluginOptions} options
	 * @returns {ScreepsUtils~PluginReturn}
	 */
	function creepMemoryCleanup(options) {
	  var _options$cleanupInter = options.cleanupInterval,
	      cleanupInterval = _options$cleanupInter === undefined ? 100 : _options$cleanupInter;


	  return {
	    tick: function tick(currentTick, _memory) {
	      var memory = _memory;
	      memory.lastCleanup = memory.lastCleanup || Game.time;
	      if (currentTick - memory.lastCleanup > cleanupInterval) {
	        cleanup();
	      }
	    }
	  };
	}

/***/ }
/******/ ]);