import { links } from "@/lib/data";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import Image from "next/image";
import { HomepageProps } from "@/lib/types";
import Link from "next/link";
import { FiMenu, FiBox, FiBriefcase, FiMail } from "react-icons/fi";

export default function MobileNav({ logo }: { logo: HomepageProps["logo"] }) {
    return (
        <nav className="fixed bottom-0 dark:bg-gray-950 sm:hidden p-4 w-full text-gray-400">
            <ul className="flex items-center justify-between">
                <li>
                    <Sheet>
                        <SheetTrigger className="flex flex-col items-center gap-2">
                            <FiMenu />
                            <span className="text-xs">Menu</span>
                        </SheetTrigger>
                        <SheetContent side="left" className="z-[200] dark:bg-gray-950 p-0 border-none w-[300px]">
                            <SheetHeader>
                                <div className="px-4 py-[2.6rem] border-b border-b-gray-900">
                                    <Image src={logo.url} alt={logo.alt} width={200} height={20} />
                                </div>
                            </SheetHeader>
                            <ul>
                                {links.map((link) => (
                                    <li key={link.hash}>
                                        <Link
                                            href={link.hash}
                                            className="text-gray-400 flex gap-4 items-center p-4 border-b border-b-gray-900"
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
