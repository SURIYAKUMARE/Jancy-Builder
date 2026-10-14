"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Compass,
  FileCheck,
  Shield,
  Layers,
  Award,
  Key,
  CheckCircle2,
  ArrowRight,
  Clock,
  HelpCircle,
} from "lucide-react";
import NavbarExact from "@/components/exact/NavbarExact";
import FooterExact from "@/components/exact/FooterExact";
import FloatingWhatsApp from "@/components/common/FloatingWhatsApp";
import QuoteModal from "@/components/quote/QuoteModal";

export default function ProcessPageClient() {
  const [isQuoteOpen, setIsQuoteOpen] = useState(false);

  const stages = [
    {
      num: "01",
      icon: Compass,
      title: "Consultation & Soil SBC Investigation",
      timeline: "Days 1 – 7",
      image: "/images/stages/stage-01.jpg",
      description:
        "We start at your plot with Chief Civil Engineer Er. Sahaya Antony Stalin. We perform optical boundary surveys, ground level contouring, and geotechnical soil boring to determine Safe Bearing Capacity (SBC).",
      deliverables: [
        "Geotechnical Soil Testing Report (kN/m²)",
        "Topographical Survey & Plot Elevation Grid",
        "Detailed Client Requirement Questionnaire",
        "Initial Feasibility & Budget Range Estimation",
      ],
    },
    {
      num: "02",
      icon: FileCheck,
      title: "Architectural Planning & 3D Sanction Design",
      timeline: "Days 8 – 21",
      image: "/images/stages/stage-02.jpg",
      description:
        "Our design team creates customized 2D architectural floor plans, photorealistic 3D elevations, and structural column-to-beam details in harmony with authentic Vastu Shastra principles.",
      deliverables: [
        "2D Detailed Floor Plans & Working Sections",
        "High-Resolution 3D Exterior & Night Lighting Views",
        "Structural Layout & Column Centerline Drawing",
        "Local Municipality Approval & Sanction File Submission",
      ],
    },
    {
      num: "03",
      icon: Shield,
      title: "Contract Agreement & Certified Procurement",
      timeline: "Days 22 – 28",
      image: "/images/stages/stage-03.jpg",
      description:
        "Transparent, itemized BOQ contract signing with zero hidden clauses. We lock material brands (Fe550D TMT, UltraTech/Dalmia cement, CPVC pipes) and set up site security with subterranean anti-termite barriers.",
      deliverables: [
        "Itemized Bill of Quantities (BOQ) with Fixed Pricing",
        "Milestone-Linked Payment Schedule",
        "Mill Test Certificates for Fe550D TMT Steel Batches",
        "Pre-Construction Anti-Termite Chemical Shielding",
      ],
    },
    {
      num: "04",
      icon: Layers,
      title: "Substructure & Superstructure Execution",
      timeline: "Months 2 – 7",
      image: "/images/stages/stage-08.jpg",
      description:
        "Heavy construction proceeds under daily engineering oversight: isolated pad/raft footings, plinth tie beams, RCC column casting, Wienerberger Porotherm brickwork, and mechanized boom-placer roof slab pouring.",
      deliverables: [
        "M25 / M30 Design Mix Concrete Placement",
        "High-Frequency Needle Vibrator Compaction",
        "Continuous 28-Day Water Ponding Curing Logs",
        "Concealed Electrical Conduit & Plumbing Rough-Ins",
      ],
    },
    {
      num: "05",
      icon: Award,
      title: "Finishing, Waterproofing & NABL Testing",
      timeline: "Months 8 – 11",
      image: "/images/stages/stage-11.jpg",
      description:
        "Precision architectural detailing: multi-coat elastomeric roof waterproofing, teakwood main doors, Italian marble or vitrified tile laying, pressure-tested 15-Bar plumbing lines, and three-coat exterior acrylic finishes.",
      deliverables: [
        "NABL 28-Day Concrete Cube Compressive Test Report",
        "Hydrostatic 15-Bar Plumbing Pressure Verification",
        "Multi-Layer Waterproofing Flood Testing (72 Hours)",
        "Pre-Handover 150-Point Architectural Snag Audit",
      ],
    },
    {
      num: "06",
      icon: Key,
      title: "Ceremonial Handover & 10-Year Warranty",
      timeline: "Month 12",
      image: "/images/stages/stage-12.jpg",
      description:
        "The crowning moment: on-schedule ceremonial key handover to your family with the complete As-Built drawing folder, equipment manuals, electrical circuit directory, and our 10-Year Comprehensive Waterproofing Warranty.",
      deliverables: [
        "Ceremonial Handover with Brass Auspicious Keys",
        "Laminated As-Built MEP & Structural Drawings",
        "10-Year Written Structural & Waterproofing Warranty",
        "Dedicated 12-Month Complimentary Post-Handover Care",
      ],
    },
  ];

  const faqs = [
    {
      q: "Who personally supervises the construction on my site?",
      a: "Every project is directly overseen by Founder and Chief Civil Engineer Er. Sahaya Antony Stalin, B.E. (Civil), supported by dedicated resident site engineers.",
    },
    {
      q: "Are the prices fixed or can they escalate during construction?",
      a: "Our contracts are 100% itemized fixed-price BOQs. As long as the scope of work and specifications remain unchanged, there are zero cost escalations.",
    },
    {
      q: "What makes Porotherm hollow clay bricks superior for Tamil Nadu homes?",
      a: "Porotherm clay hollow bricks provide natural cellular air gaps that dramatically reduce heat absorption, keeping indoor temperatures up to 6°C cooler during peak summer months.",
    },
    {
      q: "How are payment stages structured?",
      a: "Payments are strictly milestone-linked (e.g. Foundation, Plinth Beam, Roof Slab, Plastering, Handover). You only pay after each phase is inspected and approved.",
    },
  ];

  return (
    <div className="min-h-screen bg-[#F7F4EE] text-slate-900 flex flex-col font-sans selection:bg-[#E50914]/20 selection:text-[#E50914]">
      {/* Navbar */}
      <NavbarExact onOpenQuote={() => setIsQuoteOpen(true)} />

      {/* Main Content */}
      <main className="flex-grow pt-28 sm:pt-32">
        {/* Header */}
        <section className="relative px-4 sm:px-6 lg:px-8 py-16 lg:py-20 max-w-[1440px] mx-auto">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 mb-3">
              <span className="h-[2px] w-8 bg-[#B88746] block" />
              <span className="text-xs font-mono font-bold uppercase tracking-[0.25em] text-[#B88746]">
                HOW IT WORKS • 6-STAGE WORKFLOW
              </span>
            </div>

            <h1 className="text-4xl sm:text-6xl font-black text-slate-950 tracking-tight font-sans">
              Our Turnkey Construction<br />
              <span className="text-[#B88746]">Process &amp; Milestones</span>
            </h1>

            <p className="mt-4 text-base sm:text-lg text-slate-700 leading-relaxed">
              We eliminate the stress of building a home with a structured, transparent 6-stage engineering roadmap designed to deliver uncompromised quality on schedule.
            </p>
          </div>
        </section>

        {/* 6 Process Stages */}
        <section className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 pb-20 space-y-12">
          {stages.map((stg, idx) => {
            const Icon = stg.icon;
            const isReversed = idx % 2 === 1;

            return (
              <div
                key={stg.num}
                className="bg-white rounded-3xl border border-[#E8DFD1] shadow-2xl shadow-black/5 overflow-hidden p-6 sm:p-10 lg:p-12"
              >
                <div className={`grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center ${isReversed ? "lg:flex-row-reverse" : ""}`}>
                  
                  {/* Photo Frame */}
                  <div className={`lg:col-span-5 ${isReversed ? "lg:order-2" : ""}`}>
                    <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-slate-900 border border-slate-200 shadow-xl group">
                      <Image
                        src={stg.image}
                        alt={stg.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                      <div className="absolute top-4 left-4">
                        <span className="text-xl font-black text-white font-mono px-3.5 py-1.5 rounded-xl bg-black/80 backdrop-blur-md">
                          STAGE {stg.num}
                        </span>
                      </div>
                      <div className="absolute bottom-4 right-4 flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full bg-white/90 text-slate-900">
                        <Clock className="w-3.5 h-3.5 text-[#B88746]" />
                        <span>{stg.timeline}</span>
                      </div>
                    </div>
                  </div>

                  {/* Narrative & Deliverables */}
                  <div className={`lg:col-span-7 space-y-5 ${isReversed ? "lg:order-1" : ""}`}>
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-2xl bg-[#B88746]/10 text-[#B88746] flex items-center justify-center flex-shrink-0">
                        <Icon className="w-6 h-6" />
                      </div>
                      <div>
                        <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#B88746]">
                          PHASE {stg.num} • {stg.timeline}
                        </span>
                        <h2 className="text-2xl sm:text-3xl font-black text-slate-950 font-sans">
                          {stg.title}
                        </h2>
                      </div>
                    </div>

                    <p className="text-sm text-slate-700 leading-relaxed">
                      {stg.description}
                    </p>

                    <div>
                      <h4 className="text-xs font-mono uppercase tracking-wider text-slate-950 font-bold mb-3">
                        Phase Deliverables &amp; Verified Approvals:
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        {stg.deliverables.map((d, i) => (
                          <div key={i} className="flex items-start gap-2 text-xs text-slate-700">
                            <CheckCircle2 className="w-4 h-4 text-[#B88746] flex-shrink-0 mt-0.5" />
                            <span>{d}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            );
          })}
        </section>

        {/* FAQ Section */}
        <section className="bg-white py-20 border-t border-[#E8DFD1]">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center space-y-3 mb-12">
              <span className="text-xs font-mono uppercase tracking-wider text-[#B88746] font-bold block">
                FREQUENTLY ASKED QUESTIONS
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-slate-950 font-sans">
                Common Questions About Turnkey Building
              </h2>
            </div>

            <div className="space-y-4">
              {faqs.map((f, i) => (
                <div key={i} className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
                  <h3 className="text-base font-bold text-slate-950 flex items-start gap-2.5">
                    <HelpCircle className="w-5 h-5 text-[#B88746] flex-shrink-0 mt-0.5" />
                    <span>{f.q}</span>
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 mt-2 pl-7 leading-relaxed">
                    {f.a}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-12 text-center">
              <button
                onClick={() => setIsQuoteOpen(true)}
                className="bg-[#E50914] hover:bg-[#DC2626] text-white px-8 py-3.5 rounded-full font-bold text-xs uppercase tracking-wider shadow-lg transition-all hover:scale-105"
              >
                <span>Start Stage 01 Consultation</span>
              </button>
            </div>
          </div>
        </section>
      </main>

      {/* Footer & Floating WhatsApp */}
      <FooterExact />
      <FloatingWhatsApp />

      <QuoteModal isOpen={isQuoteOpen} onClose={() => setIsQuoteOpen(false)} />
    </div>
  );
}
