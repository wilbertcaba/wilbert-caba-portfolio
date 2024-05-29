import { links } from "./data";
// import { projectsData } from "@/lib/data";

export type SectionName = (typeof links)[number]["name"];
// export type ProjectProps = (typeof projectsData)[number];

export type ProjectProps = {
    id: number;
    title: string;
    excerpt: string;
    projectLink: string;
    role: string;
    tags: string[];
    // tags: string[];
    imageUrl: string;
    slug: string;
    description_html: string;
};
