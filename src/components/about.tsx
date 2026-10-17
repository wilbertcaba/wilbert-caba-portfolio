"use client";

import SectionHeading from "./section-heading";
import { motion } from "framer-motion";
import { useSectionInView } from "@/lib/hooks";
import Image from "next/image";
import type { HomepageSkill } from "@/lib/cms";

export default function About({ about, skills }: { about: string; skills: HomepageSkill[] }) {
    const { ref } = useSectionInView("About");

    return (
        <motion.section
            ref={ref}
            className="
                w-full mb-28 pt-8 xl:pt-36 leading-8 sm:mb-40 scroll-mt-28 overflow-hidden relative
                after:content-[url('/pattern-triangles-2.svg')]
                after:absolute
                after:top-0
                after:left-0
                after:-z-40
            "
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.175 }}
            id="about"
        >
            <div
                className="
                container relative
                before:content-[url('/bg-text-about.svg')]
                before:absolute
                before:-top-36
                before:inline-block
                before:w-auto
                before:right-0
                before:-z-40
                before:opacity-15
            "
            >
                <SectionHeading alignment="left">About Me</SectionHeading>
                <div className="grid md:grid-cols-12 md:gap-8 lg:gap-20">
                    <div className="mb-3 col-span-8 order-2 lg:order-1">
                        <div dangerouslySetInnerHTML={{ __html: about }} />
                    </div>
                    <div className="col-span-12 md:col-span-4 order-1 lg:order-2">
                        <Image
                            src="/img-wilbert-caba-profile-image.jpeg"
                            alt="Wilbert Caba image"
                            width="408"
                            height="408"
                            className="w-full rounded-lg xl:-mt-32 mb-8 md:mb-0"
                        />
                    </div>
                </div>
                <div className="grid grid-cols-[repeat(auto-fill,128px)] justify-center md:justify-between gap-8 md:pt-24">
                    {skills.map((skill) => (
                        <div
                            key={skill.id ?? skill.skill}
                            className="border border-zinc-700 rounded-md p-6 flex flex-col justify-center items-center basis-32"
                        >
                            <Image
                                className="mb-2"
                                src={skill.icon.url || ""}
                                alt={skill.icon.alt || `${skill.skill} icon`}
                                width="40"
                                height="40"
                                unoptimized
                            />
                            <p className="m-0 text-sm">{skill.skill}</p>
                        </div>
                    ))}
                </div>
            </div>
        </motion.section>
    );
}
