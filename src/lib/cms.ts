import { cache } from "react";
import config from "@payload-config";
import type { Metadata } from "next";
import { getPayload } from "payload";
import type { Experience, Homepage, Media, Project } from "@/payload-types";
import type { NavLink } from "@/lib/types";
import { getSiteURL } from "@/seo";

function isMedia(value: number | Media | null | undefined): value is Media {
    return typeof value === "object" && value !== null && "url" in value;
}

/** Newest project first. This matches the current homepage sequence. */
export const projectSort = "-createdAt";

export type ProjectCard = {
    id: number;
    title: string;
    eyebrow: string;
    excerpt: string;
    slug: string;
    tags: Project["tags"];
    featuredImage: Media;
    projectIndex: string;
};

export type ProjectSectionContent = NonNullable<NonNullable<Project["sections"]>[number]["content"]>;

export type ProjectSection = {
    id: string;
    title: string;
    content: ProjectSectionContent | null;
    html: string | null;
};

export type ProjectNeighbor = {
    slug: string;
    title: string;
};

export type FeaturedBackground = {
    type: "none" | "color" | "image" | "pattern";
    color: string | null;
    image: Media | null;
    pattern: "dots" | "grid" | "triangles" | null;
    inset: "none" | "sm" | "md" | "lg";
};

export type ProjectDetail = {
    id: number;
    title: string;
    eyebrow: string;
    excerpt: string;
    slug: string;
    role: string;
    projectLink: string | null;
    tags: Project["tags"];
    featuredImage: Media;
    featuredBackground: FeaturedBackground;
    sections: ProjectSection[];
    indexLabel: string;
    totalLabel: string;
    previous: ProjectNeighbor | null;
    next: ProjectNeighbor | null;
};

/** @deprecated Use ProjectCard. Kept so older imports keep compiling during the redesign. */
export type ProjectWithMedia = ProjectCard;

export type ExperienceWithMedia = Omit<Experience, "logo"> & {
    logo: Media | null;
};

export type HomepageSkill = {
    id?: string | null;
    skill: string;
    icon: Media;
};

export type HomepageWithMedia = Omit<Homepage, "logo" | "resume" | "skills"> & {
    logo: Media;
    resume: Media | null;
    skills: HomepageSkill[];
};

async function getCms() {
    return getPayload({ config });
}

function formatIndex(index: number) {
    return String(index + 1).padStart(2, "0");
}

function toFeaturedBackground(project: Project): FeaturedBackground {
    const background = project.featuredBackground;
    const type = background?.type ?? "none";
    const image = isMedia(background?.image) ? background.image : null;

    return {
        type: type === "image" && !image?.url ? "none" : type,
        color: background?.color ?? null,
        image,
        pattern: background?.pattern ?? null,
        inset: background?.inset ?? "md",
    };
}

function toSections(project: Project): ProjectSection[] {
    const sections = (project.sections ?? []).flatMap((section) => {
        const title = section.title?.trim();
        if (!section.id || !title) return [];

        return [
            {
                id: section.id,
                title,
                content: section.content ?? null,
                html: null,
            },
        ];
    });

    if (sections.length > 0) return sections;

    const legacyHtml = project.description_html?.trim();
    if (!legacyHtml) return [];

    return [
        {
            id: "legacy-overview",
            title: "Overview",
            content: null,
            html: legacyHtml,
        },
    ];
}

export async function fetchProjects(): Promise<ProjectCard[]> {
    const payload = await getCms();
    const { docs } = await payload.find({
        collection: "Projects",
        depth: 1,
        pagination: false,
        sort: projectSort,
        select: {
            title: true,
            eyebrow: true,
            excerpt: true,
            slug: true,
            tags: true,
            featuredImage: true,
        },
    });

    return docs
        .flatMap((project) => {
            if (!isMedia(project.featuredImage) || !project.featuredImage.url) return [];

            return [
                {
                    id: project.id,
                    title: project.title,
                    eyebrow: project.eyebrow,
                    excerpt: project.excerpt,
                    slug: project.slug,
                    tags: project.tags ?? [],
                    featuredImage: project.featuredImage,
                },
            ];
        })
        .map((project, index) => ({
            ...project,
            projectIndex: formatIndex(index),
        }));
}

export const fetchProjectDetail = cache(async (slug: string): Promise<ProjectDetail | null> => {
    const payload = await getCms();
    const [result, indexResult] = await Promise.all([
        payload.find({
            collection: "Projects",
            where: {
                slug: {
                    equals: slug,
                },
            },
            depth: 2,
            limit: 1,
        }),
        payload.find({
            collection: "Projects",
            depth: 0,
            pagination: false,
            sort: projectSort,
            select: {
                slug: true,
                title: true,
            },
        }),
    ]);

    const project = result.docs[0];
    if (!project || !isMedia(project.featuredImage) || !project.featuredImage.url) return null;

    const items = indexResult.docs;
    const currentIndex = items.findIndex((item) => item.slug === slug);
    if (currentIndex === -1) return null;

    const previous = items[currentIndex - 1];
    const next = items[currentIndex + 1];

    return {
        id: project.id,
        title: project.title,
        eyebrow: project.eyebrow,
        excerpt: project.excerpt,
        slug: project.slug,
        role: project.role,
        projectLink: project.projectLink?.trim() || null,
        tags: project.tags ?? [],
        featuredImage: project.featuredImage,
        featuredBackground: toFeaturedBackground(project),
        sections: toSections(project),
        indexLabel: formatIndex(currentIndex),
        totalLabel: formatIndex(items.length - 1),
        previous: previous ? { slug: previous.slug, title: previous.title } : null,
        next: next ? { slug: next.slug, title: next.title } : null,
    };
});

const defaultHomepageTitle = "Wilbert Caba | Personal Portfolio";
const defaultHomepageDescription =
    "Wilbert Caba is a UX Developer with 17 years of combined experience on UX Design and Front-End Development";

type SeoMeta = {
    title?: string | null;
    description?: string | null;
    image?: number | Media | null;
    openGraph?: {
        title?: string | null;
        description?: string | null;
        image?: number | Media | null;
    } | null;
} | null | undefined;

function imageSize(value: number | string | null | undefined) {
    const size = typeof value === "number" ? value : typeof value === "string" ? Number(value) : Number.NaN;
    return Number.isFinite(size) && size > 0 ? size : undefined;
}

function socialImage(image: Media | null | undefined, alt: string): NonNullable<Metadata["openGraph"]>["images"] {
    if (!image?.url) return undefined;

    return [
        {
            url: image.url,
            alt: image.alt?.trim() || alt,
            width: imageSize(image.width),
            height: imageSize(image.height),
        },
    ];
}

function mediaWithUrl(value: number | Media | null | undefined) {
    return isMedia(value) && value.url ? value : null;
}

function resolveSocialMeta(
    meta: SeoMeta,
    fallback: { title: string; description: string; image?: Media | null },
) {
    const title = meta?.title?.trim() || fallback.title;
    const description = meta?.description?.trim() || fallback.description;
    const image = mediaWithUrl(meta?.openGraph?.image) ?? mediaWithUrl(meta?.image) ?? fallback.image ?? null;

    return {
        title,
        description,
        openGraphTitle: meta?.openGraph?.title?.trim() || title,
        openGraphDescription: meta?.openGraph?.description?.trim() || description,
        image,
    };
}

export async function getProjectMetadata(slug: string): Promise<Metadata> {
    const payload = await getCms();
    const result = await payload.find({
        collection: "Projects",
        where: {
            slug: {
                equals: slug,
            },
        },
        depth: 1,
        limit: 1,
        select: {
            title: true,
            excerpt: true,
            slug: true,
            featuredImage: true,
            meta: true,
        },
    });

    const project = result.docs[0];
    if (!project) {
        return { title: "Project not found | Wilbert Caba" };
    }

    const social = resolveSocialMeta(project.meta, {
        title: `${project.title} | Wilbert Caba`,
        description: project.excerpt,
        image: isMedia(project.featuredImage) ? project.featuredImage : null,
    });
    const images = socialImage(social.image, social.openGraphTitle);

    return {
        title: social.title,
        description: social.description,
        openGraph: {
            title: social.openGraphTitle,
            description: social.openGraphDescription,
            url: `/projects/${project.slug}`,
            type: "article",
            images,
        },
        twitter: {
            card: images ? "summary_large_image" : "summary",
            title: social.openGraphTitle,
            description: social.openGraphDescription,
            images,
        },
    };
}

export async function getHomepageMetadata(): Promise<Metadata> {
    const homepage = await fetchHomepage();

    const social = resolveSocialMeta(homepage.meta, {
        title: defaultHomepageTitle,
        description: defaultHomepageDescription,
    });
    const images = socialImage(social.image, social.openGraphTitle);

    return {
        metadataBase: new URL(getSiteURL()),
        title: social.title,
        description: social.description,
        openGraph: {
            title: social.openGraphTitle,
            description: social.openGraphDescription,
            url: "/",
            type: "website",
            images,
        },
        twitter: {
            card: images ? "summary_large_image" : "summary",
            title: social.openGraphTitle,
            description: social.openGraphDescription,
            images,
        },
    };
}

export async function fetchExperiences(): Promise<ExperienceWithMedia[]> {
    const payload = await getCms();
    const { docs } = await payload.find({
        collection: "experience",
        depth: 1,
        pagination: false,
        sort: "_order",
    });

    return docs.map((experience) => ({
        ...experience,
        logo: isMedia(experience.logo) ? experience.logo : null,
    }));
}

export async function fetchMainNavigation(): Promise<NavLink[]> {
    const payload = await getCms();
    const mainNav = await payload.findGlobal({
        slug: "main-navigation",
        depth: 0,
    });

    return (mainNav.navigation ?? []).flatMap((item) => {
        const label = item.label?.trim();
        const href = item.link?.trim();
        if (!label || !href) return [];

        return [
            {
                id: item.id ?? href,
                label,
                href,
            },
        ];
    });
}

export const fetchHomepage = cache(async (): Promise<HomepageWithMedia> => {
    const payload = await getCms();
    const homepage = await payload.findGlobal({
        slug: "homepage",
        depth: 1,
    });

    if (!isMedia(homepage.logo)) {
        throw new Error("Homepage logo is missing.");
    }

    return {
        ...homepage,
        logo: homepage.logo,
        resume: isMedia(homepage.resume) ? homepage.resume : null,
        skills: homepage.skills.flatMap((skill) =>
            isMedia(skill.icon) && skill.icon.url ? [{ id: skill.id, skill: skill.skill, icon: skill.icon }] : [],
        ),
    };
});
