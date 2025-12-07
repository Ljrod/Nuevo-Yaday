import type { Config } from "tailwindcss";

const config: Config = {
    darkMode: ["class"],
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: {
                    DEFAULT: "#7f0030",
                    foreground: "#ffffff",
                },
                accent: {
                    DEFAULT: "#ff93c7",
                    foreground: "#000000",
                },
                background: "#ffecf1",
                foreground: "#000000",
            },
            fontFamily: {
                playfair: ["var(--font-playfair)", "serif"],
                sans: ["var(--font-pt-sans)", "sans-serif"],
            },
        },
    },
    plugins: [],
};

export default config;
