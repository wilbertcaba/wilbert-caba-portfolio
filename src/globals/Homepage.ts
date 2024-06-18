import { HTMLConverterFeature, lexicalEditor, lexicalHTML } from "@payloadcms/richtext-lexical";
import { GlobalConfig } from "payload/types";

export const Homepage: GlobalConfig = {
    slug: "homepage",

    fields: [
        {
            name: "main_value_proposition",
            label: "Main Value Proposition",
            type: "text",
            required: true,
        },
        {
            name: "about",
            label: "About",
            type: "richText",
            required: true,
            editor: lexicalEditor({
                features: ({ defaultFeatures }) => [...defaultFeatures, HTMLConverterFeature({})],
            }),
        },
        lexicalHTML("about", { name: "about_html" }),
        {
            name: "resume",
            label: "Resume",
            type: "upload",
            relationTo: "media",
            admin: {
                position: "sidebar",
            },
        },
        {
            name: "skills",
            label: "Skills",
            type: "array",
            fields: [
                {
                    name: "skill",
                    type: "text",
                },
            ],
            required: true,
        },
    ],
};
