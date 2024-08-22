"use client";

import SectionHeading from "./section-heading";
import { motion } from "framer-motion";
import { useSectionInView } from "@/lib/hooks";
import { HomepageProps } from "@/lib/types";
import Image from "next/image";

export default function About({ about }: { about: HomepageProps["about_html"] }) {
    const { ref } = useSectionInView("About");

    return (
        <motion.section
            ref={ref}
            className="
                w-full mb-28 pt-36 leading-8 sm:mb-40 scroll-mt-28 relative
                before:content-[url('/bg-text-about.svg')]
                before:absolute
                before:top-0
                before:inline-block
                before:w-auto
                before:left-1/2
                before:-translate-x-1/2
                before:-z-40
                before:opacity-15
            "
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.175 }}
            id="about"
        >
            <div className="container">
                <div className="grid lg:grid-cols-12 gap-20">
                    <div className="mb-3 col-span-8">
                        <h2 className="text-5xl font-medium capitalize mb-16">About Me</h2>
                        <div dangerouslySetInnerHTML={{ __html: about }} />
                    </div>
                    <div className="col-span-4">
                        <Image
                            src="/img-wilbert-caba-profile-image.jpeg"
                            alt="Wilbert Caba image"
                            width="408"
                            height="408"
                            className="w-full rounded-lg"
                        />
                    </div>
                </div>
            </div>
        </motion.section>
    );
}
