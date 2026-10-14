import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        // MotionSites AI / Luxury Architectural Design System
        primary: {
          DEFAULT: "#17191B", // Deep charcoal
          dark: "#0F1012",
          light: "#25282B",
        },
        ivory: {
          DEFAULT: "#F8F6F1", // Warm ivory background
          dark: "#EFECE4",
          light: "#FCFAF6",
        },
        concrete: {
          DEFAULT: "#A5A5A2", // Concrete gray
          dark: "#787875",
          light: "#CECECB",
        },
        bronze: {
          DEFAULT: "#B78A52", // Architectural bronze accent
          dark: "#966E3A",
          light: "#D4A870",
          glow: "rgba(183, 138, 82, 0.2)",
        },
        "rich-black": "#202124", // Rich black text
        charcoal: {
          DEFAULT: "#17191B",
          dark: "#0F1012",
          light: "#25282B",
        },
        gold: {
          DEFAULT: "#B78A52",
          light: "#D4A870",
          dark: "#966E3A",
          glow: "rgba(183, 138, 82, 0.2)",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "-apple-system", "BlinkMacSystemFont", "sans-serif"],
        display: ["var(--font-cinzel)", "Cinzel", "serif"],
        serif: ["var(--font-playfair)", "Playfair Display", "serif"],
        mono: ["var(--font-mono)", "JetBrains Mono", "monospace"],
      },
      animation: {
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "laser-scan": "laserScan 4s ease-in-out infinite",
        "shimmer": "shimmer 2.5s infinite",
        "float": "float 6s ease-in-out infinite",
      },
      keyframes: {
        laserScan: {
          "0%, 100%": { transform: "translateY(-100%)", opacity: "0" },
          "50%": { transform: "translateY(100%)", opacity: "0.8" },
        },
        shimmer: {
          "100%": { transform: "translateX(100%)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-6px)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
