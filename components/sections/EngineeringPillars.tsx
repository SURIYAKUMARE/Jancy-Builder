"use client";

import React from "react";
import { ShieldCheck, Layers, Cpu, Award, Ruler, Hammer, Sparkles, CheckCircle2 } from "lucide-react";

export default function EngineeringPillars() {
  const pillars = [
    {
      icon: ShieldCheck,
      title: "Geotechnical & Soil Profiling",
      desc: "Standard Penetration Tests (SPT), borehole extraction, and plate load tests guarantee footings anchor directly into virgin bedrock layers.",
      code: "IS 1892 / IS 2131 COMPLIANT",
      tag: "SITE SAFETY",
    },
    {
      icon: Layers,
      title: "Earthquake-Resistant RCC Skeleton",
      desc: "Fe550D high-ductility TMT rebars, M30/M35 self-compacting concrete, and confining joint ties engineered to withstand seismic shocks.",
      code: "IS 13920 SEISMIC DUCTILE SPEC",
      tag: "STRUCTURE",
    },
    {
      icon: Cpu,
      title: "3D BIM Concealed MEP Engineering",
      desc: "Pressure-tested multi-layer plumbing manifolds up to 15 bar and halogen-free low-smoke conduits mapped with zero clashes.",
      code: "ZERO LEAKAGE GUARANTEE",
      tag: "SERVICES",
    },
    {
      icon: Ruler,
      title: "Sub-Millimeter Laser Alignment",
      desc: "Digital total-station optical surveys guarantee flawless plumb walls, orthogonal 90° corners, and true level floor planes.",
      code: "CLASS-A DIMENSIONAL ACCURACY",
      tag: "PRECISION",
    },
    {
      icon: Award,
      title: "10-Year Crystalline Waterproofing",
      desc: "Dual elastomeric polyurethane membranes on basements, retaining structures, sunken bathrooms, and terrace slabs.",
      code: "ASTM D412 WATERPROOFING SPEC",
      tag: "DURABILITY",
    },
    {
      icon: Hammer,
      title: "Digital Milestone Audits & Drone Scans",
      desc: "High-definition weekly drone photogrammetry and third-party laboratory compression cube test certificates provided to every homeowner.",
      code: "100% QUALITY TRACEABILITY",
      tag: "TRANSPARENCY",
    },
  ];

  return (
    <section className="py-24 bg-[#05080E] border-t border-white/5 relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 text-sky-400 text-xs font-mono tracking-widest uppercase mb-2">
            <Sparkles className="h-3.5 w-3.5" />
            <span>THE JANCY BUILDERS CREDO</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight font-serif">
            Precision Civil Engineering Behind Every Wall
          </h2>
          <p className="mt-4 text-sm sm:text-base text-slate-400 leading-relaxed">
            True architectural luxury is not merely surface finishes; it is the mathematical rigor, soil mechanics, and seismic strength embedded within every structural footing.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pillars.map((p, idx) => {
            const Icon = p.icon;
            return (
              <div
                key={idx}
                className="glass-card-premium p-7 rounded-3xl border border-white/10 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="h-12 w-12 rounded-2xl bg-red-600/10 border border-red-500/25 flex items-center justify-center text-red-500 group-hover:bg-red-600 group-hover:text-white transition-all shadow-md">
                      <Icon className="h-6 w-6" />
                    </div>
                    <span className="text-[10px] font-mono tracking-wider px-2.5 py-1 rounded-full bg-slate-900 border border-white/5 text-slate-400">
                      {p.tag}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-white mb-2 font-serif group-hover:text-red-400 transition-colors">
                    {p.title}
                  </h3>
                  <p className="text-xs text-slate-300/80 leading-relaxed mb-6">
                    {p.desc}
                  </p>
                </div>

                <div className="pt-4 border-t border-white/5 flex items-center justify-between text-[10px] font-mono text-sky-400">
                  <span>{p.code}</span>
                  <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
