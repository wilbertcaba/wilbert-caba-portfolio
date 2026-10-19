import Link from "next/link";

export default function NotFound() {
    return (
        <main className="container flex min-h-[50vh] flex-col items-center justify-center py-24 text-center">
            <h1 className="mb-3 text-3xl font-semibold">Project not found</h1>
            <p className="mb-8 max-w-md text-neutral-500">That project link is invalid or no longer available.</p>
            <Link href="/#projects" className="text-primary underline underline-offset-4">
                Back to Projects
            </Link>
        </main>
    );
}
