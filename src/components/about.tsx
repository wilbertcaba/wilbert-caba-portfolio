"use client";

import SectionHeading from "./section-heading";
import { motion } from "framer-motion";
import { useSectionInView } from "@/lib/hooks";
import { HomepageProps } from "@/lib/types";
import Image from "next/image";

const skills = [
    { name: "React", icon: "/icons/icon-react.svg" },
    { name: "Next.js", icon: "/icons/icon-nextjs.svg" },
    { name: "Node.js", icon: "/icons/icon-nodejs.svg" },
    { name: "Javascript", icon: "/icons/icon-js.svg" },
    { name: "Typescript", icon: "/icons/icon-typescript.svg" },
    { name: "Payload", icon: "/icons/icon-payload.svg" },
    { name: "Github", icon: "/icons/icon-github.svg" },
    { name: "Supabase", icon: "/icons/icon-supabase.svg" },
    { name: "Tailwind", icon: "/icons/icon-tailwind.svg" },
    { name: "Bootstrap", icon: "/icons/icon-bootstrap.svg" },
    { name: "Sass", icon: "/icons/icon-sass.svg" },
    { name: "NPM", icon: "/icons/icon-npm.svg" },
    { name: "JSON", icon: "/icons/icon-json.svg" },
    { name: "Framer", icon: "/icons/icon-framer.svg" },
    { name: "PHP", icon: "/icons/icon-php.svg" },
    { name: "Wordpress", icon: "/icons/icon-wordpress.svg" },
];

export default function About({ about }: { about: HomepageProps["about_html"] }) {
    const { ref } = useSectionInView("About");

    return (
        <motion.section
            ref={ref}
            className="
                w-full mb-28 pt-36 leading-8 sm:mb-40 scroll-mt-28 relative
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
                <div className="grid lg:grid-cols-12 gap-20">
                    <div className="mb-3 col-span-8">
                        <h2 className="text-5xl font-medium capitalize mb-16">About Me</h2>
                        <div dangerouslySetInnerHTML={{ __html: about }} />
                    </div>
                    <div className="col-span-4">
                        <Image
                            src="/img-wilbert-caba-profile-image.jpeg"
                            alt="Wilbert Caba image"
                            width="408"
                            height="408"
                            className="w-full rounded-lg"
                        />
                    </div>
                </div>
                <div className="grid grid-cols-[repeat(auto-fill,128px)] justify-between gap-8 py-24">
                    {skills.map((skill, index) => (
                        <div
                            key={index}
                            className="border border-zinc-700 rounded-md p-6 flex flex-col justify-center items-center basis-32"
                        >
                            <Image
                                className="mb-2"
                                src={skill.icon}
                                alt={`${skill.name} icon`}
                                width="40"
                                height="40"
                            />
                            <p className="m-0 text-sm">{skill.name}</p>
                        </div>
                    ))}
                </div>
            </div>
        </motion.section>
    );
}
