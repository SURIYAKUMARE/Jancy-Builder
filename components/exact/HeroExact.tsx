"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import {
  ArrowRight,
  Calculator,
  HardHat,
  Phone,
  ShieldCheck,
  Building,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  MapPin,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";

interface HeroExactProps {
  onOpenQuote: () => void;
  onOpenAppointment?: () => void;
}

export default function HeroExact({
  onOpenQuote,
  onOpenAppointment,
}: HeroExactProps) {
  const { language, isTamil } = useLanguage();

  // Authentic project showcases from D:\project photo catalog
  const realHeroSlides = [
    {
      id: 1,
      image: "/images/hero-sunset-villa.jpg",
      titleEn: "Turnkey Contemporary Villa",
      titleTa: "டர்ன்கீ நவீன ஆடம்பர வில்லா",
      locationEn: "Silathikulam Handover",
      locationTa: "சிலத்திகுளம் பணி நிறைவு",
      tagEn: "100% Completed Project",
      tagTa: "முழுமையாக கட்டி முடிக்கப்பட்ட வீடு",
    },
    {
      id: 2,
      image: "/images/fb-projects/fb-2593310028926711/image_001.jpg",
      titleEn: "Mechanized Concrete Roof Slab Casting",
      titleTa: "பூம் பிளேசர் மூலம் தளம் அமைக்கும் பணி",
      locationEn: "Durainagar Site Work",
      locationTa: "துரைநகர் நேரடி களப் பணி",
      tagEn: "Active Construction Site",
      tagTa: "நேரடி கட்டுமான தளம்",
    },
    {
      id: 3,
      image: "/images/fb-projects/fb-4017946504755476/image_001.jpg",
      titleEn: "Porotherm Eco-Thermal Brick Masonry",
      titleTa: "போரோதெர்ம் வெப்பத் தடுப்பு செங்கல் சுவர்",
      locationEn: "Samugarengapuram Project",
      locationTa: "சாமுகரெங்கபுரம் பணி",
      tagEn: "Natural Cooling Technology",
      tagTa: "இயற்கை குளிர்ச்சி தொழில்நுட்பம்",
    },
    {
      id: 4,
      image: "/images/fb-projects/fb-2866252757935105/image_001.jpg",
      titleEn: "Foundation & Plinth Beam Alignment",
      titleTa: "அடித்தளம் & பேஸ்மென்ட் பீம் கட்டமைப்பு",
      locationEn: "Tirunelveli Region",
      locationTa: "திருநெல்வேலி பகுதி",
      tagEn: "IS 456 Structural Safety",
      tagTa: "இந்திய தர விதிமுறை கட்டமைப்பு",
    },
  ];

  const [activeSlide, setActiveSlide] = useState(0);

  // Auto-advance cinematic slides smoothly
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % realHeroSlides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [realHeroSlides.length]);

  const currentSlide = realHeroSlides[activeSlide];

  return (
    <section className="relative w-full min-h-[92vh] lg:min-h-screen bg-[#0F172A] text-white flex flex-col justify-between pt-24 sm:pt-28 overflow-hidden">
      
      {/* 1. CINEMATIC REAL PHOTOGRAPHY BACKGROUND (Crossfade) */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide.id}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="relative w-full h-full"
          >
            <Image
              src={currentSlide.image}
              alt={isTamil ? currentSlide.titleTa : currentSlide.titleEn}
              fill
              priority
              className="object-cover object-center"
            />
            {/* Cinematic architectural overlays for contrast and readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A] via-[#0F172A]/60 to-[#0F172A]/40" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0F172A]/90 via-[#0F172A]/50 to-transparent" />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* 2. FOREGROUND CONTENT */}
      <div className="relative z-10 max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 w-full my-auto py-12 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left Column: Headings & 3 Main Buttons (Requested by user) */}
          <div className="lg:col-span-8 space-y-6 sm:space-y-8 max-w-2xl">
            
            {/* Eyebrow badge */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-black/40 backdrop-blur-md border border-[#B78A52]/40"
            >
              <HardHat className="w-3.5 h-3.5 text-[#B78A52]" />
              <span className="text-[11px] sm:text-xs font-mono font-bold tracking-[0.2em] text-[#E7C188] uppercase">
                {isTamil
                  ? "நேர்மையான சிவில் பொறியியல் • சாமுகரெங்கபுரம்"
                  : "PROFESSIONAL CIVIL ENGINEERING • EST. 2016"}
              </span>
            </motion.div>

            {/* EXACT HEADINGS REQUESTED BY USER */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.7 }}
              className="space-y-2"
            >
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-white tracking-tight leading-[1.08] font-sans drop-shadow-md">
                {isTamil ? "உங்கள் கனவு வீடு," : "Your Dream Home,"}
                <span className="block text-[#E7C188]">
                  {isTamil ? "எங்கள் பொறுப்பு." : "Our Responsibility."}
                </span>
              </h1>

              <p className="text-sm sm:text-base lg:text-lg text-slate-200 leading-relaxed font-normal pt-2 max-w-xl">
                {isTamil
                  ? "தலைமை சிவில் பொறியாளர் Er. சகாய அந்தோணி ஸ்டாலின் (B.E. Civil) அவர்களின் நேரடி கள மேற்பார்வையில், உறுதியான அஸ்திவாரம் முதல் அழகான பினிஷிங் வரை முழுமையான டர்ன்கீ கட்டுமானம்."
                  : "Supervised personally on-site by Er. Sahaya Antony Stalin, B.E. (Civil). From structural soil testing and Vastu planning to turnkey construction with Porotherm eco-thermal clay bricks."}
              </p>
            </motion.div>

            {/* EXACT 3 MAIN BUTTONS REQUESTED BY USER */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.7 }}
              className="flex items-center flex-wrap gap-3.5 sm:gap-4 pt-2"
            >
              {/* Button 1: View Our Projects / எங்கள் பணிகளைப் பாருங்கள் */}
              <a
                href="#projects"
                className="group relative inline-flex items-center gap-2.5 bg-[#B78A52] hover:bg-[#a37742] text-slate-950 text-xs sm:text-sm font-bold px-6 py-3.5 rounded-full shadow-lg shadow-[#B78A52]/25 transition-all hover:scale-105 active:scale-95"
              >
                <span>{isTamil ? "எங்கள் பணிகளைப் பாருங்கள்" : "View Our Projects"}</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
              </a>

              {/* Button 2: Get Construction Estimate / கட்டுமான செலவை அறிய */}
              <a
                href="#estimator"
                className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white text-xs sm:text-sm font-bold px-6 py-3.5 rounded-full border border-white/20 backdrop-blur-md transition-all hover:scale-105 active:scale-95 shadow-md"
              >
                <Calculator className="w-4 h-4 text-[#B78A52]" />
                <span>{isTamil ? "கட்டுமான செலவை அறிய" : "Get Construction Estimate"}</span>
              </a>

              {/* Button 3: Contact Our Engineer / எங்கள் பொறியாளரைத் தொடர்புகொள்ள */}
              <a
                href="#engineer"
                className="inline-flex items-center gap-2 bg-slate-900/80 hover:bg-slate-900 text-slate-200 hover:text-white text-xs sm:text-sm font-semibold px-5 py-3.5 rounded-full border border-slate-700 transition-all hover:scale-105 active:scale-95"
              >
                <Phone className="w-4 h-4 text-[#B78A52]" />
                <span>{isTamil ? "எங்கள் பொறியாளரைத் தொடர்புகொள்ள" : "Contact Our Engineer"}</span>
              </a>
            </motion.div>

            {/* Verified Engineer Credential Strip */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.35, duration: 0.8 }}
              className="pt-4 flex items-center flex-wrap gap-4 sm:gap-6 border-t border-white/10 text-xs text-slate-300"
            >
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span className="font-semibold text-white">Er. Sahaya Antony Stalin, B.E. (Civil)</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#B78A52]" />
                <span>8+ Years Direct Supervision</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-slate-400" />
                <span>Jancy Home, Samugarengapuram</span>
              </div>
            </motion.div>

          </div>

          {/* Right Column: Active Project Snapshot Card with Slide Controls */}
          <div className="lg:col-span-4 hidden sm:block">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.25, duration: 0.8 }}
              className="bg-black/60 backdrop-blur-md p-5 rounded-3xl border border-white/20 shadow-2xl max-w-sm ml-auto space-y-4"
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-[#B78A52]/20 text-[#E7C188] border border-[#B78A52]/40">
                  {isTamil ? currentSlide.tagTa : currentSlide.tagEn}
                </span>
                <span className="text-xs font-mono text-slate-400">
                  {activeSlide + 1} / {realHeroSlides.length}
                </span>
              </div>

              <div>
                <h4 className="text-base font-bold text-white leading-tight">
                  {isTamil ? currentSlide.titleTa : currentSlide.titleEn}
                </h4>
                <p className="text-xs text-slate-300 mt-1 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#B78A52]" />
                  <span>{isTamil ? currentSlide.locationTa : currentSlide.locationEn}</span>
                </p>
              </div>

              {/* Progress bar dots and nav buttons */}
              <div className="flex items-center justify-between pt-2 border-t border-white/10">
                <div className="flex items-center gap-1.5">
                  {realHeroSlides.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveSlide(i)}
                      className={`h-1.5 rounded-full transition-all duration-300 ${
                        activeSlide === i ? "w-6 bg-[#B78A52]" : "w-1.5 bg-white/30 hover:bg-white/50"
                      }`}
                      aria-label={`Go to photo ${i + 1}`}
                    />
                  ))}
                </div>

                <div className="flex items-center gap-1">
                  <button
                    onClick={() =>
                      setActiveSlide(
                        (prev) => (prev - 1 + realHeroSlides.length) % realHeroSlides.length
                      )
                    }
                    className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
                    aria-label="Previous photograph"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setActiveSlide((prev) => (prev + 1) % realHeroSlides.length)}
                    className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
                    aria-label="Next photograph"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          </div>

        </div>
      </div>

      {/* Bottom Bar: Quick links strip */}
      <div className="relative z-10 bg-slate-950/80 backdrop-blur-md border-t border-white/10 py-3 px-4 sm:px-8">
        <div className="max-w-[1440px] mx-auto flex items-center justify-between text-xs text-slate-300 flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-semibold text-white">
              {isTamil ? "அலுவலக நேரம்: " : "Office Hours: "}
            </span>
            <span>Mon – Sat: 9:00 AM – 7:30 PM (Sun: By Appointment)</span>
          </div>

          <div className="flex items-center gap-4">
            <a
              href="tel:+917708247124"
              className="hover:text-[#E7C188] transition-colors font-mono font-bold"
            >
              +91 77082 47124
            </a>
            <span className="text-slate-600">|</span>
            <a
              href="#office"
              className="text-[#E7C188] hover:underline font-semibold"
            >
              {isTamil ? "அலுவலகத்திற்கு வருக →" : "Visit Jancy Home →"}
            </a>
          </div>
        </div>
      </div>

    </section>
  );
}
