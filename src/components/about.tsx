"use client";

import SectionHeading from "./section-heading";
import { motion } from "framer-motion";
import { useSectionInView } from "@/lib/hooks";

export default function About() {
    const { ref } = useSectionInView("About");

    return (
        <motion.section
            ref={ref}
            className="mb-28 max-w-[45rem] text-center leading-8 sm:mb-40 scroll-mt-28"
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.175 }}
            id="about"
        >
            <SectionHeading>About</SectionHeading>
            <p className="mb-3">
                As a cross-functional User Experience Designer and Front-End Developer based in West Palm Beach,
                Florida, I bring over 17 years of experience in design and 7+ years in front-end development. My focus
                is on creating intuitive, user-centered digital experiences that not only meet but exceed user
                expectations and help organizations achieve their business goals. My design philosophy emphasizes
                simplicity and ethical responsibility, leveraging proven design patterns to transform complex data into
                accessible and engaging interfaces. This approach ensures that every solution I deliver is crafted with
                the user's needs at the forefront, making technology intuitive and straightforward for all.
            </p>
        </motion.section>
    );
}
