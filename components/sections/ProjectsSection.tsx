"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ArrowUpRight, MapPin, Building, Sparkles, Layers } from "lucide-react";

export default function ProjectsSection({ onOpenQuote }: { onOpenQuote: () => void }) {
  const [activeCategory, setActiveCategory] = useState("all");

  const projects = [
    {
      id: 1,
      name: "The Aurelia Modern Minimalist Villa",
      category: "villa",
      location: "East Coast Road, Chennai",
      area: "7,400 sq.ft",
      status: "Delivered 2026",
      image: "/images/stages/stage-12.jpg",
      description: "Signature contemporary residence featuring a 3.8m cantilevered private wing, bespoke Italian marble flooring, and smart KNX automation.",
      specs: ["M35 Concrete", "Fe550D TMT", "LEED Platinum"],
    },
    {
      id: 2,
      name: "Solarium Glass Cantilever Estate",
      category: "villa",
      location: "Whitefield Hills, Bangalore",
      area: "5,850 sq.ft",
      status: "Delivered 2025",
      image: "/images/stages/stage-11.jpg",
      description: "Double-height panoramic glass villa with thermal break aluminum glazing, rooftop solar arrays, and automated landscaping.",
      specs: ["Double Glazed", "Post-Tensioned", "IGBC Net Zero"],
    },
    {
      id: 3,
      name: "Apex Tower Corporate Hub",
      category: "commercial",
      location: "Financial District, Hyderabad",
      area: "42,000 sq.ft",
      status: "Completed 2025",
      image: "/images/stages/stage-05.jpg",
      description: "High-tensile structural steel landmark with post-tensioned floor slabs and subterranean multi-level parking facilities.",
      specs: ["Class-A Steel", "HVAC Integrated", "IS 13920 Seismic"],
    },
    {
      id: 4,
      name: "Serenade Luxury Gated Enclave",
      category: "residential",
      location: "Alwarpet, Chennai",
      area: "22,000 sq.ft",
      status: "Delivered 2024",
      image: "/images/stages/stage-10.jpg",
      description: "Boutique four-villa gated development with bespoke Canadian cedar wood facades, private elevators, and sound-attenuated interiors.",
      specs: ["STC 55 Acoustic", "Dual Waterproofing", "Key Handover"],
    },
  ];

  const filtered = activeCategory === "all" ? projects : projects.filter((p) => p.category === activeCategory);

  return (
    <section id="projects" className="py-24 bg-[#05080E] border-t border-white/5 relative">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14">
          <div>
            <div className="inline-flex items-center space-x-2 text-red-500 text-xs font-mono tracking-widest uppercase mb-2">
              <Sparkles className="h-3.5 w-3.5" />
              <span>JANCY BUILDERS ARCHITECTURAL PORTFOLIO</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight font-serif">
              Masterpiece Creations
            </h2>
            <p className="mt-3 text-slate-400 text-sm max-w-xl leading-relaxed">
              Every residence is engineered with unyielding mathematical precision, pure aesthetic restraint, and lifetime structural peace of mind.
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="mt-6 md:mt-0 flex items-center space-x-1.5 bg-slate-900/80 p-1.5 rounded-2xl border border-white/10">
            {[
              { id: "all", label: "All Works" },
              { id: "villa", label: "Signature Villas" },
              { id: "residential", label: "Enclaves" },
              { id: "commercial", label: "Commercial" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveCategory(tab.id)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-mono transition-all ${
                  activeCategory === tab.id
                    ? "bg-red-600 text-white font-bold shadow-md shadow-red-600/30"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filtered.map((proj) => (
            <div
              key={proj.id}
              className="glass-card-premium rounded-3xl overflow-hidden border border-white/10 flex flex-col group"
            >
              {/* Image Container */}
              <div className="relative h-80 sm:h-96 w-full overflow-hidden bg-slate-950">
                <Image
                  src={proj.image}
                  alt={proj.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#060A12] via-black/30 to-transparent" />

                {/* Status Badges */}
                <div className="absolute top-4 left-4 bg-slate-950/80 backdrop-blur-md px-3 py-1 rounded-full border border-red-500/30 text-[10px] font-mono text-red-400 font-bold uppercase">
                  {proj.status}
                </div>

                <div className="absolute top-4 right-4 bg-slate-950/80 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-mono text-sky-400 border border-sky-500/20">
                  {proj.area}
                </div>
              </div>

              {/* Details */}
              <div className="p-7 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <div className="flex items-center space-x-2 text-xs text-slate-400 mb-1.5 font-mono">
                    <MapPin className="h-3.5 w-3.5 text-red-500" />
                    <span>{proj.location}</span>
                  </div>
                  <h3 className="text-2xl font-bold text-white group-hover:text-red-400 transition-colors font-serif">
                    {proj.name}
                  </h3>
                  <p className="mt-2.5 text-xs sm:text-sm text-slate-300/90 leading-relaxed">
                    {proj.description}
                  </p>
                </div>

                {/* Engineering Spec Tags */}
                <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center space-x-2">
                    {proj.specs.map((spc, i) => (
                      <span
                        key={i}
                        className="px-2.5 py-1 rounded-lg bg-slate-900 border border-white/5 text-[10px] font-mono text-slate-300"
                      >
                        {spc}
                      </span>
                    ))}
                  </div>

                  <button
                    onClick={onOpenQuote}
                    className="text-xs font-mono font-bold text-red-400 hover:text-red-300 flex items-center space-x-1"
                  >
                    <span>Request BOQ</span>
                    <ArrowUpRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
