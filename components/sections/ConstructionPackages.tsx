"use client";

import React, { useState } from "react";
import {
  Check,
  ChevronDown,
  ChevronUp,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Building,
  Hammer,
  Layers,
  Zap,
  Droplets,
  Award,
  PhoneCall,
  MessageCircle,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { trackEvent } from "@/lib/analytics";

interface ConstructionPackagesProps {
  onOpenQuote?: (packageTier?: "standard" | "premium" | "ultra") => void;
}

export default function ConstructionPackages({ onOpenQuote }: ConstructionPackagesProps) {
  const [showDetailedSpecs, setShowDetailedSpecs] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string>("all");

  const packages = [
    {
      id: "standard" as const,
      name: "Standard Quality",
      rate: "2,400",
      rateUnit: "/ sq.ft",
      tagline: "Engineered Durability & Essential Turnkey Reliability",
      badge: "ESSENTIAL TURNKEY",
      badgeColor: "bg-[#17191B]/5 text-[#55585D] border-[#E2D9CC]",
      isPopular: false,
      summary:
        "Designed for families seeking uncompromising structural safety, certified grade materials, and verified execution on a disciplined budget.",
      keySpecs: [
        "M20 Grade RCC Design Mix Concrete",
        "Fe550 Grade TMT Rebar (Kamachi / ARS)",
        "First-Class Red Clay Brick Masonry (9\" external, 4.5\" partition)",
        "Johnson / Somany 2ft x 2ft Vitrified Tile Flooring",
        "Parryware / Cera Sanitaryware & CP Fittings",
        "Asian Paints Tractor Emulsion (Interior) & Ace (Exterior)",
        "Teakwood Main Door Frame with Flush Shutter",
        "10-Year Structural Strength Warranty",
      ],
      designServices: [
        "2D Architectural Floor Plan Layout",
        "Front 3D Elevation Conceptual Rendering",
        "Structural Column & Beam Centerline Drawing",
        "Vastu Compliant Room Orientation",
      ],
      materialTier: "ISI Certified Brands",
      timelineGuarantee: "100% On-Time Handover Guarantee",
    },
    {
      id: "premium" as const,
      name: "Premium Elite",
      rate: "3,200",
      rateUnit: "/ sq.ft",
      tagline: "Wienerberger Eco-Thermal Clay & Advanced Engineering",
      badge: "MOST POPULAR • POROTHERM SPECIALTY",
      badgeColor: "bg-[#B78A52]/15 text-[#966E3A] border-[#B78A52]/40",
      isPopular: true,
      summary:
        "Our flagship specification featuring natural thermal cooling, high-grade steel, and designer finishes. Keeps interiors 6°C cooler year-round in Tirunelveli.",
      keySpecs: [
        "Wienerberger Porotherm Eco-Thermal Hollow Clay Bricks",
        "M25 Mechanized Design Mix with Needle Vibrator Curing",
        "TATA Tiscon / JSW Neosteel Fe550D High-Ductility Rebar",
        "Kajaria / Nitco 4ft x 2ft Glazed Vitrified Tiles (GVT)",
        "Jaquar Continental Series Diverters & Wall-Hung Toilets",
        "Asian Paints Apex Weatherproof Exterior Emulsion",
        "Full Teakwood Main Entrance Door with Brass Hardware",
        "15-Year Structural Integrity & Waterproofing Warranty",
      ],
      designServices: [
        "Comprehensive 2D Working Drawings & Sections",
        "Photorealistic 3D Exterior Walkthrough Animation",
        "Complete Electrical, Plumbing & Sanitary Schematics",
        "Local Municipal Sanction & Approval Documentation",
      ],
      materialTier: "Tier-1 National & International Brands",
      timelineGuarantee: "Milestone-Linked Guarantee with Penalty Clause",
    },
    {
      id: "ultra" as const,
      name: "Ultra Luxury Craft",
      rate: "4,400",
      rateUnit: "/ sq.ft",
      tagline: "Bespoke Architectural Masterpiece with Italian Luxury",
      badge: "ARCHITECTURAL SIGNATURE",
      badgeColor: "bg-[#17191B] text-[#B78A52] border-[#B78A52]/40",
      isPopular: false,
      summary:
        "Crafted for discerning homeowners desiring imported Italian marble, acoustic thermal glazing, smart automation, and bespoke interior elevations.",
      keySpecs: [
        "Imported Italian Statuario / Bottochino Marble Flooring",
        "Porotherm Thermo-Acoustic Envelope + Cavity Insulation",
        "M30 High-Performance Concrete with NABL Cube Test Logs",
        "Grohe / Kohler Concealed Sensor Bath & Shower Systems",
        "Acoustic Double-Glazed Soundproof UPVC / Aluminium Windows",
        "Hand-Carved 1st Quality Burma Teakwood Entrance Ensemble",
        "Schneider / Legrand Smart Home Automation Pre-Wiring",
        "20-Year Full Structural Warranty + 1-Year Free Maintenance",
      ],
      designServices: [
        "Custom 3D Virtual Reality (VR) Immersive Walkthrough",
        "Detailed Interior Millwork & False Ceiling Layouts",
        "Specialized HVAC, Landscape & Terrace Garden Engineering",
        "Dedicated Chief Architect & Full-Time Resident Engineer",
      ],
      materialTier: "Luxury Imported & Precision Engineering Brands",
      timelineGuarantee: "Executive Dedicated Management Guarantee",
    },
  ];

  // Comprehensive Detailed Specifications Table Matrix
  const specCategories = [
    {
      id: "design",
      name: "Design & Approvals",
      icon: Building,
      items: [
        { feature: "2D Architectural Floor Plans", standard: "Included", premium: "Included", ultra: "Included (Bespoke)" },
        { feature: "3D Elevation Views", standard: "1 Perspective", premium: "3 High-Res Perspectives", ultra: "Full 360° VR Walkthrough" },
        { feature: "Structural Engineering & Soil SBC Test", standard: "Standard Check", premium: "NABL Laboratory Borehole Test", ultra: "Deep Core Plate Load SBC Test" },
        { feature: "Vastu Shastra Compliance", standard: "Basic Layout", premium: "Complete Compass Degree Audit", ultra: "Detailed Traditional Vastu Audit" },
        { feature: "Municipality Approval Assistance", standard: "Guidance", premium: "End-to-End File Preparation", ultra: "Turnkey Sanction Management" },
      ],
    },
    {
      id: "structure",
      name: "Core Civil Structure",
      icon: Hammer,
      items: [
        { feature: "Concrete Mix Design", standard: "M20 Grade", premium: "M25 Mechanized Design Mix", ultra: "M30 High-Performance Mix" },
        { feature: "TMT Rebar Specification", standard: "Fe550 Grade (Kamachi/ARS)", premium: "Fe550D High-Ductility (TATA/JSW)", premiumHighlight: true, ultra: "Fe550D Corrosion-Resistant (TATA Tiscon)" },
        { feature: "Cement Brands", standard: "Dalmia / Ramco (53 Grade)", premium: "UltraTech Super / ACC Concrete+ ", ultra: "UltraTech Weather Plus / High Alumina" },
        { feature: "Concrete Placement & Curing", standard: "Needle Vibrator Compaction", premium: "Boom Placer + 28-Day Water Ponding", ultra: "Laser-Screed Leveling + Automated Mist Curing" },
        { feature: "Anti-Termite Treatment", standard: "Foundation Trench Layer", premium: "3-Stage Chemical Subterranean Barrier", ultra: "5-Stage Pressurized Soil Barrier" },
      ],
    },
    {
      id: "masonry",
      name: "Walls & Eco-Thermal Envelope",
      icon: Layers,
      items: [
        { feature: "Wall Masonry Material", standard: "First-Class Country Red Clay Bricks", premium: "Wienerberger Porotherm Eco-Clay (6°C Cooler)", premiumHighlight: true, ultra: "Porotherm Eco-Clay + Cavity Sound Wall" },
        { feature: "Mortar Joint Thickness", standard: "Standard 12mm Cement Sand", premium: "Precision Thin-Bed Adhesive Mortar", ultra: "Thermal Break Polymeric Polymer Mortar" },
        { feature: "Internal Wall Plastering", standard: "Smooth Sponge Finish (12mm)", premium: "River Sand Neeru / Gypsum Finish (15mm)", ultra: "Double-Coat Putty Finish Ready for Luster" },
        { feature: "External Wall Plastering", standard: "Single-Coat Sand Face (18mm)", premium: "Double-Coat Waterproofing Sand Face (20mm)", ultra: "Multi-Coat Polymeric Architectural Texture" },
      ],
    },
    {
      id: "flooring",
      name: "Flooring & Finishes",
      icon: Award,
      items: [
        { feature: "Living & Dining Flooring", standard: "Johnson 2ft x 2ft Vitrified (₹65/sq.ft)", premium: "Kajaria 4ft x 2ft GVT Tiles (₹110/sq.ft)", ultra: "Imported Italian Statuario Marble (₹350/sq.ft)" },
        { feature: "Master Bedroom Flooring", standard: "2ft x 2ft Vitrified Tiles", premium: "Wooden Finish Anti-Skid / GVT Tiles", ultra: "Hardwood Engineered Timber / Italian Marble" },
        { feature: "Kitchen Countertop", standard: "Polished Black Granite (₹120/sq.ft)", premium: "Premium Jet Black Granite (₹180/sq.ft)", ultra: "Engineered Quartz / Nano White Countertop" },
        { feature: "Staircase Steps & Risers", standard: "Granite / Kota Stone with SS Railing", premium: "Moulded Jet Black Granite + SS304 Glass Railing", ultra: "Floating Cantilever Italian Marble + Frameless Glass" },
      ],
    },
    {
      id: "bathrooms",
      name: "Bathrooms & Plumbing",
      icon: Droplets,
      items: [
        { feature: "Sanitaryware", standard: "Parryware / Cera Floor-Mounted", premium: "Jaquar Wall-Hung Toilets with Concealed Flush", premiumHighlight: true, ultra: "Kohler / Grohe Concealed Rimless Sensor Toilets" },
        { feature: "CP Fittings & Diverters", standard: "Parryware 2-in-1 Wall Mixer", premium: "Jaquar High-Flow Single-Lever Diverter", ultra: "Grohe Thermostatic Rain Shower System" },
        { feature: "Plumbing Pipe Lines", standard: "Ashirvad / Supreme CPVC & PVC", premium: "Astral Lead-Free SDR-11 CPVC & SWR Pipes", ultra: "Astral Silencio Soundproof Drain & CPVC" },
        { feature: "Hydrostatic Line Pressure Test", standard: "Visual Inspection", premium: "15-Bar Hydraulic Pressure Pump Test", ultra: "20-Bar NABL Certified Pressure Test" },
      ],
    },
    {
      id: "electrical",
      name: "Electrical & Smart Automation",
      icon: Zap,
      items: [
        { feature: "Wiring & Conduiting", standard: "Finolex Fire-Retardant PVC Conduits", premium: "Havells / Polycab FRLS Copper Cables", ultra: "Polycab Zero-Halogen Shielded Cables" },
        { feature: "Modular Switches", standard: "Anchor Roma / GM Modular", premium: "Legrand Mylinc / Schneider AvatarOn", ultra: "Schneider Neo / Smart Touch Switches" },
        { feature: "Distribution Board & MCB", standard: "Standard Isolator + MCBs", premium: "Legrand 4-Pole RCCB Shock Protection", ultra: "Full Phase Smart Surge Protector + RCCB" },
        { feature: "Home Automation", standard: "Not Included (Optional)", premium: "Pre-Wired for Smart Lighting & Sensors", ultra: "Pre-Configured Smart Home System" },
      ],
    },
    {
      id: "warranty",
      name: "Warranty & Handover Guarantee",
      icon: ShieldCheck,
      items: [
        { feature: "Structural Strength Warranty", standard: "10 Years Written", premium: "15 Years Engineering Guarantee", premiumHighlight: true, ultra: "20 Years Comprehensive Guarantee" },
        { feature: "Roof Waterproofing Guarantee", standard: "5 Years", premium: "10 Years Multi-Coat Elastomeric", ultra: "15 Years Polyurethane Membrane" },
        { feature: "Free Maintenance Post-Handover", standard: "6 Months", premium: "12 Months Comprehensive", ultra: "24 Months Executive Care" },
        { feature: "Price Escalation Policy", standard: "Zero Escalation Guarantee", premium: "Zero Escalation Guarantee", ultra: "Zero Escalation Guarantee" },
      ],
    },
  ];

  const handleSelectPackage = (tier: "standard" | "premium" | "ultra") => {
    trackEvent("package_select", { tier });
    if (onOpenQuote) {
      onOpenQuote(tier);
    } else {
      const el = document.getElementById("estimator");
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleWhatsAppConsult = (pkgName: string, rate: string) => {
    trackEvent("package_whatsapp_click", { pkgName, rate });
    const message = encodeURIComponent(
      `Hello Er. Sahaya Antony Stalin, I am interested in the ${pkgName} construction package (₹${rate}/sq.ft) by Jancy Builders. Please share the detailed itemized BOQ.`
    );
    window.open(`https://wa.me/917708247124?text=${message}`, "_blank");
  };

  return (
    <section
      id="packages"
      className="py-20 lg:py-28 bg-[#F8F6F1] text-[#202124] relative overflow-hidden border-t border-[#E2D9CC] scroll-mt-24"
    >
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 mb-3 px-3.5 py-1.5 rounded-full bg-[#B78A52]/10 border border-[#B78A52]/30">
            <span className="w-2 h-2 rounded-full bg-[#B78A52] animate-pulse" />
            <span className="text-[11px] font-mono font-bold uppercase tracking-[0.25em] text-[#B78A52]">
              TRANSPARENT TURNKEY PACKAGES
            </span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black text-[#17191B] tracking-tight font-sans">
            Tailored Construction Packages
          </h2>

          <p className="mt-3 text-sm sm:text-base text-[#55585D] max-w-2xl mx-auto leading-relaxed">
            Inspired by professional construction rigor, every package is fixed-price with zero hidden escalations. Compare verified specifications from essential durability to luxury Porotherm eco-thermal villas.
          </p>
        </div>

        {/* 3 Main Package Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch mb-12">
          {packages.map((pkg, idx) => {
            return (
              <motion.div
                key={pkg.id}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.12, duration: 0.5 }}
                className={`relative rounded-3xl p-7 sm:p-8 flex flex-col justify-between transition-all duration-300 ${
                  pkg.isPopular
                    ? "bg-[#17191B] text-white shadow-2xl shadow-black/20 border-2 border-[#B78A52] lg:-translate-y-2"
                    : "bg-white text-[#202124] shadow-xl shadow-black/5 border border-[#E2D9CC] hover:border-[#B78A52]/50"
                }`}
              >
                {/* Popular Pill */}
                {pkg.isPopular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-[#B78A52] text-slate-950 text-[10px] font-mono font-bold tracking-widest uppercase shadow-md flex items-center gap-1.5 whitespace-nowrap">
                    <Sparkles className="w-3 h-3 fill-current" />
                    <span>MOST POPULAR CHOICE</span>
                  </div>
                )}

                {/* Top Card Info */}
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span
                      className={`text-[10px] font-mono font-bold uppercase tracking-wider px-3 py-1 rounded-full border ${pkg.badgeColor}`}
                    >
                      {pkg.badge}
                    </span>
                    <span className="text-[11px] font-mono text-slate-400">
                      Tier 0{idx + 1}
                    </span>
                  </div>

                  <h3
                    className={`text-2xl font-black tracking-tight font-sans ${
                      pkg.isPopular ? "text-white" : "text-[#17191B]"
                    }`}
                  >
                    {pkg.name}
                  </h3>

                  <p
                    className={`text-xs mt-1 leading-relaxed ${
                      pkg.isPopular ? "text-slate-300" : "text-[#55585D]"
                    }`}
                  >
                    {pkg.tagline}
                  </p>

                  {/* Price Box */}
                  <div className="my-6 p-4 rounded-2xl bg-black/5 border border-black/5 dark:bg-white/5 dark:border-white/10 flex items-baseline justify-between">
                    <div>
                      <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block">
                        VERIFIED RATE
                      </span>
                      <div className="flex items-baseline gap-1 mt-0.5">
                        <span
                          className={`text-3xl sm:text-4xl font-black font-sans tracking-tight ${
                            pkg.isPopular ? "text-[#B78A52]" : "text-[#17191B]"
                          }`}
                        >
                          ₹{pkg.rate}
                        </span>
                        <span
                          className={`text-xs font-mono font-semibold ${
                            pkg.isPopular ? "text-slate-300" : "text-[#7D7F82]"
                          }`}
                        >
                          {pkg.rateUnit}
                        </span>
                      </div>
                    </div>

                    <div className="text-right">
                      <span className="text-[10px] font-mono text-emerald-500 font-bold block">
                        ✓ All Inclusions
                      </span>
                      <span
                        className={`text-[11px] font-mono ${
                          pkg.isPopular ? "text-slate-400" : "text-[#7D7F82]"
                        }`}
                      >
                        Civil + MEP + Finishes
                      </span>
                    </div>
                  </div>

                  <p
                    className={`text-xs leading-relaxed mb-6 ${
                      pkg.isPopular ? "text-slate-300" : "text-[#55585D]"
                    }`}
                  >
                    {pkg.summary}
                  </p>

                  {/* Key Inclusions List */}
                  <div className="space-y-2.5 pb-6 border-b border-[#E2D9CC]/30">
                    <span
                      className={`text-[11px] font-mono font-bold uppercase tracking-wider block ${
                        pkg.isPopular ? "text-[#B78A52]" : "text-[#17191B]"
                      }`}
                    >
                      KEY SPECIFICATIONS:
                    </span>
                    {pkg.keySpecs.map((spec, i) => (
                      <div key={i} className="flex items-start gap-2.5 text-xs">
                        <div
                          className={`w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${
                            pkg.isPopular
                              ? "bg-[#B78A52]/20 text-[#B78A52]"
                              : "bg-emerald-500/15 text-emerald-600"
                          }`}
                        >
                          <Check className="w-2.5 h-2.5 stroke-[3]" />
                        </div>
                        <span
                          className={`leading-tight ${
                            pkg.isPopular ? "text-slate-200" : "text-[#3A3D42]"
                          }`}
                        >
                          {spec}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Design & Approvals Section */}
                  <div className="pt-5 space-y-2">
                    <span
                      className={`text-[11px] font-mono font-bold uppercase tracking-wider block ${
                        pkg.isPopular ? "text-[#B78A52]" : "text-[#17191B]"
                      }`}
                    >
                      DESIGN SERVICES INCLUDED:
                    </span>
                    <ul className="space-y-1.5 text-xs">
                      {pkg.designServices.map((service, si) => (
                        <li
                          key={si}
                          className={`flex items-center gap-2 ${
                            pkg.isPopular ? "text-slate-300" : "text-[#55585D]"
                          }`}
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-[#B78A52] flex-shrink-0" />
                          <span>{service}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Bottom Actions */}
                <div className="pt-8 space-y-3">
                  <button
                    onClick={() => handleSelectPackage(pkg.id)}
                    className={`w-full py-3.5 px-5 rounded-full font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-md ${
                      pkg.isPopular
                        ? "bg-[#B78A52] hover:bg-[#a37742] text-slate-950 shadow-[#B78A52]/20"
                        : "bg-[#17191B] hover:bg-[#25282B] text-white shadow-black/10"
                    }`}
                  >
                    <span>SELECT PACKAGE &amp; GET BOQ</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={() => handleWhatsAppConsult(pkg.name, pkg.rate)}
                    className={`w-full py-2.5 px-4 rounded-full font-semibold text-xs flex items-center justify-center gap-2 transition-all border ${
                      pkg.isPopular
                        ? "bg-white/5 hover:bg-white/10 text-slate-200 border-white/10"
                        : "bg-slate-50 hover:bg-slate-100 text-[#55585D] border-slate-200"
                    }`}
                  >
                    <MessageCircle className="w-3.5 h-3.5 text-[#25D366]" />
                    <span>Chat with Er. Stalin on WhatsApp</span>
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Expandable Detailed Specifications Comparison Drawer */}
        <div className="text-center pt-4">
          <button
            onClick={() => setShowDetailedSpecs((prev) => !prev)}
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-white hover:bg-slate-50 text-[#17191B] font-bold text-xs uppercase tracking-wider border border-[#E2D9CC] shadow-md transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            <span>{showDetailedSpecs ? "Hide Detailed Comparison" : "Compare Full Itemized Specifications (7 Disciplines)"}</span>
            {showDetailedSpecs ? <ChevronUp className="w-4 h-4 text-[#B78A52]" /> : <ChevronDown className="w-4 h-4 text-[#B78A52]" />}
          </button>
        </div>

        {/* Detailed Comparison Table Matrix */}
        <AnimatePresence>
          {showDetailedSpecs && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="mt-12 overflow-hidden"
            >
              <div className="rounded-3xl bg-white border border-[#E2D9CC] shadow-xl overflow-x-auto p-4 sm:p-8">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#E2D9CC]">
                  <div>
                    <h3 className="text-xl sm:text-2xl font-black text-[#17191B] font-sans">
                      Complete Specification Matrix
                    </h3>
                    <p className="text-xs text-[#55585D] mt-0.5">
                      Clear brand-by-brand comparison across all three construction tiers.
                    </p>
                  </div>

                  <span className="text-xs font-mono font-bold text-[#B78A52] px-3.5 py-1.5 rounded-full bg-[#B78A52]/10 border border-[#B78A52]/30 self-start sm:self-auto">
                    Verified Jancy Builders Standards
                  </span>
                </div>

                {/* Table by Category */}
                <div className="space-y-8 pt-6 min-w-[700px]">
                  {specCategories.map((cat) => {
                    const CatIcon = cat.icon;
                    return (
                      <div key={cat.id} className="space-y-3">
                        <div className="flex items-center gap-2.5 pb-2 border-b border-slate-100">
                          <div className="w-7 h-7 rounded-lg bg-[#B78A52]/15 text-[#B78A52] flex items-center justify-center">
                            <CatIcon className="w-4 h-4" />
                          </div>
                          <h4 className="text-sm font-bold text-[#17191B] uppercase tracking-wider font-mono">
                            {cat.name}
                          </h4>
                        </div>

                        <div className="divide-y divide-slate-100 text-xs">
                          {cat.items.map((item, idx) => (
                            <div
                              key={idx}
                              className="grid grid-cols-4 py-3 items-center hover:bg-slate-50/80 px-2 rounded-lg transition-colors"
                            >
                              <div className="font-semibold text-[#202124] pr-4">
                                {item.feature}
                              </div>
                              <div className="text-[#55585D] pr-4">
                                {item.standard}
                              </div>
                              <div
                                className={`pr-4 font-medium ${
                                  (item as any).premiumHighlight
                                    ? "text-[#B78A52] font-bold"
                                    : "text-[#17191B]"
                                }`}
                              >
                                {item.premium}
                              </div>
                              <div className="text-[#17191B] font-medium">
                                {item.ultra}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Table Footer Action */}
                <div className="mt-8 pt-6 border-t border-[#E2D9CC] flex flex-col sm:flex-row items-center justify-between gap-4">
                  <p className="text-xs text-[#55585D] text-center sm:text-left">
                    Need customized specifications or a tailored plot assessment?
                  </p>
                  <a
                    href="tel:+917708247124"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#17191B] hover:bg-[#25282B] text-white text-xs font-bold transition-all shadow-md"
                  >
                    <PhoneCall className="w-3.5 h-3.5 text-[#B78A52]" />
                    <span>Speak with Chief Engineer Er. Stalin</span>
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
