"use client";

import React from "react";
import Image from "next/image";
import {
  ShieldCheck,
  Award,
  Clock,
  Compass,
  CheckCircle2,
  ArrowRight,
  Phone,
  MessageCircle,
  HardHat,
  FileCheck,
  ExternalLink,
} from "lucide-react";
import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import BlurText from "@/components/motion/BlurText";

interface AboutEditorialProps {
  onOpenQuote: () => void;
}

export default function AboutEditorial({ onOpenQuote }: AboutEditorialProps) {
  const { isTamil } = useLanguage();

  const stats = [
    {
      labelEn: "Engineering Leadership",
      labelTa: "தலைமைப் பொறியியல்",
      value: "10+ Yrs",
      detailEn: "Er. Sahaya Antony Stalin, B.E. (Civil)",
      detailTa: "அண்ணா பல்கலைக்கழக பொறியாளர்",
    },
    {
      labelEn: "Direct Site Inspection",
      labelTa: "நேரடி கள மேற்பார்வை",
      value: "100%",
      detailEn: "Direct personal engineer inspection",
      detailTa: "இடைத்தரகர்கள் இல்லை",
    },
    {
      labelEn: "Certified Materials",
      labelTa: "சான்றளிக்கப்பட்ட பொருட்கள்",
      value: "NABL",
      detailEn: "Tata Tiscon Fe550D & Porotherm Clay",
      detailTa: "டாடா ஸ்டீல் & போரோதெர்ம் செங்கல்",
    },
    {
      labelEn: "Pricing Transparency",
      labelTa: "விலை வெளிப்படைத்தன்மை",
      value: "Zero Hidden",
      detailEn: "Itemized BOQ without unexpected costs",
      detailTa: "திட்டமிட்ட பட்ஜெட்டில் சாவி ஒப்படைப்பு",
    },
  ];

  const engineeringPillars = [
    {
      icon: HardHat,
      titleEn: "Direct Civil Engineering Leadership",
      titleTa: "பொறியாளர் நேரடி மேற்பார்வை",
      descEn: "Every project is supervised directly by Er. Sahaya Antony Stalin, B.E. Civil, ensuring zero compromise on structural specifications.",
      descTa: "அஸ்திவாரம் முதல் தளம் வரை தலைமைப் பொறியாளர் நேரடியாக களத்தில் நின்று ஆய்வு செய்கிறார்.",
    },
    {
      icon: ShieldCheck,
      titleEn: "Fe550D TMT & Raft Foundations",
      titleTa: "உறுதியான அடித்தளம் & Fe550D கம்பிகள்",
      descEn: "Engineered for maximum seismic and soil settlement resilience using lab-tested high-grade cement and certified steel bars.",
      descTa: "மண் பரிசோதனைக்கு ஏற்ப நிலநடுக்கத்தை தாங்கும் கட்டமைப்பு மற்றும் ஆய்வக பரிசோதிக்கப்பட்ட கான்கிரீட்.",
    },
    {
      icon: FileCheck,
      titleEn: "Itemized BOQ & Zero Hidden Costs",
      titleTa: "விரிவான BOQ & மறைமுக செலவின்மை",
      descEn: "Complete transparency before a single brick is laid. Detailed Bill of Quantities guarantees no surprise budget escalations.",
      descTa: "ஒவ்வொரு பொருளுக்கும் விரிவான விலை பட்டியல் வழங்கப்பட்டு ஒப்புதல் பெற்ற பிறகே பணி தொடங்கப்படும்.",
    },
    {
      icon: Clock,
      titleEn: "100% Guaranteed Handover Timelines",
      titleTa: "குறிப்பிட்ட நாளில் சாவி ஒப்படைப்பு",
      descEn: "Milestone-backed construction schedules with transparent weekly WhatsApp video progress reports directly to homeowners.",
      descTa: "ஒப்பந்தத்தில் குறிப்பிட்ட நாளுக்குள் தரமான கட்டுமானத்துடன் சுப முகூர்த்தத்தில் சாவி ஒப்படைக்கப்படும்.",
    },
  ];

  const whatsappMessage = encodeURIComponent(
    isTamil
      ? "வணக்கம் Er. Stalin, ஜான்சி பில்டர்ஸ் நிறுவனத்தின் பொறியியல் மற்றும் கட்டுமான சேவைகள் குறித்து பேச விரும்புகிறேன்."
      : "Hello Er. Sahaya Antony Stalin, I reviewed the Jancy Builders profile and would like to schedule a site inspection for my upcoming construction."
  );
  const whatsappUrl = `https://wa.me/917708247124?text=${whatsappMessage}`;

  return (
    <section
      id="about"
      className="relative w-full bg-black py-24 sm:py-32 text-white overflow-hidden scroll-mt-20 font-body border-t border-white/10"
    >
      {/* Background Glow */}
      <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-[#C9A46B]/5 rounded-full blur-[170px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16 space-y-4 text-left">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full liquid-glass text-xs font-mono uppercase tracking-[0.25em] text-[#C9A46B] font-semibold">
            <Compass className="w-3.5 h-3.5" />
            <span>ESTABLISHED 2016 • SAMUGARENGAPURAM, TAMIL NADU</span>
          </div>

          {isTamil ? (
            <BlurText
              text="ஒரு தசாப்த கால பொறியியல் நம்பகத்தன்மை"
              as="h2"
              isTamil={true}
              className="text-3xl sm:text-5xl font-tamil font-black text-white tracking-tight"
            />
          ) : (
            <BlurText
              text="A Decade of Civil Engineering & Architectural Precision."
              as="h2"
              italic={true}
              className="text-4xl sm:text-6xl font-heading font-normal text-white tracking-tight leading-[1.08]"
            />
          )}

          <p className="text-sm sm:text-base text-white/70 leading-relaxed font-body">
            {isTamil
              ? "ஒரு வீடு என்பது வெறும் செங்கல் சுவர்கள் அல்ல—அது தலைமுறைகள் வாழும் குடும்ப ஆலயம். தலைமை சிவில் பொறியாளர் Er. சகாய அந்தோணி ஸ்டாலின் அவர்களின் தலைமையில், தரத்தில் சமரசம் செய்யாமல் நேர்மையான கட்டுமானத்தை உருவாக்குகிறோம்."
              : "At Jancy Builders, we believe a home is not just an assembly of concrete and bricks—it is a lifelong generational sanctuary. Guided by Chief Civil Engineer Er. Sahaya Antony Stalin, we merge architectural artistry with uncompromising structural engineering across Tamil Nadu."}
          </p>
        </div>

        {/* 2-Column Editorial Spread */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left Column (7 Cols): Story, Founder Quote & Pillars */}
          <div className="lg:col-span-7 space-y-6 text-left">
            {/* Founder Quote Card */}
            <div className="relative rounded-3xl p-6 sm:p-8 liquid-glass-strong border border-white/15 space-y-4">
              <p className="text-base sm:text-lg text-white/90 italic font-heading leading-relaxed">
                &ldquo;In civil engineering, trust isn&apos;t claimed—it&apos;s poured into every foundation footing, verified in every cube compression test, and delivered on the exact promised handover date without hidden cost escalations.&rdquo;
              </p>

              <div className="pt-4 border-t border-white/10 flex items-center justify-between flex-wrap gap-2">
                <div>
                  <h4 className="text-sm font-bold text-white font-body">
                    Er. Sahaya Antony Stalin, B.E. (Civil)
                  </h4>
                  <p className="text-[11px] font-mono uppercase tracking-wider text-[#C9A46B]">
                    Founder &amp; Chief Structural Consultant
                  </p>
                </div>
                <span className="text-[11px] font-mono text-emerald-400 bg-emerald-950/80 px-2.5 py-1 rounded-full border border-emerald-500/30">
                  Licensed Civil Engineer
                </span>
              </div>
            </div>

            {/* 4 Pillars Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {engineeringPillars.map((pillar, idx) => {
                const Icon = pillar.icon;
                return (
                  <div
                    key={idx}
                    className="p-5 rounded-2xl liquid-glass hover:border-[#C9A46B]/40 transition-all space-y-2"
                  >
                    <div className="w-9 h-9 rounded-xl liquid-glass flex items-center justify-center text-[#C9A46B]">
                      <Icon className="w-4 h-4" />
                    </div>
                    <h5 className="text-sm font-bold text-white">
                      {isTamil ? pillar.titleTa : pillar.titleEn}
                    </h5>
                    <p className="text-xs text-white/65 leading-relaxed font-body">
                      {isTamil ? pillar.descTa : pillar.descEn}
                    </p>
                  </div>
                );
              })}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={onOpenQuote}
                className="px-6 py-3.5 rounded-full bg-white hover:bg-[#E2C496] text-black text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-all hover:scale-105 active:scale-95 shadow-lg"
              >
                <span>{isTamil ? "கள ஆய்வு திட்டமிடுக" : "Schedule Site Inspection"}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-3.5 rounded-full bg-[#25D366]/20 hover:bg-[#25D366]/30 text-[#25D366] border border-[#25D366]/30 text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-all hover:scale-105 active:scale-95"
              >
                <MessageCircle className="w-3.5 h-3.5 fill-current" />
                <span>WhatsApp Stalin</span>
              </a>

              <a
                href="tel:+917708247124"
                className="px-5 py-3.5 rounded-full liquid-glass text-white hover:text-[#C9A46B] text-xs font-semibold uppercase tracking-wider flex items-center gap-2 transition-all hover:scale-105 active:scale-95"
              >
                <Phone className="w-3.5 h-3.5 text-[#C9A46B]" />
                <span>+91 77082 47124</span>
              </a>
            </div>
          </div>

          {/* Right Column (5 Cols): Handover Photo Showcase */}
          <div className="lg:col-span-5 relative">
            <div className="rounded-3xl overflow-hidden liquid-glass-strong border border-white/20 p-2 shadow-2xl">
              <div className="relative aspect-[4/5] w-full rounded-2xl overflow-hidden bg-zinc-900">
                <Image
                  src="/images/projects/site-silathikulam-murugan.jpg"
                  alt="Mr. Murugan Residence Handover"
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
                
                <div className="absolute bottom-4 inset-x-4 p-4 rounded-xl liquid-glass text-left space-y-1">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-[#C9A46B] font-bold block">
                    AUTHENTIC CLIENT HANDOVER
                  </span>
                  <h4 className="text-base font-bold text-white">
                    Mr. Murugan Residence
                  </h4>
                  <p className="text-[11px] text-white/70">
                    Handed over on-time in Silathikulam, supervised by Er. Stalin.
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* 4 Verified Stats Strip (No Fake Claims) */}
        <div className="mt-16 pt-10 border-t border-white/10 grid grid-cols-2 lg:grid-cols-4 gap-4 text-left">
          {stats.map((s, idx) => (
            <div key={idx} className="p-5 rounded-2xl liquid-glass space-y-1">
              <div className="text-2xl sm:text-3xl font-heading italic text-[#E2C496]">
                {s.value}
              </div>
              <div className="text-xs font-bold uppercase tracking-wider text-white">
                {isTamil ? s.labelTa : s.labelEn}
              </div>
              <div className="text-[11px] text-white/60">
                {isTamil ? s.detailTa : s.detailEn}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
