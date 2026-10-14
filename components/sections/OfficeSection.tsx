"use client";

import React from "react";
import Image from "next/image";
import {
  Building,
  MapPin,
  Clock,
  Phone,
  MessageCircle,
  Calendar,
  Navigation,
  ExternalLink,
  ShieldCheck,
  CheckCircle2,
  Users,
} from "lucide-react";
import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";

interface OfficeSectionProps {
  onOpenAppointment: () => void;
}

export default function OfficeSection({ onOpenAppointment }: OfficeSectionProps) {
  const { isTamil } = useLanguage();

  const officeAddress = {
    name: "Jancy Home",
    street: "Perumal Kovil Street",
    village: "Samugarengapuram",
    district: "Tirunelveli – 627112",
    state: "Tamil Nadu, India",
    phone: "+91 77082 47124",
    coordinates: "8.337495, 77.698087",
    mapUrl: "https://www.google.com/maps/search/?api=1&query=8.337495,77.698087",
  };

  const workingHours = [
    {
      daysEn: "Monday – Saturday",
      daysTa: "திங்கள் – சனிக்கிழமை",
      hours: "9:00 AM – 7:30 PM",
      status: "open",
    },
    {
      daysEn: "Sunday",
      daysTa: "ஞாயிற்றுக்கிழமை",
      hoursEn: "By Prior Appointment Only",
      hoursTa: "முன் அனுமதி மூலம் மட்டும்",
      status: "appointment",
    },
  ];

  return (
    <section
      id="office"
      className="py-20 lg:py-28 bg-[#FBF9F5] text-slate-900 relative overflow-hidden border-t border-slate-200 scroll-mt-24"
    >
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 mb-3 px-3.5 py-1.5 rounded-full bg-[#B78A52]/10 border border-[#B78A52]/30">
            <Building className="w-3.5 h-3.5 text-[#B78A52]" />
            <span className="text-[11px] font-mono font-bold uppercase tracking-[0.25em] text-[#B78A52]">
              {isTamil ? "நேரடி அலுவலகம்" : "PHYSICAL OFFICE & CONSULTATION"}
            </span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black text-[#17191B] tracking-tight font-sans">
            {isTamil ? "எங்கள் அலுவலகத்திற்கு வருக" : "Visit Our Office"}
          </h2>

          <p className="mt-3 text-sm sm:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed">
            {isTamil
              ? "சாமுகரெங்கபுரம் அலுவலகத்தில் தலைமை சிவில் பொறியாளர் Er. சகாய அந்தோணி ஸ்டாலின் அவர்களை நேரில் சந்தித்து, உங்கள் வீட்டு வரைபடம் மற்றும் மதிப்பீடுகளைப் பற்றி விரிவாக ஆலோசிக்கலாம்."
              : "Meet Chief Civil Engineer Er. Sahaya Antony Stalin personally at our Samugarengapuram headquarters to discuss your architectural floor plan, structural design, and transparent budget."}
          </p>
        </div>

        {/* 2-Column Office Presentation Card */}
        <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xl overflow-hidden mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-12">
            
            {/* Left 7 Columns: Verified Office Information & Working Hours */}
            <div className="lg:col-span-7 p-6 sm:p-10 lg:p-12 space-y-8 flex flex-col justify-between">
              <div className="space-y-6">
                
                {/* Office Name & Badge */}
                <div className="flex items-start justify-between flex-wrap gap-4">
                  <div>
                    <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#B78A52] block">
                      OFFICIAL HEADQUARTERS
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-black text-[#17191B] font-sans mt-0.5">
                      {officeAddress.name}
                    </h3>
                  </div>

                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span>{isTamil ? "உறுதிப்படுத்தப்பட்ட அலுவலகம்" : "Verified Location"}</span>
                  </div>
                </div>

                {/* Address block */}
                <div className="p-4 sm:p-5 rounded-2xl bg-[#F8F6F1] border border-slate-200/80 flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 text-[#B78A52] flex items-center justify-center flex-shrink-0 shadow-sm mt-0.5">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                      {isTamil ? "அலுவலக முகவரி" : "Postal Address"}
                    </h4>
                    <p className="text-sm font-semibold text-slate-900 leading-relaxed mt-1">
                      {officeAddress.name}, {officeAddress.street},<br />
                      {officeAddress.village},<br />
                      {officeAddress.district}, {officeAddress.state}.
                    </p>
                  </div>
                </div>

                {/* Confirmed Working Hours */}
                <div className="p-4 sm:p-5 rounded-2xl bg-[#F8F6F1] border border-slate-200/80 space-y-3">
                  <div className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-wider">
                    <Clock className="w-4 h-4 text-[#B78A52]" />
                    <span>{isTamil ? "அலுவலக வேலை நேரம்" : "Confirmed Working Hours"}</span>
                  </div>

                  <div className="space-y-2 text-xs">
                    <div className="flex items-center justify-between py-1.5 border-b border-slate-200">
                      <span className="font-semibold text-slate-800">
                        {isTamil ? "திங்கள் – சனிக்கிழமை" : "Monday – Saturday"}
                      </span>
                      <span className="font-mono font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                        9:00 AM – 7:30 PM
                      </span>
                    </div>

                    <div className="flex items-center justify-between py-1.5">
                      <span className="font-semibold text-slate-800">
                        {isTamil ? "ஞாயிற்றுக்கிழமை" : "Sunday"}
                      </span>
                      <span className="font-mono font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                        {isTamil ? "முன் அனுமதி மூலம் மட்டும்" : "By Prior Appointment Only"}
                      </span>
                    </div>
                  </div>

                  <p className="text-[11px] text-slate-500 italic pt-1">
                    {isTamil
                      ? "*குறிப்பு: வாடிக்கையாளர்களின் நேரத்தை மதிக்கிறோம். போலி விளம்பரங்கள் இன்றி உண்மையான அலுவலக நேரங்கள் மட்டுமே இங்கே குறிப்பிடப்பட்டுள்ளன."
                      : "*Notice: We respect your time. Actual confirmed office hours are stated — no misleading 24/7 claims."}
                  </p>
                </div>

                {/* Engineer In-charge Badge */}
                <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-white border border-slate-200">
                  <div className="w-10 h-10 rounded-full bg-[#17191B] text-[#B78A52] flex items-center justify-center font-bold text-sm">
                    SA
                  </div>
                  <div>
                    <h5 className="text-xs font-bold text-slate-900">
                      Er. Sahaya Antony Stalin, B.E. (Civil)
                    </h5>
                    <p className="text-[11px] text-slate-500">
                      {isTamil ? "தலைமை சிவில் பொறியாளர் & நிறுவனர்" : "Chief Civil Engineer & Founder"}
                    </p>
                  </div>
                </div>
              </div>

              {/* 4 MANDATORY WORKING BUTTONS */}
              <div className="pt-4 border-t border-slate-200 space-y-3">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400 block">
                  {isTamil ? "அலுவலக தொடர்பு வழிகள்:" : "QUICK OFFICE ACTIONS:"}
                </span>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {/* Button 1: Get Directions */}
                  <a
                    href={officeAddress.mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-[#17191B] hover:bg-[#25282B] text-white text-xs font-bold transition-all shadow-md group"
                  >
                    <Navigation className="w-4 h-4 text-[#B78A52] group-hover:rotate-45 transition-transform" />
                    <span>{isTamil ? "வழிகாட்டுதலைப் பெறுங்கள்" : "Get Directions"}</span>
                    <ExternalLink className="w-3.5 h-3.5 opacity-60" />
                  </a>

                  {/* Button 2: Call Office */}
                  <a
                    href={`tel:${officeAddress.phone.replace(/[\s\-\+]/g, "")}`}
                    className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-900 text-xs font-bold transition-all border border-slate-200"
                  >
                    <Phone className="w-4 h-4 text-[#B78A52]" />
                    <span>{isTamil ? "அலுவலகத்தை அழைக்கவும்" : "Call Office (+91 77082 47124)"}</span>
                  </a>

                  {/* Button 3: WhatsApp */}
                  <a
                    href={`https://wa.me/917708247124?text=${encodeURIComponent(
                      isTamil
                        ? "வணக்கம் ஜான்சி பில்டர்ஸ், சாமுகரெங்கபுரம் அலுவலகத்தில் நேரில் சந்தித்து பேச விரும்புகிறேன்."
                        : "Hello Jancy Builders, I would like to visit your Samugarengapuram office for a consultation."
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-[#25D366] hover:bg-[#20ba5a] text-white text-xs font-bold transition-all shadow-md shadow-[#25D366]/20"
                  >
                    <MessageCircle className="w-4 h-4 fill-current" />
                    <span>{isTamil ? "வாட்ஸ்அப் வழியாக பேச" : "WhatsApp (+91 77082 47124)"}</span>
                  </a>

                  {/* Button 4: Book Office Visit */}
                  <button
                    onClick={onOpenAppointment}
                    className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-[#B78A52] hover:bg-[#a37742] text-slate-950 text-xs font-bold transition-all shadow-md shadow-[#B78A52]/20"
                  >
                    <Calendar className="w-4 h-4" />
                    <span>{isTamil ? "அலுவலக சந்திப்பை முன்பதிவு செய்யுங்கள்" : "Book Office Visit"}</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Right 5 Columns: Interactive Map / Coordinates / Site Photos */}
            <div className="lg:col-span-5 bg-slate-900 text-white p-6 sm:p-10 flex flex-col justify-between relative overflow-hidden border-t lg:border-t-0 lg:border-l border-slate-800">
              {/* Map Preview Container */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#B78A52]">
                    <MapPin className="w-4 h-4" />
                    <span>COORDINATES: {officeAddress.coordinates}</span>
                  </div>
                  <span className="text-[10px] text-slate-400 font-mono">TIRUNELVELI DT</span>
                </div>

                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-white/10 shadow-lg group">
                  <Image
                    src="/images/hero-sunset-villa.jpg"
                    alt="Jancy Builders Office & Construction Landmark"
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex flex-col justify-end p-4">
                    <span className="text-xs font-bold text-white">
                      Jancy Home — Samugarengapuram
                    </span>
                    <span className="text-[11px] text-slate-300">
                      Tirunelveli – Kanyakumari Highway Access
                    </span>
                  </div>
                </div>

                {/* Surrounding Landmark Locations Served */}
                <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-2 text-xs">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400 block">
                    {isTamil ? "எங்கள் சேவையின் முக்கிய பகுதிகள்:" : "REGIONS SERVED FROM THIS OFFICE:"}
                  </span>
                  <div className="flex flex-wrap gap-1.5 text-[11px]">
                    {[
                      "Samugarengapuram",
                      "Valliyur",
                      "Tirunelveli",
                      "Durainagar",
                      "Silathikulam",
                      "Kavalkinaru",
                      "Palayamkottai",
                    ].map((loc) => (
                      <span
                        key={loc}
                        className="px-2.5 py-1 rounded-full bg-white/10 text-slate-300 border border-white/10"
                      >
                        {loc}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Direct Map Open Button */}
              <div className="pt-6">
                <a
                  href={officeAddress.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold flex items-center justify-center gap-2 border border-white/15 transition-colors"
                >
                  <Navigation className="w-4 h-4 text-[#B78A52]" />
                  <span>{isTamil ? "கூகிள் மேப்ஸில் துல்லிய இருப்பிடத்தைக் காண்க" : "Open in Google Maps App"}</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
