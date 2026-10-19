"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import type { ProjectWithMedia } from "@/lib/cms";
import Eyebrow from "@/components/eyebrow";
import Tags from "./tags";
import { ArrowRightIcon } from "lucide-react";

export default function Project({
    title,
    eyebrow,
    excerpt,
    tags,
    featuredImage,
    slug,
    projectIndex,
}: ProjectWithMedia) {
    const [isVisible, setIsVisible] = useState(false);
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
            className="group mx-auto mb-3 w-full last:mb-0 sm:mb-8"
        >
            <Link
                href={`/projects/${slug}`}
                scroll={false}
                className="block bg-gradient-to-tr from-primary to-neutral-800 to-[40%] pb-px pt-px"
            >
                <div className="relative flex flex-col-reverse border-0 bg-neutral-950 text-white transition hover:bg-neutral-900 sm:min-h-[18rem] lg:flex-row lg:items-center lg:justify-between">
                    <div className="flex flex-col gap-4 px-5 py-8 sm:flex-row sm:divide-x sm:divide-neutral-800 sm:p-10 lg:max-w-screen-sm lg:pr-6">
                        <div className="pr-8 font-eyebrow text-primary underline underline-offset-8">{projectIndex}</div>
                        <div className="sm:pl-8">
                            <Eyebrow>{eyebrow}</Eyebrow>
                            <h3 className="mb-4 text-2xl font-semibold">{title}</h3>
                            <p className="text-neutral-500">{excerpt}</p>
                            <Tags tags={tags} />
                            <p className="mb-0 mt-8 flex items-center gap-2 text-primary">
                                View Case Study{" "}
                                <ArrowRightIcon className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                            </p>
                        </div>
                    </div>
                    <div className="w-full lg:w-[540px] lg:shrink-0">
                        <Image
                            src={featuredImage.url || ""}
                            alt={featuredImage.alt || title}
                            quality={90}
                            width={1600}
                            height={900}
                            sizes="(min-width: 1024px) 540px, 100vw"
                            className="aspect-video h-auto w-full object-contain shadow-2xl"
                        />
                    </div>
                </div>
            </Link>
        </motion.div>
    );
}
