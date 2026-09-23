"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ConstructionStage } from "@/types/hero";
import { Ruler, ShieldCheck, ArrowRight, Eye, Sparkles } from "lucide-react";

interface StageFilmstripSectionProps {
  stages: ConstructionStage[];
  onSelectAndJumpToHero: (index: number) => void;
  onOpenExplorer: (index: number) => void;
}

export default function StageFilmstripSection({
  stages,
  onSelectAndJumpToHero,
  onOpenExplorer,
}: StageFilmstripSectionProps) {
  const [activeTabIdx, setActiveTabIdx] = useState(0);

  const activeStage = stages[activeTabIdx] || stages[0];

  return (
    <section id="stages-filmstrip" className="py-24 bg-[#05080E] border-t border-white/5 relative">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <div className="inline-flex items-center space-x-2 text-red-500 text-xs font-mono tracking-widest uppercase mb-2">
              <Sparkles className="h-3.5 w-3.5" />
              <span>THE 12-STAGE ARCHITECTURAL JOURNEY</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight font-serif">
              From Foundation to Finished Home
            </h2>
            <p className="mt-3 text-slate-400 text-sm max-w-2xl leading-relaxed">
              Witness the rigorous structural engineering and bespoke craftsmanship that goes into every square millimeter of a Jancy Builders residence.
            </p>
          </div>

          <div className="mt-6 md:mt-0 flex items-center space-x-3">
            <button
              onClick={() => onOpenExplorer(activeTabIdx)}
              className="px-4 py-2 rounded-xl glass-hud border border-sky-500/30 text-sky-400 hover:text-white font-mono text-xs flex items-center space-x-2 transition-all"
            >
              <span>Full Engineering Dossier</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>

        {/* Stage Active Showcase Card (Split View) */}
        <div className="glass-card-premium rounded-3xl p-6 sm:p-8 mb-10 border border-white/10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left: High-Res Image with Stage Badge */}
            <div className="lg:col-span-7 relative h-72 sm:h-[420px] rounded-2xl overflow-hidden bg-slate-950 border border-white/10 group">
              <Image
                src={activeStage.desktopMediaUrl}
                alt={activeStage.name}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

              <div className="absolute top-4 left-4 bg-slate-950/85 backdrop-blur-md px-3 py-1 rounded-full border border-red-500/30 text-xs font-mono font-bold text-red-400">
                PHASE {activeStage.stageNumber} OF 12
              </div>

              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-mono text-sky-400 uppercase tracking-widest font-bold">
                    MILESTONE: {activeStage.milestone}
                  </span>
                  <h3 className="text-xl sm:text-2xl font-bold text-white font-serif">
                    {activeStage.name}
                  </h3>
                </div>

                <button
                  onClick={() => onSelectAndJumpToHero(activeTabIdx)}
                  className="px-4 py-2 rounded-xl btn-brand-primary text-white font-mono text-xs font-bold flex items-center space-x-1.5 shadow-lg active:scale-95"
                >
                  <Eye className="h-3.5 w-3.5" />
                  <span>View In Hero</span>
                </button>
              </div>
            </div>

            {/* Right: Technical Parameters & Quality Checkpoints */}
            <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
              <div>
                <span className="text-xs font-mono uppercase tracking-widest text-red-500 font-bold">
                  Phase Philosophy
                </span>
                <h4 className="text-2xl font-bold text-white mt-1 font-serif">
                  "{activeStage.title}"
                </h4>
                <p className="mt-3 text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {activeStage.description}
                </p>
              </div>

              {/* Engineering Specs */}
              {activeStage.blueprintSpecs && (
                <div className="bg-slate-950/70 rounded-2xl p-4 border border-white/5 space-y-2.5">
                  <span className="text-[11px] font-mono text-sky-400 font-bold uppercase tracking-wider flex items-center space-x-1.5">
                    <Ruler className="h-3.5 w-3.5" />
                    <span>Technical Architecture Parameters</span>
                  </span>
                  <div className="grid grid-cols-1 gap-2 pt-1">
                    {Object.entries(activeStage.blueprintSpecs).map(([key, val]) => (
                      <div
                        key={key}
                        className="flex justify-between items-center text-xs py-1.5 px-3 rounded-xl bg-slate-900/60 border border-white/5 font-mono"
                      >
                        <span className="text-slate-400 capitalize">{key.replace(/([A-Z])/g, " $1")}</span>
                        <span className="text-slate-100 font-semibold">{val}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex items-center space-x-2 text-xs font-mono text-emerald-400">
                <ShieldCheck className="h-4 w-4" />
                <span>Zero-Tolerance Quality Inspection Signed Off</span>
              </div>
            </div>
          </div>
        </div>

        {/* 12-Stage Horizontal Filmstrip Selector */}
        <div className="flex items-center space-x-3 overflow-x-auto pb-4 scrollbar-thin">
          {stages.map((stage, idx) => {
            const isSelected = idx === activeTabIdx;
            return (
              <button
                key={stage.id}
                onClick={() => setActiveTabIdx(idx)}
                className={`flex-shrink-0 w-36 sm:w-44 rounded-2xl overflow-hidden p-2 text-left border transition-all duration-300 ${
                  isSelected
                    ? "bg-slate-900 border-red-500 ring-2 ring-red-500/30 scale-105 shadow-xl"
                    : "bg-slate-950/60 border-white/10 opacity-70 hover:opacity-100 hover:border-white/30"
                }`}
              >
                <div className="relative h-20 w-full rounded-xl overflow-hidden mb-2 bg-slate-900">
                  <Image src={stage.desktopMediaUrl} alt={stage.name} fill className="object-cover" />
                  <div className="absolute top-1 left-1 bg-black/80 px-2 py-0.5 rounded text-[9px] font-mono text-red-400 font-bold">
                    {stage.stageNumber}
                  </div>
                </div>
                <p className="text-xs font-bold text-white truncate">{stage.name}</p>
                <p className="text-[10px] font-mono text-slate-400 mt-0.5 truncate">{stage.milestone}</p>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
