"use client";

import React from "react";
import Image from "next/image";
import { Sparkles, Layers } from "lucide-react";

export default function Hero3DFallback() {
  return (
    <div className="relative w-full h-full min-h-[420px] sm:min-h-[500px] lg:min-h-[560px] rounded-3xl overflow-hidden bg-[#0A0E17] border border-white/10 flex items-center justify-center">
      {/* Background Blueprint Grid */}
      <div className="absolute inset-0 bg-blueprint-grid opacity-30" />
      
      {/* Ambient Radial Glow */}
      <div className="absolute inset-0 bg-radial-gradient from-[#B88746]/10 via-transparent to-transparent pointer-events-none" />

      {/* Static Fallback Visual */}
      <div className="relative z-10 text-center space-y-4 px-6 max-w-md">
        <div className="relative w-20 h-20 mx-auto rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center shadow-xl">
          <Layers className="w-9 h-9 text-[#B88746] animate-pulse" />
        </div>

        <div>
          <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#B88746] font-bold block mb-1">
            REAL-TIME 3D ARCHITECTURAL SCENE
          </span>
          <h3 className="text-xl font-bold text-white font-sans">
            Initializing 3D Building Engine...
          </h3>
          <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
            Constructing procedural luxury villa model with real-time lighting, materials, and cinematic camera.
          </p>
        </div>

        <div className="w-48 h-1 bg-white/10 rounded-full mx-auto overflow-hidden">
          <div className="w-1/2 h-full bg-[#B88746] animate-[shimmer-gold-glow_2s_infinite]" />
        </div>
      </div>
    </div>
  );
}
