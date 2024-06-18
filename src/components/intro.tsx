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

// type MainValuePropositionProps = {
//     main_value_proposition: [];
// };

export default function Intro({ data }: { data: HomepageProps[] }) {
    const { ref } = useSectionInView("Home", 0.99);
    const { setActiveSection, setTimeOfLastClick } = useActiveSectionContext();

    return (
        <section ref={ref} className="mb-28 max-w-[50rem] text-center sm:mb-0 scroll-mt-[10rem]" id="home">
            <div className="flex items-center justify-center">
                <div className="relative">
                    <motion.div
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{
                            type: "tween",
                            duration: 0.2,
                        }}
                    >
                        <Image
                            src="/img-wilbert-caba-profile-image.jpeg"
                            width={100}
                            height={100}
                            alt="Wilbert Caba sideview image"
                            className="rounded-full shadow-lg"
                        />
                    </motion.div>
                    <motion.span
                        className="text-3xl absolute bottom-0 right-[-8px]"
                        initial={{ scale: 0, opacity: 0, rotate: 45 }}
                        animate={{
                            scale: 1,
                            opacity: 1,
                            rotate: [0, 45, 0, 45, 0],
                        }}
                        transition={{
                            type: "spring",
                            stiffness: 125,
                            delay: 0.3,
                            duration: 1,
                            // times: [0, 0.2, 0.4, 0.6, 0.8, 1] // Specify when each keyframe should occur
                        }}
                    >
                        🤙
                    </motion.span>
                </div>
            </div>
            <motion.h1
                className="mb-10 mt-4 px-4 text-2xl font-medium sm:text-4xl !leading-[1.5]"
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
            >
                {data[0].main_value_proposition}
            </motion.h1>

            <motion.div
                className="flex flex-col sm:flex-row gap-2 justify-center text-lg font-medium"
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{
                    delay: 0.1,
                }}
            >
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
                <div className="flex items-center gap-2 justify-center mt-12 sm:mt-0">
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
            </motion.div>
        </section>
    );
}
