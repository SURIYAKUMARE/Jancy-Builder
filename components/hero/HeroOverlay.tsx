"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ConstructionStage, HeroContent } from "@/types/hero";
import { ArrowRight, Phone, Sparkles, Building2, HardHat, Compass } from "lucide-react";

interface HeroOverlayProps {
  hero: HeroContent;
  currentStage: ConstructionStage;
  onOpenQuote: () => void;
  onOpenExplorer: () => void;
}

export default function HeroOverlay({
  hero,
  currentStage,
  onOpenQuote,
  onOpenExplorer,
}: HeroOverlayProps) {
  const isFinalStage = currentStage?.order === 12;

  return (
    <div className="relative z-20 flex flex-col justify-between h-full min-h-[90vh] p-6 md:p-12 pointer-events-none">
      {/* Top Navbar */}
      <nav className="pointer-events-auto flex items-center justify-between w-full max-w-7xl mx-auto glass-panel px-6 py-3.5 rounded-2xl border border-white/10 shadow-2xl">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center space-x-3 group">
          <div className="relative h-10 w-44 md:w-56 transition-transform group-hover:scale-105">
            <Image
              src={hero.logoUrl || "/logo/jancy-logo.svg"}
              alt={hero.companyName}
              fill
              priority
              className="object-contain"
            />
          </div>
        </Link>

        {/* Navigation Links */}
        <div className="hidden lg:flex items-center space-x-8 text-xs font-semibold tracking-widest text-slate-300 uppercase">
          <Link href="#timelapse" className="hover:text-yellow-400 transition-colors">
            Timelapse
          </Link>
          <button onClick={onOpenExplorer} className="hover:text-yellow-400 transition-colors uppercase">
            Process
          </button>
          <Link href="#projects" className="hover:text-yellow-400 transition-colors">
            Projects
          </Link>
          <Link href="#calculator" className="hover:text-yellow-400 transition-colors">
            Cost Estimator
          </Link>
          <Link
            href="/admin/hero"
            className="text-yellow-500/90 hover:text-yellow-400 transition-colors flex items-center space-x-1"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-yellow-500 animate-ping mr-1" />
            Admin CMS
          </Link>
        </div>

        {/* Contact CTA */}
        <div className="flex items-center space-x-3">
          <a
            href="tel:+919876543210"
            className="hidden sm:flex items-center space-x-2 text-xs font-medium text-slate-300 hover:text-yellow-400 transition-colors px-3 py-1.5 rounded-lg bg-slate-800/60 border border-slate-700/50"
          >
            <Phone className="h-3.5 w-3.5 text-yellow-500" />
            <span>+91 98765 43210</span>
          </a>
          <button
            onClick={onOpenQuote}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-yellow-500 to-amber-500 hover:from-yellow-400 hover:to-amber-400 text-slate-950 font-bold text-xs tracking-wider uppercase transition-all shadow-lg shadow-yellow-500/25 active:scale-95"
          >
            Get Quote
          </button>
        </div>
      </nav>

      {/* Center Hero Content (Dynamic based on Stage) */}
      <div className="w-full max-w-5xl mx-auto my-auto py-10 md:py-16 text-center md:text-left flex flex-col items-center md:items-start pointer-events-none">
        {/* Dynamic Construction Stage Badge */}
        <div className="pointer-events-auto inline-flex items-center space-x-2.5 px-3.5 py-1.5 rounded-full glass-panel-gold border border-yellow-500/30 text-yellow-400 text-xs font-mono tracking-widest uppercase mb-4 shadow-lg animate-in fade-in slide-in-from-bottom-2 duration-500">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-yellow-500"></span>
          </span>
          <span className="font-bold">STAGE {currentStage?.stageNumber || "01"} / 12</span>
          <span className="text-slate-600">|</span>
          <span className="text-slate-300 font-semibold">{currentStage?.name}</span>
        </div>

        {/* Main Headline */}
        {isFinalStage ? (
          /* Celebratory Branding for Completed Home */
          <div className="animate-in fade-in zoom-in-95 duration-700 text-center md:text-left">
            <div className="inline-flex items-center space-x-2 text-yellow-400/90 text-sm font-semibold tracking-widest uppercase mb-2">
              <Sparkles className="h-4 w-4 text-yellow-400" />
              <span>Architectural Masterpiece Delivered</span>
            </div>
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-white uppercase font-serif drop-shadow-2xl">
              YOUR VISION. <br />
              <span className="text-gold-gradient">OUR CRAFT.</span>
            </h1>
            <p className="text-xl sm:text-2xl font-bold tracking-widest text-slate-200 uppercase mt-3 font-sans">
              JANCY BUILDERS — <span className="text-yellow-400">BUILD THE WORLD</span>
            </p>
            <p className="mt-4 max-w-2xl text-sm sm:text-base text-slate-300 leading-relaxed drop-shadow-md">
              From an empty plot of land to a luxury finished home with complete architectural precision and lifetime structural integrity.
            </p>
          </div>
        ) : (
          /* Progressive Construction Stage Headline */
          <div className="transition-all duration-700">
            <p className="text-xs sm:text-sm font-bold tracking-[0.3em] uppercase text-yellow-400 mb-2 font-mono">
              {hero.companyName} • {hero.brandTagline}
            </p>
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white drop-shadow-2xl max-w-3xl leading-[1.1]">
              "{currentStage?.title}"
            </h1>
            <p className="mt-3 text-sm sm:text-lg text-slate-200/90 font-medium tracking-wide">
              {hero.mainTitle}
            </p>
            <p className="mt-2 max-w-2xl text-xs sm:text-sm text-slate-400 leading-relaxed drop-shadow">
              {currentStage?.description || hero.subTitle}
            </p>
          </div>
        )}

        {/* Hero CTA Action Buttons */}
        <div className="pointer-events-auto mt-8 flex flex-wrap items-center justify-center md:justify-start gap-4">
          <Link
            href={hero.ctaPrimaryLink || "#projects"}
            className="px-6 py-3.5 rounded-xl bg-yellow-500 hover:bg-yellow-400 text-slate-950 font-bold text-xs sm:text-sm tracking-wider uppercase transition-all shadow-xl shadow-yellow-500/30 flex items-center space-x-2 active:scale-95 group"
          >
            <span>{isFinalStage ? "EXPLORE OUR PROJECTS" : hero.ctaPrimaryText}</span>
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>

          <button
            onClick={onOpenQuote}
            className="px-6 py-3.5 rounded-xl glass-panel hover:bg-slate-800/80 text-white border border-white/20 hover:border-yellow-500/50 font-bold text-xs sm:text-sm tracking-wider uppercase transition-all shadow-lg flex items-center space-x-2 active:scale-95"
          >
            <span>{isFinalStage ? "START YOUR PROJECT" : hero.ctaSecondaryText}</span>
          </button>

          <button
            onClick={onOpenExplorer}
            className="px-4 py-3.5 rounded-xl bg-slate-900/60 hover:bg-slate-800/90 text-yellow-400 hover:text-yellow-300 border border-yellow-500/30 font-medium text-xs sm:text-sm tracking-wide transition-all flex items-center space-x-1.5"
          >
            <Compass className="h-4 w-4" />
            <span>Inspect Blueprint</span>
          </button>
        </div>
      </div>
    </div>
  );
}
