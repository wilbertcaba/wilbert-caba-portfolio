"use client";

import SectionHeading from "./section-heading";
import { motion } from "framer-motion";
import { useSectionInView } from "@/lib/hooks";
import { HomepageProps } from "@/lib/types";

export default function About({ about }: { about: HomepageProps["about_html"] }) {
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
            <div className="mb-3" dangerouslySetInnerHTML={{ __html: about }} />
        </motion.section>
    );
}
