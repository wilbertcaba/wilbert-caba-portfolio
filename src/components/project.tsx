"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { ProjectProps } from "@/lib/types";
import Tags from "./tags";

export default function Project({ title, excerpt, tags, featured_image, slug }: ProjectProps) {
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
            className="group mb-3 sm:mb-8 last:mb-0 w-full max-w-[48rem] mx-auto"
        >
            <Link href={`/projects/${slug}`}>
                <div className="flex flex-col-reverse bg-gray-100 border border-black/5 overflow-hidden relative sm:h-[18rem] hover:bg-gray-200 transition rounded-lg dark:text-white dark:border dark:border-neutral-600 dark:bg-neutral-800 dark:hover:bg-neutral-900">
                    <div className="py-4 px-5 sm:px-10 sm:py-10 sm:max-w-[60%] flex flex-col gap-2 h-full sm:group-even:ml-[18rem] sm:group-odd:mr-[18rem]">
                        <h3 className="text-2xl text-primary font-semibold">{title}</h3>
                        <p>{excerpt}</p>
                        <Tags tags={tags} />
                    </div>
                    <div className="w-full h-48 overflow-hidden relative md:static md:h-auto">
                        <Image
                            src={featured_image.url}
                            alt={title}
                            quality={90}
                            width={600}
                            height={600}
                            className="md:absolute md:top-5 md:-right-44 md:w-[28.25rem] rounded-t-lg shadow-2xl min-h-full object-cover
                            transition
                            group-even:right-[initial]
                            group-even:-left-44 
                            md:group-hover:-translate-x-3 
                            md:group-hover:translate-y-3 
                            md:group-hover:-rotate-2 
                            md:group-even:group-hover:translate-x-3 
                            md:group-even:group-hover:rotate-2 
                            md:group-hover:scale-[1.04]
                            
                            "
                        />
                    </div>
                </div>
            </Link>
        </motion.div>
    );
}
