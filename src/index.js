import __default, { use } from './screeps-utils';

import creepMemoryCleanup from './plugins/creep-memory-cleanup';

use(creepMemoryCleanup);

export * from './screeps-utils';
export default __default;
