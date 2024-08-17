import { postgresAdapter } from "@payloadcms/db-postgres";
// import { payloadCloud } from '@payloadcms/plugin-cloud'
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import path from "path";
import { buildConfig } from "payload";
// import sharp from 'sharp'
import { fileURLToPath } from "url";
import { Users } from "./collections/Users";
import { Projects } from "./collections/Projects";
import { Media } from "./collections/Media";
import { Experience } from "./collections/Experience";
import { Homepage } from "./globals/Homepage";
import { MainNav } from "./globals/MainNav";
import { s3Storage } from "@payloadcms/storage-s3";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
    admin: {
        user: Users.slug,
    },
    collections: [Users, Projects, Experience, Media],
    globals: [MainNav, Homepage],
    editor: lexicalEditor({}),
    // plugins: [payloadCloud()], // TODO: Re-enable when cloud supports 3.0
    secret: process.env.PAYLOAD_SECRET!,
    typescript: {
        outputFile: path.resolve(dirname, "payload-types.ts"),
    },
    db: postgresAdapter({
        pool: {
            connectionString: process.env.DATABASE_URI!,
        },
        // push: false,
    }),

    plugins: [
        s3Storage({
            collections: {
                media: {
                    prefix: "media",
                },
            },
            bucket: process.env.S3_BUCKET!,
            config: {
                forcePathStyle: true,
                credentials: {
                    accessKeyId: process.env.S3_ACCESS_KEY_ID!,
                    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY!,
                },
                region: process.env.S3_REGION,
                endpoint: process.env.S3_ENDPOINT,
            },
        }),
    ],

    // Sharp is now an optional dependency -
    // if you want to resize images, crop, set focal point, etc.
    // make sure to install it and pass it to the config.

    // This is temporary - we may make an adapter pattern
    // for this before reaching 3.0 stable

    // sharp,
});
