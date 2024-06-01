import { CollectionConfig } from "payload/types";

export const Media: CollectionConfig = {
    slug: "media",
    upload: {
        staticDir: "media",
        imageSizes: [
            {
                name: "thumbnail",
                width: 400,
                height: 300,
                position: "center",
            },
            {
                name: "hero",
                width: 1200,
                height: undefined,
                position: "center",
            },
            {
                name: "card",
                width: 360,
                height: undefined,
                position: "center",
            },
        ],
        adminThumbnail: "thumbnail",
        mimeTypes: ["image/*"],
    },
    fields: [
        {
            name: "alt",
            type: "text",
            required: true,
        },
    ],
};
