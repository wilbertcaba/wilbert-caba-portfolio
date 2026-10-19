"use client";

import { useEffect, useRef, useState } from "react";
import { Drawer, DrawerContent, DrawerDescription, DrawerHandle, DrawerTitle } from "@/components/ui/drawer";
import { ProjectScrollProvider } from "@/components/project/project-scroll";

export default function ProjectSheet({
    slug,
    title,
    description,
    children,
}: {
    slug: string;
    title: string;
    description: string;
    children: React.ReactNode;
}) {
    const closing = useRef(false);
    const [scrollElement, setScrollElement] = useState<HTMLDivElement | null>(null);

    useEffect(() => {
        const previous = window.history.scrollRestoration;
        window.history.scrollRestoration = "manual";
        return () => {
            window.history.scrollRestoration = previous;
        };
    }, []);

    useEffect(() => {
        scrollElement?.scrollTo({ top: 0 });
    }, [slug, scrollElement]);

    function close() {
        if (closing.current) return;
        closing.current = true;
        // Client navigation to "/#projects" is treated as a hash change on the
        // homepage behind the intercept, so the sheet stays mounted.
        window.location.assign("/#projects");
    }

    return (
        <Drawer open onOpenChange={(open) => !open && close()} handleOnly dismissible shouldScaleBackground={false} setBackgroundColorOnScale={false}>
            <DrawerContent
                onCloseAutoFocus={(event) => {
                    const link = document.querySelector<HTMLElement>(`a[href="/projects/${slug}"]`);
                    if (!link) return;
                    event.preventDefault();
                    link.focus();
                }}
            >
                <DrawerTitle className="sr-only">{title}</DrawerTitle>
                <DrawerDescription className="sr-only">{description}</DrawerDescription>
                <DrawerHandle />
                <ProjectScrollProvider element={scrollElement}>
                    <div
                        ref={setScrollElement}
                        className="project-sheet-scroll min-h-0 flex-1 overflow-y-auto overscroll-contain pb-[env(safe-area-inset-bottom)]"
                    >
                        <div key={slug}>{children}</div>
                    </div>
                </ProjectScrollProvider>
            </DrawerContent>
        </Drawer>
    );
}
