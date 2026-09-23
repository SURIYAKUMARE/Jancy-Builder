"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ArrowRight, ChevronLeft, ChevronRight, MapPin, Plus } from "lucide-react";

interface ProjectsExactProps {
  onOpenQuote: () => void;
}

export default function ProjectsExact({ onOpenQuote }: ProjectsExactProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const projects = [
    {
      id: "luxury-villa",
      title: "Luxury Villa",
      location: "Samugarengapuram, Tirunelveli",
      image: "/images/projects/luxury-villa.jpg",
      area: "6,500 sq.ft",
      type: "Custom Residential",
    },
    {
      id: "apartment-complex",
      title: "Apartment Complex",
      location: "Tirunelveli Town",
      image: "/images/projects/apartment-complex.jpg",
      area: "35,000 sq.ft",
      type: "Multi-Unit Living",
    },
    {
      id: "office-building",
      title: "Office Building",
      location: "Chennai / Bangalore",
      image: "/images/projects/office-building.jpg",
      area: "48,000 sq.ft",
      type: "Corporate Headquarters",
    },
    {
      id: "modern-home",
      title: "Modern Residence",
      location: "Vallioor, Tirunelveli",
      image: "/images/projects/modern-home.jpg",
      area: "4,200 sq.ft",
      type: "Contemporary Residence",
    },
  ];

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + projects.length) % projects.length);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % projects.length);
  };

  return (
    <section id="projects" className="w-full bg-white py-10 sm:py-14">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* The Signature Dark Projects Container Card from Mockup */}
        <div className="bg-[#111827] text-white rounded-3xl p-6 sm:p-8 lg:p-10 shadow-2xl relative border border-slate-800">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Info Column (3.5 cols) */}
            <div className="lg:col-span-3 flex flex-col justify-between space-y-4">
              <div>
                <span className="text-[11px] font-bold tracking-[0.2em] text-[#DC2626] uppercase block mb-2">
                  OUR PROJECTS
                </span>
                <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight leading-tight">
                  Featured<br />
                  Projects
                </h2>
                <p className="text-xs text-slate-400 mt-3 leading-relaxed max-w-xs">
                  Explore some of our recent work that reflects our commitment to quality and excellence.
                </p>
              </div>

              <div>
                <button
                  onClick={onOpenQuote}
                  className="inline-flex items-center gap-2 bg-[#DC2626] hover:bg-[#B91C1C] text-white text-xs font-semibold px-4 py-2.5 rounded-full transition-all duration-200 shadow-md shadow-red-600/30 active:scale-95"
                >
                  <span>View All Projects</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Right Carousel Area (9 cols) */}
            <div className="lg:col-span-9 relative">
              {/* Carousel Top Header: Prev / Next Buttons */}
              <div className="flex items-center justify-end gap-2 mb-4">
                <button
                  onClick={handlePrev}
                  className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white flex items-center justify-center transition-colors"
                  aria-label="Previous Project"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={handleNext}
                  className="w-8 h-8 rounded-full bg-[#DC2626] hover:bg-[#B91C1C] text-white flex items-center justify-center transition-colors"
                  aria-label="Next Project"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              {/* 4 Projects Grid / Horizontal View */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {projects.map((proj, idx) => (
                  <div
                    key={proj.id}
                    onClick={onOpenQuote}
                    className="group cursor-pointer bg-slate-900/90 rounded-2xl overflow-hidden border border-slate-800 hover:border-slate-700 transition-all duration-300 flex flex-col"
                  >
                    {/* Project Photo */}
                    <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-800">
                      <Image
                        src={proj.image}
                        alt={proj.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none" />
                      
                      {/* Plus Action Button on bottom right of photo */}
                      <div className="absolute bottom-2.5 right-2.5 w-7 h-7 rounded-full bg-white/20 backdrop-blur-md group-hover:bg-[#DC2626] group-hover:text-white text-white flex items-center justify-center transition-colors">
                        <Plus className="w-4 h-4" />
                      </div>
                    </div>

                    {/* Project Caption */}
                    <div className="p-3.5 flex flex-col justify-between flex-grow">
                      <div>
                        <h3 className="text-sm font-bold text-white group-hover:text-red-400 transition-colors">
                          {proj.title}
                        </h3>
                        <div className="flex items-center gap-1 text-[11px] text-slate-400 mt-1">
                          <MapPin className="w-3 h-3 text-[#DC2626]" />
                          <span>{proj.location}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
