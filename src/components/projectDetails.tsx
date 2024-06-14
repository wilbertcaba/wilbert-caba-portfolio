"use client";

import { useRouter } from "next/navigation";
import { ProjectProps } from "@/lib/types";
import Image from "next/image";
import { RiLinkM } from "react-icons/ri";
import { FiBriefcase, FiArrowLeft } from "react-icons/fi";
import Tags from "@/components/tags";

export default function ProjectDetails({ project }: { project: ProjectProps }) {
    const router = useRouter();

    return (
        <section className="max-w-[68rem] m-auto pb-12">
            <header className="py-8">
                <button
                    onClick={() => router.back()}
                    className="group bg-white shadow-md px-7 py-3 flex items-center justify-center gap-2 rounded-full outline-none hover:shadow-none transition duration-[0.3s] dark:bg-white/10"
                >
                    <FiArrowLeft className="opacity-70 group-hover:-translate-x-1 group-hover:opacity-1 transition duration-[0.3s]" />
                    Back
                </button>
            </header>

            <Image
                src={project.featured_image.url}
                alt={project.featured_image.alt}
                layout="responsive"
                width={16}
                height={9}
                className="mb-8"
            />
            <div className="border-b mb-8 pb-4">
                <h1 className="text-3xl font-medium capitalize mb-2">{project.title}</h1>
                <p className="mb-2 dark:text-white/75">{project.excerpt}</p>
                <div className="flex gap-8 mb-3">
                    <p className="flex gap-2 items-center text-gray-700 dark:text-white/75">
                        <RiLinkM /> <a href={project.projectLink}>{project.projectLink}</a>
                    </p>
                    <p className="flex gap-2 items-center text-gray-700 dark:text-white/75">
                        <FiBriefcase /> {project.role}
                    </p>
                </div>
                <Tags tags={project.tags} className="mb-2" />
            </div>
            <div
                className="text-dark-700 dark:text-white/75"
                dangerouslySetInnerHTML={{ __html: project.description_html }}
            />
        </section>
    );
}
