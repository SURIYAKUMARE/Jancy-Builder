"use client";

import React from "react";
import Link from "next/link";
import {
  ArrowRight,
  Calculator,
  HardHat,
  Building,
  Sparkles,
  Phone,
  Compass,
} from "lucide-react";
import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import FadingVideo from "@/components/motion/FadingVideo";
import BlurText from "@/components/motion/BlurText";

interface HeroExactProps {
  onOpenQuote?: () => void;
  onOpenAppointmentModal?: () => void;
}

export default function HeroExact({
  onOpenQuote,
  onOpenAppointmentModal,
}: HeroExactProps) {
  const { isTamil } = useLanguage();

  return (
    <section className="relative w-full min-h-screen h-[100dvh] bg-black overflow-hidden flex flex-col justify-between pt-24 sm:pt-28 pb-8 px-4 sm:px-8">
      
      {/* 1. FULLSCREEN ATMOSPHERIC VIDEO BACKGROUND (Actual Jancy Builders Footage) */}
      <div className="absolute inset-0 z-0">
        <FadingVideo
          src={[
            "/videos/construction-timelapse.mp4",
            "/videos/construction-timelapse-mobile.mp4",
          ]}
          poster="/images/hero-sunset-villa.jpg"
          className="w-full h-full"
          overlayGradient={true}
        />
        {/* Extra atmospheric radial vignette to focus center text */}
        <div className="absolute inset-0 bg-radial-vignette pointer-events-none opacity-70" />
      </div>

      {/* 2. TOP SPACER */}
      <div className="relative z-10 w-full" />

      {/* 3. CENTER CONTENT: BADGE + LARGE ITALIC HEADING + DESCRIPTION + BUTTONS */}
      <div className="relative z-10 max-w-5xl mx-auto w-full text-center space-y-6 sm:space-y-8 my-auto">
        
        {/* Liquid Glass Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full liquid-glass text-xs font-body tracking-wider text-white/90"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#C9A46B] animate-pulse" />
          <span className="text-[11px] sm:text-xs uppercase tracking-widest text-slate-300">
            {isTamil
              ? "தொழில்முறை கட்டிடப் பொறியியல் மற்றும் கட்டுமான சேவைகள்"
              : "Professional Civil Engineering & Construction"}
          </span>
        </motion.div>

        {/* Hero Heading: Large Italic Instrument Serif (English) or Elegant Noto Sans (Tamil) */}
        <div className="space-y-2">
          {isTamil ? (
            <BlurText
              text="உங்கள் கனவு இல்லம், எங்கள் பொறுப்பில்."
              as="h1"
              isTamil={true}
              className="text-4xl sm:text-6xl lg:text-7xl font-tamil font-black tracking-tight text-white leading-[1.2] max-w-4xl mx-auto"
            />
          ) : (
            <BlurText
              text="Your Dream Home, Built with Care."
              as="h1"
              italic={true}
              className="text-5xl sm:text-7xl lg:text-[5.75rem] font-heading font-normal tracking-tight text-white leading-[1.06] max-w-4xl mx-auto drop-shadow-2xl"
            />
          )}
        </div>

        {/* Hero Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.8, ease: "easeOut" }}
          className="text-sm sm:text-base lg:text-lg text-white/80 max-w-2xl mx-auto font-body leading-relaxed font-normal"
        >
          {isTamil
            ? "வீட்டுத் திட்டம் முதல் கட்டுமானம் முடிந்து ஒப்படைக்கும் வரை, உங்கள் தேவைக்கேற்ற வீட்டை உருவாக்க ஜான்சி பில்டர்ஸ் துணை நிற்கிறது."
            : "From your first plan to the final handover, Jancy Builders helps you create a home built around your needs."}
        </motion.p>

        {/* Hero Liquid-Glass Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8, ease: "easeOut" }}
          className="flex flex-wrap items-center justify-center gap-4 pt-2 font-body"
        >
          {/* Primary Button: Explore Our Projects */}
          <Link
            href="#projects"
            className="group inline-flex items-center gap-2.5 px-6 sm:px-7 py-3.5 rounded-full liquid-glass-strong text-white text-xs sm:text-sm font-semibold hover:border-[#C9A46B]/60 transition-all hover:scale-105 active:scale-95 shadow-xl shadow-black/80"
          >
            <span>{isTamil ? "எங்கள் கட்டுமானப் பணிகளைப் பாருங்கள்" : "Explore Our Projects"}</span>
            <ArrowRight className="w-4 h-4 text-[#C9A46B] transition-transform duration-200 group-hover:translate-x-1" />
          </Link>

          {/* Secondary Button: Get Construction Estimate */}
          <button
            onClick={onOpenQuote}
            className="inline-flex items-center gap-2 px-6 sm:px-7 py-3.5 rounded-full liquid-glass text-white/90 hover:text-white text-xs sm:text-sm font-semibold hover:bg-white/5 transition-all hover:scale-105 active:scale-95"
          >
            <Calculator className="w-4 h-4 text-[#C9A46B]" />
            <span>{isTamil ? "வீடு கட்டும் செலவை அறிய" : "Get Construction Estimate"}</span>
          </button>
        </motion.div>

      </div>

      {/* 4. HERO BOTTOM AREA: TWO GENUINE GLASS CARDS */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7, duration: 0.8, ease: "easeOut" }}
        className="relative z-10 max-w-5xl mx-auto w-full grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 font-body"
      >
        {/* Card 1: Our Projects */}
        <Link
          href="#projects"
          className="group p-4 sm:p-5 rounded-2xl liquid-glass hover:border-[#C9A46B]/40 transition-all flex items-center justify-between gap-4 text-left"
        >
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl liquid-glass flex items-center justify-center text-[#C9A46B] group-hover:scale-110 transition-transform flex-shrink-0">
              <Building className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white group-hover:text-[#C9A46B] transition-colors">
                {isTamil ? "கட்டுமானப் பணிகள்" : "Our Projects"}
              </h4>
              <p className="text-xs text-white/70">
                {isTamil
                  ? "உண்மையான கட்டுமானப் புகைப்படங்களைப் பாருங்கள்"
                  : "Explore real Jancy Builders construction work."}
              </p>
            </div>
          </div>
          <ArrowRight className="w-4 h-4 text-white/40 group-hover:text-[#C9A46B] group-hover:translate-x-1 transition-all flex-shrink-0" />
        </Link>

        {/* Card 2: Talk to Our Engineer */}
        <div
          onClick={onOpenAppointmentModal}
          className="group p-4 sm:p-5 rounded-2xl liquid-glass hover:border-[#C9A46B]/40 transition-all flex items-center justify-between gap-4 text-left cursor-pointer"
        >
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl liquid-glass flex items-center justify-center text-[#C9A46B] group-hover:scale-110 transition-transform flex-shrink-0">
              <HardHat className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white group-hover:text-[#C9A46B] transition-colors">
                {isTamil ? "பொறியாளரிடம் பேசுக" : "Talk to Our Engineer"}
              </h4>
              <p className="text-xs text-white/70">
                {isTamil
                  ? "Er. ஸ்டாலின் அவர்களிடம் இலவச ஆலோசனை பெறுக"
                  : "Get guidance for your home-building project."}
              </p>
            </div>
          </div>
          <ArrowRight className="w-4 h-4 text-white/40 group-hover:text-[#C9A46B] group-hover:translate-x-1 transition-all flex-shrink-0" />
        </div>
      </motion.div>

    </section>
  );
}
