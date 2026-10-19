"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { links } from "@/lib/data";
import Link from "next/link";
import clsx from "clsx";
import { ActiveSectionContext, useActiveSectionContext } from "@/context/active-section-context";
import Image from "next/image";
import type { Media } from "@/payload-types";

export default function Header({ logo }: { logo: Media }) {
    // we need to keep track of the time of the last click to to disable the observer from setting the active section
    const { activeSection, setActiveSection, setTimeOfLastClick } = useActiveSectionContext();
    const [hasBackground, setHasBackground] = useState(false);

    useEffect(() => {
        const onScroll = () => {
            const scrollY = window.scrollY;

            setHasBackground((current) => {
                if (scrollY >= 140) return true;
                if (scrollY === 0) return false;
                return current;
            });
        };

        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    return (
        <motion.header
            className={clsx(
                "z-10 sm:fixed mt-2 top-0 right-0 left-0 py-4 sm:p-8 w-full sm:flex items-center justify-between transition-[background-color,backdrop-filter] duration-300",
                hasBackground && "bg-neutral-900/75 backdrop-blur-2xl",
            )}
        >
            <Image
                src={logo.url || ""}
                alt={logo.alt || "Wilbert Caba"}
                width={200}
                height={20}
                className="logo-image some-other-class w-40 sm:w-auto"
            />
            <nav className="hidden sm:flex py-2 sm:top-[1.7rem] sm:h-[initial] sm:py-0">
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
                                    "flex w-full items-center justify-center px-3 py-3 text-gray-300 transition hover:text-gray-100",
                                    {
                                        "text-gray-950": activeSection === link.name,
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
                                        className="absolute inset-0 -z-10 rounded-md bg-primary"
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
