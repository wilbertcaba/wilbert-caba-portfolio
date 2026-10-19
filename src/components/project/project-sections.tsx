import { RichText, type JSXConvertersFunction } from "@payloadcms/richtext-lexical/react";
import { ImageZoom } from "@/components/ui/image-zoom";
import type { ProjectSection } from "@/lib/cms";

const sectionContentClassName =
    "prose prose-invert max-w-prose prose-headings:font-semibold prose-headings:tracking-tight prose-a:text-primary prose-img:rounded-xl";

type UploadedMedia = {
    alt?: string | null;
    filename?: string | null;
    height?: number | null;
    mimeType?: string | null;
    url?: string | null;
    width?: number | null;
};

const sectionConverters: JSXConvertersFunction = ({ defaultConverters }) => ({
    ...defaultConverters,
    upload: ({ node }) => {
        const upload = node as {
            fields?: { alt?: string | null };
            value?: UploadedMedia | number | string;
        };
        const media = upload.value;
        if (!media || typeof media !== "object" || !media.url) return null;

        const alt = upload.fields?.alt || media.alt || "";
        if (!media.mimeType?.startsWith("image")) {
            return (
                <a href={media.url} rel="noopener noreferrer">
                    {media.filename || alt || "Download file"}
                </a>
            );
        }

        return (
            <ImageZoom className="my-6 w-fit max-w-full">
                <img
                    alt={alt}
                    height={media.height ?? undefined}
                    src={media.url}
                    width={media.width ?? undefined}
                />
            </ImageZoom>
        );
    },
});

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
                        <RichText
                            className={sectionContentClassName}
                            converters={sectionConverters}
                            data={section.content}
                        />
                    ) : null}
                </section>
            ))}
        </div>
    );
}
