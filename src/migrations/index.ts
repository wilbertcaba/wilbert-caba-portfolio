import * as migration_20240817_172121 from './20240817_172121';
import * as migration_20240817_172615_relationships_v2_v3 from './20240817_172615_relationships_v2_v3';

export const migrations = [
  {
    up: migration_20240817_172121.up,
    down: migration_20240817_172121.down,
    name: '20240817_172121',
  },
  {
    up: migration_20240817_172615_relationships_v2_v3.up,
    down: migration_20240817_172615_relationships_v2_v3.down,
    name: '20240817_172615_relationships_v2_v3'
  },
];
