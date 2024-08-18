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
                    // Check v3.0.0-beta.56 for breaking changes with fields
                    // Refactored using the new custom component import method:
                    // https://payloadcms.com/docs/beta/admin/components#defining-custom-components-in-the-payload-config
                    Field: "/src/components/testComponent.tsx",
                },
            },
        },
    ],
};
