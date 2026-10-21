import Intro from "@/components/intro";
import About from "@/components/about";
import Projects from "@/components/projects";
import Skills from "@/components/skills";
import Experience from "@/components/experience";
import Contact from "@/components/contact";
import ActiveSectionContextProvider from "@/context/active-section-context";
import Header from "@/components/header";
import { Toaster } from "react-hot-toast";
import Footer from "@/components/footer";
import { fetchExperiences, fetchHomepage, fetchMainNavigation, fetchProjects } from "@/lib/cms";
import MobileNav from "@/components/mobile-nav";
import TriangleGrid from "@/components/triangleGrid/triangleGrid";

export default async function Home() {
    const [projects, experiences, homepage, navigation] = await Promise.all([
        fetchProjects(),
        fetchExperiences(),
        fetchHomepage(),
        fetchMainNavigation(),
    ]);

    return (
        <main className="relative flex flex-col items-center after:absolute after:bottom-0 after:right-0 after:-z-40 after:rotate-180 after:content-[url('/pattern-triangles-2.svg')] sm:pt-28">
            <ActiveSectionContextProvider>
                <Header logo={homepage.logo} navigation={navigation} />
                <TriangleGrid />
                <Intro h1={homepage.main_value_proposition} />
                <Projects data={projects} />
                <About about={homepage.about_html ?? ""} skills={homepage.skills} />
                <Experience data={experiences} />
                <Contact />
                <Toaster position="top-center" />
                <Footer />
                <MobileNav navigation={navigation} />
            </ActiveSectionContextProvider>
        </main>
    );
}
