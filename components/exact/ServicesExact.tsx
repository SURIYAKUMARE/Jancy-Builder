"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Home,
  Compass,
  Hammer,
  Sparkles,
} from "lucide-react";
import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import BlurText from "@/components/motion/BlurText";

interface ServicesExactProps {
  onOpenQuote: () => void;
}

export default function ServicesExact({ onOpenQuote }: ServicesExactProps) {
  const { isTamil } = useLanguage();

  const serviceCards = [
    {
      id: "residential",
      icon: Home,
      titleEn: "Home Construction",
      titleTa: "வீடு கட்டுமானம்",
      tagsEn: ["Residential", "Independent Houses", "Duplex"],
      tagsTa: ["குடியிருப்பு", "தனி வீடுகள்", "இரு அடுக்கு மாளிகை"],
      descriptionEn:
        "From foundation to finishing, explore our residential construction services and completed work.",
      descriptionTa:
        "அஸ்திவாரம் முதல் சாவி ஒப்படைப்பு வரை, தரமான குடியிருப்பு கட்டுமான சேவைகள் மற்றும் நிறைவுற்ற பணிகள்.",
      image: "/images/projects/site-silathikulam-murugan.jpg",
    },
    {
      id: "architecture",
      icon: Compass,
      titleEn: "Architectural & Engineering Services",
      titleTa: "வீட்டுத் திட்டம் மற்றும் பொறியியல் சேவைகள்",
      tagsEn: ["House Planning", "Structural Design", "Construction Guidance"],
      tagsTa: ["வாஸ்து வரைபடம்", "கட்டமைப்பு வடிவமைப்பு", "வழிகாட்டுதல்"],
      descriptionEn:
        "Understand your building plans, structural requirements, and important decisions before starting construction.",
      descriptionTa:
        "கட்டுமானம் தொடங்கும் முன் உங்கள் வீட்டு வரைபடம், தூண்களின் உறுதி மற்றும் அரசு அனுமதி வழிகாட்டுதல்கள்.",
      image: "/images/fb-projects/fb-2866252757935105/image_001.jpg",
    },
    {
      id: "renovation",
      icon: Hammer,
      titleEn: "Renovation & Other Services",
      titleTa: "வீடு புதுப்பித்தல் மற்றும் பிற சேவைகள்",
      tagsEn: ["Renovation", "Finishing", "Consultation"],
      tagsTa: ["புதுப்பித்தல்", "உள்தள வேலைகள்", "நேரடி ஆலோசனை"],
      descriptionEn:
        "Explore renovation, improvement, and other construction services available from our team.",
      descriptionTa:
        "பழைய வீடுகளை நவீனமாக புதுப்பித்தல், கூடுதல் தளம் அமைத்தல் மற்றும் பிரத்யேக சிவில் பொறியியல் சேவைகள்.",
      image: "/images/projects/site-samugarengapuram-porotherm.jpg",
    },
  ];

  return (
    <section
      id="services"
      className="relative w-full min-h-screen py-24 sm:py-32 bg-black text-white flex flex-col justify-center overflow-hidden scroll-mt-20"
    >
      {/* 1. CINEMATIC FULLSCREEN BACKGROUND WITH ATMOSPHERIC VIGNETTE */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/projects/site-silathikulam-murugan.jpg"
          alt="Jancy Builders Construction Services"
          fill
          className="object-cover object-center opacity-25 filter blur-[2px] transform scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black/85 to-black" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16 space-y-4">
          {/* Section Label: // What We Do */}
          <div className="inline-flex items-center gap-2 font-mono text-xs text-[#C9A46B] uppercase tracking-[0.25em]">
            <span>{isTamil ? "// எங்கள் சேவைகள்" : "// What We Do"}</span>
          </div>

          {/* Large Italic Heading: Building Spaces, Creating Futures. */}
          {isTamil ? (
            <BlurText
              text="கனவு இல்லங்களை உருவாக்குகிறோம்."
              as="h2"
              isTamil={true}
              className="text-3xl sm:text-5xl lg:text-6xl font-tamil font-black text-white tracking-tight"
            />
          ) : (
            <BlurText
              text="Building Spaces, Creating Futures."
              as="h2"
              italic={true}
              className="text-4xl sm:text-6xl lg:text-7xl font-heading font-normal text-white tracking-tight leading-[1.08]"
            />
          )}

          <p className="text-sm sm:text-base text-white/70 max-w-2xl font-body leading-relaxed">
            {isTamil
              ? "தலைமை சிவில் பொறியாளர் Er. சகாய அந்தோணி ஸ்டாலின் நேரடி மேற்பார்வையில், தென் தமிழகத்தில் உங்கள் குடும்பத்திற்கான வாழ்நாள் இல்லங்களை உருவாக்குகிறோம்."
              : "Personally supervised by Chief Civil Engineer Er. Sahaya Antony Stalin, we bring precision engineering and architectural clarity to every build across South Tamil Nadu."}
          </p>
        </div>

        {/* 3 Transparent Liquid-Glass Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 items-stretch font-body">
          {serviceCards.map((card, idx) => {
            const Icon = card.icon;
            const tags = isTamil ? card.tagsTa : card.tagsEn;
            const title = isTamil ? card.titleTa : card.titleEn;
            const desc = isTamil ? card.descriptionTa : card.descriptionEn;

            return (
              <motion.div
                key={card.id}
                initial={{ opacity: 0, y: 35 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ delay: idx * 0.15, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="group relative rounded-[1.25rem] p-6 sm:p-7 min-h-[380px] liquid-glass hover:border-[#C9A46B]/50 transition-all duration-300 flex flex-col justify-between overflow-hidden"
              >
                {/* Background Card Preview Image on Hover */}
                <div className="absolute inset-0 z-0 opacity-10 group-hover:opacity-20 transition-opacity duration-500 pointer-events-none">
                  <Image
                    src={card.image}
                    alt={title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent" />
                </div>

                {/* Card Top: Liquid-Glass Icon + Tags */}
                <div className="relative z-10 space-y-5">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-xl liquid-glass flex items-center justify-center text-[#C9A46B] group-hover:scale-110 group-hover:border-[#C9A46B]/40 transition-all">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[11px] font-mono text-white/40">
                      0{idx + 1}
                    </span>
                  </div>

                  {/* Rounded Category Tags */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {tags.map((tag, tIdx) => (
                      <span
                        key={tIdx}
                        className="px-2.5 py-0.5 rounded-full text-[10px] sm:text-[11px] font-mono font-medium tracking-wide bg-white/5 border border-white/10 text-white/80"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Large Card Title */}
                  <h3
                    className={`text-2xl sm:text-3xl text-white group-hover:text-[#E2C496] transition-colors leading-snug ${
                      isTamil ? "font-tamil font-bold" : "font-heading italic font-normal"
                    }`}
                  >
                    {title}
                  </h3>

                  {/* Short Description */}
                  <p className="text-xs sm:text-sm text-white/70 leading-relaxed font-body">
                    {desc}
                  </p>
                </div>

                {/* Card Bottom: Explore Arrow Button */}
                <div className="relative z-10 pt-6 mt-auto border-t border-white/10 flex items-center justify-between">
                  <button
                    onClick={onOpenQuote}
                    className="text-xs font-semibold text-white/90 group-hover:text-white flex items-center gap-2 transition-colors"
                  >
                    <span>{isTamil ? "விவரங்கள் அறிய" : "Explore Service"}</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#C9A46B] group-hover:translate-x-1.5 transition-transform" />
                  </button>
                  <span className="text-[10px] font-mono text-white/40 uppercase">
                    Jancy Builders
                  </span>
                </div>

              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
