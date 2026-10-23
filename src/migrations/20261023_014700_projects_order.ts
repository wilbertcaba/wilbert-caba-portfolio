import { MigrateDownArgs, MigrateUpArgs, sql } from "@payloadcms/db-postgres";
import { generateNKeysBetween } from "payload/shared";

type ProjectIdRow = {
    id: number;
};

export async function up({ db }: MigrateUpArgs): Promise<void> {
    await db.execute(sql`
   ALTER TABLE "projects" ADD COLUMN "_order" varchar;
  CREATE INDEX "projects__order_idx" ON "projects" USING btree ("_order");`);

    const result = await db.execute(
        sql`SELECT "id" FROM "projects" ORDER BY "created_at" DESC, "id" DESC`,
    );
    const rows = (Array.isArray(result) ? result : result.rows) as ProjectIdRow[];
    if (!rows.length) return;

    const keys = generateNKeysBetween(null, null, rows.length);
    for (const [index, row] of rows.entries()) {
        await db.execute(sql`UPDATE "projects" SET "_order" = ${keys[index]} WHERE "id" = ${row.id}`);
    }
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
    await db.execute(sql`
   DROP INDEX "projects__order_idx";
  ALTER TABLE "projects" DROP COLUMN "_order";`);
}
