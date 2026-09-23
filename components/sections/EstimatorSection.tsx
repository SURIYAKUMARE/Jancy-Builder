"use client";

import React, { useState } from "react";
import { Calculator, ArrowRight, CheckCircle2, Sparkles, ShieldCheck } from "lucide-react";

export default function EstimatorSection({ onOpenQuote }: { onOpenQuote: () => void }) {
  const [areaSqFt, setAreaSqFt] = useState(4000);
  const [tier, setTier] = useState<"standard" | "premium" | "luxury">("luxury");
  const [projectType, setProjectType] = useState("Luxury Villa");

  const rates = {
    standard: 2400,
    premium: 3200,
    luxury: 4400,
  };

  const estimatedTotal = areaSqFt * rates[tier];
  const formattedEstimateCrores = (estimatedTotal / 10000000).toFixed(2);
  const formattedEstimateLakhs = Math.round(estimatedTotal / 100000);

  return (
    <section id="estimator" className="py-24 bg-[#05080E] border-t border-white/5 relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center space-x-2 text-sky-400 text-xs font-mono tracking-widest uppercase mb-2">
            <Sparkles className="h-3.5 w-3.5" />
            <span>TRANSPARENT ARCHITECTURAL PRICING</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight font-serif">
            Interactive Turnkey Cost Estimator
          </h2>
          <p className="mt-3 text-slate-400 text-sm max-w-xl mx-auto leading-relaxed">
            Configure your dream architectural residence and calculate immediate turnkey budgets including structural framing, MEP services, and luxury finishes.
          </p>
        </div>

        <div className="max-w-4xl mx-auto glass-card-premium rounded-3xl p-6 sm:p-10 border border-white/10 shadow-2xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            {/* Left Controls */}
            <div className="space-y-6">
              {/* 1. Project Type Selector */}
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-slate-400 mb-2">
                  1. Architectural Typology
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {["Luxury Villa", "Independent House", "Commercial Landmark"].map((t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => setProjectType(t)}
                      className={`py-2 px-2.5 rounded-xl text-xs font-semibold border transition-all text-center ${
                        projectType === t
                          ? "bg-red-600/20 border-red-500 text-white font-bold"
                          : "bg-slate-900/60 border-white/5 text-slate-400 hover:text-white"
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              {/* 2. Area Slider */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-xs font-mono uppercase tracking-wider text-slate-400">
                    2. Built-Up Area (Sq.Ft)
                  </label>
                  <span className="text-sm font-bold font-mono text-red-400">
                    {areaSqFt.toLocaleString()} sq.ft
                  </span>
                </div>
                <input
                  type="range"
                  min="1500"
                  max="12000"
                  step="250"
                  value={areaSqFt}
                  onChange={(e) => setAreaSqFt(Number(e.target.value))}
                  className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-red-500"
                />
                <div className="flex justify-between text-[10px] font-mono text-slate-500 mt-1">
                  <span>1,500 sq.ft</span>
                  <span>6,000 sq.ft</span>
                  <span>12,000 sq.ft</span>
                </div>
              </div>

              {/* 3. Specification Tier */}
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-slate-400 mb-2">
                  3. Specification Package
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: "standard", label: "Classic", rate: "₹2,400/sq.ft" },
                    { id: "premium", label: "Premium", rate: "₹3,200/sq.ft" },
                    { id: "luxury", label: "Ultra Craft", rate: "₹4,400/sq.ft" },
                  ].map((pkg) => (
                    <button
                      key={pkg.id}
                      type="button"
                      onClick={() => setTier(pkg.id as any)}
                      className={`p-3 rounded-xl border text-left transition-all ${
                        tier === pkg.id
                          ? "bg-sky-500/20 border-sky-400 text-sky-300 font-bold"
                          : "bg-slate-900/60 border-white/5 text-slate-400 hover:text-white"
                      }`}
                    >
                      <p className="text-xs font-bold text-white">{pkg.label}</p>
                      <p className="text-[10px] font-mono text-slate-400 mt-0.5">{pkg.rate}</p>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Result Card */}
            <div className="bg-slate-950/80 rounded-2xl p-6 sm:p-8 border border-white/10 flex flex-col justify-between space-y-6">
              <div>
                <span className="text-[11px] font-mono uppercase text-slate-400 tracking-widest font-bold">
                  Estimated Turnkey Investment
                </span>
                <div className="mt-2">
                  <span className="text-4xl sm:text-5xl font-black text-white font-serif tracking-tight">
                    ₹{formattedEstimateCrores}
                  </span>
                  <span className="text-xl font-bold text-red-500 ml-2 font-mono">
                    Crores
                  </span>
                </div>
                <p className="text-xs font-mono text-slate-400 mt-1">
                  (Approx. ₹{formattedEstimateLakhs.toLocaleString()} Lakhs turnkey budget)
                </p>
              </div>

              <div className="space-y-2 text-xs font-mono text-slate-300 pt-2 border-t border-white/5">
                <div className="flex items-center space-x-2 text-emerald-400">
                  <CheckCircle2 className="h-4 w-4 flex-shrink-0" />
                  <span>Includes Soil Testing, RCC Skeleton & Interior MEP</span>
                </div>
                <div className="flex items-center space-x-2 text-sky-400">
                  <ShieldCheck className="h-4 w-4 flex-shrink-0" />
                  <span>100% Guaranteed Handover Timeline or Penalty Clause</span>
                </div>
              </div>

              <button
                onClick={onOpenQuote}
                className="w-full py-3.5 rounded-xl btn-brand-primary text-white font-bold text-xs uppercase tracking-wider transition-all shadow-xl active:scale-95 flex items-center justify-center space-x-2"
              >
                <span>Request Comprehensive BOQ Estimate</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
