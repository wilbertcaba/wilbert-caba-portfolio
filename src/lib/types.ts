import { links } from "./data";

export type SectionName = (typeof links)[number]["name"];

export type ProjectProps = {
    id: number;
    title: string;
    excerpt: string;
    projectLink: string;
    role: string;
    tags: string[];
    featured_image: {
        url: string;
        alt: string;
    };
    slug: string;
    description_html: string;
};

export type ExperienceProps = {
    id: number;
    company: string;
    title: string;
    date: string;
    location: string;
    description: string;
    description_html: "string";
    icon: React.ReactNode;
};

export type HomepageProps = {
    main_value_proposition: string;
    about_html: string;
    logo: {
        url: string;
        alt: string;
    };
    resume: {
        url: string;
        alt: string;
    };
};

export type SkillProps = {
    skill: string;
};
