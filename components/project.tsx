"use client";

import { useRef } from "react";
import { projectsData } from "@/lib/data";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";

type ProjectProps = (typeof projectsData)[number];

export default function Project({ title, description, tags, imageUrl }: ProjectProps) {
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
            <section className="bg-gray-100 max-w-[42rem] border border-black/5 overflow-hidden relative sm:h-[20rem] hover:bg-gray-200 transition rounded-lg">
                <div className="py-4 px-5 sm:px-10 sm:py-10 sm:max-w-[60%] flex flex-col gap-2 h-full group-even:ml-[18rem] group-odd:mr-[18rem]">
                    <h3 className="text-2xl font-semibold">{title}</h3>
                    <p className="leading-relaxed text-gray-700">{description}</p>
                    <ul className="flex flex-wrap mt-4 gap-2 sm:mt-auto">
                        {tags.map((tag, index) => (
                            <li
                                className="bg-black/[0.7] px-3 py-1 text-[0.7rem] uppercase tracking-wider text-white rounded-full"
                                key={index}
                            >
                                {tag}
                            </li>
                        ))}
                    </ul>
                </div>
                <Image
                    src={imageUrl}
                    alt={title}
                    quality={90}
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
                    "
                />
            </section>
        </motion.div>
    );
}
