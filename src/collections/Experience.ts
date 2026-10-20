import { lexicalHTML } from "@payloadcms/richtext-lexical";
import { CollectionConfig } from "payload";
import { contentRichTextEditor } from "@/lib/lexical";

export const Experience: CollectionConfig = {
    slug: "experience",
    // Drag rows in the admin list. The homepage renders in this order.
    orderable: true,
    defaultSort: "_order",
    labels: {
        singular: "Experience",
        plural: "Experience",
    },
    admin: {
        useAsTitle: "company",
        defaultColumns: ["company", "title", "date"],
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
