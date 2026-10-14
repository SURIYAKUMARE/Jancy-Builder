"use client";

import React, { useState } from "react";
import dynamic from "next/dynamic";
import { motion, AnimatePresence } from "framer-motion";
import {
  Compass,
  FileCheck,
  Layers,
  HardHat,
  ShieldCheck,
  Key,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  CheckCircle2,
  Box,
} from "lucide-react";
import Hero3DFallback from "@/components/three/Hero3DFallback";

const ArchitecturalHeroCanvas = dynamic(
  () => import("@/components/three/ArchitecturalHeroCanvas"),
  { ssr: false, loading: () => <Hero3DFallback /> }
);

export interface ProcessStage {
  step: string;
  name: string;
  duration: string;
  icon: any;
  engineerTip: string;
  engineerTipTa: string;
  specs: string[];
  threeProgress: number; // 0.0 to 1.0 mapping to the 3D building model
}

export const PROCESS_STAGES: ProcessStage[] = [
  {
    step: "01",
    name: "Consultation & Soil SBC",
    duration: "Week 1",
    icon: Compass,
    engineerTip:
      "We survey your site in person, test Safe Bearing Capacity (SBC) with geotechnical core samples, and establish proper boundary coordinates.",
    engineerTipTa:
      "உங்கள் மனையை நேரடியாக ஆய்வு செய்து, மண்ணின் தாங்கும் திறனை (SBC) துல்லியமாக சோதித்து அஸ்திவார திட்டத்தை உருவாக்குகிறோம்.",
    specs: [
      "Geotechnical Soil Testing (kN/m²)",
      "Topographical Contour Survey",
      "Vastu Shastra Orientation Audit",
    ],
    threeProgress: 0.1,
  },
  {
    step: "02",
    name: "Planning & 3D Approval",
    duration: "Weeks 2 – 3",
    icon: FileCheck,
    engineerTip:
      "Our architects develop 2D structural floorplans, photorealistic 3D elevations, and complete municipality sanction files.",
    engineerTipTa:
      "2D தள திட்டங்கள், 3D தோற்றங்கள் மற்றும் நகராட்சி அனுமதி ஆவணங்களை முழுமையாக தயார் செய்கிறோம்.",
    specs: [
      "Municipal Sanction Blueprints",
      "3D Architectural Exterior Visuals",
      "Centerline Structural Drawings",
    ],
    threeProgress: 0.28,
  },
  {
    step: "03",
    name: "Contract & Procurement",
    duration: "Week 4",
    icon: Layers,
    engineerTip:
      "Transparent itemized BOQ with zero hidden costs. Fe550D TMT steel and UltraTech/Dalmia cement batches are procured with mill test certificates.",
    engineerTipTa:
      "மறைமுக கட்டணங்கள் இல்லாத வெளிப்படையான ஒப்பந்தம். தரமான Fe550D இரும்பு மற்றும் சிமெண்ட் மட்டுமே பயன்படுத்தப்படும்.",
    specs: [
      "Fixed Turnkey Price Contract",
      "Fe550D Mill Test Reports",
      "Subterranean Anti-Termite Barrier",
    ],
    threeProgress: 0.48,
  },
  {
    step: "04",
    name: "Structural Execution",
    duration: "Months 2 – 6",
    icon: HardHat,
    engineerTip:
      "Heavy construction starts: isolated footings, RCC column casting, Wienerberger Porotherm thermal brick masonry, and mechanized slab pumping.",
    engineerTipTa:
      "அஸ்திவாரம், கான்கிரீட் தூண்கள், போரோதெர்ம் வெப்பத் தடுப்பு செங்கல் சுவர்கள் மற்றும் நவீன இயந்திர தளம் அமைத்தல்.",
    specs: [
      "M25 / M30 Ready Mix Concrete",
      "Wienerberger Porotherm Bricks",
      "28-Day Water Ponding Curing",
    ],
    threeProgress: 0.72,
  },
  {
    step: "05",
    name: "Quality Audit & Testing",
    duration: "Months 7 – 9",
    icon: ShieldCheck,
    engineerTip:
      "Rigorous quality inspection: NABL 28-day concrete cube compressive tests, 15-Bar plumbing pressure testing, and roof flood testing.",
    engineerTipTa:
      "NABL ஆய்வக கான்கிரீட் சோதனை, 15-பார் குழாய் அழுத்த பரிசோதனை மற்றும் 72 மணி நேர நீர் கசிவு சோதனை.",
    specs: [
      "NABL Concrete Test Certificates",
      "15-Bar Hydrostatic Plumbing Check",
      "Multi-Layer Elastomeric Waterproofing",
    ],
    threeProgress: 0.88,
  },
  {
    step: "06",
    name: "Finishing & Key Handover",
    duration: "Month 10",
    icon: Key,
    engineerTip:
      "Your dream home is complete! We perform ceremonial Grihapravesam key handover with lifetime structural warranty documentation.",
    engineerTipTa:
      "உங்கள் கனவு இல்லம் தயார்! வாழ்நாள் உத்தரவாத ஆவணங்களுடன் பாரம்பரிய முறைப்படி சாவி ஒப்படைக்கிறோம்.",
    specs: [
      "150-Point Final Architectural Audit",
      "Ceremonial Handover Kit & Keys",
      "Lifetime Structural Warranty",
    ],
    threeProgress: 1.0,
  },
];

export default function Process3DVisualizer() {
  const [activeIdx, setActiveIdx] = useState(0);
  const currentStage = PROCESS_STAGES[activeIdx];
  const Icon = currentStage.icon;

  const handleNext = () => {
    setActiveIdx((prev) => (prev + 1) % PROCESS_STAGES.length);
  };

  const handlePrev = () => {
    setActiveIdx((prev) => (prev - 1 + PROCESS_STAGES.length) % PROCESS_STAGES.length);
  };

  return (
    <div className="w-full bg-slate-950 text-white rounded-3xl p-6 sm:p-10 border border-white/10 shadow-2xl overflow-hidden">
      {/* Top Header */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-8 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-[11px] font-mono font-bold uppercase tracking-widest px-3 py-1 rounded-full bg-[#B88746] text-slate-950">
              Interactive 3D Workflow
            </span>
            <span className="text-xs text-slate-400 font-mono">
              Stage {activeIdx + 1} of {PROCESS_STAGES.length}
            </span>
          </div>
          <h3 className="text-2xl sm:text-4xl font-black tracking-tight font-sans">
            6-Stage Turnkey Architectural Construction
          </h3>
          <p className="text-sm text-slate-400 max-w-2xl mt-1">
            Navigate through each engineering milestone to visualize how Jancy Builders constructs your dream residence from bare earth to turnkey handover.
          </p>
        </div>

        {/* Prev / Next Stage Controls */}
        <div className="flex items-center gap-3">
          <button
            onClick={handlePrev}
            className="w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-all border border-white/15"
            title="Previous Stage"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={handleNext}
            className="w-11 h-11 rounded-full bg-[#B88746] hover:bg-[#a67435] text-slate-950 flex items-center justify-center transition-all shadow-lg font-bold"
            title="Next Stage"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* 6 Stage Tabs */}
      <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
        {PROCESS_STAGES.map((stg, i) => {
          const isSelected = activeIdx === i;
          return (
            <button
              key={stg.step}
              onClick={() => setActiveIdx(i)}
              className={`p-3 rounded-2xl text-left transition-all border ${
                isSelected
                  ? "bg-[#B88746] text-slate-950 border-[#B88746] shadow-lg shadow-[#B88746]/20 font-bold"
                  : "bg-white/5 hover:bg-white/10 text-slate-300 border-white/10"
              }`}
            >
              <span className={`text-[10px] font-mono block ${isSelected ? "text-slate-900" : "text-[#B88746]"}`}>
                STAGE {stg.step}
              </span>
              <span className="text-xs font-bold line-clamp-1 mt-0.5">
                {stg.name}
              </span>
            </button>
          );
        })}
      </div>

      {/* Main Split Grid: 3D Canvas + Technical Specs & Engineer Advice */}
      <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left: Real-Time 3D Building Canvas */}
        <div className="lg:col-span-7 aspect-[16/10] min-h-[340px] sm:min-h-[420px] rounded-2xl overflow-hidden bg-slate-900 border border-white/10 relative shadow-2xl">
          <ArchitecturalHeroCanvas />
          {/* Badge */}
          <div className="absolute top-4 left-4 z-10 bg-slate-950/80 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/20 text-xs font-mono text-[#E8C59A] flex items-center gap-2">
            <Box className="w-3.5 h-3.5 text-[#B88746]" />
            <span>Interactive 3D Stage: {currentStage.name}</span>
          </div>
        </div>

        {/* Right: Technical Deliverables & Engineer Advice Card */}
        <div className="lg:col-span-5 space-y-5">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-[#B88746]/20 border border-[#B88746] flex items-center justify-center text-[#B88746]">
              <Icon className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs text-[#B88746] font-mono font-bold tracking-wider uppercase block">
                Timeline: {currentStage.duration}
              </span>
              <h4 className="text-xl sm:text-2xl font-bold text-white">
                {currentStage.name}
              </h4>
            </div>
          </div>

          {/* Engineer Speech Callout */}
          <div className="p-4 rounded-2xl bg-white/5 border border-white/10 relative">
            <div className="flex items-start gap-2.5">
              <Sparkles className="w-4 h-4 text-[#B88746] flex-shrink-0 mt-0.5" />
              <div>
                <span className="text-[10px] font-mono font-bold text-[#E8C59A] uppercase block mb-1">
                  Er. Sahaya Antony Stalin — Engineering Guidance
                </span>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed italic">
                  &ldquo;{currentStage.engineerTip}&rdquo;
                </p>
              </div>
            </div>
          </div>

          {/* Key Deliverables Matrix */}
          <div>
            <span className="text-xs font-mono uppercase tracking-wider text-slate-400 font-bold block mb-2">
              Standard Milestone Deliverables:
            </span>
            <ul className="space-y-2">
              {currentStage.specs.map((spec, sIdx) => (
                <li key={sIdx} className="flex items-center gap-2.5 text-xs text-slate-200">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span>{spec}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
