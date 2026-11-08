import type { Block } from "payload";

function isHttpsEmbedUrl(value: unknown) {
    if (typeof value !== "string" || !value.trim()) return "Enter an embed URL.";

    try {
        const url = new URL(value.trim());
        if (url.protocol !== "https:") return "Embed URLs must use HTTPS.";
        return true;
    } catch {
        return "Enter a valid URL.";
    }
}

export const IframeBlock: Block = {
    slug: "iframe",
    interfaceName: "IframeBlock",
    labels: {
        singular: "Iframe",
        plural: "Iframes",
    },
    fields: [
        {
            name: "url",
            label: "URL",
            type: "text",
            required: true,
            validate: isHttpsEmbedUrl,
            admin: {
                description: "Embed URL (YouTube, Figma, CodePen, etc.). Must be HTTPS.",
            },
        },
        {
            name: "title",
            label: "Title",
            type: "text",
            required: true,
            admin: {
                description: "Accessible label announced by screen readers.",
            },
        },
        {
            name: "height",
            label: "Height (px)",
            type: "number",
            required: true,
            defaultValue: 400,
            min: 120,
            admin: {
                description: "Iframe height in pixels. Width is always full content width.",
            },
        },
    ],
};
