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
import { textStateFeature } from "@/lib/lexical-text-state";
import { textStateClassName } from "@/lib/text-state";

type AccordionHTMLItem = {
    title?: string | null;
    content?: SerializedEditorState | null;
};

function escapeHtml(value: string) {
    return value
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;");
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

const defaultRichTextFeatures = ({
    defaultFeatures,
}: {
    defaultFeatures: FeatureProviderServer<any, any, any>[];
}) => [
    ...defaultFeatures,
    textStateFeature,
    BlocksFeature({
        blocks: [AccordionBlock],
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

            return [...defaultConverters, textStateHTMLConverter, accordionHTMLConverter];
        },
    }),
];

export const defaultRichTextEditor = lexicalEditor({
    features: defaultRichTextFeatures,
});

export const contentRichTextEditor = lexicalEditor({
    features: (args) => [...defaultRichTextFeatures(args), EXPERIMENTAL_TableFeature()],
});
