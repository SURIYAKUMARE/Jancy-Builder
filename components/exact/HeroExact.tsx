"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import {
  ArrowRight,
  Calculator,
  Phone,
  Building2,
  ShieldCheck,
  Award,
  MapPin,
  Sparkles,
  ChevronRight,
  CheckCircle2,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";

interface HeroExactProps {
  onOpenQuote?: () => void;
  onOpenAppointmentModal?: () => void;
}

export default function HeroExact({
  onOpenQuote,
  onOpenAppointmentModal,
}: HeroExactProps) {
  const { isTamil } = useLanguage();

  // Authentic project showcases from Jancy Builders
  const realProjects = [
    {
      id: "sunset-villa",
      titleEn: "Luxury Residential Villa",
      titleTa: "ஆடம்பர குடியிருப்பு வில்லா",
      location: "Kavalkinaru, Tirunelveli",
      image: "/images/hero-sunset-villa.jpg",
      tagEn: "Completed Turnkey Project",
      tagTa: "கட்டி முடிக்கப்பட்ட பணி",
    },
    {
      id: "porotherm-villa",
      titleEn: "Wienerberger Porotherm Eco-Thermal Home",
      titleTa: "போரோதெர்ம் குளுமை இல்லம்",
      location: "Samugarengapuram Site",
      image: "/images/fb-projects/fb-2866252757935105/image_001.jpg",
      tagEn: "Thermal Clay Masonry",
      tagTa: "களிமண் செங்கல் கட்டுமானம்",
    },
    {
      id: "silathikulam-duplex",
      titleEn: "Contemporary Duplex Residence",
      titleTa: "நவீன இரு அடுக்கு மாளிகை",
      location: "Silathikulam Site",
      image: "/images/fb-projects/fb-2996642819924777/image_001.jpg",
      tagEn: "Handed Over On-Time",
      tagTa: "குறிப்பிட்ட நாளில் சாவி ஒப்படைப்பு",
    },
    {
      id: "durainagar-casting",
      titleEn: "Boom-Placer Mechanized Slab Casting",
      titleTa: "மெஷின் மூலம் தளம் போடுதல்",
      location: "Durainagar Site",
      image: "/images/fb-projects/fb-2593310028926711/image_001.jpg",
      tagEn: "Laser Leveling & M25 Concrete",
      tagTa: "M25 கான்கிரீட் & துல்லிய தளம்",
    },
  ];

  const [activeProjectIdx, setActiveProjectIdx] = useState(0);

  // Auto-rotate hero project background smoothly every 6 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveProjectIdx((prev) => (prev + 1) % realProjects.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [realProjects.length]);

  const currentProject = realProjects[activeProjectIdx];

  const verifiedHighlights = [
    {
      labelEn: "10+ Years Experience",
      labelTa: "10+ ஆண்டுகள் கள அனுபவம்",
      subEn: "Civil Engineering Excellence",
      subTa: "உண்மையான தரம்",
      icon: Award,
    },
    {
      labelEn: "Direct Er. Stalin Supervision",
      labelTa: "பொறியாளர் நேரடி மேற்பார்வை",
      subEn: "B.E. Civil Engineering",
      subTa: "இடைத்தரகர்கள் இல்லை",
      icon: ShieldCheck,
    },
    {
      labelEn: "NABL Certified Materials",
      labelTa: "பரிசோதிக்கப்பட்ட பொருட்கள்",
      subEn: "TATA Tiscon & Porotherm",
      subTa: "தர சான்றிதழ் பெற்றவை",
      icon: CheckCircle2,
    },
    {
      labelEn: "Headquarters: Samugarengapuram",
      labelTa: "தலைமையகம்: சாமுகரெங்கபுரம்",
      subEn: "Radhapuram, Tirunelveli",
      subTa: "நேரடி அலுவலகம்",
      icon: MapPin,
    },
  ];

  return (
    <section className="relative w-full min-h-[92vh] lg:min-h-screen bg-[#FAF8F5] overflow-hidden flex flex-col justify-between pt-24 sm:pt-28">
      
      {/* 1. CINEMATIC REAL PHOTOGRAPHY SHOWCASE (Right/Background on Desktop) */}
      <div className="absolute right-0 top-0 bottom-0 w-full lg:w-[56%] h-full z-0 overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentProject.id}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full h-full"
          >
            <Image
              src={currentProject.image}
              alt={currentProject.titleEn}
              fill
              priority
              className="object-cover object-center"
            />
            {/* Elegant luxury gradients */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-black/30" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#FAF8F5] via-transparent to-transparent lg:hidden" />
          </motion.div>
        </AnimatePresence>

        {/* Real Project Caption Pill at bottom right */}
        <div className="absolute bottom-6 right-6 sm:bottom-10 sm:right-10 z-20 hidden sm:block">
          <div className="bg-[#17191B]/85 backdrop-blur-md rounded-2xl p-3.5 border border-white/20 text-white max-w-xs shadow-2xl">
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#B78A52] block">
              {isTamil ? currentProject.tagTa : currentProject.tagEn}
            </span>
            <h4 className="text-xs sm:text-sm font-bold text-white mt-0.5">
              {isTamil ? currentProject.titleTa : currentProject.titleEn}
            </h4>
            <p className="text-[11px] text-slate-300 mt-0.5 flex items-center gap-1">
              <MapPin className="w-3 h-3 text-[#B78A52]" />
              <span>{currentProject.location}</span>
            </p>

            {/* Slide Indicators */}
            <div className="flex items-center gap-1.5 mt-2.5">
              {realProjects.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveProjectIdx(i)}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    activeProjectIdx === i ? "w-5 bg-[#B78A52]" : "w-1.5 bg-white/40 hover:bg-white/70"
                  }`}
                  aria-label={`Slide ${i + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 2. SUBTLE ARCHITECTURAL CURVE DIVIDER (Desktop) */}
      <div className="absolute inset-0 z-[1] pointer-events-none hidden lg:block overflow-hidden">
        <svg
          className="absolute left-0 top-0 h-full w-[52%] text-[#FAF8F5] fill-current drop-shadow-sm"
          viewBox="0 0 750 1000"
          preserveAspectRatio="none"
        >
          <path d="M0,0 L600,0 C670,180 710,360 660,540 C610,720 540,860 480,1000 L0,1000 Z" />
        </svg>
      </div>

      {/* 3. FOREGROUND MAIN CONTENT */}
      <div className="relative z-10 max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-16 w-full my-auto py-10 lg:py-16">
        <div className="max-w-xl sm:max-w-2xl space-y-6 sm:space-y-7">
          
          {/* Eyebrow Badge */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-3"
          >
            <span className="h-[2px] w-8 bg-[#B78A52] block" />
            <span className="text-[11px] sm:text-xs font-mono font-bold uppercase tracking-[0.22em] text-[#B78A52]">
              {isTamil ? "சிவில் பொறியியல் & கட்டுமானம் • திருநெல்வேலி" : "CIVIL ENGINEERING & CONSTRUCTION • TIRUNELVELI"}
            </span>
          </motion.div>

          {/* Canonical Headline as explicitly required */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="space-y-1"
          >
            <h1 className="text-3xl sm:text-5xl lg:text-[4rem] font-black text-[#17191B] tracking-tight leading-[1.08] font-sans">
              {isTamil ? (
                <>
                  உங்கள் கனவு வீடு, <br />
                  <span className="text-[#B78A52]">எங்கள் பொறுப்பு.</span>
                </>
              ) : (
                <>
                  Your Dream Home, <br />
                  <span className="text-[#B78A52]">Our Responsibility.</span>
                </>
              )}
            </h1>
            <p className="text-xs sm:text-sm font-serif italic text-slate-700 pt-1">
              Jancy Builders — Samugarengapuram, Tirunelveli
            </p>
          </motion.div>

          {/* Supporting Copy */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-slate-700 text-sm sm:text-base max-w-lg leading-relaxed font-normal"
          >
            {isTamil
              ? "திருநெல்வேலி மற்றும் தென் தமிழகத்தில் நேர்மையான பொறியியல், வாஸ்து முறை திட்டமிடல் மற்றும் தரமான வீட்டு கட்டுமானம். தலைமைப் பொறியாளர் Er. சகாய அந்தோணி ஸ்டாலின் நேரடி கள மேற்பார்வை."
              : "Professional civil engineering, architectural design, and turnkey residential construction across Tirunelveli and South Tamil Nadu. Supervised on-site by Er. Sahaya Antony Stalin, B.E. (Civil)."}
          </motion.p>

          {/* 3 Main Action Buttons as explicitly requested */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="flex flex-wrap items-center gap-3 sm:gap-4 pt-1"
          >
            {/* Button 1: View Our Projects / எங்கள் பணிகளைப் பாருங்கள் */}
            <a
              href="#projects"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-[#17191B] hover:bg-[#25282B] text-white text-xs sm:text-sm font-bold shadow-lg shadow-black/10 transition-all hover:scale-105 active:scale-95"
            >
              <span>{isTamil ? "எங்கள் பணிகளைப் பாருங்கள்" : "View Our Projects"}</span>
              <ArrowRight className="w-4 h-4 text-[#B78A52]" />
            </a>

            {/* Button 2: Get Construction Estimate / கட்டுமான செலவை அறிய */}
            <a
              href="#estimator"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-[#B78A52] hover:bg-[#9e743d] text-white text-xs sm:text-sm font-bold shadow-md transition-all hover:scale-105 active:scale-95"
            >
              <Calculator className="w-4 h-4" />
              <span>{isTamil ? "கட்டுமான செலவை அறிய" : "Get Construction Estimate"}</span>
            </a>

            {/* Button 3: Contact Our Engineer / எங்கள் பொறியாளரைத் தொடர்புகொள்ள */}
            <a
              href="#engineer"
              className="inline-flex items-center gap-2 px-5 py-3.5 rounded-full bg-white hover:bg-slate-50 text-slate-900 border border-slate-300 text-xs sm:text-sm font-bold shadow-sm transition-all hover:scale-105 active:scale-95"
            >
              <Phone className="w-4 h-4 text-[#B78A52]" />
              <span>{isTamil ? "எங்கள் பொறியாளரைத் தொடர்புகொள்ள" : "Contact Our Engineer"}</span>
            </a>
          </motion.div>

          {/* 4 Verified Company Facts (No Fake Statistics) */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45, duration: 0.6 }}
            className="pt-6 grid grid-cols-2 sm:grid-cols-4 gap-4 border-t border-slate-200/90 max-w-xl"
          >
            {verifiedHighlights.map((fact, i) => {
              const Icon = fact.icon;
              return (
                <div key={i} className="flex flex-col space-y-1">
                  <div className="w-7 h-7 rounded-lg bg-[#B78A52]/10 text-[#B78A52] flex items-center justify-center">
                    <Icon className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-xs font-bold text-slate-950 leading-tight">
                    {isTamil ? fact.labelTa : fact.labelEn}
                  </span>
                  <span className="text-[10px] text-slate-500 font-medium">
                    {isTamil ? fact.subTa : fact.subEn}
                  </span>
                </div>
              );
            })}
          </motion.div>

        </div>
      </div>

      {/* Mobile-Only Real Projects Mini Strip */}
      <div className="lg:hidden w-full bg-slate-900 text-white p-4 flex items-center justify-between text-xs z-10 border-t border-white/10">
        <div className="flex items-center gap-2 truncate">
          <span className="w-2 h-2 rounded-full bg-[#B78A52]" />
          <span className="font-semibold truncate">
            {isTamil ? currentProject.titleTa : currentProject.titleEn}
          </span>
        </div>
        <span className="text-[11px] text-slate-400 font-mono flex-shrink-0">
          {currentProject.location}
        </span>
      </div>

    </section>
  );
}
