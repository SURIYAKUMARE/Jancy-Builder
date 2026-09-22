"use client";

import React from "react";
import { ShieldCheck, Layers, Cpu, Award, Ruler, Hammer } from "lucide-react";

export default function EngineeringPillars() {
  const pillars = [
    {
      icon: ShieldCheck,
      title: "Geotechnical & Soil Profiling",
      desc: "Comprehensive standard penetration test (SPT), borehole analysis, and plate load tests ensure footings are anchored to virgin rock layers.",
      code: "IS 1892 / IS 2131 Compliant",
    },
    {
      icon: Layers,
      title: "Earthquake-Resistant RCC Framing",
      desc: "Special ductile detailing with Fe550D TMT reinforcement, high-grade M30/M35 self-compacting concrete, and beam-column joint confining ties.",
      code: "IS 13920 Ductile Seismic Design",
    },
    {
      icon: Cpu,
      title: "Smart Concealed MEP Engineering",
      desc: "Engineered multi-layer plumbing manifolds with pressure testing up to 15 bar and halogen-free low-smoke conduits routed via 3D BIM coordination.",
      code: "Zero Leakage Lifetime Guarantee",
    },
    {
      icon: Ruler,
      title: "Laser Level & Digital Alignment",
      desc: "Sub-millimeter total-station optical surveys guarantee flawless plumb walls, perfectly orthogonal corners, and true level floor planes.",
      code: "Class-A Dimensional Tolerance",
    },
    {
      icon: Award,
      title: "10-Year Waterproofing Warranty",
      desc: "Dual-layer elastomeric crystalline polyurethane barrier membranes on basements, sunken slabs, and exposed terrace slabs.",
      code: "ASTM D412 Waterproofing Spec",
    },
    {
      icon: Hammer,
      title: "Transparent Digital Milestone Audits",
      desc: "Daily high-definition drone progress scans and stage-by-stage laboratory slump test certificates shared transparently via client portal.",
      code: "100% Quality Assurance Traceability",
    },
  ];

  return (
    <section className="py-24 bg-[#05080E] border-t border-slate-900 relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-mono uppercase tracking-[0.25em] text-yellow-400 font-bold">
            The Jancy Engineering Standard
          </span>
          <h2 className="mt-2 text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Built With Precision. Engineered For Generations.
          </h2>
          <p className="mt-4 text-sm sm:text-base text-slate-400 leading-relaxed">
            True luxury is not just what you see on the surface; it is the uncompromising structural discipline embedded inside every column, beam, and footing.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pillars.map((p, idx) => {
            const Icon = p.icon;
            return (
              <div
                key={idx}
                className="glass-panel p-6 rounded-2xl border border-slate-800 hover:border-yellow-500/40 transition-all duration-300 group hover:-translate-y-1"
              >
                <div className="h-12 w-12 rounded-xl bg-yellow-500/10 border border-yellow-500/30 flex items-center justify-center text-yellow-400 mb-4 group-hover:bg-yellow-500 group-hover:text-slate-950 transition-all">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="text-base font-bold text-white mb-2">{p.title}</h3>
                <p className="text-xs text-slate-400 leading-relaxed mb-4">{p.desc}</p>
                <div className="pt-3 border-t border-slate-800 text-[10px] font-mono text-sky-400/80">
                  {p.code}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
