"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ArrowRight, Play, Pause, Star, Building2, Clock, ShieldCheck, ChevronRight, CheckCircle2, Lock, Sparkles, Layers, Phone } from "lucide-react";
import { Stage } from "@/types/hero";

interface HeroExactProps {
  stages: Stage[];
  currentStageIndex: number;
  onSelectStage: (idx: number) => void;
  isPlaying: boolean;
  onTogglePlay: () => void;
  progressPercent: number;
  onOpenQuote: () => void;
  onOpenExplorer: (idx: number) => void;
}

export default function HeroExact({
  stages,
  currentStageIndex,
  onSelectStage,
  isPlaying,
  onTogglePlay,
  progressPercent,
  onOpenQuote,
  onOpenExplorer,
}: HeroExactProps) {
  const currentStage = stages[currentStageIndex] || stages[0];

  // Consultation Card Form State
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    projectType: "Residential Construction",
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setErrorMessage("");

    try {
      const res = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          phone: formData.phone,
          email: formData.email,
          projectType: formData.projectType,
          currentStage: currentStage?.title || "Stage 12 - Completed Home",
        }),
      });

      if (res.ok) {
        setSubmitted(true);
        setFormData({ name: "", phone: "", email: "", projectType: "Residential Construction" });
      } else {
        setErrorMessage("Something went wrong. Please try again.");
      }
    } catch {
      setErrorMessage("Network error. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="relative w-full bg-white overflow-hidden pt-6 pb-12 lg:pt-10 lg:pb-16 border-b border-gray-100">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* 3-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-6 items-center">
          
          {/* ======================================================== */}
          {/* COLUMN 1: LEFT HEADLINE, DESCRIPTION, CTAS & STATS (3.5 cols) */}
          {/* ======================================================== */}
          <div className="lg:col-span-4 flex flex-col justify-center space-y-6">
            {/* Tagline */}
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-bold tracking-[0.25em] text-[#DC2626] uppercase">
                BUILD SPACES • BUILD LIVES
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-[3.25rem] font-black text-slate-900 tracking-tight leading-[1.08]">
              Your Vision<br />
              Our Construction<br />
              <span className="text-slate-900">Expertise</span>
            </h1>

            {/* Subtitle */}
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-md">
              At Jancy Builders, we turn your ideas into lasting spaces with quality, innovation and trust.
            </p>

            {/* CTA Buttons */}
            <div className="flex items-center flex-wrap gap-4 pt-1">
              <button
                onClick={onOpenQuote}
                className="group inline-flex items-center gap-2.5 bg-[#DC2626] hover:bg-[#B91C1C] text-white text-sm font-semibold px-6 py-3 rounded-full shadow-lg shadow-red-500/25 active:scale-95 transition-all duration-200"
              >
                <span>Get a Quote</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
              </button>

              <button
                onClick={() => onOpenExplorer(currentStageIndex)}
                className="group inline-flex items-center gap-3 text-slate-900 hover:text-[#DC2626] font-semibold text-sm py-2 px-1 transition-colors"
              >
                <div className="w-9 h-9 rounded-full bg-slate-900 text-white flex items-center justify-center group-hover:bg-[#DC2626] transition-colors shadow-sm">
                  <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
                </div>
                <span>Watch Our Story</span>
              </button>
            </div>

            {/* Stats Row */}
            <div className="pt-4 border-t border-gray-100 grid grid-cols-3 gap-3">
              {/* Stat 1 */}
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <Building2 className="w-3.5 h-3.5 text-slate-500" />
                  <span className="text-xl sm:text-2xl font-black text-slate-900">500+</span>
                </div>
                <span className="text-[11px] text-slate-500 font-medium leading-tight mt-0.5">
                  Projects Completed
                </span>
              </div>

              {/* Stat 2 */}
              <div className="flex flex-col border-l border-gray-100 pl-3">
                <div className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-slate-500" />
                  <span className="text-xl sm:text-2xl font-black text-slate-900">10+</span>
                </div>
                <span className="text-[11px] text-slate-500 font-medium leading-tight mt-0.5">
                  Years (Est. 2016)
                </span>
              </div>

              {/* Stat 3 */}
              <div className="flex flex-col border-l border-gray-100 pl-3">
                <div className="flex items-center gap-1.5">
                  <Star className="w-3.5 h-3.5 text-[#DC2626] fill-[#DC2626]" />
                  <span className="text-xl sm:text-2xl font-black text-slate-900">5.0</span>
                </div>
                <span className="text-[11px] text-slate-500 font-medium leading-tight mt-0.5">
                  Star Rating (Justdial)
                </span>
              </div>
            </div>
          </div>

          {/* ======================================================== */}
          {/* COLUMN 2: CENTER ARCHITECTURAL TIMELAPSE FRAME (5 cols)   */}
          {/* ======================================================== */}
          <div className="lg:col-span-5 relative flex flex-col items-center">
            {/* Handwriting cursive text above the roof */}
            <div className="w-full flex justify-end pr-6 -mb-4 z-20 pointer-events-none select-none">
              <span className="font-['Caveat',cursive] text-2xl sm:text-3xl text-slate-700 font-semibold tracking-wide transform -rotate-3">
                Built for a Better Tomorrow
              </span>
            </div>

            {/* Main Visual Frame */}
            <div className="relative w-full aspect-[4/3] sm:aspect-[16/11] rounded-2xl overflow-hidden shadow-2xl border border-gray-200/80 bg-slate-900 group">
              {/* Active Stage Construction Visual */}
              <div className="relative w-full h-full">
                <Image
                  src={currentStage?.desktopMediaUrl || "/images/stages/stage-12.jpg"}
                  alt={currentStage?.title || "Modern Architectural Villa - Jancy Builders"}
                  fill
                  priority
                  className="object-cover transition-opacity duration-700 ease-in-out"
                />

                {/* Subtle vignette & soft architectural gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 pointer-events-none" />
              </div>

              {/* Top Stage Identifier Badge */}
              <div className="absolute top-3 left-3 z-20 flex items-center gap-2 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/20 text-white shadow-lg">
                <span className="w-2 h-2 rounded-full bg-[#DC2626] animate-pulse" />
                <span className="text-[11px] font-mono tracking-wider font-semibold">
                  STAGE {String(currentStage?.stageNumber || currentStageIndex + 1).padStart(2, "0")} • {currentStage?.title?.toUpperCase()}
                </span>
              </div>

              {/* Floating Pill Overlay (Bottom-Right matching mockup) */}
              <div
                onClick={() => onOpenExplorer(currentStageIndex)}
                className="absolute bottom-14 sm:bottom-12 right-3 sm:right-4 z-20 cursor-pointer bg-white/95 hover:bg-white backdrop-blur-md p-1.5 pr-3.5 rounded-full shadow-xl border border-gray-200 flex items-center gap-3 transition-transform duration-200 hover:scale-105 active:scale-95 group/pill"
              >
                <div className="relative w-12 h-9 rounded-lg overflow-hidden flex-shrink-0 bg-slate-100">
                  <Image
                    src="/images/modern-living-thumb.jpg"
                    alt="Modern Living"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex flex-col text-left">
                  <span className="text-[11px] font-bold text-slate-900 leading-tight">
                    Modern Living
                  </span>
                  <span className="text-[10px] text-slate-500 leading-tight">
                    Starts Here
                  </span>
                </div>
                <div className="w-5 h-5 rounded-full bg-slate-100 group-hover/pill:bg-[#DC2626] group-hover/pill:text-white flex items-center justify-center transition-colors">
                  <ChevronRight className="w-3.5 h-3.5 text-slate-700 group-hover/pill:text-white" />
                </div>
              </div>

              {/* Bottom Interactive Stage Control Dock inside visual */}
              <div className="absolute bottom-0 inset-x-0 z-20 bg-gradient-to-t from-black/85 via-black/40 to-transparent p-3 pt-6 flex items-center justify-between text-white">
                <div className="flex items-center gap-2">
                  <button
                    onClick={onTogglePlay}
                    className="w-7 h-7 rounded-full bg-[#DC2626] hover:bg-[#B91C1C] flex items-center justify-center text-white transition-colors"
                    title={isPlaying ? "Pause Timelapse" : "Play Timelapse"}
                  >
                    {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 fill-current ml-0.5" />}
                  </button>
                  <span className="text-[10px] text-slate-300 font-mono hidden sm:inline">
                    {isPlaying ? "TIMELAPSE RUNNING" : "PAUSED"}
                  </span>
                </div>

                {/* Micro Stage Dots Indicator */}
                <div className="flex items-center gap-1">
                  {stages.map((stg, idx) => (
                    <button
                      key={stg.id}
                      onClick={() => onSelectStage(idx)}
                      title={`Stage ${idx + 1}: ${stg.title}`}
                      className={`h-1.5 rounded-full transition-all duration-300 ${
                        idx === currentStageIndex
                          ? "w-5 bg-[#DC2626]"
                          : "w-1.5 bg-white/40 hover:bg-white/70"
                      }`}
                    />
                  ))}
                </div>

                {/* Stage Explorer Trigger */}
                <button
                  onClick={() => onOpenExplorer(currentStageIndex)}
                  className="text-[10px] font-semibold text-slate-300 hover:text-white flex items-center gap-1 bg-white/10 hover:bg-white/20 px-2.5 py-1 rounded-full backdrop-blur-sm transition-colors"
                >
                  <Layers className="w-3 h-3 text-[#DC2626]" />
                  <span>12 Stages</span>
                </button>
              </div>

              {/* Stage Progress Bar Line */}
              <div className="absolute bottom-0 inset-x-0 h-0.5 bg-white/20 z-30">
                <div
                  className="h-full bg-[#DC2626] transition-all duration-75"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>
          </div>

          {/* ======================================================== */}
          {/* COLUMN 3: RIGHT DARK CONSULTATION CARD (3.5 cols)        */}
          {/* ======================================================== */}
          <div className="lg:col-span-3">
            <div id="consultation" className="bg-[#111827] text-white rounded-2xl p-6 sm:p-7 shadow-2xl border border-slate-800 relative">
              {/* Badge */}
              <div className="inline-block bg-red-600/10 border border-red-600/30 text-[#DC2626] text-[10px] font-extrabold tracking-wider px-2.5 py-1 rounded-md uppercase mb-2">
                GET A FREE CONSULTATION • EST. 2016
              </div>

              {/* Title */}
              <h3 className="text-2xl font-bold text-white tracking-tight">
                Let&apos;s Build Together
              </h3>

              {/* Subtitle */}
              <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
                Connect directly with <strong className="text-white">Er. Sakay Antony Stalin</strong> &amp; our engineering team for free site evaluation.
              </p>

              {/* Form */}
              {submitted ? (
                <div className="my-6 p-4 rounded-xl bg-emerald-950/60 border border-emerald-500/30 text-center space-y-2">
                  <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto" />
                  <h4 className="text-sm font-bold text-white">Request Received!</h4>
                  <p className="text-xs text-slate-300">
                    Our lead architect will contact you within 2 hours.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="text-xs text-emerald-400 underline pt-2 block mx-auto"
                  >
                    Submit another enquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="mt-5 space-y-3">
                  <div>
                    <input
                      type="text"
                      required
                      placeholder="Your Name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-white text-slate-900 placeholder:text-slate-400 px-3.5 py-2.5 rounded-lg text-xs font-medium focus:outline-none focus:ring-2 focus:ring-[#DC2626] border border-transparent"
                    />
                  </div>

                  <div>
                    <input
                      type="tel"
                      required
                      placeholder="Phone Number"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full bg-white text-slate-900 placeholder:text-slate-400 px-3.5 py-2.5 rounded-lg text-xs font-medium focus:outline-none focus:ring-2 focus:ring-[#DC2626] border border-transparent"
                    />
                  </div>

                  <div>
                    <input
                      type="email"
                      required
                      placeholder="Email Address"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-white text-slate-900 placeholder:text-slate-400 px-3.5 py-2.5 rounded-lg text-xs font-medium focus:outline-none focus:ring-2 focus:ring-[#DC2626] border border-transparent"
                    />
                  </div>

                  <div>
                    <select
                      value={formData.projectType}
                      onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                      className="w-full bg-white text-slate-900 px-3.5 py-2.5 rounded-lg text-xs font-medium focus:outline-none focus:ring-2 focus:ring-[#DC2626] border border-transparent cursor-pointer"
                    >
                      <option value="Residential Construction">Residential Construction</option>
                      <option value="Commercial Construction">Commercial Construction</option>
                      <option value="Luxury Villa Construction">Luxury Villa Construction</option>
                      <option value="Renovation & Remodeling">Renovation & Remodeling</option>
                      <option value="Architectural Design & Planning">Architectural Design & Planning</option>
                    </select>
                  </div>

                  {errorMessage && (
                    <p className="text-[11px] text-red-400">{errorMessage}</p>
                  )}

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full bg-[#DC2626] hover:bg-[#B91C1C] text-white font-semibold py-2.5 px-4 rounded-lg text-xs transition-all duration-200 shadow-lg shadow-red-600/30 flex items-center justify-center gap-1.5 active:scale-95 disabled:opacity-50"
                  >
                    <span>{submitting ? "Submitting..." : "Submit Request"}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>

                  {/* Direct Contact Options */}
                  <div className="pt-1 flex items-center gap-2">
                    <a
                      href="tel:+917708247124"
                      className="w-1/2 bg-slate-800/80 hover:bg-slate-700 text-white rounded-lg py-2 text-[11px] font-medium flex items-center justify-center gap-1.5 border border-slate-700 transition-colors"
                      title="Direct Phone Call"
                    >
                      <Phone className="w-3 h-3 text-[#DC2626]" />
                      <span>+91 77082 47124</span>
                    </a>
                    <a
                      href="https://wa.me/917708247124?text=Hi%20Jancy%20Builders,%20I%20would%20like%20to%20consult%20regarding%20construction%20services"
                      target="_blank"
                      rel="noreferrer"
                      className="w-1/2 bg-emerald-600/90 hover:bg-emerald-600 text-white rounded-lg py-2 text-[11px] font-medium flex items-center justify-center gap-1.5 transition-colors"
                      title="Instant WhatsApp Consultation"
                    >
                      <span>WhatsApp</span>
                    </a>
                  </div>
                </form>
              )}

              {/* Privacy Footer */}
              <div className="mt-3.5 pt-2 flex items-center justify-center gap-1.5 text-slate-400 text-[11px]">
                <Lock className="w-3 h-3 text-slate-400" />
                <span>Your information is secure with us.</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
