"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { ConstructionStage } from "@/types/hero";
import { Play, Pause, ChevronLeft, ChevronRight, ArrowUp, X, Video } from "lucide-react";

interface StickyMiniPlayerProps {
  stages: ConstructionStage[];
  currentStageIndex: number;
  onSelectStage: (index: number) => void;
  isPlaying: boolean;
  onTogglePlay: () => void;
  onScrollToHero: () => void;
}

export default function StickyMiniPlayer({
  stages,
  currentStageIndex,
  onSelectStage,
  isPlaying,
  onTogglePlay,
  onScrollToHero,
}: StickyMiniPlayerProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show when scrolled down past 600px
      if (window.scrollY > 600) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!isVisible || isDismissed) return null;

  const currentStage = stages[currentStageIndex] || stages[0];

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    onSelectStage((currentStageIndex - 1 + stages.length) % stages.length);
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    onSelectStage((currentStageIndex + 1) % stages.length);
  };

  return (
    <aside aria-label="Floating Construction Progress Mini-Player" className="fixed bottom-6 right-6 z-40 animate-in fade-in slide-in-from-bottom-5 duration-300">
      <div className="glass-card-premium rounded-2xl p-2.5 border border-red-500/30 shadow-2xl bg-[#070B14]/95 backdrop-blur-2xl flex items-center space-x-3 w-80">
        {/* Clickable mini thumbnail that jumps to hero */}
        <div
          onClick={onScrollToHero}
          className="relative h-14 w-20 rounded-xl overflow-hidden bg-slate-900 border border-white/10 flex-shrink-0 cursor-pointer group"
          title="Click to view full cinematic hero"
        >
          <Image
            src={currentStage.desktopMediaUrl}
            alt={currentStage.name}
            fill
            className="object-cover group-hover:scale-110 transition-transform"
          />
          <div className="absolute inset-0 bg-black/40 group-hover:bg-black/10 transition-colors flex items-center justify-center">
            <ArrowUp className="h-4 w-4 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
          <div className="absolute bottom-1 left-1 bg-black/80 px-1.5 py-0.5 rounded text-[8px] font-mono text-red-400 font-bold">
            {currentStage.stageNumber}
          </div>
        </div>

        {/* Info & Controls */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono font-bold text-red-400">
              STAGE {currentStage.stageNumber}/12
            </span>
            <button
              onClick={() => setIsDismissed(true)}
              className="text-slate-500 hover:text-white p-0.5"
              title="Minimize"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </div>
          <p className="text-xs font-bold text-white truncate">{currentStage.name}</p>

          {/* Mini Playback Bar */}
          <div className="flex items-center space-x-2 mt-1">
            <button
              onClick={handlePrev}
              className="p-1 rounded bg-slate-900 hover:bg-red-600 text-slate-300 hover:text-white transition-colors"
            >
              <ChevronLeft className="h-3 w-3" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onTogglePlay();
              }}
              className="px-2 py-0.5 rounded bg-red-600 hover:bg-red-500 text-white font-mono text-[10px] font-bold flex items-center space-x-1"
            >
              {isPlaying ? (
                <>
                  <Pause className="h-2.5 w-2.5 fill-current" />
                  <span>PAUSE</span>
                </>
              ) : (
                <>
                  <Play className="h-2.5 w-2.5 fill-current" />
                  <span>PLAY</span>
                </>
              )}
            </button>
            <button
              onClick={handleNext}
              className="p-1 rounded bg-slate-900 hover:bg-red-600 text-slate-300 hover:text-white transition-colors"
            >
              <ChevronRight className="h-3 w-3" />
            </button>
            <button
              onClick={onScrollToHero}
              className="ml-auto text-[9px] font-mono text-sky-400 hover:text-sky-300 underline"
            >
              TOP ↑
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
}
