import { createClientComponentClient, createServerComponentClient } from "@/lib/supabase/supabase";

export async function fetchProjects() {
    const supabase = createServerComponentClient();
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
    const supabase = createServerComponentClient();
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
    const supabase = createServerComponentClient();
    const { data: experiences, error } = await supabase.from("experience").select();

    if (error) {
        console.log("Error fetching experiences", error);
        return [];
    }

    console.log(experiences);

    return experiences;
}
