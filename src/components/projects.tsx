"use client";

import React, { useState, useEffect } from "react";
import SectionHeading from "./section-heading";
import Eyebrow from "./eyebrow";
import Project from "./project";
import { useSectionInView } from "@/lib/hooks";
import type { ProjectWithMedia } from "@/lib/cms";

export default function Projects({ data }: { data: ProjectWithMedia[] }) {
    const { ref } = useSectionInView("projects", 0.3);

    if (!data) {
        return <div>Loading...</div>;
    }

    return (
        <section
            ref={ref}
            className="relative mb-28 w-full overflow-x-hidden pt-24 before:absolute before:left-1/2 before:top-10 before:-z-10 before:inline-block before:w-auto before:-translate-x-1/2 before:opacity-15 before:content-[url('/bg-text-projects.svg')] after:absolute after:left-0 after:right-0 after:top-0 after:-z-10 after:bg-gradient-to-t after:from-neutral-950 after:from-40% after:to-transparent sm:scroll-mt-28 md:after:h-96"
            id="projects"
        >
            <div className="container">
                <Eyebrow size="lg" className="text-center text-primary-300">
                    [ Selected Work ]
                </Eyebrow>
                <SectionHeading alignment="center">
                    Projects <span className="text-stroke-primary">Beyond Pixels</span>
                </SectionHeading>
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
