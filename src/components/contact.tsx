"use client";

import React from "react";
import SectionHeading from "./section-heading";
import { motion } from "framer-motion";
import { useSectionInView } from "@/lib/hooks";
import { sendEmail } from "@/actions/sendEmail";
import SubmitButton from "./submit-btn";
import toast from "react-hot-toast";
import Eyebrow from "./eyebrow";

export default function Contact() {
    const { ref } = useSectionInView("contact");

    return (
        <motion.section
            ref={ref}
            id="contact"
            className="mb-20 w-[min(100%,38rem)] text-center sm:mb-28"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
        >
            <Eyebrow size="lg" className="text-center text-primary">
                [ Reach Out ]
            </Eyebrow>
            <SectionHeading alignment="center">
                Have a Vision? <span className="text-stroke-primary">Let's Talk</span>
            </SectionHeading>
            <p className="text-white/80">
                Fast track to my inbox:{" "}
                <a className="text-primary" href="mailto:hello@wilbertcaba.com">
                    hello@wilbertcaba.com
                </a>
            </p>

            <form
                className="mt-10 flex flex-col gap-4"
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
                    className="formFieldStyle h-14 rounded-lg bg-zinc-900 p-4"
                    name="senderEmail"
                    type="email"
                    placeholder="Your email"
                    required
                    maxLength={500}
                />
                <textarea
                    className="formFieldStyle h-52 bg-zinc-900 p-4"
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
