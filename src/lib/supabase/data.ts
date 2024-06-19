import { createClientComponentClient, createServerComponentClient } from "@/lib/supabase/supabase";
import { cookies } from "next/headers";

export async function fetchProjects() {
    const cookieStore = cookies();
    const supabase = createServerComponentClient(cookieStore);
    const { data: projects, error } = await supabase.from("projects").select(`
            *, 
            featured_image:media(url, alt)
        `);

    if (error) {
        console.log("Error fetching projects", error);
        return [];
    }

    const { data: tags, error: tagsError } = await supabase.from("projects_tags").select();

    if (tagsError) {
        console.log("Error fetching tags", tagsError);
        return [];
    }

    // Map tags by parent_id
    const tagsMap = tags.reduce((acc, tag) => {
        if (!acc[tag._parent_id]) {
            acc[tag._parent_id] = [];
        }

        acc[tag._parent_id].push(tag.tag);
        return acc;
    }, {});

    const projectsData = projects.map((project) => ({
        ...project,
        tags: tagsMap[project.id] || [],
    }));

    return projectsData;
}

export async function fetchSingleProject(slug: string) {
    const cookieStore = cookies();
    const supabase = createServerComponentClient(cookieStore);
    const { data: project, error } = await supabase
        .from("projects")
        .select("*, featured_image:media(url, alt)")
        .eq("slug", slug)
        .single();

    if (error) {
        console.log("Error fetching project", error);
        return [];
    }

    const { data: tags, error: tagsError } = await supabase.from("projects_tags").select();

    if (tagsError) {
        console.log("Error fetching tags", tagsError);
        return [];
    }

    // Map tags by parent_id
    const tagsMap = tags.reduce((acc, tag) => {
        if (!acc[tag._parent_id]) {
            acc[tag._parent_id] = [];
        }

        acc[tag._parent_id].push(tag.tag);
        return acc;
    }, {});

    project.tags = tagsMap[project.id] || [];

    return project;
}

export async function fetchExperiences() {
    const cookieStore = cookies();
    const supabase = createServerComponentClient(cookieStore);
    const { data: experiences, error } = await supabase.from("experience").select();

    if (error) {
        console.log("Error fetching experiences", error);
        return [];
    }

    return experiences;
}

export async function fetchHomepageData() {
    const cookieStore = cookies();
    const supabase = createServerComponentClient(cookieStore);
    const { data: homepageData, error } = await supabase.from("homepage").select(`
        main_value_proposition,
        about_html, 
        logo:media!homepage_logo_id_media_id_fk(url, alt),
        resume:media!homepage_resume_id_media_id_fk(url, alt)
    `);

    if (error) {
        console.log("Error fetching main homepage data", error);
        return [];
    }

    return homepageData;
}

export async function fetchSkills() {
    const cookieStore = cookies();
    const supabase = createServerComponentClient(cookieStore);
    const { data: skills, error } = await supabase.from("homepage_skills").select();

    if (error) {
        console.log("Error fetching skills", error);
        return [];
    }

    return skills;
}
