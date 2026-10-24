import * as migration_20240817_172121 from './20240817_172121';
import * as migration_20240817_175630_relationships_v2_v3 from './20240817_175630_relationships_v2_v3';
import * as migration_20261016_231346_payload_3_91 from './20261016_231346_payload_3_91';
import * as migration_20261017_032135_homepage_skill_icons from './20261017_032135_homepage_skill_icons';
import * as migration_20261018_160802_add_project_eyebrow from './20261018_160802_add_project_eyebrow';
import * as migration_20261018_222822_add_project_sections_and_background from './20261018_222822_add_project_sections_and_background';
import * as migration_20261019_050722_add_seo_meta from './20261019_050722_add_seo_meta';
import * as migration_20261020_030600_experience_order from './20261020_030600_experience_order';
import * as migration_20261021_180215_add_open_graph_meta from './20261021_180215_add_open_graph_meta';
import * as migration_20261023_014700_projects_order from './20261023_014700_projects_order';
import * as migration_20261024_165011_add_project_drafts from './20261024_165011_add_project_drafts';

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
    name: '20261018_160802_add_project_eyebrow',
  },
  {
    up: migration_20261018_222822_add_project_sections_and_background.up,
    down: migration_20261018_222822_add_project_sections_and_background.down,
    name: '20261018_222822_add_project_sections_and_background',
  },
  {
    up: migration_20261019_050722_add_seo_meta.up,
    down: migration_20261019_050722_add_seo_meta.down,
    name: '20261019_050722_add_seo_meta',
  },
  {
    up: migration_20261020_030600_experience_order.up,
    down: migration_20261020_030600_experience_order.down,
    name: '20261020_030600_experience_order',
  },
  {
    up: migration_20261021_180215_add_open_graph_meta.up,
    down: migration_20261021_180215_add_open_graph_meta.down,
    name: '20261021_180215_add_open_graph_meta',
  },
  {
    up: migration_20261023_014700_projects_order.up,
    down: migration_20261023_014700_projects_order.down,
    name: '20261023_014700_projects_order',
  },
  {
    up: migration_20261024_165011_add_project_drafts.up,
    down: migration_20261024_165011_add_project_drafts.down,
    name: '20261024_165011_add_project_drafts'
  },
];
