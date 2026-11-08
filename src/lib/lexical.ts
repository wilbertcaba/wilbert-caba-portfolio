import {
    BlocksFeature,
    EXPERIMENTAL_TableFeature,
    HTMLConverterFeature,
    convertLexicalToHTML,
    lexicalEditor,
    type FeatureProviderServer,
    type HTMLConverter,
} from "@payloadcms/richtext-lexical";
import type { SerializedEditorState } from "lexical";
import { AccordionBlock } from "@/blocks/Accordion";
import { IframeBlock } from "@/blocks/Iframe";
import { textStateFeature } from "@/lib/lexical-text-state";
import { textStateClassName } from "@/lib/text-state";

type AccordionHTMLItem = {
    title?: string | null;
    content?: SerializedEditorState | null;
};

type IframeHTMLFields = {
    blockType?: string;
    url?: string | null;
    title?: string | null;
    height?: number | null;
};

function escapeHtml(value: string) {
    return value.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;");
}

function toHttpsEmbedUrl(value: string | null | undefined) {
    const trimmed = value?.trim();
    if (!trimmed) return null;

    try {
        const url = new URL(trimmed);
        if (url.protocol !== "https:") return null;
        return url.toString();
    } catch {
        return null;
    }
}

const accordionHTMLConverter: HTMLConverter = {
    nodeTypes: ["block"],
    converter: async ({ node, converters, currentDepth, depth, draft, overrideAccess, req, showHiddenFields }) => {
        const fields = (node as { fields?: { blockType?: string; items?: AccordionHTMLItem[] | null } }).fields;
        if (fields?.blockType !== "accordion") return "";

        const rendered = await Promise.all(
            (fields.items ?? []).map(async (item) => {
                const title = escapeHtml(item.title?.trim() || "Item");
                const content = item.content
                    ? await convertLexicalToHTML({
                          converters,
                          currentDepth,
                          data: item.content,
                          depth,
                          draft,
                          overrideAccess,
                          req,
                          showHiddenFields,
                      })
                    : "";

                return `<details class="accordion-item"><summary>${title}</summary>${content}</details>`;
            }),
        );

        if (!rendered.length) return "";

        return `<div class="accordion">${rendered.join("")}</div>`;
    },
};

const iframeHTMLConverter: HTMLConverter = {
    nodeTypes: ["block"],
    converter: async ({ node }) => {
        const fields = (node as { fields?: IframeHTMLFields }).fields;
        if (fields?.blockType !== "iframe") return "";

        const src = toHttpsEmbedUrl(fields.url);
        if (!src) return "";

        const title = escapeHtml(fields.title?.trim() || "Embedded content");
        const height = fields.height && fields.height > 0 ? fields.height : 400;

        return `<iframe class="my-6 w-full rounded-xl border-0" src="${escapeHtml(src)}" title="${title}" height="${height}" loading="lazy" referrerpolicy="no-referrer" sandbox="allow-scripts allow-same-origin allow-popups allow-forms" allowfullscreen></iframe>`;
    },
};

const defaultRichTextFeatures = ({ defaultFeatures }: { defaultFeatures: FeatureProviderServer<any, any, any>[] }) => [
    ...defaultFeatures,
    textStateFeature,
    BlocksFeature({
        blocks: [AccordionBlock, IframeBlock],
    }),
    HTMLConverterFeature({
        converters: ({ defaultConverters }) => {
            const defaultTextConverter = defaultConverters.find((converter) => converter.nodeTypes.includes("text"));

            const textStateHTMLConverter: HTMLConverter = {
                nodeTypes: ["text"],
                converter: async (args) => {
                    const html = (await defaultTextConverter?.converter(args)) ?? "";
                    const className = textStateClassName(args.node);
                    if (!className) return html;

                    return `<span class="${className}">${html}</span>`;
                },
            };

            return [...defaultConverters, textStateHTMLConverter, accordionHTMLConverter, iframeHTMLConverter];
        },
    }),
];

export const defaultRichTextEditor = lexicalEditor({
    features: defaultRichTextFeatures,
});

export const contentRichTextEditor = lexicalEditor({
    features: (args) => [...defaultRichTextFeatures(args), EXPERIMENTAL_TableFeature()],
});
