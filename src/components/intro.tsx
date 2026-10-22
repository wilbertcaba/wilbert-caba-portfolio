"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { BsArrowRight, BsLinkedin } from "react-icons/bs";
import { FaBehance, FaDribbble, FaGithub, FaLinkedin } from "react-icons/fa";
import { HiDownload } from "react-icons/hi";
import { useSectionInView } from "@/lib/hooks";
import { useActiveSectionContext } from "@/context/active-section-context";
import SectionDivider from "./section-divider";
import { Button } from "@/components/ui/button";

const social = [
    {
        name: "LinkedIn",
        url: "https://www.linkedin.com/in/wilbert-caba/",
        icon: <FaLinkedin />,
    },
    {
        name: "GitHub",
        url: "https://github.com/wilbertcaba",
        icon: <FaGithub />,
    },
    {
        name: "Dribbble",
        url: "https://dribbble.com/wilbertcaba",
        icon: <FaDribbble />,
    },
    {
        name: "Behance",
        url: "https://www.behance.net/wilbertcaba",
        icon: <FaBehance />,
    },
];

export default function Intro({ h1, resume }: { h1: string; resume?: string | null }) {
    const { ref } = useSectionInView("home", 0.99);
    const { setActiveSection, setTimeOfLastClick } = useActiveSectionContext();

    return (
        <section ref={ref} className="relative w-full py-10 text-center sm:scroll-mt-[10rem]" id="home">
            <div className="relative">
                <div className="container relative flex flex-col items-center sm:px-8">
                    <motion.p
                        className="font-eyebrow text-sm uppercase tracking-[0.5rem] text-primary md:text-xl"
                        initial={{ y: 100, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                    >
                        Hello World!
                    </motion.p>
                    <motion.h1
                        className="-mb-[10px] mt-4 text-xl font-medium !leading-[1.5] sm:px-20 md:text-4xl lg:text-5xl 2xl:text-6xl"
                        initial={{ y: 100, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                    >
                        {h1}
                    </motion.h1>

                    <SectionDivider />

                    <motion.div
                        className="align-center flex flex-col gap-4 text-lg font-medium sm:gap-12"
                        initial={{ y: 100, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{
                            delay: 0.1,
                        }}
                    >
                        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-8">
                            <Button asChild>
                                <Link
                                    href="#contact"
                                    className="group min-w-44 gap-2"
                                    onClick={() => (setActiveSection("contact"), setTimeOfLastClick(Date.now()))}
                                >
                                    Contact Me
                                    <BsArrowRight className="group-hover:translate-x-1" />
                                </Link>
                            </Button>

                            {resume ? (
                                <Button asChild variant="outline">
                                    <a href={resume} download className="group min-w-44 gap-2">
                                        Download CV
                                        <HiDownload className="group-hover:translate-y-1" />
                                    </a>
                                </Button>
                            ) : null}
                        </div>
                        <div className="flex justify-center gap-4 sm:gap-8">
                            {social.map((item, i) => (
                                <Button asChild variant="secondary" className="h-12 w-12 bg-neutral-800" key={i}>
                                    <a href={item.url} target="_blank">
                                        {item.icon}
                                    </a>
                                </Button>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
