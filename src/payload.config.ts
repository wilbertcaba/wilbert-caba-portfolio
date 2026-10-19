import { postgresAdapter } from "@payloadcms/db-postgres";
// import { payloadCloud } from '@payloadcms/plugin-cloud'
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import path from "path";
import { buildConfig } from "payload";
import sharp from "sharp";
import { fileURLToPath } from "url";
import { Users } from "./collections/Users";
import { Projects } from "./collections/Projects";
import { Media } from "./collections/Media";
import { Experience } from "./collections/Experience";
import { Homepage } from "./globals/Homepage";
import { MainNav } from "./globals/MainNav";
import { seoPlugin } from "@payloadcms/plugin-seo";
import { s3Storage } from "@payloadcms/storage-s3";
import { generateDescription, generateImage, generateTitle, generateURL } from "./seo";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
    admin: {
        user: Users.slug,
        importMap: {
            // Component paths such as `/components/...` resolve from this directory.
            baseDir: path.resolve(dirname),
        },
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
        // Dev push would fight this migration history. Apply schema changes with `yarn payload migrate`.
        push: false,
    }),

    plugins: [
        seoPlugin({
            collections: ["Projects"],
            globals: ["homepage"],
            uploadsCollection: "media",
            tabbedUI: true,
            generateTitle,
            generateDescription,
            generateImage,
            generateURL,
        }),
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

    // Required for image sizes, cropping, and focal point on the Media collection.
    sharp,
});
