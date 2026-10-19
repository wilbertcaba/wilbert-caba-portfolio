import type { CollectionConfig } from "payload";
import { lexicalHTML } from "@payloadcms/richtext-lexical";
import { contentRichTextEditor } from "@/lib/lexical";

const hexColorPattern = /^#(?:[0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/;

export const Projects: CollectionConfig = {
    slug: "Projects",
    // Matches the current homepage sequence: newest project first.
    defaultSort: "-createdAt",

    access: {
        read: () => true, // Allow read access publicly
        // create: () => false, // Only logged-in users can create
        // update: () => false, // Only logged-in users can update
        // delete: () => false, // Only logged-in users can delete
    },

    admin: {
        useAsTitle: "title",
        defaultColumns: ["title", "slug", "updatedAt"],
    },

    fields: [
        {
            type: "tabs",
            tabs: [
                {
                    label: "Content",
                    fields: [
                        {
                            name: "title",
                            label: "Title",
                            type: "text",
                            required: true,
                        },
                        {
                            name: "eyebrow",
                            label: "Eyebrow",
                            type: "text",
                            required: true,
                        },
                        {
                            name: "excerpt",
                            label: "Excerpt",
                            type: "text",
                            required: true,
                        },
                        {
                            name: "sections",
                            label: "Sections",
                            type: "array",
                            labels: {
                                singular: "Section",
                                plural: "Sections",
                            },
                            admin: {
                                initCollapsed: true,
                                description:
                                    "Each section becomes a heading and a navigation item on the project page.",
                                components: {
                                    RowLabel: "/components/payload/SectionRowLabel.tsx#SectionRowLabel",
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
                                    editor: contentRichTextEditor,
                                },
                            ],
                        },
                    ],
                },
                {
                    label: "Media",
                    fields: [
                        {
                            name: "featuredImage",
                            label: "Featured Image",
                            type: "upload",
                            relationTo: "media",
                            required: true,
                        },
                        {
                            name: "featuredBackground",
                            label: "Featured Background",
                            type: "group",
                            fields: [
                                {
                                    name: "type",
                                    label: "Type",
                                    type: "select",
                                    defaultValue: "none",
                                    options: [
                                        { label: "None", value: "none" },
                                        { label: "Solid Color", value: "color" },
                                        { label: "Background Image", value: "image" },
                                        { label: "Pattern", value: "pattern" },
                                    ],
                                },
                                {
                                    name: "color",
                                    label: "Color",
                                    type: "text",
                                    admin: {
                                        condition: (_, siblingData) => siblingData?.type === "color",
                                        description: "Hex color, for example #1c1917.",
                                    },
                                    validate: (value: unknown) => {
                                        if (value == null || value === "") return true;
                                        if (typeof value === "string" && hexColorPattern.test(value)) return true;
                                        return "Enter a hex color like #1c1917.";
                                    },
                                },
                                {
                                    name: "image",
                                    label: "Background Image",
                                    type: "upload",
                                    relationTo: "media",
                                    admin: {
                                        condition: (_, siblingData) => siblingData?.type === "image",
                                    },
                                },
                                {
                                    name: "pattern",
                                    label: "Pattern",
                                    type: "select",
                                    options: [
                                        { label: "Dots", value: "dots" },
                                        { label: "Grid", value: "grid" },
                                        { label: "Triangles", value: "triangles" },
                                    ],
                                    admin: {
                                        condition: (_, siblingData) => siblingData?.type === "pattern",
                                    },
                                },
                                {
                                    name: "inset",
                                    label: "Featured Image Spacing",
                                    type: "select",
                                    defaultValue: "md",
                                    options: [
                                        { label: "None", value: "none" },
                                        { label: "Small", value: "sm" },
                                        { label: "Medium", value: "md" },
                                        { label: "Large", value: "lg" },
                                    ],
                                    admin: {
                                        condition: (_, siblingData) =>
                                            Boolean(siblingData?.type && siblingData.type !== "none"),
                                    },
                                },
                            ],
                        },
                    ],
                },
            ],
        },
        {
            name: "slug",
            label: "Slug",
            type: "text",
            required: true,
            admin: {
                position: "sidebar",
            },
        },
        {
            name: "projectLink",
            label: "Project Link",
            type: "text",
            admin: {
                position: "sidebar",
            },
        },
        {
            name: "role",
            label: "Role",
            type: "text",
            required: true,
            admin: {
                position: "sidebar",
            },
        },
        {
            name: "tags",
            label: "Tags",
            type: "array",
            fields: [
                {
                    name: "tag",
                    type: "text",
                },
            ],
            required: true,
            admin: {
                position: "sidebar",
            },
        },
        {
            name: "description",
            label: "Description",
            type: "richText",
            editor: contentRichTextEditor,
            required: false,
            admin: {
                hidden: true,
                description: "Legacy field. Project content now lives in Sections.",
            },
        },
        lexicalHTML("description", { name: "description_html", storeInDB: true }),
    ],
};
