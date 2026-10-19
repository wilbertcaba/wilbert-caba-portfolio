import Image from "next/image";
import type { ProjectDetail } from "@/lib/cms";
import { cn } from "@/lib/utils";

const insetClass = {
    none: "p-0",
    sm: "p-3 sm:p-4",
    md: "p-4 sm:p-8 md:p-10",
    lg: "p-6 sm:p-12 md:p-16",
} as const;

const hexColorPattern = /^#(?:[0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/;

export default function FeaturedMedia({ project }: { project: ProjectDetail }) {
    const background = project.featuredBackground;
    const hasBackground = background.type !== "none";
    const color = background.color && hexColorPattern.test(background.color) ? background.color : null;

    return (
        <div className="px-4 pb-8 sm:px-6 md:px-8 md:pb-12">
            <div
                className={cn(
                    "relative overflow-hidden",
                    hasBackground && "rounded-xl",
                    hasBackground && insetClass[background.inset],
                    background.type === "pattern" && background.pattern === "dots" && "bg-neutral-900",
                    background.type === "pattern" && background.pattern === "grid" && "bg-neutral-900",
                    background.type === "pattern" &&
                        background.pattern === "triangles" &&
                        "bg-neutral-900 bg-pattern-triangles-small bg-repeat bg-[length:180px]",
                )}
                style={background.type === "color" && color ? { backgroundColor: color } : undefined}
            >
                {background.type === "image" && background.image?.url ? (
                    <Image
                        src={background.image.url}
                        alt=""
                        fill
                        sizes="100vw"
                        className="object-cover"
                    />
                ) : null}
                {background.type === "pattern" && background.pattern === "dots" ? (
                    <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle,rgba(255,255,255,0.18)_1px,transparent_1px)] bg-[size:18px_18px]" />
                ) : null}
                {background.type === "pattern" && background.pattern === "grid" ? (
                    <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px)] bg-[size:28px_28px]" />
                ) : null}
                <div className={cn("relative", hasBackground && "mx-auto max-w-5xl")}>
                    <Image
                        src={project.featuredImage.url || ""}
                        alt={project.featuredImage.alt || project.title}
                        width={project.featuredImage.width || 1600}
                        height={project.featuredImage.height || 900}
                        priority
                        sizes="(min-width: 1280px) 1024px, 100vw"
                        className="aspect-video h-auto w-full bg-neutral-900 object-contain"
                    />
                </div>
            </div>
        </div>
    );
}
