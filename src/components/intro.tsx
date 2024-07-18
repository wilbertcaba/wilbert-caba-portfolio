"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";
import { BsArrowRight, BsLinkedin } from "react-icons/bs";
import { HiDownload } from "react-icons/hi";
import { FaGithubSquare } from "react-icons/fa";
import { useSectionInView } from "@/lib/hooks";
import { useActiveSectionContext } from "@/context/active-section-context";
import { HomepageProps } from "@/lib/types";
import SectionDivider from "./section-divider";

export default function Intro({ h1 }: { h1: HomepageProps["main_value_proposition"] }) {
    const { ref } = useSectionInView("Home", 0.99);
    const { setActiveSection, setTimeOfLastClick } = useActiveSectionContext();

    return (
        <section ref={ref} className="pb-28 text-center sm:pb-60 scroll-mt-[10rem] w-full relative sm:pt-32" id="home">
            <div
                className="
                container flex flex-col items-center
                after:content after:bg-pattern-logo-left after:absolute after:top-16 after:left-0 after:w-[58px] after:h-[423px]
            "
            >
                <motion.div>
                    <p className="uppercase tracking-[0.5rem] text-primary">Hello World!</p>
                </motion.div>
                <motion.h1
                    className="-mb-[10px] mt-4 px-4 text-2xl font-medium sm:text-6xl !leading-[1.5]"
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                >
                    {h1}
                </motion.h1>

                <SectionDivider />

                <motion.div
                    className="flex flex-col gap-12 justify-center text-lg font-medium"
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{
                        delay: 0.1,
                    }}
                >
                    <div className="flex gap-8">
                        <Link
                            href="#contact"
                            className="group bg-gray-800 text-white shadow-md px-7 py-3 flex items-center justify-center gap-2 rounded-full outline-none hover:bg-gray-950 transition duration-[0.3s]"
                            onClick={() => (setActiveSection("Contact"), setTimeOfLastClick(Date.now()))}
                        >
                            Contact Me
                            <BsArrowRight className="opacity-70 group-hover:translate-x-1 transition duration-[0.3s]" />
                        </Link>
                        <a
                            href="/resume.pdf"
                            download
                            className="group bg-white shadow-md px-7 py-3 flex items-center justify-center gap-2 rounded-full outline-none hover:shadow-none transition duration-[0.3s] dark:bg-white/10"
                        >
                            Download CV
                            <HiDownload className="opacity-70 group-hover:translate-y-1 group-hover:opacity-1 transition duration-[0.3s]" />
                        </a>
                    </div>
                    <div className="flex gap-8 justify-center">
                        <div className="flex items-center gap-8 justify-center mt-12 sm:mt-0">
                            <a
                                href="https://www.linkedin.com/in/wilbert-caba/"
                                target="_blank"
                                className="bg-white shadow-md w-12 h-12 flex items-center justify-center gap-2 rounded-full outline-none hover:shadow-none transition duration-[0.3s] dark:bg-white/10 dark:text-white/60"
                            >
                                <BsLinkedin />
                            </a>
                            <a
                                href="https://github.com/wilbertcaba"
                                target="_blank"
                                className="bg-white shadow-md w-12 h-12 flex items-center justify-center gap-2 rounded-full text-[1.25rem] outline-none hover:shadow-none transition duration-[0.3s] dark:bg-white/10 dark:text-white/60"
                            >
                                <FaGithubSquare />
                            </a>
                            <a
                                href="https://www.linkedin.com/in/wilbert-caba/"
                                target="_blank"
                                className="bg-white shadow-md w-12 h-12 flex items-center justify-center gap-2 rounded-full outline-none hover:shadow-none transition duration-[0.3s] dark:bg-white/10 dark:text-white/60"
                            >
                                <BsLinkedin />
                            </a>
                            <a
                                href="https://github.com/wilbertcaba"
                                target="_blank"
                                className="bg-white shadow-md w-12 h-12 flex items-center justify-center gap-2 rounded-full text-[1.25rem] outline-none hover:shadow-none transition duration-[0.3s] dark:bg-white/10 dark:text-white/60"
                            >
                                <FaGithubSquare />
                            </a>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
