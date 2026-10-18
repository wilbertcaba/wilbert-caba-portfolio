import config from "@payload-config";
import { getPayload } from "payload";
import type { Experience, Homepage, Media, Project } from "@/payload-types";

function isMedia(value: number | Media | null | undefined): value is Media {
    return typeof value === "object" && value !== null;
}

export type ProjectWithMedia = Omit<Project, "featuredImage"> & {
    featuredImage: Media;
    projectIndex: string;
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
    ).map((project, index) => ({
        ...project,
        projectIndex: String(index + 1).padStart(2, "0"),
    }));
}

export async function fetchSingleProject(slug: string): Promise<ProjectWithMedia | null> {
    const projects = await fetchProjects();

    return projects.find((project) => project.slug === slug) ?? null;
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
