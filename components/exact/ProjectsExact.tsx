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
  isLiveWorkSite?: boolean;
  workStage?: string;
  fbPostUrl?: string;
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
      id: "durainagar-praveen-naveen",
      title: "Mr. Praveen & Naveen Residence (Durainagar Site)",
      category: "ongoing",
      categoryLabel: "Live Work Site • Durainagar",
      location: "Durainagar, Tirunelveli",
      image: "/images/projects/site-durainagar-praveen.jpg",
      area: "2,850 sq.ft",
      floors: "G+1 Duplex Villa",
      timeline: "Active Site • 2024",
      status: "Under Construction",
      isLiveWorkSite: true,
      workStage: "RCC Roof Slab Pouring & Framework",
      fbPostUrl: "https://www.facebook.com/JancyBuilder/videos/jancy-builders-mrpraveen-naveen-homedurainagar-siteer-stalin-antony-a-httpswamec/1478905302834039/",
      features: [
        "Mechanized Concrete Boom Placer Slab Pouring",
        "High-Yield Fe550D TMT Earthquake-Resistant Rebars",
        "3D Laser-Optical Leveling & Concrete Cover Spacers",
        "Direct On-Site Supervision by Er. Sahaya Antony Stalin",
      ],
      engineering: "Precision-engineered RCC roof slab using IS 456 M25 design mix, needle vibrator compaction, and continuous 28-day water ponding curing for an impervious crack-free structure.",
      clientStory: "Captured live from our Durainagar site for clients Mr. Praveen & Naveen. This modern duplex features expansive living spaces and earthquake-resistant column-to-beam detailing.",
    },
    {
      id: "samugarengapuram-porotherm-srinivas",
      title: "Mr. Srinivas Residence (Porotherm Brick Site)",
      category: "ongoing",
      categoryLabel: "Eco-Thermal Villa • Samugarengapuram",
      location: "Samugarengapuram, Tirunelveli",
      image: "/images/projects/site-samugarengapuram-porotherm.jpg",
      area: "3,400 sq.ft",
      floors: "G+1 Thermal Villa",
      timeline: "Active Site • Precision Brickwork",
      status: "Under Construction",
      isLiveWorkSite: true,
      workStage: "Porotherm Clay Hollow Brick Masonry",
      fbPostUrl: "https://www.facebook.com/Stalinsaw/posts/%E0%AE%A4%E0%AE%BF%E0%AE%B0%E0%AF%81%E0%AE%B6%E0%AF%8D%E0%AE%B0%E0%AF%80%E0%AE%A8%E0%AE%BF%E0%AE%B5%E0%AE%BE%E0%AE%B8%E0%AF%8D-%E0%AE%85%E0%AE%B5%E0%AE%B0%E0%AF%8D%E0%AE%95%E0%AE%B3%E0%AE%BF%E0%AE%A9%E0%AF%8D-%E0%AE%AA%E0%AF%8B%E0%AE%B0%E0%AF%8B%E0%AE%A4%E0%AF%8B%E0%AE%AE%E0%AF%8D-%E0%AE%AA%E0%AE%BF%E0%AE%B0%E0%AE%BF%E0%AE%95%E0%AF%8D-%E0%AE%AE%E0%AF%82%E0%AE%B2%E0%AE%AE%E0%AF%8D-%E0%AE%95%E0%AE%9F%E0%AF%8D%E0%AE%9F%E0%AE%AA%E0%AF%8D%E0%AE%AA%E0%AE%9F%E0%AF%8D%E0%AE%9F-%E0%AE%B5%E0%AF%80%E0%AE%9F%E0%AE%BF%E0%AE%A9%E0%AF%8D-%E0%AE%B5%E0%AF%87%E0%AE%B2%E0%AF%88-%E0%AE%9A%E0%AE%AE%E0%AF%81%E0%AE%95%E0%AE%B0%E0%AF%86%E0%AE%99%E0%AF%8D%E0%AE%95%E0%AE%AA/6819041638196279/",
      features: [
        "Wienerberger Porotherm Perforated Hollow Clay Bricks",
        "6°C Cooler Indoor Temperature via Natural Thermal Insulation",
        "60% Lighter Masonry Reducing Seismic Load on Footings",
        "Laser-Aligned Thin-Bed Polymer Mortar Bedding",
      ],
      engineering: "Constructed with specialized hollow terracotta Porotherm clay blocks for maximum climatic comfort during hot South Indian summers, delivering superior U-values and zero chemical emissions.",
      clientStory: "திரு.ஶ்ரீநிவாஸ் அவர்களின் போரோதெர்ம் பிரிக் மூலம் கட்டப்பட்ட வீட்டின் வேலை சமுகரெங்கபுரம். Documented from our flagship eco-thermal villa site in Samugarengapuram.",
    },
    {
      id: "ammachikovil-boomi-pooja",
      title: "Ammachikovil Site (Boomi Pooja & Foundation)",
      category: "ongoing",
      categoryLabel: "New Site Inception • Samugarengapuram",
      location: "Ammachikovil, Samugarengapuram",
      image: "/images/projects/site-ammachikovil-pooja.jpg",
      area: "4,100 sq.ft",
      floors: "G+2 Contemporary Villa",
      timeline: "Foundation Phase • 2024",
      status: "Under Construction",
      isLiveWorkSite: true,
      workStage: "Boomi Pooja & Isolated Footing Excavation",
      fbPostUrl: "https://www.facebook.com/Stalinsaw/posts/jancy-builders-new-site-booming-poojasamugarengapuram-ammachikovil-siteerstalin-/25328419630165199/",
      features: [
        "Traditional Auspicious Boomi Pooja with Client Family",
        "Heavy Hydraulic Excavator Footing & Trench Marking",
        "Laser-Surveyed Grid Alignment & Peg Layout",
        "Pre-Construction Subterranean Anti-Termite Soil Barrier",
      ],
      engineering: "Substructure engineered with isolated pad footings on dense gravel strata (tested SBC 250 kN/m²), anti-corrosive epoxy rebar coating, and M30 grade concrete pedestals.",
      clientStory: "Ceremonial ground breaking and site inauguration at Ammachikovil, Samugarengapuram. Led personally on site by Er. Sahaya Antony Stalin with the client family.",
    },
    {
      id: "silathikulam-murugan-residence",
      title: "Mr. Murugan Residence (Silathikulam Site)",
      category: "residential",
      categoryLabel: "Turnkey Handover • Silathikulam",
      location: "Silathikulam, Tirunelveli",
      image: "/images/projects/site-silathikulam-murugan.jpg",
      area: "2,650 sq.ft",
      floors: "G+1 Modern Villa",
      timeline: "11 Months • Delivered on Time",
      status: "Completed",
      isLiveWorkSite: false,
      workStage: "Completed & Key Handed Over",
      fbPostUrl: "https://www.facebook.com/JancyBuilder/",
      features: [
        "Double-Height Portico with Burma Teakwood Entrance",
        "Cantilevered Balcony with Frameless Toughened Glass",
        "Warm Dusk LED Architectural Linear Facade Lighting",
        "Interlocking Granite Cobblestone Paved Driveway",
      ],
      engineering: "Raft foundation design with elastomeric waterproof exterior texture coatings, concealed CPVC plumbing pressure-tested to 15 Bar, and zero maintenance requirements.",
      clientStory: "Delivered turnkey to Mr. Murugan and family at Silathikulam with zero cost escalations, 100% promised specifications, and certified key handover.",
    },
    {
      id: "kavalkinaru-villa",
      title: "Kavalkinaru Modern Architectural Villa",
      category: "villas",
      categoryLabel: "Modern Villa • Kavalkinaru",
      location: "Kavalkinaru, Tirunelveli",
      image: "/images/projects/site-kavalkinaru-villa.jpg",
      area: "3,800 sq.ft",
      floors: "G+2 Luxury Duplex",
      timeline: "12 Months • Completed 2024",
      status: "Completed",
      isLiveWorkSite: false,
      workStage: "Architectural Masterpiece",
      fbPostUrl: "https://www.facebook.com/JancyBuilder/",
      features: [
        "Floating Cantilevered Roof Slab with Soffit Lighting",
        "Vertical Kiln-Dried Wood Louver Solar Sunshade Screen",
        "Double-Height Panoramic Living Room Glass Glazing",
        "Covered Multi-Vehicle Portico & Tropical Garden",
      ],
      engineering: "Post-tensioned cantilever beams with sub-millimeter laser optical surveys, acoustic insulated party walls, and rooftop rainwater harvesting recharge pits.",
      clientStory: "An architectural landmark in Kavalkinaru crafted for expansive cross-ventilation, generous natural light, and serene privacy for a distinguished family.",
    },
    {
      id: "samugarengapuram-villa",
      title: "Samugarengapuram Signature Luxury Estate",
      category: "villas",
      categoryLabel: "Signature Estate • Samugarengapuram",
      location: "Samugarengapuram, Tirunelveli",
      image: "/images/projects/luxury-villa.jpg",
      area: "6,500 sq.ft",
      floors: "G+2 Luxury Villa",
      timeline: "14 Months • Completed 2024",
      status: "Completed",
      isLiveWorkSite: false,
      workStage: "Flagship Landmark",
      fbPostUrl: "https://www.facebook.com/JancyBuilder/",
      features: [
        "Italian Statuario Marble Slabs (1600x3200mm)",
        "KNX Smart Home Automation & Perimeter Security",
        "Reflective Water Body & Paved Granite Driveway",
        "Automated Drip Irrigation & Solar Water Heating",
      ],
      engineering: "Engineered with raft foundation, Fe550D TMT high-ductility rebars, and IS 13920 seismic confinement.",
      clientStory: "Our flagship residential estate in Samugarengapuram blending contemporary luxury with ultimate structural permanence.",
    },
    {
      id: "vallioor-commercial-hub",
      title: "Valliyur Commercial Landmark & Retail Complex",
      category: "commercial",
      categoryLabel: "Commercial Landmark • Valliyur",
      location: "Main Road, Valliyur, Tirunelveli",
      image: "/images/projects/office-building.jpg",
      area: "18,500 sq.ft",
      floors: "G+3 Commercial & Retail Center",
      timeline: "14 Months • Completed 2024",
      status: "Completed",
      isLiveWorkSite: false,
      workStage: "Commercial Complex",
      fbPostUrl: "https://www.facebook.com/JancyBuilder/",
      features: [
        "Double-Glazed Acoustic Structural Curtain Wall",
        "Basement Parking & 3-Phase Commercial Power Grid",
        "High-Speed Passenger Lift & Automatic Generator Backup",
        "Zero-Maintenance Aluminum Composite Panel Cladding",
      ],
      engineering: "Continuous pile foundation into hard strata with heavy ISMB steel beam supports and fire-resistant emergency exits.",
      clientStory: "A prime commercial investment property on the main road in Valliyur, hosting high-footfall retail and corporate offices.",
    },
    {
      id: "palayamkottai-apartments",
      title: "Palayamkottai Elite Residential Enclave",
      category: "residential",
      categoryLabel: "Multi-Unit Living • Palayamkottai",
      location: "Palayamkottai, Tirunelveli",
      image: "/images/projects/apartment-complex.jpg",
      area: "32,000 sq.ft",
      floors: "G+4 Luxury Apartments (16 Units)",
      timeline: "16 Months • Completed 2023",
      status: "Completed",
      isLiveWorkSite: false,
      workStage: "Delivered Enclave",
      fbPostUrl: "https://www.facebook.com/JancyBuilder/",
      features: [
        "High-Speed Automatic Passenger Elevators",
        "Rooftop Community Garden & Fitness Lounge",
        "Dedicated EV Charging Stations in Stilt Level",
        "24x7 Multi-Tier Biometric & CCTV Security",
      ],
      engineering: "Dual elastomeric polyurethane waterproofing with zero-leakage guarantee and acoustic drain piping.",
      clientStory: "A premium community development providing serene community life in the heart of Tirunelveli.",
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
      `Hello Er. Sahaya Antony Stalin, I reviewed the project "${p.title}" (${p.location}, ${p.area}) from Jancy Builders. Please share detailed floor plans, structural BOQ, and turnkey cost estimate for a similar construction.`
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
            { id: "all", label: `All Works (${projects.length})` },
            { id: "ongoing", label: `Live Work Sites (${projects.filter(p => p.isLiveWorkSite).length})` },
            { id: "villas", label: `Luxury Villas (${projects.filter(p => p.category === 'villas').length})` },
            { id: "residential", label: `Modern Residences (${projects.filter(p => p.category === 'residential').length})` },
            { id: "commercial", label: `Commercial (${projects.filter(p => p.category === 'commercial').length})` },
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
                      <span className="text-[10px] font-mono font-bold tracking-wider uppercase px-3 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/20 text-white">
                        {project.categoryLabel}
                      </span>
                      {project.isLiveWorkSite ? (
                        <span className="text-[10px] font-mono font-bold px-2.5 py-1 rounded-full flex items-center gap-1.5 backdrop-blur-md bg-amber-500/95 border border-amber-300 text-slate-950 shadow-lg shadow-amber-500/25">
                          <span className="w-2 h-2 rounded-full bg-red-600 animate-ping" />
                          <span>LIVE WORK SITE</span>
                        </span>
                      ) : (
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
                      )}
                    </div>

                    {/* Bottom Work Stage Ribbon on Image */}
                    {project.workStage && (
                      <div className="absolute bottom-3 left-4 right-4 pointer-events-none">
                        <span className="text-[11px] font-semibold tracking-wide px-3 py-1 rounded-lg bg-black/80 backdrop-blur-md border border-white/15 text-[#E8C59A] inline-flex items-center gap-1.5">
                          <Sparkles className="w-3 h-3 text-[#E8C59A]" />
                          <span className="truncate">{project.workStage}</span>
                        </span>
                      </div>
                    )}

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
                <div className="p-6 pt-0 flex items-center justify-between gap-2.5">
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

                  {project.fbPostUrl && (
                    <a
                      href={project.fbPostUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="w-9 h-9 rounded-full bg-[#1877F2]/20 hover:bg-[#1877F2] text-[#1877F2] hover:text-white border border-[#1877F2]/40 flex items-center justify-center transition-all shadow-md flex-shrink-0"
                      title="View on Facebook"
                    >
                      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                      </svg>
                    </a>
                  )}

                  <a
                    href={getProjectWhatsappUrl(project)}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="w-9 h-9 rounded-full bg-[#25D366] hover:bg-[#20ba5a] text-white flex items-center justify-center transition-colors shadow-md flex-shrink-0"
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
                    
                    <div className="absolute top-4 inset-x-4 flex items-center justify-between pointer-events-none">
                      <span className="text-[10px] font-mono font-bold tracking-wider uppercase px-3 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/20 text-white">
                        {project.categoryLabel}
                      </span>
                      {project.isLiveWorkSite && (
                        <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full flex items-center gap-1 backdrop-blur-md bg-amber-500/95 text-slate-950 shadow-md">
                          <span className="w-1.5 h-1.5 rounded-full bg-red-600 animate-ping" />
                          <span>LIVE</span>
                        </span>
                      )}
                    </div>

                    {project.workStage && (
                      <div className="absolute bottom-2 left-3 right-3 pointer-events-none">
                        <span className="text-[10px] font-semibold px-2.5 py-0.5 rounded bg-black/80 backdrop-blur-md border border-white/15 text-[#E8C59A] inline-block truncate max-w-full">
                          {project.workStage}
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="p-6">
                    <div className="flex items-center gap-1.5 text-xs text-[#E8C59A] font-medium mb-1">
                      <MapPin className="w-3.5 h-3.5 flex-shrink-0" />
                      <span className="truncate">{project.location}</span>
                    </div>
                    <h3 className="text-lg font-bold text-white group-hover:text-[#E8C59A] transition-colors line-clamp-1">
                      {project.title}
                    </h3>
                    <p className="text-xs text-slate-400 mt-2 line-clamp-2">
                      {project.clientStory}
                    </p>
                  </div>
                </div>

                <div className="p-6 pt-0 flex items-center justify-between text-xs border-t border-white/10 pt-4">
                  <span className="font-mono text-[#E8C59A] font-bold">{project.area}</span>
                  <div className="flex items-center gap-2">
                    {project.fbPostUrl && (
                      <span className="text-[11px] font-semibold text-[#1877F2] bg-[#1877F2]/10 px-2 py-0.5 rounded-md flex items-center gap-1">
                        <span>Facebook</span>
                        <ExternalLink className="w-3 h-3" />
                      </span>
                    )}
                    <span className="inline-flex items-center gap-1 text-slate-300 group-hover:text-[#E8C59A] font-bold transition-colors">
                      <span>Explore</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
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
                    <span>Enquire on WhatsApp</span>
                  </a>

                  {selectedProject.fbPostUrl && (
                    <a
                      href={selectedProject.fbPostUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#1877F2] hover:bg-[#166fe5] text-white py-3.5 px-5 rounded-full font-bold text-xs uppercase tracking-wider shadow-lg transition-all"
                    >
                      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                      </svg>
                      <span>Facebook Post / Video</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}

                  <button
                    onClick={() => {
                      setSelectedProject(null);
                      onOpenQuote();
                    }}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#C29061] hover:bg-[#b58354] text-slate-950 py-3.5 px-6 rounded-full font-bold text-xs uppercase tracking-wider transition-all"
                  >
                    <span>Book Free Site Visit</span>
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
