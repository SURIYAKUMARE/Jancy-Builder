"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import {
  Sparkles,
  ChevronLeft,
  ChevronRight,
  X,
  MapPin,
  ExternalLink,
  Maximize2,
  Filter,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { CANONICAL_GALLERY, GalleryItem } from "@/data/projects-data";

export default function GallerySection() {
  const [activeFilter, setActiveFilter] = useState<"all" | "sites" | "completed" | "materials">("all");
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);

  const filteredItems = activeFilter === "all"
    ? CANONICAL_GALLERY
    : CANONICAL_GALLERY.filter((item) => item.category === activeFilter);

  // Keyboard navigation for Lightbox
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (lightboxIdx === null) return;
      if (e.key === "Escape") setLightboxIdx(null);
      if (e.key === "ArrowRight") {
        setLightboxIdx((prev) => (prev !== null ? (prev + 1) % filteredItems.length : null));
      }
      if (e.key === "ArrowLeft") {
        setLightboxIdx((prev) => (prev !== null ? (prev - 1 + filteredItems.length) % filteredItems.length : null));
      }
    },
    [lightboxIdx, filteredItems.length]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  const activeLightboxItem = lightboxIdx !== null ? filteredItems[lightboxIdx] : null;

  return (
    <section id="gallery" className="py-20 lg:py-28 bg-[#0B0F19] text-white relative overflow-hidden border-t border-white/10 scroll-mt-24">
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 left-0 w-96 h-96 bg-[#C29061]/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-96 h-96 bg-red-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 pb-6 border-b border-white/10">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="h-[2px] w-8 bg-[#C29061] block" />
              <span className="text-xs font-mono font-bold uppercase tracking-[0.25em] text-[#C29061]">
                FIELD DOCUMENTATION &amp; WORK SITES
              </span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight font-sans">
              Authentic Construction Gallery
            </h2>
            <p className="mt-2 text-sm text-slate-400 max-w-xl leading-relaxed">
              Every photo represents actual work by Jancy Builders across Tirunelveli district, from structural slab casting to precision Porotherm brickwork and turnkey villa handovers.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-2 flex-wrap">
            {[
              { id: "all", label: "All Photos" },
              { id: "sites", label: "Active Work Sites" },
              { id: "materials", label: "Thermal Clay Bricks" },
              { id: "completed", label: "Completed Handover" },
            ].map((tab) => {
              const isActive = activeFilter === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveFilter(tab.id as any);
                    setLightboxIdx(null);
                  }}
                  className={`px-4 py-2 rounded-full text-xs font-semibold transition-all ${
                    isActive
                      ? "bg-[#C29061] text-slate-950 font-bold shadow-md"
                      : "bg-slate-900/80 text-slate-400 hover:text-white border border-white/10"
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Masonry / Grid Gallery Layout with defined aspect ratios to prevent layout shift */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredItems.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.08, duration: 0.5 }}
              onClick={() => setLightboxIdx(idx)}
              className="group relative rounded-2xl overflow-hidden bg-slate-900 border border-white/10 shadow-xl cursor-pointer hover:border-[#C29061]/50 transition-all duration-300"
            >
              {/* Image Container with fixed 16:10 aspect ratio */}
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-950">
                <Image
                  src={item.image}
                  alt={item.caption}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

                {/* Top Location Pill */}
                <div className="absolute top-3 left-3 pointer-events-none">
                  <span className="text-[10px] font-mono font-bold tracking-wider uppercase px-2.5 py-1 rounded-full bg-black/75 backdrop-blur-md border border-white/15 text-[#E8C59A] flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    <span>{item.location}</span>
                  </span>
                </div>

                {/* Hover Maximize Icon */}
                <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="w-8 h-8 rounded-full bg-white/90 text-slate-950 flex items-center justify-center shadow-lg">
                    <Maximize2 className="w-4 h-4" />
                  </div>
                </div>

                {/* Bottom Caption Overlay */}
                <div className="absolute bottom-0 inset-x-0 p-4">
                  <h4 className="text-sm font-bold text-white group-hover:text-[#E8C59A] transition-colors line-clamp-1">
                    {item.projectName}
                  </h4>
                  <p className="text-xs text-slate-300 mt-1 line-clamp-2 leading-relaxed">
                    {item.caption}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Live Social Proof Badge */}
        <div className="mt-12 text-center">
          <a
            href="https://www.facebook.com/JancyBuilder/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#1877F2]/15 hover:bg-[#1877F2]/25 text-[#1877F2] hover:text-white border border-[#1877F2]/30 text-xs font-bold transition-all shadow-md"
          >
            <span>View 100+ Live Work Site Videos &amp; Photos on Facebook</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

      </div>

      {/* ========================================================================= */}
      {/* FULL-SCREEN ACCESSIBLE LIGHTBOX VIEWER                                   */}
      {/* ========================================================================= */}
      <AnimatePresence>
        {activeLightboxItem && lightboxIdx !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex flex-col items-center justify-between p-4 sm:p-8"
          >
            {/* Top Lightbox Controls */}
            <div className="w-full max-w-6xl flex items-center justify-between text-white pb-4 border-b border-white/10">
              <div className="flex items-center gap-3">
                <span className="text-xs font-mono font-bold text-[#E8C59A]">
                  PHOTO {lightboxIdx + 1} OF {filteredItems.length}
                </span>
                <span className="text-xs text-slate-400">•</span>
                <span className="text-xs text-slate-300 font-medium">{activeLightboxItem.projectName}</span>
              </div>

              <button
                onClick={() => setLightboxIdx(null)}
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
                aria-label="Close Lightbox"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Central Lightbox Image View with Previous/Next Arrows */}
            <div className="relative w-full max-w-5xl my-auto flex items-center justify-center">
              {/* Prev Button */}
              <button
                onClick={() =>
                  setLightboxIdx((prev) => (prev !== null ? (prev - 1 + filteredItems.length) % filteredItems.length : 0))
                }
                className="absolute left-2 sm:-left-12 z-20 w-12 h-12 rounded-full bg-slate-900/80 hover:bg-slate-800 text-white flex items-center justify-center transition-all border border-white/20 shadow-xl"
                aria-label="Previous Image"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              {/* High-Res View Container */}
              <div className="relative w-full max-h-[70vh] aspect-[16/10] rounded-2xl overflow-hidden shadow-2xl border border-white/15 bg-black">
                <Image
                  src={activeLightboxItem.image}
                  alt={activeLightboxItem.caption}
                  fill
                  className="object-contain"
                  priority
                />
              </div>

              {/* Next Button */}
              <button
                onClick={() =>
                  setLightboxIdx((prev) => (prev !== null ? (prev + 1) % filteredItems.length : 0))
                }
                className="absolute right-2 sm:-right-12 z-20 w-12 h-12 rounded-full bg-slate-900/80 hover:bg-slate-800 text-white flex items-center justify-center transition-all border border-white/20 shadow-xl"
                aria-label="Next Image"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>

            {/* Bottom Caption & Location Details */}
            <div className="w-full max-w-3xl text-center pt-4">
              <p className="text-sm sm:text-base font-semibold text-white">
                {activeLightboxItem.caption}
              </p>
              <p className="text-xs text-[#E8C59A] font-mono mt-1">
                Location: {activeLightboxItem.location}, Tirunelveli District • Verified Jancy Builders Project Site
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
