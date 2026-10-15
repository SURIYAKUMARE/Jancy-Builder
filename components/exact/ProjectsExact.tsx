"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  MapPin,
  CheckCircle2,
  X,
  ExternalLink,
  MessageCircle,
  Eye,
  Grid3X3,
  Columns,
  Layers,
  Sparkles,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { CANONICAL_PROJECTS, Project } from "@/data/projects-data";
import { useLanguage } from "@/context/LanguageContext";
import BlurText from "@/components/motion/BlurText";

interface ProjectsExactProps {
  onOpenQuote: () => void;
}

type FilterType = "all" | "completed" | "ongoing" | "porotherm" | "residential";

export default function ProjectsExact({ onOpenQuote }: ProjectsExactProps) {
  const { isTamil } = useLanguage();
  const [activeFilter, setActiveFilter] = useState<FilterType>("all");
  const [viewMode, setViewMode] = useState<"grid" | "carousel">("grid");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [modalActiveImage, setModalActiveImage] = useState<string>("");

  const projects = CANONICAL_PROJECTS;

  const filteredProjects = projects.filter((p) => {
    if (activeFilter === "all") return true;
    if (activeFilter === "completed") return p.status === "Completed";
    if (activeFilter === "ongoing") return p.status === "Under Construction" || p.isLiveWorkSite;
    if (activeFilter === "porotherm") return p.id.includes("porotherm") || p.name.toLowerCase().includes("porotherm");
    if (activeFilter === "residential") return p.category === "residential";
    return true;
  });

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + filteredProjects.length) % filteredProjects.length);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % filteredProjects.length);
  };

  const handleOpenModal = (project: Project) => {
    setSelectedProject(project);
    setModalActiveImage(project.coverImage);
  };

  const filterTabs: { id: FilterType; labelEn: string; labelTa: string }[] = [
    { id: "all", labelEn: "All Projects", labelTa: "அனைத்து பணிகள்" },
    { id: "completed", labelEn: "Completed Handover", labelTa: "நிறைவுற்ற இல்லங்கள்" },
    { id: "ongoing", labelEn: "Ongoing Construction", labelTa: "நடைபெறும் பணிகள்" },
    { id: "porotherm", labelEn: "Porotherm Specialty", labelTa: "போரோதெர்ம் குளுமை வீடுகள்" },
    { id: "residential", labelEn: "Luxury Villas", labelTa: "ஆடம்பர வில்லாக்கள்" },
  ];

  return (
    <section
      id="projects"
      className="w-full bg-black py-24 sm:py-32 text-white relative overflow-hidden scroll-mt-20 font-body"
    >
      {/* Background Decorative Gold Ambient Lighting */}
      <div className="absolute top-0 right-1/4 w-[600px] h-[400px] bg-[#C9A46B]/5 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-10 w-[500px] h-[350px] bg-white/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12 pb-6 border-b border-white/10">
          <div>
            <div className="inline-flex items-center gap-2 mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C9A46B]" />
              <span className="text-xs font-mono font-bold uppercase tracking-[0.25em] text-[#C9A46B]">
                {isTamil ? "உண்மையான கட்டுமான பணிகள்" : "// REAL PROJECT PORTFOLIO"}
              </span>
            </div>

            {isTamil ? (
              <BlurText
                text="கட்டி முடிக்கப்பட்ட & நடைபெறும் திட்டங்கள்"
                as="h2"
                isTamil={true}
                className="text-3xl sm:text-5xl font-tamil font-black text-white tracking-tight"
              />
            ) : (
              <BlurText
                text="Enduring Craftsmanship & Turnkey Landmarks."
                as="h2"
                italic={true}
                className="text-4xl sm:text-6xl font-heading font-normal text-white tracking-tight leading-[1.08]"
              />
            )}

            <p className="mt-3 text-sm sm:text-base text-white/70 max-w-xl leading-relaxed">
              {isTamil
                ? "திருநெல்வேலி, சாமுகரெங்கபுரம், வள்ளியூர் மற்றும் தென் தமிழகத்தில் எங்களால் உறுதியாக கட்டப்பட்ட உண்மையான கட்டுமானப் புகைப்படங்கள்."
                : "Explore authentic site photography and completed turnkey handovers across Tirunelveli and South Tamil Nadu. Supervised directly by Er. Sahaya Antony Stalin."}
            </p>
          </div>

          {/* Controls: View Mode Toggle */}
          <div className="flex items-center gap-3">
            <div className="flex items-center liquid-glass p-1 rounded-full">
              <button
                onClick={() => setViewMode("grid")}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
                  viewMode === "grid"
                    ? "bg-white text-black font-bold shadow-md"
                    : "text-white/60 hover:text-white"
                }`}
              >
                <Grid3X3 className="w-3.5 h-3.5" />
                <span>{isTamil ? "கட்டம்" : "Grid"}</span>
              </button>
              <button
                onClick={() => setViewMode("carousel")}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
                  viewMode === "carousel"
                    ? "bg-white text-black font-bold shadow-md"
                    : "text-white/60 hover:text-white"
                }`}
              >
                <Columns className="w-3.5 h-3.5" />
                <span>{isTamil ? "சுழல்" : "Carousel"}</span>
              </button>
            </div>

            {viewMode === "carousel" && (
              <div className="flex items-center gap-1.5">
                <button
                  onClick={handlePrev}
                  className="w-9 h-9 rounded-full liquid-glass hover:bg-white/10 text-white flex items-center justify-center transition-all"
                  aria-label="Previous"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={handleNext}
                  className="w-9 h-9 rounded-full liquid-glass hover:bg-white/10 text-white flex items-center justify-center transition-all"
                  aria-label="Next"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
          {filterTabs.map((tab) => {
            const isActive = activeFilter === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveFilter(tab.id);
                  setCurrentIndex(0);
                }}
                className={`px-4 py-2 rounded-full text-xs font-medium tracking-wide whitespace-nowrap transition-all duration-200 ${
                  isActive
                    ? "bg-[#C9A46B] text-black font-bold shadow-lg shadow-[#C9A46B]/20"
                    : "liquid-glass text-white/70 hover:text-white"
                }`}
              >
                <span>{isTamil ? tab.labelTa : tab.labelEn}</span>
              </button>
            );
          })}
        </div>

        {/* Projects View */}
        {viewMode === "grid" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredProjects.map((project, idx) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-5%" }}
                transition={{ delay: idx * 0.08, duration: 0.6 }}
                onClick={() => handleOpenModal(project)}
                className="group cursor-pointer rounded-[1.25rem] liquid-glass hover:border-[#C9A46B]/50 transition-all duration-300 overflow-hidden flex flex-col justify-between"
              >
                {/* Image Container with Zoom */}
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-zinc-900">
                  <Image
                    src={project.coverImage}
                    alt={project.name}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />

                  {/* Status Badge */}
                  <div className="absolute top-3 left-3">
                    <span
                      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-mono font-bold tracking-wide backdrop-blur-md ${
                        project.status === "Completed"
                          ? "bg-emerald-950/80 text-emerald-300 border border-emerald-500/30"
                          : "bg-amber-950/80 text-amber-300 border border-amber-500/30"
                      }`}
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-current" />
                      <span>{project.status.toUpperCase()}</span>
                    </span>
                  </div>

                  {/* Quick Photo Count Badge */}
                  <div className="absolute bottom-3 right-3 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-white/80 text-[10px] font-mono flex items-center gap-1 border border-white/10">
                    <Eye className="w-3 h-3 text-[#C9A46B]" />
                    <span>{project.gallery.length} Photos</span>
                  </div>
                </div>

                {/* Content Area */}
                <div className="p-5 sm:p-6 space-y-3">
                  <div className="flex items-center gap-1.5 text-xs text-[#C9A46B] font-mono">
                    <MapPin className="w-3.5 h-3.5 flex-shrink-0" />
                    <span>{project.location}</span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-heading italic text-white group-hover:text-[#E2C496] transition-colors leading-snug">
                    {project.name}
                  </h3>

                  <p className="text-xs text-white/70 line-clamp-2 leading-relaxed">
                    {project.description}
                  </p>

                  {/* Specs Strip */}
                  <div className="pt-3 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-white/60">
                    <span>{project.builtUpArea}</span>
                    <span className="text-[#C9A46B] group-hover:translate-x-1 transition-transform flex items-center gap-1 font-sans font-semibold">
                      <span>View Gallery</span>
                      <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          /* Carousel View */
          <div className="relative">
            {filteredProjects[currentIndex] && (
              <div
                onClick={() => handleOpenModal(filteredProjects[currentIndex])}
                className="cursor-pointer rounded-3xl liquid-glass-strong border border-white/15 overflow-hidden grid grid-cols-1 lg:grid-cols-12 gap-6"
              >
                <div className="lg:col-span-7 relative aspect-[16/10] lg:aspect-auto min-h-[350px]">
                  <Image
                    src={filteredProjects[currentIndex].coverImage}
                    alt={filteredProjects[currentIndex].name}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-black/20 to-black/80 hidden lg:block" />
                </div>
                <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between space-y-4">
                  <div className="space-y-3">
                    <span className="text-xs font-mono text-[#C9A46B] flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5" />
                      <span>{filteredProjects[currentIndex].location}</span>
                    </span>
                    <h3 className="text-3xl sm:text-4xl font-heading italic text-white">
                      {filteredProjects[currentIndex].name}
                    </h3>
                    <p className="text-sm text-white/75 leading-relaxed">
                      {filteredProjects[currentIndex].description}
                    </p>
                  </div>
                  <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                    <span className="text-xs font-mono text-white/60">
                      {filteredProjects[currentIndex].builtUpArea} • {filteredProjects[currentIndex].status}
                    </span>
                    <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white text-black text-xs font-bold">
                      <span>Inspect Details</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

      </div>

      {/* Fullscreen Photo Gallery Modal */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-[120] flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-2xl overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-5xl liquid-glass-strong border border-white/20 rounded-3xl overflow-hidden my-auto"
            >
              {/* Header */}
              <div className="p-5 sm:p-6 border-b border-white/10 flex items-start justify-between gap-4">
                <div>
                  <span className="text-xs font-mono text-[#C9A46B] flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>{selectedProject.location}</span>
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-heading italic text-white mt-1">
                    {selectedProject.name}
                  </h3>
                </div>
                <button
                  onClick={() => setSelectedProject(null)}
                  className="w-10 h-10 rounded-full liquid-glass hover:bg-white/20 text-white flex items-center justify-center transition-colors flex-shrink-0"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Main Photo Display */}
              <div className="p-4 sm:p-6 space-y-4">
                <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full rounded-2xl overflow-hidden bg-black">
                  <Image
                    src={modalActiveImage}
                    alt={selectedProject.name}
                    fill
                    className="object-contain"
                  />
                </div>

                {/* Thumbnails strip */}
                <div className="flex items-center gap-2.5 overflow-x-auto pb-2 scrollbar-none">
                  {selectedProject.gallery.map((img, i) => (
                    <button
                      key={i}
                      onClick={() => setModalActiveImage(img)}
                      className={`relative w-20 h-14 rounded-lg overflow-hidden flex-shrink-0 border-2 transition-all ${
                        modalActiveImage === img
                          ? "border-[#C9A46B] scale-105"
                          : "border-transparent opacity-60 hover:opacity-100"
                      }`}
                    >
                      <Image src={img} alt="thumb" fill className="object-cover" />
                    </button>
                  ))}
                </div>

                {/* Details & WhatsApp Action */}
                <div className="p-4 rounded-2xl liquid-glass flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="text-xs space-y-1 text-white/80">
                    <p className="font-semibold text-white">{selectedProject.configuration} • {selectedProject.builtUpArea}</p>
                    <p className="text-white/60">{selectedProject.engineering}</p>
                  </div>

                  <a
                    href={`https://wa.me/917708247124?text=${encodeURIComponent(
                      `Hello Er. Stalin, I reviewed the project "${selectedProject.name}" in ${selectedProject.location} on your website. I want to build a similar home.`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#25D366] hover:bg-[#20ba5a] text-black font-bold text-xs uppercase tracking-wider flex-shrink-0 shadow-lg"
                  >
                    <MessageCircle className="w-4 h-4 fill-current" />
                    <span>Enquire on WhatsApp</span>
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </section>
  );
}
