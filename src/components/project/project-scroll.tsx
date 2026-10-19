"use client";

import { createContext, useContext, type ReactNode } from "react";

const ProjectScrollContext = createContext<HTMLElement | null>(null);

export function ProjectScrollProvider({
    element,
    children,
}: {
    element: HTMLElement | null;
    children: ReactNode;
}) {
    return <ProjectScrollContext.Provider value={element}>{children}</ProjectScrollContext.Provider>;
}

export function useProjectScrollElement() {
    return useContext(ProjectScrollContext);
}
