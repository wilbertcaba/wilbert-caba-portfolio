import React from "react";

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="mb-10 px-4 text-center text-gray-500">
            <small className="mb-2 text-xs">&copy; {currentYear} Wilbert Caba. All rights reserved.</small>
            <p className="text-xs">
                <strong>About this website:</strong> built with React & Next.js (App Router & Server Actions),
                TypeScript, Tailwind CSS, Framer Motion, React Email & Resend, Vercel Hosting.
            </p>
        </footer>
    );
}
