"use client";

import React from "react";
import Image from "next/image";
import {
  HardHat,
  ShieldCheck,
  Award,
  Phone,
  MessageCircle,
  Building,
  Calendar,
  CheckCircle2,
  Sparkles,
  MapPin,
  Clock,
  ArrowRight,
} from "lucide-react";
import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";

interface EngineerProfileSectionProps {
  onOpenAppointment: () => void;
  onOpenConsultation: () => void;
}

export default function EngineerProfileSection({
  onOpenAppointment,
  onOpenConsultation,
}: EngineerProfileSectionProps) {
  const { isTamil } = useLanguage();

  const engineerInfo = {
    name: "Er. Sahaya Antony Stalin",
    qualification: "B.E. (Civil Engineering)",
    role: "Chief Civil Engineer & Founder",
    experience: "8+ Years Hands-on Site Leadership",
    phone: "+91 77082 47124",
    office: "Jancy Home, Samugarengapuram",
  };

  const engineeringPillars = [
    {
      titleEn: "Personal Daily Site Inspection",
      titleTa: "நேரடி தினசரி கள மேற்பார்வை",
      descEn: "No contractor delegation. Every concrete pour, steel alignment, and brick bond is inspected personally by Er. Stalin.",
      descTa: "இடைத்தரகர்கள் இன்றி, ஒவ்வொரு கான்கிரீட் மற்றும் இரும்பு வேலைகளையும் Er. ஸ்டாலின் அவர்கள் நேரில் ஆய்வு செய்கிறார்.",
    },
    {
      titleEn: "Laboratory-Tested Structural Safety",
      titleTa: "NABL ஆய்வக தர பரிசோதனை",
      descEn: "NABL certified soil SBC bearing capacity tests and cube crush strength verification (IS 456 compliance).",
      descTa: "அரசு அங்கீகாரம் பெற்ற ஆய்வகத்தில் மண் மற்றும் கான்கிரீட் தரப் பரிசோதனை செய்யப்பட்ட பிறகே பணிகள் தொடங்கும்.",
    },
    {
      titleEn: "Fixed Itemized BOQ Contract",
      titleTa: "உறுதியான விலைப் பட்டியல் ஒப்பந்தம்",
      descEn: "100% written transparency with zero mid-construction hidden cost escalations or unauthorized brand swaps.",
      descTa: "எழுத்துப்பூர்வமான தெளிவான ஒப்பந்தம். கட்டுமானத்தின் நடுவே விலையேற்றம் இல்லாத வெளிப்படையான கட்டண முறை.",
    },
    {
      titleEn: "15-Year Structural Guarantee",
      titleTa: "15 ஆண்டுகள் கட்டுமான உத்தரவாதம்",
      descEn: "Engineered foundation footings and anti-crack damp-proof course backed by long-term legal warranty.",
      descTa: "உறுதியான அஸ்திவாரம், கசிவு இல்லாத மொட்டை மாடி மற்றும் 15 ஆண்டுகளுக்கான முறையான கட்டுமான உத்தரவாதம்.",
    },
  ];

  return (
    <section
      id="engineer"
      className="py-20 lg:py-28 bg-[#17191B] text-white relative overflow-hidden border-t border-slate-800 scroll-mt-24"
    >
      {/* Subtle ambient lighting */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#B78A52]/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header with Exact Copy requested by user */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 mb-3 px-3.5 py-1.5 rounded-full bg-[#B78A52]/15 border border-[#B78A52]/30">
            <HardHat className="w-3.5 h-3.5 text-[#B78A52]" />
            <span className="text-[11px] font-mono font-bold uppercase tracking-[0.25em] text-[#B78A52]">
              {isTamil ? "தலைமை சிவில் பொறியாளர்" : "CHIEF CIVIL ENGINEER"}
            </span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight font-sans">
            {engineerInfo.name}, <span className="text-[#B78A52] font-normal">{engineerInfo.qualification}</span>
          </h2>

          <p className="mt-4 text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
            {isTamil
              ? "வீடு கட்டுவது பற்றி சந்தேகம் இருக்கிறதா? கட்டுமான முறை, செலவு, பொருட்கள் மற்றும் வீட்டுத் திட்டம் பற்றிய விவரங்களை எங்கள் பொறியியல் குழுவிடம் கேட்டுத் தெரிந்துகொள்ளலாம்."
              : "Have questions about building your house? Our engineering team can explain the construction process, estimated costs, materials, and planning requirements."}
          </p>
        </div>

        {/* 2-Column Detailed Card */}
        <div className="bg-[#1F2226] border border-white/10 rounded-3xl p-6 sm:p-10 lg:p-12 shadow-2xl mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left 5 Cols: Authentic Engineer Photo & Credentials */}
            <div className="lg:col-span-5 space-y-5">
              <div className="relative aspect-[4/5] rounded-2xl overflow-hidden border border-white/15 bg-slate-900 shadow-xl group">
                <Image
                  src="/images/fb-projects/fb-2866252757935105/image_001.jpg"
                  alt="Er. Sahaya Antony Stalin, B.E. (Civil) - Jancy Builders"
                  fill
                  className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent flex flex-col justify-end p-5">
                  <span className="text-xs font-mono font-bold text-[#B78A52] uppercase">
                    CHIEF CIVIL ENGINEER
                  </span>
                  <h3 className="text-xl font-bold text-white">
                    {engineerInfo.name}
                  </h3>
                  <span className="text-xs text-slate-300">
                    B.E. Civil • Founder, Jancy Builders
                  </span>
                </div>
              </div>

              {/* Verified Badges */}
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="p-3 rounded-xl bg-white/5 border border-white/10 flex items-center gap-2">
                  <Award className="w-4 h-4 text-[#B78A52] flex-shrink-0" />
                  <span className="font-semibold text-slate-200">B.E. Civil Engineering</span>
                </div>
                <div className="p-3 rounded-xl bg-white/5 border border-white/10 flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span className="font-semibold text-slate-200">IS 456 Structural Code</span>
                </div>
              </div>
            </div>

            {/* Right 7 Cols: 4 Pillars & 4 Required Actions */}
            <div className="lg:col-span-7 space-y-6">
              <div>
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#B78A52] block mb-1">
                  {isTamil ? "நேர்மையான சிவில் பொறியியல் வாக்குறுதி" : "VERIFIED CIVIL ENGINEERING ETHOS"}
                </span>
                <h4 className="text-2xl font-black text-white font-sans tracking-tight">
                  {isTamil
                    ? "காகிதத்தில் அல்ல, உங்கள் வீட்டின் அடித்தளத்தில் எங்கள் தரம் தெரியும்"
                    : "True Engineering Quality, Personally Supervised on Every Site"}
                </h4>
                <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                  {isTamil
                    ? "வீடு கட்டுவது ஒரு குடும்பத்தின் வாழ்நாள் சேமிப்பு. அதை விளம்பர வார்த்தைகளால் ஏமாற்றாமல், நேர்மையான பொருட்கள் மற்றும் துல்லிய பொறியியல் கணக்கீடுகளுடன் மட்டுமே கட்டுகிறோம்."
                    : "Building a home is your family's lifetime dream. We honour your investment through uncompromising engineering standards, NABL certified concrete, and direct engineer availability."}
                </p>
              </div>

              {/* 4 Pillars Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
                {engineeringPillars.map((p, i) => (
                  <div
                    key={i}
                    className="p-3.5 rounded-xl bg-white/5 border border-white/10 space-y-1 text-xs"
                  >
                    <div className="flex items-center gap-1.5 font-bold text-white">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#B78A52] flex-shrink-0" />
                      <span>{isTamil ? p.titleTa : p.titleEn}</span>
                    </div>
                    <p className="text-[11px] text-slate-400 leading-relaxed pl-5">
                      {isTamil ? p.descTa : p.descEn}
                    </p>
                  </div>
                ))}
              </div>

              {/* 4 MANDATORY ACTIONS REQUESTED BY USER */}
              <div className="pt-6 border-t border-white/10 space-y-3">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#B78A52] block">
                  {isTamil ? "பொறியாளரைத் தொடர்பு கொள்ள:" : "DIRECT ENGINEER ACTIONS:"}
                </span>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {/* Action 1: Call Engineer */}
                  <a
                    href={`tel:${engineerInfo.phone.replace(/[\s\-\+]/g, "")}`}
                    className="inline-flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl bg-[#17191B] hover:bg-[#25282B] text-white text-xs font-bold border border-white/15 transition-all shadow-md group"
                  >
                    <Phone className="w-4 h-4 text-[#B78A52] group-hover:scale-110 transition-transform" />
                    <span>{isTamil ? "பொறியாளரை அழைக்க (+91 77082 47124)" : "Call Engineer (+91 77082 47124)"}</span>
                  </a>

                  {/* Action 2: WhatsApp Engineer */}
                  <a
                    href={`https://wa.me/917708247124?text=${encodeURIComponent(
                      isTamil
                        ? "வணக்கம் Er. ஸ்டாலின், புதிய வீடு கட்டுமானம் தொடர்பாக உங்கள் ஆலோசனை தேவைப்படுகிறது."
                        : "Vanakkam Er. Stalin, I would like to consult with you regarding our new residential construction."
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl bg-[#25D366] hover:bg-[#20ba5a] text-white text-xs font-bold transition-all shadow-md shadow-[#25D366]/20"
                  >
                    <MessageCircle className="w-4 h-4 fill-current" />
                    <span>{isTamil ? "வாட்ஸ்அப்பில் பேச" : "WhatsApp Engineer"}</span>
                  </a>

                  {/* Action 3: Visit Office */}
                  <a
                    href="#office"
                    className="inline-flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-bold border border-white/10 transition-colors"
                  >
                    <Building className="w-4 h-4 text-[#B78A52]" />
                    <span>{isTamil ? "அலுவலகத்திற்கு வருக" : "Visit Office"}</span>
                  </a>

                  {/* Action 4: Request Consultation */}
                  <button
                    onClick={onOpenAppointment}
                    className="inline-flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl bg-[#B78A52] hover:bg-[#a37742] text-slate-950 text-xs font-bold transition-all shadow-md shadow-[#B78A52]/20"
                  >
                    <Calendar className="w-4 h-4" />
                    <span>{isTamil ? "நேரடி ஆலோசனை கோருக" : "Request Consultation"}</span>
                  </button>
                </div>
              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
