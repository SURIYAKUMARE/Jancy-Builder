"use client";

import React, { useState, useEffect } from "react";
import { HeroConfig } from "@/types/hero";
import NavbarExact from "@/components/exact/NavbarExact";
import HeroExact from "@/components/exact/HeroExact";
import AboutEditorial from "@/components/sections/AboutEditorial";
import ServicesExact from "@/components/exact/ServicesExact";
import ConstructionPackages from "@/components/sections/ConstructionPackages";
import ProjectsExact from "@/components/exact/ProjectsExact";
import GallerySection from "@/components/sections/GallerySection";
import ConstructionProcessUnified from "@/components/sections/ConstructionProcessUnified";
import EstimatorSection from "@/components/sections/EstimatorSection";
import ContactSection from "@/components/sections/ContactSection";
import FooterExact from "@/components/exact/FooterExact";
import FloatingWhatsApp from "@/components/common/FloatingWhatsApp";
import StageExplorerModal from "@/components/stages/StageExplorerModal";
import QuoteModal from "@/components/quote/QuoteModal";
import BrandIntro from "@/components/intro/BrandIntro";
import MobileBottomBar from "@/components/mobile/MobileBottomBar";
import EngineerWelcomeModal from "@/components/engineer/EngineerWelcomeModal";
import FloatingEngineerAssistant from "@/components/engineer/FloatingEngineerAssistant";

interface HomePageClientProps {
  initialConfig: HeroConfig;
}

export default function HomePageClient({ initialConfig }: HomePageClientProps) {
  const [config, setConfig] = useState<HeroConfig>(initialConfig);
  const [currentStageIndex, setCurrentStageIndex] = useState<number>(11); // Start at Stage 12 (Completed Home) matching the mockup!
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [progressPercent, setProgressPercent] = useState<number>(0);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1);
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState<boolean>(false);
  const [selectedPackageGrade, setSelectedPackageGrade] = useState<"standard" | "premium" | "ultra">("premium");
  const [isExplorerModalOpen, setIsExplorerModalOpen] = useState<boolean>(false);
  const [explorerInitialIdx, setExplorerInitialIdx] = useState<number>(0);
  const [isWelcomeModalOpen, setIsWelcomeModalOpen] = useState<boolean>(false);

  useEffect(() => {
    // Automatically trigger the realistic engineer welcome animation on page load
    const timer = setTimeout(() => {
      setIsWelcomeModalOpen(true);
    }, 1200);
    return () => clearTimeout(timer);
  }, []);

  const activeStages = config.stages.filter((s) => s.active);
  const currentStage = activeStages[currentStageIndex] || activeStages[0];

  // Fetch latest config from API on mount
  useEffect(() => {
    fetch("/api/hero")
      .then((res) => res.json())
      .then((data) => {
        if (data?.stages?.length) {
          setConfig(data);
        }
      })
      .catch((err) => console.log("Using initial static config:", err));
  }, []);

  // Timer loop for autoplay timelapse respecting playbackSpeed
  useEffect(() => {
    if (!isPlaying || activeStages.length === 0) return;

    const stageDurationSeconds = (currentStage?.duration || config.settings.defaultDuration || 5) / playbackSpeed;
    const intervalMs = 50;
    const stepIncrement = 100 / ((stageDurationSeconds * 1000) / intervalMs);

    const timer = setInterval(() => {
      setProgressPercent((prev) => {
        if (prev >= 100) {
          setCurrentStageIndex((prevIdx) => (prevIdx + 1) % activeStages.length);
          return 0;
        }
        return prev + stepIncrement;
      });
    }, intervalMs);

    return () => clearInterval(timer);
  }, [isPlaying, currentStageIndex, currentStage, activeStages.length, config.settings.defaultDuration, playbackSpeed]);

  const handleSelectStage = (idx: number) => {
    setCurrentStageIndex(idx);
    setProgressPercent(0);
  };

  const handleTogglePlay = () => {
    setIsPlaying((prev) => !prev);
  };

  const handleOpenExplorer = (stageIdx: number = currentStageIndex) => {
    setExplorerInitialIdx(stageIdx);
    setIsExplorerModalOpen(true);
  };

  const handleOpenQuoteWithTier = (tier?: "standard" | "premium" | "ultra") => {
    if (tier) setSelectedPackageGrade(tier);
    setIsQuoteModalOpen(true);
  };

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-[#F8F6F1] text-[#202124] flex flex-col font-sans selection:bg-[#B78A52]/20 selection:text-[#B78A52]">
      {/* 0. ARCHITECTURAL HAIRLINE INTRO ANIMATION */}
      <BrandIntro />

      {/* 1. EXACT WHITE NAVBAR */}
      <NavbarExact onOpenQuote={() => handleOpenQuoteWithTier()} />

      {/* CANONICAL 8-SECTION ARCHITECTURAL STRUCTURE */}
      <main className="flex-grow">
        {/* 1. HOME: FULLSCREEN 3D CONSTRUCTING VILLA HERO */}
        <HeroExact
          stages={activeStages}
          currentStageIndex={currentStageIndex}
          onSelectStage={handleSelectStage}
          isPlaying={isPlaying}
          onTogglePlay={handleTogglePlay}
          progressPercent={progressPercent}
          onOpenQuote={() => handleOpenQuoteWithTier()}
          onOpenExplorer={handleOpenExplorer}
        />

        {/* 2. ABOUT JANCY BUILDERS: EDITORIAL FOUNDER CREED & PILLARS */}
        <AboutEditorial onOpenQuote={() => handleOpenQuoteWithTier()} />

        {/* 3. SERVICES: 4 ARCHITECTURAL DISCIPLINES */}
        <ServicesExact onOpenQuote={() => handleOpenQuoteWithTier()} />

        {/* 4. CONSTRUCTION PACKAGES: DEEJOS-INSPIRED COMPARISON & SPECS */}
        <ConstructionPackages onOpenQuote={handleOpenQuoteWithTier} />

        {/* 5. OUR PROJECTS: 257 AUTHENTIC SITE PHOTOS & BEFORE/AFTER */}
        <ProjectsExact onOpenQuote={() => handleOpenQuoteWithTier()} />

        {/* 6. CONSTRUCTION PROCESS: CONSOLIDATED 6-STAGE WORKFLOW & TESTIMONIALS */}
        <ConstructionProcessUnified onOpenQuote={() => handleOpenQuoteWithTier()} />

        {/* 7. COST ESTIMATOR: INTERACTIVE SLIDER & INSTANT BOQ GENERATOR */}
        <EstimatorSection onOpenQuote={() => handleOpenQuoteWithTier()} />

        {/* 8. CONTACT: SAMUGARENGAPURAM HQ & DIRECT ENGINEER LINE */}
        <ContactSection />
      </main>

      {/* 9. EXACT DARK FOOTER */}
      <FooterExact />

      {/* 10. FLOATING WHATSAPP BUTTON WITH RADAR PING */}
      <FloatingWhatsApp />

      {/* 11. FLOATING 3D CIVIL ENGINEER GUIDE (TAMIL & ENGLISH CONTEXTUAL ASSISTANT) */}
      <FloatingEngineerAssistant onOpenQuote={() => handleOpenQuoteWithTier()} />

      {/* 12. MOBILE STICKY BOTTOM ACTION BAR */}
      <MobileBottomBar onOpenQuote={() => handleOpenQuoteWithTier()} />

      {/* 13. INTERACTIVE MODALS */}
      <StageExplorerModal
        isOpen={isExplorerModalOpen}
        onClose={() => setIsExplorerModalOpen(false)}
        stages={activeStages}
        initialStageIdx={explorerInitialIdx}
        onSelectAndApplyToHero={handleSelectStage}
      />

      <QuoteModal
        isOpen={isQuoteModalOpen}
        onClose={() => setIsQuoteModalOpen(false)}
        initialGrade={selectedPackageGrade}
      />

      {/* 14. REALISTIC 3D CIVIL ENGINEER WELCOMING MODAL */}
      <EngineerWelcomeModal
        isOpen={isWelcomeModalOpen}
        onClose={() => setIsWelcomeModalOpen(false)}
        onExploreProjects={() => {
          const el = document.getElementById("projects");
          if (el) el.scrollIntoView({ behavior: "smooth" });
          else window.location.href = "/projects";
        }}
        onStartDreamHome={() => handleOpenQuoteWithTier("premium")}
      />
    </div>
  );
}
