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
        <section
            ref={ref}
            className="
                scroll-mt-28 pt-24 mb-28 w-full overflow-x-hidden relative
                before:content-[url('/bg-text-projects.svg')]
                before:absolute
                before:top-10
                before:inline-block
                before:w-auto
                before:left-1/2
                before:-translate-x-1/2
                before:-z-40
                before:opacity-15
            "
            id="projects"
        >
            <div className="container">
                <SectionHeading alignment="center">Explore Projects</SectionHeading>
                <div>
                    {data.map((project, index) => (
                        <React.Fragment key={index}>
                            <Project {...project} />
                        </React.Fragment>
                    ))}
                </div>
            </div>
        </section>
    );
}
