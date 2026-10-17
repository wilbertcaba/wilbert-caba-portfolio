// import TestComponent from "@/components/testComponent";
import type { CollectionConfig } from "payload";

export const Users: CollectionConfig = {
    slug: "users",
    admin: {
        useAsTitle: "email",
    },
    auth: true,
    fields: [
        // Email added by default
        // Add more fields as needed
        {
            name: "test",
            type: "ui",
            admin: {
                components: {
                    // Path is resolved from `admin.importMap.baseDir` (`src`).
                    Field: "/components/testComponent.tsx",
                },
            },
        },
    ],
};
