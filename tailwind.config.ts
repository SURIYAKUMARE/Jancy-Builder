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
        background: "#000000",
        foreground: "#FFFFFF",
        primary: {
          DEFAULT: "#000000",
          dark: "#000000",
          light: "#121214",
        },
        accent: {
          DEFAULT: "#C9A46B", // Liquid glass gold accent
          light: "#E2C496",
          dark: "#A3804A",
          glow: "rgba(201, 164, 107, 0.25)",
        },
        gold: {
          DEFAULT: "#C9A46B",
          light: "#E2C496",
          dark: "#A3804A",
          glow: "rgba(201, 164, 107, 0.25)",
        },
        bronze: {
          DEFAULT: "#C9A46B",
          light: "#E2C496",
          dark: "#A3804A",
          glow: "rgba(201, 164, 107, 0.25)",
        },
      },
      fontFamily: {
        heading: ["'Instrument Serif'", "serif"],
        body: ["'Barlow'", "sans-serif"],
        tamil: ["'Noto Sans Tamil'", "sans-serif"],
        sans: ["'Barlow'", "sans-serif"],
        serif: ["'Instrument Serif'", "serif"],
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
