"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Calculator,
  Shield,
  Layers,
  Sparkles,
  CheckCircle2,
  HelpCircle,
  ArrowRight,
  Info,
  Building,
  Check,
} from "lucide-react";
import NavbarExact from "@/components/exact/NavbarExact";
import FooterExact from "@/components/exact/FooterExact";
import FloatingWhatsApp from "@/components/common/FloatingWhatsApp";
import QuoteModal from "@/components/quote/QuoteModal";

export default function EstimatorPageClient() {
  const [area, setArea] = useState<number>(2400);
  const [floors, setFloors] = useState<number>(2);
  const [packageType, setPackageType] = useState<"classic" | "premium" | "ultra">("premium");
  const [isQuoteOpen, setIsQuoteOpen] = useState(false);

  const rates = {
    classic: 2400,
    premium: 3200,
    ultra: 4400,
  };

  const rate = rates[packageType];
  const totalCost = area * rate;

  const costBreakdown = {
    structure: Math.round(totalCost * 0.5),
    finishing: Math.round(totalCost * 0.3),
    mep: Math.round(totalCost * 0.15),
    supervision: Math.round(totalCost * 0.05),
  };

  const formatINR = (val: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(val);
  };

  const packageSpecs = [
    {
      feature: "Civil Engineering Supervision",
      classic: "Resident Site Engineer Oversight",
      premium: "Direct Inspection by Er. Sahaya Antony Stalin",
      ultra: "Founder Personal Daily Oversight + Dedicated PM",
    },
    {
      feature: "Steel Reinforcement",
      classic: "Standard Fe500 Grade TMT",
      premium: "High-Ductility Fe550D TMT (IS 13920)",
      ultra: "Epoxy-Coated Corrosion Resistant Fe550D TMT",
    },
    {
      feature: "Wall Masonry",
      classic: "Red Clay Country Bricks",
      premium: "Wienerberger Porotherm Thermal Hollow Bricks",
      ultra: "Wienerberger Porotherm + Cavity Insulation",
    },
    {
      feature: "Flooring Materials",
      classic: "Vitrified Tiles (₹65/sq.ft)",
      premium: "Large Format Glazed Vitrified (₹120/sq.ft)",
      ultra: "Italian Statuario Marble / Imported Granite",
    },
    {
      feature: "Doors & Windows",
      classic: "First Quality Teak Main Door, UPVC Windows",
      premium: "Burma Teak Entrance & Double-Glazed Acoustic UPVC",
      ultra: "Handcrafted Teakwood Throughout & Thermal Break Windows",
    },
    {
      feature: "Sanitary & CP Fittings",
      classic: "Parryware / Hindware Premium",
      premium: "Kohler / Jaquar Artize Collection",
      ultra: "Grohe / TOTO Designer Collection",
    },
    {
      feature: "Waterproofing Warranty",
      classic: "5-Year Written Guarantee",
      premium: "10-Year Comprehensive Elastomeric Guarantee",
      ultra: "10-Year Multi-Tier Dual Polyurethane Guarantee",
    },
  ];

  return (
    <div className="min-h-screen bg-[#F7F4EE] text-slate-900 flex flex-col font-sans selection:bg-[#E50914]/20 selection:text-[#E50914]">
      {/* Navbar */}
      <NavbarExact onOpenQuote={() => setIsQuoteOpen(true)} />

      {/* Main Content */}
      <main className="flex-grow pt-28 sm:pt-32">
        {/* Header */}
        <section className="relative px-4 sm:px-6 lg:px-8 py-16 lg:py-20 max-w-[1440px] mx-auto">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 mb-3">
              <span className="h-[2px] w-8 bg-[#B88746] block" />
              <span className="text-xs font-mono font-bold uppercase tracking-[0.25em] text-[#B88746]">
                TRANSPARENT PRICING CALCULATOR
              </span>
            </div>

            <h1 className="text-4xl sm:text-6xl font-black text-slate-950 tracking-tight font-sans">
              Turnkey Construction<br />
              <span className="text-[#B88746]">Cost Estimator</span>
            </h1>

            <p className="mt-4 text-base sm:text-lg text-slate-700 leading-relaxed">
              Calculate an itemized turnkey construction estimate based on verified South Tamil Nadu market rates, foundation engineering, and quality material tiers.
            </p>
          </div>
        </section>

        {/* Interactive Estimator Engine */}
        <section className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 pb-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            
            {/* Controls (7 Cols) */}
            <div className="lg:col-span-7 bg-white p-6 sm:p-10 rounded-3xl border border-[#E8DFD1] shadow-2xl shadow-black/5 space-y-8">
              
              {/* Built-up Area Slider */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-bold text-slate-950 uppercase tracking-wider font-mono">
                    Total Built-up Area (Sq.Ft)
                  </label>
                  <span className="text-2xl font-black text-[#B88746] font-mono">
                    {area.toLocaleString()} sq.ft
                  </span>
                </div>

                <input
                  type="range"
                  min={800}
                  max={8000}
                  step={50}
                  value={area}
                  onChange={(e) => setArea(Number(e.target.value))}
                  className="w-full h-3 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#B88746]"
                />

                <div className="flex justify-between text-[11px] text-slate-400 font-mono">
                  <span>800 sq.ft (Compact Home)</span>
                  <span>3,000 sq.ft (Duplex Villa)</span>
                  <span>8,000+ sq.ft (Luxury Estate)</span>
                </div>
              </div>

              {/* Number of Floors */}
              <div className="space-y-3">
                <label className="text-sm font-bold text-slate-950 uppercase tracking-wider font-mono block">
                  Configuration / Number of Floors
                </label>
                <div className="grid grid-cols-4 gap-3">
                  {[
                    { label: "Ground", val: 1 },
                    { label: "G + 1", val: 2 },
                    { label: "G + 2", val: 3 },
                    { label: "G + 3", val: 4 },
                  ].map((f) => (
                    <button
                      key={f.val}
                      onClick={() => setFloors(f.val)}
                      className={`py-3 rounded-2xl text-xs font-bold transition-all border ${
                        floors === f.val
                          ? "bg-slate-900 text-white border-slate-900 shadow-md"
                          : "bg-slate-50 text-slate-700 hover:bg-slate-100 border-slate-200"
                      }`}
                    >
                      {f.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Package Selection */}
              <div className="space-y-3">
                <label className="text-sm font-bold text-slate-950 uppercase tracking-wider font-mono block">
                  Select Construction Tier
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {[
                    { id: "classic", name: "Classic", rate: "₹2,400 / sq.ft", badge: "Standard Quality" },
                    { id: "premium", name: "Premium", rate: "₹3,200 / sq.ft", badge: "Most Popular", highlight: true },
                    { id: "ultra", name: "Ultra Luxury", rate: "₹4,400 / sq.ft", badge: "Bespoke Landmark" },
                  ].map((p) => {
                    const isSelected = packageType === p.id;
                    return (
                      <div
                        key={p.id}
                        onClick={() => setPackageType(p.id as any)}
                        className={`p-4 rounded-2xl border-2 cursor-pointer transition-all ${
                          isSelected
                            ? "border-[#B88746] bg-[#B88746]/5 shadow-md"
                            : "border-slate-200 hover:border-slate-300 bg-white"
                        }`}
                      >
                        <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full inline-block mb-2 ${
                          p.highlight ? "bg-[#B88746] text-white" : "bg-slate-100 text-slate-600"
                        }`}>
                          {p.badge}
                        </span>
                        <h4 className="text-base font-bold text-slate-950">{p.name}</h4>
                        <p className="text-xs text-[#B88746] font-mono font-bold mt-1">{p.rate}</p>
                      </div>
                    );
                  })}
                </div>
              </div>

            </div>

            {/* Live Cost Output & Breakdown (5 Cols) */}
            <div className="lg:col-span-5 bg-slate-900 text-white p-6 sm:p-10 rounded-3xl border border-white/10 shadow-2xl space-y-6">
              <div>
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#B88746] block">
                  INDICATIVE ESTIMATE
                </span>
                <div className="text-3xl sm:text-5xl font-black text-white font-sans mt-1">
                  {formatINR(totalCost)}
                </div>
                <p className="text-xs text-slate-400 font-mono mt-1">
                  For {area.toLocaleString()} sq.ft at ₹{rate.toLocaleString()}/sq.ft ({packageType.toUpperCase()} Tier)
                </p>
              </div>

              {/* Itemized Breakdown Bars */}
              <div className="space-y-3 pt-4 border-t border-white/10">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-300 block">
                  Estimated Cost Distribution:
                </span>

                <div className="space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-slate-300">Structure &amp; Civil Masonry (50%)</span>
                    <span className="font-mono font-bold text-white">{formatINR(costBreakdown.structure)}</span>
                  </div>
                  <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                    <div className="w-1/2 h-full bg-[#B88746]" />
                  </div>

                  <div className="flex justify-between pt-1">
                    <span className="text-slate-300">Finishes, Flooring &amp; Painting (30%)</span>
                    <span className="font-mono font-bold text-white">{formatINR(costBreakdown.finishing)}</span>
                  </div>
                  <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                    <div className="w-[30%] h-full bg-emerald-400" />
                  </div>

                  <div className="flex justify-between pt-1">
                    <span className="text-slate-300">Electrical &amp; Plumbing MEP (15%)</span>
                    <span className="font-mono font-bold text-white">{formatINR(costBreakdown.mep)}</span>
                  </div>
                  <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                    <div className="w-[15%] h-full bg-sky-400" />
                  </div>

                  <div className="flex justify-between pt-1">
                    <span className="text-slate-300">Supervision &amp; Soil Tests (5%)</span>
                    <span className="font-mono font-bold text-white">{formatINR(costBreakdown.supervision)}</span>
                  </div>
                  <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                    <div className="w-[5%] h-full bg-red-400" />
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => setIsQuoteOpen(true)}
                  className="w-full py-4 rounded-full bg-[#E50914] hover:bg-[#DC2626] text-white font-bold text-xs uppercase tracking-wider transition-all shadow-lg shadow-red-600/30 flex items-center justify-center gap-2"
                >
                  <span>Request Official Itemized BOQ</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              <p className="text-[11px] text-slate-400 text-center leading-relaxed">
                * Indicative budget estimate. Final cost depends on specific architectural finishes, soil SBC testing, and site location.
              </p>
            </div>

          </div>
        </section>

        {/* Package Comparison Table */}
        <section className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 pb-24">
          <div className="bg-white rounded-3xl border border-[#E8DFD1] p-6 sm:p-10 shadow-xl overflow-x-auto">
            <h3 className="text-2xl font-black text-slate-950 font-sans mb-6">
              Compare Construction Specifications
            </h3>

            <table className="w-full text-xs text-left">
              <thead>
                <tr className="border-b border-slate-200">
                  <th className="py-4 font-bold text-slate-500 uppercase font-mono">Specification</th>
                  <th className="py-4 font-bold text-slate-900">Classic (₹2,400)</th>
                  <th className="py-4 font-bold text-[#B88746]">Premium (₹3,200)</th>
                  <th className="py-4 font-bold text-slate-900">Ultra Luxury (₹4,400)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {packageSpecs.map((spec, i) => (
                  <tr key={i} className="hover:bg-slate-50">
                    <td className="py-3.5 font-bold text-slate-800 pr-4">{spec.feature}</td>
                    <td className="py-3.5 text-slate-600 pr-4">{spec.classic}</td>
                    <td className="py-3.5 text-slate-900 font-semibold pr-4 bg-[#B88746]/5">{spec.premium}</td>
                    <td className="py-3.5 text-slate-600">{spec.ultra}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </main>

      {/* Footer & Floating WhatsApp */}
      <FooterExact />
      <FloatingWhatsApp />

      <QuoteModal isOpen={isQuoteOpen} onClose={() => setIsQuoteOpen(false)} />
    </div>
  );
}
