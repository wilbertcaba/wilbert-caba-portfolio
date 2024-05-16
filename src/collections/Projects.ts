import type { CollectionConfig } from "payload/types";
import { HTMLConverterFeature, lexicalEditor, lexicalHTML } from "@payloadcms/richtext-lexical";

export const Projects: CollectionConfig = {
    slug: "projects",

    fields: [
        {
            name: "title",
            label: "Title",
            type: "text",
        },
        {
            name: "excerpt",
            label: "Excerpt",
            type: "text",
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
        },
        {
            name: "imageUrl",
            label: "Image URL",
            type: "text",
        },
        {
            name: "slug",
            label: "Slug",
            type: "text",
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
        },
        lexicalHTML("description", { name: "description_html" }),
        // {
        //   name: 'image',
        //   label: 'Image',
        //   type: 'upload',
        //   relationTo: 'uploads',
        // },
    ],
};
