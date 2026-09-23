export interface BlueprintSpecs {
  [key: string]: string;
}

export interface ConstructionStage {
  id: number;
  stageNumber: string;
  name: string;
  title: string;
  description: string;
  desktopMediaUrl: string;
  mobileMediaUrl: string;
  mediaType: "image" | "video";
  duration: number; // in seconds
  order: number;
  active: boolean;
  milestone: string;
  blueprintSpecs?: BlueprintSpecs;
}

export type Stage = ConstructionStage;

export interface HeroContent {
  companyName: string;
  brandTagline: string;
  mainTitle: string;
  subTitle: string;
  ctaPrimaryText: string;
  ctaPrimaryLink: string;
  ctaSecondaryText: string;
  ctaSecondaryLink: string;
  logoUrl: string;
}

export interface HeroSettings {
  autoplay: boolean;
  scrollAnimation: boolean;
  pauseOnHover: boolean;
  defaultDuration: number;
  transitionDuration: number;
  desktopVideoUrl: string;
  mobileVideoUrl: string;
  fallbackMode: "auto" | "video" | "image" | "blueprint";
}

export interface HeroConfig {
  hero: HeroContent;
  settings: HeroSettings;
  stages: ConstructionStage[];
}
