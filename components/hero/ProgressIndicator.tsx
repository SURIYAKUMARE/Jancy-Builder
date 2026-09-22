"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ConstructionStage } from "@/types/hero";
import { Play, Pause, ChevronLeft, ChevronRight, Layers, Sliders } from "lucide-react";

interface ProgressIndicatorProps {
  stages: ConstructionStage[];
  currentStageIndex: number;
  onSelectStage: (index: number) => void;
  onPrevStage: () => void;
  onNextStage: () => void;
  isPlaying: boolean;
  onTogglePlay: () => void;
  onOpenExplorer: () => void;
  progressPercent: number; // 0 to 100 within current stage
  isScrollMode?: boolean;
  onToggleScrollMode?: () => void;
}

export default function ProgressIndicator({
  stages,
  currentStageIndex,
  onSelectStage,
  onPrevStage,
  onNextStage,
  isPlaying,
  onTogglePlay,
  onOpenExplorer,
  progressPercent,
  isScrollMode = false,
  onToggleScrollMode,
}: ProgressIndicatorProps) {
  const [hoveredStageIdx, setHoveredStageIdx] = useState<number | null>(null);
  const [isDetailedView, setIsDetailedView] = useState<boolean>(true);

  // Milestone mapping (for compact view)
  const milestones = [
    { label: "FOUNDATION", stageIdx: 2, number: "01" },
    { label: "STRUCTURE", stageIdx: 4, number: "02" },
    { label: "WALLS", stageIdx: 5, number: "03" },
    { label: "FINISHING", stageIdx: 9, number: "04" },
    { label: "COMPLETED", stageIdx: 11, number: "05" },
  ];

  return (
    <div className="relative z-30 w-full max-w-5xl mx-auto px-4 pb-6">
      {/* Control Bar & Stage Selector Container */}
      <div className="glass-panel rounded-2xl p-4 md:p-5 shadow-2xl border border-slate-700/50 backdrop-blur-xl">
        {/* Top Controls Row */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-800">
          {/* Left: Playback & Step Controls */}
          <div className="flex items-center space-x-2">
            <button
              onClick={onPrevStage}
              className="p-2 rounded-xl bg-slate-800/80 hover:bg-yellow-500 hover:text-slate-950 text-slate-300 transition-all shadow-sm active:scale-95"
              title="Previous Construction Stage"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              onClick={onTogglePlay}
              className="px-3.5 py-2 rounded-xl bg-yellow-500 hover:bg-yellow-400 text-slate-950 font-bold text-xs flex items-center space-x-1.5 transition-all shadow-lg shadow-yellow-500/20 active:scale-95"
              title={isPlaying ? "Pause Construction Timelapse" : "Play Construction Timelapse"}
            >
              {isPlaying ? (
                <>
                  <Pause className="h-3.5 w-3.5 fill-current" />
                  <span>PAUSE</span>
                </>
              ) : (
                <>
                  <Play className="h-3.5 w-3.5 fill-current" />
                  <span>PLAY</span>
                </>
              )}
            </button>
            <button
              onClick={onNextStage}
              className="p-2 rounded-xl bg-slate-800/80 hover:bg-yellow-500 hover:text-slate-950 text-slate-300 transition-all shadow-sm active:scale-95"
              title="Next Construction Stage"
            >
              <ChevronRight className="h-4 w-4" />
            </button>

            {/* Current Stage Badge */}
            <div className="hidden sm:flex items-center pl-3 space-x-2 border-l border-slate-800">
              <span className="text-[11px] font-mono tracking-wider text-yellow-500 font-semibold">
                STAGE {stages[currentStageIndex]?.stageNumber || "01"}/12
              </span>
              <span className="text-slate-400 text-xs font-medium truncate max-w-[160px]">
                {stages[currentStageIndex]?.name}
              </span>
            </div>
          </div>

          {/* Right: View Toggles & Explorer Trigger */}
          <div className="flex items-center space-x-2">
            {onToggleScrollMode && (
              <button
                onClick={onToggleScrollMode}
                className={`px-3 py-1.5 rounded-xl text-xs font-medium border transition-all flex items-center space-x-1.5 ${
                  isScrollMode
                    ? "bg-sky-500/20 border-sky-400/50 text-sky-300"
                    : "bg-slate-800/60 border-slate-700/60 text-slate-400 hover:text-slate-200"
                }`}
                title="Toggle Scroll-Driven Storytelling"
              >
                <Sliders className="h-3.5 w-3.5" />
                <span className="hidden md:inline">{isScrollMode ? "Scroll Mode On" : "Scroll Mode"}</span>
              </button>
            )}

            <button
              onClick={onOpenExplorer}
              className="px-3.5 py-1.5 rounded-xl bg-slate-800/90 hover:bg-slate-700 border border-slate-600/60 text-yellow-400 hover:text-yellow-300 font-medium text-xs flex items-center space-x-1.5 transition-all shadow-sm active:scale-95"
            >
              <Layers className="h-3.5 w-3.5" />
              <span>Explore Process</span>
            </button>
          </div>
        </div>

        {/* Timeline Track */}
        <div className="pt-4 relative">
          {/* Progress bar track line */}
          <div className="relative h-1.5 w-full bg-slate-800/80 rounded-full overflow-hidden">
            <div
              className="absolute left-0 top-0 bottom-0 bg-gradient-to-r from-sky-400 via-yellow-400 to-yellow-500 transition-all duration-300 rounded-full shadow-[0_0_12px_rgba(234,179,8,0.5)]"
              style={{
                width: `${((currentStageIndex + progressPercent / 100) / stages.length) * 100}%`,
              }}
            />
          </div>

          {/* 12 Individual Stage Dots with Thumbnails and Labels */}
          <div className="flex justify-between items-center mt-3 relative">
            {stages.map((stage, idx) => {
              const isActive = idx === currentStageIndex;
              const isPast = idx < currentStageIndex;

              return (
                <div
                  key={stage.id || idx}
                  className="relative flex flex-col items-center group cursor-pointer"
                  onClick={() => onSelectStage(idx)}
                  onMouseEnter={() => setHoveredStageIdx(idx)}
                  onMouseLeave={() => setHoveredStageIdx(null)}
                >
                  {/* Dot Indicator */}
                  <div
                    className={`relative flex items-center justify-center rounded-full transition-all duration-300 ${
                      isActive
                        ? "h-5 w-5 bg-yellow-400 ring-4 ring-yellow-400/20 shadow-lg shadow-yellow-500/40"
                        : isPast
                        ? "h-3.5 w-3.5 bg-yellow-500/80 hover:scale-125"
                        : "h-3.5 w-3.5 bg-slate-700 hover:bg-slate-500 hover:scale-125"
                    }`}
                  >
                    {isActive && (
                      <div className="h-2 w-2 rounded-full bg-slate-950 animate-pulse" />
                    )}
                  </div>

                  {/* Stage Number Label */}
                  <span
                    className={`mt-1.5 text-[10px] font-mono tracking-tight transition-colors hidden sm:block ${
                      isActive
                        ? "text-yellow-400 font-bold scale-110"
                        : isPast
                        ? "text-slate-400"
                        : "text-slate-600 group-hover:text-slate-400"
                    }`}
                  >
                    {stage.stageNumber}
                  </span>

                  {/* Hover Preview Popover */}
                  {hoveredStageIdx === idx && (
                    <div className="absolute bottom-10 -left-16 z-50 w-44 rounded-xl overflow-hidden glass-panel-gold p-2 pointer-events-none shadow-2xl animate-in fade-in zoom-in-95 duration-200">
                      <div className="relative h-20 w-full rounded-lg overflow-hidden mb-2 bg-slate-900">
                        <Image
                          src={stage.desktopMediaUrl}
                          alt={stage.name}
                          fill
                          className="object-cover"
                        />
                        <div className="absolute top-1 left-1 bg-slate-950/80 backdrop-blur-sm px-1.5 py-0.5 rounded text-[9px] font-mono text-yellow-400 font-bold">
                          {stage.stageNumber}
                        </div>
                      </div>
                      <p className="text-[11px] font-bold text-slate-100 truncate">{stage.name}</p>
                      <p className="text-[9px] text-slate-400 line-clamp-1 leading-tight">{stage.title}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Compact Milestone Summary Bar (Desktop & Mobile Friendly) */}
          <div className="mt-3 flex items-center justify-between text-[10px] font-medium tracking-wider text-slate-400 border-t border-slate-800/80 pt-2 font-mono">
            <span className={currentStageIndex >= 0 ? "text-yellow-400 font-semibold" : ""}>
              ● 01 FOUNDATION
            </span>
            <span className="hidden sm:inline text-slate-600">────</span>
            <span className={currentStageIndex >= 4 ? "text-yellow-400 font-semibold" : ""}>
              02 STRUCTURE
            </span>
            <span className="hidden sm:inline text-slate-600">────</span>
            <span className={currentStageIndex >= 5 ? "text-yellow-400 font-semibold" : ""}>
              03 WALLS
            </span>
            <span className="hidden sm:inline text-slate-600">────</span>
            <span className={currentStageIndex >= 8 ? "text-yellow-400 font-semibold" : ""}>
              04 FINISHING
            </span>
            <span className="hidden sm:inline text-slate-600">────</span>
            <span className={currentStageIndex >= 11 ? "text-yellow-400 font-semibold" : ""}>
              05 COMPLETED
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
