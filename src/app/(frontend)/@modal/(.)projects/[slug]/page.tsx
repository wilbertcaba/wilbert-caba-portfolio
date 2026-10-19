import { notFound } from "next/navigation";
import type { Metadata } from "next";
import ProjectCaseStudy from "@/components/project/project-case-study";
import ProjectSheet from "@/components/project/project-sheet";
import { fetchProjectDetail, getProjectMetadata } from "@/lib/cms";

export async function generateMetadata(props: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await props.params;
    return getProjectMetadata(slug);
}

export default async function InterceptedProjectPage(props: { params: Promise<{ slug: string }> }) {
    const { slug } = await props.params;
    const project = await fetchProjectDetail(slug);

    if (!project) {
        notFound();
    }

    return (
        <ProjectSheet slug={project.slug} title={project.title} description={project.excerpt}>
            <ProjectCaseStudy project={project} mode="sheet" />
        </ProjectSheet>
    );
}
