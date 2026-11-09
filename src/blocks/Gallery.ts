import type { Block } from "payload";

export const GalleryBlock: Block = {
    slug: "gallery",
    interfaceName: "GalleryBlock",
    labels: {
        singular: "Gallery",
        plural: "Galleries",
    },
    fields: [
        {
            name: "images",
            label: "Images",
            type: "array",
            minRows: 1,
            required: true,
            labels: {
                singular: "Image",
                plural: "Images",
            },
            admin: {
                description: "Shown one at a time. The thumbnail strip uses each image’s thumbnail size.",
                initCollapsed: true,
            },
            fields: [
                {
                    name: "image",
                    label: "Image",
                    type: "upload",
                    relationTo: "media",
                    required: true,
                    filterOptions: {
                        mimeType: {
                            contains: "image",
                        },
                    },
                },
                {
                    name: "alt",
                    label: "Alt text",
                    type: "text",
                    admin: {
                        description: "Overrides the media alt text for this slide. Leave blank to use the media alt text.",
                    },
                },
            ],
        },
    ],
};
