import * as migration_20240817_172121 from './20240817_172121';
import * as migration_20240817_175630_relationships_v2_v3 from './20240817_175630_relationships_v2_v3';
import * as migration_20261016_231346_payload_3_91 from './20261016_231346_payload_3_91';
import * as migration_20261017_032135_homepage_skill_icons from './20261017_032135_homepage_skill_icons';
import * as migration_20261018_160802_add_project_eyebrow from './20261018_160802_add_project_eyebrow';

export const migrations = [
  {
    up: migration_20240817_172121.up,
    down: migration_20240817_172121.down,
    name: '20240817_172121',
  },
  {
    up: migration_20240817_175630_relationships_v2_v3.up,
    down: migration_20240817_175630_relationships_v2_v3.down,
    name: '20240817_175630_relationships_v2_v3',
  },
  {
    up: migration_20261016_231346_payload_3_91.up,
    down: migration_20261016_231346_payload_3_91.down,
    name: '20261016_231346_payload_3_91',
  },
  {
    up: migration_20261017_032135_homepage_skill_icons.up,
    down: migration_20261017_032135_homepage_skill_icons.down,
    name: '20261017_032135_homepage_skill_icons',
  },
  {
    up: migration_20261018_160802_add_project_eyebrow.up,
    down: migration_20261018_160802_add_project_eyebrow.down,
    name: '20261018_160802_add_project_eyebrow'
  },
];
