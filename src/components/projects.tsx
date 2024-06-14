"use client";

import React, { useState, useEffect } from "react";
import SectionHeading from "./section-heading";
import Project from "./project";
import { useSectionInView } from "@/lib/hooks";
import { ProjectProps } from "@/lib/types";

export default function Projects({ data }: { data: ProjectProps[] }) {
    const { ref } = useSectionInView("Projects", 0.3);

    if (!data) {
        return <div>Loading...</div>;
    }

    return (
        <section ref={ref} className="scroll-mt-28 mb-28" id="projects">
            <SectionHeading>My Projects</SectionHeading>
            <div>
                {data.map((project, index) => (
                    <React.Fragment key={index}>
                        <Project {...project} />
                    </React.Fragment>
                ))}
            </div>
        </section>
    );
}
