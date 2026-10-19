import type { Project } from "@/payload-types";
import { cn } from "@/lib/utils";

export default function Tags({ tags, className }: { tags: Project["tags"]; className?: string }) {
    return (
        <ul className={cn("mt-4 flex flex-wrap gap-2 sm:mt-auto", className)}>
            {tags.map((tag, index) => (
                <li
                    className="rounded-full border border-neutral-600 bg-neutral-900 px-3 py-1 text-[0.7rem] uppercase tracking-wider text-white/70"
                    key={tag.id ?? index}
                >
                    {tag.tag}
                </li>
            ))}
        </ul>
    );
}
