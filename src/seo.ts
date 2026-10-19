import type { GenerateDescription, GenerateImage, GenerateTitle, GenerateURL } from "@payloadcms/plugin-seo/types";

type MediaReference = number | string | { id?: number | string | null } | null;

type SeoDocument = {
    title?: string | null;
    excerpt?: string | null;
    slug?: string | null;
    featuredImage?: MediaReference;
    main_value_proposition?: string | null;
    logo?: MediaReference;
};

export function getSiteURL() {
    const configured = process.env.BASE_URL?.trim() || "localhost:3000";
    if (/^https?:\/\//i.test(configured)) return configured.replace(/\/$/, "");

    const host = configured.replace(/\/$/, "");
    const protocol = host.startsWith("localhost") || host.startsWith("127.0.0.1") ? "http" : "https";
    return `${protocol}://${host}`;
}

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
