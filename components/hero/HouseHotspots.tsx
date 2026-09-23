"use client";

import React, { useState } from "react";
import { X, Ruler, CheckCircle2, Shield, Info } from "lucide-react";

interface Hotspot {
  id: string;
  x: number; // percentage from left
  y: number; // percentage from top
  title: string;
  tag: string;
  description: string;
  specs: { [key: string]: string };
}

const hotspots: Hotspot[] = [
  {
    id: "cantilever",
    x: 28,
    y: 28,
    title: "Post-Tensioned Cantilever Box",
    tag: "STRUCTURAL DYNAMICS",
    description: "Architectural 3.8-meter clear overhang with zero vertical corner support columns, engineered using post-tensioned bonded high-tensile steel tendons.",
    specs: {
      "Overhang Span": "3.80 meters",
      "Deflection Limit": "< Span / 500",
      "Steel Grade": "Fe550D High Ductility",
      "Tendon Stress": "1860 MPa Low Relaxation",
    },
  },
  {
    id: "glazing",
    x: 36,
    y: 62,
    title: "Thermal-Break Panoramic Glazing",
    tag: "ENVELOPE & ACOUSTICS",
    description: "Floor-to-ceiling multi-track sliding panels with dual polyamide thermal breaks, argon gas fill, and low-emissivity coating.",
    specs: {
      "Acoustic Rating": "STC 44 dB",
      "Thermal Transmittance": "U-Value 1.1 W/m²K",
      "Glass Type": "10mm Toughened + 1.52 PVB + 10mm",
      "Wind Pressure": "1,800 Pa Tested",
    },
  },
  {
    id: "foundation",
    x: 68,
    y: 78,
    title: "Subterranean Raft & Retaining Walls",
    tag: "GEOTECHNICAL & WATERPROOFING",
    description: "450mm solid RCC raft footing integrated with perimeter retaining walls and double-coat bituminous crystalline membrane protection.",
    specs: {
      "Concrete Grade": "M30 Self-Compacting",
      "Waterproofing": "Dual Polyurethane Membrane",
      "Bearing Capacity": "240 kN/m² Verified",
      "Warranty": "25-Year Foundation Guarantee",
    },
  },
  {
    id: "mep",
    x: 48,
    y: 38,
    title: "Concealed 3D BIM MEP Manifold",
    tag: "SMART ENGINEERING",
    description: "Full concealed fire-retardant electrical conduits and SDR-11 composite CPVC plumbing networks mapped via clash-free digital BIM models.",
    specs: {
      "Hydrostatic Test": "15 Bar Sustained Pressure",
      "Conduit Type": "FR-LSH Low-Smoke Zero-Halogen",
      "Automation": "KNX Smart Bus Backbone",
      "Isolation": "Independent Floor Manifolds",
    },
  },
  {
    id: "cladding",
    x: 34,
    y: 18,
    title: "Architectural Stone & Cedar Cladding",
    tag: "EXTERIOR FINISH",
    description: "Kiln-dried Canadian cedar battens treated with micro-porous UV sealant paired with volcanic basalt charcoal stone veneer panels.",
    specs: {
      "Wood Species": "Western Red Cedar (Kiln Dried)",
      "Veneer Backing": "Ventilated Rainscreen Subframe",
      "Fasteners": "Grade 316 Stainless Steel Hidden Clips",
      "UV Rating": "Class 1 High Weatherability",
    },
  },
];

interface HouseHotspotsProps {
  isVisible: boolean;
}

export default function HouseHotspots({ isVisible }: HouseHotspotsProps) {
  const [activeHotspotId, setActiveHotspotId] = useState<string | null>(null);

  if (!isVisible) return null;

  const activeHotspot = hotspots.find((h) => h.id === activeHotspotId);

  return (
    <div className="absolute inset-0 z-20 pointer-events-none">
      {/* Interactive Glowing Pins */}
      {hotspots.map((h) => {
        const isActive = h.id === activeHotspotId;
        return (
          <div
            key={h.id}
            className="absolute transform -translate-x-1/2 -translate-y-1/2 pointer-events-auto"
            style={{ left: `${h.x}%`, top: `${h.y}%` }}
          >
            {/* Outer pulsating ring */}
            <button
              onClick={() => setActiveHotspotId(isActive ? null : h.id)}
              className="relative flex items-center justify-center group"
              title={`Inspect ${h.title}`}
            >
              <span className="animate-ping absolute inline-flex h-8 w-8 rounded-full bg-red-500 opacity-60" />
              <span className="relative flex items-center justify-center h-7 w-7 rounded-full bg-slate-950/90 border-2 border-red-500 text-white shadow-[0_0_15px_rgba(229,9,20,0.8)] group-hover:scale-125 transition-transform">
                <Info className="h-3.5 w-3.5 text-red-400 group-hover:text-white" />
              </span>

              {/* Mini pin label */}
              <span className="absolute left-8 top-1/2 -translate-y-1/2 hidden group-hover:block bg-slate-950/90 backdrop-blur-md px-2.5 py-1 rounded-lg border border-red-500/40 text-[10px] font-mono text-white whitespace-nowrap shadow-xl">
                {h.title}
              </span>
            </button>
          </div>
        );
      })}

      {/* Expanded Hotspot Callout Modal Card */}
      {activeHotspot && (
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md p-4 pointer-events-auto z-50 animate-in fade-in zoom-in-95 duration-200">
          <div className="glass-card-premium rounded-3xl p-6 border-2 border-red-500/40 shadow-2xl bg-[#090E1A]/95 backdrop-blur-2xl">
            <div className="flex items-start justify-between pb-3 border-b border-white/10">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-red-500 font-bold">
                  {activeHotspot.tag}
                </span>
                <h4 className="text-lg font-bold text-white font-serif mt-0.5">
                  {activeHotspot.title}
                </h4>
              </div>

              <button
                onClick={() => setActiveHotspotId(null)}
                className="p-1.5 rounded-xl bg-slate-900 text-slate-400 hover:text-white transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <p className="mt-3 text-xs text-slate-300 leading-relaxed">
              {activeHotspot.description}
            </p>

            <div className="mt-4 pt-3 border-t border-white/5 space-y-1.5 font-mono text-xs">
              <span className="text-[10px] text-sky-400 uppercase tracking-wider flex items-center space-x-1">
                <Ruler className="h-3 w-3" />
                <span>Structural Parameter Verification</span>
              </span>
              <div className="grid grid-cols-1 gap-1.5 pt-1">
                {Object.entries(activeHotspot.specs).map(([k, v]) => (
                  <div
                    key={k}
                    className="flex justify-between items-center py-1 px-2.5 rounded-lg bg-slate-900/80 border border-white/5 text-[11px]"
                  >
                    <span className="text-slate-400">{k}:</span>
                    <span className="text-white font-bold">{v}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-4 pt-2 flex items-center justify-between text-[10px] font-mono text-emerald-400">
              <span className="flex items-center space-x-1">
                <CheckCircle2 className="h-3.5 w-3.5" />
                <span>Audited by Chief Structural Architect</span>
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
