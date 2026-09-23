"use client";

import React, { useState, useRef, useCallback, useEffect } from "react";
import Image from "next/image";
import { Sparkles, CheckCircle2, Play, Pause, RotateCcw } from "lucide-react";
import { motion } from "framer-motion";

interface BeforeAfterSliderProps {
  beforeImage?: string;
  afterImage?: string;
  beforeLabel?: string;
  afterLabel?: string;
}

export default function BeforeAfterSlider({
  beforeImage = "/images/stages/stage-01.jpg",
  afterImage = "/images/stages/stage-12.jpg",
  beforeLabel = "STAGE 01: EMPTY GROUND",
  afterLabel = "STAGE 12: FINISHED MASTERPIECE",
}: BeforeAfterSliderProps) {
  const [sliderPos, setSliderPos] = useState<number>(47); // Starts at 47% matching media_1790182531570.jpg!
  const [isDragging, setIsDragging] = useState(false);
  const [isAutoAnimating, setIsAutoAnimating] = useState(true);
  const [userInteracted, setUserInteracted] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const animFrameRef = useRef<number | null>(null);
  const idleTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Smooth sinusoidal auto-sweep animation
  useEffect(() => {
    if (!isAutoAnimating || isDragging) return;

    let startTime = performance.now();
    const cycleDuration = 5500; // 5.5s full smooth oscillation

    const animate = (now: number) => {
      const elapsed = now - startTime;
      // Oscillate smoothly between 22% and 78% using sine wave
      const progress = (Math.sin((elapsed / cycleDuration) * 2 * Math.PI - Math.PI / 2) + 1) / 2;
      const newPos = 22 + progress * 56;
      setSliderPos(Number(newPos.toFixed(1)));

      animFrameRef.current = requestAnimationFrame(animate);
    };

    animFrameRef.current = requestAnimationFrame(animate);

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [isAutoAnimating, isDragging]);

  // Handle drag move
  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const pos = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPos(pos);
  }, []);

  const onStartInteraction = (clientX: number) => {
    setIsDragging(true);
    setIsAutoAnimating(false);
    setUserInteracted(true);
    handleMove(clientX);

    if (idleTimeoutRef.current) clearTimeout(idleTimeoutRef.current);
  };

  const handleTouchMove = useCallback(
    (e: TouchEvent) => {
      if (isDragging && e.touches.length > 0) {
        handleMove(e.touches[0].clientX);
      }
    },
    [isDragging, handleMove]
  );

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (isDragging) {
        handleMove(e.clientX);
      }
    },
    [isDragging, handleMove]
  );

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);

    // Optional: auto-resume smooth sweep after 4 seconds of idle
    if (idleTimeoutRef.current) clearTimeout(idleTimeoutRef.current);
    idleTimeoutRef.current = setTimeout(() => {
      setIsAutoAnimating(true);
    }, 4000);
  }, []);

  useEffect(() => {
    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
      window.addEventListener("touchmove", handleTouchMove);
      window.addEventListener("touchend", handleMouseUp);
    }
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleMouseUp);
    };
  }, [isDragging, handleMouseMove, handleMouseUp, handleTouchMove]);

  return (
    <div className="w-full max-w-6xl mx-auto my-14 px-4 sm:px-6">
      
      {/* Section Header with Controls */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
        <div className="text-center sm:text-left">
          <div className="inline-flex items-center space-x-2 text-[#C29061] text-xs font-mono tracking-widest uppercase mb-1 font-bold">
            <Sparkles className="h-3.5 w-3.5" />
            <span>GROUND-UP VISUAL METAMORPHOSIS</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-black text-slate-900 font-sans tracking-tight">
            Empty Site to Finished Luxury Masterpiece
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Exact same camera elevation, angle, and orientation before foundation versus after handover.
          </p>
        </div>

        {/* Animation Control Pill */}
        <div className="flex items-center gap-2 bg-slate-100 border border-slate-200 rounded-full p-1.5 shadow-sm">
          <button
            onClick={() => setIsAutoAnimating(!isAutoAnimating)}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all ${
              isAutoAnimating
                ? "bg-[#E50914] text-white shadow-md shadow-red-600/20"
                : "bg-white text-slate-700 hover:text-slate-950"
            }`}
          >
            {isAutoAnimating ? (
              <>
                <Pause className="w-3.5 h-3.5 fill-current" />
                <span>Auto-Scan Active</span>
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>Play Auto-Scan</span>
              </>
            )}
          </button>

          <button
            onClick={() => {
              setSliderPos(50);
              setIsAutoAnimating(false);
            }}
            className="p-1.5 rounded-full text-slate-500 hover:text-slate-900 transition-colors"
            title="Reset to 50%"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Main Slider Container matching media_1790182531570.jpg */}
      <div
        ref={containerRef}
        onMouseDown={(e) => onStartInteraction(e.clientX)}
        onTouchStart={(e) => {
          if (e.touches.length > 0) onStartInteraction(e.touches[0].clientX);
        }}
        onMouseEnter={() => {
          if (isAutoAnimating) setIsAutoAnimating(false);
        }}
        onMouseLeave={() => {
          if (!isDragging && !isAutoAnimating) {
            idleTimeoutRef.current = setTimeout(() => setIsAutoAnimating(true), 3000);
          }
        }}
        className="relative h-[340px] sm:h-[480px] md:h-[560px] lg:h-[620px] w-full rounded-[2rem] overflow-hidden shadow-2xl border border-slate-200/80 select-none cursor-ew-resize group bg-slate-950"
      >
        {/* Layer 1: Background - STAGE 12: FINISHED MASTERPIECE */}
        <div className="absolute inset-0 h-full w-full">
          <Image
            src={afterImage}
            alt="Stage 12: Finished Masterpiece"
            fill
            sizes="(max-width: 1440px) 100vw, 1440px"
            className="object-cover object-center"
            priority
          />
        </div>

        {/* Layer 2: Foreground - STAGE 01: EMPTY GROUND with Pixel-Perfect Clip Path */}
        <div
          className="absolute inset-0 h-full w-full overflow-hidden pointer-events-none"
          style={{ clipPath: `inset(0 ${100 - sliderPos}% 0 0)` }}
        >
          <Image
            src={beforeImage}
            alt="Stage 01: Empty Ground"
            fill
            sizes="(max-width: 1440px) 100vw, 1440px"
            className="object-cover object-center"
            priority
          />
        </div>

        {/* Top-Left Badge: STAGE 01: EMPTY GROUND (Matching media_1790182531570.jpg) */}
        <div className="absolute top-5 left-5 z-20 pointer-events-none">
          <div className="bg-[#141A28]/90 backdrop-blur-md px-4 py-1.5 rounded-full border border-red-500/40 text-[#F87171] text-xs sm:text-[13px] font-mono font-bold tracking-wider uppercase shadow-xl flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            <span>{beforeLabel}</span>
          </div>
        </div>

        {/* Top-Right Badge: STAGE 12: FINISHED MASTERPIECE (Matching media_1790182531570.jpg) */}
        <div className="absolute top-5 right-5 z-20 pointer-events-none">
          <div className="bg-[#141A28]/90 backdrop-blur-md px-4 py-1.5 rounded-full border border-sky-500/40 text-[#38BDF8] text-xs sm:text-[13px] font-mono font-bold tracking-wider uppercase shadow-xl flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-sky-400 animate-pulse" />
            <span>{afterLabel}</span>
          </div>
        </div>

        {/* Tactile Dividing Slider Line & Red Oval Handle (Matching media_1790182531570.jpg) */}
        <div
          className="absolute top-0 bottom-0 w-[2.5px] bg-white shadow-[0_0_15px_rgba(255,255,255,0.9)] cursor-ew-resize z-30 flex items-center justify-center -translate-x-1/2 pointer-events-none"
          style={{ left: `${sliderPos}%` }}
        >
          {/* Glowing Aura Ring */}
          <span className="absolute w-10 h-16 rounded-full bg-red-500/30 blur-sm pointer-events-none" />

          {/* Red Vertical Pill Handle from media_1790182531570.jpg */}
          <div className="relative w-7 h-13 sm:w-8 sm:h-14 rounded-full bg-[#E50914] border-2 border-white shadow-[0_0_20px_rgba(229,9,20,0.85)] text-white flex items-center justify-center transform transition-transform group-hover:scale-110 active:scale-95">
            {/* White Double Horizontal Arrow */}
            <svg
              className="w-4 h-4 text-white stroke-[2.8]"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="7 8 3 12 7 16" />
              <polyline points="17 8 21 12 17 16" />
              <line x1="3" y1="12" x2="21" y2="12" />
            </svg>
          </div>
        </div>

        {/* Bottom Left Badge: EXACT SAME SITE ORIENTATION & ELEVATION (Matching media_1790182531570.jpg) */}
        <div className="absolute bottom-5 left-5 z-20 pointer-events-none">
          <div className="flex items-center space-x-2 bg-[#141A28]/90 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/15 text-[11px] font-mono font-semibold text-slate-200 shadow-xl">
            <CheckCircle2 className="h-4 w-4 text-emerald-400 stroke-[2.2]" />
            <span className="hidden sm:inline">EXACT SAME SITE ORIENTATION &amp; ELEVATION</span>
            <span className="sm:hidden">SAME SITE &amp; ELEVATION</span>
          </div>
        </div>

        {/* Bottom Right Badge: TRANSFORMATION RATIO: {sliderPos}% (Matching media_1790182531570.jpg) */}
        <div className="absolute bottom-5 right-5 z-20 pointer-events-none">
          <div className="bg-[#141A28]/90 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/15 text-[11px] font-mono font-semibold text-slate-300 shadow-xl">
            <span>TRANSFORMATION RATIO: </span>
            <strong className="text-white font-bold">{Math.round(sliderPos)}%</strong>
          </div>
        </div>

      </div>

    </div>
  );
}
