"use client";

import { useState, type ReactNode } from "react";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import * as SheetPrimitive from "@radix-ui/react-dialog";
import Image from "next/image";
import type { Media } from "@/payload-types";
import Link from "next/link";
import { FiMenu, FiBox, FiBriefcase, FiHome, FiMail, FiUser } from "react-icons/fi";
import { HiOutlineBolt } from "react-icons/hi2";
import { X } from "lucide-react";
import { useActiveSectionContext } from "@/context/active-section-context";
import { isSectionName, sectionIdFromHref, type NavLink } from "@/lib/types";

const iconsByHref: Record<string, ReactNode> = {
    "#home": <FiHome />,
    "#projects": <FiBox />,
    "#about": <FiUser />,
    "#skills": <HiOutlineBolt />,
    "#experience": <FiBriefcase />,
    "#contact": <FiMail />,
};

export default function MobileNav({ logo, navigation }: { logo: Media; navigation: NavLink[] }) {
    const [isSheetOpen, setSheetOpen] = useState(false);
    const { setActiveSection, setTimeOfLastClick } = useActiveSectionContext();

    function toggleSheet() {
        setSheetOpen(!isSheetOpen);
    }

    function closeSheet() {
        setSheetOpen(false);
    }

    function jumpTo(href: string) {
        const sectionId = sectionIdFromHref(href);
        if (!isSectionName(sectionId)) return;
        setActiveSection(sectionId);
        setTimeOfLastClick(Date.now());
    }

    return (
        <nav className="fixed bottom-0 w-full bg-neutral-950 p-4 text-gray-400 sm:hidden">
            <ul className="flex items-center justify-between">
                <li>
                    <Sheet open={isSheetOpen}>
                        <SheetTrigger onClick={toggleSheet} className="flex flex-col items-center gap-2">
                            <FiMenu />
                            <span className="text-xs">Menu</span>
                        </SheetTrigger>
                        <SheetContent side="left" className="z-[200] w-[300px] border-none bg-gray-950 p-0">
                            <SheetHeader>
                                <SheetTitle>
                                    <span aria-hidden className="sr-only">
                                        Site Menu
                                    </span>
                                </SheetTitle>
                                <SheetDescription></SheetDescription>
                                <div className="px-4 py-[2.6rem] border-b border-b-gray-900">
                                    <Image src={logo.url || ""} alt={logo.alt || "Wilbert Caba"} width={200} height={20} />
                                </div>
                                <SheetPrimitive.Close
                                    onClick={closeSheet}
                                    className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-slate-950 transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-slate-300 focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-slate-800"
                                >
                                    <X className="h-4 w-4" />
                                    <span className="sr-only">Close</span>
                                </SheetPrimitive.Close>
                            </SheetHeader>
                            <ul>
                                {navigation.map((link) => (
                                    <li key={link.id}>
                                        <Link
                                            href={link.href}
                                            className="flex items-center gap-4 border-b border-b-gray-900 p-4 text-gray-400"
                                            onClick={() => {
                                                jumpTo(link.href);
                                                closeSheet();
                                            }}
                                        >
                                            {iconsByHref[link.href]}
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </SheetContent>
                    </Sheet>
                </li>

                <li>
                    <Link href="#projects" className="flex flex-col items-center gap-2" onClick={() => jumpTo("#projects")}>
                        <FiBox />
                        <span className="text-xs">Projects</span>
                    </Link>
                </li>
                <li>
                    <Link href="#experience" className="flex flex-col items-center gap-2" onClick={() => jumpTo("#experience")}>
                        <FiBriefcase />
                        <span className="text-xs">Experience</span>
                    </Link>
                </li>
                <li>
                    <Link href="#contact" className="flex flex-col items-center gap-2" onClick={() => jumpTo("#contact")}>
                        <FiMail />
                        <span className="text-xs">Contact</span>
                    </Link>
                </li>
            </ul>
        </nav>
    );
}
