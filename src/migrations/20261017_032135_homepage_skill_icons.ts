import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  // Existing rows have no icon. Clear them so the required icon column can be added.
  await db.execute(sql`
   DELETE FROM "homepage_skills";
  ALTER TABLE "homepage_skills" ALTER COLUMN "skill" SET NOT NULL;
  ALTER TABLE "homepage_skills" ADD COLUMN "icon_id" integer NOT NULL;
  ALTER TABLE "homepage_skills" ADD CONSTRAINT "homepage_skills_icon_id_media_id_fk" FOREIGN KEY ("icon_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "homepage_skills_icon_idx" ON "homepage_skills" USING btree ("icon_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "homepage_skills" DROP CONSTRAINT "homepage_skills_icon_id_media_id_fk";
  
  DROP INDEX "homepage_skills_icon_idx";
  ALTER TABLE "homepage_skills" ALTER COLUMN "skill" DROP NOT NULL;
  ALTER TABLE "homepage_skills" DROP COLUMN "icon_id";`)
}
