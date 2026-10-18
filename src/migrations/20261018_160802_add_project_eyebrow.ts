import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "projects" ADD COLUMN "eyebrow" varchar;
  UPDATE "projects" SET "eyebrow" = '' WHERE "eyebrow" IS NULL;
  ALTER TABLE "projects" ALTER COLUMN "eyebrow" SET NOT NULL;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "projects" DROP COLUMN "eyebrow";`)
}
