"use client";

import React, { useState, useEffect } from "react";
import { HeroConfig } from "@/types/hero";
import NavbarExact from "@/components/exact/NavbarExact";
import HeroExact from "@/components/exact/HeroExact";
import ServicesExact from "@/components/exact/ServicesExact";
import ProjectsExact from "@/components/exact/ProjectsExact";
import ProcessTestimonialsExact from "@/components/exact/ProcessTestimonialsExact";
import FooterExact from "@/components/exact/FooterExact";
import BeforeAfterSlider from "@/components/hero/BeforeAfterSlider";
import EstimatorSection from "@/components/sections/EstimatorSection";
import EngineeringPillars from "@/components/sections/EngineeringPillars";
import StageExplorerModal from "@/components/stages/StageExplorerModal";
import QuoteModal from "@/components/quote/QuoteModal";

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
  const [isExplorerModalOpen, setIsExplorerModalOpen] = useState<boolean>(false);
  const [explorerInitialIdx, setExplorerInitialIdx] = useState<number>(0);

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

  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col font-sans selection:bg-[#DC2626]/20 selection:text-[#DC2626]">
      {/* 1. EXACT WHITE NAVBAR */}
      <NavbarExact onOpenQuote={() => setIsQuoteModalOpen(true)} />

      {/* 2. EXACT 3-COLUMN HERO SECTION (WITH 12-STAGE TIMELAPSE IN CENTER FRAME) */}
      <main className="flex-grow">
        <HeroExact
          stages={activeStages}
          currentStageIndex={currentStageIndex}
          onSelectStage={handleSelectStage}
          isPlaying={isPlaying}
          onTogglePlay={handleTogglePlay}
          progressPercent={progressPercent}
          onOpenQuote={() => setIsQuoteModalOpen(true)}
          onOpenExplorer={handleOpenExplorer}
        />

        {/* 3. EXACT SERVICES SECTION */}
        <ServicesExact onOpenQuote={() => setIsQuoteModalOpen(true)} />

        {/* 4. EXACT DARK FEATURED PROJECTS SECTION */}
        <ProjectsExact onOpenQuote={() => setIsQuoteModalOpen(true)} />

        {/* 5. EXACT HOW IT WORKS & TESTIMONIALS SECTION */}
        <ProcessTestimonialsExact />

        {/* 6. INTERACTIVE BEFORE & AFTER SLIDER (STAGE 01 EMPTY LAND VS STAGE 12 COMPLETED HOME) */}
        <div className="border-t border-gray-100">
          <BeforeAfterSlider />
        </div>

        {/* 7. INTERACTIVE TURNKEY COST ESTIMATOR */}
        <EstimatorSection onOpenQuote={() => setIsQuoteModalOpen(true)} />

        {/* 8. ENGINEERING RIGOR & QUALITY ASSURANCE */}
        <EngineeringPillars />
      </main>

      {/* 9. EXACT DARK FOOTER */}
      <FooterExact />

      {/* 10. INTERACTIVE MODALS */}
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
    </div>
  );
}
