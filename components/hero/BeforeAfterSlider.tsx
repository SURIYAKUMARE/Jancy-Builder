"use client";

import React, { useState, useRef, useCallback, useEffect } from "react";
import Image from "next/image";
import { Sparkles, MoveHorizontal, CheckCircle2 } from "lucide-react";

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
  const [sliderPos, setSliderPos] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const pos = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPos(pos);
  }, []);

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
    <div className="w-full max-w-5xl mx-auto my-12 px-4 sm:px-6">
      <div className="text-center mb-6">
        <div className="inline-flex items-center space-x-2 text-red-500 text-xs font-mono tracking-widest uppercase mb-1.5 font-bold">
          <Sparkles className="h-3.5 w-3.5" />
          <span>TACTILE VISUAL TRANSFORMATION</span>
        </div>
        <h3 className="text-2xl sm:text-4xl font-bold text-white font-serif tracking-tight">
          Slide Between Vision and Reality
        </h3>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          Drag the interactive divider to witness the complete ground-up evolution of the same property.
        </p>
      </div>

      {/* Slider Container */}
      <div
        ref={containerRef}
        onMouseDown={() => setIsDragging(true)}
        onTouchStart={() => setIsDragging(true)}
        className="relative h-[320px] sm:h-[480px] md:h-[540px] w-full rounded-3xl overflow-hidden shadow-2xl border border-white/10 select-none cursor-ew-resize group bg-slate-950"
      >
        {/* Background Layer: After (Completed Villa) */}
        <div className="absolute inset-0 h-full w-full">
          <Image
            src={afterImage}
            alt="Completed Home"
            fill
            sizes="100vw"
            className="object-cover object-center"
            priority
          />
          <div className="absolute top-4 right-4 bg-slate-950/85 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-sky-500/30 text-sky-400 text-xs font-mono font-bold tracking-wider uppercase shadow-lg">
            {afterLabel}
          </div>
        </div>

        {/* Foreground Clipped Layer: Before (Empty Ground) */}
        <div
          className="absolute inset-0 h-full w-full overflow-hidden"
          style={{ width: `${sliderPos}%` }}
        >
          <div className="relative h-full w-[1000px] sm:w-[1200px] md:w-[1400px] lg:w-full lg:min-w-full">
            <Image
              src={beforeImage}
              alt="Empty Land"
              fill
              sizes="100vw"
              className="object-cover object-center"
              priority
            />
          </div>
          <div className="absolute top-4 left-4 bg-slate-950/85 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-red-500/30 text-red-400 text-xs font-mono font-bold tracking-wider uppercase shadow-lg">
            {beforeLabel}
          </div>
        </div>

        {/* Tactile Draggable Handle Line */}
        <div
          className="absolute top-0 bottom-0 w-1 bg-white shadow-[0_0_15px_rgba(255,255,255,0.8)] cursor-ew-resize z-20 flex items-center justify-center -translate-x-1/2"
          style={{ left: `${sliderPos}%` }}
        >
          <div className="h-11 w-11 rounded-full bg-red-600 text-white flex items-center justify-center shadow-[0_0_20px_rgba(229,9,20,0.8)] border-2 border-white transform transition-transform group-hover:scale-110 active:scale-95">
            <MoveHorizontal className="h-5 w-5" />
          </div>
        </div>

        {/* Bottom Specs Ribbon */}
        <div className="absolute bottom-4 left-4 right-4 z-10 flex items-center justify-between pointer-events-none">
          <div className="hidden sm:flex items-center space-x-2 bg-slate-950/80 backdrop-blur-md px-3 py-1 rounded-xl border border-white/10 text-[10px] font-mono text-slate-300">
            <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
            <span>EXACT SAME SITE ORIENTATION & ELEVATION</span>
          </div>

          <div className="bg-slate-950/80 backdrop-blur-md px-3 py-1 rounded-xl border border-white/10 text-[10px] font-mono text-slate-400 ml-auto">
            <span>TRANSFORMATION RATIO: </span>
            <strong className="text-white">{Math.round(sliderPos)}%</strong>
          </div>
        </div>
      </div>
    </div>
  );
}
