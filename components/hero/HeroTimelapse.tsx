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
  progressPercent: number; // 0 to 100 within active stage
  preferVideo?: boolean;
}

export default function HeroTimelapse({
  stages,
  settings,
  currentStageIndex,
  onStageChange,
  isPlaying,
  progressPercent,
  preferVideo = false,
}: HeroTimelapseProps) {
  const [useVideo, setUseVideo] = useState(preferVideo && !!settings.desktopVideoUrl);
  const [videoError, setVideoError] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  // Responsive device detection
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

  // Video playback control
  useEffect(() => {
    if (!videoRef.current || !useVideo) return;
    if (isPlaying) {
      videoRef.current.play().catch(() => {
        // Autoplay policy prevented video; fallback to image timelapse
        setVideoError(true);
        setUseVideo(false);
      });
    } else {
      videoRef.current.pause();
    }
  }, [isPlaying, useVideo]);

  // Track video progress if video is running
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
  const nextStage = stages[(currentStageIndex + 1) % stages.length] || stages[0];

  return (
    <div className="relative h-full w-full overflow-hidden bg-[#04070E]">
      {/* 1. Background Video Layer (Optional toggle / high-speed timelapse) */}
      {useVideo && !videoError ? (
        <video
          ref={videoRef}
          className="absolute inset-0 h-full w-full object-cover transition-opacity duration-1000"
          src={isMobile && settings.mobileVideoUrl ? settings.mobileVideoUrl : settings.desktopVideoUrl}
          autoPlay
          muted
          loop
          playsInline
          onTimeUpdate={handleVideoTimeUpdate}
          onError={() => {
            console.warn("Video failed to play, falling back to cinematic photo sequence");
            setVideoError(true);
            setUseVideo(false);
          }}
          poster={currentStage?.desktopMediaUrl || "/images/stages/stage-01.jpg"}
        />
      ) : (
        /* 2. Cinematic Multi-Layer Image Crossfade Sequence with Ken Burns Animation */
        <div className="absolute inset-0 h-full w-full">
          {stages.map((stage, idx) => {
            const isActive = idx === currentStageIndex;
            const isNext = idx === (currentStageIndex + 1) % stages.length;
            const mediaUrl = isMobile && stage.mobileMediaUrl ? stage.mobileMediaUrl : stage.desktopMediaUrl;

            // Only mount active and next for optimal DOM performance
            if (!isActive && !isNext) return null;

            return (
              <div
                key={stage.id || idx}
                className={`absolute inset-0 h-full w-full transition-opacity duration-1000 ease-in-out ${
                  isActive ? "opacity-100 z-1" : "opacity-0 z-0"
                }`}
              >
                <div
                  className={`relative h-full w-full transform ${
                    isActive ? "scale-105 transition-transform duration-[6000ms] ease-out" : "scale-100"
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
      <BlueprintCanvas currentStageNumber={currentStage?.id || currentStageIndex + 1} />

      {/* 4. Cinematic Vignette & Deep Architectural Gradient Overlay (Ensures WCAG AAA contrast) */}
      <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-t from-[#060a12] via-[#0a1128]/60 to-[#060a12]/75" />
      <div className="pointer-events-none absolute inset-0 z-10 bg-radial-vignette opacity-80" />
      
      {/* 5. Subtle Blueprint CAD Corner Markers */}
      <div className="pointer-events-none absolute top-6 left-6 z-20 hidden md:block">
        <div className="flex items-center space-x-2 text-[10px] tracking-widest text-sky-400/60 font-mono">
          <div className="h-1.5 w-1.5 bg-sky-400 animate-ping rounded-full" />
          <span>GEO-LOC: 13.0827° N, 80.2707° E</span>
          <span className="text-slate-600">|</span>
          <span>ELEV: +12.4m</span>
        </div>
      </div>

      <div className="pointer-events-none absolute top-6 right-6 z-20 hidden md:block">
        <div className="flex items-center space-x-2 text-[10px] tracking-widest text-yellow-500/70 font-mono">
          <span>STRUCTURAL FIDELITY: 100%</span>
          <span className="text-slate-600">|</span>
          <span>PHASE: {currentStage?.stageNumber}/12</span>
        </div>
      </div>

      {/* 6. Mode Switcher (Video vs Frame Timelapse) in Bottom Right */}
      <div className="absolute bottom-24 right-6 z-30 hidden lg:flex items-center space-x-2 bg-slate-900/80 backdrop-blur-md border border-slate-700/60 rounded-full px-3 py-1.5 text-xs text-slate-300">
        <span className="text-[10px] uppercase font-mono text-slate-400">Engine:</span>
        <button
          onClick={() => setUseVideo(false)}
          className={`px-2.5 py-0.5 rounded-full transition-all font-medium text-[11px] ${
            !useVideo ? "bg-yellow-500 text-slate-950 font-semibold shadow-sm" : "hover:text-white"
          }`}
        >
          Photo Timelapse
        </button>
        <button
          onClick={() => {
            setVideoError(false);
            setUseVideo(true);
          }}
          className={`px-2.5 py-0.5 rounded-full transition-all font-medium text-[11px] ${
            useVideo ? "bg-yellow-500 text-slate-950 font-semibold shadow-sm" : "hover:text-white"
          }`}
        >
          Cinematic Video
        </button>
      </div>
    </div>
  );
}
