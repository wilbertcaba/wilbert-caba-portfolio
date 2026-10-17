import config from "@payload-config";
import { getPayload } from "payload";
import type { Experience, Homepage, Media, Project } from "@/payload-types";

function isMedia(value: number | Media | null | undefined): value is Media {
    return typeof value === "object" && value !== null;
}

export type ProjectWithMedia = Omit<Project, "featuredImage"> & {
    featuredImage: Media;
};

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

export async function fetchProjects(): Promise<ProjectWithMedia[]> {
    const payload = await getCms();
    const { docs } = await payload.find({
        collection: "Projects",
        depth: 1,
        pagination: false,
    });

    return docs.flatMap((project) =>
        isMedia(project.featuredImage) ? [{ ...project, featuredImage: project.featuredImage }] : [],
    );
}

export async function fetchSingleProject(slug: string): Promise<ProjectWithMedia | null> {
    const payload = await getCms();
    const { docs } = await payload.find({
        collection: "Projects",
        depth: 1,
        limit: 1,
        where: {
            slug: {
                equals: slug,
            },
        },
    });

    const project = docs[0];

    if (!project || !isMedia(project.featuredImage)) {
        return null;
    }

    return { ...project, featuredImage: project.featuredImage };
}

export async function fetchExperiences(): Promise<ExperienceWithMedia[]> {
    const payload = await getCms();
    const { docs } = await payload.find({
        collection: "experience",
        depth: 1,
        pagination: false,
    });

    return docs.map((experience) => ({
        ...experience,
        logo: isMedia(experience.logo) ? experience.logo : null,
    }));
}

export async function fetchHomepage(): Promise<HomepageWithMedia> {
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
}
