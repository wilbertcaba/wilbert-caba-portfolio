"use client";

import SectionHeading from "./section-heading";
import { motion } from "framer-motion";
import { useSectionInView } from "@/lib/hooks";
import Image from "next/image";
import type { HomepageSkill } from "@/lib/cms";
import Eyebrow from "./eyebrow";

export default function About({ about, skills }: { about: string; skills: HomepageSkill[] }) {
    const { ref } = useSectionInView("about");

    return (
        <motion.section
            ref={ref}
            className="relative mb-28 w-full scroll-mt-28 overflow-hidden pt-8 leading-8 after:absolute after:left-0 after:top-0 after:-z-40 after:content-[url('/pattern-triangles-2.svg')] sm:mb-40 xl:pt-36"
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.175 }}
            id="about"
        >
            <div className="container relative before:absolute before:-top-36 before:right-0 before:-z-40 before:inline-block before:w-auto before:opacity-15 before:content-[url('/bg-text-about.svg')]">
                <Eyebrow size="lg" className="text-primary">
                    [ About Me ]
                </Eyebrow>
                <SectionHeading alignment="left">
                    <span className="text-stroke-primary">Engineering</span> Human Experiences
                </SectionHeading>
                <div className="grid md:grid-cols-12 md:gap-8 lg:gap-20">
                    <div className="order-2 col-span-8 mb-3 lg:order-1">
                        <div dangerouslySetInnerHTML={{ __html: about }} />
                    </div>
                    <div className="order-1 col-span-12 md:col-span-4 lg:order-2">
                        <Image
                            src="/img-wilbert-caba-profile-image.jpeg"
                            alt="Wilbert Caba image"
                            width="408"
                            height="408"
                            className="mb-8 w-full rounded-lg md:mb-0 xl:-mt-32"
                        />
                    </div>
                </div>
                <div
                    className="grid grid-cols-[repeat(auto-fill,128px)] justify-center gap-8 md:justify-between md:pt-24"
                    id="skills"
                >
                    {skills.map((skill) => (
                        <div
                            key={skill.id ?? skill.skill}
                            className="flex basis-32 flex-col items-center justify-center rounded-md border border-zinc-700 p-6"
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
