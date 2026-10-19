import { lexicalHTML } from "@payloadcms/richtext-lexical";
import { CollectionConfig } from "payload";
import { contentRichTextEditor } from "@/lib/lexical";

export const Experience: CollectionConfig = {
    slug: "experience",
    labels: {
        singular: "Experience",
        plural: "Experience",
    },
    admin: {
        useAsTitle: "company",
    },

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
            editor: contentRichTextEditor,
            required: true,
        },
        lexicalHTML("description", { name: "description_html", storeInDB: true }),
    ],
};
