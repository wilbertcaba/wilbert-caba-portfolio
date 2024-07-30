"use client";

import { useState } from "react";
import { links } from "@/lib/data";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import * as SheetPrimitive from "@radix-ui/react-dialog";
import Image from "next/image";
import { HomepageProps } from "@/lib/types";
import Link from "next/link";
import { FiMenu, FiBox, FiBriefcase, FiMail } from "react-icons/fi";
import { X } from "lucide-react";

export default function MobileNav({ logo }: { logo: HomepageProps["logo"] }) {
    const [isSheetOpen, setSheetOpen] = useState(false);

    function toggleSheet() {
        setSheetOpen(!isSheetOpen);
    }

    function closeSheet() {
        setSheetOpen(false);
    }

    return (
        <nav className="fixed bottom-0 dark:bg-neutral-950 sm:hidden p-4 w-full text-gray-400">
            <ul className="flex items-center justify-between">
                <li>
                    <Sheet open={isSheetOpen}>
                        <SheetTrigger onClick={toggleSheet} className="flex flex-col items-center gap-2">
                            <FiMenu />
                            <span className="text-xs">Menu</span>
                        </SheetTrigger>
                        <SheetContent side="left" className="z-[200] dark:bg-gray-950 p-0 border-none w-[300px]">
                            <SheetHeader>
                                <SheetTitle>
                                    <span aria-hidden className="sr-only">
                                        Site Menu
                                    </span>
                                </SheetTitle>
                                <SheetDescription></SheetDescription>
                                <div className="px-4 py-[2.6rem] border-b border-b-gray-900">
                                    <Image src={logo.url} alt={logo.alt} width={200} height={20} />
                                </div>
                                <SheetPrimitive.Close
                                    onClick={closeSheet}
                                    className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-white transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-slate-950 focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-slate-100 dark:ring-offset-slate-950 dark:focus:ring-slate-300 dark:data-[state=open]:bg-slate-800"
                                >
                                    <X className="h-4 w-4" />
                                    <span className="sr-only">Close</span>
                                </SheetPrimitive.Close>
                            </SheetHeader>
                            <ul>
                                {links.map((link) => (
                                    <li key={link.hash}>
                                        <Link
                                            href={link.hash}
                                            className="text-gray-400 flex gap-4 items-center p-4 border-b border-b-gray-900"
                                            onClick={closeSheet}
                                        >
                                            {link.icon.src}
                                            {link.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </SheetContent>
                    </Sheet>
                </li>

                <li>
                    <Link href="#projects" className="flex flex-col items-center gap-2">
                        <FiBox />
                        <span className="text-xs">Projects</span>
                    </Link>
                </li>
                <li>
                    <Link href="#experience" className="flex flex-col items-center gap-2">
                        <FiBriefcase />
                        <span className="text-xs">Experience</span>
                    </Link>
                </li>
                <li>
                    <Link href="#contact" className="flex flex-col items-center gap-2">
                        <FiMail />
                        <span className="text-xs">Contact</span>
                    </Link>
                </li>
            </ul>
        </nav>
    );
}
