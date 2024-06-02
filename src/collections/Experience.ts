import { HTMLConverterFeature, lexicalEditor, lexicalHTML } from "@payloadcms/richtext-lexical";
import { CollectionConfig } from "payload/types";

export const Experience: CollectionConfig = {
    slug: "experience",

    fields: [
        {
            name: "logo",
            label: "Logo",
            type: "upload",
            relationTo: "media",
            required: true,
        },
        {
            name: "company",
            label: "Company",
            type: "text",
            required: true,
        },
        {
            name: "title",
            label: "Title",
            type: "text",
            required: true,
        },
        {
            name: "location",
            label: "Location",
            type: "text",
            required: true,
        },
        {
            name: "date",
            label: "Date",
            type: "text",
            required: true,
        },
        {
            name: "description",
            label: "description",
            type: "richText",
            editor: lexicalEditor({
                features: ({ defaultFeatures }) => [...defaultFeatures, HTMLConverterFeature({})],
            }),
            required: true,
        },
        lexicalHTML("description", { name: "descriptionHTML" }),
    ],
};
