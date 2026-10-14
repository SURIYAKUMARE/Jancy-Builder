"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  MapPin,
  Sparkles,
  ArrowRight,
  ExternalLink,
  MessageCircle,
  Search,
  Building,
  CheckCircle2,
} from "lucide-react";
import { motion } from "framer-motion";
import NavbarExact from "@/components/exact/NavbarExact";
import FooterExact from "@/components/exact/FooterExact";
import FloatingWhatsApp from "@/components/common/FloatingWhatsApp";
import QuoteModal from "@/components/quote/QuoteModal";
import { CANONICAL_PROJECTS, Project } from "@/data/projects-data";

type FilterType = "all" | "residential" | "commercial" | "completed" | "ongoing";

export default function ProjectsPageClient() {
  const [activeFilter, setActiveFilter] = useState<FilterType>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [isQuoteOpen, setIsQuoteOpen] = useState(false);

  const projects = CANONICAL_PROJECTS;

  const filteredProjects = projects.filter((p) => {
    // Filter by category / status
    if (activeFilter === "residential" && p.category !== "residential") return false;
    if (activeFilter === "commercial" && p.category !== "commercial") return false;
    if (activeFilter === "completed" && p.status !== "Completed") return false;
    if (activeFilter === "ongoing" && !(p.status === "Under Construction" || p.isLiveWorkSite)) return false;

    // Filter by search query
    if (searchQuery.trim() !== "") {
      const q = searchQuery.toLowerCase();
      const matchName = p.name.toLowerCase().includes(q);
      const matchLoc = p.location.toLowerCase().includes(q);
      const matchStage = p.workStage?.toLowerCase().includes(q);
      return matchName || matchLoc || matchStage;
    }

    return true;
  });

  const getWhatsappUrl = (p: Project) => {
    const text = encodeURIComponent(
      `Hello Er. Sahaya Antony Stalin, I would like to enquire about your project "${p.name}" in ${p.location}. Please share floor plans and estimated cost.`
    );
    return `https://wa.me/917708247124?text=${text}`;
  };

  const filterTabs: { id: FilterType; label: string; count: number }[] = [
    { id: "all", label: "All Works", count: projects.length },
    { id: "residential", label: "Residential", count: projects.filter((p) => p.category === "residential").length },
    { id: "commercial", label: "Commercial", count: projects.filter((p) => p.category === "commercial").length },
    { id: "completed", label: "Completed", count: projects.filter((p) => p.status === "Completed").length },
    { id: "ongoing", label: "Ongoing Sites", count: projects.filter((p) => p.status === "Under Construction" || p.isLiveWorkSite).length },
  ];

  return (
    <div className="min-h-screen bg-[#F8F6F1] text-[#202124] flex flex-col font-sans selection:bg-[#B78A52]/20 selection:text-[#B78A52]">
      {/* Navbar */}
      <NavbarExact onOpenQuote={() => setIsQuoteOpen(true)} />

      {/* Main Content */}
      <main className="flex-grow pt-28 sm:pt-32">
        {/* Header */}
        <section className="relative px-4 sm:px-6 lg:px-8 py-16 lg:py-20 max-w-[1440px] mx-auto">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-6 border-b border-[#E2D9CC]">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="h-[2px] w-8 bg-[#B78A52] block" />
                <span className="text-xs font-mono font-semibold uppercase tracking-[0.25em] text-[#B78A52]">
                  ARCHITECTURAL PORTFOLIO
                </span>
              </div>

              <h1 className="text-4xl sm:text-6xl font-black text-[#17191B] tracking-tight font-sans">
                Selected Works &amp;<br />
                <span className="text-[#B78A52] font-serif italic font-normal">Turnkey Landmarks</span>
              </h1>

              <p className="mt-3 text-sm sm:text-base text-[#202124]/75 max-w-xl leading-relaxed">
                Explore verified project sites across Tirunelveli district, from structural slab casting in Durainagar to completed turnkey villas in Silathikulam and commercial hubs in Valliyur.
              </p>
            </div>

            {/* Search Input */}
            <div className="relative w-full sm:w-72">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search by site or location..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-full border border-[#E2D9CC] bg-white text-xs text-[#202124] placeholder-slate-400 focus:outline-none focus:border-[#B78A52] shadow-sm"
              />
            </div>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pt-6 scrollbar-none">
            {filterTabs.map((tab) => {
              const isActive = activeFilter === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveFilter(tab.id)}
                  className={`px-4 py-2 rounded-full text-xs font-semibold transition-all whitespace-nowrap ${
                    isActive
                      ? "bg-[#17191B] text-white shadow-md border border-[#B78A52]"
                      : "bg-white text-slate-700 hover:text-[#17191B] border border-[#E2D9CC]"
                  }`}
                >
                  {tab.label} ({tab.count})
                </button>
              );
            })}
          </div>
        </section>

        {/* Project Cards Grid */}
        <section className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 pb-24">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((p, idx) => (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05, duration: 0.4 }}
                className="bg-white rounded-3xl border border-[#E2D9CC] overflow-hidden shadow-xl shadow-black/5 flex flex-col justify-between group hover:border-[#B78A52]/50 transition-all duration-300"
              >
                <div>
                  {/* Image Container */}
                  <Link href={`/projects/${p.id}`} className="block relative h-64 sm:h-72 w-full overflow-hidden bg-[#17191B]">
                    <Image
                      src={p.coverImage}
                      alt={p.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                    {/* Status Badge */}
                    <div className="absolute top-4 inset-x-4 flex items-center justify-between pointer-events-none">
                      <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-black/75 backdrop-blur-md text-white border border-white/20">
                        {p.category}
                      </span>

                      {p.isLiveWorkSite ? (
                        <span className="text-[10px] font-mono font-bold px-2.5 py-1 rounded-full flex items-center gap-1.5 backdrop-blur-md bg-amber-500 text-slate-950 shadow-md">
                          <span className="w-2 h-2 rounded-full bg-red-600 animate-ping" />
                          <span>LIVE WORK SITE</span>
                        </span>
                      ) : (
                        <span className="text-[10px] font-mono font-bold px-2.5 py-1 rounded-full flex items-center gap-1.5 backdrop-blur-md bg-emerald-950/80 border border-emerald-500/50 text-emerald-300">
                          <CheckCircle2 className="w-3 h-3" />
                          <span>{p.status}</span>
                        </span>
                      )}
                    </div>

                    {/* Work Stage Ribbon */}
                    {p.workStage && (
                      <div className="absolute bottom-3 left-4 right-4 pointer-events-none">
                        <span className="text-[11px] font-semibold px-3 py-1 rounded-lg bg-black/80 backdrop-blur-md border border-white/15 text-[#B78A52] inline-flex items-center gap-1.5">
                          <Sparkles className="w-3 h-3 text-[#B78A52]" />
                          <span className="truncate">{p.workStage}</span>
                        </span>
                      </div>
                    )}
                  </Link>

                  {/* Body Content */}
                  <div className="p-6">
                    <div className="flex items-center gap-1.5 text-xs text-[#B78A52] font-medium mb-1.5">
                      <MapPin className="w-3.5 h-3.5 flex-shrink-0" />
                      <span className="truncate">{p.location}</span>
                    </div>

                    <Link href={`/projects/${p.id}`} className="block">
                      <h3 className="text-xl font-bold text-[#17191B] group-hover:text-[#B78A52] transition-colors font-sans line-clamp-1">
                        {p.name}
                      </h3>
                    </Link>

                    <p className="text-xs text-[#202124]/70 mt-2 line-clamp-2 leading-relaxed">
                      {p.description}
                    </p>

                    {/* Metric Badges */}
                    <div className="grid grid-cols-2 gap-2 mt-4 pt-4 border-t border-[#E2D9CC]/50 text-xs">
                      <div className="bg-[#F8F6F1] p-2.5 rounded-xl border border-[#E2D9CC]">
                        <span className="text-[10px] text-slate-500 block font-mono">BUILT-UP AREA</span>
                        <span className="font-bold text-[#17191B]">{p.builtUpArea}</span>
                      </div>
                      <div className="bg-[#F8F6F1] p-2.5 rounded-xl border border-[#E2D9CC]">
                        <span className="text-[10px] text-slate-500 block font-mono">CONFIG</span>
                        <span className="font-bold text-[#17191B] truncate block">{p.configuration}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Card Actions */}
                <div className="p-6 pt-0 flex items-center justify-between gap-2.5">
                  <Link
                    href={`/projects/${p.id}`}
                    className="flex-1 inline-flex items-center justify-center gap-1.5 bg-[#17191B] hover:bg-[#B78A52] text-white py-2.5 px-4 rounded-full text-xs font-semibold transition-all border border-[#B78A52]/30"
                  >
                    <span>View Case Study</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#B78A52] group-hover:text-white" />
                  </Link>

                  {p.fbPostUrl && (
                    <a
                      href={p.fbPostUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-9 h-9 rounded-full bg-[#1877F2]/10 hover:bg-[#1877F2] text-[#1877F2] hover:text-white flex items-center justify-center transition-colors shadow-sm flex-shrink-0"
                      title="View on Facebook"
                    >
                      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                      </svg>
                    </a>
                  )}

                  <a
                    href={getWhatsappUrl(p)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 rounded-full bg-[#25D366] hover:bg-[#20ba5a] text-white flex items-center justify-center transition-colors shadow-sm flex-shrink-0"
                    title="Enquire on WhatsApp about this project"
                  >
                    <MessageCircle className="w-4 h-4 fill-current" />
                  </a>
                </div>
              </motion.div>
            ))}
          </div>

          {filteredProjects.length === 0 && (
            <div className="py-20 text-center bg-white rounded-3xl border border-[#E8DFD1] p-8">
              <Building className="w-12 h-12 text-slate-300 mx-auto mb-3" />
              <h3 className="text-lg font-bold text-slate-800">No Projects Found</h3>
              <p className="text-xs text-slate-500 mt-1">
                Try selecting a different filter category or clearing your search term.
              </p>
              <button
                onClick={() => {
                  setActiveFilter("all");
                  setSearchQuery("");
                }}
                className="mt-4 px-4 py-2 rounded-full bg-[#B88746] text-white text-xs font-bold"
              >
                Reset All Filters
              </button>
            </div>
          )}
        </section>
      </main>

      {/* Footer & Floating WhatsApp */}
      <FooterExact />
      <FloatingWhatsApp />

      <QuoteModal isOpen={isQuoteOpen} onClose={() => setIsQuoteOpen(false)} />
    </div>
  );
}
