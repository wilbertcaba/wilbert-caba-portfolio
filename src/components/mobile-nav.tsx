"use client";

import type { ComponentType } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { FiBriefcase, FiGrid, FiHome, FiMail, FiUser } from "react-icons/fi";
import { HiOutlineBolt } from "react-icons/hi2";
import { cn } from "@/lib/utils";
import { useActiveSectionContext } from "@/context/active-section-context";
import { isSectionName, sectionIdFromHref, type NavLink } from "@/lib/types";

const iconsByHref: Record<string, ComponentType<{ className?: string }>> = {
    "#home": FiHome,
    "#projects": FiGrid,
    "#about": FiUser,
    "#skills": HiOutlineBolt,
    "#experience": FiBriefcase,
    "#contact": FiMail,
};

export default function MobileNav({ navigation }: { navigation: NavLink[] }) {
    const { activeSection, setActiveSection, setTimeOfLastClick } = useActiveSectionContext();

    const links = navigation.flatMap((link) => {
        const Icon = iconsByHref[link.href];
        if (!Icon) return [];
        return [{ ...link, Icon }];
    });

    if (!links.length) return null;

    return (
        <nav className="fixed bottom-2 left-2 right-2 z-40 sm:hidden" aria-label="Sections">
            <ul className="flex items-center justify-between rounded-full border border-white/10 bg-neutral-900/75 px-2 py-2 shadow-[0_10px_30px_rgba(0,0,0,0.45)] backdrop-blur-2xl">
                {links.map((link) => {
                    const sectionId = sectionIdFromHref(link.href);
                    const isActive = isSectionName(sectionId) && activeSection === sectionId;
                    const Icon = link.Icon;

                    return (
                        <li key={link.id} className="relative isolate">
                            <Link
                                href={link.href}
                                aria-label={link.label}
                                aria-current={isActive ? "true" : undefined}
                                className={cn(
                                    "relative flex h-11 w-11 items-center justify-center rounded-full text-neutral-300 transition-colors",
                                    isActive && "text-neutral-950",
                                )}
                                onClick={() => {
                                    if (!isSectionName(sectionId)) return;
                                    setActiveSection(sectionId);
                                    setTimeOfLastClick(Date.now());
                                }}
                            >
                                <Icon className="h-5 w-5" />
                                {isActive && (
                                    <motion.span
                                        className="absolute inset-0 -z-10 rounded-full bg-primary shadow-[0_0_16px_var(--primary-color)]"
                                        layoutId="activeMobileSection"
                                        transition={{
                                            type: "spring",
                                            stiffness: 380,
                                            damping: 30,
                                        }}
                                    />
                                )}
                            </Link>
                        </li>
                    );
                })}
            </ul>
        </nav>
    );
}
