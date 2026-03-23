import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        gold: { 400: "#c9a84c", 500: "#b8943f", 600: "#9a7b2e" },
        cream: { 50: "#fdfbf7", 100: "#f9f3e8", 200: "#f2e6d0" },
        rose: '#C4847A',
        charcoal: '#2D2D2D',
        sage: '#8B9E7E',
        amber: { 900: '#78350f', 700: '#b45309' },
      },
      fontFamily: {
        serif: ["Georgia", "Cambria", "Times New Roman", "serif"],
      },
    },
  },
  plugins: [],
};
export default config;
