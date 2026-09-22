"use client";

import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { ConstructionStage } from "@/types/hero";
import BlueprintCanvas from "./BlueprintCanvas";
import { ArrowDown, HardHat, CheckCircle2, Ruler, Sparkles } from "lucide-react";

interface ScrollTimelapseSectionProps {
  stages: ConstructionStage[];
  onOpenQuote: () => void;
  onOpenExplorer: (stageIdx: number) => void;
}

export default function ScrollTimelapseSection({
  stages,
  onOpenQuote,
  onOpenExplorer,
}: ScrollTimelapseSectionProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const [activeStageIdx, setActiveStageIdx] = useState<number>(0);
  const [fractionalProgress, setFractionalProgress] = useState<number>(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const totalScrollableDistance = rect.height - window.innerHeight;

      if (totalScrollableDistance <= 0) return;

      // Calculate how far the top of the container has scrolled past the top of the viewport
      const scrolled = -rect.top;
      const progress = Math.max(0, Math.min(1, scrolled / totalScrollableDistance));
      setScrollProgress(progress);

      // Map progress to stages (0 to stages.length - 1)
      const rawIdx = progress * (stages.length - 1);
      const stageIdx = Math.min(stages.length - 1, Math.floor(rawIdx));
      setActiveStageIdx(stageIdx);
      setFractionalProgress(rawIdx - stageIdx);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [stages.length]);

  const currentStage = stages[activeStageIdx] || stages[0];
  const nextStage = stages[Math.min(stages.length - 1, activeStageIdx + 1)] || stages[0];
  const isFinalStage = activeStageIdx === stages.length - 1 && scrollProgress > 0.92;

  return (
    <section
      id="scroll-timelapse"
      ref={containerRef}
      className="relative w-full h-[500vh] bg-[#04070E]"
    >
      {/* Sticky Fullscreen Cinematic Viewport */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-between">
        {/* Background Stage Image Layers with Cross-Fade */}
        <div className="absolute inset-0 h-full w-full">
          {/* Current Stage */}
          <div className="absolute inset-0 h-full w-full">
            <Image
              src={currentStage.desktopMediaUrl}
              alt={currentStage.name}
              fill
              priority
              sizes="100vw"
              className="object-cover object-center transform scale-105 transition-transform duration-700"
            />
          </div>

          {/* Next Stage fading in as user scrolls through fractional step */}
          {activeStageIdx < stages.length - 1 && (
            <div
              className="absolute inset-0 h-full w-full pointer-events-none transition-opacity duration-150"
              style={{ opacity: Math.pow(fractionalProgress, 1.2) }}
            >
              <Image
                src={nextStage.desktopMediaUrl}
                alt={nextStage.name}
                fill
                sizes="100vw"
                className="object-cover object-center transform scale-105"
              />
            </div>
          )}
        </div>

        {/* Blueprint & Atmospheric Particles */}
        <BlueprintCanvas currentStageNumber={currentStage.id} />

        {/* Cinematic Vignette and Dark Gradients */}
        <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-t from-[#060a12] via-[#060a12]/50 to-[#060a12]/80" />

        {/* Top Scroll Indicator & HUD */}
        <div className="relative z-20 w-full max-w-7xl mx-auto px-6 pt-6 flex items-center justify-between">
          <div className="glass-panel px-4 py-2 rounded-xl flex items-center space-x-2 border border-slate-700/60">
            <HardHat className="h-4 w-4 text-yellow-500" />
            <span className="text-xs font-mono tracking-widest text-slate-300 uppercase">
              Scroll Storytelling Engine
            </span>
            <span className="text-xs font-mono text-yellow-400 font-bold">
              {Math.round(scrollProgress * 100)}%
            </span>
          </div>

          {/* Right: Technical Blueprint Specs Snippet */}
          {currentStage.blueprintSpecs && (
            <div className="hidden md:flex items-center space-x-4 glass-panel px-4 py-2 rounded-xl text-xs font-mono text-slate-300 border border-slate-700/60">
              <span className="text-sky-400 font-semibold flex items-center space-x-1">
                <Ruler className="h-3.5 w-3.5 mr-1" />
                {Object.keys(currentStage.blueprintSpecs)[0]}:
              </span>
              <span className="text-slate-200">
                {Object.values(currentStage.blueprintSpecs)[0]}
              </span>
            </div>
          )}
        </div>

        {/* Center Stage Narrative Overlay */}
        <div className="relative z-20 w-full max-w-5xl mx-auto px-6 py-6 text-center md:text-left flex flex-col items-center md:items-start">
          {/* Milestone Badge */}
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full glass-panel-gold border border-yellow-500/30 text-yellow-400 text-xs font-mono tracking-widest uppercase mb-3 shadow-lg">
            <span className="h-2 w-2 rounded-full bg-yellow-400 animate-ping" />
            <span className="font-bold">STAGE {currentStage.stageNumber} OF 12</span>
            <span className="text-slate-500">•</span>
            <span className="text-slate-200">{currentStage.name}</span>
          </div>

          {isFinalStage ? (
            <div className="animate-in fade-in zoom-in-95 duration-500">
              <h2 className="text-4xl sm:text-6xl font-black uppercase text-white font-serif tracking-tight drop-shadow-2xl">
                YOUR VISION. <br />
                <span className="text-gold-gradient">OUR CRAFT.</span>
              </h2>
              <p className="mt-3 text-lg sm:text-xl font-bold tracking-wider text-slate-200 uppercase font-mono">
                JANCY BUILDERS — BUILD THE WORLD
              </p>
              <div className="mt-6 flex flex-wrap gap-4">
                <button
                  onClick={onOpenQuote}
                  className="px-6 py-3 rounded-xl bg-yellow-500 hover:bg-yellow-400 text-slate-950 font-bold text-sm tracking-wider uppercase transition-all shadow-xl shadow-yellow-500/30"
                >
                  Start Your Project
                </button>
                <a
                  href="#projects"
                  className="px-6 py-3 rounded-xl glass-panel text-white hover:border-yellow-500/50 font-bold text-sm tracking-wider uppercase transition-all"
                >
                  Explore Portfolio
                </a>
              </div>
            </div>
          ) : (
            <div>
              <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight drop-shadow-xl max-w-3xl leading-tight">
                "{currentStage.title}"
              </h2>
              <p className="mt-3 max-w-2xl text-xs sm:text-base text-slate-300 leading-relaxed drop-shadow">
                {currentStage.description}
              </p>
              <div className="mt-5 flex items-center space-x-3">
                <button
                  onClick={() => onOpenExplorer(activeStageIdx)}
                  className="px-3.5 py-1.5 rounded-lg bg-slate-900/80 hover:bg-slate-800 text-yellow-400 border border-yellow-500/30 text-xs font-mono tracking-wider transition-all"
                >
                  Inspect Specifications & Blueprints ↗
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Bottom Horizontal Interactive Scrubber */}
        <div className="relative z-20 w-full max-w-5xl mx-auto px-6 pb-6">
          <div className="glass-panel p-3.5 rounded-2xl border border-slate-700/60 shadow-2xl">
            {/* Scroll instruction indicator */}
            <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 mb-2">
              <span className="flex items-center space-x-1.5 text-yellow-400 font-semibold">
                <ArrowDown className="h-3.5 w-3.5 animate-bounce" />
                <span>SCROLL DOWN TO ADVANCE TIMELAPSE</span>
              </span>
              <span>
                STAGE: <strong className="text-white">{currentStage.name}</strong>
              </span>
            </div>

            {/* Continuous Track */}
            <div className="relative h-2 w-full bg-slate-800 rounded-full overflow-hidden">
              <div
                className="absolute left-0 top-0 bottom-0 bg-gradient-to-r from-sky-400 via-yellow-400 to-amber-500 rounded-full transition-all duration-75"
                style={{ width: `${scrollProgress * 100}%` }}
              />
            </div>

            {/* Stage Grid Marks */}
            <div className="flex justify-between items-center mt-2 text-[10px] font-mono text-slate-500">
              {stages.map((stg, i) => (
                <span
                  key={stg.id}
                  className={`transition-colors ${
                    i === activeStageIdx ? "text-yellow-400 font-bold" : i < activeStageIdx ? "text-slate-400" : ""
                  }`}
                >
                  {stg.stageNumber}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
