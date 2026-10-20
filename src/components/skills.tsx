"use client";

import React from "react";
import SectionHeading from "./section-heading";
import { skillsData } from "@/lib/data";
import { motion } from "framer-motion";
import { useSectionInView } from "@/lib/hooks";
import type { Homepage } from "@/payload-types";

const fadeInAnimationVariants = {
    initial: {
        opacity: 0,
        y: 20,
    },
    animate: (index: number) => ({
        opacity: 1,
        y: 0,
        transition: {
            delay: 0.05 * index,
        },
    }),
};

export default function Skills({ data }: { data: Homepage["skills"] }) {
    const { ref } = useSectionInView("skills");

    return (
        <section id="skills" ref={ref} className="mb-28 max-w-[53rem] text-center sm:mb-40 sm:scroll-mt-28">
            <SectionHeading>My Skills</SectionHeading>

            <ul className="flex flex-wrap justify-center gap-2 text-lg">
                {data.map((skill, index) => (
                    <motion.li
                        key={index}
                        className="rounded-xl border border-black/[0.1] bg-white/10 px-5 py-3 text-sm text-white/80 sm:px-6 sm:py-3 sm:text-base"
                        variants={fadeInAnimationVariants}
                        initial="initial"
                        whileInView="animate"
                        viewport={{ once: true }}
                        custom={index}
                    >
                        {skill.skill}
                    </motion.li>
                ))}
            </ul>
        </section>
    );
}
