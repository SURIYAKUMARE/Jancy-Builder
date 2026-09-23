"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  MapPin,
  Building,
  Calendar,
  Layers,
  Sparkles,
  CheckCircle2,
  X,
  ExternalLink,
  MessageCircle,
  Eye,
  SlidersHorizontal,
  Grid3X3,
  Columns,
  Shield,
  Phone,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface ProjectsExactProps {
  onOpenQuote: () => void;
}

interface ProjectItem {
  id: string;
  title: string;
  category: "all" | "villas" | "residential" | "commercial" | "ongoing";
  categoryLabel: string;
  location: string;
  image: string;
  area: string;
  floors: string;
  timeline: string;
  status: "Completed" | "Under Construction";
  features: string[];
  engineering: string;
  clientStory: string;
}

export default function ProjectsExact({ onOpenQuote }: ProjectsExactProps) {
  const [activeFilter, setActiveFilter] = useState<"all" | "villas" | "residential" | "commercial" | "ongoing">("all");
  const [viewMode, setViewMode] = useState<"carousel" | "grid">("carousel");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);

  const projects: ProjectItem[] = [
    {
      id: "samugarengapuram-villa",
      title: "Samugarengapuram Luxury Villa",
      category: "villas",
      categoryLabel: "Luxury Villa",
      location: "Samugarengapuram, Tirunelveli",
      image: "/images/projects/luxury-villa.jpg",
      area: "6,500 sq.ft",
      floors: "G+2 Luxury Villa",
      timeline: "12 Months • Completed 2024",
      status: "Completed",
      features: [
        "Infinity Swimming Pool with Stone Deck",
        "Italian Statuario Marble Slabs (1600x3200mm)",
        "KNX Smart Home Automation & Ambient Lighting",
        "Landscape Lawn with Automated Drip System",
      ],
      engineering: "Engineered with raft foundation, Fe550D TMT high-ductility rebars, and IS 13920 seismic confinement.",
      clientStory: "A bespoke residence blending contemporary tropical architecture with ultimate privacy and structural resilience.",
    },
    {
      id: "vallioor-residence",
      title: "Vallioor Modern Hillside Home",
      category: "residential",
      categoryLabel: "Modern Residence",
      location: "Vallioor, Tirunelveli",
      image: "/images/projects/modern-home.jpg",
      area: "4,200 sq.ft",
      floors: "G+1 Contemporary Home",
      timeline: "10 Months • Completed 2023",
      status: "Completed",
      features: [
        "Cantilevered Balconies & Glass Railings",
        "Canadian Cedar Accent Wall Cladding",
        "Double-Height Skylight Living Atrium",
        "Solar Energy Ready & Rainwater Harvesting",
      ],
      engineering: "M30 self-compacting concrete, sub-millimeter laser optical surveys, and concealed 3D BIM MEP manifolds.",
      clientStory: "Designed for seamless natural cross-ventilation and timeless aesthetic appeal for a modern family.",
    },
    {
      id: "tirunelveli-corporate-hub",
      title: "Skyline Corporate Commercial Landmark",
      category: "commercial",
      categoryLabel: "Commercial Hub",
      location: "Tirunelveli High Road",
      image: "/images/projects/office-building.jpg",
      area: "48,000 sq.ft",
      floors: "G+5 Commercial Landmark",
      timeline: "18 Months • Completed 2024",
      status: "Completed",
      features: [
        "Double-Glazed Acoustic Structural Curtain Wall",
        "High-Efficiency Central VRF HVAC Grid",
        "100-Vehicle Automated Basement Parking",
        "100% Power Backup & NFPA Fire Safety System",
      ],
      engineering: "Post-tensioned beam grid with IS 1892 boreholes anchored to virgin bedrock layers.",
      clientStory: "A flagship commercial headquarters built to the highest safety and corporate productivity benchmarks.",
    },
    {
      id: "palayamkottai-apartments",
      title: "Palayamkottai Elite Apartments",
      category: "residential",
      categoryLabel: "Multi-Unit Living",
      location: "Palayamkottai, Tirunelveli",
      image: "/images/projects/apartment-complex.jpg",
      area: "32,000 sq.ft",
      floors: "G+4 Luxury Apartments (16 Units)",
      timeline: "16 Months • Completed 2023",
      status: "Completed",
      features: [
        "High-Speed Automatic Passenger Elevators",
        "Rooftop Infinity Community Garden & Gym",
        "Dedicated EV Charging Stations in Stilt Level",
        "24x7 Multi-Tier Biometric & CCTV Security",
      ],
      engineering: "Dual elastomeric polyurethane waterproofing with zero-leakage guarantee and acoustic drain piping.",
      clientStory: "A premium community development providing serene community life in the heart of Tirunelveli.",
    },
    {
      id: "kanyakumari-waterfront-villa",
      title: "Coastal Horizon Waterfront Estate",
      category: "villas",
      categoryLabel: "Oceanfront Villa",
      location: "Kanyakumari Coast, Tamil Nadu",
      image: "/images/hero-sunset-villa.jpg",
      area: "5,850 sq.ft",
      floors: "G+2 Coastal Villa",
      timeline: "14 Months • Completed 2024",
      status: "Completed",
      features: [
        "Panoramic Ocean Views from All Master Suites",
        "Saline-Resistant Marine Architectural Coatings",
        "Infinity Pool Reflecting Sunset Golden Horizon",
        "Outdoor Barbecue Lounge & Sunset Deck",
      ],
      engineering: "Sulfate-resistant high-grade concrete, 15 Bar pressure-tested plumbing, and IP67 architectural lighting.",
      clientStory: "Engineered specifically to withstand high coastal humidity and sea winds while delivering unrivaled luxury.",
    },
    {
      id: "coimbatore-estate",
      title: "Coimbatore Architectural Hillside Estate",
      category: "ongoing",
      categoryLabel: "Ongoing Turnkey",
      location: "Race Course, Coimbatore",
      image: "/images/stages/stage-11.jpg",
      area: "7,200 sq.ft",
      floors: "G+2 Modern Estate",
      timeline: "Under Construction • Handover Dec 2026",
      status: "Under Construction",
      features: [
        "Central Courtyard with Heritage Water Body",
        "Private 12-Seat Dolby Atmos Home Cinema",
        "Zero-Net Energy Ready Solar Integration",
        "Custom Automated Perimeter Glass Louvers",
      ],
      engineering: "Leica Geosystems 3D laser aligned masonry with third-party NABL concrete laboratory testing certificates.",
      clientStory: "Currently progressing under weekly drone photogrammetry milestone tracking for the homeowner.",
    },
  ];

  // Filtering
  const filteredProjects = activeFilter === "all"
    ? projects
    : projects.filter((p) => p.category === activeFilter);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + filteredProjects.length) % filteredProjects.length);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % filteredProjects.length);
  };

  // WhatsApp helper for specific project
  const getProjectWhatsappUrl = (p: ProjectItem) => {
    const text = encodeURIComponent(
      `Hello Er. Sahaya Antony Stalin, I am interested in building a project similar to "${p.title}" (${p.location}, ${p.area}). Please share floor plans, specifications, and turnkey budget details.`
    );
    return `https://wa.me/917708247124?text=${text}`;
  };

  return (
    <section id="projects" className="w-full bg-[#0F172A] py-16 lg:py-24 text-white relative overflow-hidden">
      {/* Background Decorative Ambient Glows */}
      <div className="absolute top-0 right-1/4 w-[600px] h-[400px] bg-[#C29061]/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-[500px] h-[350px] bg-[#DC2626]/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header with Live Badges */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10 pb-6 border-b border-white/10">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="h-[2px] w-8 bg-[#C29061] block" />
              <span className="text-xs font-mono font-bold uppercase tracking-[0.25em] text-[#C29061]">
                ARCHITECTURAL PORTFOLIO
              </span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight font-sans">
              Signature Architectural Works &amp;<br />
              <span className="text-[#E8C59A] bg-gradient-to-r from-[#E8C59A] via-[#C29061] to-[#E8C59A] bg-clip-text text-transparent">
                Turnkey Landmarks
              </span>
            </h2>

            <p className="mt-3 text-sm text-slate-400 max-w-xl leading-relaxed">
              Every project by Jancy Builders is an enduring testament to engineering rigor, soil-tested foundations, and bespoke luxury craftsmanship across Tamil Nadu.
            </p>
          </div>

          {/* Controls: View Mode Toggle & Navigation */}
          <div className="flex items-center gap-4 flex-wrap">
            {/* View Mode Toggle */}
            <div className="flex items-center bg-slate-900 border border-white/10 rounded-full p-1 shadow-inner">
              <button
                onClick={() => setViewMode("carousel")}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
                  viewMode === "carousel"
                    ? "bg-[#C29061] text-slate-950 font-bold shadow-md"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                <Columns className="w-3.5 h-3.5" />
                <span>Carousel</span>
              </button>
              <button
                onClick={() => setViewMode("grid")}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
                  viewMode === "grid"
                    ? "bg-[#C29061] text-slate-950 font-bold shadow-md"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                <Grid3X3 className="w-3.5 h-3.5" />
                <span>All Grid</span>
              </button>
            </div>

            {/* Carousel Navigation Arrows */}
            {viewMode === "carousel" && (
              <div className="flex items-center gap-2">
                <button
                  onClick={handlePrev}
                  className="w-10 h-10 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white flex items-center justify-center transition-all border border-white/10 active:scale-95 shadow-md"
                  aria-label="Previous Project"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={handleNext}
                  className="w-10 h-10 rounded-full bg-[#C29061] hover:bg-[#d8a573] text-slate-950 flex items-center justify-center transition-all active:scale-95 shadow-lg shadow-[#C29061]/25"
                  aria-label="Next Project"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Interactive Filter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
          {[
            { id: "all", label: "All Works (6)" },
            { id: "villas", label: "Luxury Villas" },
            { id: "residential", label: "Modern Residences" },
            { id: "commercial", label: "Commercial Landmarks" },
            { id: "ongoing", label: "Ongoing Construction" },
          ].map((tab) => {
            const isActive = activeFilter === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveFilter(tab.id as any);
                  setCurrentIndex(0);
                }}
                className={`relative px-4 py-2 rounded-full text-xs font-bold transition-all whitespace-nowrap ${
                  isActive
                    ? "text-slate-950 shadow-md"
                    : "text-slate-300 hover:text-white bg-slate-900/60 border border-white/5 hover:border-white/20"
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="active-project-filter"
                    className="absolute inset-0 bg-[#E8C59A] rounded-full"
                    transition={{ type: "spring", stiffness: 400, damping: 32 }}
                  />
                )}
                <span className="relative z-10">{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* ========================================================================= */}
        {/* CAROUSEL VIEW                                                             */}
        {/* ========================================================================= */}
        {viewMode === "carousel" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredProjects.map((project, idx) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1, duration: 0.5 }}
                whileHover={{ y: -8 }}
                onClick={() => setSelectedProject(project)}
                className="group relative bg-slate-900 rounded-3xl border border-white/10 overflow-hidden shadow-2xl transition-all duration-300 flex flex-col justify-between cursor-pointer hover:border-[#C29061]/50"
              >
                <div>
                  {/* Image Container with Zoom */}
                  <div className="relative h-64 sm:h-72 w-full overflow-hidden bg-slate-950">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />

                    {/* Top Badges */}
                    <div className="absolute top-4 inset-x-4 flex items-center justify-between pointer-events-none">
                      <span className="text-[10px] font-mono font-bold tracking-wider uppercase px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-white">
                        {project.categoryLabel}
                      </span>
                      <span
                        className={`text-[10px] font-mono font-bold px-2.5 py-1 rounded-full flex items-center gap-1.5 backdrop-blur-md ${
                          project.status === "Completed"
                            ? "bg-emerald-950/80 border border-emerald-500/40 text-emerald-400"
                            : "bg-amber-950/80 border border-amber-500/40 text-amber-400"
                        }`}
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
                        <span>{project.status}</span>
                      </span>
                    </div>

                    {/* Quick View Button on Image Hover */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/30 backdrop-blur-[2px]">
                      <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white text-slate-950 font-bold text-xs shadow-xl transform translate-y-2 group-hover:translate-y-0 transition-transform">
                        <Eye className="w-3.5 h-3.5" />
                        <span>View Project Case Study</span>
                      </span>
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-6">
                    <div className="flex items-center gap-1.5 text-xs text-[#E8C59A] font-medium mb-1.5">
                      <MapPin className="w-3.5 h-3.5 flex-shrink-0" />
                      <span className="truncate">{project.location}</span>
                    </div>

                    <h3 className="text-xl font-bold text-white group-hover:text-[#E8C59A] transition-colors line-clamp-1 font-sans">
                      {project.title}
                    </h3>

                    {/* Spec Highlights Grid */}
                    <div className="grid grid-cols-2 gap-2 mt-4 pt-4 border-t border-white/10 text-xs">
                      <div className="bg-slate-800/60 p-2 rounded-xl">
                        <span className="text-[10px] text-slate-400 block font-mono">BUILT-UP AREA</span>
                        <span className="font-bold text-white">{project.area}</span>
                      </div>
                      <div className="bg-slate-800/60 p-2 rounded-xl">
                        <span className="text-[10px] text-slate-400 block font-mono">TIMELINE</span>
                        <span className="font-bold text-white">{project.floors}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Card Footer Action Bar */}
                <div className="p-6 pt-0 flex items-center justify-between gap-3">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedProject(project);
                    }}
                    className="flex-1 inline-flex items-center justify-center gap-1.5 bg-white/5 hover:bg-[#C29061] text-slate-200 hover:text-slate-950 py-2.5 px-4 rounded-full text-xs font-bold border border-white/10 hover:border-[#C29061] transition-all"
                  >
                    <span>Full Specs</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>

                  <a
                    href={getProjectWhatsappUrl(project)}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="w-10 h-10 rounded-full bg-[#25D366] hover:bg-[#20ba5a] text-white flex items-center justify-center transition-colors shadow-md flex-shrink-0"
                    title="Enquire on WhatsApp about this project"
                  >
                    <MessageCircle className="w-4 h-4 fill-current" />
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* ========================================================================= */}
        {/* ALL GRID VIEW                                                             */}
        {/* ========================================================================= */}
        {viewMode === "grid" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredProjects.map((project, idx) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.08, duration: 0.4 }}
                whileHover={{ y: -6 }}
                onClick={() => setSelectedProject(project)}
                className="group relative bg-slate-900 rounded-3xl border border-white/10 overflow-hidden shadow-2xl transition-all duration-300 cursor-pointer flex flex-col justify-between"
              >
                <div>
                  <div className="relative h-60 w-full overflow-hidden bg-slate-950">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />
                    <span className="absolute top-4 left-4 text-[10px] font-mono font-bold tracking-wider uppercase px-3 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/20 text-white">
                      {project.categoryLabel}
                    </span>
                  </div>

                  <div className="p-6">
                    <div className="flex items-center gap-1.5 text-xs text-[#E8C59A] font-medium mb-1">
                      <MapPin className="w-3.5 h-3.5" />
                      <span>{project.location}</span>
                    </div>
                    <h3 className="text-lg font-bold text-white group-hover:text-[#E8C59A] transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-xs text-slate-400 mt-2 line-clamp-2">
                      {project.clientStory}
                    </p>
                  </div>
                </div>

                <div className="p-6 pt-0 flex items-center justify-between text-xs border-t border-white/10 pt-4">
                  <span className="font-mono text-[#E8C59A] font-bold">{project.area}</span>
                  <span className="inline-flex items-center gap-1 text-slate-300 group-hover:text-[#E8C59A] font-bold transition-colors">
                    <span>Explore</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Bottom Trust Guarantee Strip */}
        <div className="mt-14 pt-8 border-t border-white/10 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div className="flex flex-col items-center">
            <span className="text-2xl sm:text-3xl font-black text-[#E8C59A] font-sans">250+</span>
            <span className="text-xs text-slate-400 mt-0.5">Turnkey Handoves Delivered</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-2xl sm:text-3xl font-black text-[#E8C59A] font-sans">100%</span>
            <span className="text-xs text-slate-400 mt-0.5">NABL Certified Concrete Testing</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-2xl sm:text-3xl font-black text-[#E8C59A] font-sans">10-Year</span>
            <span className="text-xs text-slate-400 mt-0.5">Comprehensive Waterproofing</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-2xl sm:text-3xl font-black text-[#E8C59A] font-sans">₹0</span>
            <span className="text-xs text-slate-400 mt-0.5">Zero Hidden Budget Overruns</span>
          </div>
        </div>

      </div>

      {/* ========================================================================= */}
      {/* INTERACTIVE FULL PROJECT CASE STUDY MODAL                                */}
      {/* ========================================================================= */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3 }}
              className="bg-[#0B0F19] text-white rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto border border-white/15 shadow-2xl relative"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-slate-900/80 hover:bg-slate-800 text-white flex items-center justify-center transition-colors border border-white/20"
                aria-label="Close Case Study"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Large Image Header */}
              <div className="relative h-64 sm:h-80 w-full overflow-hidden bg-slate-950">
                <Image
                  src={selectedProject.image}
                  alt={selectedProject.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F19] via-transparent to-black/30" />

                <div className="absolute bottom-4 left-6 right-6 flex items-end justify-between">
                  <div>
                    <span className="text-xs font-mono font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-[#C29061] text-slate-950 inline-block mb-2">
                      {selectedProject.categoryLabel}
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-black text-white font-sans">
                      {selectedProject.title}
                    </h3>
                    <p className="text-xs text-slate-300 flex items-center gap-1.5 mt-1">
                      <MapPin className="w-3.5 h-3.5 text-[#E8C59A]" />
                      <span>{selectedProject.location}</span>
                    </p>
                  </div>
                </div>
              </div>

              {/* Modal Body Content */}
              <div className="p-6 sm:p-8 space-y-6">
                
                {/* 4 Key Metric Badges */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-900/80 p-4 rounded-2xl border border-white/10">
                  <div>
                    <span className="text-[10px] text-slate-400 font-mono block">BUILT-UP AREA</span>
                    <span className="text-sm font-bold text-white">{selectedProject.area}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 font-mono block">CONFIGURATION</span>
                    <span className="text-sm font-bold text-white">{selectedProject.floors}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 font-mono block">TIMELINE</span>
                    <span className="text-sm font-bold text-white">{selectedProject.timeline}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 font-mono block">STATUS</span>
                    <span className="text-sm font-bold text-emerald-400">{selectedProject.status}</span>
                  </div>
                </div>

                {/* Project Description */}
                <div>
                  <h4 className="text-xs font-mono uppercase tracking-wider text-[#E8C59A] font-bold mb-2">
                    Project Overview
                  </h4>
                  <p className="text-sm text-slate-300 leading-relaxed">
                    {selectedProject.clientStory}
                  </p>
                </div>

                {/* Key Architectural & Interior Highlights */}
                <div>
                  <h4 className="text-xs font-mono uppercase tracking-wider text-[#E8C59A] font-bold mb-3">
                    Architectural &amp; Material Highlights
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {selectedProject.features.map((feature, i) => (
                      <div
                        key={i}
                        className="flex items-start gap-2.5 bg-slate-900/60 p-3 rounded-xl border border-white/5 text-xs text-slate-200"
                      >
                        <CheckCircle2 className="w-4 h-4 text-[#C29061] flex-shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Structural Rigor Specification */}
                <div className="p-4 bg-slate-900/90 rounded-2xl border border-white/10">
                  <div className="flex items-center gap-2 text-xs font-bold text-white mb-1.5">
                    <Shield className="w-4 h-4 text-[#C29061]" />
                    <span>Civil Engineering &amp; Quality Guarantee</span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {selectedProject.engineering}
                  </p>
                  <p className="text-[11px] text-slate-400 mt-2 font-mono">
                    Supervised &amp; Certified by: <strong>Er. Sahaya Antony Stalin</strong> (B.E. Civil, Jancy Builders)
                  </p>
                </div>

                {/* Direct Action CTAs inside Modal */}
                <div className="pt-4 flex flex-col sm:flex-row items-center gap-3">
                  <a
                    href={getProjectWhatsappUrl(selectedProject)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:flex-1 inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20ba5a] text-white py-3.5 px-6 rounded-full font-bold text-xs uppercase tracking-wider shadow-lg shadow-[#25D366]/20 transition-all hover:scale-105"
                  >
                    <MessageCircle className="w-4 h-4 fill-current" />
                    <span>Enquire About Similar Project on WhatsApp</span>
                  </a>

                  <button
                    onClick={() => {
                      setSelectedProject(null);
                      onOpenQuote();
                    }}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#C29061] hover:bg-[#b58354] text-slate-950 py-3.5 px-6 rounded-full font-bold text-xs uppercase tracking-wider transition-all"
                  >
                    <span>Book Free Site Consultation</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>

              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
