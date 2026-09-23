"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  Building2,
  Users2,
  ShieldCheck,
  Trophy,
  ArrowRight,
  FlaskConical,
  Layers,
  Cpu,
  Target,
  Umbrella,
  Scan,
  CheckCircle2,
  X,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function EngineeringPillars() {
  const [selectedPillar, setSelectedPillar] = useState<number | null>(null);

  const pillars = [
    {
      id: 1,
      num: "01",
      icon: FlaskConical,
      title: "Geotechnical & Soil Profiling",
      desc: "Standard Penetration Tests (SPT), borehole extraction, and plate load tests guarantee footings anchor directly into virgin bedrock layers.",
      tag: "IS 1892 / IS 2131 COMPLIANT",
      image: "/images/stages/stage-01.jpg",
      details: "Comprehensive soil stratification analysis, water table depth logging, and SBC (Safe Bearing Capacity) determination ensure zero structural settling over a 100-year architectural lifecycle.",
    },
    {
      id: 2,
      num: "02",
      icon: Layers,
      title: "Earthquake-Resistant RCC Skeleton",
      desc: "Fe550D high-ductility TMT rebars, M30/M35 self-compacting concrete, and confining joint ties engineered to withstand seismic shocks.",
      tag: "IS 13920 SEISMIC DUCTILE SPEC",
      image: "/images/stages/stage-04.jpg",
      details: "Seismic Zone III ductile detailing, ultrasonic rebar lap testing, and computerized batch mix plants ensure monolithic structural integrity against lateral forces.",
    },
    {
      id: 3,
      num: "03",
      icon: Cpu,
      title: "3D BIM Concealed MEP Engineering",
      desc: "Pressure-tested multi-layer plumbing manifolds up to 15 bar and halogen-free low-smoke conduits mapped with zero clashes.",
      tag: "ZERO LEAKAGE GUARANTEE",
      image: "/images/stages/stage-08.jpg",
      details: "Revit 3D coordination models prevent structural beam penetrations, with pre-insulated sound-dampened drainage stacks and loop manifold heating/cooling lines.",
    },
    {
      id: 4,
      num: "04",
      icon: Target,
      title: "Sub-Millimeter Laser Alignment",
      desc: "Digital total-station optical surveys guarantee flawless plumb walls, orthogonal 90° corners, and true level floor planes.",
      tag: "±1MM ACCURACY",
      image: "/images/stages/stage-09.jpg",
      details: "Leica Geosystems 3D laser scanners verify room perpendicularity and floor planarity before Italian marble slab laying, preventing lippage and joint drift.",
    },
    {
      id: 5,
      num: "05",
      icon: Umbrella,
      title: "10-Year Crystalline Waterproofing",
      desc: "Dual elastomeric polyurethane membranes on basements, retaining structures, sunken bathrooms, and terrace slabs.",
      tag: "10-YEAR WARRANTY",
      image: "/images/stages/stage-11.jpg",
      details: "Integral crystalline concrete additives react with moisture to self-heal hairline shrinkage cracks, backed by 72-hour pond testing and certified warranty certificates.",
    },
    {
      id: 6,
      num: "06",
      icon: Scan,
      title: "Digital Milestone Audits & Drone Scans",
      desc: "High-definition weekly drone photogrammetry and third-party laboratory compression cube test certificates provided to every homeowner.",
      tag: "FULL TRANSPARENCY",
      image: "/images/stages/stage-12.jpg",
      details: "Cloud-hosted 4K milestone progress logs, NABL-accredited 7-day and 28-day concrete cube compression test sheets, and mill test certificates accessible via client portal.",
    },
  ];

  return (
    <section id="engineering" className="relative py-20 lg:py-28 bg-[#FBF9F5] overflow-hidden">
      {/* Background Architectural Villa Overlay on Right */}
      <div className="absolute right-0 top-0 bottom-0 w-full lg:w-[45%] h-full opacity-10 pointer-events-none overflow-hidden">
        <Image
          src="/images/hero-sunset-villa.jpg"
          alt="Jancy Builders Engineering Rigor"
          fill
          className="object-cover object-center"
        />
      </div>

      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-8">
          <div className="flex items-center gap-3 mb-2">
            <span className="h-[2px] w-8 bg-[#C29061] block" />
            <span className="text-xs font-mono font-bold uppercase tracking-[0.25em] text-slate-500">
              OUR EXPERTISE
            </span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black text-slate-950 tracking-tight font-sans">
            Precision Civil Engineering<br />
            <span className="text-[#C29061]">Behind Every Wall</span>
          </h2>

          <p className="mt-4 text-slate-600 text-sm sm:text-base leading-relaxed">
            True architectural luxury is not merely surface finishes; it is the mathematical rigor, soil mechanics, and seismic strength embedded within every structural footing.
          </p>
        </div>

        {/* 4 Stats in Horizontal Row with Red Accent Icons */}
        <div className="flex items-center flex-wrap gap-8 sm:gap-14 py-4 mb-12 border-b border-slate-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-red-50 text-red-600 flex items-center justify-center flex-shrink-0">
              <Building2 className="w-5 h-5 text-red-600" />
            </div>
            <div>
              <span className="text-xl font-black text-slate-950 block leading-tight">250+</span>
              <span className="text-xs text-slate-500 font-medium">Projects Completed</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-red-50 text-red-600 flex items-center justify-center flex-shrink-0">
              <Users2 className="w-5 h-5 text-red-600" />
            </div>
            <div>
              <span className="text-xl font-black text-slate-950 block leading-tight">500+</span>
              <span className="text-xs text-slate-500 font-medium">Happy Clients</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-red-50 text-red-600 flex items-center justify-center flex-shrink-0">
              <ShieldCheck className="w-5 h-5 text-red-600" />
            </div>
            <div>
              <span className="text-xl font-black text-slate-950 block leading-tight">8+</span>
              <span className="text-xs text-slate-500 font-medium">Years of Experience</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-red-50 text-red-600 flex items-center justify-center flex-shrink-0">
              <Trophy className="w-5 h-5 text-red-600" />
            </div>
            <div>
              <span className="text-xl font-black text-slate-950 block leading-tight">4.8+</span>
              <span className="text-xs text-slate-500 font-medium">Client Satisfaction</span>
            </div>
          </div>
        </div>

        {/* 6 White Cards in 3x2 Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
          {pillars.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <motion.div
                key={pillar.id}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.2 }}
                onClick={() => setSelectedPillar(pillar.id)}
                className="bg-white rounded-3xl p-5 sm:p-6 shadow-xl border border-slate-200/80 flex flex-col justify-between hover:shadow-2xl transition-all cursor-pointer group"
              >
                <div>
                  {/* Card Header: Left Image Thumbnail & Right Number/Icon */}
                  <div className="flex items-center gap-4 mb-4">
                    <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden bg-slate-100 flex-shrink-0">
                      <Image
                        src={pillar.image}
                        alt={pillar.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-xs font-mono font-bold text-slate-400">
                          {pillar.num}
                        </span>
                        <div className="w-6 h-6 rounded-full bg-[#C29061]/15 text-[#C29061] flex items-center justify-center flex-shrink-0">
                          <Icon className="w-3.5 h-3.5" />
                        </div>
                      </div>
                      <h3 className="text-sm font-bold text-slate-950 leading-snug group-hover:text-[#C29061] transition-colors line-clamp-2">
                        {pillar.title}
                      </h3>
                    </div>
                  </div>

                  {/* Card Description */}
                  <p className="text-xs text-slate-500 leading-relaxed line-clamp-3 mb-4 font-normal">
                    {pillar.desc}
                  </p>
                </div>

                {/* Card Footer: Compliance Badge + Arrow */}
                <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[10px] font-mono font-bold tracking-wider text-slate-600 bg-slate-100 px-2.5 py-1 rounded-full uppercase">
                    {pillar.tag}
                  </span>
                  <div className="w-7 h-7 rounded-full border border-slate-200 group-hover:border-[#C29061] group-hover:bg-[#C29061] group-hover:text-white text-slate-600 flex items-center justify-center transition-colors">
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>

      {/* Detail Modal when a Pillar Card is clicked */}
      <AnimatePresence>
        {selectedPillar !== null && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative border border-slate-100"
            >
              <button
                onClick={() => setSelectedPillar(null)}
                className="absolute top-5 right-5 w-8 h-8 rounded-full bg-slate-100 text-slate-600 hover:bg-slate-200 flex items-center justify-center transition-colors"
              >
                <X className="w-4 h-4" />
              </button>

              {(() => {
                const active = pillars.find((p) => p.id === selectedPillar);
                if (!active) return null;
                const Icon = active.icon;
                return (
                  <div className="space-y-4">
                    <div className="relative h-48 w-full rounded-2xl overflow-hidden bg-slate-100">
                      <Image
                        src={active.image}
                        alt={active.title}
                        fill
                        className="object-cover"
                      />
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono font-bold text-slate-400">
                        {active.num}
                      </span>
                      <span className="text-xs font-mono font-bold text-[#C29061] bg-[#C29061]/10 px-2.5 py-1 rounded-full">
                        {active.tag}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold text-slate-950 font-sans">
                      {active.title}
                    </h3>

                    <p className="text-sm text-slate-600 leading-relaxed">
                      {active.desc}
                    </p>

                    <div className="p-4 bg-[#FAF8F5] rounded-2xl border border-slate-200/80">
                      <div className="flex items-center gap-2 text-xs font-bold text-slate-900 mb-1">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        <span>Civil Engineering Rigor Spec</span>
                      </div>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        {active.details}
                      </p>
                    </div>

                    <button
                      onClick={() => setSelectedPillar(null)}
                      className="w-full py-3 rounded-full bg-slate-950 hover:bg-slate-800 text-white font-bold text-xs transition-colors"
                    >
                      Close Specifications
                    </button>
                  </div>
                );
              })()}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
