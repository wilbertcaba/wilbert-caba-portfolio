"use client";

import { useEffect, useRef, useState, type MouseEvent } from "react";
import { cn } from "@/lib/utils";
import { useProjectScrollElement } from "@/components/project/project-scroll";

export type SectionLink = {
    id: string;
    title: string;
};

function prefersReducedMotion() {
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function sectionDomId(id: string) {
    return `section-${id}`;
}

export default function SectionNav({ sections }: { sections: SectionLink[] }) {
    const scrollElement = useProjectScrollElement();
    const [activeId, setActiveId] = useState(sections[0]?.id ?? "");
    const clickedAt = useRef(0);
    const tabsRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setActiveId(sections[0]?.id ?? "");
    }, [sections]);

    useEffect(() => {
        if (!sections.length) return;

        const elements = sections
            .map((section) => document.getElementById(sectionDomId(section.id)))
            .filter((element): element is HTMLElement => element !== null);

        if (!elements.length) return;

        const visible = new Map<string, boolean>();
        const topOffset = window.matchMedia("(min-width: 1024px)").matches ? 72 : 128;

        const observer = new IntersectionObserver(
            (entries) => {
                if (Date.now() - clickedAt.current < 800) return;

                for (const entry of entries) {
                    const id = entry.target.id.replace(/^section-/, "");
                    if (entry.isIntersecting) visible.set(id, true);
                    else visible.delete(id);
                }

                const nextActive = sections.find((section) => visible.has(section.id));
                if (nextActive) setActiveId(nextActive.id);
            },
            {
                root: scrollElement,
                rootMargin: `-${topOffset}px 0px -50% 0px`,
                threshold: [0, 0.15, 0.4],
            },
        );

        elements.forEach((element) => observer.observe(element));

        let frame = 0;
        const onScroll = () => {
            if (frame) return;
            frame = window.requestAnimationFrame(() => {
                frame = 0;
                if (Date.now() - clickedAt.current < 800) return;

                const scrollTop = scrollElement ? scrollElement.scrollTop : window.scrollY;
                const clientHeight = scrollElement ? scrollElement.clientHeight : window.innerHeight;
                const scrollHeight = scrollElement
                    ? scrollElement.scrollHeight
                    : document.documentElement.scrollHeight;

                if (scrollTop + clientHeight >= scrollHeight - 4) {
                    const last = sections[sections.length - 1];
                    if (last) setActiveId(last.id);
                }
            });
        };

        const target = scrollElement ?? window;
        target.addEventListener("scroll", onScroll, { passive: true });

        return () => {
            observer.disconnect();
            target.removeEventListener("scroll", onScroll);
            if (frame) window.cancelAnimationFrame(frame);
        };
    }, [scrollElement, sections]);

    useEffect(() => {
        const container = tabsRef.current;
        const tab = container?.querySelector<HTMLElement>(`[data-section-id="${activeId}"]`);
        if (!container || !tab) return;

        const containerBounds = container.getBoundingClientRect();
        const tabBounds = tab.getBoundingClientRect();
        const fullyVisible = tabBounds.left >= containerBounds.left && tabBounds.right <= containerBounds.right;
        if (fullyVisible) return;

        tab.scrollIntoView({
            inline: "center",
            block: "nearest",
            behavior: prefersReducedMotion() ? "auto" : "smooth",
        });
    }, [activeId]);

    if (!sections.length) return null;

    function selectSection(event: MouseEvent<HTMLAnchorElement>, id: string) {
        event.preventDefault();
        clickedAt.current = Date.now();
        setActiveId(id);
        document.getElementById(sectionDomId(id))?.scrollIntoView({
            behavior: prefersReducedMotion() ? "auto" : "smooth",
            block: "start",
        });
    }

    return (
        <nav
            aria-label="Project sections"
            className="sticky top-14 z-10 bg-neutral-950/95 backdrop-blur-md lg:self-start lg:bg-transparent lg:backdrop-blur-none"
        >
            <div
                ref={tabsRef}
                className="scrollbar-none flex gap-1 overflow-x-auto border-b border-white/10 px-4 lg:flex-col lg:gap-0 lg:overflow-visible lg:border-0 lg:px-0"
            >
                {sections.map((section, index) => {
                    const active = section.id === activeId;
                    const label = `${String(index + 1).padStart(2, "0")} ${section.title}`;

                    return (
                        <a
                            key={section.id}
                            href={`#${sectionDomId(section.id)}`}
                            data-section-id={section.id}
                            aria-current={active ? "true" : undefined}
                            onClick={(event) => selectSection(event, section.id)}
                            className={cn(
                                "shrink-0 border-b-2 border-transparent px-3 py-3 text-sm text-neutral-500 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary lg:border-b-0 lg:border-l-2 lg:px-4 lg:py-2.5",
                                active ? "border-primary text-primary" : "hover:text-neutral-200",
                            )}
                        >
                            {label}
                        </a>
                    );
                })}
            </div>
        </nav>
    );
}
