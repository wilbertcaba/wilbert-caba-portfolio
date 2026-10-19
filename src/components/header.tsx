"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { links } from "@/lib/data";
import Link from "next/link";
import clsx from "clsx";
import { cn } from "@/lib/utils";
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
                "left-0 right-0 top-0 z-10 mt-2 w-full items-center justify-between py-4 transition-[background-color,backdrop-filter] duration-300 sm:fixed sm:flex sm:p-8",
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
            <nav className="hidden py-2 sm:top-[1.7rem] sm:flex sm:h-[initial] sm:py-0">
                <ul className="flex w-[22rem] flex-wrap items-center justify-center gap-y-1 text-[0.9rem] font-medium text-gray-500 sm:w-[initial] sm:flex-nowrap">
                    {links.map((link) => (
                        <motion.li
                            className="relative flex h-3/4 items-center justify-center"
                            key={link.hash}
                            initial={{ y: -100, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                        >
                            <Link
                                className={cn(
                                    "flex w-full items-center justify-center px-3 py-3 text-gray-300 transition hover:text-gray-100",
                                    activeSection === link.name && "text-gray-950 hover:text-gray-950",
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
