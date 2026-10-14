"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Shield,
  Award,
  CheckCircle2,
  HardHat,
  Sparkles,
  MapPin,
  Phone,
  MessageCircle,
  ArrowRight,
  FileText,
  Clock,
  Compass,
} from "lucide-react";
import { motion } from "framer-motion";
import NavbarExact from "@/components/exact/NavbarExact";
import FooterExact from "@/components/exact/FooterExact";
import FloatingWhatsApp from "@/components/common/FloatingWhatsApp";
import QuoteModal from "@/components/quote/QuoteModal";

export default function AboutPageClient() {
  const [isQuoteOpen, setIsQuoteOpen] = useState(false);

  const stats = [
    { value: "250+", label: "Turnkey Homes Delivered", note: "Across South Tamil Nadu" },
    { value: "8+ Years", label: "Structural Excellence", note: "Established 2016" },
    { value: "100%", label: "NABL Certified Testing", note: "M25 / M30 Concrete Mix" },
    { value: "10 Years", label: "Waterproofing Warranty", note: "Elastomeric Coating" },
  ];

  const milestones = [
    {
      year: "2016",
      title: "Establishment in Samugarengapuram",
      desc: "Founded by Er. Sahaya Antony Stalin, B.E. (Civil), with a foundational mission: bringing uncompromising engineering rigor, laser-accurate leveling, and transparent turnkey pricing to homeowners across Tirunelveli district.",
    },
    {
      year: "2018",
      title: "Mechanized Concrete & Soil Testing Protocols",
      desc: "Introduced mandatory Safe Bearing Capacity (SBC) soil testing prior to footing excavations and mechanized concrete needle vibrator compaction across all residential sites.",
    },
    {
      year: "2021",
      title: "Porotherm Thermal Clay Brick Innovation",
      desc: "Pioneered Wienerberger Porotherm hollow clay brick masonry in regional residential projects, creating homes naturally 6°C cooler in scorching summer months.",
    },
    {
      year: "2024",
      title: "100+ Active Sites & Commercial Landmarks",
      desc: "Delivered premier retail complexes in Valliyur and multi-family communities in Palayamkottai, while managing dozens of live turnkey luxury villas with direct founder supervision.",
    },
  ];

  return (
    <div className="min-h-screen bg-[#F8F6F1] text-[#202124] flex flex-col font-sans selection:bg-[#B78A52]/20 selection:text-[#B78A52]">
      {/* Navbar */}
      <NavbarExact onOpenQuote={() => setIsQuoteOpen(true)} />

      {/* Main Content */}
      <main className="flex-grow pt-28 sm:pt-32">
        {/* Architectural Hero Header */}
        <section className="relative px-4 sm:px-6 lg:px-8 py-16 lg:py-24 max-w-[1440px] mx-auto">
          <div className="max-w-4xl">
            <div className="flex items-center gap-2 mb-3">
              <span className="h-[2px] w-8 bg-[#B78A52] block" />
              <span className="text-xs font-mono font-semibold uppercase tracking-[0.25em] text-[#B78A52]">
                ABOUT JANCY BUILDERS • EST. 2016
              </span>
            </div>

            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-[#17191B] tracking-tight leading-[1.05] font-sans">
              Engineering Trust.<br />
              <span className="text-[#B78A52] font-serif italic font-normal">Building Architectural</span> Permanence.
            </h1>

            <p className="mt-6 text-base sm:text-xl text-[#202124]/80 leading-relaxed max-w-3xl">
              Jancy Builders is a specialized civil engineering and architectural studio headquartered in Samugarengapuram, Tirunelveli. Led personally on-site by <strong>Er. Sahaya Antony Stalin</strong>, we bridge the gap between bespoke architectural elegance and unyielding structural permanence.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <button
                onClick={() => setIsQuoteOpen(true)}
                className="inline-flex items-center gap-2 bg-[#17191B] hover:bg-[#B78A52] text-white px-7 py-3.5 rounded-full font-semibold text-xs uppercase tracking-wider shadow-lg shadow-black/10 transition-all border border-[#B78A52]/30 hover:scale-105"
              >
                <span>Request Site Consultation</span>
                <ArrowRight className="w-4 h-4 text-[#B78A52] group-hover:text-white" />
              </button>

              <a
                href="https://wa.me/917708247124?text=Hello%20Er.%20Sahaya%20Antony%20Stalin,%20I%20would%20like%20to%20discuss%20a%20construction%20project."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#20ba5a] text-white px-6 py-3.5 rounded-full font-semibold text-xs uppercase tracking-wider shadow-md transition-all hover:scale-105"
              >
                <MessageCircle className="w-4 h-4 fill-current" />
                <span>Chat on WhatsApp</span>
              </a>
            </div>
          </div>

          {/* Quick Metrics Strip */}
          <div className="mt-16 grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {stats.map((s, idx) => (
              <div
                key={idx}
                className="bg-white p-6 rounded-3xl border border-[#E2D9CC] shadow-xl shadow-black/5"
              >
                <div className="text-3xl sm:text-4xl font-black text-[#17191B] font-sans">
                  {s.value}
                </div>
                <div className="text-xs sm:text-sm font-bold text-[#17191B] mt-1">
                  {s.label}
                </div>
                <div className="text-[11px] text-slate-500 font-mono mt-0.5">
                  {s.note}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Founder & Chief Engineer Editorial Section */}
        <section className="bg-[#17191B] text-white py-20 lg:py-28 relative overflow-hidden">
          <div className="absolute top-0 right-10 w-[500px] h-[500px] bg-[#B78A52]/10 rounded-full blur-[140px] pointer-events-none" />

          <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
              {/* Founder Image & Credential Frame */}
              <div className="lg:col-span-5 relative">
                <div className="relative aspect-[4/5] rounded-3xl overflow-hidden border border-white/10 shadow-2xl bg-slate-900">
                  <Image
                    src="/images/projects/site-silathikulam-murugan.jpg"
                    alt="Er. Sahaya Antony Stalin Handing Over Turnkey Villa"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <div className="absolute bottom-6 inset-x-6">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-[#B78A52] font-bold px-3 py-1 bg-black/60 rounded-full backdrop-blur-md inline-block mb-2">
                      FOUNDER &amp; CHIEF ENGINEER
                    </span>
                    <h2 className="text-2xl font-black text-white font-sans">
                      Er. Sahaya Antony Stalin
                    </h2>
                    <p className="text-xs text-slate-300 font-mono mt-0.5">
                      B.E. (Civil Engineering) • Direct On-Site Supervision
                    </p>
                  </div>
                </div>
              </div>

              {/* Founder Statement & Technical Rigor */}
              <div className="lg:col-span-7 space-y-6">
                <div className="flex items-center gap-2">
                  <span className="h-[2px] w-8 bg-[#B78A52] block" />
                  <span className="text-xs font-mono font-bold uppercase tracking-[0.25em] text-[#B78A52]">
                    FOUNDER&apos;S CREED
                  </span>
                </div>

                <h3 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight font-sans">
                  &ldquo;A house is an investment of a lifetime. Its structural safety cannot be compromised for shortcuts.&rdquo;
                </h3>

                <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                  Every project at Jancy Builders is executed under my direct personal supervision. From calculating soil load bearing capacities to inspecting the binding wire gauge on roof slab reinforcement, no milestone proceeds without verified civil engineering clearance.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                  <div className="bg-slate-900/80 p-5 rounded-2xl border border-white/10">
                    <div className="flex items-center gap-2.5 text-white font-bold text-sm mb-1.5">
                      <Shield className="w-4 h-4 text-[#B78A52]" />
                      <span>Certified Fe550D TMT Steel</span>
                    </div>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      High-ductility earthquake-resistant rebar detailing conforming to IS 13920 seismic standards.
                    </p>
                  </div>

                  <div className="bg-slate-900/80 p-5 rounded-2xl border border-white/10">
                    <div className="flex items-center gap-2.5 text-white font-bold text-sm mb-1.5">
                      <Award className="w-4 h-4 text-[#B78A52]" />
                      <span>28-Day Curing Protocol</span>
                    </div>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      Continuous water ponding curing monitored daily for optimum compressive cement hydration.
                    </p>
                  </div>
                </div>

                <div className="pt-4 flex items-center gap-4">
                  <a
                    href="tel:+917708247124"
                    className="inline-flex items-center gap-2 text-sm font-bold text-[#B78A52] hover:text-white transition-colors"
                  >
                    <Phone className="w-4 h-4" />
                    <span>Direct Call: +91 77082 47124</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Milestone Timeline */}
        <section className="py-20 lg:py-28 max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-14">
            <div className="flex items-center gap-2 mb-2">
              <span className="h-[2px] w-8 bg-[#B78A52] block" />
              <span className="text-xs font-mono font-bold uppercase tracking-[0.25em] text-[#B78A52]">
                COMPANY HISTORY
              </span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-slate-950 tracking-tight font-sans">
              Our Journey of Excellence
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {milestones.map((m, i) => (
              <div
                key={i}
                className="bg-white p-7 rounded-3xl border border-[#E2D9CC] shadow-xl shadow-black/5 flex flex-col justify-between hover:border-[#B78A52]/40 transition-colors"
              >
                <div>
                  <span className="text-2xl font-black text-[#B78A52] font-mono block mb-3">
                    {m.year}
                  </span>
                  <h3 className="text-lg font-bold text-[#17191B] font-sans mb-2">
                    {m.title}
                  </h3>
                  <p className="text-xs text-[#202124]/70 leading-relaxed">
                    {m.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Active District Work Sites Banner */}
        <section className="bg-[#17191B] text-white py-16 border-t border-white/10">
          <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
            <span className="text-xs font-mono uppercase tracking-widest text-[#B78A52] font-bold block">
              REGIONAL COVERAGE &amp; ACTIVE PRESENCE
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-white font-sans max-w-2xl mx-auto">
              Constructing Landmarks Across Tirunelveli District
            </h2>
            <div className="flex flex-wrap items-center justify-center gap-2.5 max-w-3xl mx-auto pt-2">
              {[
                "Durainagar",
                "Samugarengapuram",
                "Ammachikovil",
                "Silathikulam",
                "Kavalkinaru",
                "Valliyur",
                "Palayamkottai",
                "Nanguneri",
                "Kanyakumari District",
              ].map((loc, i) => (
                <span
                  key={i}
                  className="px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-slate-300 flex items-center gap-1.5"
                >
                  <MapPin className="w-3 h-3 text-[#B78A52]" />
                  <span>{loc}</span>
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Banner */}
        <section className="py-20 bg-[#F8F6F1] border-t border-[#E2D9CC]">
          <div className="max-w-4xl mx-auto px-4 text-center space-y-6">
            <h2 className="text-3xl sm:text-5xl font-black text-[#17191B] tracking-tight font-sans">
              Plan Your Dream Home With Chief Engineer Stalin
            </h2>
            <p className="text-sm sm:text-base text-[#202124]/70 max-w-xl mx-auto">
              Book a complimentary on-site soil and boundary evaluation with Er. Sahaya Antony Stalin today.
            </p>
            <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
              <button
                onClick={() => setIsQuoteOpen(true)}
                className="bg-[#17191B] hover:bg-[#B78A52] text-white px-8 py-4 rounded-full font-semibold text-xs uppercase tracking-wider shadow-lg shadow-black/10 transition-all border border-[#B78A52]/30 hover:scale-105"
              >
                <span>Book Free Site Visit</span>
              </button>
              <Link
                href="/projects"
                className="bg-white hover:bg-[#F8F6F1] text-[#17191B] border border-[#E2D9CC] px-8 py-4 rounded-full font-semibold text-xs uppercase tracking-wider transition-all shadow-sm"
              >
                <span>View Real Project Sites</span>
              </Link>
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
