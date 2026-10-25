import type { MetadataRoute } from "next";
import { fetchProjects } from "@/lib/cms";
import { getSiteURL } from "@/seo";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const site = getSiteURL();
    const projects = await fetchProjects();

    return [
        {
            url: site,
            changeFrequency: "weekly",
            priority: 1,
        },
        ...projects.map((project) => ({
            url: `${site}/projects/${project.slug}`,
            changeFrequency: "monthly" as const,
            priority: 0.8,
        })),
    ];
}
