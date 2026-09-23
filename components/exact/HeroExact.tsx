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
  ChevronLeft,
  ChevronRight,
  MessageSquare,
  Layers,
  Sparkles,
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
  onSelectStage,
  onOpenQuote,
  onOpenExplorer,
}: HeroExactProps) {
  const currentStage = stages[currentStageIndex] || stages[0];
  const isFinalStage = currentStageIndex === stages.length - 1;

  // Featured Project Mini-Slider state matching mockup
  const [featuredIdx, setFeaturedIdx] = useState(0);
  const featuredProjects = [
    {
      title: "Modern Living Redefined",
      subtitle: "A perfect blend of design, comfort and functionality.",
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

  const handlePrevFeatured = () => {
    setFeaturedIdx((prev) => (prev - 1 + featuredProjects.length) % featuredProjects.length);
  };

  const currentFeatured = featuredProjects[featuredIdx];

  return (
    <section className="relative w-full min-h-[92vh] lg:min-h-screen bg-slate-950 overflow-hidden flex flex-col justify-between pt-24 sm:pt-28">
      {/* 1. Full-Bleed Background Visual Engine with Cinematic Ken Burns & Smooth Crossfade */}
      <div className="absolute inset-0 z-0 w-full h-full overflow-hidden">
        <div className="relative w-full h-full animate-kenburns origin-center">
          <Image
            src={isFinalStage ? "/images/hero-sunset-villa.jpg" : (currentStage?.desktopMediaUrl || "/images/hero-sunset-villa.jpg")}
            alt="Jancy Builders - Spaces Today, A Better Tomorrow"
            fill
            priority
            className="object-cover object-center transition-opacity duration-1000 ease-in-out"
          />
        </div>

        {/* Cinematic Vignette Overlays matching reference image */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/50 to-transparent pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-black/30 pointer-events-none" />
      </div>

      {/* 2. Delicate Sky Handwriting Script ("Build Your World") on Right Roof */}
      <motion.div
        initial={{ opacity: 0, scale: 0.85, rotate: -18 }}
        animate={{ opacity: 0.95, scale: 1, rotate: -12 }}
        transition={{ delay: 0.6, duration: 1.2, ease: "easeOut" }}
        className="absolute top-28 sm:top-36 right-8 sm:right-20 lg:right-32 z-10 pointer-events-none select-none hidden md:block"
      >
        <span className="font-['Caveat',cursive] text-4xl sm:text-5xl text-white/90 font-medium tracking-wide drop-shadow-lg block">
          Build<br />
          &nbsp;&nbsp;Your World
        </span>
      </motion.div>

      {/* 3. Architectural Engraved Facade Typography on Right Stone Wall */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.9, duration: 1 }}
        className="absolute top-[48%] right-4 sm:right-8 lg:right-12 z-10 pointer-events-none select-none hidden xl:flex flex-col space-y-1 text-slate-800/80 font-black tracking-[0.28em] text-[13px] leading-tight"
      >
        <span>QUALITY</span>
        <span>SPACES</span>
        <span>HAPPIER</span>
        <span>LIVES</span>
      </motion.div>

      {/* 4. Main Hero Foreground Content Overlay with Motion Stagger */}
      <div className="relative z-10 max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 w-full my-auto py-8 lg:py-12">
        <div className="max-w-2xl sm:max-w-3xl space-y-6">
          
          {/* Eyebrow with Animated Expanding Line */}
          <motion.div
            initial={{ opacity: 0, x: -25 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.7 }}
            className="flex items-center gap-3"
          >
            <motion.span
              initial={{ width: 0 }}
              animate={{ width: 32 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="h-[1.5px] bg-slate-300/80 block"
            />
            <span className="text-[11px] sm:text-xs font-semibold tracking-[0.25em] text-slate-200 uppercase drop-shadow">
              BUILDING MORE THAN STRUCTURES
            </span>
          </motion.div>

          {/* Grand Headline with Shimmering Gold Script */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
            className="text-4xl sm:text-6xl lg:text-[4.75rem] font-bold text-white tracking-tight leading-[1.06] drop-shadow-md"
          >
            Spaces Today<br />
            A Better <span className="font-serif italic font-normal shimmer-gold">Tomorrow</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.75 }}
            className="text-slate-200 text-sm sm:text-base lg:text-lg leading-relaxed max-w-xl drop-shadow"
          >
            From dream homes to commercial spaces, we deliver end-to-end construction and design solutions with quality, trust and innovation.
          </motion.p>

          {/* Action Buttons Row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.65, duration: 0.7 }}
            className="flex items-center flex-wrap gap-5 pt-2"
          >
            {/* Primary Golden/Sand Pill Button with Ripple Hover */}
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: "0 15px 35px rgba(232, 197, 154, 0.45)" }}
              whileTap={{ scale: 0.95 }}
              onClick={onOpenQuote}
              className="group inline-flex items-center gap-2.5 bg-[#E8C59A] hover:bg-[#deb887] text-slate-950 text-sm font-bold px-7 py-3.5 rounded-full shadow-xl shadow-black/40 transition-all duration-200"
            >
              <span>Get a Free Quote</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
            </motion.button>

            {/* Secondary Watch Our Story Button */}
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => onOpenExplorer(currentStageIndex)}
              className="group inline-flex items-center gap-3 text-white hover:text-[#E8C59A] font-semibold text-sm py-2 transition-colors drop-shadow"
            >
              <div className="w-10 h-10 rounded-full bg-black/60 border border-white/30 backdrop-blur-md text-white flex items-center justify-center group-hover:bg-[#E8C59A] group-hover:text-slate-950 transition-colors shadow-lg">
                <Play className="w-4 h-4 fill-current ml-0.5 group-hover:scale-110 transition-transform" />
              </div>
              <span>Watch Our Story</span>
            </motion.button>
          </motion.div>

          {/* 4 Stats in Horizontal Row with Staggered Entrance */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="pt-6 grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 border-t border-white/15 max-w-2xl"
          >
            {/* Stat 1 */}
            <motion.div whileHover={{ y: -3 }} className="flex flex-col cursor-default">
              <div className="flex items-center gap-2">
                <Building2 className="w-4 h-4 text-slate-300" />
                <span className="text-xl sm:text-2xl font-black text-white drop-shadow">250+</span>
              </div>
              <span className="text-[11px] text-slate-300 font-medium mt-1">
                Projects Completed
              </span>
            </motion.div>

            {/* Stat 2 */}
            <motion.div whileHover={{ y: -3 }} className="flex flex-col sm:border-l sm:border-white/15 sm:pl-5 cursor-default">
              <div className="flex items-center gap-2">
                <Users2 className="w-4 h-4 text-slate-300" />
                <span className="text-xl sm:text-2xl font-black text-white drop-shadow">500+</span>
              </div>
              <span className="text-[11px] text-slate-300 font-medium mt-1">
                Happy Clients
              </span>
            </motion.div>

            {/* Stat 3 */}
            <motion.div whileHover={{ y: -3 }} className="flex flex-col sm:border-l sm:border-white/15 sm:pl-5 cursor-default">
              <div className="flex items-center gap-2">
                <Star className="w-4 h-4 text-[#E8C59A] fill-[#E8C59A]" />
                <span className="text-xl sm:text-2xl font-black text-white drop-shadow">4.8+</span>
              </div>
              <span className="text-[11px] text-slate-300 font-medium mt-1">
                Client Satisfaction
              </span>
            </motion.div>

            {/* Stat 4 */}
            <motion.div whileHover={{ y: -3 }} className="flex flex-col sm:border-l sm:border-white/15 sm:pl-5 cursor-default">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-slate-300" />
                <span className="text-xl sm:text-2xl font-black text-white drop-shadow">8+</span>
              </div>
              <span className="text-[11px] text-slate-300 font-medium mt-1">
                Years of Experience
              </span>
            </motion.div>
          </motion.div>

        </div>
      </div>

      {/* 5. Bottom Floating Bar Over The Pool (Featured Project Card on Left, Live Chat Pill on Right) */}
      <div className="relative z-20 max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 w-full pb-6 pt-4 flex flex-col md:flex-row items-end justify-between gap-4">
        
        {/* Left: Floating Frosted Glass Featured Project Capsule Card with Levitation */}
        <div className="w-full md:w-auto animate-float bg-black/45 backdrop-blur-xl border border-white/20 rounded-2xl p-2.5 sm:p-3 pr-5 flex items-center gap-4 text-white shadow-2xl">
          {/* Mini Thumbnail with Play overlay */}
          <div
            onClick={() => onOpenExplorer(currentStageIndex)}
            className="relative w-20 sm:w-24 h-14 sm:h-16 rounded-xl overflow-hidden flex-shrink-0 cursor-pointer group/thumb bg-slate-900 border border-white/20"
          >
            <Image
              src={currentFeatured.thumbnail}
              alt={currentFeatured.title}
              fill
              className="object-cover group-hover/thumb:scale-110 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
              <div className="w-6 h-6 rounded-full bg-white/80 text-slate-950 flex items-center justify-center group-hover/thumb:scale-110 transition-transform">
                <Play className="w-3 h-3 fill-current ml-0.5" />
              </div>
            </div>
          </div>

          {/* Description with Crossfade on Project Change */}
          <div className="flex flex-col justify-center min-w-[170px]">
            <span className="text-[10px] font-bold tracking-wider text-[#E8C59A] uppercase">
              FEATURED PROJECT
            </span>
            <h4 className="text-xs sm:text-sm font-bold text-white leading-tight mt-0.5 transition-all">
              {currentFeatured.title}
            </h4>
            <p className="text-[10px] sm:text-[11px] text-slate-300 leading-tight mt-0.5 line-clamp-1">
              {currentFeatured.subtitle}
            </p>
            <button
              onClick={onOpenQuote}
              className="text-[11px] font-semibold text-white hover:text-[#E8C59A] inline-flex items-center gap-1 mt-1 underline decoration-white/40 group/link"
            >
              <span>Explore Project</span>
              <ArrowRight className="w-3 h-3 group-hover/link:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* Carousel Pagination & Arrows */}
          <div className="hidden sm:flex items-center gap-3 pl-4 border-l border-white/15">
            <span className="font-mono text-xs text-slate-300">
              0{featuredIdx + 1} / 0{featuredProjects.length}
            </span>
            <div className="flex items-center gap-1.5">
              <button
                onClick={handlePrevFeatured}
                className="w-6 h-6 rounded-full bg-white/10 hover:bg-white/25 flex items-center justify-center text-white transition-colors active:scale-95"
                aria-label="Previous Project"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={handleNextFeatured}
                className="w-6 h-6 rounded-full bg-white/10 hover:bg-white/25 flex items-center justify-center text-white transition-colors active:scale-95"
                aria-label="Next Project"
              >
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Right: Floating Live Chat Pill ("Have a Project in Mind? Let's Talk") */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onOpenQuote}
          className="cursor-pointer animate-float bg-white hover:bg-slate-50 text-slate-900 rounded-full py-2 px-3.5 shadow-2xl flex items-center gap-3 border border-gray-100 transition-shadow hover:shadow-red-500/10"
          style={{ animationDelay: "1.5s" }}
        >
          <div className="relative w-9 h-9 rounded-full bg-[#E8C59A] text-slate-900 flex items-center justify-center flex-shrink-0 shadow-sm">
            <span className="absolute inset-0 rounded-full bg-[#E8C59A]/40 animate-ping pointer-events-none" />
            <MessageSquare className="w-4 h-4 fill-slate-900 text-slate-900 relative z-10" />
          </div>
          <div className="flex flex-col text-left pr-2">
            <span className="text-xs font-bold text-slate-900 leading-tight">
              Have a Project in Mind?
            </span>
            <span className="text-[11px] text-slate-500 font-medium leading-tight">
              Let&apos;s Talk
            </span>
          </div>
        </motion.div>

      </div>

      {/* 6. Smooth Convex White Curve Transition into "OUR SERVICES" matching reference bottom */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="relative z-30 w-full bg-white rounded-t-[2.5rem] sm:rounded-t-[3.5rem] pt-10 pb-4 shadow-[0_-15px_30px_rgba(0,0,0,0.15)] text-center"
      >
        <span className="text-[11px] font-bold tracking-[0.25em] text-slate-500 uppercase block mb-1">
          OUR SERVICES
        </span>
        <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Complete <span className="font-serif italic font-normal text-[#C59B27]">Construction</span> Solutions
        </h2>
      </motion.div>
    </section>
  );
}
