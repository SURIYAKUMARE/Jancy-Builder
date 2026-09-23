"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ConstructionStage, HeroContent } from "@/types/hero";
import { ArrowRight, Phone, Sparkles, Compass, ShieldCheck, Layers, Eye } from "lucide-react";

interface HeroOverlayProps {
  hero: HeroContent;
  currentStage: ConstructionStage;
  onOpenQuote: () => void;
  onOpenExplorer: () => void;
  isBlueprintMode: boolean;
  onToggleBlueprintMode: () => void;
}

export default function HeroOverlay({
  hero,
  currentStage,
  onOpenQuote,
  onOpenExplorer,
  isBlueprintMode,
  onToggleBlueprintMode,
}: HeroOverlayProps) {
  const isFinalStage = currentStage?.order === 12;

  return (
    <div className="relative z-20 flex flex-col justify-between h-full min-h-[92vh] p-4 sm:p-8 md:p-10 pointer-events-none">
      {/* 1. TOP ARCHITECTURAL HUD NAVBAR */}
      <nav className="pointer-events-auto flex items-center justify-between w-full max-w-7xl mx-auto glass-hud px-5 py-3 rounded-2xl shadow-2xl">
        {/* Brand Logo: Official Jancy Builders Logo */}
        <Link href="/" className="flex items-center space-x-3 group">
          <div className="relative h-12 w-48 sm:w-56 transition-transform group-hover:scale-105 drop-shadow-[0_0_15px_rgba(229,9,20,0.3)]">
            <Image
              src="/logo/jancy-logo-darkmode.png"
              alt="Jancy Builders - Build The World"
              fill
              priority
              className="object-contain object-left"
            />
          </div>
        </Link>

        {/* Minimalist Navigation */}
        <div className="hidden lg:flex items-center space-x-7 text-[11px] font-mono tracking-widest text-slate-300 uppercase">
          <Link href="#timelapse" className="hover:text-red-400 transition-colors flex items-center space-x-1">
            <span className="text-red-500 font-bold">01</span>
            <span>TIMELAPSE</span>
          </Link>
          <button onClick={onOpenExplorer} className="hover:text-sky-400 transition-colors flex items-center space-x-1 uppercase">
            <span className="text-sky-400 font-bold">02</span>
            <span>BLUEPRINTS</span>
          </button>
          <Link href="#projects" className="hover:text-red-400 transition-colors flex items-center space-x-1">
            <span className="text-red-500 font-bold">03</span>
            <span>PORTFOLIO</span>
          </Link>
          <Link href="#estimator" className="hover:text-sky-400 transition-colors flex items-center space-x-1">
            <span className="text-sky-400 font-bold">04</span>
            <span>ESTIMATOR</span>
          </Link>
          <Link
            href="/admin/hero"
            className="text-amber-400 hover:text-amber-300 transition-colors flex items-center space-x-1 font-bold"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-amber-400 animate-ping mr-1" />
            <span>ADMIN CMS</span>
          </Link>
        </div>

        {/* Top Right Quick Actions: Blueprint Mode Toggle & Quote Button */}
        <div className="flex items-center space-x-2.5">
          {/* Blueprint X-Ray Toggle */}
          <button
            onClick={onToggleBlueprintMode}
            className={`px-3 py-1.5 rounded-xl border text-[11px] font-mono tracking-wider flex items-center space-x-1.5 transition-all ${
              isBlueprintMode
                ? "bg-sky-500/20 border-sky-400 text-sky-300 shadow-[0_0_15px_rgba(56,189,248,0.4)]"
                : "bg-slate-900/60 border-white/10 text-slate-400 hover:text-slate-200"
            }`}
            title="Toggle CAD Holographic Blueprint Overlay"
          >
            <Layers className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">{isBlueprintMode ? "CAD BLUEPRINT: ON" : "CAD X-RAY"}</span>
          </button>

          {/* Call button */}
          <a
            href="tel:+919876543210"
            className="hidden xl:flex items-center space-x-1.5 text-[11px] font-mono text-slate-300 hover:text-white px-3 py-1.5 rounded-xl bg-slate-900/60 border border-white/10 transition-colors"
          >
            <Phone className="h-3.5 w-3.5 text-red-500" />
            <span>+91 98765 43210</span>
          </a>

          {/* Premium CTA Button with Brand Red Gradient */}
          <button
            onClick={onOpenQuote}
            className="px-4 py-2 rounded-xl btn-brand-primary text-white font-bold text-xs tracking-wider uppercase transition-all active:scale-95 flex items-center space-x-1.5"
          >
            <span>GET A QUOTE</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>
      </nav>

      {/* 2. SUBTLE ARCHITECTURAL TELEMETRY HUD (CORNERS) */}
      <div className="w-full max-w-7xl mx-auto flex items-center justify-between pointer-events-none mt-2 px-2 hidden sm:flex">
        <div className="flex items-center space-x-3 text-[10px] font-mono text-slate-400 tracking-widest">
          <span className="flex items-center space-x-1 text-sky-400">
            <span className="h-1.5 w-1.5 rounded-full bg-sky-400 animate-pulse" />
            <span>LAT 13.0827°N, LON 80.2707°E</span>
          </span>
          <span className="text-slate-600">|</span>
          <span>ELEV: +12.4m AMSL</span>
          <span className="text-slate-600">|</span>
          <span>BEARING: 240 kN/m²</span>
        </div>

        <div className="flex items-center space-x-3 text-[10px] font-mono text-slate-400 tracking-widest">
          <span className="text-emerald-400 flex items-center space-x-1">
            <ShieldCheck className="h-3.5 w-3.5" />
            <span>ISO 9001:2015 CERTIFIED</span>
          </span>
          <span className="text-slate-600">|</span>
          <span className="text-red-400 font-bold">PHASE {currentStage?.stageNumber}/12</span>
        </div>
      </div>

      {/* 3. BOTTOM-LEFT EDITORIAL TYPOGRAPHY (UNOBSTRUCTED HERO VIEW) */}
      <div className="w-full max-w-4xl mx-auto md:mx-0 my-auto md:my-0 md:mt-auto pt-8 pb-4 text-left pointer-events-none">
        {/* Stage Milestone Badge */}
        <div className="pointer-events-auto inline-flex items-center space-x-2.5 px-3 py-1 rounded-full glass-hud border border-white/10 text-xs font-mono tracking-widest uppercase mb-3 shadow-xl">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
          </span>
          <span className="text-red-400 font-bold">STAGE {currentStage?.stageNumber || "01"} / 12</span>
          <span className="text-slate-600">•</span>
          <span className="text-slate-200 font-semibold">{currentStage?.name}</span>
          <span className="text-slate-600">•</span>
          <span className="text-sky-400">{currentStage?.milestone}</span>
        </div>

        {/* Headline */}
        {isFinalStage ? (
          /* Final Stage Celebratory Brand Showcase */
          <div className="animate-in fade-in duration-700">
            <div className="inline-flex items-center space-x-2 text-amber-400 text-xs font-mono uppercase tracking-widest mb-2 font-bold">
              <Sparkles className="h-4 w-4" />
              <span>Architectural Masterpiece Delivered</span>
            </div>
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-white uppercase font-serif drop-shadow-2xl leading-[1.05]">
              YOUR VISION. <br />
              <span className="text-brand-gradient">OUR CRAFT.</span>
            </h1>
            <p className="text-xl sm:text-2xl font-bold tracking-widest text-slate-100 uppercase mt-2 font-mono flex items-center space-x-2">
              <span>JANCY BUILDERS</span>
              <span className="text-red-500">—</span>
              <span className="text-blue-gradient">BUILD THE WORLD</span>
            </p>
            <p className="mt-3 max-w-2xl text-xs sm:text-sm text-slate-300 leading-relaxed drop-shadow-md">
              "FROM FOUNDATION TO FINISHED HOME." Every pillar, beam, and luxury finish crafted with lifetime structural integrity and precision engineering.
            </p>
          </div>
        ) : (
          /* Progressive Stage Editorial Headline */
          <div className="transition-all duration-700">
            <p className="text-xs sm:text-sm font-bold tracking-[0.25em] uppercase text-red-500 mb-1 font-mono flex items-center space-x-2">
              <span>{hero.companyName}</span>
              <span className="text-slate-600">•</span>
              <span className="text-sky-400">{hero.brandTagline}</span>
            </p>
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white drop-shadow-2xl max-w-3xl leading-[1.08] font-serif">
              "{currentStage?.title}"
            </h1>
            <p className="mt-2 text-base sm:text-xl font-bold tracking-wide text-brand-gradient">
              {hero.mainTitle}
            </p>
            <p className="mt-2 max-w-2xl text-xs sm:text-sm text-slate-300/90 leading-relaxed drop-shadow">
              {currentStage?.description || hero.subTitle}
            </p>
          </div>
        )}

        {/* Action Buttons */}
        <div className="pointer-events-auto mt-6 flex flex-wrap items-center gap-3">
          <Link
            href={hero.ctaPrimaryLink || "#projects"}
            className="px-6 py-3 rounded-xl btn-brand-primary text-white font-bold text-xs sm:text-sm tracking-wider uppercase transition-all shadow-xl flex items-center space-x-2 active:scale-95 group"
          >
            <span>{isFinalStage ? "EXPLORE OUR PROJECTS" : hero.ctaPrimaryText}</span>
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>

          <button
            onClick={onOpenQuote}
            className="px-6 py-3 rounded-xl glass-hud hover:bg-slate-800/80 text-white border border-white/20 hover:border-red-500/50 font-bold text-xs sm:text-sm tracking-wider uppercase transition-all shadow-lg active:scale-95"
          >
            <span>{isFinalStage ? "START YOUR PROJECT" : hero.ctaSecondaryText}</span>
          </button>

          <button
            onClick={onOpenExplorer}
            className="px-4 py-3 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-sky-400 hover:text-sky-300 border border-sky-500/30 font-mono text-xs sm:text-sm tracking-wide transition-all flex items-center space-x-1.5"
          >
            <Compass className="h-4 w-4" />
            <span>Specifications</span>
          </button>
        </div>
      </div>
    </div>
  );
}
