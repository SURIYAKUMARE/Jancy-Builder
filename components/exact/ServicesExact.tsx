"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Home,
  Building2,
  Compass,
  Flame,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  ArrowUpRight,
} from "lucide-react";
import { motion } from "framer-motion";

interface ServicesExactProps {
  onOpenQuote: () => void;
}

export default function ServicesExact({ onOpenQuote }: ServicesExactProps) {
  const [activeTab, setActiveTab] = useState<number>(0);

  const services = [
    {
      id: "residential",
      num: "01",
      category: "RESIDENTIAL",
      title: "Turnkey Luxury Villas & Duplexes",
      subtitle: "Custom architectural planning to key handover with zero cost escalation.",
      icon: Home,
      image: "/images/projects/site-silathikulam-murugan.jpg",
      highlight: "Itemized BOQ & 100% Fixed Cost",
      specs: [
        "Architectural 2D/3D & Structural Elevation",
        "Soil SBC Testing & Raft / Footing Design",
        "Teakwood Doors, Italian Marble / Granite",
        "10-Year Comprehensive Waterproofing Warranty",
      ],
      tagline: "Tailored for multi-generational living in South Tamil Nadu.",
    },
    {
      id: "porotherm",
      num: "02",
      category: "INNOVATION",
      title: "Porotherm Eco-Thermal Clay Masonry",
      subtitle: "Wienerberger perforated hollow clay bricks keeping interiors naturally 6°C cooler.",
      icon: Flame,
      image: "/images/projects/site-samugarengapuram-porotherm.jpg",
      highlight: "6°C Cooler Indoor Temperature",
      specs: [
        "100% Natural Wienerberger Perforated Clay",
        "60% Lighter Masonry Reducing Footing Seismic Load",
        "Thin-Bed Polymer Mortar with Zero Thermal Gaps",
        "Class A1 Fire Resistance & Acoustic Insulation",
      ],
      tagline: "Proven thermal comfort in Samugarengapuram & Tirunelveli.",
    },
    {
      id: "structural",
      num: "03",
      category: "ENGINEERING",
      title: "Civil Engineering & Structural Rigor",
      subtitle: "Fe550D TMT earthquake-resistant framing under direct founder supervision.",
      icon: ShieldCheck,
      image: "/images/projects/site-durainagar-praveen.jpg",
      highlight: "Direct Er. Stalin Supervision",
      specs: [
        "Strict IS 456 & IS 13920 Seismic Compliance",
        "NABL-Certified Concrete Cube Compression Tests",
        "Mechanized Boom Placer & Needle Compaction",
        "Continuous 28-Day Water Ponding Curing Log",
      ],
      tagline: "Zero compromise on foundation integrity and rebar spacing.",
    },
    {
      id: "commercial",
      num: "04",
      category: "INFRASTRUCTURE",
      title: "Commercial Hubs & Retail Complexes",
      subtitle: "High-yield commercial spaces with column-free spans and curtain wall glazing.",
      icon: Building2,
      image: "/images/projects/office-building.jpg",
      highlight: "Heavy Load Structural Engineering",
      specs: [
        "Continuous Raft / Heavy Load Substructure",
        "Acoustic Double-Glazed Curtain Wall Facades",
        "High-Speed Automatic Lift Shaft Detailing",
        "Local Municipal & Commercial Fire Approvals",
      ],
      tagline: "Engineered for maximum retail footfall & commercial longevity.",
    },
  ];

  return (
    <section id="services" className="w-full bg-[#F8F6F1] py-20 lg:py-28 border-b border-[#E2D9CC] relative overflow-hidden scroll-mt-20">
      {/* Background Architectural Grid Pattern */}
      <div className="absolute inset-0 opacity-15 pointer-events-none bg-[linear-gradient(to_right,#B78A52_1px,transparent_1px),linear-gradient(to_bottom,#B78A52_1px,transparent_1px)] bg-[size:5rem_5rem]" />

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-14 pb-8 border-b border-[#E2D9CC]">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-3">
              <span className="h-[2px] w-8 bg-[#B78A52] block" />
              <span className="text-xs font-mono font-semibold uppercase tracking-[0.25em] text-[#B78A52]">
                ARCHITECTURAL DISCIPLINE • CIVIL ENGINEERING
              </span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-black text-[#17191B] tracking-tight leading-[1.1] font-sans">
              Engineered With Rigor.<br />
              <span className="text-[#B78A52] font-serif italic font-normal">
                Crafted For Generations.
              </span>
            </h2>

            <p className="mt-4 text-sm sm:text-base text-[#202124]/75 leading-relaxed font-normal">
              Every project is personally directed by Chief Civil Engineer <strong>Er. Sahaya Antony Stalin</strong>, B.E. (Civil), combining architectural sophistication with structural permanence.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/services"
              className="inline-flex items-center gap-2 bg-white hover:bg-[#F8F6F1] border border-[#E2D9CC] text-[#17191B] font-semibold text-xs sm:text-sm px-5 py-3 rounded-full transition-all shadow-sm hover:border-[#B78A52]"
            >
              <span>Explore All Specifications</span>
              <ArrowUpRight className="w-4 h-4 text-[#B78A52]" />
            </Link>

            <button
              onClick={onOpenQuote}
              className="inline-flex items-center gap-2 bg-[#17191B] hover:bg-[#B78A52] text-white font-semibold text-xs sm:text-sm px-6 py-3 rounded-full shadow-lg shadow-black/10 transition-all border border-[#B78A52]/30"
            >
              <span>Request Quote</span>
              <ArrowRight className="w-4 h-4 text-[#B78A52] group-hover:text-white" />
            </button>
          </div>
        </div>

        {/* 4 Architectural Discipline Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
          {services.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.5, ease: "easeOut" }}
                whileHover={{ y: -6 }}
                onClick={onOpenQuote}
                className="group cursor-pointer bg-white rounded-3xl border border-[#E2D9CC] p-6 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between hover:border-[#B78A52]/50 relative overflow-hidden"
              >
                {/* Top Discipline Number & Tag */}
                <div>
                  <div className="flex items-center justify-between mb-4 pb-3 border-b border-[#E2D9CC]/50">
                    <span className="font-mono text-xl font-black text-[#B78A52]">
                      {item.num}
                    </span>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-[#17191B]/60 font-semibold px-2.5 py-1 rounded-full bg-[#F8F6F1] border border-[#E2D9CC]">
                      {item.category}
                    </span>
                  </div>

                  {/* Icon & Title */}
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-2xl bg-[#B78A52]/10 text-[#B78A52] flex items-center justify-center flex-shrink-0 group-hover:bg-[#B78A52] group-hover:text-white transition-colors duration-300">
                      <Icon className="w-5 h-5 stroke-[2]" />
                    </div>
                    <h3 className="text-base font-bold text-[#17191B] font-sans group-hover:text-[#B78A52] transition-colors leading-snug">
                      {item.title}
                    </h3>
                  </div>

                  <p className="text-xs text-[#202124]/70 mt-2 leading-relaxed">
                    {item.subtitle}
                  </p>

                  {/* Key Specifications Bullet Points */}
                  <div className="mt-4 pt-3 border-t border-[#E2D9CC]/40 space-y-2">
                    {item.specs.map((spec, sIdx) => (
                      <div key={sIdx} className="flex items-start gap-2 text-[11px] text-[#202124]/80">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#B78A52] flex-shrink-0 mt-0.5" />
                        <span className="line-clamp-1">{spec}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom: Authentic Project Image Preview with Floating Highlight */}
                <div className="mt-6 pt-2">
                  <div className="relative w-full h-40 rounded-2xl overflow-hidden bg-slate-100 border border-[#E2D9CC]/60 shadow-inner">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
                    
                    <div className="absolute bottom-2.5 inset-x-3 flex items-center justify-between">
                      <span className="text-[10px] font-mono font-semibold uppercase tracking-wider text-[#F8F6F1] bg-black/50 backdrop-blur-md px-2 py-0.5 rounded-full border border-white/10">
                        {item.highlight}
                      </span>
                      <div className="w-7 h-7 rounded-full bg-white text-[#17191B] flex items-center justify-center shadow-md group-hover:bg-[#B78A52] group-hover:text-white transition-colors">
                        <ArrowUpRight className="w-4 h-4" />
                      </div>
                    </div>
                  </div>
                </div>

              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
