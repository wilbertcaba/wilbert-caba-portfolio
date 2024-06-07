"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { ProjectProps } from "@/lib/types";
import Tags from "./tags";

export default function Project({ title, excerpt, description_html, tags, featuredImage, slug }: ProjectProps) {
    const ref = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["0 1", "1.33 1"], // The transition will start when the bottom of the image is 1.33 times the height of the viewport away from the top of the viewport
    });

    const scaleProgress = useTransform(scrollYProgress, [0, 1], [0.9, 1]);
    const opacityProgress = useTransform(scrollYProgress, [0, 1], [0.4, 1]);

    return (
        <motion.div
            ref={ref}
            style={{
                scale: scaleProgress,
                opacity: opacityProgress,
            }}
            className="group mb-3 sm:mb-8 last:mb-0"
        >
            <Link href={`/projects/${slug}`}>
                <div className="bg-gray-100 max-w-[42rem] border border-black/5 overflow-hidden relative sm:h-[20rem] hover:bg-gray-200 transition rounded-lg dark:text-white dark:bg-white/10 dark:hover:bg-white/5">
                    <div className="py-4 px-5 sm:px-10 sm:py-10 sm:max-w-[60%] flex flex-col gap-2 h-full sm:group-even:ml-[18rem] sm:group-odd:mr-[18rem]">
                        <h3 className="text-2xl font-semibold">{title}</h3>
                        <p>{excerpt}</p>
                        <Tags tags={tags} />
                    </div>
                    <Image
                        src={featuredImage.url}
                        alt={title}
                        quality={90}
                        width={600}
                        height={600}
                        className="absolute top-5 -right-44 w-[28.25rem] rounded-t-lg shadow-2xl 
                        transition
                        group-even:right-[initial]
                        group-even:-left-44 
                        group-hover:-translate-x-3 
                        group-hover:translate-y-3 
                        group-hover:-rotate-2 
                        group-even:group-hover:translate-x-3 
                        group-even:group-hover:rotate-2 
                        group-hover:scale-[1.04]
                        hidden sm:block
                        "
                    />
                </div>
            </Link>
        </motion.div>
    );
}
