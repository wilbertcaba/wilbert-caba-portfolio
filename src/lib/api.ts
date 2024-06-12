import { ProjectProps, ProjectsApiResponse } from "@/lib/types";

// function delay(ms) {
//     return new Promise((resolve) => setTimeout(resolve, ms));
// }

export async function fetchProjects(): Promise<ProjectProps[]> {
    const baseUrl = process.env.VERCEL_URL || process.env.BASE_URL;
    try {
        // await delay(5000);
        const response = await fetch(`${baseUrl}/api/Projects`);

        if (!response.ok) {
            console.log(`Base URL: ${baseUrl}`);
            console.log(`Response status: ${response.status}`);
            throw new Error("Failed to fetch projects");
        }
        const data: ProjectsApiResponse = await response.json();

        return data.docs;
    } catch (error) {
        console.error("Error fetching projects: ", error);
        throw error;
    }
}
