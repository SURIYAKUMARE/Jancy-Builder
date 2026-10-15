"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  Calculator,
  Building,
  Home,
  CheckCircle2,
  ArrowRight,
  MessageCircle,
  Sparkles,
  Info,
  Layers,
  Crown,
  Building2,
  Gem,
} from "lucide-react";
import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import BlurText from "@/components/motion/BlurText";

interface EstimatorSectionProps {
  onOpenQuote: () => void;
}

export default function EstimatorSection({ onOpenQuote }: EstimatorSectionProps) {
  const { isTamil } = useLanguage();
  const [typology, setTypology] = useState<"villa" | "house" | "duplex">("villa");
  const [areaSqFt, setAreaSqFt] = useState<number>(2200);
  const [packageType, setPackageType] = useState<"classic" | "premium" | "ultra">("premium");
  const [selectedAddons, setSelectedAddons] = useState<string[]>([]);

  // Verified Business Rates per sq.ft
  const rates = {
    classic: 2400,
    premium: 3200,
    ultra: 4400,
  };

  const typologies = [
    {
      id: "villa" as const,
      nameEn: "Luxury Villa",
      nameTa: "ஆடம்பர வில்லா",
      icon: Crown,
    },
    {
      id: "duplex" as const,
      nameEn: "Modern Duplex",
      nameTa: "இரு அடுக்கு மாளிகை",
      icon: Building,
    },
    {
      id: "house" as const,
      nameEn: "Independent Home",
      nameTa: "தனி வீடு",
      icon: Home,
    },
  ];

  const packages = [
    {
      id: "classic" as const,
      nameEn: "Standard Durability",
      nameTa: "ஸ்டாண்டர்ட் தரம்",
      rate: 2400,
      badgeEn: "Essential Turnkey",
      badgeTa: "அடிப்படை தரம்",
      specEn: "First-Class Red Clay Brick, Kamachi/ARS Fe550, Johnson Tiles",
      specTa: "செங்கல் கட்டுமானம், Fe550 கம்பிகள், ஜான்சன் டைல்ஸ்",
    },
    {
      id: "premium" as const,
      nameEn: "Porotherm Eco-Thermal",
      nameTa: "போரோதெர்ம் குளுமை இல்லம்",
      rate: 3200,
      badgeEn: "Most Popular Specialty",
      badgeTa: "பிரபலமான தேர்வு (6°C குளுமை)",
      specEn: "Wienerberger Porotherm Clay, Tata Tiscon Fe550D, Kajaria 4x2 GVT",
      specTa: "வீனர்பெர்கர் போரோதெர்ம், டாடா டிஸ்கான் Fe550D, கஜாரியா டைல்ஸ்",
    },
    {
      id: "ultra" as const,
      nameEn: "Ultra Luxury Architectural",
      nameTa: "அல்ட்ரா ஆடம்பர இல்லம்",
      rate: 4400,
      badgeEn: "Bespoke Engineering",
      badgeTa: "உயர் தர வடிவமைப்பு",
      specEn: "Italian Marble, Teakwood Paneling, Smart Automation, Designer Elevation",
      specTa: "இத்தாலியன் மார்பிள், தேக்கு மர கதவுகள், ஸ்மார்ட் ஹோம் ஆட்டோமேஷன்",
    },
  ];

  const addonsList = [
    { id: "kitchen", nameEn: "Modular Kitchen & Wardrobes", nameTa: "மாடுலர் கிச்சன் & அலமாரிகள்", cost: 350000 },
    { id: "landscape", nameEn: "Architectural Landscaping", nameTa: "தோட்டம் & பூங்கா வடிவமைப்பு", cost: 200000 },
    { id: "solar", nameEn: "5kW Hybrid Rooftop Solar", nameTa: "5kW சோலார் மின்கட்டமைப்பு", cost: 320000 },
    { id: "smarthome", nameEn: "Smart Home & Video Security", nameTa: "ஸ்மார்ட் ஹோம் & சிசிடிவி பாதுகாப்பு", cost: 180000 },
  ];

  const toggleAddon = (id: string) => {
    setSelectedAddons((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // Dynamic calculations
  const addonsTotal = selectedAddons.reduce((acc, id) => {
    const item = addonsList.find((a) => a.id === id);
    return acc + (item ? item.cost : 0);
  }, 0);

  const baseCost = areaSqFt * rates[packageType];
  const totalCost = baseCost + addonsTotal;
  const costInLakhs = (totalCost / 100000).toFixed(1);
  const costInCrores = (totalCost / 10000000).toFixed(2);

  // Category distributions
  const civilCostLakhs = ((baseCost * 0.45) / 100000).toFixed(1);
  const mepCostLakhs = ((baseCost * 0.20) / 100000).toFixed(1);
  const interiorCostLakhs = (((baseCost * 0.25) + addonsTotal) / 100000).toFixed(1);
  const facadeCostLakhs = ((baseCost * 0.10) / 100000).toFixed(1);

  const handleRequestBOQ = () => {
    const selectedTyp = typologies.find((t) => t.id === typology)?.nameEn || "Luxury Villa";
    const selectedPkg = packages.find((p) => p.id === packageType)?.nameEn || "Porotherm Eco-Thermal";
    const selectedRate = rates[packageType];

    const message = `🏗️ *Turnkey Construction Cost Estimate Request*
*Jancy Builders — Samugarengapuram, Tirunelveli*
--------------------------------------------
📌 *Home Type:* ${selectedTyp}
📐 *Built-Up Area:* ${areaSqFt.toLocaleString()} sq.ft
💎 *Package:* ${selectedPkg} (₹${selectedRate.toLocaleString()}/sq.ft)
💰 *Estimated Turnkey Cost:* Approx. ₹${costInLakhs} Lakhs (₹${costInCrores} Cr)

📊 *Budget Distribution:*
• Civil Structure & Foundation (45%): ₹${civilCostLakhs} L
• Plumbing & Electrical MEP (20%): ₹${mepCostLakhs} L
• Flooring, Doors & Finishes (25%): ₹${interiorCostLakhs} L
• Elevation & Waterproofing (10%): ₹${facadeCostLakhs} L

Hello Er. Sahaya Antony Stalin, I calculated this construction estimate on your website and would like to receive an itemized BOQ and schedule an office consultation.`;

    window.open(`https://wa.me/917708247124?text=${encodeURIComponent(message)}`, "_blank");
    onOpenQuote();
  };

  return (
    <section
      id="estimator"
      className="w-full bg-black py-24 sm:py-32 text-white relative overflow-hidden scroll-mt-20 font-body border-t border-white/10"
    >
      {/* Background Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[450px] bg-[#C9A46B]/5 rounded-full blur-[170px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full liquid-glass text-xs font-mono text-[#C9A46B] uppercase tracking-widest">
            <Calculator className="w-3.5 h-3.5" />
            <span>{isTamil ? "வெளிப்படையான செலவுக் கணக்கீடு" : "INTERACTIVE COST ESTIMATOR"}</span>
          </div>

          {isTamil ? (
            <BlurText
              text="வீடு கட்டும் உத்தேச செலவைக் கணக்கிடுங்கள்"
              as="h2"
              isTamil={true}
              className="text-3xl sm:text-5xl font-tamil font-black text-white tracking-tight"
            />
          ) : (
            <BlurText
              text="Calculate Your Estimated Construction Investment."
              as="h2"
              italic={true}
              className="text-4xl sm:text-6xl font-heading font-normal text-white tracking-tight leading-[1.08]"
            />
          )}

          <p className="text-sm sm:text-base text-white/70 leading-relaxed font-body">
            {isTamil
              ? "மறைமுக செலவுகள் இல்லாத வெளிப்படையான கணக்கீடு. உங்கள் நிலத்தின் பரப்பளவு மற்றும் விருப்பத்திற்கேற்ப துல்லியமான உத்தேச பட்ஜெட்டை உடனடியாகப் பெறுங்கள்."
              : "Transparent pricing with zero hidden escalations. Choose your home typology, built-up area, and material package to get an instant realistic BOQ estimate."}
          </p>
        </div>

        {/* 2-Column Estimator Calculator Spread */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column (7 Cols): Selection Controls */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Step 1: Typology Selector */}
            <div className="p-6 rounded-3xl liquid-glass space-y-3 text-left">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#C9A46B] block">
                01. {isTamil ? "வீட்டின் வகை" : "Select Typology"}
              </span>
              <div className="grid grid-cols-3 gap-3">
                {typologies.map((t) => {
                  const Icon = t.icon;
                  const isSelected = typology === t.id;
                  return (
                    <button
                      key={t.id}
                      onClick={() => setTypology(t.id)}
                      className={`p-3.5 rounded-2xl flex flex-col items-center justify-center gap-2 transition-all ${
                        isSelected
                          ? "liquid-glass-strong border-[#C9A46B] text-white shadow-lg"
                          : "liquid-glass text-white/60 hover:text-white"
                      }`}
                    >
                      <Icon className={`w-5 h-5 ${isSelected ? "text-[#C9A46B]" : "text-white/40"}`} />
                      <span className="text-xs font-semibold">{isTamil ? t.nameTa : t.nameEn}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Built-up Area Slider */}
            <div className="p-6 rounded-3xl liquid-glass space-y-4 text-left">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#C9A46B]">
                  02. {isTamil ? "கட்டுமானப் பரப்பளவு" : "Built-Up Area"}
                </span>
                <span className="text-xl font-heading italic text-[#E2C496]">
                  {areaSqFt.toLocaleString()} sq.ft
                </span>
              </div>

              {/* Slider */}
              <input
                type="range"
                min={800}
                max={7000}
                step={50}
                value={areaSqFt}
                onChange={(e) => setAreaSqFt(Number(e.target.value))}
                className="w-full accent-[#C9A46B] cursor-pointer h-2 bg-white/10 rounded-lg appearance-none"
              />

              {/* Quick Pick Pills */}
              <div className="flex flex-wrap items-center gap-2 pt-1">
                <span className="text-[11px] font-mono text-white/40">Quick select:</span>
                {[1200, 1800, 2400, 3200, 4500].map((val) => (
                  <button
                    key={val}
                    onClick={() => setAreaSqFt(val)}
                    className={`px-3 py-1 rounded-full text-[11px] font-mono transition-all ${
                      areaSqFt === val
                        ? "bg-[#C9A46B] text-black font-bold"
                        : "liquid-glass text-white/70 hover:text-white"
                    }`}
                  >
                    {val.toLocaleString()} sq.ft
                  </button>
                ))}
              </div>
            </div>

            {/* Step 3: Package Tiers */}
            <div className="p-6 rounded-3xl liquid-glass space-y-3 text-left">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#C9A46B] block">
                03. {isTamil ? "கட்டுமான பேக்கேஜ்" : "Specification Package"}
              </span>
              <div className="space-y-3">
                {packages.map((pkg) => {
                  const isSelected = packageType === pkg.id;
                  return (
                    <div
                      key={pkg.id}
                      onClick={() => setPackageType(pkg.id)}
                      className={`p-4 rounded-2xl cursor-pointer transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                        isSelected
                          ? "liquid-glass-strong border-[#C9A46B] shadow-xl shadow-[#C9A46B]/15"
                          : "liquid-glass hover:bg-white/5 opacity-80 hover:opacity-100"
                      }`}
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className={`text-sm font-bold ${isSelected ? "text-white" : "text-white/80"}`}>
                            {isTamil ? pkg.nameTa : pkg.nameEn}
                          </span>
                          <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full bg-[#C9A46B]/15 text-[#E2C496]">
                            {isTamil ? pkg.badgeTa : pkg.badgeEn}
                          </span>
                        </div>
                        <p className="text-xs text-white/60">
                          {isTamil ? pkg.specTa : pkg.specEn}
                        </p>
                      </div>

                      <div className="text-right sm:flex-shrink-0">
                        <span className="text-base font-bold text-white font-mono block">
                          ₹{pkg.rate.toLocaleString()}
                        </span>
                        <span className="text-[10px] text-white/40 font-mono">/ sq.ft</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Step 4: Optional Upgrades */}
            <div className="p-6 rounded-3xl liquid-glass space-y-3 text-left">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#C9A46B] block">
                04. {isTamil ? "கூடுதல் சேவைகள் (விருப்பத்திற்குரியது)" : "Optional Add-ons"}
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {addonsList.map((addon) => {
                  const isChecked = selectedAddons.includes(addon.id);
                  return (
                    <button
                      key={addon.id}
                      onClick={() => toggleAddon(addon.id)}
                      className={`p-3 rounded-xl text-left flex items-center justify-between transition-all ${
                        isChecked
                          ? "liquid-glass-strong border-[#C9A46B]/80 text-white"
                          : "liquid-glass text-white/70 hover:text-white"
                      }`}
                    >
                      <div className="space-y-0.5 pr-2">
                        <span className="text-xs font-semibold block">{isTamil ? addon.nameTa : addon.nameEn}</span>
                        <span className="text-[10px] font-mono text-[#E2C496]">
                          +₹{(addon.cost / 100000).toFixed(1)} Lakhs
                        </span>
                      </div>
                      <div
                        className={`w-4 h-4 rounded-md border flex items-center justify-center flex-shrink-0 ${
                          isChecked ? "bg-[#C9A46B] border-[#C9A46B] text-black" : "border-white/30"
                        }`}
                      >
                        {isChecked && <CheckCircle2 className="w-3.5 h-3.5 stroke-[3]" />}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

          </div>

          {/* Right Column (5 Cols): Live BOQ Summary & Actions */}
          <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-28">
            <div className="p-6 sm:p-8 rounded-3xl liquid-glass-strong border border-white/20 shadow-2xl space-y-6 text-left relative overflow-hidden">
              
              {/* Highlight Glow */}
              <div className="absolute top-0 right-0 w-44 h-44 bg-[#C9A46B]/15 rounded-full blur-3xl pointer-events-none" />

              <div>
                <span className="text-xs font-mono text-[#C9A46B] uppercase tracking-wider block">
                  {isTamil ? "உத்தேச மொத்த முதலீடு" : "PRELIMINARY ESTIMATE"}
                </span>
                <div className="flex items-baseline gap-2 mt-2">
                  <span className="text-4xl sm:text-5xl font-heading italic text-white tracking-tight">
                    ₹{costInLakhs}
                  </span>
                  <span className="text-lg text-[#E2C496] font-body font-semibold">
                    Lakhs
                  </span>
                  <span className="text-xs text-white/50 font-mono ml-auto">
                    (~₹{costInCrores} Cr)
                  </span>
                </div>
                <p className="text-xs text-white/60 mt-1">
                  {isTamil
                    ? `பரப்பளவு: ${areaSqFt.toLocaleString()} sq.ft • ₹${rates[packageType].toLocaleString()}/sq.ft`
                    : `Based on ${areaSqFt.toLocaleString()} sq.ft at ₹${rates[packageType].toLocaleString()}/sq.ft`}
                </p>
              </div>

              {/* Cost Category Breakdown Bars */}
              <div className="space-y-3 pt-4 border-t border-white/10 text-xs font-mono">
                <span className="text-[11px] text-white/60 uppercase tracking-wider block font-sans font-semibold">
                  {isTamil ? "செலவுப் பிரிவுகள் பகிர்வு:" : "ESTIMATED STAGE BREAKDOWN:"}
                </span>

                <div className="space-y-1">
                  <div className="flex justify-between text-white/80">
                    <span>Civil Structure (45%)</span>
                    <span className="font-bold text-white">₹{civilCostLakhs} L</span>
                  </div>
                  <div className="w-full h-1.5 rounded-full bg-white/10 overflow-hidden">
                    <div className="h-full bg-[#C9A46B] w-[45%]" />
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between text-white/80">
                    <span>Plumbing & Electrical MEP (20%)</span>
                    <span className="font-bold text-white">₹{mepCostLakhs} L</span>
                  </div>
                  <div className="w-full h-1.5 rounded-full bg-white/10 overflow-hidden">
                    <div className="h-full bg-white/70 w-[20%]" />
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between text-white/80">
                    <span>Finishes, Tiles & Wood (25%)</span>
                    <span className="font-bold text-white">₹{interiorCostLakhs} L</span>
                  </div>
                  <div className="w-full h-1.5 rounded-full bg-white/10 overflow-hidden">
                    <div className="h-full bg-[#E2C496] w-[25%]" />
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between text-white/80">
                    <span>Facade & Waterproofing (10%)</span>
                    <span className="font-bold text-white">₹{facadeCostLakhs} L</span>
                  </div>
                  <div className="w-full h-1.5 rounded-full bg-white/10 overflow-hidden">
                    <div className="h-full bg-slate-400 w-[10%]" />
                  </div>
                </div>
              </div>

              {/* Preliminary Notice */}
              <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 text-[11px] text-white/70 flex items-start gap-2">
                <Info className="w-3.5 h-3.5 text-[#C9A46B] flex-shrink-0 mt-0.5" />
                <p>
                  {isTamil
                    ? "குறிப்பு: இது ஒரு உத்தேச மதிப்பீடு மட்டுமே. உங்கள் நிலத்தின் மண் தரம் மற்றும் வரைபடத்திற்கு ஏற்ப இறுதி BOQ அறிக்கை வழங்கப்படும்."
                    : "Notice: This preliminary estimate is subject to soil SBC lab testing and custom floor plan specifications."}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3 pt-2">
                <button
                  onClick={handleRequestBOQ}
                  className="w-full py-3.5 rounded-2xl bg-[#25D366] hover:bg-[#20ba5a] text-black font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-lg"
                >
                  <MessageCircle className="w-4 h-4 fill-current" />
                  <span>{isTamil ? "வாட்ஸ்அப்பில் BOQ பெறுக" : "Get Itemized BOQ on WhatsApp"}</span>
                </button>

                <button
                  onClick={onOpenQuote}
                  className="w-full py-3.5 rounded-2xl liquid-glass text-white hover:text-[#C9A46B] text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all"
                >
                  <span>{isTamil ? "விரிவான விலைப்பட்டியல் கேட்க" : "Request Official Quote"}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
