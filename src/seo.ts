import type { GenerateDescription, GenerateImage, GenerateTitle, GenerateURL, SEOPluginConfig } from "@payloadcms/plugin-seo/types";
import type { Field } from "payload";

type MediaReference = number | string | { id?: number | string | null } | null;

type SeoDocument = {
    title?: string | null;
    excerpt?: string | null;
    slug?: string | null;
    featuredImage?: MediaReference;
    main_value_proposition?: string | null;
    logo?: MediaReference;
};

function withProtocol(hostOrUrl: string) {
    const configured = hostOrUrl.trim();
    if (/^https?:\/\//i.test(configured)) return configured.replace(/\/$/, "");

    const host = configured.replace(/\/$/, "");
    const protocol = host.startsWith("localhost") || host.startsWith("127.0.0.1") ? "http" : "https";
    return `${protocol}://${host}`;
}

/** Preview deployment hosts look like `project-git-branch-team.vercel.app`. */
function isVercelPreviewHost(hostname: string) {
    return hostname.endsWith(".vercel.app") && hostname.includes("-git-");
}

export function getSiteURL() {
    const configured = process.env.BASE_URL?.trim();
    if (configured) {
        const url = withProtocol(configured);
        try {
            if (!isVercelPreviewHost(new URL(url).hostname)) return url;
        } catch {
            // Ignore a malformed BASE_URL and use the deployment host below.
        }
    }

    const productionHost = process.env.VERCEL_PROJECT_PRODUCTION_URL?.trim();
    if (process.env.VERCEL_ENV === "production" && productionHost) return withProtocol(productionHost);

    const deploymentHost = process.env.VERCEL_URL?.trim();
    if (deploymentHost) return withProtocol(deploymentHost);

    return "http://localhost:3000";
}

const openGraphFields: Field[] = [
    {
        name: "openGraph",
        type: "group",
        label: "Open Graph",
        admin: {
            description:
                "Link preview title, description, and image. Empty fields fall back to the meta title, description, and image above.",
        },
        fields: [
            {
                name: "title",
                type: "text",
                label: "Title",
            },
            {
                name: "description",
                type: "textarea",
                label: "Description",
            },
            {
                name: "image",
                type: "upload",
                relationTo: "media",
                label: "Image",
                admin: {
                    description: "Shown on the link card. Use 1200×630 and keep it under 500KB.",
                },
            },
        ],
    },
];

export const seoFields: NonNullable<SEOPluginConfig["fields"]> = ({ defaultFields }) => {
    const fields: Field[] = defaultFields.map((field) => {
        if (!("name" in field) || field.name !== "image" || field.type !== "upload") return field;

        return {
            ...field,
            admin: {
                ...field.admin,
                description:
                    "Search and sharing fallback. Link previews use the Open Graph image when that field is set. Maximum upload file size: 12MB. Recommended file size for images is <500KB.",
            },
        } as Field;
    });

    const previewIndex = fields.findIndex((field) => "name" in field && field.name === "preview");
    if (previewIndex === -1) return [...fields, ...openGraphFields];

    return [...fields.slice(0, previewIndex), ...openGraphFields, ...fields.slice(previewIndex)];
};

function mediaId(value: MediaReference | undefined) {
    if (typeof value === "number" || typeof value === "string") return value;
    if (value && typeof value === "object" && value.id != null) return value.id;
    return "";
}

export const generateTitle: GenerateTitle<SeoDocument> = ({ doc, collectionSlug }) => {
    if (collectionSlug === "Projects") {
        const title = doc?.title?.trim();
        return title ? `${title} | Wilbert Caba` : "Wilbert Caba";
    }

    return "Wilbert Caba | Personal Portfolio";
};

export const generateDescription: GenerateDescription<SeoDocument> = ({ doc, collectionSlug }) => {
    if (collectionSlug === "Projects") return doc?.excerpt?.trim() || "";
    return doc?.main_value_proposition?.trim() || "";
};

export const generateImage: GenerateImage<SeoDocument> = ({ doc, collectionSlug }) => {
    return mediaId(collectionSlug === "Projects" ? doc?.featuredImage : doc?.logo);
};

export const generateURL: GenerateURL<SeoDocument> = ({ doc, collectionSlug }) => {
    const siteURL = getSiteURL();
    if (collectionSlug === "Projects") {
        const slug = doc?.slug?.trim();
        return slug ? `${siteURL}/projects/${slug}` : siteURL;
    }

    return siteURL;
};
