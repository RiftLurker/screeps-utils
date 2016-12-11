/**
 * @namespace ScreepsUtils
 */

const DEFAULT_MEMORY_PATH = '__utils';
const DEFAULT_ASSIGN_GLOBAL = true;
const DEFAULT_PLUGIN_ENABLE = true;
const DEFAULT_TICK_ENABLE = true;

const pluginRegistry = new Map();

const tickCallbacks = new Set();

let enabled = false;
let memoryRoot;

const GLOBALS = {};

/**
 * @memberOf {ScreepsUtils}
 * @param {ScreepsUtils~Plugin} plugin
 */
export function use(plugin) {
  if (typeof plugin !== 'function') {
    throw new TypeError(`plugin ${plugin} is not a function`);
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
export function tick(tickCallback) {
  if (typeof tickCallback === 'function') {
    tickCallbacks.add(tickCallback);
    return;
  }
  tickCallbacks.forEach(callback => callback(Game.time, memoryRoot));
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
export function enable(options = {}) {
  if (enabled) {
    throw new Error('ScreepsUtils is already enabled.');
  }

  const {
    global: assignGlobal = DEFAULT_ASSIGN_GLOBAL,
    plugins = {},
    memory = (Memory[DEFAULT_MEMORY_PATH] = Memory[DEFAULT_MEMORY_PATH] || {}),
    tick: tickEnable = DEFAULT_TICK_ENABLE,
  } = options;

  memoryRoot = memory;

  pluginRegistry.forEach((plugin) => {
    const name = plugin.name;
    let pluginOptions = plugins[name];

    if (typeof pluginOptions === 'undefined') {
      pluginOptions = {};
    }

    if (typeof pluginOptions === 'boolean') {
      pluginOptions = {
        enable: pluginOptions,
      };
    }

    const {
      enable: pluginEnable = DEFAULT_PLUGIN_ENABLE,
      global: pluginAssignGlobal = assignGlobal,
      tick: pluginTickEnable = tickEnable,
    } = pluginOptions;

    if (!pluginEnable) {
      return;
    }

    /** @var {ScreepsUtils~PluginReturn} result */
    const result = plugin(pluginOptions);

    if (typeof result === 'boolean' && !result) {
      return;
    }

    if (typeof result !== 'object') {
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

export default GLOBALS;

/**
 * @memberOf {ScreepsUtils}
 */
export { GLOBALS as globals };
