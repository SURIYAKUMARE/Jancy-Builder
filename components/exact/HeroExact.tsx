"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import {
  ArrowRight,
  Play,
  Star,
  Building2,
  Users2,
  ShieldCheck,
  ChevronDown,
  Home,
  Armchair,
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

// Smooth animated rolling integer
function AnimatedNumber({ value, suffix = "" }: { value: number; suffix?: string }) {
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    const duration = 1400;
    const startTime = performance.now();

    const update = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const ease = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setDisplay(Math.floor(ease * value));

      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        setDisplay(value);
      }
    };

    const handle = requestAnimationFrame(update);
    return () => cancelAnimationFrame(handle);
  }, [value]);

  return (
    <span>
      {display}
      {suffix}
    </span>
  );
}

// Smooth animated rolling decimal
function AnimatedDecimal({ value }: { value: number }) {
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    const duration = 1400;
    const startTime = performance.now();

    const update = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const ease = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setDisplay(Number((ease * value).toFixed(1)));

      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        setDisplay(value);
      }
    };

    const handle = requestAnimationFrame(update);
    return () => cancelAnimationFrame(handle);
  }, [value]);

  return <span>{display.toFixed(1)}</span>;
}

export default function HeroExact({
  currentStageIndex,
  onOpenQuote,
  onOpenExplorer,
}: HeroExactProps) {
  // Featured Project Mini-Slider state matching mockup
  const [featuredIdx, setFeaturedIdx] = useState(0);
  const [mouseParallax, setMouseParallax] = useState({ x: 0, y: 0 });

  // Desktop-only mouse parallax (disabled on mobile & when reduced motion is preferred)
  useEffect(() => {
    if (typeof window === "undefined") return;
    const isDesktop = window.innerWidth >= 1024;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!isDesktop || prefersReducedMotion) return;

    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      const normX = (e.clientX / innerWidth - 0.5) * 2;
      const normY = (e.clientY / innerHeight - 0.5) * 2;
      setMouseParallax({
        x: normX * 5,
        y: normY * 3,
      });
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

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

  // Auto-advance featured projects carousel smoothly
  useEffect(() => {
    const timer = setInterval(() => {
      setFeaturedIdx((prev) => (prev + 1) % featuredProjects.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [featuredProjects.length]);

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
      
      {/* 1. RIGHT SIDE VILLA BACKGROUND VISUAL WITH CONTINUOUS CINEMATIC KEN BURNS + SUBTLE DESKTOP PARALLAX */}
      <div
        className="absolute right-0 top-0 bottom-0 w-full lg:w-[58%] h-full z-0 overflow-hidden pointer-events-none transition-transform duration-300 ease-out"
        style={{
          transform: `translate3d(${-mouseParallax.x * 0.4}px, ${-mouseParallax.y * 0.5}px, 0)`,
        }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{
            opacity: 1,
            scale: [1.03, 1.07, 1.03],
            x: [0, -10, 0],
            y: [0, -5, 0],
          }}
          transition={{
            opacity: { delay: 0.15, duration: 0.9 },
            scale: { duration: 24, repeat: Infinity, ease: "easeInOut" },
            x: { duration: 24, repeat: Infinity, ease: "easeInOut" },
            y: { duration: 24, repeat: Infinity, ease: "easeInOut" },
          }}
          className="relative w-full h-full"
        >
          <Image
            src="/images/hero-sunset-villa.jpg"
            alt="Jancy Builders - Building Dreams Into Reality"
            fill
            priority
            className="object-cover object-center"
          />
          {/* Subtle natural shading overlays */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-black/25" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#FBF9F5]/75 via-transparent to-transparent lg:hidden" />
        </motion.div>
      </div>

      {/* 2. ELEGANT CONVEX ORGANIC CURVE DIVIDER (Desktop) */}
      <div className="absolute inset-0 z-[1] pointer-events-none hidden lg:block overflow-hidden">
        <svg
          className="absolute left-0 top-0 h-full w-[54%] text-[#FBF9F5] fill-current drop-shadow-sm"
          viewBox="0 0 750 1000"
          preserveAspectRatio="none"
        >
          <path d="M0,0 L600,0 C680,180 730,360 670,540 C610,720 540,860 480,1000 L0,1000 Z" />
        </svg>
      </div>

      {/* 3. TOP-RIGHT SKY CURSIVE SCRIPT WITH DELICATE SWAY */}
      <motion.div
        initial={{ opacity: 0, scale: 0.85, rotate: -8 }}
        animate={{
          opacity: 0.95,
          scale: 1,
          rotate: [-6, -4, -6],
          y: [0, -4, 0],
        }}
        transition={{
          delay: 0.5,
          duration: 7,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-28 sm:top-32 right-8 sm:right-16 lg:right-24 z-10 pointer-events-none select-none hidden md:block"
      >
        <span className="font-['Caveat',cursive] text-3xl sm:text-4xl lg:text-[42px] text-slate-800 font-bold tracking-wide drop-shadow-sm block leading-tight">
          More Than Structures<br />
          &nbsp;&nbsp;We Build Lives
        </span>
      </motion.div>

      {/* 4. TOP-RIGHT FLOATING "MODERN LIVING REDEFINED" CARD WITH LEVITATION & CAROUSEL */}
      <motion.div
        initial={{ opacity: 0, y: -20, scale: 0.95 }}
        animate={{
          opacity: 1,
          scale: 1,
          y: [0, -9, 0],
        }}
        transition={{
          y: {
            repeat: Infinity,
            duration: 4.8,
            ease: "easeInOut",
          },
          opacity: { delay: 0.5, duration: 0.8 },
          scale: { delay: 0.5, duration: 0.8 },
        }}
        style={{
          transform: `translate3d(${mouseParallax.x * 0.6}px, ${mouseParallax.y * 0.8}px, 0)`,
        }}
        className="absolute top-44 sm:top-48 right-6 sm:right-12 lg:right-16 z-20 hidden md:block"
      >
        <div className="bg-white/95 backdrop-blur-md rounded-2xl p-3 shadow-2xl border border-white/80 flex items-center gap-3.5 max-w-[295px] transition-all hover:shadow-black/20 group">
          <div className="relative w-12 h-12 rounded-xl overflow-hidden flex-shrink-0 bg-slate-100">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentFeatured.thumbnail}
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                className="relative w-full h-full"
              >
                <Image
                  src={currentFeatured.thumbnail}
                  alt={currentFeatured.title}
                  fill
                  className="object-cover"
                />
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="flex-1 min-w-0">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentFeatured.title}
                initial={{ opacity: 0, x: 8 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -8 }}
                transition={{ duration: 0.3 }}
              >
                <h4 className="text-xs font-bold text-slate-900 truncate">
                  {currentFeatured.title}
                </h4>
                <p className="text-[10px] text-slate-500 line-clamp-1 mt-0.5">
                  {currentFeatured.subtitle}
                </p>
              </motion.div>
            </AnimatePresence>

            {/* 3 Carousel Dots */}
            <div className="flex items-center gap-1.5 mt-2">
              {featuredProjects.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setFeaturedIdx(i)}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    featuredIdx === i ? "w-4 bg-slate-900" : "w-1.5 bg-slate-300 hover:bg-slate-400"
                  }`}
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.12, rotate: 5 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleNextFeatured}
            className="w-8 h-8 rounded-full bg-slate-950 text-white flex items-center justify-center hover:bg-[#C29061] transition-colors flex-shrink-0 shadow-md"
            title="Next Featured Project"
          >
            <ArrowRight className="w-3.5 h-3.5" />
          </motion.button>
        </div>
      </motion.div>

      {/* 5. MAIN LEFT HERO FOREGROUND CONTENT WITH STAGGERED ENTRANCES */}
      <div className="relative z-10 max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16 w-full my-auto py-10 lg:py-16">
        <div className="max-w-xl sm:max-w-2xl space-y-6 sm:space-y-8">
          
          {/* Eyebrow Line: 0ms delay */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0, duration: 0.55, ease: "easeOut" }}
            className="flex items-center gap-3"
          >
            <motion.span
              initial={{ width: 0 }}
              animate={{ width: 32 }}
              transition={{ delay: 0.15, duration: 0.5 }}
              className="h-[2px] bg-slate-400 block"
            />
            <span className="text-[11px] sm:text-xs font-bold tracking-[0.22em] text-slate-500 uppercase">
              ARCHITECTURE &nbsp;/&nbsp; CONSTRUCTION &nbsp;/&nbsp; INTERIORS
            </span>
          </motion.div>

          {/* Grand Headline: 120ms delay */}
          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.12, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="text-4xl sm:text-6xl lg:text-[4.5rem] font-black text-slate-950 tracking-tight leading-[1.06] font-sans"
          >
            Building Dreams<br />
            Into{" "}
            <span className="relative inline-block">
              <span className="text-[#C29061] bg-gradient-to-r from-[#C29061] via-[#E8C59A] to-[#B07F50] bg-clip-text text-transparent">
                Reality
              </span>
              {/* Subtle sparkle icon floating near the dot of the i */}
              <motion.span
                animate={{ rotate: [0, 180, 360], scale: [0.9, 1.15, 0.9] }}
                transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
                className="absolute -top-1 -right-4 hidden sm:inline-block text-[#C29061]"
              >
                <Sparkles className="w-4 h-4 fill-current opacity-80" />
              </motion.span>
            </span>
          </motion.h1>

          {/* Subtitle: 240ms delay */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.24, duration: 0.7, ease: "easeOut" }}
            className="text-slate-600 text-sm sm:text-base max-w-lg leading-relaxed font-normal"
          >
            We create modern homes, commercial spaces and infrastructure that inspire a better tomorrow.
          </motion.p>

          {/* CTA Buttons Row: 360ms delay */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.36, duration: 0.7, ease: "easeOut" }}
            className="flex items-center flex-wrap gap-4 sm:gap-6 pt-2"
          >
            {/* Primary Black Pill Button */}
            <motion.button
              whileHover={{
                y: -2,
                scale: 1.02,
                boxShadow: "0 15px 35px rgba(0, 0, 0, 0.25)",
              }}
              whileTap={{ scale: 0.97 }}
              onClick={onOpenQuote}
              className="group relative inline-flex items-center gap-2.5 bg-slate-950 hover:bg-slate-800 text-white text-sm font-bold px-7 py-3.5 rounded-full shadow-lg shadow-black/15 transition-all duration-200 overflow-hidden"
            >
              {/* Hover light sweep shimmer */}
              <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none" />
              <span>Start Your Project</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
            </motion.button>

            {/* Secondary Outline Button: View Our Projects */}
            <motion.a
              href="#projects"
              whileHover={{ y: -2, scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-white/90 hover:bg-white text-slate-900 font-bold text-sm border border-slate-300 shadow-sm hover:shadow-md transition-all duration-200"
            >
              <span>View Our Projects</span>
              <ArrowRight className="w-4 h-4 text-[#B88746]" />
            </motion.a>
          </motion.div>

          {/* 4 Stats in Clean Horizontal Row: 650ms delay with viewport trigger */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.65, duration: 0.75, ease: "easeOut" }}
            className="pt-6 grid grid-cols-2 sm:grid-cols-4 gap-5 sm:gap-6 border-t border-slate-200/80 max-w-xl"
          >
            {/* Stat 1 */}
            <motion.div whileHover={{ y: -2 }} className="flex flex-col cursor-default">
              <div className="flex items-center gap-1.5 text-slate-400 mb-1">
                <Building2 className="w-4 h-4 text-slate-500" />
              </div>
              <span className="text-2xl font-black text-slate-950 font-sans tracking-tight leading-none">
                <AnimatedNumber value={250} suffix="+" />
              </span>
              <span className="text-[11px] text-slate-500 font-medium mt-1">
                Projects Completed
              </span>
            </motion.div>

            {/* Stat 2 */}
            <motion.div whileHover={{ y: -2 }} className="flex flex-col cursor-default">
              <div className="flex items-center gap-1.5 text-slate-400 mb-1">
                <Users2 className="w-4 h-4 text-slate-500" />
              </div>
              <span className="text-2xl font-black text-slate-950 font-sans tracking-tight leading-none">
                <AnimatedNumber value={500} suffix="+" />
              </span>
              <span className="text-[11px] text-slate-500 font-medium mt-1">
                Happy Clients
              </span>
            </motion.div>

            {/* Stat 3 */}
            <motion.div whileHover={{ y: -2 }} className="flex flex-col cursor-default">
              <div className="flex items-center gap-1.5 text-slate-400 mb-1">
                <Star className="w-4 h-4 text-[#C29061] fill-[#C29061]" />
              </div>
              <span className="text-2xl font-black text-slate-950 font-sans tracking-tight leading-none flex items-center gap-0.5">
                <AnimatedDecimal value={4.8} /><span className="text-base text-[#C29061]">★</span>
              </span>
              <span className="text-[11px] text-slate-500 font-medium mt-1">
                Client Satisfaction
              </span>
            </motion.div>

            {/* Stat 4 */}
            <motion.div whileHover={{ y: -2 }} className="flex flex-col cursor-default">
              <div className="flex items-center gap-1.5 text-slate-400 mb-1">
                <ShieldCheck className="w-4 h-4 text-slate-500" />
              </div>
              <span className="text-2xl font-black text-slate-950 font-sans tracking-tight leading-none">
                <AnimatedNumber value={8} suffix="+" />
              </span>
              <span className="text-[11px] text-slate-500 font-medium mt-1">
                Years of Experience
              </span>
            </motion.div>
          </motion.div>

          {/* Bottom-Left Script Text: Spaces for a Brighter Tomorrow with Draw-In Underline */}
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
              <motion.path
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ delay: 1.1, duration: 1.2, ease: "easeOut" }}
                d="M2 7 C35 1, 95 2, 138 7"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </motion.div>

        </div>
      </div>

      {/* 6. FLOATING BOTTOM CAPSULE OVER THE POOL WITH GENTLE LEVITATION & HOVER SPRING */}
      <div className="relative z-20 w-full max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16 pb-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          
          {/* Centered/Right Floating 3-Category Capsule with Continuous Ambient Float */}
          <motion.div
            initial={{ opacity: 0, y: 35 }}
            animate={{
              opacity: 1,
              y: [0, -6, 0],
            }}
            transition={{
              y: {
                repeat: Infinity,
                duration: 5.6,
                ease: "easeInOut",
              },
              opacity: { delay: 0.85, duration: 0.8 },
            }}
            className="w-full md:w-auto md:ml-auto md:mr-16 bg-white/95 backdrop-blur-md rounded-2xl md:rounded-full py-3.5 px-6 sm:px-8 shadow-2xl border border-white/80 flex flex-col sm:flex-row items-center gap-6 sm:gap-8"
          >
            {/* Category 1: Residential */}
            <motion.div
              whileHover={{ scale: 1.04, y: -2 }}
              transition={{ duration: 0.2 }}
              className="flex items-center gap-3 w-full sm:w-auto cursor-pointer group"
            >
              <div className="w-9 h-9 rounded-xl bg-slate-100 group-hover:bg-[#C29061] group-hover:text-white flex items-center justify-center text-slate-700 flex-shrink-0 transition-colors">
                <Home className="w-4 h-4" />
              </div>
              <div className="text-left">
                <h5 className="text-xs font-bold text-slate-900 group-hover:text-[#C29061] transition-colors leading-tight">
                  Residential
                </h5>
                <p className="text-[11px] text-slate-500 font-normal leading-tight mt-0.5">
                  Homes for every story
                </p>
              </div>
            </motion.div>

            {/* Divider */}
            <div className="hidden sm:block h-7 w-[1px] bg-slate-200" />

            {/* Category 2: Commercial */}
            <motion.div
              whileHover={{ scale: 1.04, y: -2 }}
              transition={{ duration: 0.2 }}
              className="flex items-center gap-3 w-full sm:w-auto cursor-pointer group"
            >
              <div className="w-9 h-9 rounded-xl bg-slate-100 group-hover:bg-[#C29061] group-hover:text-white flex items-center justify-center text-slate-700 flex-shrink-0 transition-colors">
                <Building2 className="w-4 h-4" />
              </div>
              <div className="text-left">
                <h5 className="text-xs font-bold text-slate-900 group-hover:text-[#C29061] transition-colors leading-tight">
                  Commercial
                </h5>
                <p className="text-[11px] text-slate-500 font-normal leading-tight mt-0.5">
                  Spaces for growth
                </p>
              </div>
            </motion.div>

            {/* Divider */}
            <div className="hidden sm:block h-7 w-[1px] bg-slate-200" />

            {/* Category 3: Interior Design */}
            <motion.div
              whileHover={{ scale: 1.04, y: -2 }}
              transition={{ duration: 0.2 }}
              className="flex items-center gap-3 w-full sm:w-auto cursor-pointer group"
            >
              <div className="w-9 h-9 rounded-xl bg-slate-100 group-hover:bg-[#C29061] group-hover:text-white flex items-center justify-center text-slate-700 flex-shrink-0 transition-colors">
                <Armchair className="w-4 h-4" />
              </div>
              <div className="text-left">
                <h5 className="text-xs font-bold text-slate-900 group-hover:text-[#C29061] transition-colors leading-tight">
                  Interior Design
                </h5>
                <p className="text-[11px] text-slate-500 font-normal leading-tight mt-0.5">
                  Beauty in every corner
                </p>
              </div>
            </motion.div>
          </motion.div>

          {/* Far Right: SCROLL TO EXPLORE WITH CONTINUOUS BOUNCE */}
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.8 }}
            onClick={handleScrollDown}
            className="hidden lg:flex flex-col items-center gap-1.5 text-slate-400 hover:text-slate-900 transition-colors group cursor-pointer"
          >
            <span className="text-[9px] font-mono tracking-widest uppercase">
              SCROLL TO EXPLORE
            </span>
            <motion.div
              animate={{ y: [0, 5, 0] }}
              transition={{
                repeat: Infinity,
                duration: 1.6,
                ease: "easeInOut",
              }}
              className="w-7 h-7 rounded-full border border-slate-300 flex items-center justify-center group-hover:border-slate-800 transition-colors"
            >
              <ChevronDown className="w-4 h-4" />
            </motion.div>
          </motion.button>

        </div>
      </div>
    </section>
  );
}
