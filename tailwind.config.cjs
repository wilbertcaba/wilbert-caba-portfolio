/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    prefix: "",
    theme: {
        container: {
            center: true,
            padding: {
                DEFAULT: "2rem",
                // sm: "2rem",
            },
            screens: {
                "2xl": "1400px",
            },
        },
        extend: {
            colors: {
                primary: "#2FD38E",
                "primary-300": "#42ecab",
            },
            backgroundImage: {
                "pattern-triangles": "url('/pattern-triangles.png')",
                "pattern-triangles-small": "url('/pattern-triangles-2.svg')",
                "text-projects": "url('/bg-text-projects.svg')",
                "text-about": "url('/bg-text-about.svg')",
                "radial-gradient-dark":
                    "radial-gradient(ellipse 80% 40%, hsl(0 0% 10% / 1) 30%, hsl(0deg 0% 0% / 0%) 130%)",
                "radial-gradient-light":
                    "radial-gradient(ellipse 80% 40%, hsl(0 0% 100% / 1) 30%, hsl(0deg 0% 100% / 0%) 130%)",
                "pattern-logo-left": "url('/pattern-logo-left.svg')",
            },
            keyframes: {
                "accordion-down": {
                    from: { height: "0" },
                    to: { height: "var(--radix-accordion-content-height)" },
                },
                "accordion-up": {
                    from: { height: "var(--radix-accordion-content-height)" },
                    to: { height: "0" },
                },
            },
            animation: {
                "accordion-down": "accordion-down 0.2s ease-out",
                "accordion-up": "accordion-up 0.2s ease-out",
            },
        },
    },
    plugins: [require("tailwindcss-animate")],
    darkMode: "class",
};
