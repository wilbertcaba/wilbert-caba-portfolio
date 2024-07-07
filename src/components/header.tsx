"use client";

import React from "react";
import { motion } from "framer-motion";
import { links } from "@/lib/data";
import Link from "next/link";
import clsx from "clsx";
import { ActiveSectionContext, useActiveSectionContext } from "@/context/active-section-context";
import Image from "next/image";
import { HomepageProps } from "@/lib/types";

export default function Header({ logo }: { logo: HomepageProps["logo"] }) {
    // we need to keep track of the time of the last click to to disable the observer from setting the active section
    const { activeSection, setActiveSection, setTimeOfLastClick } = useActiveSectionContext();

    return (
        // <header className="z-[999] relative">
        <motion.header
            // className="z-[999] fixed top-0 right-0 left-0 p-8 w-full before:content-[''] before:absolute before:inset-0 dark:before:bg-gray-800 dark:before:opacity-10 flex items-center justify-between"
            className="z-[99] sm:fixed top-0 right-0 left-0 py-4 sm:p-8 w-full sm:flex items-center justify-between"
        >
            <Image
                src={logo.url}
                alt={logo.alt}
                width={200}
                height={20}
                className="logo-image some-other-class w-40 sm:w-auto"
            />
            <nav
                // className="flex fixed top-[0.15rem] left-1/2 h-12 -translate-x-1/2 py-2 sm:top-[1.7rem] sm:h-[initial] sm:py-0"
                className="hidden sm:flex py-2 sm:top-[1.7rem] sm:h-[initial] sm:py-0"
            >
                <ul className="flex w-[22rem] flex-wrap items-center justify-center gap-y-1 text-[0.9rem] font-medium text-gray-500 sm:w-[initial] sm:flex-nowrap">
                    {links.map((link) => (
                        <motion.li
                            className="h-3/4 flex items-center justify-center relative"
                            key={link.hash}
                            initial={{ y: -100, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                        >
                            <Link
                                className={clsx(
                                    "flex w-full items-center justify-center px-3 py-3 hover:text-gray-950 transition dark:text-gray-300 dark:hover:text-gray-100",
                                    {
                                        "text-gray-950 dark:text-gray-200": activeSection === link.name,
                                    },
                                )}
                                href={link.hash}
                                onClick={() => {
                                    setActiveSection(link.name);
                                    setTimeOfLastClick(Date.now());
                                }}
                            >
                                {link.name}

                                {link.name == activeSection && (
                                    <motion.span
                                        className="bg-gray-100 rounded-md absolute inset-0 -z-10 dark:bg-gray-800"
                                        // className="bg-gray-100 rounded-full absolute top-full h-2 left-0 right-0 -z-10 dark:bg-gray-800"
                                        layoutId="activeSection"
                                        transition={{
                                            type: "spring",
                                            stiffness: 380,
                                            damping: 30,
                                        }}
                                    ></motion.span>
                                )}
                            </Link>
                        </motion.li>
                    ))}
                </ul>
            </nav>
        </motion.header>
    );
}
