"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  ArrowRight,
  Play,
  Star,
  Building2,
  Users2,
  Calendar,
  ShieldCheck,
  ChevronRight,
  ChevronDown,
  Home,
  Armchair,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Stage } from "@/types/hero";

interface HeroExactProps {
  stages: Stage[];
  currentStageIndex: number;
  onSelectStage: (idx: number) => void;
  isPlaying?: boolean;
  onTogglePlay?: () => void;
  progressPercent?: number;
  onOpenQuote: () => void;
  onOpenExplorer: (idx: number) => void;
}

export default function HeroExact({
  stages,
  currentStageIndex,
  onOpenQuote,
  onOpenExplorer,
}: HeroExactProps) {
  // Featured Project Mini-Slider state matching mockup
  const [featuredIdx, setFeaturedIdx] = useState(0);
  const featuredProjects = [
    {
      title: "Modern Living Redefined",
      subtitle: "Elegance meets functionality in every detail.",
      thumbnail: "/images/projects/luxury-villa.jpg",
    },
    {
      title: "Skyline Corporate Hub",
      subtitle: "Innovative commercial space engineered for growth.",
      thumbnail: "/images/projects/office-building.jpg",
    },
    {
      title: "Contemporary Hillside Villa",
      subtitle: "Sustainable architectural craft with panoramic views.",
      thumbnail: "/images/projects/modern-home.jpg",
    },
  ];

  const handleNextFeatured = () => {
    setFeaturedIdx((prev) => (prev + 1) % featuredProjects.length);
  };

  const currentFeatured = featuredProjects[featuredIdx];

  const handleScrollDown = () => {
    const nextSection = document.getElementById("services") || document.querySelector("main section:nth-of-type(2)");
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: "smooth" });
    } else {
      window.scrollBy({ top: window.innerHeight * 0.85, behavior: "smooth" });
    }
  };

  return (
    <section className="relative w-full min-h-[95vh] lg:min-h-screen bg-[#FBF9F5] overflow-hidden flex flex-col justify-between pt-24 sm:pt-28">
      {/* 1. RIGHT SIDE VILLA BACKGROUND VISUAL */}
      <div className="absolute right-0 top-0 bottom-0 w-full lg:w-[58%] h-full z-0 overflow-hidden pointer-events-none">
        <div className="relative w-full h-full">
          <Image
            src="/images/hero-sunset-villa.jpg"
            alt="Jancy Builders - Building Dreams Into Reality"
            fill
            priority
            className="object-cover object-center scale-105 transition-transform duration-1000 ease-out"
          />
          {/* Subtle natural shading overlays */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#FBF9F5]/70 via-transparent to-transparent lg:hidden" />
        </div>
      </div>

      {/* 2. ELEGANT CONVEX ORGANIC CURVE DIVIDER (Desktop) */}
      <div className="absolute inset-0 z-[1] pointer-events-none hidden lg:block overflow-hidden">
        <svg
          className="absolute left-0 top-0 h-full w-[54%] text-[#FBF9F5] fill-current"
          viewBox="0 0 750 1000"
          preserveAspectRatio="none"
        >
          {/* Organic curve matching media_1790172708401.png */}
          <path d="M0,0 L600,0 C680,180 730,360 670,540 C610,720 540,860 480,1000 L0,1000 Z" />
        </svg>
      </div>

      {/* 3. TOP-RIGHT SKY CURSIVE SCRIPT */}
      <motion.div
        initial={{ opacity: 0, scale: 0.85, rotate: -8 }}
        animate={{ opacity: 0.95, scale: 1, rotate: -5 }}
        transition={{ delay: 0.6, duration: 1.2, ease: "easeOut" }}
        className="absolute top-28 sm:top-32 right-8 sm:right-16 lg:right-24 z-10 pointer-events-none select-none hidden md:block"
      >
        <span className="font-['Caveat',cursive] text-3xl sm:text-4xl lg:text-[42px] text-slate-800 font-bold tracking-wide drop-shadow-sm block leading-tight">
          More Than Structures<br />
          &nbsp;&nbsp;We Build Lives
        </span>
      </motion.div>

      {/* 4. TOP-RIGHT FLOATING "MODERN LIVING REDEFINED" CARD */}
      <motion.div
        initial={{ opacity: 0, y: -20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ delay: 0.7, duration: 0.8 }}
        className="absolute top-44 sm:top-48 right-6 sm:right-12 lg:right-16 z-20 hidden md:block"
      >
        <div className="bg-white/95 backdrop-blur-md rounded-2xl p-3 shadow-2xl border border-white/80 flex items-center gap-3.5 max-w-[290px] transition-all hover:shadow-black/15">
          <div className="relative w-12 h-12 rounded-xl overflow-hidden flex-shrink-0 bg-slate-100">
            <Image
              src={currentFeatured.thumbnail}
              alt={currentFeatured.title}
              fill
              className="object-cover"
            />
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="text-xs font-bold text-slate-900 truncate">
              {currentFeatured.title}
            </h4>
            <p className="text-[10px] text-slate-500 line-clamp-1 mt-0.5">
              {currentFeatured.subtitle}
            </p>
            {/* 3 Carousel Dots */}
            <div className="flex items-center gap-1.5 mt-1.5">
              {featuredProjects.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setFeaturedIdx(i)}
                  className={`h-1.5 rounded-full transition-all ${
                    featuredIdx === i ? "w-4 bg-slate-900" : "w-1.5 bg-slate-300"
                  }`}
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
            </div>
          </div>
          <button
            onClick={handleNextFeatured}
            className="w-8 h-8 rounded-full bg-slate-950 text-white flex items-center justify-center hover:bg-[#C29061] transition-colors flex-shrink-0 shadow-md"
            title="Next Featured Project"
          >
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </motion.div>

      {/* 5. MAIN LEFT HERO FOREGROUND CONTENT */}
      <div className="relative z-10 max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16 w-full my-auto py-10 lg:py-16">
        <div className="max-w-xl sm:max-w-2xl space-y-6 sm:space-y-8">
          
          {/* Eyebrow Line & Sub-Header */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.7 }}
            className="flex items-center gap-3"
          >
            <span className="h-[2px] w-8 bg-slate-400 block" />
            <span className="text-[11px] sm:text-xs font-bold tracking-[0.22em] text-slate-500 uppercase">
              ARCHITECTURE &nbsp;/&nbsp; CONSTRUCTION &nbsp;/&nbsp; INTERIORS
            </span>
          </motion.div>

          {/* Grand Headline: Building Dreams Into Reality */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.8 }}
            className="text-4xl sm:text-6xl lg:text-[4.5rem] font-black text-slate-950 tracking-tight leading-[1.06] font-sans"
          >
            Building Dreams<br />
            Into <span className="text-[#C29061]">Reality</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="text-slate-600 text-sm sm:text-base max-w-lg leading-relaxed font-normal"
          >
            We create modern homes, commercial spaces and infrastructure that inspire a better tomorrow.
          </motion.p>

          {/* CTA Buttons Row: [ Get a Free Quote -> ] and ( ▶ ) Watch Our Story */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.65, duration: 0.8 }}
            className="flex items-center flex-wrap gap-6 pt-2"
          >
            {/* Primary Black Pill Button */}
            <motion.button
              whileHover={{ scale: 1.04, boxShadow: "0 10px 25px rgba(0, 0, 0, 0.2)" }}
              whileTap={{ scale: 0.96 }}
              onClick={onOpenQuote}
              className="inline-flex items-center gap-2.5 bg-slate-950 hover:bg-slate-800 text-white text-sm font-bold px-7 py-3.5 rounded-full shadow-lg shadow-black/15 transition-all duration-200"
            >
              <span>Get a Free Quote</span>
              <ArrowRight className="w-4 h-4" />
            </motion.button>

            {/* Secondary Circular Play Button + Watch Our Story */}
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => onOpenExplorer(currentStageIndex)}
              className="inline-flex items-center gap-3.5 group text-left"
            >
              <div className="w-11 h-11 rounded-full bg-white text-slate-950 shadow-md border border-slate-200/80 flex items-center justify-center group-hover:bg-[#C29061] group-hover:text-white group-hover:border-[#C29061] transition-all duration-200">
                <Play className="w-4 h-4 fill-current ml-0.5" />
              </div>
              <div>
                <span className="block text-sm font-bold text-slate-900 group-hover:text-[#C29061] transition-colors leading-tight">
                  Watch Our Story
                </span>
                <span className="block text-xs text-slate-400 font-medium leading-tight mt-0.5">
                  2 min video
                </span>
              </div>
            </motion.button>
          </motion.div>

          {/* 4 Stats in Clean Horizontal Row */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="pt-6 grid grid-cols-2 sm:grid-cols-4 gap-5 sm:gap-6 border-t border-slate-200/80 max-w-xl"
          >
            {/* Stat 1 */}
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5 text-slate-400 mb-1">
                <Building2 className="w-4 h-4 text-slate-500" />
              </div>
              <span className="text-2xl font-black text-slate-950 font-sans tracking-tight leading-none">
                250+
              </span>
              <span className="text-[11px] text-slate-500 font-medium mt-1">
                Projects Completed
              </span>
            </div>

            {/* Stat 2 */}
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5 text-slate-400 mb-1">
                <Users2 className="w-4 h-4 text-slate-500" />
              </div>
              <span className="text-2xl font-black text-slate-950 font-sans tracking-tight leading-none">
                500+
              </span>
              <span className="text-[11px] text-slate-500 font-medium mt-1">
                Happy Clients
              </span>
            </div>

            {/* Stat 3 */}
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5 text-slate-400 mb-1">
                <Star className="w-4 h-4 text-[#C29061] fill-[#C29061]" />
              </div>
              <span className="text-2xl font-black text-slate-950 font-sans tracking-tight leading-none flex items-center gap-0.5">
                4.8<span className="text-base text-[#C29061]">★</span>
              </span>
              <span className="text-[11px] text-slate-500 font-medium mt-1">
                Client Satisfaction
              </span>
            </div>

            {/* Stat 4 */}
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5 text-slate-400 mb-1">
                <ShieldCheck className="w-4 h-4 text-slate-500" />
              </div>
              <span className="text-2xl font-black text-slate-950 font-sans tracking-tight leading-none">
                8+
              </span>
              <span className="text-[11px] text-slate-500 font-medium mt-1">
                Years of Experience
              </span>
            </div>
          </motion.div>

          {/* Bottom-Left Script Text: Spaces for a Brighter Tomorrow */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.95, duration: 0.8 }}
            className="pt-2 select-none"
          >
            <span className="font-['Caveat',cursive] text-2xl sm:text-3xl text-[#C29061] block leading-none tracking-wide">
              Spaces for<br />
              &nbsp;&nbsp;a Brighter Tomorrow
            </span>
            <svg
              className="w-36 h-3 text-[#C29061]/60 mt-1"
              viewBox="0 0 140 10"
              fill="none"
            >
              <path
                d="M2 7 C35 1, 95 2, 138 7"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </motion.div>

        </div>
      </div>

      {/* 6. FLOATING BOTTOM CAPSULE OVER THE POOL (Residential / Commercial / Interior Design) */}
      <div className="relative z-20 w-full max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16 pb-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          
          {/* Centered/Right Floating 3-Category Capsule */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.85, duration: 0.8 }}
            className="w-full md:w-auto md:ml-auto md:mr-16 bg-white/95 backdrop-blur-md rounded-2xl md:rounded-full py-3.5 px-6 sm:px-8 shadow-2xl border border-white/80 flex flex-col sm:flex-row items-center gap-6 sm:gap-8"
          >
            {/* Category 1: Residential */}
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <div className="w-9 h-9 rounded-xl bg-slate-100 flex items-center justify-center text-slate-700 flex-shrink-0">
                <Home className="w-4 h-4 text-slate-700" />
              </div>
              <div className="text-left">
                <h5 className="text-xs font-bold text-slate-900 leading-tight">Residential</h5>
                <p className="text-[11px] text-slate-500 font-normal leading-tight mt-0.5">Homes for every story</p>
              </div>
            </div>

            {/* Divider */}
            <div className="hidden sm:block h-7 w-[1px] bg-slate-200" />

            {/* Category 2: Commercial */}
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <div className="w-9 h-9 rounded-xl bg-slate-100 flex items-center justify-center text-slate-700 flex-shrink-0">
                <Building2 className="w-4 h-4 text-slate-700" />
              </div>
              <div className="text-left">
                <h5 className="text-xs font-bold text-slate-900 leading-tight">Commercial</h5>
                <p className="text-[11px] text-slate-500 font-normal leading-tight mt-0.5">Spaces for growth</p>
              </div>
            </div>

            {/* Divider */}
            <div className="hidden sm:block h-7 w-[1px] bg-slate-200" />

            {/* Category 3: Interior Design */}
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <div className="w-9 h-9 rounded-xl bg-slate-100 flex items-center justify-center text-slate-700 flex-shrink-0">
                <Armchair className="w-4 h-4 text-slate-700" />
              </div>
              <div className="text-left">
                <h5 className="text-xs font-bold text-slate-900 leading-tight">Interior Design</h5>
                <p className="text-[11px] text-slate-500 font-normal leading-tight mt-0.5">Beauty in every corner</p>
              </div>
            </div>
          </motion.div>

          {/* Far Right: SCROLL TO EXPLORE */}
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.8 }}
            onClick={handleScrollDown}
            className="hidden lg:flex flex-col items-center gap-1.5 text-slate-400 hover:text-slate-900 transition-colors group cursor-pointer"
          >
            <span className="text-[9px] font-mono tracking-widest uppercase writing-mode-vertical">
              SCROLL TO EXPLORE
            </span>
            <div className="w-7 h-7 rounded-full border border-slate-300 flex items-center justify-center group-hover:border-slate-800 transition-colors">
              <ChevronDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
            </div>
          </motion.button>

        </div>
      </div>
    </section>
  );
}
