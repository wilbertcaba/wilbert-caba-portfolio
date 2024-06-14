"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ProjectProps } from "@/lib/types";
import Image from "next/image";
import { RiLinkM } from "react-icons/ri";
import { FiBriefcase, FiArrowLeft } from "react-icons/fi";
import Tags from "@/components/tags";

export default function ProjectDetails({ params }: { params: { slug: ProjectProps["slug"] } }) {
    const [project, setProject] = useState<ProjectProps | null>(null);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();
    const slug = params.slug;

    useEffect(() => {
        const fetchProject = async () => {
            try {
                // We have to make this query more efficient to avoid fetching all projects
                // const res = await fetch(`/api/Projects/${id}`);
                const res = await fetch(`/api/Projects`);
                const data = await res.json();
                const projectData = data?.docs.find((project: ProjectProps) => project.slug === slug);

                setProject(projectData);
                setError(null);
                console.log("This is the project data: ", data);
            } catch (error) {
                console.error("Couldn't fetch project: ", error);
                setError("Failed to fetch project.");
                setProject(null);
            }
        };

        fetchProject();
    }, [slug]);

    if (!project) return <p>Loading...</p>;

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
            {error && <p>{error}</p>}
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
