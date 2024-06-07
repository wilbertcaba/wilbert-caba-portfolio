import ProjectDetails from "@/components/projectDetails";
import { ProjectProps } from "@/lib/types";

export default function ProjectPage({ params }: { params: ProjectProps }) {
    return <ProjectDetails params={params} />;
}
