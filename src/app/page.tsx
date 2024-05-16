import Intro from "@/components/intro";
import About from "@/components/about";
import SectionDivider from "@/components/section-divider";
import Projects from "@/components/projects";
import Skills from "@/components/skills";
import Experience from "@/components/experience";
import Contact from "@/components/contact";
import ThemeContextProvider from "@/context/theme-context";
import ActiveSectionContextProvider from "@/context/active-section-context";
import Header from "@/components/header";
import { Toaster } from "react-hot-toast";
import Footer from "@/components/footer";
import ThemeSwitch from "@/components/theme-switch";
import ProjectTest from "@/components/project-test";

export default function Home() {
    return (
        <main className="flex flex-col items-center px-4 relative pt-28 sm:pt-36">
            <ThemeContextProvider>
                <ActiveSectionContextProvider>
                    <Header />
                    <Intro />
                    <SectionDivider />
                    <About />
                    <Projects />
                    <Skills />
                    <Experience />
                    <ProjectTest />
                    <Contact />
                    <Toaster position="top-center" />
                    <Footer />
                </ActiveSectionContextProvider>
                <ThemeSwitch />
            </ThemeContextProvider>
        </main>
    );
}
