import type { Project } from "@/payload-types";

export default function Tags({ tags, className }: { tags: Project["tags"]; className?: string }) {
    return (
        <ul className={`flex flex-wrap mt-4 gap-2 sm:mt-auto ${className ?? ""}`}>
            {tags.map((tag, index) => (
                <li
                    className="bg-black/[0.7] px-3 py-1 text-[0.7rem] uppercase tracking-wider text-white rounded-full dark:text-white/70 dark:border dark:border-neutral-600 dark:bg-neutral-900"
                    key={tag.id ?? index}
                >
                    {tag.tag}
                </li>
            ))}
        </ul>
    );
}
