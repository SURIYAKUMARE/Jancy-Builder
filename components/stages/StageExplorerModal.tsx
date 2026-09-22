"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { ConstructionStage } from "@/types/hero";
import { X, CheckCircle2, Ruler, ShieldAlert, Cpu, Sparkles, ChevronLeft, ChevronRight, Eye } from "lucide-react";

interface StageExplorerModalProps {
  isOpen: boolean;
  onClose: () => void;
  stages: ConstructionStage[];
  initialStageIdx?: number;
  onSelectAndApplyToHero?: (index: number) => void;
}

export default function StageExplorerModal({
  isOpen,
  onClose,
  stages,
  initialStageIdx = 0,
  onSelectAndApplyToHero,
}: StageExplorerModalProps) {
  const [selectedIdx, setSelectedIdx] = useState<number>(initialStageIdx);

  useEffect(() => {
    setSelectedIdx(initialStageIdx);
  }, [initialStageIdx, isOpen]);

  if (!isOpen) return null;

  const stage = stages[selectedIdx] || stages[0];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-300">
      <div className="relative w-full max-w-6xl max-h-[92vh] overflow-hidden rounded-2xl glass-panel-gold border border-slate-700 shadow-2xl flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950/70">
          <div className="flex items-center space-x-3">
            <span className="p-2 rounded-lg bg-yellow-500/20 text-yellow-400 font-mono text-xs font-bold">
              STAGE {stage.stageNumber}/12
            </span>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-white tracking-wide">
                {stage.name} — Construction Blueprint & Specs
              </h3>
              <p className="text-xs text-slate-400 font-mono">
                Jancy Builders Engineering Standards Protocol
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Modal Body: Two Columns */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column: High-Res Stage Visual & View in Hero Action */}
          <div className="lg:col-span-7 flex flex-col space-y-4">
            <div className="relative h-64 sm:h-96 w-full rounded-xl overflow-hidden border border-slate-700 bg-slate-900 shadow-xl group">
              <Image
                src={stage.desktopMediaUrl}
                alt={stage.name}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
              
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-mono tracking-widest text-yellow-400 font-bold uppercase">
                    Milestone: {stage.milestone}
                  </span>
                  <h4 className="text-lg font-bold text-white drop-shadow">"{stage.title}"</h4>
                </div>

                {onSelectAndApplyToHero && (
                  <button
                    onClick={() => {
                      onSelectAndApplyToHero(selectedIdx);
                      onClose();
                    }}
                    className="px-3.5 py-2 rounded-xl bg-yellow-500 hover:bg-yellow-400 text-slate-950 font-bold text-xs flex items-center space-x-1.5 shadow-lg active:scale-95 transition-all"
                  >
                    <Eye className="h-3.5 w-3.5" />
                    <span>View In Hero</span>
                  </button>
                )}
              </div>
            </div>

            {/* Stage Selector Ribbon */}
            <div className="flex items-center space-x-2 overflow-x-auto pb-2 scrollbar-thin">
              {stages.map((stg, i) => (
                <button
                  key={stg.id}
                  onClick={() => setSelectedIdx(i)}
                  className={`flex-shrink-0 relative h-14 w-20 rounded-lg overflow-hidden border transition-all ${
                    i === selectedIdx
                      ? "border-yellow-400 ring-2 ring-yellow-400/40 scale-105"
                      : "border-slate-800 opacity-60 hover:opacity-100"
                  }`}
                >
                  <Image src={stg.desktopMediaUrl} alt={stg.name} fill className="object-cover" />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center text-[11px] font-mono font-bold text-white">
                    {stg.stageNumber}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Right Column: Architectural Specifications & Engineering Checklist */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-4">
            <div className="space-y-4">
              <div>
                <span className="text-xs font-mono uppercase tracking-widest text-sky-400 font-bold">
                  Phase Overview
                </span>
                <p className="mt-1 text-sm text-slate-300 leading-relaxed">
                  {stage.description}
                </p>
              </div>

              {/* Technical Specifications Card */}
              {stage.blueprintSpecs && (
                <div className="bg-slate-900/80 rounded-xl p-4 border border-slate-800 space-y-2.5">
                  <h5 className="text-xs font-mono uppercase tracking-wider text-yellow-400 font-bold flex items-center space-x-1.5">
                    <Ruler className="h-4 w-4" />
                    <span>Structural Engineering Parameters</span>
                  </h5>
                  <div className="grid grid-cols-1 gap-2 pt-1">
                    {Object.entries(stage.blueprintSpecs).map(([key, val]) => (
                      <div
                        key={key}
                        className="flex justify-between items-center text-xs py-1.5 px-2.5 rounded-lg bg-slate-950/60 border border-slate-800/80 font-mono"
                      >
                        <span className="text-slate-400 capitalize">
                          {key.replace(/([A-Z])/g, " $1")}
                        </span>
                        <span className="text-slate-100 font-semibold text-right max-w-[200px] truncate">
                          {val}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Quality & Safety Checkpoints */}
              <div className="bg-slate-900/80 rounded-xl p-4 border border-slate-800 space-y-2">
                <h5 className="text-xs font-mono uppercase tracking-wider text-sky-400 font-bold flex items-center space-x-1.5">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                  <span>Jancy Quality Gate Inspections</span>
                </h5>
                <ul className="text-xs text-slate-300 space-y-1.5 pt-1">
                  <li className="flex items-start space-x-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 mt-1.5 flex-shrink-0" />
                    <span>NDT & Rebar Ultrasonic Scan verification before concrete casting.</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 mt-1.5 flex-shrink-0" />
                    <span>Certified third-party material batch lab testing (M30/Fe550D).</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 mt-1.5 flex-shrink-0" />
                    <span>Digital laser level alignment with zero-tolerance boundary audits.</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Bottom Nav Controls inside modal */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-800">
              <button
                disabled={selectedIdx === 0}
                onClick={() => setSelectedIdx((prev) => Math.max(0, prev - 1))}
                className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 disabled:opacity-30 text-slate-200 text-xs font-medium flex items-center space-x-1 transition-all"
              >
                <ChevronLeft className="h-4 w-4" />
                <span>Previous Stage</span>
              </button>

              <span className="text-xs font-mono text-slate-400">
                {selectedIdx + 1} of {stages.length}
              </span>

              <button
                disabled={selectedIdx === stages.length - 1}
                onClick={() => setSelectedIdx((prev) => Math.min(stages.length - 1, prev + 1))}
                className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 disabled:opacity-30 text-slate-200 text-xs font-medium flex items-center space-x-1 transition-all"
              >
                <span>Next Stage</span>
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
