import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage:{
        'custom-bg':"url('/bgimage.jpg')"
      },
      colors: {
        'custom-blue': '#1a2639',
        'custom-orange': '#f1a96d',
        'custom-hover': '#111b2b',
        'custom-gr1': '#f5e6d3',
        'custom-gr2': '#ffffff',
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
  },
  plugins: [],
} satisfies Config;
