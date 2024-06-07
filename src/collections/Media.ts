import { CollectionConfig } from "payload/types";

export const Media: CollectionConfig = {
    slug: "media",

    access: {
        read: () => true, // Allow read access publicly
        // create: () => false, // Only logged-in users can create
        // update: () => false, // Only logged-in users can update
        // delete: () => false, // Only logged-in users can delete
    },

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
        mimeTypes: [
            "image/*",
            "application/pdf",
            "application/rtf",
            "application/msword",
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
            "application/vnd.google-apps.document",
        ],
    },
    fields: [
        {
            name: "alt",
            type: "text",
        },
    ],
};
