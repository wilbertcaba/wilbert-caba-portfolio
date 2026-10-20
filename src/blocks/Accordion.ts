import { lexicalEditor } from "@payloadcms/richtext-lexical";
import type { Block } from "payload";
import { textSizeFeature } from "@/lib/lexical-text-state";

const accordionItemEditor = lexicalEditor({
    features: ({ defaultFeatures }) => [...defaultFeatures, textSizeFeature],
});

export const AccordionBlock: Block = {
    slug: "accordion",
    interfaceName: "AccordionBlock",
    labels: {
        singular: "Accordion",
        plural: "Accordions",
    },
    fields: [
        {
            name: "items",
            label: "Items",
            type: "array",
            minRows: 1,
            required: true,
            labels: {
                singular: "Item",
                plural: "Items",
            },
            admin: {
                description: "Each item is a collapsible row with a title and rich text.",
                initCollapsed: true,
                components: {
                    RowLabel: "/components/payload/AccordionItemRowLabel.tsx#AccordionItemRowLabel",
                },
            },
            fields: [
                {
                    name: "title",
                    label: "Title",
                    type: "text",
                    required: true,
                },
                {
                    name: "content",
                    label: "Content",
                    type: "richText",
                    editor: accordionItemEditor,
                },
            ],
        },
    ],
};
