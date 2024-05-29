import { sql } from "@vercel/postgres";

export async function GET({ params }: { params: { id: number } }) {
    // const projectsData = await sql`SELECT * FROM projects WHERE id = ${params.id}`;
    const projectsData = await sql`SELECT * FROM projects WHERE id = ${params.id}`;
    return Response.json(projectsData.rows);
}
