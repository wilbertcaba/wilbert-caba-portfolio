"use client";

import React from "react";
import SectionHeading from "./section-heading";
import { FaPaperPlane } from "react-icons/fa";
import { motion } from "framer-motion";
import { useSectionInView } from "@/lib/hooks";

export default function Contact() {
    const { ref } = useSectionInView("Contact");

    return (
        <motion.section
            ref={ref}
            id="contact"
            className="mb-20 sm:mb-28 w-[min(100%,38rem)] text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
        >
            <SectionHeading>Contact Me</SectionHeading>
            <p className="text-gray-700">
                Please contact me directly at <a href="mailto:hello@wilbertcaba.com">hello@wilbertcaba.com</a>
            </p>

            <form className="flex flex-col gap-4 mt-10" action="">
                <input className="h-14 rounded-lg formFieldStyle p-4" type="email" placeholder="Your email" />
                <textarea className="h-52 formFieldStyle p-4" placeholder="How can I help you today?" />
                <button
                    className="group flex items-center justify-center gap-2 h-[3rem] w-[8rem] bg-gray-800 hover:bg-gray-950 text-white rounded-full outline-none transition-all"
                    type="submit"
                >
                    Sumbit
                    <FaPaperPlane className="text-xs opacity-70 transition-all group-hover:translate-x-1 group-hover:-translate-y-1" />
                </button>
            </form>
        </motion.section>
    );
}
