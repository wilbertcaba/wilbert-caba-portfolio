"use client";

import React from "react";
import SectionHeading from "./section-heading";
import { motion } from "framer-motion";
import { useSectionInView } from "@/lib/hooks";
import { sendEmail } from "@/actions/sendEmail";
import SubmitButton from "./submit-btn";
import toast from "react-hot-toast";

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

            <form
                className="flex flex-col gap-4 mt-10"
                action={async (formData) => {
                    const { data, error } = await sendEmail(formData);

                    if (error) {
                        toast.error(error);
                        return; // to stop the function
                    }
                    toast.success("Email sent successfully");
                }}
            >
                <input
                    className="h-14 rounded-lg formFieldStyle p-4"
                    name="senderEmail"
                    type="email"
                    placeholder="Your email"
                    required
                    maxLength={500}
                />
                <textarea
                    className="h-52 formFieldStyle p-4"
                    name="message"
                    placeholder="How can I help you today?"
                    required
                    maxLength={5000}
                />
                <SubmitButton />
            </form>
        </motion.section>
    );
}
