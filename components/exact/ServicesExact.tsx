"use client";

import React from "react";
import Image from "next/image";
import { ArrowRight, Home, Building2, Hammer, Compass, ChevronRight } from "lucide-react";

interface ServicesExactProps {
  onOpenQuote: () => void;
}

export default function ServicesExact({ onOpenQuote }: ServicesExactProps) {
  const services = [
    {
      id: "residential",
      title: "Residential Construction",
      subtitle: "Your dream home with premium quality.",
      icon: Home,
      image: "/images/services/residential.jpg",
    },
    {
      id: "commercial",
      title: "Commercial Construction",
      subtitle: "Modern spaces for business growth.",
      icon: Building2,
      image: "/images/services/commercial.jpg",
    },
    {
      id: "renovation",
      title: "Renovation & Remodeling",
      subtitle: "Upgrade your space with expert solutions.",
      icon: Hammer,
      image: "/images/services/renovation.jpg",
    },
    {
      id: "architectural",
      title: "Architectural Design",
      subtitle: "Innovative designs for a better tomorrow.",
      icon: Compass,
      image: "/images/services/architectural.jpg",
    },
  ];

  return (
    <section id="services" className="w-full bg-white pb-14 lg:pb-20 border-b border-gray-100">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Services Grid: Left Header Card + 4 Service Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 items-stretch pt-4">
          
          {/* Header Block / Column 1 */}
          <div className="lg:col-span-1 flex flex-col justify-between py-2 pr-2">
            <div>
              <span className="text-[11px] font-bold tracking-[0.2em] text-[#DC2626] uppercase block mb-2">
                OUR SERVICES
              </span>
              <h2 className="text-3xl font-black text-slate-900 tracking-tight leading-tight">
                Building Solutions<br />
                For <span className="text-[#DC2626]">Every Need</span>
              </h2>
              <p className="text-xs text-slate-500 mt-3 leading-relaxed">
                From homes to commercial spaces, we provide end-to-end construction and design services with quality and innovation.
              </p>
            </div>

            <div className="pt-6">
              <button
                onClick={onOpenQuote}
                className="group inline-flex items-center gap-1.5 text-xs font-bold text-slate-900 hover:text-[#DC2626] transition-colors"
              >
                <span>View All Services</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1" />
              </button>
            </div>
          </div>

          {/* 4 Service Cards */}
          {services.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.id}
                onClick={onOpenQuote}
                className="group cursor-pointer bg-white rounded-2xl border border-gray-100 p-5 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
              >
                {/* Top: Icon + Title + Subtitle */}
                <div>
                  <div className="w-9 h-9 rounded-lg flex items-center justify-center text-[#DC2626] mb-3">
                    <Icon className="w-6 h-6 stroke-[1.75]" />
                  </div>
                  <h3 className="text-sm font-bold text-slate-900 group-hover:text-[#DC2626] transition-colors leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-[11px] text-slate-500 mt-1 leading-normal">
                    {item.subtitle}
                  </p>
                </div>

                {/* Bottom: Image thumbnail with subtle arrow button */}
                <div className="mt-5 relative w-full h-32 rounded-xl overflow-hidden bg-slate-100">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute bottom-2.5 right-2.5 w-6 h-6 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center text-slate-800 shadow-sm group-hover:bg-[#DC2626] group-hover:text-white transition-colors">
                    <ChevronRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>
            );
          })}

        </div>

      </div>
    </section>
  );
}
