import { getPayloadHMR } from "@payloadcms/next/utilities";
import React from "react";
import config from "@payload-config";

export default async function ProjectTest() {
    const payload = await getPayloadHMR({ config });
    const projects = await payload.find({
        collection: "projects",
    });

    // console.log(projects.docs);

    return (
        <div>
            <div>ProjectTest</div>
            <div>
                {projects.docs.map((project) => {
                    return (
                        <div key={project.id}>
                            <h3>{project.title as string}</h3>
                            {/* <div dangerouslySetInnerHTML={{ __html: project.description_html || "No HTML" }} /> */}
                            <a href={project.url as string}>Visit</a>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
