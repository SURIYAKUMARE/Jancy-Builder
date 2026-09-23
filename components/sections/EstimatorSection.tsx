"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  Zap,
  FileText,
  ShieldCheck,
  Check,
  ArrowRight,
  Phone,
  MessageCircle,
  Building2,
  Crown,
  Gem,
  ClipboardCheck,
  Cog,
  Armchair,
  Trees,
  Play,
  Quote,
} from "lucide-react";
import { motion } from "framer-motion";

interface EstimatorSectionProps {
  onOpenQuote: () => void;
}

export default function EstimatorSection({ onOpenQuote }: EstimatorSectionProps) {
  const [activeStep, setActiveStep] = useState(1);
  const [typology, setTypology] = useState<"villa" | "house" | "commercial">("villa");
  const [areaSqFt, setAreaSqFt] = useState<number>(4500);
  const [packageType, setPackageType] = useState<"classic" | "premium" | "ultra">("ultra");

  // Rates per sq.ft
  const rates = {
    classic: 2400,
    premium: 3200,
    ultra: 4400,
  };

  // Typologies data
  const typologies = [
    {
      id: "villa" as const,
      name: "Luxury Villa",
      image: "/images/projects/luxury-villa.jpg",
    },
    {
      id: "house" as const,
      name: "Independent House",
      image: "/images/projects/modern-home.jpg",
    },
    {
      id: "commercial" as const,
      name: "Commercial Landmark",
      image: "/images/projects/office-building.jpg",
    },
  ];

  // Packages data
  const packages = [
    {
      id: "classic" as const,
      name: "Classic",
      rate: "₹2,400/sq.ft",
      icon: Building2,
    },
    {
      id: "premium" as const,
      name: "Premium",
      rate: "₹3,200/sq.ft",
      icon: Crown,
    },
    {
      id: "ultra" as const,
      name: "Ultra Craft",
      rate: "₹4,400/sq.ft",
      icon: Gem,
    },
  ];

  // Dynamic calculations
  const totalCost = areaSqFt * rates[packageType];
  const costInCrores = (totalCost / 10000000).toFixed(2);
  const costInLakhs = Math.round(totalCost / 100000);

  // Category distributions
  const civilLakhs = Math.round((totalCost * 0.45) / 100000);
  const mepLakhs = Math.round((totalCost * 0.20) / 100000);
  const interiorLakhs = Math.round((totalCost * 0.25) / 100000);
  const facadeLakhs = Math.round((totalCost * 0.10) / 100000);

  return (
    <section id="estimator" className="relative py-20 lg:py-28 bg-[#FAF8F5] overflow-hidden">
      {/* Subtle background ambient blur */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-[#C29061]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16 relative z-10">
        
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-12">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-[0.25em] text-slate-400 mb-2">
              <span>BUILD YOUR WORLD</span>
            </div>
            <div className="text-xs font-mono font-bold uppercase tracking-[0.2em] text-[#C29061] mb-2">
              PLAN. SMART. BUILD BETTER.
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-slate-950 tracking-tight font-sans">
              Interactive Turnkey<br />
              <span className="text-[#C29061]">Cost Estimator</span>
            </h2>
            <p className="mt-3 text-slate-600 text-sm sm:text-base max-w-xl leading-relaxed">
              Configure your dream architectural space and get an instant turnkey budget with a detailed category breakdown.
            </p>

            {/* 3 Value Badges */}
            <div className="flex items-center flex-wrap gap-4 sm:gap-6 mt-6">
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-700 bg-white/80 border border-slate-200/80 px-3.5 py-1.5 rounded-full shadow-sm">
                <Zap className="w-3.5 h-3.5 text-[#C29061] fill-[#C29061]" />
                <span>Instant Estimation</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-700 bg-white/80 border border-slate-200/80 px-3.5 py-1.5 rounded-full shadow-sm">
                <FileText className="w-3.5 h-3.5 text-[#C29061]" />
                <span>Transparent Breakdown</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-700 bg-white/80 border border-slate-200/80 px-3.5 py-1.5 rounded-full shadow-sm">
                <ShieldCheck className="w-3.5 h-3.5 text-[#C29061]" />
                <span>Reliable &amp; Accurate</span>
              </div>
            </div>
          </div>

          {/* Right Top Accents: Cursive Text & Floating Dark Card */}
          <div className="flex flex-col sm:flex-row lg:flex-col items-start lg:items-end gap-5">
            <div className="font-['Caveat',cursive] text-3xl sm:text-4xl text-slate-700 font-bold -rotate-3 select-none">
              Your Vision Our Expertise
            </div>

            <div className="bg-[#0F172A] text-white rounded-2xl p-3.5 shadow-2xl border border-white/10 flex items-center gap-3.5 max-w-xs">
              <div className="relative w-12 h-12 rounded-xl overflow-hidden flex-shrink-0 bg-slate-800">
                <Image
                  src="/images/projects/luxury-villa.jpg"
                  alt="Turn Your Dream Into a Reality"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-xs font-bold text-white truncate">
                  Turn Your Dream Into a Reality
                </h4>
                <p className="text-[10px] text-slate-400 mt-0.5 line-clamp-1">
                  Quality Construction. Transparent Pricing.
                </p>
              </div>
              <button
                onClick={onOpenQuote}
                className="w-8 h-8 rounded-full bg-[#C29061] text-slate-950 flex items-center justify-center hover:bg-[#d8a573] transition-colors flex-shrink-0 shadow-md"
                title="Play Video"
              >
                <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Main White Estimator Card */}
        <div className="bg-white rounded-3xl shadow-2xl border border-slate-200/80 p-6 sm:p-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
            
            {/* Left 3-Step Indicator (2 Cols) */}
            <div className="lg:col-span-2 hidden lg:flex flex-col justify-between border-r border-slate-100 pr-4">
              <div className="space-y-8">
                {/* Step 1 */}
                <div
                  onClick={() => setActiveStep(1)}
                  className="flex items-start gap-3 cursor-pointer group"
                >
                  <div className="w-8 h-8 rounded-full bg-[#C29061] text-white font-bold text-xs flex items-center justify-center flex-shrink-0 shadow-md">
                    1
                  </div>
                  <div>
                    <h5 className="text-xs font-bold text-slate-900 leading-tight">Configure</h5>
                    <p className="text-[10px] text-slate-400 mt-0.5 leading-tight">Your Requirements</p>
                  </div>
                </div>

                {/* Vertical Divider */}
                <div className="w-[2px] h-6 bg-slate-200 ml-4 -mt-6 -mb-6" />

                {/* Step 2 */}
                <div
                  onClick={() => setActiveStep(2)}
                  className="flex items-start gap-3 cursor-pointer group"
                >
                  <div className="w-8 h-8 rounded-full bg-slate-100 text-slate-500 font-bold text-xs flex items-center justify-center flex-shrink-0 border border-slate-200">
                    2
                  </div>
                  <div>
                    <h5 className="text-xs font-bold text-slate-700 leading-tight">Customize</h5>
                    <p className="text-[10px] text-slate-400 mt-0.5 leading-tight">Specifications</p>
                  </div>
                </div>

                {/* Vertical Divider */}
                <div className="w-[2px] h-6 bg-slate-200 ml-4 -mt-6 -mb-6" />

                {/* Step 3 */}
                <div
                  onClick={() => setActiveStep(3)}
                  className="flex items-start gap-3 cursor-pointer group"
                >
                  <div className="w-8 h-8 rounded-full bg-slate-100 text-slate-500 font-bold text-xs flex items-center justify-center flex-shrink-0 border border-slate-200">
                    3
                  </div>
                  <div>
                    <h5 className="text-xs font-bold text-slate-700 leading-tight">Get Estimate</h5>
                    <p className="text-[10px] text-slate-400 mt-0.5 leading-tight">Detailed Breakdown</p>
                  </div>
                </div>
              </div>

              {/* Bottom Quote inside sidebar */}
              <div className="pt-8 select-none">
                <Quote className="w-5 h-5 text-[#C29061]/50 mb-1" />
                <span className="font-['Caveat',cursive] text-lg text-slate-600 block leading-tight">
                  &ldquo;Better Spaces,<br />
                  &nbsp;&nbsp;Brighter Tomorrows&rdquo;
                </span>
              </div>
            </div>

            {/* Center Interactive Controls (6 Cols) */}
            <div className="lg:col-span-6 space-y-7">
              
              {/* 1. Choose Architectural Typology */}
              <div>
                <label className="block text-xs font-bold text-slate-900 mb-3">
                  1. Choose Architectural Typology
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {typologies.map((t) => {
                    const isSelected = typology === t.id;
                    return (
                      <div
                        key={t.id}
                        onClick={() => setTypology(t.id)}
                        className={`relative rounded-2xl overflow-hidden cursor-pointer border-2 transition-all group ${
                          isSelected
                            ? "border-[#C29061] shadow-lg shadow-[#C29061]/15"
                            : "border-slate-200/80 hover:border-slate-300 opacity-90 hover:opacity-100"
                        }`}
                      >
                        <div className="relative h-24 w-full bg-slate-100">
                          <Image
                            src={t.image}
                            alt={t.name}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                          {isSelected && (
                            <div className="absolute top-2 right-2 w-5 h-5 rounded-full bg-[#C29061] text-white flex items-center justify-center shadow-md">
                              <Check className="w-3 h-3 stroke-[3]" />
                            </div>
                          )}
                        </div>
                        <div className="p-2.5 bg-white flex items-center justify-between">
                          <span className="text-xs font-bold text-slate-900 truncate">
                            {t.name}
                          </span>
                          {isSelected && (
                            <div className="w-4 h-4 rounded-full bg-[#C29061] text-white flex items-center justify-center flex-shrink-0">
                              <Check className="w-2.5 h-2.5 stroke-[3]" />
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* 2. Built-up Area (Sq.Ft) */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-bold text-slate-900">
                    2. Built-up Area (Sq.Ft)
                  </label>
                  <div className="bg-[#FAF8F5] border border-slate-300 px-3 py-1 rounded-lg text-xs font-mono font-bold text-slate-900">
                    {areaSqFt.toLocaleString()} sq.ft
                  </div>
                </div>

                <div className="relative py-2">
                  <input
                    type="range"
                    min="1000"
                    max="12000"
                    step="250"
                    value={areaSqFt}
                    onChange={(e) => setAreaSqFt(Number(e.target.value))}
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#C29061]"
                  />
                  <div className="flex justify-between text-[11px] font-medium text-slate-400 mt-1.5">
                    <span>1,000 sq.ft</span>
                    <span>6,000 sq.ft</span>
                    <span>12,000 sq.ft</span>
                  </div>
                </div>
              </div>

              {/* 3. Specification Package */}
              <div>
                <label className="block text-xs font-bold text-slate-900 mb-3">
                  3. Specification Package
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {packages.map((pkg) => {
                    const isSelected = packageType === pkg.id;
                    const Icon = pkg.icon;
                    return (
                      <div
                        key={pkg.id}
                        onClick={() => setPackageType(pkg.id)}
                        className={`p-3.5 rounded-2xl border-2 cursor-pointer transition-all flex items-center justify-between ${
                          isSelected
                            ? "border-[#C29061] bg-[#FAF8F5] shadow-sm"
                            : "border-slate-200/80 bg-white hover:border-slate-300"
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <div
                            className={`w-8 h-8 rounded-xl flex items-center justify-center ${
                              isSelected
                                ? "bg-[#C29061] text-white"
                                : "bg-slate-100 text-slate-600"
                            }`}
                          >
                            <Icon className="w-4 h-4" />
                          </div>
                          <div>
                            <h6 className="text-xs font-bold text-slate-900">{pkg.name}</h6>
                            <p className="text-[11px] text-slate-500 font-medium">{pkg.rate}</p>
                          </div>
                        </div>
                        {isSelected && (
                          <div className="w-4 h-4 rounded-full bg-[#C29061] text-white flex items-center justify-center flex-shrink-0">
                            <Check className="w-2.5 h-2.5 stroke-[3]" />
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Category Cost Distribution (Estimated) */}
              <div>
                <label className="block text-xs font-bold text-slate-900 mb-2.5">
                  Category Cost Distribution (Estimated)
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {/* Category 1 */}
                  <div className="bg-[#FAF8F5] border border-slate-200/80 rounded-xl p-2.5 text-center">
                    <ClipboardCheck className="w-4 h-4 text-[#C29061] mx-auto mb-1" />
                    <div className="text-[10px] text-slate-500 font-medium">Civil &amp; Skeleton</div>
                    <div className="text-xs font-bold text-slate-900 mt-0.5">
                      ₹{civilLakhs}L <span className="text-[10px] text-slate-400 font-normal">(45%)</span>
                    </div>
                  </div>

                  {/* Category 2 */}
                  <div className="bg-[#FAF8F5] border border-slate-200/80 rounded-xl p-2.5 text-center">
                    <Cog className="w-4 h-4 text-[#C29061] mx-auto mb-1" />
                    <div className="text-[10px] text-slate-500 font-medium">MEP Services</div>
                    <div className="text-xs font-bold text-slate-900 mt-0.5">
                      ₹{mepLakhs}L <span className="text-[10px] text-slate-400 font-normal">(20%)</span>
                    </div>
                  </div>

                  {/* Category 3 */}
                  <div className="bg-[#FAF8F5] border border-slate-200/80 rounded-xl p-2.5 text-center">
                    <Armchair className="w-4 h-4 text-[#C29061] mx-auto mb-1" />
                    <div className="text-[10px] text-slate-500 font-medium">Interiors &amp; Tiles</div>
                    <div className="text-xs font-bold text-slate-900 mt-0.5">
                      ₹{interiorLakhs}L <span className="text-[10px] text-slate-400 font-normal">(25%)</span>
                    </div>
                  </div>

                  {/* Category 4 */}
                  <div className="bg-[#FAF8F5] border border-slate-200/80 rounded-xl p-2.5 text-center">
                    <Trees className="w-4 h-4 text-[#C29061] mx-auto mb-1" />
                    <div className="text-[10px] text-slate-500 font-medium">Facade &amp; Landscaping</div>
                    <div className="text-xs font-bold text-slate-900 mt-0.5">
                      ₹{facadeLakhs}L <span className="text-[10px] text-slate-400 font-normal">(10%)</span>
                    </div>
                  </div>
                </div>
              </div>

            </div>

            {/* Right Summary Dark Card (4 Cols) */}
            <div className="lg:col-span-4 bg-[#0F172A] text-white rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-2xl relative overflow-hidden">
              {/* Subtle gold glow inside card */}
              <div className="absolute top-0 right-0 w-44 h-44 bg-[#C29061]/10 rounded-full blur-2xl pointer-events-none" />

              <div className="space-y-6">
                <div>
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 block">
                    Estimated Turnkey Investment
                  </span>
                  <div className="text-3xl sm:text-4xl font-black text-[#E8C59A] font-sans tracking-tight mt-1">
                    ₹{costInCrores} <span className="text-xl sm:text-2xl font-bold">Crores</span>
                  </div>
                  <span className="text-xs text-slate-400 block mt-0.5">
                    (Approx. ₹{costInLakhs} Lakhs turnkey budget)
                  </span>
                </div>

                {/* Checklist */}
                <div className="space-y-3 pt-3 border-t border-white/10">
                  <div className="flex items-center gap-2.5 text-xs text-slate-200">
                    <div className="w-4 h-4 rounded-full bg-[#C29061]/20 text-[#E8C59A] flex items-center justify-center flex-shrink-0">
                      <Check className="w-2.5 h-2.5 stroke-[3]" />
                    </div>
                    <span>Soil Testing, RCC Raft &amp; Fe550D TMT</span>
                  </div>

                  <div className="flex items-center gap-2.5 text-xs text-slate-200">
                    <div className="w-4 h-4 rounded-full bg-[#C29061]/20 text-[#E8C59A] flex items-center justify-center flex-shrink-0">
                      <Check className="w-2.5 h-2.5 stroke-[3]" />
                    </div>
                    <span>100% On-Time Delivery Guarantee</span>
                  </div>

                  <div className="flex items-center gap-2.5 text-xs text-slate-200">
                    <div className="w-4 h-4 rounded-full bg-[#C29061]/20 text-[#E8C59A] flex items-center justify-center flex-shrink-0">
                      <Check className="w-2.5 h-2.5 stroke-[3]" />
                    </div>
                    <span>Complete Project Management</span>
                  </div>

                  <div className="flex items-center gap-2.5 text-xs text-slate-200">
                    <div className="w-4 h-4 rounded-full bg-[#C29061]/20 text-[#E8C59A] flex items-center justify-center flex-shrink-0">
                      <Check className="w-2.5 h-2.5 stroke-[3]" />
                    </div>
                    <span>Customizable as per your needs</span>
                  </div>
                </div>

                {/* Golden CTA Button */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={onOpenQuote}
                  className="w-full inline-flex items-center justify-center gap-2 bg-[#C29061] hover:bg-[#b58354] text-slate-950 font-bold text-xs sm:text-sm py-3.5 px-5 rounded-full shadow-lg shadow-[#C29061]/20 transition-all duration-200"
                >
                  <span>Request Comprehensive BOQ Estimate</span>
                  <ArrowRight className="w-4 h-4" />
                </motion.button>
              </div>

              {/* Bottom Expert Contact Box */}
              <div className="pt-6 mt-6 border-t border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="relative w-10 h-10 rounded-full overflow-hidden border border-white/20 bg-slate-800 flex-shrink-0">
                    <Image
                      src="/images/testimonials/arun-kumar.jpg"
                      alt="Er. Sakay Antony Stalin"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h6 className="text-xs font-bold text-white leading-tight">Need Help?</h6>
                    <p className="text-[11px] text-slate-400 leading-tight mt-0.5">
                      Talk to our Construction Expert
                    </p>
                  </div>
                </div>

                {/* Call & WhatsApp Buttons */}
                <div className="flex items-center gap-2">
                  <a
                    href="tel:+917708247124"
                    className="w-8 h-8 rounded-full bg-white/10 hover:bg-[#C29061] text-white hover:text-slate-950 flex items-center justify-center transition-colors shadow-sm"
                    title="Call Er. Sakay Antony Stalin (+91 77082 47124)"
                  >
                    <Phone className="w-3.5 h-3.5" />
                  </a>
                  <a
                    href="https://wa.me/917708247124?text=Hi%20Jancy%20Builders%2C%20I%20would%20like%20to%20discuss%20my%20construction%20project%20cost%20estimate."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 rounded-full bg-[#25D366] hover:bg-[#20ba5a] text-white flex items-center justify-center transition-colors shadow-sm"
                    title="Chat on WhatsApp (+91 77082 47124)"
                  >
                    <MessageCircle className="w-3.5 h-3.5 fill-current" />
                  </a>
                </div>
              </div>

            </div>

          </div>
        </div>

        {/* Bottom Bar: 4 Stats + Cursive Right */}
        <div className="mt-12 flex flex-col md:flex-row items-center justify-between gap-6 pt-6 border-t border-slate-200">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-10 w-full md:w-auto">
            <div className="flex items-center gap-2.5">
              <Building2 className="w-5 h-5 text-slate-400" />
              <div>
                <span className="text-lg font-black text-slate-900 block leading-tight">250+</span>
                <span className="text-[11px] text-slate-500 font-medium">Projects Completed</span>
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              <Image
                src="/images/testimonials/arun-kumar.jpg"
                alt="Clients"
                width={20}
                height={20}
                className="w-5 h-5 rounded-full object-cover"
              />
              <div>
                <span className="text-lg font-black text-slate-900 block leading-tight">500+</span>
                <span className="text-[11px] text-slate-500 font-medium">Happy Clients</span>
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              <ShieldCheck className="w-5 h-5 text-slate-400" />
              <div>
                <span className="text-lg font-black text-slate-900 block leading-tight">8+</span>
                <span className="text-[11px] text-slate-500 font-medium">Years of Experience</span>
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              <div className="w-5 h-5 rounded-full bg-[#C29061]/20 flex items-center justify-center text-[#C29061] text-xs font-bold">
                ★
              </div>
              <div>
                <span className="text-lg font-black text-slate-900 block leading-tight">4.8+</span>
                <span className="text-[11px] text-slate-500 font-medium">Client Satisfaction</span>
              </div>
            </div>
          </div>

          {/* Right Cursive */}
          <div className="select-none text-right">
            <span className="font-['Caveat',cursive] text-2xl sm:text-3xl text-[#C29061] block leading-none">
              Spaces for a Brighter Tomorrow
            </span>
            <svg
              className="w-36 h-3 text-[#C29061]/60 mt-1 ml-auto"
              viewBox="0 0 140 10"
              fill="none"
            >
              <path
                d="M2 7 C35 1, 95 2, 138 7"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </div>
        </div>

      </div>
    </section>
  );
}
