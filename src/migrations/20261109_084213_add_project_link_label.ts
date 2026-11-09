import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "projects" ADD COLUMN "project_link_label" varchar;
  ALTER TABLE "_projects_v" ADD COLUMN "version_project_link_label" varchar;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "projects" DROP COLUMN "project_link_label";
  ALTER TABLE "_projects_v" DROP COLUMN "version_project_link_label";`)
}
