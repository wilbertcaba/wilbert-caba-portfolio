"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";
import { BsArrowRight, BsLinkedin } from "react-icons/bs";
import { FaBehance, FaDribbble, FaGithub, FaLinkedin } from "react-icons/fa";
import { HiDownload } from "react-icons/hi";
import { useSectionInView } from "@/lib/hooks";
import { useActiveSectionContext } from "@/context/active-section-context";
import { HomepageProps } from "@/lib/types";
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

export default function Intro({ h1 }: { h1: HomepageProps["main_value_proposition"] }) {
    const { ref } = useSectionInView("Home", 0.99);
    const { setActiveSection, setTimeOfLastClick } = useActiveSectionContext();

    return (
        <section
            ref={ref}
            className="
                py-10 sm:pb-16 sm:pt-40 text-center scroll-mt-[10rem] w-full overflow-x-hidden sm:-mt-[104px] relative
                before:content
                before:bg-pattern-triangles
                before:absolute
                before:top-0
                before:left-0
                before:-z-20
                before:opacity-35
                dark:before:opacity-15
                before:w-full
                before:h-full
            "
            id="home"
        >
            <div
                className="
                relative 
                after:content 
                after:bg-pattern-logo-left 
                after:absolute 
                after:top-44
                after:-left-6 
                after:bg-[length:32px]
                after:w-8
                after:h-[200px]
                sm:after:top-0
                sm:after:left-0 
                md:after:h-[283px]
                lg:after:h-[317px]
                2xl:after:bg-[length:58px]
                2xl:after:w-[58px] 
                2xl:after:h-[423px]
            "
            >
                <div className="container sm:px-8 flex flex-col items-center relative">
                    <motion.p
                        className="uppercase tracking-[0.5rem] text-sm md:text-xl text-primary"
                        initial={{ y: 100, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                    >
                        Hello World!
                    </motion.p>
                    <motion.h1
                        className="-mb-[10px] mt-4 sm:px-20 text-xl font-medium md:text-4xl lg:text-5xl 2xl:text-6xl !leading-[1.5]"
                        initial={{ y: 100, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                    >
                        {h1}
                    </motion.h1>

                    <SectionDivider />

                    <motion.div
                        className="flex flex-col gap-4 sm:gap-12 align-center text-lg font-medium"
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
                                    className="group gap-2 hover:bg-gray-950 min-w-44"
                                    onClick={() => (setActiveSection("Projects"), setTimeOfLastClick(Date.now()))}
                                >
                                    Contact Me
                                    <BsArrowRight className="group-hover:translate-x-1" />
                                </Link>
                            </Button>

                            <Button asChild variant="outline">
                                <a href="/resume.pdf" download className="group gap-2 min-w-44">
                                    Download CV
                                    <HiDownload className="group-hover:translate-y-1" />
                                </a>
                            </Button>
                        </div>
                        <div className="flex gap-4 sm:gap-8 justify-center">
                            {social.map((item, i) => (
                                <Button asChild variant="secondary" key={i}>
                                    <a href={item.url} target="_blank" className="w-12 h-12">
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
