import "./globals.css";
import { Inter } from "next/font/google";
import Image from "next/image";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
    title: "Wilbert Caba | Personal Portfolio",
    description:
        "Wilbert Caba is a UX Developer with 17 years of combined experience on UX Design and Front-End Development",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en" className="!scroll-smooth">
            <body
                className={`${inter.className} bg-gray-50 text-gray-950 dark:bg-neutral-800 dark:text-gray-50 dark:text-opacity-90 sm:pt-28 relative`}
            >
                <div className="h-2 w-full bg-primary fixed top-0 z-30"></div>
                <div className="absolute top-0 sm:-top-24 w-full -z-10 bg-radial-gradient-light dark:bg-radial-gradient-dark -translate-y-[12%] sm:h-[1080px]"></div>
                {children}
            </body>
        </html>
    );
}
