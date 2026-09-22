import fs from "fs";
import path from "path";
import { HeroConfig } from "@/types/hero";

const CONFIG_PATH = path.join(process.cwd(), "data", "hero-config.json");

export function getHeroConfig(): HeroConfig {
  try {
    if (fs.existsSync(CONFIG_PATH)) {
      const data = fs.readFileSync(CONFIG_PATH, "utf-8");
      return JSON.parse(data);
    }
  } catch (error) {
    console.error("Error reading hero config:", error);
  }
  // Fallback default
  return {
    hero: {
      companyName: "JANCY BUILDERS",
      brandTagline: "BUILD THE WORLD",
      mainTitle: "FROM FOUNDATION TO FINISHED HOME.",
      subTitle: "Professional construction solutions built with precision, quality and trust.",
      ctaPrimaryText: "VIEW OUR PROJECTS",
      ctaPrimaryLink: "#projects",
      ctaSecondaryText: "GET A FREE QUOTE",
      ctaSecondaryLink: "#quote",
      logoUrl: "/logo/jancy-logo.svg",
    },
    settings: {
      autoplay: true,
      scrollAnimation: true,
      pauseOnHover: true,
      defaultDuration: 5,
      transitionDuration: 0.8,
      desktopVideoUrl: "/videos/construction-timelapse.mp4",
      mobileVideoUrl: "/videos/construction-timelapse-mobile.mp4",
      fallbackMode: "auto",
    },
    stages: [],
  };
}

export function saveHeroConfig(config: HeroConfig): boolean {
  try {
    const dir = path.dirname(CONFIG_PATH);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(CONFIG_PATH, JSON.stringify(config, null, 2), "utf-8");
    return true;
  } catch (error) {
    console.error("Error saving hero config:", error);
    return false;
  }
}
