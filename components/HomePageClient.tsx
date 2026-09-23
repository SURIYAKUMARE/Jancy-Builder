"use client";

import React, { useState, useEffect } from "react";
import { HeroConfig } from "@/types/hero";
import HeroTimelapse from "@/components/hero/HeroTimelapse";
import HeroOverlay from "@/components/hero/HeroOverlay";
import ProgressIndicator from "@/components/hero/ProgressIndicator";
import ScrollTimelapseSection from "@/components/hero/ScrollTimelapseSection";
import StageFilmstripSection from "@/components/sections/StageFilmstripSection";
import StageExplorerModal from "@/components/stages/StageExplorerModal";
import QuoteModal from "@/components/quote/QuoteModal";
import ProjectsSection from "@/components/sections/ProjectsSection";
import EstimatorSection from "@/components/sections/EstimatorSection";
import EngineeringPillars from "@/components/sections/EngineeringPillars";
import Footer from "@/components/sections/Footer";

interface HomePageClientProps {
  initialConfig: HeroConfig;
}

export default function HomePageClient({ initialConfig }: HomePageClientProps) {
  const [config, setConfig] = useState<HeroConfig>(initialConfig);
  const [currentStageIndex, setCurrentStageIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(initialConfig.settings.autoplay);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [progressPercent, setProgressPercent] = useState<number>(0);
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState<boolean>(false);
  const [isExplorerModalOpen, setIsExplorerModalOpen] = useState<boolean>(false);
  const [explorerInitialIdx, setExplorerInitialIdx] = useState<number>(0);
  const [isScrollModeActive, setIsScrollModeActive] = useState<boolean>(false);
  const [isBlueprintMode, setIsBlueprintMode] = useState<boolean>(false);

  const activeStages = config.stages.filter((s) => s.active);
  const currentStage = activeStages[currentStageIndex] || activeStages[0];

  // Fetch latest config from API on mount
  useEffect(() => {
    fetch("/api/hero")
      .then((res) => res.json())
      .then((data) => {
        if (data?.stages?.length) {
          setConfig(data);
          setIsPlaying(data.settings.autoplay);
        }
      })
      .catch((err) => console.log("Using initial static config:", err));
  }, []);

  // Timer loop for autoplay timelapse
  useEffect(() => {
    if (!isPlaying || isHovered || activeStages.length === 0) return;

    const stageDurationSeconds = currentStage?.duration || config.settings.defaultDuration || 5;
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
  }, [isPlaying, isHovered, currentStageIndex, currentStage, activeStages.length, config.settings.defaultDuration]);

  // Stage navigation handlers
  const handleSelectStage = (idx: number) => {
    setCurrentStageIndex(idx);
    setProgressPercent(0);
  };

  const handlePrevStage = () => {
    setCurrentStageIndex((prev) => (prev - 1 + activeStages.length) % activeStages.length);
    setProgressPercent(0);
  };

  const handleNextStage = () => {
    setCurrentStageIndex((prev) => (prev + 1) % activeStages.length);
    setProgressPercent(0);
  };

  const handleTogglePlay = () => {
    setIsPlaying((prev) => !prev);
  };

  const handleOpenExplorer = (stageIdx: number = currentStageIndex) => {
    setExplorerInitialIdx(stageIdx);
    setIsExplorerModalOpen(true);
  };

  const handleToggleScrollMode = () => {
    setIsScrollModeActive((prev) => !prev);
    const scrollElem = document.getElementById("scroll-timelapse");
    if (scrollElem) {
      scrollElem.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleSelectAndJumpToHero = (index: number) => {
    handleSelectStage(index);
    const heroElem = document.getElementById("timelapse");
    if (heroElem) {
      heroElem.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <main className="relative min-h-screen bg-[#05080E] text-slate-100 selection:bg-red-600/30 selection:text-white">
      {/* 1. HERO SECTION: CINEMATIC CONSTRUCTION TIMELAPSE */}
      <section
        id="timelapse"
        className="relative h-screen w-full overflow-hidden flex flex-col justify-between"
        onMouseEnter={() => {
          if (config.settings.pauseOnHover) setIsHovered(true);
        }}
        onMouseLeave={() => {
          if (config.settings.pauseOnHover) setIsHovered(false);
        }}
      >
        {/* Background Visual Engine (Video / Photographic Sequence / Blueprint Fallback) */}
        <div className="absolute inset-0 z-0 h-full w-full">
          <HeroTimelapse
            stages={activeStages}
            settings={config.settings}
            currentStageIndex={currentStageIndex}
            onStageChange={handleSelectStage}
            isPlaying={isPlaying && !isHovered}
            onTogglePlay={handleTogglePlay}
            progressPercent={progressPercent}
            preferVideo={config.settings.fallbackMode === "video"}
            isBlueprintMode={isBlueprintMode}
          />
        </div>

        {/* Foreground Content & Navigation HUD */}
        <HeroOverlay
          hero={config.hero}
          currentStage={currentStage}
          onOpenQuote={() => setIsQuoteModalOpen(true)}
          onOpenExplorer={() => handleOpenExplorer(currentStageIndex)}
          isBlueprintMode={isBlueprintMode}
          onToggleBlueprintMode={() => setIsBlueprintMode((prev) => !prev)}
        />

        {/* Bottom Floating Island Glass Capsule Progress Dock */}
        <ProgressIndicator
          stages={activeStages}
          currentStageIndex={currentStageIndex}
          onSelectStage={handleSelectStage}
          onPrevStage={handlePrevStage}
          onNextStage={handleNextStage}
          isPlaying={isPlaying}
          onTogglePlay={handleTogglePlay}
          onOpenExplorer={() => handleOpenExplorer(currentStageIndex)}
          progressPercent={progressPercent}
          isScrollMode={isScrollModeActive}
          onToggleScrollMode={handleToggleScrollMode}
        />
      </section>

      {/* 2. THE 12-STAGE ARCHITECTURAL FILMSTRIP SECTION */}
      <StageFilmstripSection
        stages={activeStages}
        onSelectAndJumpToHero={handleSelectAndJumpToHero}
        onOpenExplorer={(idx) => handleOpenExplorer(idx)}
      />

      {/* 3. SCROLL-BASED CINEMATIC TIMELAPSE SECTION */}
      {config.settings.scrollAnimation && (
        <ScrollTimelapseSection
          stages={activeStages}
          onOpenQuote={() => setIsQuoteModalOpen(true)}
          onOpenExplorer={(idx) => handleOpenExplorer(idx)}
        />
      )}

      {/* 4. FEATURED ARCHITECTURAL MASTERPIECES */}
      <ProjectsSection onOpenQuote={() => setIsQuoteModalOpen(true)} />

      {/* 5. INTERACTIVE TURNKEY COST ESTIMATOR 2.0 */}
      <EstimatorSection onOpenQuote={() => setIsQuoteModalOpen(true)} />

      {/* 6. ENGINEERING RIGOR & QUALITY ASSURANCE */}
      <EngineeringPillars />

      {/* 7. MONUMENTAL LUXURY FOOTER & CREDENTIALS */}
      <Footer onOpenQuote={() => setIsQuoteModalOpen(true)} />

      {/* 8. MODALS */}
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
      />
    </main>
  );
}
