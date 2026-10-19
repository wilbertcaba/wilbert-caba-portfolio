import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_projects_featured_background_type" AS ENUM('none', 'color', 'image', 'pattern');
  CREATE TYPE "public"."enum_projects_featured_background_pattern" AS ENUM('dots', 'grid', 'triangles');
  CREATE TYPE "public"."enum_projects_featured_background_inset" AS ENUM('none', 'sm', 'md', 'lg');
  CREATE TABLE "projects_sections" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"content" jsonb
  );
  
  ALTER TABLE "projects" ALTER COLUMN "description" DROP NOT NULL;
  ALTER TABLE "projects" ADD COLUMN "featured_background_type" "enum_projects_featured_background_type" DEFAULT 'none';
  ALTER TABLE "projects" ADD COLUMN "featured_background_color" varchar;
  ALTER TABLE "projects" ADD COLUMN "featured_background_image_id" integer;
  ALTER TABLE "projects" ADD COLUMN "featured_background_pattern" "enum_projects_featured_background_pattern";
  ALTER TABLE "projects" ADD COLUMN "featured_background_inset" "enum_projects_featured_background_inset" DEFAULT 'md';
  ALTER TABLE "projects_sections" ADD CONSTRAINT "projects_sections_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "projects_sections_order_idx" ON "projects_sections" USING btree ("_order");
  CREATE INDEX "projects_sections_parent_id_idx" ON "projects_sections" USING btree ("_parent_id");
  ALTER TABLE "projects" ADD CONSTRAINT "projects_featured_background_image_id_media_id_fk" FOREIGN KEY ("featured_background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "projects_featured_background_featured_background_image_idx" ON "projects" USING btree ("featured_background_image_id");`)

  // Copy the legacy description into a first Overview section once. Later runs skip projects that already have sections.
  await db.execute(sql`
   INSERT INTO "projects_sections" ("_order", "_parent_id", "id", "title", "content")
   SELECT 1, p."id", gen_random_uuid()::text, 'Overview', p."description"
   FROM "projects" p
   WHERE p."description" IS NOT NULL
     AND NOT EXISTS (
       SELECT 1 FROM "projects_sections" s WHERE s."_parent_id" = p."id"
     );`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "projects_sections" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "projects_sections" CASCADE;
  ALTER TABLE "projects" DROP CONSTRAINT "projects_featured_background_image_id_media_id_fk";
  
  DROP INDEX "projects_featured_background_featured_background_image_idx";
  UPDATE "projects" SET "description" = '{"root":{"type":"root","children":[],"direction":null,"format":"","indent":0,"version":1}}'::jsonb WHERE "description" IS NULL;
  ALTER TABLE "projects" ALTER COLUMN "description" SET NOT NULL;
  ALTER TABLE "projects" DROP COLUMN "featured_background_type";
  ALTER TABLE "projects" DROP COLUMN "featured_background_color";
  ALTER TABLE "projects" DROP COLUMN "featured_background_image_id";
  ALTER TABLE "projects" DROP COLUMN "featured_background_pattern";
  ALTER TABLE "projects" DROP COLUMN "featured_background_inset";
  DROP TYPE "public"."enum_projects_featured_background_type";
  DROP TYPE "public"."enum_projects_featured_background_pattern";
  DROP TYPE "public"."enum_projects_featured_background_inset";`)
}
