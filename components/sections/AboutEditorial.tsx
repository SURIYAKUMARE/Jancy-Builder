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
  MapPin,
  ExternalLink,
  Sparkles,
} from "lucide-react";
import { motion } from "framer-motion";

interface AboutEditorialProps {
  onOpenQuote: () => void;
}

export default function AboutEditorial({ onOpenQuote }: AboutEditorialProps) {
  const stats = [
    { label: "Engineering Leadership", value: "10+ Yrs", detail: "Er. Sahaya Antony Stalin, B.E. (Civil)" },
    { label: "Site Supervision", value: "100%", detail: "Direct personal engineer inspection" },
    { label: "Certified Materials", value: "NABL", detail: "Tata Tiscon Fe550D & Porotherm Clay" },
    { label: "Pricing Transparency", value: "Zero Hidden", detail: "Itemized BOQ without unexpected costs" },
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
    <section id="about" className="relative py-24 lg:py-32 bg-[#F8F6F1] border-t border-b border-[#E2D9CC] overflow-hidden">
      {/* Background Architectural Grid Accent */}
      <div className="absolute inset-0 opacity-15 pointer-events-none bg-[linear-gradient(to_right,#B78A52_1px,transparent_1px),linear-gradient(to_bottom,#B78A52_1px,transparent_1px)] bg-[size:5rem_5rem]" />

      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16 relative z-10">
        
        {/* Editorial Section Header */}
        <div className="max-w-3xl mb-16 lg:mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/90 border border-[#B78A52]/20 text-[11px] font-mono uppercase tracking-[0.25em] text-[#B78A52] font-semibold shadow-sm mb-4">
            <Compass className="w-3.5 h-3.5 text-[#B78A52]" />
            <span>ESTABLISHED 2016 • SAMUGARENGAPURAM, TAMIL NADU</span>
          </div>

          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black text-[#17191B] tracking-tight leading-[1.08] font-sans">
            A Decade of Civil Engineering &amp;{" "}
            <span className="text-[#B78A52] inline-block font-serif italic font-normal">Architectural Precision</span>
          </h2>

          <p className="mt-5 text-base sm:text-lg text-[#202124]/80 leading-relaxed font-normal">
            At Jancy Builders, we believe a home is not just an assembly of concrete and bricks—it is a lifelong generational sanctuary. Guided by Chief Civil Engineer <span className="font-semibold text-[#17191B]">Er. Sahaya Antony Stalin</span>, we merge architectural artistry with uncompromising structural engineering across Tamil Nadu.
          </p>
        </div>

        {/* 2-Column Editorial Spread */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Story, Founder Quote & Pillars (7 Cols) */}
          <div className="lg:col-span-7 space-y-8">
            {/* Founder Quote Card */}
            <div className="relative bg-white rounded-3xl p-8 sm:p-10 border border-[#E2D9CC] shadow-xl shadow-black/5">
              <div className="absolute top-6 right-8 text-6xl text-[#B78A52]/20 font-serif select-none pointer-events-none">
                &ldquo;
              </div>

              <p className="text-base sm:text-lg text-[#202124] italic leading-relaxed relative z-10 font-serif">
                &ldquo;In civil engineering, trust isn&apos;t claimed—it&apos;s poured into every foundation footing, verified in every cube compression test, and delivered on the exact promised handover date without hidden cost escalations.&rdquo;
              </p>

              <div className="mt-6 pt-6 border-t border-[#E2D9CC]/60 flex items-center justify-between flex-wrap gap-4">
                <div>
                  <h4 className="text-base font-bold text-[#17191B] font-sans tracking-tight">
                    Er. Sahaya Antony Stalin, B.E. (Civil)
                  </h4>
                  <p className="text-xs font-mono uppercase tracking-wider text-[#B78A52] font-semibold mt-0.5">
                    Founder &amp; Chief Structural Consultant
                  </p>
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#B78A52]/10 text-[#B78A52] text-xs font-semibold border border-[#B78A52]/20">
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
                    className="p-5 rounded-2xl bg-white/80 hover:bg-white border border-[#E2D9CC] transition-all duration-300 shadow-sm hover:shadow-md hover:border-[#B78A52]/40"
                  >
                    <div className="w-9 h-9 rounded-xl bg-[#B78A52]/10 text-[#B78A52] flex items-center justify-center mb-3">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h5 className="text-sm font-bold text-[#17191B] leading-snug">
                      {pillar.title}
                    </h5>
                    <p className="text-xs text-[#202124]/70 leading-relaxed mt-1.5">
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
                className="inline-flex items-center gap-2.5 bg-[#17191B] hover:bg-[#B78A52] text-white font-semibold text-sm px-6 py-3.5 rounded-full shadow-lg shadow-black/10 transition-all border border-[#B78A52]/30"
              >
                <span>Schedule Free Site Consultation</span>
                <ArrowRight className="w-4 h-4 text-[#B78A52] group-hover:text-white" />
              </motion.button>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#20ba5a] text-white font-semibold text-sm px-5 py-3.5 rounded-full shadow-md transition-all"
              >
                <MessageCircle className="w-4 h-4 fill-current" />
                <span>WhatsApp Engineer Stalin</span>
              </a>

              <a
                href="tel:+917708247124"
                className="inline-flex items-center gap-2 bg-white hover:bg-[#F8F6F1] border border-[#E2D9CC] text-[#17191B] font-semibold text-sm px-5 py-3.5 rounded-full shadow-sm transition-all"
              >
                <Phone className="w-4 h-4 text-[#B78A52]" />
                <span>+91 77082 47124</span>
              </a>
            </div>
          </div>

          {/* Right Column: Architectural Visual & Badges (5 Cols) */}
          <div className="lg:col-span-5 relative">
            {/* Decorative Frame Border */}
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-[#17191B]">
              <div className="relative aspect-[4/5] w-full">
                <Image
                  src="/images/projects/site-silathikulam-murugan.jpg"
                  alt="Jancy Builders Handover - Mr. Murugan Residence"
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
              </div>

              {/* Bottom Overlay Label */}
              <div className="absolute bottom-0 inset-x-0 p-6 sm:p-8 text-white">
                <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#B78A52] font-bold block mb-1">
                  AUTHENTIC CLIENT HANDOVER
                </span>
                <h3 className="text-xl sm:text-2xl font-bold font-sans text-white leading-tight">
                  Mr. Murugan Residence Handover
                </h3>
                <p className="text-xs text-slate-300 mt-1 line-clamp-2">
                  Precision-engineered contemporary villa handed over ceremonially on-schedule in Silathikulam, supervised directly by Er. Sahaya Antony Stalin.
                </p>

                <div className="mt-4 flex items-center gap-3">
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-400 bg-emerald-950/70 border border-emerald-500/30 px-3 py-1 rounded-full">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Handed Over On-Schedule</span>
                  </div>
                  <span className="text-xs text-slate-400 font-mono">Silathikulam, TN</span>
                </div>
              </div>
            </div>

            {/* Floating Experience Badge */}
            <div className="absolute -top-6 -left-6 sm:-left-8 bg-[#17191B] text-white p-4 sm:p-5 rounded-2xl shadow-2xl border border-white/10 hidden sm:flex items-center gap-4 max-w-xs">
              <div className="w-12 h-12 rounded-xl bg-[#B78A52] text-white font-black text-xl flex items-center justify-center flex-shrink-0">
                8+
              </div>
              <div>
                <p className="text-xs font-bold text-white uppercase tracking-wider">Years of Trust</p>
                <p className="text-[11px] text-slate-400 mt-0.5">250+ Timely Turnkey Handovers</p>
              </div>
            </div>

            {/* Floating Quality Assurance Seal */}
            <div className="absolute -bottom-6 -right-4 sm:-right-6 bg-white text-[#17191B] p-4 rounded-2xl shadow-xl border border-[#E2D9CC] flex items-center gap-3 max-w-[240px]">
              <div className="w-10 h-10 rounded-full bg-[#B78A52]/10 text-[#B78A52] flex items-center justify-center flex-shrink-0">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <p className="text-xs font-bold text-[#17191B]">10-Year Warranty</p>
                <p className="text-[10px] text-slate-500">Comprehensive Structural &amp; Waterproofing</p>
              </div>
            </div>
          </div>
        </div>

        {/* Active Work Sites Live Bar */}
        <div className="mt-16 p-6 sm:p-8 rounded-3xl bg-white border border-[#E2D9CC] shadow-xl shadow-black/5">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-100">
            <div className="flex items-center gap-2.5">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#B78A52]">
                ACTIVE WORK SITES • TIRUNELVELI DISTRICT
              </span>
            </div>
            <a
              href="https://www.facebook.com/JancyBuilder/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#1877F2] hover:text-[#0e5fc7] transition-colors"
            >
              <span>Follow Live Construction on Facebook</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 rounded-2xl bg-[#F8F6F1] border border-[#E2D9CC]">
              <div className="flex items-center gap-1.5 text-[11px] font-bold text-amber-700 font-mono">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                <span>RCC SLAB POURING</span>
              </div>
              <h5 className="text-sm font-bold text-[#17191B] mt-1">Durainagar Site</h5>
              <p className="text-xs text-slate-600 mt-0.5">Mr. Praveen &amp; Naveen Residence</p>
            </div>

            <div className="p-4 rounded-2xl bg-[#F8F6F1] border border-[#E2D9CC]">
              <div className="flex items-center gap-1.5 text-[11px] font-bold text-emerald-700 font-mono">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                <span>POROTHERM BRICKS</span>
              </div>
              <h5 className="text-sm font-bold text-[#17191B] mt-1">Samugarengapuram Site</h5>
              <p className="text-xs text-slate-600 mt-0.5">Mr. Srinivas Eco Thermal Villa</p>
            </div>

            <div className="p-4 rounded-2xl bg-[#F8F6F1] border border-[#E2D9CC]">
              <div className="flex items-center gap-1.5 text-[11px] font-bold text-blue-700 font-mono">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                <span>BOOMI POOJA &amp; FOOTING</span>
              </div>
              <h5 className="text-sm font-bold text-[#17191B] mt-1">Ammachikovil Site</h5>
              <p className="text-xs text-slate-600 mt-0.5">Samugarengapuram Villa Inception</p>
            </div>

            <div className="p-4 rounded-2xl bg-[#F8F6F1] border border-[#E2D9CC]">
              <div className="flex items-center gap-1.5 text-[11px] font-bold text-emerald-700 font-mono">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>COMPLETED HANDOVER</span>
              </div>
              <h5 className="text-sm font-bold text-[#17191B] mt-1">Silathikulam Site</h5>
              <p className="text-xs text-slate-600 mt-0.5">Mr. Murugan Residence Handover</p>
            </div>
          </div>
        </div>

        {/* 4 Stats Grid Bar */}
        <div className="mt-16 pt-10 border-t border-[#E2D9CC]">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {stats.map((s, idx) => (
              <div key={idx} className="p-5 rounded-2xl bg-white/90 border border-[#E2D9CC]">
                <div className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#17191B] tracking-tight font-sans">
                  {s.value}
                </div>
                <div className="text-xs font-bold uppercase tracking-wider text-[#B78A52] mt-1">
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
