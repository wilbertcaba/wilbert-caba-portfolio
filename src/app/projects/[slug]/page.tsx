import ProjectDetails from "@/components/projectDetails";
import { fetchSingleProject } from "@/lib/supabase/data";
import { ProjectProps } from "@/lib/types";

export default async function ProjectPage(props: { params: Promise<{ slug: ProjectProps["slug"] }> }) {
    const params = await props.params;
    const { slug } = params;
    const project = await fetchSingleProject(slug);

    return <ProjectDetails project={project} />;
}
