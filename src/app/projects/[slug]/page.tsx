import ProjectDetails from "@/components/projectDetails";
import { fetchSingleProject } from "@/lib/api";
import { ProjectProps } from "@/lib/types";

export default async function ProjectPage({ params }: { params: { slug: ProjectProps["slug"] } }) {
    const { slug } = params;
    const project = await fetchSingleProject(slug);

    return <ProjectDetails project={project} />;
}
