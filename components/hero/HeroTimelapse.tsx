"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { ConstructionStage, HeroSettings } from "@/types/hero";
import BlueprintCanvas from "./BlueprintCanvas";

interface HeroTimelapseProps {
  stages: ConstructionStage[];
  settings: HeroSettings;
  currentStageIndex: number;
  onStageChange: (newIndex: number) => void;
  isPlaying: boolean;
  onTogglePlay: () => void;
  progressPercent: number;
  preferVideo?: boolean;
  isBlueprintMode?: boolean;
}

export default function HeroTimelapse({
  stages,
  settings,
  currentStageIndex,
  onStageChange,
  isPlaying,
  preferVideo = false,
  isBlueprintMode = false,
}: HeroTimelapseProps) {
  const [useVideo, setUseVideo] = useState(preferVideo && !!settings.desktopVideoUrl);
  const [videoError, setVideoError] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Preload adjacent images
  useEffect(() => {
    if (stages.length === 0) return;
    const nextIdx = (currentStageIndex + 1) % stages.length;
    const prevIdx = (currentStageIndex - 1 + stages.length) % stages.length;
    [nextIdx, prevIdx].forEach((idx) => {
      const url = isMobile ? stages[idx]?.mobileMediaUrl : stages[idx]?.desktopMediaUrl;
      if (url) {
        const img = new window.Image();
        img.src = url;
      }
    });
  }, [currentStageIndex, stages, isMobile]);

  useEffect(() => {
    if (!videoRef.current || !useVideo) return;
    if (isPlaying) {
      videoRef.current.play().catch(() => {
        setVideoError(true);
        setUseVideo(false);
      });
    } else {
      videoRef.current.pause();
    }
  }, [isPlaying, useVideo]);

  const handleVideoTimeUpdate = () => {
    if (!videoRef.current || !stages.length) return;
    const duration = videoRef.current.duration;
    const currentTime = videoRef.current.currentTime;
    if (duration > 0) {
      const progress = currentTime / duration;
      const stageIdx = Math.min(Math.floor(progress * stages.length), stages.length - 1);
      if (stageIdx !== currentStageIndex) {
        onStageChange(stageIdx);
      }
    }
  };

  const currentStage = stages[currentStageIndex] || stages[0];

  return (
    <div className="relative h-full w-full overflow-hidden bg-[#04070E]">
      {/* 1. Background Video Layer */}
      {useVideo && !videoError ? (
        <video
          ref={videoRef}
          className={`absolute inset-0 h-full w-full object-cover transition-all duration-1000 ${
            isBlueprintMode ? "filter saturate-50 contrast-125 brightness-75" : ""
          }`}
          src={isMobile && settings.mobileVideoUrl ? settings.mobileVideoUrl : settings.desktopVideoUrl}
          autoPlay
          muted
          loop
          playsInline
          onTimeUpdate={handleVideoTimeUpdate}
          onError={() => {
            setVideoError(true);
            setUseVideo(false);
          }}
          poster={currentStage?.desktopMediaUrl || "/images/stages/stage-01.jpg"}
        />
      ) : (
        /* 2. Photorealistic Multi-Layer Image Crossfade Sequence with Ken Burns Camera Motion */
        <div className="absolute inset-0 h-full w-full">
          {stages.map((stage, idx) => {
            const isActive = idx === currentStageIndex;
            const isNext = idx === (currentStageIndex + 1) % stages.length;
            const mediaUrl = isMobile && stage.mobileMediaUrl ? stage.mobileMediaUrl : stage.desktopMediaUrl;

            if (!isActive && !isNext) return null;

            return (
              <div
                key={stage.id || idx}
                className={`absolute inset-0 h-full w-full transition-opacity duration-1000 ease-in-out ${
                  isActive ? "opacity-100 z-1" : "opacity-0 z-0"
                } ${isBlueprintMode ? "filter saturate-50 contrast-125 brightness-75" : ""}`}
              >
                <div
                  className={`relative h-full w-full transform ${
                    isActive ? "scale-105 transition-transform duration-[7000ms] ease-out" : "scale-100"
                  }`}
                  style={{
                    transformOrigin: idx % 2 === 0 ? "center bottom" : "center top",
                  }}
                >
                  <Image
                    src={mediaUrl || "/images/stages/stage-01.jpg"}
                    alt={`${stage.name} - ${stage.title}`}
                    fill
                    priority={idx === 0 || isActive}
                    sizes="100vw"
                    className="object-cover object-center"
                  />
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* 3. Architectural Blueprint & Atmospheric Particle Canvas */}
      <BlueprintCanvas
        currentStageNumber={currentStage?.id || currentStageIndex + 1}
        isBlueprintMode={isBlueprintMode}
      />

      {/* 4. Luxury Vignette & Deep Obsidian Architectural Gradient Overlays */}
      <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-t from-[#05080E] via-transparent to-[#05080E]/70" />
      <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-r from-[#05080E]/80 via-transparent to-[#05080E]/40" />

      {/* 5. Minimalist Engine Mode Switcher in Bottom Right */}
      <div className="absolute top-24 right-6 z-30 hidden xl:flex items-center space-x-1.5 bg-[#080E1A]/80 backdrop-blur-md border border-white/10 rounded-full px-2.5 py-1 text-[11px] text-slate-300">
        <span className="text-[9px] uppercase font-mono text-slate-400">ENGINE:</span>
        <button
          onClick={() => setUseVideo(false)}
          className={`px-2 py-0.5 rounded-full transition-all font-mono text-[10px] ${
            !useVideo ? "bg-red-600 text-white font-bold" : "hover:text-white"
          }`}
        >
          PHOTO TIMELAPSE
        </button>
        <button
          onClick={() => {
            setVideoError(false);
            setUseVideo(true);
          }}
          className={`px-2 py-0.5 rounded-full transition-all font-mono text-[10px] ${
            useVideo ? "bg-sky-600 text-white font-bold" : "hover:text-white"
          }`}
        >
          CINEMATIC VIDEO
        </button>
      </div>
    </div>
  );
}
