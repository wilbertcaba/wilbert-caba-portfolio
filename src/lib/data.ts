import React from "react";
import { CgWorkAlt } from "react-icons/cg";
import { FaReact } from "react-icons/fa";
import { LuGraduationCap } from "react-icons/lu";
import corpcommentImg from "@/public/corpcomment.png";
import rmtdevImg from "@/public/rmtdev.png";
import wordanalyticsImg from "@/public/wordanalytics.png";
import { FiHome, FiUser, FiBriefcase, FiBox, FiMail } from "react-icons/fi";
import { HiOutlineBolt } from "react-icons/hi2";

export const links = [
    {
        name: "Home",
        hash: "#home",
        icon: {
            src: React.createElement(FiHome),
            alt: "Home icon",
        },
    },
    {
        name: "About",
        hash: "#about",
        icon: {
            src: React.createElement(FiUser),
            alt: "User icon",
        },
    },
    {
        name: "Projects",
        hash: "#projects",
        icon: {
            src: React.createElement(FiBox),
            alt: "Box icon",
        },
    },
    {
        name: "Skills",
        hash: "#skills",
        icon: {
            src: React.createElement(HiOutlineBolt),
            alt: "Bolt icon",
        },
    },
    {
        name: "Experience",
        hash: "#experience",
        icon: {
            src: React.createElement(FiBriefcase),
            alt: "Briefcase icon",
        },
    },
    {
        name: "Contact",
        hash: "#contact",
        icon: {
            src: React.createElement(FiMail),
            alt: "Mail icon",
        },
    },
] as const;

export const experiencesData = [
    {
        title: "UX Designer",
        location: "Santo Domingo, DR",
        company: "Berry Whale Dominicana",
        description:
            "I worked as an UX Designer for 2 years. I designed websites and mobile apps for clients in the Financial and Health industries.",
        icon: React.createElement(LuGraduationCap),
        date: "2010",
    },
    {
        title: "UX Designer",
        location: "Santo Domingo, DR",
        company: "Grupo Universal",
        description:
            "One of the biggest holding companies in Dominican Republic with business in the Financial, Health and Fiduciary industries. I conducted user research and UX Design to improve the company's digital products, from websites to mobile apps.",
        icon: React.createElement(CgWorkAlt),
        date: "2012 - 2015",
    },
    {
        title: "UX Developer",
        location: "West Palm Beach, FL",
        company: "PMP Marketing Group",
        description:
            "I'm currently working as a UX Developer at PMP Marketing Group, an agency that specializes in marketing for law firms. I conduct user research, design and develop custom Wordpress themes for our clients in the legal industry.",
        icon: React.createElement(FaReact),
        date: "2016 - present",
    },
] as const;

export const projectsData = [
    {
        title: "Project 1",
        excerpt:
            "This is the project's excerpt. It is a brief description of the project to be displayed on the homepage and projects page.",
        projectLink: "https://www.google.com",
        role: "Front-End Developer",
        tags: ["React", "Next.js", "MongoDB", "Tailwind", "Prisma"],
        imageUrl: corpcommentImg,
        slug: "project1",
        description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam aliquam, nunc id aliquet ultricies, nisl nunc lacinia nunc",
    },
    {
        title: "Project 2",
        excerpt: "This is the project's excerpt. It is a brief description of the project.",
        projectLink: "https://www.google.com",
        role: "Front-End Developer",
        tags: ["React", "TypeScript", "Next.js", "Tailwind", "Redux"],
        imageUrl: rmtdevImg,
        slug: "project2",
        description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam aliquam, nunc id aliquet ultricies, nisl nunc lacinia nunc",
    },
    {
        title: "Project 3",
        excerpt: "This is the project's excerpt. It is a brief description of the project.",
        projectLink: "https://www.google.com",
        role: "Front-End Developer",
        tags: ["React", "Next.js", "SQL", "Tailwind", "Framer"],
        imageUrl: wordanalyticsImg,
        slug: "project3",
        description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam aliquam, nunc id aliquet ultricies, nisl nunc lacinia nunc",
    },
] as const;

export const skillsData = [
    "HTML",
    "CSS",
    "JavaScript",
    "TypeScript",
    "React",
    "Next.js",
    "Node.js",
    "Git",
    "Tailwind",
    "Bootstrap",
    "Framer Motion",
    "Figma",
    "Adobe XD",
    "Photoshop",
    "Illustrator",
] as const;
