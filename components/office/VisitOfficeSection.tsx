"use client";

import React, { useState } from "react";
import {
  MapPin,
  Clock,
  Phone,
  MessageCircle,
  Calendar,
  Compass,
  Building2,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Navigation,
} from "lucide-react";
import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";

interface VisitOfficeSectionProps {
  onOpenAppointmentModal?: () => void;
}

export default function VisitOfficeSection({
  onOpenAppointmentModal,
}: VisitOfficeSectionProps) {
  const { isTamil } = useLanguage();

  const office = {
    name: "Jancy Home",
    branch: isTamil ? "தலைமை அலுவலகம் & பதிவுபெற்ற முகவரி" : "Headquarters & Registered Office",
    street: "Perumal Kovil Street",
    locality: "Samugarengapuram",
    taluk: "Radhapuram Taluk",
    district: "Tirunelveli – 627112",
    state: "Tamil Nadu, India",
    phone: "+91 77082 47124",
    phoneDisplay: "+91 77082 47124",
    engineer: "Er. Sahaya Antony Stalin, B.E. (Civil)",
    mapsUrl: "https://maps.google.com/?q=8.337495,77.698087",
    embedMapUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15786.772591605335!2d77.6893322!3d8.337495!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b043329d47910ff%3A0x6b40212f45143a53!2sSamugarengapuram%2C%20Tamil%20Nadu!5e0!3m2!1sen!2sin!4v1710000000000!5m2!1sen!2sin",
    workingHours: [
      {
        days: isTamil ? "திங்கள் – சனி" : "Monday – Saturday",
        time: isTamil ? "காலை 9:00 – இரவு 7:30" : "9:00 AM – 7:30 PM",
        status: isTamil ? "வழக்கமான அலுவலக நேரம்" : "Regular Office Hours",
      },
      {
        days: isTamil ? "ஞாயிறு" : "Sunday",
        time: isTamil ? "முன் அனுமதி மூலம் மட்டுமே" : "By Prior Appointment Only",
        status: isTamil ? "திட்டமிடப்பட்ட சந்திப்புகள்" : "Scheduled Appointments Only",
      },
    ],
    features: [
      {
        titleEn: "Direct Engineer Consultation",
        titleTa: "தலைமைப் பொறியாளருடன் நேரடி சந்திப்பு",
        descEn: "Discuss your floor plans, elevation, and estimation face-to-face with Er. Stalin.",
        descTa: "வீட்டு வரைபடம் மற்றும் பட்ஜெட் குறித்து பொறியாளரிடம் நேரடியாக ஆலோசிக்கலாம்.",
      },
      {
        titleEn: "Physical Material Display",
        titleTa: "நேரடி கட்டுமானப் பொருட்கள் பார்வை",
        descEn: "Inspect Wienerberger Porotherm clay bricks, Fe550D rebar, and finishing samples.",
        descTa: "போரோதெர்ம் களிமண் செங்கல், இரும்பு கம்பிகள், மற்றும் டைல்ஸ் மாதிரிகளை நேரடியாகப் பார்க்கலாம்.",
      },
      {
        titleEn: "Approved Plan Verification",
        titleTa: "நில ஆவணங்கள் & வரைபட சரிபார்ப்பு",
        descEn: "Bring your Patta, Sale Deed, and FMB sketch for on-the-spot technical feasibility check.",
        descTa: "உங்கள் பட்டா, பத்திரம் மற்றும் புல வரைபடங்களை கொண்டுவந்து அனுமதி சாத்தியங்களை அறியலாம்.",
      },
    ],
  };

  const whatsappMessage = encodeURIComponent(
    isTamil
      ? "வணக்கம் Er. Stalin, நான் ஜான்சி பில்டர்ஸ் அலுவலகத்திற்கு வர விரும்புகிறேன். அலுவலக முகவரி மற்றும் நேரம் அறிய விரும்புகிறேன்."
      : "Hello Er. Sahaya Antony Stalin, I would like to visit the Jancy Builders office at Samugarengapuram to discuss a construction project."
  );
  const whatsappUrl = `https://wa.me/917708247124?text=${whatsappMessage}`;

  return (
    <section
      id="office"
      className="py-20 lg:py-28 bg-[#FAF8F5] text-[#17191B] relative overflow-hidden border-t border-b border-[#E2D9CC]/80 scroll-mt-20"
    >
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-14">
          <div className="inline-flex items-center gap-2 mb-3 px-3.5 py-1.5 rounded-full bg-[#B78A52]/10 border border-[#B78A52]/30">
            <span className="w-2 h-2 rounded-full bg-[#B78A52]" />
            <span className="text-xs font-mono font-bold uppercase tracking-[0.22em] text-[#B78A52]">
              {isTamil ? "நேரடி அலுவலகம்" : "PHYSICAL OFFICE & HEADQUARTERS"}
            </span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black text-[#17191B] tracking-tight font-sans">
            {isTamil ? "எங்கள் அலுவலகத்திற்கு வருக" : "Visit Our Office"}
          </h2>

          <p className="mt-3 text-sm sm:text-base text-slate-600 max-w-2xl leading-relaxed">
            {isTamil
              ? "சாமுகரெங்கபுரத்தில் அமைந்துள்ள எங்களின் தலைமை அலுவலகத்திற்கு நேரில் வாருங்கள். உங்கள் நிலத்தின் வரைபடம், பட்ஜெட் மற்றும் கட்டுமானத் தேவைகள் குறித்து Er. சகாய அந்தோணி ஸ்டாலின் அவர்களிடம் நேரடியாக ஆலோசியுங்கள்."
              : "We welcome families and property owners to our physical office in Samugarengapuram. Meet Chief Civil Engineer Er. Sahaya Antony Stalin in person to discuss floor designs, approvals, and genuine construction quotes."}
          </p>
        </div>

        {/* 2-Column Office Presentation */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Left Column (7 Cols): Verified Office Details & Actions */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Main Office Card */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E2D9CC] shadow-xl shadow-black/5 space-y-6">
              
              {/* Header inside Card */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-slate-100 gap-3">
                <div>
                  <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#B78A52] block">
                    {office.branch}
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-black text-slate-950 font-sans tracking-tight mt-0.5">
                    {office.name}
                  </h3>
                  <p className="text-xs text-slate-500 font-medium mt-0.5">
                    {isTamil ? "தலைமைப் பொறியாளர்:" : "Chief Civil Engineer:"}{" "}
                    <strong className="text-slate-800">{office.engineer}</strong>
                  </p>
                </div>

                <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-bold self-start">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>{isTamil ? "நேரடி அலுவலகம்" : "Verified Location"}</span>
                </div>
              </div>

              {/* Address & Hours Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                
                {/* Address block */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
                    <MapPin className="w-4 h-4 text-[#B78A52]" />
                    <span>{isTamil ? "அலுவலக முகவரி" : "Postal Address"}</span>
                  </div>
                  <div className="text-sm text-slate-600 leading-relaxed font-sans pl-6 border-l-2 border-[#B78A52]/30 space-y-0.5">
                    <p className="font-semibold text-slate-900">{office.name}</p>
                    <p>{office.street},</p>
                    <p>{office.locality},</p>
                    <p>{office.taluk},</p>
                    <p className="font-medium text-slate-900">{office.district},</p>
                    <p>{office.state}</p>
                  </div>
                </div>

                {/* Working hours block */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
                    <Clock className="w-4 h-4 text-[#B78A52]" />
                    <span>{isTamil ? "அலுவலக வேலை நேரம்" : "Office Working Hours"}</span>
                  </div>
                  <div className="space-y-3 pl-6 border-l-2 border-[#B78A52]/30 text-xs">
                    {office.workingHours.map((wh, idx) => (
                      <div key={idx} className="space-y-0.5">
                        <span className="font-bold text-slate-900 block">{wh.days}</span>
                        <span className="text-[#B78A52] font-semibold block">{wh.time}</span>
                        <span className="text-slate-500 text-[11px] block">{wh.status}</span>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

              {/* Action Buttons Row: 4 Working Real Actions */}
              <div className="pt-6 border-t border-slate-100 flex flex-wrap items-center gap-3">
                
                {/* 1. Get Directions */}
                <a
                  href={office.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-[#17191B] hover:bg-[#25282B] text-white text-xs font-bold shadow-md transition-all hover:scale-105 active:scale-95"
                >
                  <Navigation className="w-3.5 h-3.5 text-[#B78A52]" />
                  <span>{isTamil ? "வழிகாட்டுதலைப் பெறுங்கள்" : "Get Directions"}</span>
                </a>

                {/* 2. Call Office */}
                <a
                  href={`tel:${office.phone}`}
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-white hover:bg-slate-50 text-slate-900 border border-slate-300 text-xs font-bold shadow-sm transition-all hover:scale-105 active:scale-95"
                >
                  <Phone className="w-3.5 h-3.5 text-[#B78A52]" />
                  <span>{isTamil ? "அலுவலகத்தை அழைக்கவும்" : "Call Office"}</span>
                </a>

                {/* 3. WhatsApp */}
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-[#25D366] hover:bg-[#20ba5a] text-white text-xs font-bold shadow-md shadow-[#25D366]/20 transition-all hover:scale-105 active:scale-95"
                >
                  <MessageCircle className="w-3.5 h-3.5 fill-current" />
                  <span>{isTamil ? "வாட்ஸ்அப்" : "WhatsApp"}</span>
                </a>

                {/* 4. Book Office Visit */}
                <button
                  onClick={() => {
                    if (onOpenAppointmentModal) {
                      onOpenAppointmentModal();
                    } else {
                      const el = document.getElementById("appointment");
                      if (el) el.scrollIntoView({ behavior: "smooth" });
                    }
                  }}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#B78A52] hover:bg-[#9e743d] text-white text-xs font-bold shadow-md transition-all hover:scale-105 active:scale-95"
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{isTamil ? "அலுவலக சந்திப்பை முன்பதிவு செய்யுங்கள்" : "Book Office Visit"}</span>
                </button>

              </div>

            </div>

            {/* Why Visit Our Office 3-Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {office.features.map((feat, i) => (
                <div
                  key={i}
                  className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 border border-[#E2D9CC] space-y-1.5"
                >
                  <h4 className="text-xs font-bold text-slate-950 font-sans">
                    {isTamil ? feat.titleTa : feat.titleEn}
                  </h4>
                  <p className="text-[11px] text-slate-600 leading-relaxed">
                    {isTamil ? feat.descTa : feat.descEn}
                  </p>
                </div>
              ))}
            </div>

          </div>

          {/* Right Column (5 Cols): Live Interactive Google Map & Location Verification */}
          <div className="lg:col-span-5 space-y-5">
            
            {/* Interactive Google Map Card */}
            <div className="bg-white rounded-3xl overflow-hidden border border-[#E2D9CC] shadow-xl shadow-black/5 flex flex-col">
              
              <div className="p-4 bg-slate-900 text-white flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Compass className="w-4 h-4 text-[#B78A52]" />
                  <span className="text-xs font-bold font-mono tracking-wider">
                    {isTamil ? "கூகுள் மேப் வழித்தடம்" : "SAMUGARENGAPURAM LOCATION"}
                  </span>
                </div>
                <a
                  href={office.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[11px] font-bold text-[#E7C188] hover:underline flex items-center gap-1"
                >
                  <span>Open in Maps</span>
                  <ArrowRight className="w-3 h-3" />
                </a>
              </div>

              {/* Map Embed Container */}
              <div className="relative w-full aspect-[4/3] bg-slate-100">
                <iframe
                  title="Jancy Builders Office Location"
                  src="https://maps.google.com/maps?q=8.337495,77.698087&hl=en&z=15&output=embed"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  loading="lazy"
                  allowFullScreen
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Landmark notes under map */}
              <div className="p-5 bg-white space-y-2 border-t border-slate-100 text-xs">
                <div className="flex items-start gap-2 text-slate-700">
                  <Building2 className="w-4 h-4 text-[#B78A52] flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-slate-950 block">
                      {isTamil ? "அடையாளக் குறிப்பு (Landmark):" : "Prominent Landmark:"}
                    </span>
                    <span className="text-slate-600">
                      {isTamil
                        ? "சாமுகரெங்கபுரம் பெருமாள் கோவில் தெரு, வள்ளியூரில் இருந்து 12 கி.மீ."
                        : "Perumal Kovil Street, Samugarengapuram. Easily accessible from Valliyur and Radhapuram main road."}
                    </span>
                  </div>
                </div>

                <div className="pt-2 flex items-center justify-between text-[11px] text-slate-500">
                  <span>GPS: 8.337495° N, 77.698087° E</span>
                  <span className="text-emerald-700 font-bold">● Active Office</span>
                </div>
              </div>

            </div>

            {/* Direct Engineer Line Contact Card */}
            <div className="rounded-2xl bg-[#17191B] text-white p-5 space-y-3 shadow-lg border border-[#B78A52]/30">
              <span className="text-[10px] font-mono font-bold tracking-widest text-[#B78A52] uppercase block">
                {isTamil ? "நேரடி ஆலோசனை எண்" : "DIRECT ENGINEER ACCESS"}
              </span>
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-white text-base">Er. Sahaya Antony Stalin</h4>
                  <p className="text-xs text-slate-400">Chief Civil Engineer &amp; Founder</p>
                </div>
                <a
                  href="tel:+917708247124"
                  className="w-10 h-10 rounded-full bg-[#B78A52] text-white flex items-center justify-center hover:bg-[#9e743d] transition-colors shadow-md"
                  title="Call Now"
                >
                  <Phone className="w-4 h-4" />
                </a>
              </div>
              <p className="text-xs text-slate-300 font-mono pt-1 border-t border-white/10">
                +91 77082 47124 • stalin@jancybuilders.com
              </p>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
