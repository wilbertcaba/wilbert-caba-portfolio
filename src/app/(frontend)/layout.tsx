import "./globals.css";
import { IBM_Plex_Mono, Inter } from "next/font/google";
import Image from "next/image";

const inter = Inter({ subsets: ["latin"] });
const ibmPlexMono = IBM_Plex_Mono({
    subsets: ["latin"],
    weight: ["400", "500"],
    variable: "--font-ibm-plex-mono",
});

export const metadata = {
    title: "Wilbert Caba | Personal Portfolio",
    description:
        "Wilbert Caba is a UX Developer with 17 years of combined experience on UX Design and Front-End Development",
};

export default function RootLayout({
    children,
    modal,
}: {
    children: React.ReactNode;
    modal: React.ReactNode;
}) {
    return (
        <html lang="en" className={`!scroll-smooth ${ibmPlexMono.variable}`}>
            <body
                className={`${inter.className} relative bg-gray-50 text-gray-950 dark:bg-neutral-950 dark:text-gray-50 dark:text-opacity-90`}
            >
                <div className="fixed top-0 z-30 h-2 w-full bg-primary"></div>
                <div className="absolute top-0 -z-30 w-full -translate-y-[12%] bg-radial-gradient-light dark:bg-radial-gradient-dark sm:-top-24 sm:h-[1080px]"></div>
                {children}
                {modal}
            </body>
        </html>
    );
}
