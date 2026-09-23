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
} from "lucide-react";
import { motion } from "framer-motion";

interface AboutEditorialProps {
  onOpenQuote: () => void;
}

export default function AboutEditorial({ onOpenQuote }: AboutEditorialProps) {
  const stats = [
    { label: "Completed Projects", value: "250+", detail: "Villas, Duplexes & Commercial" },
    { label: "Delighted Clients", value: "500+", detail: "Across Tirunelveli & South TN" },
    { label: "Years of Excellence", value: "8+", detail: "Founded in 2016 by Er. Stalin" },
    { label: "Client Satisfaction", value: "4.8★", detail: "Verified Google & Client Reviews" },
  ];

  const engineeringPillars = [
    {
      icon: HardHat,
      title: "Direct Civil Engineering Leadership",
      desc: "Every project is supervised directly by Er. Sahaya Antony Stalin, B.E. Civil, ensuring zero compromise on structural specifications.",
    },
    {
      icon: ShieldCheck,
      title: "Fe550D TMT & Raft Foundations",
      desc: "Engineered for maximum seismic and soil settlement resilience using lab-tested high-grade cement and certified steel bars.",
    },
    {
      icon: FileCheck,
      title: "Itemized BOQ & Zero Hidden Costs",
      desc: "Complete transparency before a single brick is laid. Detailed Bill of Quantities guarantees no surprise budget escalations.",
    },
    {
      icon: Clock,
      title: "100% Guaranteed Handover Timelines",
      desc: "Milestone-backed construction schedules with transparent weekly WhatsApp video progress reports directly to homeowners.",
    },
  ];

  const whatsappMessage = encodeURIComponent(
    "Hello Er. Sahaya Antony Stalin, I reviewed the Jancy Builders profile and would like to schedule an architectural consultation and site inspection for my upcoming construction."
  );
  const whatsappUrl = `https://wa.me/917708247124?text=${whatsappMessage}`;

  return (
    <section id="about" className="relative py-24 lg:py-32 bg-[#F7F4EE] border-t border-b border-[#E8DFD1] overflow-hidden">
      {/* Background Architectural Grid Accent */}
      <div className="absolute inset-0 opacity-20 pointer-events-none bg-[linear-gradient(to_right,#E8DFD1_1px,transparent_1px),linear-gradient(to_bottom,#E8DFD1_1px,transparent_1px)] bg-[size:4rem_4rem]" />

      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16 relative z-10">
        
        {/* Editorial Section Header */}
        <div className="max-w-3xl mb-16 lg:mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/80 border border-[#E8DFD1] text-[11px] font-mono uppercase tracking-[0.25em] text-[#B88746] font-bold shadow-sm mb-4">
            <Compass className="w-3.5 h-3.5 text-[#B88746]" />
            <span>ESTABLISHED 2016 • SAMUGARENGAPURAM, TAMIL NADU</span>
          </div>

          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black text-[#111318] tracking-tight leading-[1.08] font-sans">
            A Decade of Civil Engineering &amp;{" "}
            <span className="text-[#B88746] inline-block">Architectural Precision</span>
          </h2>

          <p className="mt-5 text-base sm:text-lg text-slate-700 leading-relaxed font-normal">
            At Jancy Builders, we believe a home is not just an assembly of concrete and bricks—it is a lifelong generational sanctuary. Guided by Chief Civil Engineer <span className="font-semibold text-slate-900">Er. Sahaya Antony Stalin</span>, we merge architectural artistry with uncompromising structural engineering across Tamil Nadu.
          </p>
        </div>

        {/* 2-Column Editorial Spread */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Story, Founder Quote & Pillars (7 Cols) */}
          <div className="lg:col-span-7 space-y-8">
            {/* Founder Quote Card */}
            <div className="relative bg-white rounded-3xl p-8 sm:p-10 border border-[#E8DFD1] shadow-xl shadow-black/5">
              <div className="absolute top-6 right-8 text-6xl text-[#B88746]/20 font-serif select-none pointer-events-none">
                &ldquo;
              </div>

              <p className="text-base sm:text-lg text-slate-800 italic leading-relaxed relative z-10 font-serif">
                &ldquo;In civil engineering, trust isn&apos;t claimed—it&apos;s poured into every foundation footing, verified in every cube compression test, and delivered on the exact promised handover date without hidden cost escalations.&rdquo;
              </p>

              <div className="mt-6 pt-6 border-t border-slate-100 flex items-center justify-between flex-wrap gap-4">
                <div>
                  <h4 className="text-base font-bold text-slate-950 font-sans tracking-tight">
                    Er. Sahaya Antony Stalin, B.E. (Civil)
                  </h4>
                  <p className="text-xs font-mono uppercase tracking-wider text-[#B88746] font-semibold mt-0.5">
                    Founder &amp; Chief Structural Consultant
                  </p>
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#B88746]/10 text-[#B88746] text-xs font-semibold">
                  <Award className="w-3.5 h-3.5" />
                  <span>Licensed Civil Engineer</span>
                </div>
              </div>
            </div>

            {/* 4 Pillars Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {engineeringPillars.map((pillar, idx) => {
                const Icon = pillar.icon;
                return (
                  <div
                    key={idx}
                    className="p-5 rounded-2xl bg-white/70 hover:bg-white border border-[#E8DFD1] transition-all duration-300 shadow-sm hover:shadow-md"
                  >
                    <div className="w-9 h-9 rounded-xl bg-[#B88746]/10 text-[#B88746] flex items-center justify-center mb-3">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h5 className="text-sm font-bold text-slate-900 leading-snug">
                      {pillar.title}
                    </h5>
                    <p className="text-xs text-slate-600 leading-relaxed mt-1.5">
                      {pillar.desc}
                    </p>
                  </div>
                );
              })}
            </div>

            {/* CTA Action Row */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={onOpenQuote}
                className="inline-flex items-center gap-2.5 bg-[#B88746] hover:bg-[#a3753b] text-white font-bold text-sm px-6 py-3.5 rounded-full shadow-lg shadow-[#B88746]/20 transition-all"
              >
                <span>Schedule Free Site Consultation</span>
                <ArrowRight className="w-4 h-4" />
              </motion.button>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold text-sm px-5 py-3.5 rounded-full shadow-md transition-all"
              >
                <MessageCircle className="w-4 h-4 fill-current" />
                <span>WhatsApp Engineer Stalin</span>
              </a>

              <a
                href="tel:+917708247124"
                className="inline-flex items-center gap-2 bg-white hover:bg-slate-50 border border-slate-300 text-slate-800 font-semibold text-sm px-5 py-3.5 rounded-full shadow-sm transition-all"
              >
                <Phone className="w-4 h-4 text-[#B88746]" />
                <span>+91 77082 47124</span>
              </a>
            </div>
          </div>

          {/* Right Column: Architectural Visual & Badges (5 Cols) */}
          <div className="lg:col-span-5 relative">
            {/* Decorative Frame Border */}
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-slate-900">
              <div className="relative aspect-[4/5] w-full">
                <Image
                  src="/images/projects/luxury-villa.jpg"
                  alt="Jancy Builders Flagship Architectural Villa"
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              </div>

              {/* Bottom Overlay Label */}
              <div className="absolute bottom-0 inset-x-0 p-6 sm:p-8 text-white">
                <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#E8C59A] font-bold block mb-1">
                  FLAGSHIP RESIDENTIAL EXECUTION
                </span>
                <h3 className="text-xl sm:text-2xl font-bold font-sans text-white leading-tight">
                  The Modern Haven Villa
                </h3>
                <p className="text-xs text-slate-300 mt-1 line-clamp-2">
                  5,400 sq.ft contemporary residence with integrated rainwater harvesting, cantilevered RCC balconies, and custom Italian marble interiors.
                </p>

                <div className="mt-4 flex items-center gap-3">
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-400 bg-emerald-950/60 border border-emerald-500/30 px-3 py-1 rounded-full">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Handed Over On-Schedule</span>
                  </div>
                  <span className="text-xs text-slate-400 font-mono">Tirunelveli, TN</span>
                </div>
              </div>
            </div>

            {/* Floating Experience Badge */}
            <div className="absolute -top-6 -left-6 sm:-left-8 bg-[#111318] text-white p-4 sm:p-5 rounded-2xl shadow-2xl border border-white/10 hidden sm:flex items-center gap-4 max-w-xs">
              <div className="w-12 h-12 rounded-xl bg-[#B88746] text-black font-black text-xl flex items-center justify-center flex-shrink-0">
                8+
              </div>
              <div>
                <p className="text-xs font-bold text-white uppercase tracking-wider">Years of Trust</p>
                <p className="text-[11px] text-slate-400 mt-0.5">250+ Timely Turnkey Handaways</p>
              </div>
            </div>

            {/* Floating Quality Assurance Seal */}
            <div className="absolute -bottom-6 -right-4 sm:-right-6 bg-white text-slate-900 p-4 rounded-2xl shadow-xl border border-[#E8DFD1] flex items-center gap-3 max-w-[240px]">
              <div className="w-10 h-10 rounded-full bg-[#B88746]/10 text-[#B88746] flex items-center justify-center flex-shrink-0">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-950">10-Year Warranty</p>
                <p className="text-[10px] text-slate-500">Comprehensive Structural &amp; Waterproofing</p>
              </div>
            </div>
          </div>

        </div>

        {/* 4 Stats Grid Bar */}
        <div className="mt-20 pt-10 border-t border-[#E8DFD1]">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {stats.map((s, idx) => (
              <div key={idx} className="p-4 rounded-2xl bg-white/60 border border-[#E8DFD1]/80">
                <div className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#111318] tracking-tight font-sans">
                  {s.value}
                </div>
                <div className="text-xs font-bold uppercase tracking-wider text-[#B88746] mt-1">
                  {s.label}
                </div>
                <div className="text-[11px] text-slate-600 mt-0.5">
                  {s.detail}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
