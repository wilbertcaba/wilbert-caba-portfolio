import { notFound } from "next/navigation";
import ProjectDetails from "@/components/projectDetails";
import { fetchSingleProject } from "@/lib/cms";

export default async function ProjectPage(props: { params: Promise<{ slug: string }> }) {
    const { slug } = await props.params;
    const project = await fetchSingleProject(slug);

    if (!project) {
        notFound();
    }

    return <ProjectDetails project={project} />;
}
