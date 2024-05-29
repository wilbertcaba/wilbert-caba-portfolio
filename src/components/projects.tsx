"use client";

import React, { useState, useEffect } from "react";
import SectionHeading from "./section-heading";
// import { projectsData } from "@/lib/data";
import Project from "./project";
import { useSectionInView } from "@/lib/hooks";
import { ProjectProps } from "@/lib/types";

export default function Projects(props: { id: number }) {
    const { ref } = useSectionInView("Projects", 0.3);

    const [project, setProject] = useState([]);

    useEffect(() => {
        fetch(`/api/projects/`)
            .then((res) => res.json())
            .then((data) => {
                setProject(data);
                console.log(project);
            });
    }, []);

    return (
        <section ref={ref} className="scroll-mt-28 mb-28" id="projects">
            <SectionHeading>My Projects</SectionHeading>
            <div>
                {project.map((project: ProjectProps, index) => (
                    <React.Fragment key={index}>
                        <Project {...project} />
                    </React.Fragment>
                ))}
            </div>
        </section>
    );
}
