import { ImageZoom } from "@/components/ui/image-zoom";
import type { JSXConvertersFunction } from "@payloadcms/richtext-lexical/react";

type UploadedMedia = {
    alt?: string | null;
    filename?: string | null;
    height?: number | null;
    mimeType?: string | null;
    url?: string | null;
    width?: number | null;
};

export const richTextClassName =
    "prose prose-invert max-w-prose prose-headings:font-semibold prose-headings:tracking-tight prose-a:text-primary prose-img:rounded-xl";

export const richTextConverters: JSXConvertersFunction = ({ defaultConverters }) => ({
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
