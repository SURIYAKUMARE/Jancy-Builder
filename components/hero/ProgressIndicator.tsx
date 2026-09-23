"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ConstructionStage } from "@/types/hero";
import { Play, Pause, ChevronLeft, ChevronRight, Layers, Sliders, Gauge } from "lucide-react";

interface ProgressIndicatorProps {
  stages: ConstructionStage[];
  currentStageIndex: number;
  onSelectStage: (index: number) => void;
  onPrevStage: () => void;
  onNextStage: () => void;
  isPlaying: boolean;
  onTogglePlay: () => void;
  onOpenExplorer: () => void;
  progressPercent: number;
  isScrollMode?: boolean;
  onToggleScrollMode?: () => void;
  playbackSpeed?: number;
  onChangeSpeed?: (speed: number) => void;
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
  playbackSpeed = 1,
  onChangeSpeed,
}: ProgressIndicatorProps) {
  const [hoveredStageIdx, setHoveredStageIdx] = useState<number | null>(null);

  const currentStage = stages[currentStageIndex] || stages[0];

  const radius = 18;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progressPercent / 100) * circumference;

  const speeds = [0.5, 1, 2];

  return (
    <div className="relative z-30 w-full max-w-5xl mx-auto px-4 pb-6">
      {/* Floating Island Glass Capsule */}
      <div className="glass-pill rounded-2xl p-3 sm:p-4 shadow-2xl border border-white/10 backdrop-blur-2xl">
        <div className="flex flex-col md:flex-row items-center justify-between gap-3">
          {/* Left: Playback Controls & Circular Telemetry Dial */}
          <div className="flex items-center space-x-3 w-full md:w-auto justify-between md:justify-start">
            <div className="flex items-center space-x-1.5">
              <button
                onClick={onPrevStage}
                className="p-2 rounded-xl bg-slate-900/80 hover:bg-red-600 hover:text-white text-slate-400 transition-all active:scale-95 border border-white/5"
                title="Previous Stage"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>

              <button
                onClick={onTogglePlay}
                className="relative p-2.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-white transition-all active:scale-95 border border-white/10 group"
                title={isPlaying ? "Pause Construction Timelapse" : "Play Construction Timelapse"}
              >
                <svg className="absolute inset-0 h-full w-full -rotate-90 pointer-events-none p-0.5" viewBox="0 0 44 44">
                  <circle
                    cx="22"
                    cy="22"
                    r={radius}
                    className="stroke-slate-800"
                    strokeWidth="2.5"
                    fill="none"
                  />
                  <circle
                    cx="22"
                    cy="22"
                    r={radius}
                    className="stroke-red-500 transition-all duration-100"
                    strokeWidth="2.5"
                    strokeDasharray={circumference}
                    strokeDashoffset={strokeDashoffset}
                    strokeLinecap="round"
                    fill="none"
                  />
                </svg>

                <div className="relative z-10">
                  {isPlaying ? (
                    <Pause className="h-4 w-4 fill-red-500 text-red-500" />
                  ) : (
                    <Play className="h-4 w-4 fill-sky-400 text-sky-400" />
                  )}
                </div>
              </button>

              <button
                onClick={onNextStage}
                className="p-2 rounded-xl bg-slate-900/80 hover:bg-red-600 hover:text-white text-slate-400 transition-all active:scale-95 border border-white/5"
                title="Next Stage"
              >
                <ChevronRight className="h-4 w-4" />
              </button>

              {/* Speed Toggles */}
              {onChangeSpeed && (
                <div className="hidden sm:flex items-center space-x-1 pl-1">
                  {speeds.map((s) => (
                    <button
                      key={s}
                      onClick={() => onChangeSpeed(s)}
                      className={`px-1.5 py-0.5 rounded text-[10px] font-mono transition-colors ${
                        playbackSpeed === s
                          ? "bg-red-600 text-white font-bold"
                          : "text-slate-500 hover:text-slate-300"
                      }`}
                    >
                      {s}x
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Current Stage Display */}
            <div className="flex items-center space-x-2 pl-2 border-l border-white/10 font-mono">
              <span className="text-xs text-red-500 font-bold tracking-wider">
                {currentStage?.stageNumber}/12
              </span>
              <span className="text-xs text-slate-200 font-semibold truncate max-w-[120px] sm:max-w-[170px]">
                {currentStage?.name}
              </span>
            </div>
          </div>

          {/* Center: Stage Milestone Track Dots */}
          <div className="flex-1 w-full md:px-6">
            <div className="relative flex justify-between items-center py-1">
              <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-1 bg-slate-800/80 rounded-full" />
              <div
                className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-gradient-to-r from-red-600 via-sky-400 to-amber-400 rounded-full transition-all duration-300"
                style={{
                  width: `${((currentStageIndex + progressPercent / 100) / stages.length) * 100}%`,
                }}
              />

              {stages.map((stage, idx) => {
                const isActive = idx === currentStageIndex;
                const isPast = idx < currentStageIndex;

                return (
                  <div
                    key={stage.id || idx}
                    className="relative flex flex-col items-center group cursor-pointer z-10"
                    onClick={() => onSelectStage(idx)}
                    onMouseEnter={() => setHoveredStageIdx(idx)}
                    onMouseLeave={() => setHoveredStageIdx(null)}
                  >
                    <div
                      className={`rounded-full transition-all duration-300 flex items-center justify-center ${
                        isActive
                          ? "h-5 w-5 bg-red-600 ring-4 ring-red-500/30 shadow-[0_0_12px_rgba(229,9,20,0.8)]"
                          : isPast
                          ? "h-3 w-3 bg-sky-400 hover:scale-125"
                          : "h-2.5 w-2.5 bg-slate-700 hover:bg-slate-500 hover:scale-125"
                      }`}
                    >
                      {isActive && <div className="h-1.5 w-1.5 rounded-full bg-white animate-pulse" />}
                    </div>

                    {hoveredStageIdx === idx && (
                      <div className="absolute bottom-9 -left-20 z-50 w-48 rounded-xl overflow-hidden glass-hud p-2.5 pointer-events-none shadow-2xl border border-red-500/30 animate-in fade-in zoom-in-95 duration-200">
                        <div className="relative h-24 w-full rounded-lg overflow-hidden mb-2 bg-slate-900">
                          <Image
                            src={stage.desktopMediaUrl}
                            alt={stage.name}
                            fill
                            className="object-cover"
                          />
                          <div className="absolute top-1.5 left-1.5 bg-slate-950/80 px-2 py-0.5 rounded text-[9px] font-mono text-red-400 font-bold">
                            STAGE {stage.stageNumber}
                          </div>
                        </div>
                        <p className="text-xs font-bold text-white truncate">{stage.name}</p>
                        <p className="text-[10px] text-slate-400 line-clamp-1 leading-tight">{stage.title}</p>
                        <div className="mt-1 flex items-center justify-between text-[9px] font-mono text-sky-400">
                          <span>{stage.milestone}</span>
                          <span>{stage.duration}s</span>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            <div className="flex justify-between items-center text-[9px] font-mono text-slate-400 tracking-wider pt-1">
              <span className={currentStageIndex >= 0 ? "text-red-400 font-bold" : ""}>01 LAND</span>
              <span className={currentStageIndex >= 2 ? "text-sky-400 font-bold" : ""}>03 FOUNDATION</span>
              <span className={currentStageIndex >= 4 ? "text-slate-200 font-bold" : ""}>05 STRUCTURE</span>
              <span className={currentStageIndex >= 5 ? "text-red-400 font-bold" : ""}>06 WALLS</span>
              <span className={currentStageIndex >= 8 ? "text-sky-400 font-bold" : ""}>09 INTERIOR</span>
              <span className={currentStageIndex >= 11 ? "text-amber-400 font-bold" : ""}>12 FINISHED</span>
            </div>
          </div>

          {/* Right: Actions */}
          <div className="hidden lg:flex items-center space-x-2">
            {onToggleScrollMode && (
              <button
                onClick={onToggleScrollMode}
                className={`px-3 py-1.5 rounded-xl text-xs font-mono border transition-all flex items-center space-x-1.5 ${
                  isScrollMode
                    ? "bg-red-500/20 border-red-500 text-red-300"
                    : "bg-slate-900/60 border-white/10 text-slate-400 hover:text-white"
                }`}
                title="Toggle Scroll-Driven Storytelling"
              >
                <Sliders className="h-3.5 w-3.5" />
                <span>SCROLL MODE</span>
              </button>
            )}

            <button
              onClick={onOpenExplorer}
              className="px-3.5 py-1.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 border border-sky-500/30 text-sky-400 hover:text-sky-300 font-mono text-xs flex items-center space-x-1.5 transition-all shadow-sm active:scale-95"
            >
              <Layers className="h-3.5 w-3.5" />
              <span>EXPLORE ALL 12</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
