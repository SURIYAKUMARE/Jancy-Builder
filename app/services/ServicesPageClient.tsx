"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Building2,
  Home,
  CheckCircle2,
  Shield,
  Layers,
  Sparkles,
  ArrowRight,
  Compass,
  FileCheck,
  Flame,
  Hammer,
} from "lucide-react";
import NavbarExact from "@/components/exact/NavbarExact";
import FooterExact from "@/components/exact/FooterExact";
import FloatingWhatsApp from "@/components/common/FloatingWhatsApp";
import QuoteModal from "@/components/quote/QuoteModal";

export default function ServicesPageClient() {
  const [isQuoteOpen, setIsQuoteOpen] = useState(false);

  const services = [
    {
      id: "residential",
      icon: Home,
      title: "Turnkey Residential Construction",
      tagline: "Luxury Villas, Duplexes & Contemporary Homes",
      image: "/images/projects/site-silathikulam-murugan.jpg",
      description:
        "Comprehensive turnkey home building from initial soil test to ceremonial key handover. Every project is executed with transparent itemized BOQ contracts, zero budget overruns, and daily engineering logs.",
      deliverables: [
        "Architectural 2D Floor Plans & 3D Exterior Elevations",
        "Soil SBC Testing & Engineered Pad/Raft Foundations",
        "High-Yield Fe550D TMT Earthquake-Resistant Framing",
        "Concealed CPVC/UPVC Plumbing Pressure-Tested to 15 Bar",
        "Finishing with Premium Granite, Teakwood Doors & Vitrified Tiles",
        "Certified 10-Year Comprehensive Waterproofing Warranty",
      ],
      pricingNote: "Available in Classic (₹2,400), Premium (₹3,200), and Ultra (₹4,400) tiers.",
    },
    {
      id: "porotherm",
      icon: Flame,
      title: "Porotherm Eco-Thermal Brick Construction",
      tagline: "Naturally Insulated Homes — Up to 6°C Cooler Indoors",
      image: "/images/projects/site-samugarengapuram-porotherm.jpg",
      description:
        "Pioneering Wienerberger Porotherm hollow clay brick masonry in Tirunelveli district. Engineered with vertical cellular cavities that naturally impede solar heat transmission during scorching South Indian summers.",
      deliverables: [
        "100% Natural Wienerberger Perforated Clay Hollow Blocks",
        "Low U-Value (0.28 W/m²K) Delivering 6°C Cooler Rooms",
        "60% Reduction in Dead Weight on Structural Footings",
        "Thin-Bed Polymer Mortar Ensuring Zero Thermal Bridging",
        "Non-Toxic, 100% Recyclable Natural Terracotta Clay",
        "Enhanced Sound Insulation & Fire Resistance Class A1",
      ],
      pricingNote: "Ideal for eco-conscious homeowners seeking reduced air conditioning energy bills.",
    },
    {
      id: "commercial",
      icon: Building2,
      title: "Commercial & Retail Infrastructure",
      tagline: "High-Footfall Retail Plazas, Offices & Showrooms",
      image: "/images/projects/office-building.jpg",
      description:
        "Engineered for high-yield commercial viability. We construct commercial landmarks featuring acoustic curtain wall glazing, heavy ISMB steel beam supports, high-capacity electrical grids, and basement parking.",
      deliverables: [
        "Continuous Deep Pile / Raft Foundation for Heavy Loads",
        "Acoustic Double-Glazed Structural Curtain Wall Facades",
        "3-Phase Commercial Electrical Distribution & Backup Generator Rooms",
        "High-Speed Automatic Passenger Lift Shaft Detailing",
        "Local Municipality Commercial Sanctions & Fire NOC Compliance",
        "Zero-Maintenance ACP & Granite Exterior Cladding",
      ],
      pricingNote: "Custom project estimation based on commercial FAR and architectural brief.",
    },
    {
      id: "structural",
      icon: Shield,
      title: "Civil Engineering & Structural Design",
      tagline: "Uncompromising Structural Rigor & Seismic Confinement",
      image: "/images/projects/site-durainagar-praveen.jpg",
      description:
        "Led personally by Er. Sahaya Antony Stalin, B.E. (Civil). We design safe, resilient structures calculating dead loads, live loads, and seismic shear in strict compliance with IS 456, IS 875, and IS 13920.",
      deliverables: [
        "Safe Bearing Capacity (SBC) Geotechnical Soil Analysis",
        "Computer-Aided Structural Framing & Column Layout Blueprints",
        "Rebar Bending Schedules (BBS) for Fe550D TMT Steel",
        "NABL-Certified Concrete Cube Compressive Testing (7 & 28 Days)",
        "Mechanized Concrete Boom Placer & Needle Vibrator Compaction",
        "Engineered Roof Slab Deflection & Crack Prevention Detailing",
      ],
      pricingNote: "Included complimentary with all turnkey construction contracts.",
    },
    {
      id: "architectural",
      icon: Compass,
      title: "Architectural Planning & 3D Elevation",
      tagline: "Bespoke Spatial Design, Vastu Shastra & 3D Visualization",
      image: "/images/projects/luxury-villa.jpg",
      description:
        "Our architectural team crafts bespoke floor layouts optimized for natural cross-ventilation, generous daylighting, and modern South Indian lifestyles, seamlessly harmonized with authentic Vastu principles.",
      deliverables: [
        "Detailed 2D Working Architectural Drawings & Sections",
        "Photorealistic 3D Exterior & Interior Perspective Renders",
        "Complete Electrical, Plumbing & Sanitary Layout Drawings",
        "Vastu-Compliant Room Positioning & Entrance Detailing",
        "Detailed Material Selection & Schedule of Finishes",
        "Local Panchayat & Municipal Sanction Plan Approval Drawings",
      ],
      pricingNote: "Comprehensive design documentation provided before physical groundbreaking.",
    },
    {
      id: "renovation",
      icon: Hammer,
      title: "Renovation, Remodeling & Floor Additions",
      tagline: "Transforming Existing Structures with Structural Integrity",
      image: "/images/projects/site-ammachikovil-pooja.jpg",
      description:
        "Whether adding a new floor (G+1/G+2), modernizing an outdated facade, or retrofitting structural columns, we perform thorough load-bearing assessments before executing precision renovations.",
      deliverables: [
        "Non-Destructive Structural Rebound Hammer Integrity Testing",
        "Column Jacketing & Foundation Strengthening if Required",
        "Vertical Floor Additions with Lightweight Materials",
        "Complete Bathroom & Kitchen Plumbing Replacement",
        "Exterior Facade Modernization with Weatherproof Textures",
        "Roof Slab Waterproofing & Heat-Reflective Tile Laying",
      ],
      pricingNote: "Detailed site audit conducted prior to fixed-price quote generation.",
    },
  ];

  return (
    <div className="min-h-screen bg-[#F8F6F1] text-[#202124] flex flex-col font-sans selection:bg-[#B78A52]/20 selection:text-[#B78A52]">
      {/* Navbar */}
      <NavbarExact onOpenQuote={() => setIsQuoteOpen(true)} />

      {/* Main Content */}
      <main className="flex-grow pt-28 sm:pt-32">
        {/* Header */}
        <section className="relative px-4 sm:px-6 lg:px-8 py-16 lg:py-24 max-w-[1440px] mx-auto">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 mb-3">
              <span className="h-[2px] w-8 bg-[#B78A52] block" />
              <span className="text-xs font-mono font-semibold uppercase tracking-[0.25em] text-[#B78A52]">
                OUR SERVICES • ARCHITECTURAL &amp; CIVIL ENGINEERING
              </span>
            </div>

            <h1 className="text-4xl sm:text-6xl font-black text-[#17191B] tracking-tight font-sans">
              Precision Construction &amp;<br />
              <span className="text-[#B78A52] font-serif italic font-normal">Architectural Services</span>
            </h1>

            <p className="mt-4 text-base sm:text-lg text-[#202124]/75 leading-relaxed">
              Every service offered by Jancy Builders is anchored in certified civil engineering standards, transparent contracts, and hands-on supervision by Er. Sahaya Antony Stalin.
            </p>
          </div>
        </section>

        {/* Detailed Services Grid */}
        <section className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 pb-24 space-y-16">
          {services.map((srv, idx) => {
            const Icon = srv.icon;
            const isReversed = idx % 2 === 1;

            return (
              <div
                key={srv.id}
                id={srv.id}
                className="bg-white rounded-3xl border border-[#E2D9CC] shadow-2xl shadow-black/5 overflow-hidden p-6 sm:p-10 lg:p-12 scroll-mt-32 hover:border-[#B78A52]/40 transition-colors"
              >
                <div className={`grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center ${isReversed ? "lg:flex-row-reverse" : ""}`}>
                  
                  {/* Visual Frame */}
                  <div className={`lg:col-span-5 ${isReversed ? "lg:order-2" : ""}`}>
                    <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-[#17191B] border border-[#E2D9CC] shadow-xl group">
                      <Image
                        src={srv.image}
                        alt={srv.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                      <div className="absolute bottom-4 left-4 right-4">
                        <span className="text-[10px] font-mono uppercase tracking-wider text-[#B78A52] bg-black/80 px-3 py-1 rounded-full font-bold border border-[#B78A52]/30">
                          {srv.tagline}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Text & Deliverables */}
                  <div className={`lg:col-span-7 space-y-5 ${isReversed ? "lg:order-1" : ""}`}>
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-2xl bg-[#B78A52]/10 text-[#B78A52] flex items-center justify-center flex-shrink-0">
                        <Icon className="w-6 h-6" />
                      </div>
                      <div>
                        <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#B78A52]">
                          SERVICE 0{idx + 1}
                        </span>
                        <h2 className="text-2xl sm:text-3xl font-black text-[#17191B] font-sans">
                          {srv.title}
                        </h2>
                      </div>
                    </div>

                    <p className="text-sm text-[#202124]/80 leading-relaxed">
                      {srv.description}
                    </p>

                    <div>
                      <h4 className="text-xs font-mono uppercase tracking-wider text-[#17191B] font-bold mb-3">
                        Key Engineering Scope &amp; Deliverables:
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        {srv.deliverables.map((d, i) => (
                          <div key={i} className="flex items-start gap-2 text-xs text-[#202124]/80">
                            <CheckCircle2 className="w-4 h-4 text-[#B78A52] flex-shrink-0 mt-0.5" />
                            <span>{d}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="pt-2 flex flex-wrap items-center justify-between gap-4 border-t border-[#E2D9CC]/50">
                      <span className="text-xs text-slate-500 font-mono italic">
                        {srv.pricingNote}
                      </span>

                      <button
                        onClick={() => setIsQuoteOpen(true)}
                        className="inline-flex items-center gap-2 bg-[#17191B] hover:bg-[#B78A52] text-white px-6 py-2.5 rounded-full font-semibold text-xs uppercase tracking-wider shadow-md transition-all border border-[#B78A52]/30 hover:scale-105"
                      >
                        <span>Enquire for this Service</span>
                        <ArrowRight className="w-3.5 h-3.5 text-[#B78A52] group-hover:text-white" />
                      </button>
                    </div>

                  </div>

                </div>
              </div>
            );
          })}
        </section>
      </main>

      {/* Footer & Floating WhatsApp */}
      <FooterExact />
      <FloatingWhatsApp />

      <QuoteModal isOpen={isQuoteOpen} onClose={() => setIsQuoteOpen(false)} />
    </div>
  );
}
