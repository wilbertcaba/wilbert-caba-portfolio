import type { CollectionConfig } from "payload/types";
import { HTMLConverterFeature, lexicalEditor, lexicalHTML } from "@payloadcms/richtext-lexical";

export const Projects: CollectionConfig = {
    slug: "Projects",

    access: {
        read: () => true, // Allow read access publicly
        // create: () => false, // Only logged-in users can create
        // update: () => false, // Only logged-in users can update
        // delete: () => false, // Only logged-in users can delete
    },

    fields: [
        {
            name: "featuredImage",
            label: "Featured Image",
            type: "upload",
            relationTo: "media",
            required: true,
        },
        {
            name: "title",
            label: "Title",
            type: "text",
            required: true,
        },
        {
            name: "slug",
            label: "Slug",
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
            name: "projectLink",
            label: "Project Link",
            type: "text",
        },
        {
            name: "role",
            label: "Role",
            type: "text",
            required: true,
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
        },
        {
            name: "description",
            label: "Description",
            type: "richText",
            editor: lexicalEditor({
                features: ({ defaultFeatures }) => [
                    ...defaultFeatures,
                    // The HTMLConverter Feature is the feature which manages the HTML serializers.
                    // If you do not pass any arguments to it, it will use the default serializers.
                    HTMLConverterFeature({}),
                ],
            }),
            required: true,
        },
        lexicalHTML("description", { name: "description_html" }),
    ],
};
