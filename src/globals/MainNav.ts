import { GlobalConfig } from "payload";

export const MainNav: GlobalConfig = {
    slug: "main-navigation",

    fields: [
        {
            name: "navigation",
            type: "array",
            labels: {
                singular: "Navigation Item",
                plural: "Navigation Items",
            },
            fields: [
                {
                    name: "label",
                    label: "Label",
                    type: "text",
                    required: true,
                },
                {
                    name: "link",
                    label: "Link",
                    type: "text",
                    required: true,
                },
            ],
        },
    ],
};
