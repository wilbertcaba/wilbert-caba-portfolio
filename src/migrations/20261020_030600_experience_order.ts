import { MigrateDownArgs, MigrateUpArgs, sql } from "@payloadcms/db-postgres";
import { generateNKeysBetween } from "payload/shared";

type ExperienceIdRow = {
    id: number;
};

export async function up({ db }: MigrateUpArgs): Promise<void> {
    await db.execute(sql`
   ALTER TABLE "experience" ADD COLUMN "_order" varchar;
  CREATE INDEX "experience__order_idx" ON "experience" USING btree ("_order");`);

    const result = await db.execute(
        sql`SELECT "id" FROM "experience" ORDER BY "created_at" DESC, "id" DESC`,
    );
    const rows = (Array.isArray(result) ? result : result.rows) as ExperienceIdRow[];
    if (!rows.length) return;

    const keys = generateNKeysBetween(null, null, rows.length);
    for (const [index, row] of rows.entries()) {
        await db.execute(sql`UPDATE "experience" SET "_order" = ${keys[index]} WHERE "id" = ${row.id}`);
    }
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
    await db.execute(sql`
   DROP INDEX "experience__order_idx";
  ALTER TABLE "experience" DROP COLUMN "_order";`);
}
