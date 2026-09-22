"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ArrowUpRight, MapPin, Building, Sparkles } from "lucide-react";

export default function ProjectsSection({ onOpenQuote }: { onOpenQuote: () => void }) {
  const [activeCategory, setActiveCategory] = useState("all");

  const projects = [
    {
      id: 1,
      name: "The Grand Aurelia Residence",
      category: "villa",
      location: "ECR Seaside Enclave, Chennai",
      area: "7,200 sq.ft",
      status: "Completed 2026",
      image: "/images/stages/stage-12.jpg",
      description: "Ultra-luxury modern minimalist residence with cantilevered private wing, infinity pool, and bespoke Italian marble finishes.",
    },
    {
      id: 2,
      name: "Solarium Glass Villa",
      category: "villa",
      location: "Whitefield Hills, Bangalore",
      area: "5,400 sq.ft",
      status: "Completed 2025",
      image: "/images/stages/stage-11.jpg",
      description: "Contemporary biophilic villa featuring double-height glass atrium, integrated smart automation, and solar-passive orientation.",
    },
    {
      id: 3,
      name: "Apex Corporate Landmark",
      category: "commercial",
      location: "Financial District, Hyderabad",
      area: "34,000 sq.ft",
      status: "Completed 2025",
      image: "/images/stages/stage-05.jpg",
      description: "Grade-A commercial workspace with high-tensile steel frame, post-tensioned slabs, and LEED Gold sustainability rating.",
    },
    {
      id: 4,
      name: "Serenade Luxury Enclave",
      category: "residential",
      location: "Alwarpet, Chennai",
      area: "18,500 sq.ft",
      status: "Delivered 2024",
      image: "/images/stages/stage-10.jpg",
      description: "Exclusive gated enclave of four signature homes with subterranean parking, private elevators, and landscaped terraces.",
    },
  ];

  const filtered = activeCategory === "all" ? projects : projects.filter((p) => p.category === activeCategory);

  return (
    <section id="projects" className="py-24 bg-[#060A12] border-t border-slate-900 relative">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <div className="inline-flex items-center space-x-2 text-yellow-400 text-xs font-mono tracking-widest uppercase mb-2">
              <Sparkles className="h-3.5 w-3.5" />
              <span>Architectural Portfolio</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
              Featured Creations
            </h2>
            <p className="mt-3 text-slate-400 text-sm max-w-xl">
              Each structure is an enduring testament to our uncompromising pursuit of structural perfection, timeless aesthetics, and craft.
            </p>
          </div>

          {/* Filter Tabs */}
          <div className="mt-6 md:mt-0 flex items-center space-x-2 bg-slate-900/90 p-1.5 rounded-xl border border-slate-800">
            {[
              { id: "all", label: "All Projects" },
              { id: "villa", label: "Luxury Villas" },
              { id: "residential", label: "Residential" },
              { id: "commercial", label: "Commercial" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveCategory(tab.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  activeCategory === tab.id
                    ? "bg-yellow-500 text-slate-950 font-bold shadow-sm"
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
              className="group relative rounded-2xl overflow-hidden glass-panel border border-slate-800 hover:border-yellow-500/40 transition-all duration-500 hover:shadow-2xl hover:shadow-yellow-500/10 flex flex-col"
            >
              {/* Image Container */}
              <div className="relative h-72 sm:h-80 w-full overflow-hidden bg-slate-950">
                <Image
                  src={proj.image}
                  alt={proj.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />

                {/* Status Badge */}
                <div className="absolute top-4 left-4 bg-slate-950/80 backdrop-blur-md px-3 py-1 rounded-full border border-yellow-500/30 text-[10px] font-mono text-yellow-400 font-bold uppercase tracking-wider">
                  {proj.status}
                </div>

                <div className="absolute top-4 right-4 bg-slate-950/80 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-mono text-slate-300">
                  {proj.area}
                </div>
              </div>

              {/* Card Content */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <div className="flex items-center space-x-2 text-xs text-slate-400 mb-1">
                    <MapPin className="h-3.5 w-3.5 text-yellow-500" />
                    <span>{proj.location}</span>
                  </div>
                  <h3 className="text-xl font-bold text-white group-hover:text-yellow-400 transition-colors">
                    {proj.name}
                  </h3>
                  <p className="mt-2 text-xs text-slate-400 leading-relaxed">
                    {proj.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between">
                  <button
                    onClick={onOpenQuote}
                    className="text-xs font-bold text-yellow-400 hover:text-yellow-300 flex items-center space-x-1"
                  >
                    <span>Request Similar Project Plan</span>
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
