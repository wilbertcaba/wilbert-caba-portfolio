/** Page sections observed for the nav active state. Jump links use these ids (`#home`). */
export const pageSections = ["home", "projects", "about", "skills", "experience", "contact"] as const;

export type SectionName = (typeof pageSections)[number];

export type NavLink = {
    id: string;
    label: string;
    href: string;
};

export function sectionIdFromHref(href: string) {
    const value = href.trim();
    return value.startsWith("#") ? value.slice(1) : value;
}

export function isSectionName(value: string): value is SectionName {
    return (pageSections as readonly string[]).includes(value);
}
