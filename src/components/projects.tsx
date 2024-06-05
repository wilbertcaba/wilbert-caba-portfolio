"use client";

import React, { useState, useEffect } from "react";
import SectionHeading from "./section-heading";
import Project from "./project";
import { useSectionInView } from "@/lib/hooks";
import { ProjectProps } from "@/lib/types";

export default function Projects() {
    const { ref } = useSectionInView("Projects", 0.3);
    const [projects, setProjects] = useState<ProjectProps[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const response = await fetch("/api/Projects");
                const data = await response.json();
                console.log("Data received for projects:", data);
                setProjects(data.docs);
                setError(null);
            } catch (error) {
                console.log("We got this error: ", error);
                setError("Failed to fetch projects.");
                setProjects([]);
            }
        };
        fetchProjects();
    }, []);

    return (
        <section ref={ref} className="scroll-mt-28 mb-28" id="projects">
            <SectionHeading>My Projects</SectionHeading>
            <div>
                {error && <p>{error}</p>}
                {projects.map((project, index) => (
                    <React.Fragment key={index}>
                        <Project {...project} />
                    </React.Fragment>
                ))}
            </div>
        </section>
    );
}
