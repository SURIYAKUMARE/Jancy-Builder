"use client";

import React, { useState } from "react";
import Image from "next/image";
import { MessageSquare, PenTool, HardHat, Key, Star, ChevronLeft, ChevronRight } from "lucide-react";

export default function ProcessTestimonialsExact() {
  const steps = [
    {
      num: "01",
      name: "Discuss",
      desc: "Share your ideas and requirements.",
      icon: MessageSquare,
    },
    {
      num: "02",
      name: "Plan",
      desc: "We design the perfect solution.",
      icon: PenTool,
    },
    {
      num: "03",
      name: "Build",
      desc: "Our experts bring it to life.",
      icon: HardHat,
    },
    {
      num: "04",
      name: "Deliver",
      desc: "Your dream space, on time.",
      icon: Key,
    },
  ];

  const testimonials = [
    {
      id: 1,
      quote:
        "Jancy Builders turned our dream home into reality. Excellent quality, on-time delivery and Er. Stalin Antony personally ensured top structural standards!",
      author: "Arun Kumar",
      location: "Samugarengapuram, Tirunelveli",
      image: "/images/testimonials/arun-kumar.jpg",
      rating: 5,
    },
    {
      id: 2,
      quote:
        "The 12-stage construction transparency gave our family total peace of mind. From foundation to final handover, every milestone was executed with world-class engineering.",
      author: "Dr. Selvakumar M.",
      location: "Tirunelveli Town",
      image: "/images/testimonials/arun-kumar.jpg",
      rating: 5,
    },
  ];

  const [activeTestimonialIdx, setActiveTestimonialIdx] = useState(0);
  const currentTestimonial = testimonials[activeTestimonialIdx];

  const handlePrevTestimonial = () => {
    setActiveTestimonialIdx((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const handleNextTestimonial = () => {
    setActiveTestimonialIdx((prev) => (prev + 1) % testimonials.length);
  };

  return (
    <section id="process" className="w-full bg-[#FAFAFA] py-14 lg:py-20 border-t border-b border-gray-100">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Row with How It Works on Left, Testimonials on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* ========================================================= */}
          {/* LEFT: HOW IT WORKS (7 cols)                               */}
          {/* ========================================================= */}
          <div className="lg:col-span-7 flex flex-col justify-between">
            <div>
              <span className="text-[11px] font-bold tracking-[0.2em] text-[#DC2626] uppercase block mb-1">
                HOW IT WORKS
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                From Idea to Reality
              </h2>
            </div>

            {/* 4 Steps Row */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8">
              {steps.map((step) => {
                const Icon = step.icon;
                return (
                  <div key={step.num} className="flex flex-col space-y-2">
                    {/* Red Icon Badge */}
                    <div className="w-10 h-10 rounded-xl bg-red-50 border border-red-100 flex items-center justify-center text-[#DC2626]">
                      <Icon className="w-5 h-5 stroke-[2]" />
                    </div>

                    {/* Step Title */}
                    <div className="pt-1">
                      <span className="text-xs font-bold text-slate-900 block">
                        {step.num} {step.name}
                      </span>
                      <p className="text-[11px] text-slate-500 mt-1 leading-normal">
                        {step.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* ========================================================= */}
          {/* RIGHT: TESTIMONIALS (5 cols)                              */}
          {/* ========================================================= */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[11px] font-bold tracking-[0.2em] text-[#DC2626] uppercase block mb-1">
                  TESTIMONIALS
                </span>
                <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                  What Our Clients Say
                </h2>
              </div>

              {/* Prev / Next controls */}
              <div className="flex items-center gap-1.5">
                <button
                  onClick={handlePrevTestimonial}
                  className="w-7 h-7 rounded-full bg-white border border-gray-200 hover:border-red-600 text-slate-600 hover:text-[#DC2626] flex items-center justify-center transition-colors"
                  aria-label="Previous testimonial"
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={handleNextTestimonial}
                  className="w-7 h-7 rounded-full bg-white border border-gray-200 hover:border-red-600 text-slate-600 hover:text-[#DC2626] flex items-center justify-center transition-colors"
                  aria-label="Next testimonial"
                >
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Testimonial Card */}
            <div className="mt-6 bg-white rounded-2xl p-5 sm:p-6 border border-gray-100 shadow-sm flex flex-col justify-between">
              {/* Quote */}
              <p className="text-xs sm:text-[13px] text-slate-700 italic leading-relaxed">
                &ldquo;{currentTestimonial.quote}&rdquo;
              </p>

              {/* Client Info Row */}
              <div className="flex items-center gap-3 mt-4 pt-4 border-t border-gray-50">
                <div className="relative w-11 h-11 rounded-full overflow-hidden flex-shrink-0 bg-slate-100 border border-gray-200">
                  <Image
                    src={currentTestimonial.image}
                    alt={currentTestimonial.author}
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="flex flex-col">
                  {/* 5 Red Stars */}
                  <div className="flex items-center gap-0.5 text-[#DC2626] mb-0.5">
                    {[...Array(currentTestimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-3 h-3 fill-current" />
                    ))}
                  </div>

                  <span className="text-xs font-bold text-slate-900 leading-tight">
                    {currentTestimonial.author}
                  </span>
                  <span className="text-[10px] text-slate-500 leading-tight">
                    {currentTestimonial.location}
                  </span>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
