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
        // Architectural Luxury Design System
        charcoal: {
          DEFAULT: "#111318",
          dark: "#0C0E12",
          light: "#1A1D24",
        },
        ivory: {
          DEFAULT: "#F7F4EE",
          dark: "#EFECE5",
          light: "#FCFAF6",
        },
        beige: {
          DEFAULT: "#E8DFD1",
          dark: "#D6CABA",
          light: "#F2ECE2",
        },
        gold: {
          DEFAULT: "#B88746",
          light: "#D8A868",
          dark: "#966830",
          glow: "rgba(184, 135, 70, 0.25)",
        },
        jancy: {
          red: "#E50914",
          "red-light": "#FF4B4B",
          "red-dark": "#B91C1C",
          blue: "#0066CC",
          "blue-light": "#38BDF8",
          "blue-dark": "#034078",
          gold: "#B88746",
          "gold-light": "#D8A868",
          carbon: "#111318",
          obsidian: "#0C0E12",
          steel: "#475569",
          concrete: "#94A3B8",
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
