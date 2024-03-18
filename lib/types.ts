import { links } from "./data";
import { projectsData } from "@/lib/data";

export type SectionName = (typeof links)[number]["name"];
export type ProjectProps = (typeof projectsData)[number];
