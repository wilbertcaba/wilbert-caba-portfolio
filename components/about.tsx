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
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam aliquam, nunc id aliquet ultricies, nisl
                nunc lacinia nunc, vitae lacinia nunc nunc at lectus. Sed id risus auctor, aliquet nunc id, tincidunt
                nunc. Nulla facilisi. Sed euismod, nunc id aliquam aliquet, nunc nunc tincidunt nunc, vitae nunc nunc
                nunc. Sed id risus auctor, aliquet nunc id, tincidunt nunc. Nulla facilisi. Sed euismod, nunc id aliquam
                aliquet, nunc nunc tincidunt nunc, vitae nunc nunc nunc.
            </p>
        </motion.section>
    );
}
