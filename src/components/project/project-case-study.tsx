import Link from "next/link";
import { ExternalLink } from "lucide-react";
import type { ProjectDetail } from "@/lib/cms";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import Eyebrow from "@/components/eyebrow";
import MetaLabel from "@/components/meta-label";
import Tags from "@/components/tags";
import FeaturedMedia from "@/components/project/featured-media";
import ProjectSections from "@/components/project/project-sections";
import ProjectUtilityBar from "@/components/project/project-utility-bar";
import SectionNav from "@/components/project/section-nav";

function ProjectMeta({ project, className }: { project: ProjectDetail; className?: string }) {
    const tags = project.tags.filter((tag) => tag.tag?.trim());
    if (!project.role && !tags.length && !project.projectLink) return null;

    return (
        <aside className={className}>
            {project.role ? (
                <div className="mb-6">
                    <MetaLabel>My Role</MetaLabel>
                    <p className="mb-0 text-sm leading-6 text-neutral-200">{project.role}</p>
                </div>
            ) : null}
            {tags.length ? (
                <div className="mb-6">
                    <MetaLabel>Technologies</MetaLabel>
                    <Tags tags={tags} className="mt-0 sm:mt-0" />
                </div>
            ) : null}
            {project.projectLink ? (
                <Button asChild className="rounded-full">
                    <a href={project.projectLink} target="_blank" rel="noopener noreferrer">
                        Visit live site
                        <ExternalLink className="ml-2 h-4 w-4" />
                    </a>
                </Button>
            ) : null}
        </aside>
    );
}

export default function ProjectCaseStudy({
    project,
    mode,
}: {
    project: ProjectDetail;
    mode: "sheet" | "page";
}) {
    const sectionLinks = project.sections.map((section) => ({ id: section.id, title: section.title }));
    const hasMeta = Boolean(
        project.role || project.projectLink || project.tags.some((tag) => tag.tag?.trim()),
    );

    return (
        <article className={mode === "page" ? "min-h-screen bg-neutral-950 text-neutral-50" : undefined}>
            <ProjectUtilityBar
                mode={mode}
                indexLabel={project.indexLabel}
                totalLabel={project.totalLabel}
                previousSlug={project.previous?.slug ?? null}
                nextSlug={project.next?.slug ?? null}
            />
            <FeaturedMedia project={project} />
            <div className="pb-16 lg:container">
                <div className="lg:grid lg:grid-cols-[14rem_minmax(0,1fr)] lg:gap-12">
                    <SectionNav sections={sectionLinks} />
                    <div
                        className={cn(
                            "container min-w-0 pt-8 lg:max-w-none lg:px-0 lg:pt-2",
                            hasMeta &&
                                "md:grid md:grid-cols-[minmax(0,1fr)_16rem] md:items-start md:gap-x-8 lg:gap-x-12",
                        )}
                    >
                        <header className="md:col-start-1">
                            <Eyebrow>{project.eyebrow}</Eyebrow>
                            <h1 className="mb-4 text-4xl font-semibold tracking-tight text-white md:text-5xl">
                                {project.title}
                            </h1>
                            {project.excerpt ? (
                                <p className="mb-0 max-w-2xl text-base leading-7 text-neutral-400">{project.excerpt}</p>
                            ) : null}
                        </header>
                        <ProjectMeta
                            project={project}
                            className="mt-8 md:sticky md:top-[6.75rem] md:col-start-2 md:row-span-2 md:row-start-1 md:mt-0 md:self-start lg:top-14"
                        />
                        <div className="min-w-0 md:col-start-1">
                            <ProjectSections sections={project.sections} />
                            {project.next ? (
                                <Link
                                    href={`/projects/${project.next.slug}`}
                                    scroll={false}
                                    className="mt-16 flex items-center justify-between gap-6 border-t border-white/10 pt-8 text-white transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                                >
                                    <span className="text-xs uppercase tracking-widest text-neutral-500">Next project</span>
                                    <span className="text-right text-xl font-medium">{project.next.title}</span>
                                </Link>
                            ) : null}
                        </div>
                    </div>
                </div>
            </div>
        </article>
    );
}
