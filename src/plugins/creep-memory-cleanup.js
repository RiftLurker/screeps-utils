/**
 * @typedef {ScreepsUtils~PluginOptions} ScreepsUtils~CreepMemoryCleanupPluginOptions
 * @property {number} [cleanupInterval=100]
 */

function cleanup() {
  Object.keys(Memory.creeps).forEach((creepName) => {
    if (!Game.creeps[creepName]) {
      Memory.creeps[creepName] = undefined;
    }
  });
}

/**
 * @param {ScreepsUtils~CreepMemoryCleanupPluginOptions} options
 * @returns {ScreepsUtils~PluginReturn}
 */
export default function creepMemoryCleanup(options) {
  const { cleanupInterval = 100 } = options;

  return {
    tick: (currentTick, _memory) => {
      const memory = _memory;
      memory.lastCleanup = memory.lastCleanup || Game.time;
      if (currentTick - memory.lastCleanup > cleanupInterval) {
        cleanup();
      }
    },
  };
}
