import { HTMLConverterFeature, lexicalEditor, lexicalHTML } from "@payloadcms/richtext-lexical";
import { GlobalConfig } from "payload";

export const Homepage: GlobalConfig = {
    slug: "homepage",

    fields: [
        {
            type: "tabs",
            tabs: [
                {
                    label: "Content",
                    fields: [
                        {
                            name: "logo",
                            label: "Logo",
                            type: "upload",
                            relationTo: "media",
                            required: true,
                        },
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
                        lexicalHTML("about", { name: "about_html", storeInDB: true }),
                        {
                            name: "skills",
                            label: "Skills",
                            type: "array",
                            fields: [
                                {
                                    name: "skill",
                                    label: "Skill",
                                    type: "text",
                                    required: true,
                                },
                                {
                                    name: "icon",
                                    label: "Icon",
                                    type: "upload",
                                    relationTo: "media",
                                    required: true,
                                },
                            ],
                            required: true,
                        },
                    ],
                },
            ],
        },
        {
            name: "resume",
            label: "Resume",
            type: "upload",
            relationTo: "media",
            admin: {
                position: "sidebar",
            },
        },
    ],
};
