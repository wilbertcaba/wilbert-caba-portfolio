import { RichText } from "@payloadcms/richtext-lexical/react";
import type { ProjectSection } from "@/lib/cms";

const sectionContentClassName =
    "prose prose-invert max-w-prose prose-headings:font-semibold prose-headings:tracking-tight prose-a:text-primary prose-img:rounded-xl";

export default function ProjectSections({ sections }: { sections: ProjectSection[] }) {
    if (!sections.length) return null;

    return (
        <div className="mt-14 flex flex-col gap-16 md:mt-20">
            {sections.map((section) => (
                <section key={section.id} id={`section-${section.id}`} className="scroll-mt-36 lg:scroll-mt-24">
                    <h2 className="mb-6 text-3xl font-semibold tracking-tight text-white">{section.title}</h2>
                    {section.html ? (
                        <div className={sectionContentClassName} dangerouslySetInnerHTML={{ __html: section.html }} />
                    ) : section.content ? (
                        <RichText data={section.content} className={sectionContentClassName} />
                    ) : null}
                </section>
            ))}
        </div>
    );
}
