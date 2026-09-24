"use client";

import React, { useState } from "react";
import {
  MessageSquare,
  FileCheck,
  Compass,
  HardHat,
  ShieldCheck,
  Key,
  Star,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  Sparkles,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function ProcessTestimonialsExact() {
  const steps = [
    {
      num: "01",
      name: "Consultation",
      desc: "Client requirements, site inspection, and initial spatial concept.",
      icon: MessageSquare,
    },
    {
      num: "02",
      name: "Planning",
      desc: "Soil bearing capacity testing, Vastu layout, and municipal approvals.",
      icon: FileCheck,
    },
    {
      num: "03",
      name: "Design",
      desc: "3D architectural elevations, structural drawings, and itemized BOQ.",
      icon: Compass,
    },
    {
      num: "04",
      name: "Execution",
      desc: "Fe550D rebar casting, M25/M30 concrete, and precision masonry.",
      icon: HardHat,
    },
    {
      num: "05",
      name: "Quality Check",
      desc: "NABL concrete cube tests, 15 Bar plumbing line tests, and leveling.",
      icon: ShieldCheck,
    },
    {
      num: "06",
      name: "Handover",
      desc: "On-schedule ceremonial key handover with lifetime warranty documentation.",
      icon: Key,
    },
  ];

  const testimonials = [
    {
      id: 1,
      quote:
        "Jancy Builders completed our family residence in Silathikulam on the promised date without a single rupee of cost escalation. Er. Stalin ensured superior plastering, teakwood doors, and uncompromising structural strength.",
      author: "Mr. S. Murugan",
      location: "Silathikulam Handover",
      project: "Completed Duplex Villa",
      initials: "SM",
      rating: 5,
    },
    {
      id: 2,
      quote:
        "The choice of Wienerberger Porotherm clay bricks recommended by Chief Engineer Stalin was exceptional. The house stays naturally cool even during peak summer months in Tirunelveli.",
      author: "Mr. Srinivas",
      location: "Samugarengapuram",
      project: "Eco-Thermal Villa",
      initials: "SR",
      rating: 5,
    },
    {
      id: 3,
      quote:
        "Watching the concrete boom placer cast our roof slab with complete laser leveling gave our family 100% confidence. Their transparency and weekly updates are unmatched in our region.",
      author: "Mr. Praveen & Naveen",
      location: "Durainagar Site",
      project: "Contemporary Duplex",
      initials: "PN",
      rating: 5,
    },
  ];

  const [activeTestimonialIdx, setActiveTestimonialIdx] = useState(0);
  const currentTestimonial = testimonials[activeTestimonialIdx];

  const handlePrevTestimonial = () => {
    setActiveTestimonialIdx((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const handleNextTestimonial = () => {
    setActiveTestimonialIdx((prev) => (prev + 1) % testimonials.length);
  };

  return (
    <section id="process" className="w-full bg-[#FAFAFA] py-16 lg:py-24 border-t border-b border-gray-100 overflow-hidden scroll-mt-24">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* ========================================================================= */}
        {/* 1. CONSTRUCTION PROCESS TIMELINE (FULL WIDTH 6-STAGE TIMELINE)            */}
        {/* ========================================================================= */}
        <div className="mb-20">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-[11px] font-mono font-bold tracking-[0.25em] text-[#B88746] uppercase block mb-1">
              PROVEN EXECUTION WORKFLOW
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight font-sans">
              Our 6-Stage Construction Process
            </h2>
            <p className="mt-2 text-sm text-slate-500 leading-relaxed">
              From soil testing to key handover, every phase is engineered with unyielding precision and full client visibility.
            </p>
          </div>

          {/* Desktop Horizontal Timeline with progression line */}
          <div className="hidden lg:grid lg:grid-cols-6 gap-4 relative">
            {/* Connecting subtle line */}
            <div className="absolute top-7 left-12 right-12 h-[2px] bg-slate-200 z-0 pointer-events-none" />

            {steps.map((step, idx) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.num}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1, duration: 0.5 }}
                  className="relative z-10 flex flex-col items-center text-center p-4 rounded-2xl bg-white/90 border border-slate-200/80 shadow-sm hover:shadow-md hover:border-[#B88746]/50 transition-all duration-300 group"
                >
                  <div className="w-12 h-12 rounded-full bg-slate-950 text-[#E8C59A] border-2 border-white shadow-md flex items-center justify-center mb-3 group-hover:bg-[#B88746] group-hover:text-white transition-colors duration-300">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-mono font-bold text-[#B88746] tracking-wider uppercase">
                    STAGE {step.num}
                  </span>
                  <h4 className="text-sm font-bold text-slate-900 mt-1 mb-1">
                    {step.name}
                  </h4>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    {step.desc}
                  </p>
                </motion.div>
              );
            })}
          </div>

          {/* Mobile & Tablet Vertical Timeline */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:hidden gap-3.5">
            {steps.map((step, idx) => {
              const Icon = step.icon;
              return (
                <div
                  key={step.num}
                  className="flex items-start gap-3.5 p-4 rounded-2xl bg-white border border-slate-200 shadow-sm"
                >
                  <div className="w-10 h-10 rounded-xl bg-slate-950 text-[#E8C59A] flex items-center justify-center flex-shrink-0 shadow-sm">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono font-bold text-[#B88746] tracking-wider block">
                      STAGE {step.num}
                    </span>
                    <h4 className="text-sm font-bold text-slate-900">
                      {step.name}
                    </h4>
                    <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 2. VERIFIED CLIENT FEEDBACK SECTION                                       */}
        {/* ========================================================================= */}
        <div className="p-8 sm:p-12 rounded-3xl bg-white border border-slate-200 shadow-xl shadow-black/5">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 pb-6 border-b border-slate-100">
            <div>
              <span className="text-[11px] font-mono font-bold tracking-[0.25em] text-[#B88746] uppercase block mb-1">
                VERIFIED LOCAL HOMEOWNERS
              </span>
              <h3 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight font-sans">
                Real Client Experiences
              </h3>
            </div>

            {/* Slider navigation buttons */}
            <div className="flex items-center gap-2">
              <button
                onClick={handlePrevTestimonial}
                className="w-10 h-10 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center transition-colors"
                aria-label="Previous Review"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={handleNextTestimonial}
                className="w-10 h-10 rounded-full bg-[#B88746] hover:bg-[#a3753b] text-white flex items-center justify-center transition-colors shadow-md"
                aria-label="Next Review"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentTestimonial.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="max-w-3xl"
            >
              {/* 5 Golden Stars */}
              <div className="flex items-center gap-1 text-[#B88746] mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
                <span className="text-xs font-bold text-slate-900 ml-2 font-mono">5.0 / 5.0 Rating</span>
              </div>

              {/* Quote */}
              <p className="text-base sm:text-lg text-slate-800 leading-relaxed font-serif italic">
                &ldquo;{currentTestimonial.quote}&rdquo;
              </p>

              {/* Client Info */}
              <div className="flex items-center gap-4 mt-6 pt-6 border-t border-slate-100">
                <div className="w-12 h-12 rounded-full bg-slate-950 text-[#E8C59A] font-bold text-sm flex items-center justify-center flex-shrink-0 shadow-inner">
                  {currentTestimonial.initials}
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-950">
                    {currentTestimonial.author}
                  </h4>
                  <p className="text-xs text-slate-500">
                    {currentTestimonial.project} • {currentTestimonial.location}
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}
