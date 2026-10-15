"use client";

import React from "react";
import Image from "next/image";
import {
  Phone,
  MessageCircle,
  MapPin,
  Calendar,
  CheckCircle2,
  Award,
  BookOpen,
  Building,
  ShieldCheck,
  ArrowRight,
} from "lucide-react";
import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";

interface EngineerProfileSectionProps {
  onOpenAppointmentModal?: () => void;
  onOpenQuoteModal?: () => void;
}

export default function EngineerProfileSection({
  onOpenAppointmentModal,
  onOpenQuoteModal,
}: EngineerProfileSectionProps) {
  const { isTamil } = useLanguage();

  const engineer = {
    name: "Er. Sahaya Antony Stalin",
    qualification: "B.E. (Civil Engineering)",
    role: isTamil ? "தலைமை சிவில் பொறியாளர் & நிறுவனர்" : "Chief Civil Engineer & Founder",
    experience: isTamil ? "10+ ஆண்டுகள் கள அனுபவம்" : "10+ Years On-Site Experience",
    phone: "+91 77082 47124",
    email: "stalin@jancybuilders.com",
    office: "Jancy Home, Samugarengapuram, Tirunelveli",
    photo: "/images/fb-projects/fb-2866252757935105/image_001.jpg", // Real site supervision photo
  };

  const whatsappMessage = encodeURIComponent(
    isTamil
      ? "வணக்கம் Er. Stalin, எனது புதிய வீடு கட்டுமானம் தொடர்பாக ஆலோசனை பெற விரும்புகிறேன்."
      : "Hello Er. Sahaya Antony Stalin, I would like to consult with you regarding a new building construction project."
  );
  const whatsappUrl = `https://wa.me/917708247124?text=${whatsappMessage}`;

  const credentials = [
    {
      titleEn: "Anna University Engineering Degree",
      titleTa: "அண்ணா பல்கலைக்கழக பொறியியல் பட்டதாரி",
      descEn: "Strict adherence to IS 456 RCC design and Indian Standard building codes.",
      descTa: "இந்திய தர விதிமுறைகள் (IS 456) படி தூண்கள் மற்றும் கட்டமைப்பு வடிவமைப்பு.",
    },
    {
      titleEn: "Direct Site Supervision",
      titleTa: "நேரடி கள மேற்பார்வை",
      descEn: "No subcontractors or middle-men. Er. Stalin personally supervises every structural stage.",
      descTa: "இடைத்தரகர்கள் இல்லை. அஸ்திவாரம் முதல் தளம் வரை பொறியாளரே நேரடியாக மேற்பார்வையிடுவார்.",
    },
    {
      titleEn: "Transparent Fixed Pricing",
      titleTa: "வெளிப்படையான ஒப்பந்த விலை",
      descEn: "Itemized BOQ with zero hidden escalations throughout the construction timeline.",
      descTa: "ஒப்பந்தத்தில் குறிப்பிட்ட விலையைத் தவிர ஒரு ரூபாய் கூட இடையில் அதிகரிக்கப்படாது.",
    },
    {
      titleEn: "Soil-Tested Foundation Design",
      titleTa: "மண் பரிசோதனை செய்யப்பட்ட அடித்தளம்",
      descEn: "Safe Bearing Capacity (SBC) lab tests conduct for every plot before digging.",
      descTa: "ஒவ்வொரு நிலத்தின் மண் தரம் ஆய்வகத்தில் பரிசோதிக்கப்பட்ட பிறகே அஸ்திவாரம் இடப்படும்.",
    },
  ];

  return (
    <section
      id="engineer"
      className="py-20 lg:py-28 bg-[#17191B] text-white relative overflow-hidden scroll-mt-20 border-t border-white/10"
    >
      {/* Subtle ambient lighting */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#B78A52]/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-14">
          <div className="inline-flex items-center gap-2 mb-3 px-3.5 py-1.5 rounded-full bg-[#B78A52]/15 border border-[#B78A52]/30">
            <span className="w-2 h-2 rounded-full bg-[#B78A52]" />
            <span className="text-[11px] font-mono font-bold uppercase tracking-[0.25em] text-[#B78A52]">
              {isTamil ? "பொறியாளர் அறிமுகம்" : "CHIEF CIVIL ENGINEER"}
            </span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight font-sans">
            {isTamil ? "தலைமைப் பொறியாளருடன் நேரடித் தொடர்பு" : "Meet Chief Engineer Er. Stalin"}
          </h2>

          {/* Genuine user prompt text */}
          <p className="mt-4 text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl font-normal">
            {isTamil
              ? "வீடு கட்டுவது பற்றி சந்தேகம் இருக்கிறதா? கட்டுமான முறை, செலவு, பொருட்கள் மற்றும் வீட்டுத் திட்டம் பற்றிய விவரங்களை எங்கள் பொறியியல் குழுவிடம் கேட்டுத் தெரிந்துகொள்ளலாம்."
              : "Have questions about building your house? Our engineering team can explain the construction process, estimated costs, materials, and planning requirements."}
          </p>
        </div>

        {/* 2-Column Presentation */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left Column (5 Cols): Genuine Engineer Card with Real Project Photos */}
          <div className="lg:col-span-5">
            <div className="bg-[#1F2226] rounded-3xl p-6 sm:p-8 border border-white/10 shadow-2xl space-y-6 relative overflow-hidden">
              <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-[#B78A52]/10 rounded-full blur-3xl pointer-events-none" />

              <div className="flex items-start gap-4">
                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-slate-800 border-2 border-[#B78A52] overflow-hidden relative flex-shrink-0">
                  <Image
                    src={engineer.photo}
                    alt={engineer.name}
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="space-y-1">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#B78A52] block">
                    {engineer.role}
                  </span>
                  <h3 className="text-xl sm:text-2xl font-black text-white font-sans tracking-tight">
                    {engineer.name}
                  </h3>
                  <p className="text-xs font-mono text-slate-300 font-semibold">
                    {engineer.qualification}
                  </p>
                  <div className="pt-1 flex items-center gap-1.5 text-[11px] text-emerald-400 font-medium">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>{engineer.experience}</span>
                  </div>
                </div>
              </div>

              {/* Direct Office & Contact details */}
              <div className="pt-4 border-t border-white/10 space-y-2.5 text-xs text-slate-300">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-[#B78A52] flex-shrink-0" />
                  <span>{engineer.office}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-[#B78A52] flex-shrink-0" />
                  <span className="font-mono">{engineer.phone}</span>
                </div>
              </div>

              {/* 4 Direct Action Buttons as Requested */}
              <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {/* 1. Call Engineer */}
                <a
                  href={`tel:${engineer.phone}`}
                  className="py-3 px-4 rounded-xl bg-white hover:bg-slate-100 text-slate-950 text-xs font-bold flex items-center justify-center gap-2 transition-transform hover:scale-105 active:scale-95 shadow-md"
                >
                  <Phone className="w-3.5 h-3.5 text-[#B78A52]" />
                  <span>{isTamil ? "பொறியாளரை அழைக்க" : "Call Engineer"}</span>
                </a>

                {/* 2. WhatsApp Engineer */}
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-3 px-4 rounded-xl bg-[#25D366] hover:bg-[#20ba5a] text-white text-xs font-bold flex items-center justify-center gap-2 transition-transform hover:scale-105 active:scale-95 shadow-md"
                >
                  <MessageCircle className="w-3.5 h-3.5 fill-current" />
                  <span>{isTamil ? "வாட்ஸ்அப் பேச" : "WhatsApp Engineer"}</span>
                </a>

                {/* 3. Visit Office */}
                <a
                  href="#office"
                  className="py-3 px-4 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold flex items-center justify-center gap-2 border border-white/15 transition-transform hover:scale-105 active:scale-95"
                >
                  <Building className="w-3.5 h-3.5 text-[#B78A52]" />
                  <span>{isTamil ? "அலுவலகம் வர" : "Visit Office"}</span>
                </a>

                {/* 4. Request Consultation */}
                <button
                  onClick={() => {
                    if (onOpenAppointmentModal) onOpenAppointmentModal();
                    else {
                      const el = document.getElementById("office");
                      if (el) el.scrollIntoView({ behavior: "smooth" });
                    }
                  }}
                  className="py-3 px-4 rounded-xl bg-[#B78A52] hover:bg-[#9e743d] text-white text-xs font-bold flex items-center justify-center gap-2 transition-transform hover:scale-105 active:scale-95 shadow-md"
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{isTamil ? "ஆலோசனை பெற" : "Request Consultation"}</span>
                </button>
              </div>

            </div>
          </div>

          {/* Right Column (7 Cols): Verified Civil Engineering Credentials */}
          <div className="lg:col-span-7 space-y-5">
            <span className="text-xs font-mono font-bold tracking-wider text-[#B78A52] uppercase block">
              {isTamil ? "பொறியியல் கொள்கைகள் & உத்தரவாதம்" : "CIVIL ENGINEERING STANDARDS & GUARANTEES"}
            </span>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {credentials.map((c, i) => (
                <div
                  key={i}
                  className="p-5 rounded-2xl bg-[#1F2226] border border-white/10 space-y-2 hover:border-[#B78A52]/40 transition-colors"
                >
                  <div className="w-8 h-8 rounded-xl bg-[#B78A52]/15 text-[#B78A52] flex items-center justify-center">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <h4 className="text-sm font-bold text-white font-sans">
                    {isTamil ? c.titleTa : c.titleEn}
                  </h4>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {isTamil ? c.descTa : c.descEn}
                  </p>
                </div>
              ))}
            </div>

            {/* Note regarding on-site visits */}
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-xs text-slate-300 flex items-start gap-3">
              <Award className="w-4 h-4 text-[#B78A52] flex-shrink-0 mt-0.5" />
              <p className="leading-relaxed">
                {isTamil
                  ? "திருநெல்வேலி, வள்ளியூர், நாங்குநேரி, திசையன்விளை, மற்றும் ராதாபுரம் சுற்றுவட்டாரப் பகுதிகளில் நேரில் வந்து இலவச நில ஆய்வு மேற்கொள்ளப்படும்."
                  : "On-site plot feasibility surveys are conducted personally by Er. Stalin across Tirunelveli, Valliyur, Nanguneri, Thisayanvilai, and Radhapuram."}
              </p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
