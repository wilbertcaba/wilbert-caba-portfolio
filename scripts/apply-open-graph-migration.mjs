import { loadEnvConfig } from "@next/env";
import pg from "pg";

loadEnvConfig(process.cwd(), true);

const migrationName = "20261021_180215_add_open_graph_meta";
const tables = [
    "users",
    "projects",
    "projects_tags",
    "projects_sections",
    "experience",
    "media",
    "homepage",
    "homepage_skills",
    "main_navigation",
    "main_navigation_navigation",
    "payload_migrations",
];

const fingerprintSql = `
SELECT
  (SELECT md5(coalesce(string_agg(
    id::text || '|' || coalesce(logo_id::text,'') || '|' || coalesce(main_value_proposition,'') || '|' || coalesce(about_html,'') || '|' || coalesce(meta_title,'') || '|' || coalesce(meta_description,'') || '|' || coalesce(meta_image_id::text,'') || '|' || coalesce(resume_id::text,''),
    ',' ORDER BY id), '')) FROM homepage) AS homepage,
  (SELECT md5(coalesce(string_agg(id::text || '|' || coalesce(skill,'') || '|' || coalesce(icon_id::text,''), ',' ORDER BY _parent_id, _order, id), '')) FROM homepage_skills) AS homepage_skills,
  (SELECT md5(coalesce(string_agg(id::text || '|' || coalesce(title,'') || '|' || coalesce(slug,'') || '|' || coalesce(excerpt,'') || '|' || coalesce(meta_title,'') || '|' || coalesce(meta_description,'') || '|' || coalesce(meta_image_id::text,''), ',' ORDER BY id), '')) FROM projects) AS projects,
  (SELECT md5(coalesce(string_agg(id::text || '|' || coalesce(company,'') || '|' || coalesce(_order,''), ',' ORDER BY id), '')) FROM experience) AS experience
`;

const upSql = `
ALTER TABLE "projects" ADD COLUMN "meta_open_graph_title" varchar;
ALTER TABLE "projects" ADD COLUMN "meta_open_graph_description" varchar;
ALTER TABLE "projects" ADD COLUMN "meta_open_graph_image_id" integer;
ALTER TABLE "homepage" ADD COLUMN "meta_open_graph_title" varchar;
ALTER TABLE "homepage" ADD COLUMN "meta_open_graph_description" varchar;
ALTER TABLE "homepage" ADD COLUMN "meta_open_graph_image_id" integer;
ALTER TABLE "projects" ADD CONSTRAINT "projects_meta_open_graph_image_id_media_id_fk" FOREIGN KEY ("meta_open_graph_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
ALTER TABLE "homepage" ADD CONSTRAINT "homepage_meta_open_graph_image_id_media_id_fk" FOREIGN KEY ("meta_open_graph_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
CREATE INDEX "projects_meta_open_graph_meta_open_graph_image_idx" ON "projects" USING btree ("meta_open_graph_image_id");
CREATE INDEX "homepage_meta_open_graph_meta_open_graph_image_idx" ON "homepage" USING btree ("meta_open_graph_image_id");
`;

const client = new pg.Client({ connectionString: process.env.DATABASE_URI });
await client.connect();

async function snapshot() {
    const counts = {};
    for (const table of tables) {
        const { rows } = await client.query(`SELECT count(*)::int AS n FROM "${table}"`);
        counts[table] = rows[0].n;
    }
    const { rows: fingerprints } = await client.query(fingerprintSql);
    const { rows: columns } = await client.query(`
    SELECT table_name, column_name
    FROM information_schema.columns
    WHERE table_schema = 'public' AND column_name LIKE 'meta_open_graph%'
    ORDER BY table_name, column_name
  `);
    const { rows: migrations } = await client.query(`
    SELECT name, batch::int AS batch
    FROM payload_migrations
    ORDER BY batch, name
  `);
    return { counts, fingerprints: fingerprints[0], columns, migrations };
}

const before = await snapshot();
if (before.migrations.some((row) => row.name === migrationName)) {
    console.log(JSON.stringify({ status: "already-applied" }, null, 2));
    await client.end();
    process.exit(0);
}
if (before.columns.length) {
    throw new Error("Open Graph columns already exist without a migration record. Stopped.");
}

const latestBatch = before.migrations.reduce((max, row) => Math.max(max, row.batch > 0 ? row.batch : 0), 0);

try {
    await client.query("BEGIN");
    await client.query(upSql);
    const during = await snapshot();
    const countMismatch = tables.filter((table) => during.counts[table] !== before.counts[table]);
    const fingerprintMismatch = Object.keys(before.fingerprints).filter(
        (key) => during.fingerprints[key] !== before.fingerprints[key],
    );
    if (countMismatch.length || fingerprintMismatch.length) {
        throw new Error(
            `Existing data changed. counts=${countMismatch.join(",")} fingerprints=${fingerprintMismatch.join(",")}`,
        );
    }
    await client.query(`INSERT INTO payload_migrations (name, batch) VALUES ($1, $2)`, [
        migrationName,
        latestBatch + 1,
    ]);
    await client.query("COMMIT");
} catch (error) {
    await client.query("ROLLBACK");
    throw error;
}

const after = await snapshot();
const comparableBefore = { ...before.counts };
delete comparableBefore.payload_migrations;
const comparableAfter = { ...after.counts };
delete comparableAfter.payload_migrations;

console.log(
    JSON.stringify(
        {
            status: "applied",
            batch: latestBatch + 1,
            countsMatch: JSON.stringify(comparableBefore) === JSON.stringify(comparableAfter),
            fingerprintsMatch: JSON.stringify(before.fingerprints) === JSON.stringify(after.fingerprints),
            beforeCounts: before.counts,
            afterCounts: after.counts,
            columns: after.columns,
            migrationRecorded: after.migrations.some(
                (row) => row.name === migrationName && row.batch === latestBatch + 1,
            ),
        },
        null,
        2,
    ),
);
await client.end();
