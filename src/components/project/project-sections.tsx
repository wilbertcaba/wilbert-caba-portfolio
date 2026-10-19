import { RichText } from "@payloadcms/richtext-lexical/react";
import type { ProjectSection } from "@/lib/cms";
import { richTextClassName } from "@/components/rich-text/base-converters";
import { sectionConverters } from "@/components/rich-text/section-converters";

export default function ProjectSections({ sections }: { sections: ProjectSection[] }) {
    if (!sections.length) return null;

    return (
        <div className="mt-14 flex flex-col gap-16 md:mt-20">
            {sections.map((section) => (
                <section key={section.id} id={`section-${section.id}`} className="scroll-mt-36 lg:scroll-mt-24">
                    <h2 className="mb-6 text-3xl font-semibold tracking-tight text-white">{section.title}</h2>
                    {section.html ? (
                        <div className={richTextClassName} dangerouslySetInnerHTML={{ __html: section.html }} />
                    ) : section.content ? (
                        <RichText
                            className={richTextClassName}
                            converters={sectionConverters}
                            data={section.content}
                        />
                    ) : null}
                </section>
            ))}
        </div>
    );
}
