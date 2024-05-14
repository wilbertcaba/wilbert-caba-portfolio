"use client";

import React from "react";
import { delay, motion } from "framer-motion";

export default function SectionDivider() {
    return (
        <motion.div
            className="bg-gray-200 my-24 h-16 w-1 rounded-full hidden sm:block dark:bg-opacity-20"
            initial={{ y: 0, scale: 0, opacity: 0 }}
            animate={{ y: 0, scale: 1, opacity: 1 }}
            transition={{ delay: 0.1 }}
        ></motion.div>
    );
}
