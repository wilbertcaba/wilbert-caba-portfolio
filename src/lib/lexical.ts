import {
    BlocksFeature,
    HTMLConverterFeature,
    convertLexicalToHTML,
    lexicalEditor,
    type HTMLConverter,
} from "@payloadcms/richtext-lexical";
import type { SerializedEditorState } from "lexical";
import { AccordionBlock } from "@/blocks/Accordion";

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

export const contentRichTextEditor = lexicalEditor({
    features: ({ defaultFeatures }) => [
        ...defaultFeatures,
        BlocksFeature({
            blocks: [AccordionBlock],
        }),
        HTMLConverterFeature({
            converters: ({ defaultConverters }) => [...defaultConverters, accordionHTMLConverter],
        }),
    ],
});
