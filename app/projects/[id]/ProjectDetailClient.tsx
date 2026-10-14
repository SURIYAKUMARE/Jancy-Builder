"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";
import {
  MapPin,
  Sparkles,
  ArrowRight,
  ExternalLink,
  MessageCircle,
  Shield,
  Layers,
  ChevronRight,
  CheckCircle2,
  Calendar,
  Building,
  X,
  Maximize2,
  Box,
} from "lucide-react";
import NavbarExact from "@/components/exact/NavbarExact";
import FooterExact from "@/components/exact/FooterExact";
import FloatingWhatsApp from "@/components/common/FloatingWhatsApp";
import QuoteModal from "@/components/quote/QuoteModal";
import Hero3DFallback from "@/components/three/Hero3DFallback";
import { Project } from "@/data/projects-data";

const ArchitecturalHeroCanvas = dynamic(
  () => import("@/components/three/ArchitecturalHeroCanvas"),
  { ssr: false, loading: () => <Hero3DFallback /> }
);

interface ProjectDetailClientProps {
  project: Project;
  relatedProjects: Project[];
}

export default function ProjectDetailClient({ project, relatedProjects }: ProjectDetailClientProps) {
  const [activeImage, setActiveImage] = useState<string>(project.coverImage);
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);
  const [isQuoteOpen, setIsQuoteOpen] = useState(false);
  const [mediaMode, setMediaMode] = useState<"photo" | "3d">("photo");

  const whatsappMessage = encodeURIComponent(
    `Hello Er. Sahaya Antony Stalin, I am viewing the project "${project.name}" (${project.location}, ${project.builtUpArea}) on Jancy Builders. Please share detailed floor plans, structural details, and estimated cost for a similar construction.`
  );
  const whatsappUrl = `https://wa.me/917708247124?text=${whatsappMessage}`;

  return (
    <div className="min-h-screen bg-[#F7F4EE] text-slate-900 flex flex-col font-sans selection:bg-[#E50914]/20 selection:text-[#E50914]">
      {/* Navbar */}
      <NavbarExact onOpenQuote={() => setIsQuoteOpen(true)} />

      {/* Main Content */}
      <main className="flex-grow pt-28 sm:pt-32">
        {/* Breadcrumbs */}
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex items-center gap-2 text-xs text-slate-500 font-mono">
            <Link href="/" className="hover:text-slate-900 transition-colors">Home</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <Link href="/projects" className="hover:text-slate-900 transition-colors">Projects</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-slate-950 font-bold truncate max-w-[200px] sm:max-w-none">{project.name}</span>
          </nav>
        </div>

        {/* Project Header & Hero Image */}
        <section className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 pb-12">
          <div className="bg-white rounded-3xl border border-[#E8DFD1] p-6 sm:p-10 shadow-2xl shadow-black/5">
            
            {/* Title & Metadata Strip */}
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-8 border-b border-slate-100">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-[#B88746] text-white">
                    {project.category}
                  </span>
                  {project.isLiveWorkSite ? (
                    <span className="text-[10px] font-mono font-bold px-2.5 py-1 rounded-full flex items-center gap-1.5 bg-amber-500 text-slate-950 shadow-sm">
                      <span className="w-2 h-2 rounded-full bg-red-600 animate-ping" />
                      <span>LIVE WORK SITE</span>
                    </span>
                  ) : (
                    <span className="text-[10px] font-mono font-bold px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800">
                      {project.status}
                    </span>
                  )}
                </div>

                <h1 className="text-3xl sm:text-5xl font-black text-slate-950 tracking-tight font-sans">
                  {project.name}
                </h1>

                <div className="flex items-center gap-1.5 text-xs text-[#B88746] font-medium mt-2">
                  <MapPin className="w-4 h-4 flex-shrink-0" />
                  <span>{project.location} • Supervised by Er. Sahaya Antony Stalin</span>
                </div>
              </div>

              {/* Direct Actions */}
              <div className="flex items-center gap-3 flex-wrap">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#20ba5a] text-white px-6 py-3 rounded-full font-bold text-xs uppercase tracking-wider shadow-md transition-all hover:scale-105"
                >
                  <MessageCircle className="w-4 h-4 fill-current" />
                  <span>Enquire on WhatsApp</span>
                </a>

                {project.fbPostUrl && (
                  <a
                    href={project.fbPostUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-[#1877F2] hover:bg-[#166fe5] text-white px-5 py-3 rounded-full font-bold text-xs uppercase tracking-wider shadow-md transition-all"
                  >
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                    <span>Facebook Post / Video</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}

                <button
                  onClick={() => setIsQuoteOpen(true)}
                  className="inline-flex items-center gap-2 bg-[#E50914] hover:bg-[#DC2626] text-white px-6 py-3 rounded-full font-bold text-xs uppercase tracking-wider shadow-md transition-all"
                >
                  <span>Request Similar Quote</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* View Mode Switcher: Real Site Photo vs 3D Structural Simulation */}
            <div className="mt-8 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="inline-flex items-center gap-1.5 p-1 bg-slate-100 rounded-full border border-slate-200 self-start">
                <button
                  type="button"
                  onClick={() => setMediaMode("photo")}
                  className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
                    mediaMode === "photo"
                      ? "bg-slate-950 text-white shadow-sm"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  <span>Authentic Site Photo</span>
                </button>
                <button
                  type="button"
                  onClick={() => setMediaMode("3d")}
                  className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
                    mediaMode === "3d"
                      ? "bg-[#B88746] text-slate-950 shadow-sm"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  <Box className="w-3.5 h-3.5" />
                  <span>3D Structural View</span>
                </button>
              </div>

              {mediaMode === "3d" ? (
                <div className="text-[11px] font-mono text-[#B88746] bg-[#B88746]/10 px-3 py-1 rounded-full border border-[#B88746]/30 self-start sm:self-auto">
                  Architectural 3D Model • Rotate 360° to inspect structure
                </div>
              ) : (
                <div className="text-[11px] font-mono text-slate-500 self-start sm:self-auto">
                  * Genuine unedited construction photo from Jancy Builders archive
                </div>
              )}
            </div>

            {/* Main Interactive High-Res Photo View OR 3D Architectural Canvas */}
            <div className="mt-4 relative aspect-[16/9] min-h-[360px] w-full rounded-2xl overflow-hidden bg-slate-950 shadow-2xl group">
              {mediaMode === "3d" ? (
                <div className="w-full h-full relative">
                  <ArchitecturalHeroCanvas />
                </div>
              ) : (
                <>
                  <Image
                    src={activeImage}
                    alt={project.name}
                    fill
                    priority
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />

                  {/* Fullscreen Button */}
                  <button
                    onClick={() => setLightboxImage(activeImage)}
                    className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/60 hover:bg-black/90 text-white flex items-center justify-center transition-all backdrop-blur-md"
                    title="View Fullscreen"
                  >
                    <Maximize2 className="w-4 h-4" />
                  </button>

                  {project.workStage && (
                    <div className="absolute bottom-4 left-4 pointer-events-none">
                      <span className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-black/80 backdrop-blur-md border border-white/20 text-[#E8C59A] inline-flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-[#E8C59A]" />
                        <span>Current Stage: {project.workStage}</span>
                      </span>
                    </div>
                  )}
                </>
              )}
            </div>

            {/* Gallery Thumbnails */}
            {project.gallery && project.gallery.length > 0 && (
              <div className="mt-4">
                <span className="text-xs font-mono uppercase tracking-wider text-slate-500 font-bold block mb-2">
                  Project Work Site Photos ({project.gallery.length})
                </span>
                <div className="grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-8 gap-3">
                  {project.gallery.map((imgUrl, i) => {
                    const isSelected = activeImage === imgUrl;
                    return (
                      <button
                        key={i}
                        onClick={() => setActiveImage(imgUrl)}
                        className={`relative aspect-[4/3] rounded-xl overflow-hidden border-2 transition-all ${
                          isSelected
                            ? "border-[#B88746] scale-105 shadow-md shadow-[#B88746]/30"
                            : "border-slate-200 opacity-70 hover:opacity-100"
                        }`}
                      >
                        <Image
                          src={imgUrl}
                          alt={`${project.name} photo ${i + 1}`}
                          fill
                          className="object-cover"
                        />
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* 4 Technical Metric Badges */}
            <div className="mt-8 grid grid-cols-2 lg:grid-cols-4 gap-4 p-5 bg-slate-50 rounded-2xl border border-slate-200 text-xs">
              <div>
                <span className="text-[10px] text-slate-500 font-mono block">BUILT-UP AREA</span>
                <span className="text-sm font-bold text-slate-900">{project.builtUpArea}</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-500 font-mono block">CONFIGURATION</span>
                <span className="text-sm font-bold text-slate-900">{project.configuration}</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-500 font-mono block">TIMELINE</span>
                <span className="text-sm font-bold text-slate-900">{project.timeline}</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-500 font-mono block">STATUS</span>
                <span className="text-sm font-bold text-emerald-700">{project.status}</span>
              </div>
            </div>

            {/* Project Overview & Engineering Details */}
            <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
              <div className="lg:col-span-7 space-y-6">
                <div>
                  <h3 className="text-xs font-mono uppercase tracking-wider text-[#B88746] font-bold mb-2">
                    Project Narrative
                  </h3>
                  <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                    {project.description}
                  </p>
                </div>

                {project.clientStory && (
                  <div className="bg-[#F7F4EE] p-5 rounded-2xl border border-[#E8DFD1]">
                    <h4 className="text-xs font-mono uppercase tracking-wider text-slate-900 font-bold mb-1.5">
                      Client &amp; Site Context
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-700 leading-relaxed italic">
                      &ldquo;{project.clientStory}&rdquo;
                    </p>
                  </div>
                )}

                <div>
                  <h3 className="text-xs font-mono uppercase tracking-wider text-[#B88746] font-bold mb-3">
                    Architectural &amp; Material Features
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {project.features.map((feature, i) => (
                      <div key={i} className="flex items-start gap-2 bg-slate-50 p-3 rounded-xl border border-slate-100 text-xs text-slate-800">
                        <CheckCircle2 className="w-4 h-4 text-[#B88746] flex-shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Engineering Rigor Card */}
              <div className="lg:col-span-5 bg-slate-900 text-white p-6 sm:p-8 rounded-3xl border border-white/10 space-y-4 shadow-xl">
                <div className="flex items-center gap-2 text-sm font-bold text-[#E8C59A]">
                  <Shield className="w-5 h-5 text-[#B88746]" />
                  <span>Civil Engineering Guarantee</span>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed">
                  {project.engineering}
                </p>

                <div className="pt-3 border-t border-white/10 text-xs text-slate-400 font-mono space-y-1">
                  <p>Certified Supervising Engineer:</p>
                  <p className="text-white font-bold text-sm">Er. Sahaya Antony Stalin</p>
                  <p className="text-[#B88746]">B.E. Civil Engineering • Jancy Builders</p>
                </div>

                <div className="pt-2">
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20ba5a] text-white py-3 rounded-full text-xs font-bold uppercase tracking-wider shadow-md transition-all"
                  >
                    <MessageCircle className="w-4 h-4 fill-current" />
                    <span>Consult on WhatsApp</span>
                  </a>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* Related Projects Section */}
        {relatedProjects.length > 0 && (
          <section className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-16 border-t border-[#E8DFD1]">
            <div className="flex items-center justify-between mb-8">
              <div>
                <span className="text-xs font-mono uppercase tracking-wider text-[#B88746] font-bold block">
                  EXPLORE MORE
                </span>
                <h3 className="text-2xl sm:text-3xl font-black text-slate-950 font-sans">
                  Related Projects
                </h3>
              </div>
              <Link
                href="/projects"
                className="text-xs font-bold text-slate-900 hover:text-[#B88746] transition-colors flex items-center gap-1"
              >
                <span>View All Projects</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedProjects.map((rel) => (
                <Link
                  key={rel.id}
                  href={`/projects/${rel.id}`}
                  className="bg-white rounded-3xl border border-[#E8DFD1] overflow-hidden shadow-xl shadow-black/5 group hover:border-[#B88746] transition-all"
                >
                  <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-900">
                    <Image
                      src={rel.coverImage}
                      alt={rel.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-5">
                    <div className="flex items-center gap-1 text-[11px] text-[#B88746] font-medium mb-1">
                      <MapPin className="w-3 h-3" />
                      <span>{rel.location}</span>
                    </div>
                    <h4 className="text-base font-bold text-slate-950 group-hover:text-[#B88746] transition-colors line-clamp-1">
                      {rel.name}
                    </h4>
                    <p className="text-xs text-slate-500 mt-1 line-clamp-1">
                      {rel.builtUpArea} • {rel.configuration}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </main>

      {/* Lightbox Modal */}
      {lightboxImage && (
        <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4">
          <button
            onClick={() => setLightboxImage(null)}
            className="absolute top-5 right-5 w-10 h-10 rounded-full bg-white/20 text-white flex items-center justify-center hover:bg-white/30 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
          <div className="relative max-w-5xl w-full aspect-[16/10] rounded-2xl overflow-hidden shadow-2xl">
            <Image
              src={lightboxImage}
              alt="Project View"
              fill
              className="object-contain"
            />
          </div>
        </div>
      )}

      {/* Footer & Floating WhatsApp */}
      <FooterExact />
      <FloatingWhatsApp />

      <QuoteModal isOpen={isQuoteOpen} onClose={() => setIsQuoteOpen(false)} />
    </div>
  );
}
