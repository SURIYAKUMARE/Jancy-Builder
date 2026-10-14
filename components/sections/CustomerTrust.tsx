"use client";

import React from "react";
import {
  FileCheck2,
  Receipt,
  Award,
  CalendarCheck,
  Building,
  ShieldCheck,
  Eye,
  Scale,
  KeyRound,
  CheckCircle2,
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function CustomerTrust() {
  const { isTamil } = useLanguage();

  const trustItems = [
    {
      icon: FileCheck2,
      titleEn: "1. Written Construction Agreement",
      titleTa: "1. எழுத்துப்பூர்வமான ஒப்பந்தம்",
      descEn:
        "Never begin without a legally stamped bilateral contract. It must clearly define every room size, plastering thickness, brand names, and agreed price.",
      descTa:
        "வாய்வழியாகப் பேசாமல், வழக்கறிஞர் மூலம் பதிவு செய்யப்பட்ட தெளிவான ஒப்பந்தப் பத்திரம் போடுவது உங்கள் பணத்திற்கும் காலத்திற்கும் முழு பாதுகாப்பு.",
    },
    {
      icon: Receipt,
      titleEn: "2. Detailed Bill of Quantities (BOQ)",
      titleTa: "2. விரிவான பொருட்கள் பட்டியல் (BOQ)",
      descEn:
        "Every single material—from the steel diameter to the floor tile sq.ft allowance—must be itemized so there are zero surprise costs later.",
      descTa:
        "எந்த கம்பி, எந்த சிமெண்ட், எவ்வளவு விலை கொண்ட டைல்ஸ் பயன்படுத்தப்படும் என்பதை தொடக்கத்திலேயே எழுத்துப்பூர்வமாக பட்டியலிட வேண்டும்.",
    },
    {
      icon: CalendarCheck,
      titleEn: "3. Milestone-Linked Payment Schedule",
      titleTa: "3. பணி சார்ந்த தவணை முறை பணம்",
      descEn:
        "Payments should be strictly tied to completed physical stages (e.g. Footing complete, Roof slab cast, Plastering done)—never on vague calendar dates.",
      descTa:
        "மாதந்தோறும் பணம் கொடுப்பதற்குப் பதிலாக, அஸ்திவாரம் முடிந்ததும் ஒரு தவணை, கூரை போட்டதும் ஒரு தவணை என வேலை முடிந்த பிறகே பணம் தர வேண்டும்.",
    },
    {
      icon: Award,
      titleEn: "4. Explicit Material Brands Locked",
      titleTa: "4. பிராண்டுகள் மற்றும் தரம் உறுதி",
      descEn:
        "Your contract must name specific brands (e.g. TATA Tiscon, UltraTech, Wienerberger Porotherm, Jaquar) with no sneaky 'or equivalent' downgrades.",
      descTa:
        "ஒப்பந்தத்தில் குறிப்பிட்ட அதே தரமான பிராண்ட் பொருட்கள் மட்டுமே தளத்தில் பயன்படுத்தப்படுவதை நீங்களே நேரடியாக சரிபார்க்கலாம்.",
    },
    {
      icon: Eye,
      titleEn: "5. Daily Engineering Supervision",
      titleTa: "5. பொறியாளரின் நேரடி மேற்பார்வை",
      descEn:
        "A degree-qualified civil engineer must verify rebar spacing, concrete slump, and curing water logs on-site—not just contract labor.",
      descTa:
        "கொத்தனார் மட்டுமே வேலை செய்யாமல், படித்த சிவில் இன்ஜினியர் தளத்தில் நின்று அளவுகளையும் தரத்தையும் தினமும் கண்காணிக்க வேண்டும்.",
    },
    {
      icon: Scale,
      titleEn: "6. Clear Policy on Plan Changes",
      titleTa: "6. கூடுதல் செலவுகள் பற்றிய தெளிவு",
      descEn:
        "If you decide to add a balcony or upgrade tiles mid-way, the exact cost variation must be calculated and approved in writing BEFORE execution.",
      descTa:
        "வேலையின் நடுவே நீங்கள் ஏதேனும் மாற்றங்கள் செய்ய விரும்பினால், அதற்கு எவ்வளவு செலவாகும் என்பதை முன்பே பேசி ஒப்புதல் பெற்ற பிறகே தொடங்க வேண்டும்.",
    },
    {
      icon: ShieldCheck,
      titleEn: "7. Zero Hidden Cost Escalations",
      titleTa: "7. விலை ஏற்றம் இல்லாத உறுதிமொழி",
      descEn:
        "Market steel or cement price fluctuations should not be passed to you once a fixed turnkey contract rate has been signed.",
      descTa:
        "சந்தையில் கம்பி, சிமெண்ட் விலை ஏறினாலும், கையெழுத்திட்ட ஒப்பந்த விலையிலேயே வீடு கட்டி முடிக்கப்படும் என்ற உறுதிமொழி.",
    },
    {
      icon: KeyRound,
      titleEn: "8. 150-Point Handover Audit & Warranties",
      titleTa: "8. இறுதி தணிக்கை மற்றும் உத்தரவாதம்",
      descEn:
        "Before ceremonial key handover, every tap, door lock, socket, and slope is audited, and formal structural warranty papers are handed over.",
      descTa:
        "சாவி கொடுப்பதற்கு முன் ஒவ்வொரு பைப்பும் ஸ்விட்ச்சும் சரியாக வேலை செய்கிறதா என பரிசோதித்து, 15 ஆண்டு வாரண்டி பத்திரத்துடன் ஒப்படைக்கப்படும்.",
    },
  ];

  return (
    <section id="trust" className="py-20 lg:py-28 bg-white text-[#202124] relative overflow-hidden border-t border-[#E2D9CC] scroll-mt-24">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 mb-3 px-3.5 py-1.5 rounded-full bg-[#B78A52]/10 border border-[#B78A52]/30">
            <span className="w-2 h-2 rounded-full bg-[#B78A52] animate-pulse" />
            <span className="text-[11px] font-mono font-bold uppercase tracking-[0.25em] text-[#B78A52]">
              {isTamil ? "வாடிக்கையாளர் பாதுகாப்பு & உரிமைகள்" : "CUSTOMER TRUST & TRANSPARENCY"}
            </span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black text-[#17191B] tracking-tight font-sans">
            {isTamil ? "வீடு கட்டுவதற்கு முன் தெரிந்துகொள்ள வேண்டியவை" : "What to Know Before Starting Construction"}
          </h2>

          <p className="mt-3 text-sm sm:text-base text-[#55585D] max-w-2xl mx-auto leading-relaxed">
            {isTamil
              ? "வீடு கட்டுவது உங்கள் வாழ்நாள் சேமிப்பு. எந்தவொரு பொறியாளர் அல்லது பில்டரிடமும் நீங்கள் எதிர்பார்க்க வேண்டிய அடிப்படை உரிமைகள் மற்றும் பாதுகாப்பு நடைமுறைகள் இதோ."
              : "Building a home is your life's dream. Here are the essential protections every family should verify before signing a contract or handing over an advance."}
          </p>
        </div>

        {/* 8 Clean Transparency Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {trustItems.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="p-6 rounded-3xl bg-[#F8F6F1] border border-[#E2D9CC] hover:border-[#B78A52]/50 hover:bg-white transition-all duration-300 shadow-sm flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-[#B78A52]/15 text-[#B78A52] flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6" />
                  </div>

                  <h3 className="text-base font-bold text-[#17191B] mb-2 font-sans">
                    {isTamil ? item.titleTa : item.titleEn}
                  </h3>

                  <p className="text-xs text-[#55585D] leading-relaxed">
                    {isTamil ? item.descTa : item.descEn}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-[#E2D9CC]/40 flex items-center gap-1.5 text-[11px] font-mono text-[#B78A52] font-semibold">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>{isTamil ? "ஜான்சி பில்டர்ஸ் வழக்கம்" : "Jancy Builders Standard"}</span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
