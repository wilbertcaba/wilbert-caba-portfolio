import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

type ProjectTimestamp = {
  id: number
  created_at: Date | string
  updated_at: Date | string
}

function rowsFrom<T>(result: unknown): T[] {
  if (Array.isArray(result)) return result as T[]
  if (result && typeof result === 'object' && 'rows' in result && Array.isArray(result.rows)) {
    return result.rows as T[]
  }
  return []
}

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_projects_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__projects_v_version_featured_background_type" AS ENUM('none', 'color', 'image', 'pattern');
  CREATE TYPE "public"."enum__projects_v_version_featured_background_pattern" AS ENUM('dots', 'grid', 'triangles');
  CREATE TYPE "public"."enum__projects_v_version_featured_background_inset" AS ENUM('none', 'sm', 'md', 'lg');
  CREATE TYPE "public"."enum__projects_v_version_status" AS ENUM('draft', 'published');
  CREATE TABLE "_projects_v_version_sections" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"content" jsonb,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_projects_v_version_tags" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"tag" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_projects_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version__order" varchar,
  	"version_title" varchar,
  	"version_eyebrow" varchar,
  	"version_excerpt" varchar,
  	"version_featured_image_id" integer,
  	"version_featured_background_type" "enum__projects_v_version_featured_background_type" DEFAULT 'none',
  	"version_featured_background_color" varchar,
  	"version_featured_background_image_id" integer,
  	"version_featured_background_pattern" "enum__projects_v_version_featured_background_pattern",
  	"version_featured_background_inset" "enum__projects_v_version_featured_background_inset" DEFAULT 'md',
  	"version_meta_title" varchar,
  	"version_meta_description" varchar,
  	"version_meta_image_id" integer,
  	"version_meta_open_graph_title" varchar,
  	"version_meta_open_graph_description" varchar,
  	"version_meta_open_graph_image_id" integer,
  	"version_slug" varchar,
  	"version_project_link" varchar,
  	"version_role" varchar,
  	"version_description" jsonb,
  	"version_description_html" varchar,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__projects_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean
  );
  
  ALTER TABLE "projects_sections" ALTER COLUMN "title" DROP NOT NULL;
  ALTER TABLE "projects" ALTER COLUMN "title" DROP NOT NULL;
  ALTER TABLE "projects" ALTER COLUMN "eyebrow" DROP NOT NULL;
  ALTER TABLE "projects" ALTER COLUMN "excerpt" DROP NOT NULL;
  ALTER TABLE "projects" ALTER COLUMN "featured_image_id" DROP NOT NULL;
  ALTER TABLE "projects" ALTER COLUMN "slug" DROP NOT NULL;
  ALTER TABLE "projects" ALTER COLUMN "role" DROP NOT NULL;
  ALTER TABLE "projects" ADD COLUMN "_status" "enum_projects_status" DEFAULT 'draft';
  ALTER TABLE "_projects_v_version_sections" ADD CONSTRAINT "_projects_v_version_sections_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_projects_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_version_tags" ADD CONSTRAINT "_projects_v_version_tags_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_projects_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v" ADD CONSTRAINT "_projects_v_parent_id_projects_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."projects"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_projects_v" ADD CONSTRAINT "_projects_v_version_featured_image_id_media_id_fk" FOREIGN KEY ("version_featured_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_projects_v" ADD CONSTRAINT "_projects_v_version_featured_background_image_id_media_id_fk" FOREIGN KEY ("version_featured_background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_projects_v" ADD CONSTRAINT "_projects_v_version_meta_image_id_media_id_fk" FOREIGN KEY ("version_meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_projects_v" ADD CONSTRAINT "_projects_v_version_meta_open_graph_image_id_media_id_fk" FOREIGN KEY ("version_meta_open_graph_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "_projects_v_version_sections_order_idx" ON "_projects_v_version_sections" USING btree ("_order");
  CREATE INDEX "_projects_v_version_sections_parent_id_idx" ON "_projects_v_version_sections" USING btree ("_parent_id");
  CREATE INDEX "_projects_v_version_tags_order_idx" ON "_projects_v_version_tags" USING btree ("_order");
  CREATE INDEX "_projects_v_version_tags_parent_id_idx" ON "_projects_v_version_tags" USING btree ("_parent_id");
  CREATE INDEX "_projects_v_parent_idx" ON "_projects_v" USING btree ("parent_id");
  CREATE INDEX "_projects_v_version_version__order_idx" ON "_projects_v" USING btree ("version__order");
  CREATE INDEX "_projects_v_version_version_featured_image_idx" ON "_projects_v" USING btree ("version_featured_image_id");
  CREATE INDEX "_projects_v_version_featured_background_version_featured_idx" ON "_projects_v" USING btree ("version_featured_background_image_id");
  CREATE INDEX "_projects_v_version_meta_version_meta_image_idx" ON "_projects_v" USING btree ("version_meta_image_id");
  CREATE INDEX "_projects_v_version_meta_open_graph_version_meta_open_gr_idx" ON "_projects_v" USING btree ("version_meta_open_graph_image_id");
  CREATE INDEX "_projects_v_version_version_updated_at_idx" ON "_projects_v" USING btree ("version_updated_at");
  CREATE INDEX "_projects_v_version_version_created_at_idx" ON "_projects_v" USING btree ("version_created_at");
  CREATE INDEX "_projects_v_version_version__status_idx" ON "_projects_v" USING btree ("version__status");
  CREATE INDEX "_projects_v_created_at_idx" ON "_projects_v" USING btree ("created_at");
  CREATE INDEX "_projects_v_updated_at_idx" ON "_projects_v" USING btree ("updated_at");
  CREATE INDEX "_projects_v_latest_idx" ON "_projects_v" USING btree ("latest");
  CREATE INDEX "projects__status_idx" ON "projects" USING btree ("_status");`)

  // Existing projects are already live. Snapshot each one as published so the admin
  // versions list can open them, and keep their original timestamps.
  const existing = rowsFrom<ProjectTimestamp>(
    await db.execute(sql`SELECT "id", "created_at", "updated_at" FROM "projects" ORDER BY "id" ASC`),
  )

  const projects = await payload.find({
    collection: 'Projects',
    depth: 0,
    limit: 0,
    pagination: false,
    overrideAccess: true,
    req,
  })

  for (const project of projects.docs) {
    await payload.update({
      collection: 'Projects',
      id: project.id,
      data: {
        _status: 'published',
      },
      depth: 0,
      draft: false,
      overrideAccess: true,
      req,
    })
  }

  for (const row of existing) {
    await db.execute(sql`
      UPDATE "projects"
      SET "created_at" = ${row.created_at}, "updated_at" = ${row.updated_at}
      WHERE "id" = ${row.id}
    `)
    await db.execute(sql`
      UPDATE "_projects_v"
      SET "created_at" = ${row.created_at},
          "updated_at" = ${row.updated_at},
          "version_created_at" = ${row.created_at},
          "version_updated_at" = ${row.updated_at}
      WHERE "parent_id" = ${row.id}
    `)
  }
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "_projects_v_version_sections" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_projects_v_version_tags" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_projects_v" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "_projects_v_version_sections" CASCADE;
  DROP TABLE "_projects_v_version_tags" CASCADE;
  DROP TABLE "_projects_v" CASCADE;
  DROP INDEX "projects__status_idx";
  ALTER TABLE "projects_sections" ALTER COLUMN "title" SET NOT NULL;
  ALTER TABLE "projects" ALTER COLUMN "title" SET NOT NULL;
  ALTER TABLE "projects" ALTER COLUMN "eyebrow" SET NOT NULL;
  ALTER TABLE "projects" ALTER COLUMN "excerpt" SET NOT NULL;
  ALTER TABLE "projects" ALTER COLUMN "featured_image_id" SET NOT NULL;
  ALTER TABLE "projects" ALTER COLUMN "slug" SET NOT NULL;
  ALTER TABLE "projects" ALTER COLUMN "role" SET NOT NULL;
  ALTER TABLE "projects" DROP COLUMN "_status";
  DROP TYPE "public"."enum_projects_status";
  DROP TYPE "public"."enum__projects_v_version_featured_background_type";
  DROP TYPE "public"."enum__projects_v_version_featured_background_pattern";
  DROP TYPE "public"."enum__projects_v_version_featured_background_inset";
  DROP TYPE "public"."enum__projects_v_version_status";`)
}
