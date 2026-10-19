"use client";

import Link from "next/link";
import { ArrowLeft, ChevronLeft, ChevronRight, X } from "lucide-react";
import { cn } from "@/lib/utils";

function NeighborControl({
    slug,
    label,
    direction,
}: {
    slug: string | null;
    label: string;
    direction: "previous" | "next";
}) {
    const className =
        "inline-flex h-10 w-10 items-center justify-center rounded-full text-neutral-200 transition-colors hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary disabled:pointer-events-none disabled:opacity-30";
    const icon =
        direction === "previous" ? <ChevronLeft className="h-5 w-5" /> : <ChevronRight className="h-5 w-5" />;

    if (!slug) {
        return (
            <button type="button" className={className} disabled aria-label={label}>
                {icon}
            </button>
        );
    }

    return (
        <Link href={`/projects/${slug}`} scroll={false} aria-label={label} className={className}>
            {icon}
        </Link>
    );
}

export default function ProjectUtilityBar({
    mode,
    indexLabel,
    totalLabel,
    previousSlug,
    nextSlug,
}: {
    mode: "sheet" | "page";
    indexLabel: string;
    totalLabel: string;
    previousSlug: string | null;
    nextSlug: string | null;
}) {
    function closeSheet() {
        window.location.assign("/#projects");
    }

    return (
        <div className="sticky top-0 z-20 flex h-14 items-center justify-between gap-3 bg-neutral-950/95 px-4 backdrop-blur-md sm:px-6">
            {mode === "sheet" ? (
                <button
                    type="button"
                    onClick={closeSheet}
                    className="inline-flex h-10 items-center gap-2 rounded-full px-2 text-sm text-neutral-200 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                >
                    <ArrowLeft className="h-4 w-4" />
                    Back to Projects
                </button>
            ) : (
                <Link
                    href="/#projects"
                    className="inline-flex h-10 items-center gap-2 rounded-full px-2 text-sm text-neutral-200 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                >
                    <ArrowLeft className="h-4 w-4" />
                    Back to Projects
                </Link>
            )}

            <div className="flex items-center gap-1 sm:gap-2">
                <p className="mb-0 px-2 text-sm tabular-nums text-neutral-300">
                    {indexLabel} <span className="text-neutral-500">/</span> {totalLabel}
                </p>
                <NeighborControl slug={previousSlug} label="Previous project" direction="previous" />
                <NeighborControl slug={nextSlug} label="Next project" direction="next" />
                {mode === "sheet" ? (
                    <button
                        type="button"
                        onClick={closeSheet}
                        aria-label="Close project"
                        className={cn(
                            "inline-flex h-10 w-10 items-center justify-center rounded-full text-neutral-200 transition-colors hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
                        )}
                    >
                        <X className="h-5 w-5" />
                    </button>
                ) : null}
            </div>
        </div>
    );
}
