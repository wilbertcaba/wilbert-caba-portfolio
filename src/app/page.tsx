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
import { fetchExperiences, fetchProjects, fetcHomepageData, fetchSkills } from "@/lib/supabase/data";
import { Suspense } from "react";

export default async function Home() {
    const projects = await fetchProjects();
    const experiences = await fetchExperiences();
    const homepageData = await fetcHomepageData();
    const skills = await fetchSkills();

    return (
        <main className="flex flex-col items-center px-4 relative pt-28 sm:pt-36">
            <ThemeContextProvider>
                <ActiveSectionContextProvider>
                    <Header />
                    <Intro data={homepageData} />
                    <SectionDivider />
                    <About data={homepageData} />
                    <Projects data={projects} />
                    <Skills data={skills} />
                    <Experience data={experiences} />
                    <Contact />
                    <Toaster position="top-center" />
                    <Footer />
                </ActiveSectionContextProvider>
                <ThemeSwitch />
            </ThemeContextProvider>
        </main>
    );
}
