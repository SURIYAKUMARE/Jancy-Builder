"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  MapPin,
  ExternalLink,
  Maximize2,
  ChevronLeft,
  ChevronRight,
  X,
  MessageCircle,
  ArrowRight,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import NavbarExact from "@/components/exact/NavbarExact";
import FooterExact from "@/components/exact/FooterExact";
import FloatingWhatsApp from "@/components/common/FloatingWhatsApp";
import QuoteModal from "@/components/quote/QuoteModal";
import { CANONICAL_GALLERY, GalleryItem } from "@/data/projects-data";

export default function GalleryPageClient() {
  const [activeFilter, setActiveFilter] = useState<"all" | "sites" | "completed" | "materials">("all");
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);
  const [isQuoteOpen, setIsQuoteOpen] = useState(false);

  const filteredItems = activeFilter === "all"
    ? CANONICAL_GALLERY
    : CANONICAL_GALLERY.filter((item) => item.category === activeFilter);

  const activeItem = lightboxIdx !== null ? filteredItems[lightboxIdx] : null;

  return (
    <div className="min-h-screen bg-[#F7F4EE] text-slate-900 flex flex-col font-sans selection:bg-[#E50914]/20 selection:text-[#E50914]">
      {/* Navbar */}
      <NavbarExact onOpenQuote={() => setIsQuoteOpen(true)} />

      {/* Main Content */}
      <main className="flex-grow pt-28 sm:pt-32">
        {/* Header */}
        <section className="relative px-4 sm:px-6 lg:px-8 py-16 lg:py-20 max-w-[1440px] mx-auto">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-6 border-b border-[#E8DFD1]">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="h-[2px] w-8 bg-[#B88746] block" />
                <span className="text-xs font-mono font-bold uppercase tracking-[0.25em] text-[#B88746]">
                  ON-SITE DOCUMENTATION
                </span>
              </div>

              <h1 className="text-4xl sm:text-6xl font-black text-slate-950 tracking-tight font-sans">
                Authentic Construction Gallery
              </h1>

              <p className="mt-3 text-sm sm:text-base text-slate-600 max-w-2xl leading-relaxed">
                Zero stock images. Every photograph in this gallery represents verified Jancy Builders projects across Tirunelveli district, from structural slab casting to precision Porotherm brickwork.
              </p>
            </div>

            <a
              href="https://www.facebook.com/JancyBuilder/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#1877F2] text-white text-xs font-bold shadow-md hover:bg-[#166fe5] transition-all"
            >
              <span>Watch Live Videos on Facebook</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pt-6 scrollbar-none">
            {[
              { id: "all", label: "All Photos" },
              { id: "sites", label: "Active Work Sites" },
              { id: "materials", label: "Thermal Clay Bricks" },
              { id: "completed", label: "Completed Handovers" },
            ].map((tab) => {
              const isActive = activeFilter === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveFilter(tab.id as any);
                    setLightboxIdx(null);
                  }}
                  className={`px-4 py-2 rounded-full text-xs font-bold transition-all whitespace-nowrap ${
                    isActive
                      ? "bg-[#B88746] text-white shadow-md shadow-[#B88746]/25"
                      : "bg-white text-slate-700 hover:text-slate-950 border border-slate-200"
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </section>

        {/* Gallery Grid */}
        <section className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 pb-24">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredItems.map((item, idx) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05, duration: 0.4 }}
                onClick={() => setLightboxIdx(idx)}
                className="group relative rounded-3xl overflow-hidden bg-white border border-[#E8DFD1] shadow-xl shadow-black/5 cursor-pointer hover:border-[#B88746]/60 transition-all duration-300 flex flex-col justify-between"
              >
                <div className="relative aspect-[16/11] w-full overflow-hidden bg-slate-900">
                  <Image
                    src={item.image}
                    alt={item.caption}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                  {/* Location Pin */}
                  <div className="absolute top-3 left-3 pointer-events-none">
                    <span className="text-[10px] font-mono font-bold tracking-wider uppercase px-2.5 py-1 rounded-full bg-black/75 backdrop-blur-md border border-white/15 text-[#E8C59A] flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      <span>{item.location}</span>
                    </span>
                  </div>

                  {/* Maximize Icon */}
                  <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="w-8 h-8 rounded-full bg-white/90 text-slate-950 flex items-center justify-center shadow-lg">
                      <Maximize2 className="w-4 h-4" />
                    </div>
                  </div>

                  {/* Caption on Image */}
                  <div className="absolute bottom-0 inset-x-0 p-4">
                    <h3 className="text-sm font-bold text-white group-hover:text-[#E8C59A] transition-colors line-clamp-1 font-sans">
                      {item.projectName}
                    </h3>
                    <p className="text-xs text-slate-300 mt-0.5 line-clamp-2 leading-relaxed">
                      {item.caption}
                    </p>
                  </div>
                </div>

                <div className="p-4 bg-slate-50 flex items-center justify-between text-xs border-t border-slate-100">
                  <Link
                    href={`/projects/${item.projectId}`}
                    onClick={(e) => e.stopPropagation()}
                    className="text-[#B88746] font-bold hover:underline flex items-center gap-1"
                  >
                    <span>View Project Case Study</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>

                  <span className="text-[11px] font-mono text-slate-400">
                    Jancy Builders Site
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      </main>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {activeItem && lightboxIdx !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex flex-col items-center justify-between p-4 sm:p-8"
          >
            {/* Top Bar */}
            <div className="w-full max-w-6xl flex items-center justify-between text-white pb-4 border-b border-white/10">
              <div className="flex items-center gap-3">
                <span className="text-xs font-mono font-bold text-[#E8C59A]">
                  PHOTO {lightboxIdx + 1} OF {filteredItems.length}
                </span>
                <span className="text-xs text-slate-400">•</span>
                <span className="text-xs text-slate-300 font-medium">{activeItem.projectName}</span>
              </div>

              <button
                onClick={() => setLightboxIdx(null)}
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
                aria-label="Close Lightbox"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Main Image with Prev / Next */}
            <div className="relative w-full max-w-5xl my-auto flex items-center justify-center">
              <button
                onClick={() =>
                  setLightboxIdx((prev) => (prev !== null ? (prev - 1 + filteredItems.length) % filteredItems.length : 0))
                }
                className="absolute left-2 sm:-left-12 z-20 w-12 h-12 rounded-full bg-slate-900/80 hover:bg-slate-800 text-white flex items-center justify-center transition-all border border-white/20 shadow-xl"
                aria-label="Previous"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              <div className="relative w-full max-h-[70vh] aspect-[16/10] rounded-2xl overflow-hidden shadow-2xl border border-white/15 bg-black">
                <Image
                  src={activeItem.image}
                  alt={activeItem.caption}
                  fill
                  className="object-contain"
                  priority
                />
              </div>

              <button
                onClick={() =>
                  setLightboxIdx((prev) => (prev !== null ? (prev + 1) % filteredItems.length : 0))
                }
                className="absolute right-2 sm:-right-12 z-20 w-12 h-12 rounded-full bg-slate-900/80 hover:bg-slate-800 text-white flex items-center justify-center transition-all border border-white/20 shadow-xl"
                aria-label="Next"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>

            {/* Bottom Details */}
            <div className="w-full max-w-3xl text-center pt-4">
              <p className="text-sm sm:text-base font-semibold text-white">
                {activeItem.caption}
              </p>
              <p className="text-xs text-[#E8C59A] font-mono mt-1">
                Location: {activeItem.location}, Tirunelveli District • Supervised by Er. Sahaya Antony Stalin
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer & Floating WhatsApp */}
      <FooterExact />
      <FloatingWhatsApp />

      <QuoteModal isOpen={isQuoteOpen} onClose={() => setIsQuoteOpen(false)} />
    </div>
  );
}
