"use client";

import React from "react";
import {
  MapPin,
  Clock,
  Phone,
  MessageCircle,
  Calendar,
  Navigation,
  CheckCircle2,
  Building,
  ShieldCheck,
  ArrowRight,
} from "lucide-react";
import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import BlurText from "@/components/motion/BlurText";

interface VisitOfficeSectionProps {
  onOpenAppointmentModal?: () => void;
}

export default function VisitOfficeSection({
  onOpenAppointmentModal,
}: VisitOfficeSectionProps) {
  const { isTamil } = useLanguage();

  const office = {
    name: "Jancy Home",
    branchEn: "Headquarters & Registered Engineering Office",
    branchTa: "தலைமை அலுவலகம் & பதிவுபெற்ற முகவரி",
    street: "Perumal Kovil Street",
    locality: "Samugarengapuram",
    taluk: "Radhapuram Taluk",
    district: "Tirunelveli – 627112",
    state: "Tamil Nadu, India",
    phone: "+91 77082 47124",
    mapsUrl: "https://maps.google.com/?q=8.337495,77.698087",
    embedMapUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15786.772591605335!2d77.6893322!3d8.337495!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b043329d47910ff%3A0x6b40212f45143a53!2sSamugarengapuram%2C%20Tamil%20Nadu!5e0!3m2!1sen!2sin!4v1710000000000!5m2!1sen!2sin",
    workingHours: [
      {
        daysEn: "Monday – Saturday",
        daysTa: "திங்கள் – சனி",
        timeEn: "9:00 AM – 7:30 PM",
        timeTa: "காலை 9:00 – இரவு 7:30",
        noteEn: "Regular Office Hours",
        noteTa: "வழக்கமான அலுவலக நேரம்",
      },
      {
        daysEn: "Sunday",
        daysTa: "ஞாயிறு",
        timeEn: "By Prior Appointment Only",
        timeTa: "முன் அனுமதி மூலம் மட்டுமே",
        noteEn: "Dedicated Consultations",
        noteTa: "திட்டமிடப்பட்ட சந்திப்புகள்",
      },
    ],
  };

  const whatsappMessage = encodeURIComponent(
    isTamil
      ? "வணக்கம் Er. Stalin, நான் ஜான்சி பில்டர்ஸ் சாமுகரெங்கபுரம் அலுவலகத்திற்கு நேரில் வர விரும்புகிறேன்."
      : "Hello Er. Sahaya Antony Stalin, I would like to visit the Jancy Builders office at Samugarengapuram to discuss a construction project."
  );
  const whatsappUrl = `https://wa.me/917708247124?text=${whatsappMessage}`;

  return (
    <section
      id="office"
      className="w-full bg-black py-24 sm:py-32 text-white relative overflow-hidden scroll-mt-20 font-body border-t border-white/10"
    >
      {/* Background Ambient Glow */}
      <div className="absolute top-1/3 right-10 w-96 h-96 bg-[#C9A46B]/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-14 space-y-3 text-left">
          <div className="inline-flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C9A46B]" />
            <span className="text-xs font-mono font-bold uppercase tracking-[0.25em] text-[#C9A46B]">
              {isTamil ? "// நேரடி தலைமை அலுவலகம்" : "// PHYSICAL OFFICE & VISITS"}
            </span>
          </div>

          {isTamil ? (
            <BlurText
              text="எங்கள் அலுவலகத்திற்கு வருக."
              as="h2"
              isTamil={true}
              className="text-3xl sm:text-5xl font-tamil font-black text-white tracking-tight"
            />
          ) : (
            <BlurText
              text="Visit Our Physical Office."
              as="h2"
              italic={true}
              className="text-4xl sm:text-6xl font-heading font-normal text-white tracking-tight leading-[1.08]"
            />
          )}

          <p className="text-sm sm:text-base text-white/70 max-w-2xl leading-relaxed">
            {isTamil
              ? "சாமுகரெங்கபுரத்தில் அமைந்துள்ள எங்களின் தலைமை அலுவலகத்திற்கு நேரில் வாருங்கள். உங்கள் நிலத்தின் வரைபடம், பட்ஜெட் மற்றும் கட்டுமானப் பொருட்கள் குறித்து Er. சகாய அந்தோணி ஸ்டாலின் அவர்களிடம் நேரடியாக ஆலோசியுங்கள்."
              : "We invite families and property owners to visit our physical headquarters in Samugarengapuram. Meet Chief Civil Engineer Er. Sahaya Antony Stalin face-to-face for honest, milestone-driven construction guidance."}
          </p>
        </div>

        {/* 2-Column Spread: Office Details & Live Map */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Left Column (6 Cols): Verified Office Information */}
          <div className="lg:col-span-6 space-y-6 text-left">
            
            {/* Main Office Card */}
            <div className="p-6 sm:p-8 rounded-3xl liquid-glass-strong border border-white/15 space-y-6">
              
              <div className="flex items-start justify-between gap-4 pb-4 border-b border-white/10">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-[#C9A46B] font-bold block">
                    {isTamil ? office.branchTa : office.branchEn}
                  </span>
                  <h3 className="text-2xl font-heading italic text-white mt-1">
                    {office.name}
                  </h3>
                  <p className="text-xs text-white/60 font-mono mt-0.5">
                    Samugarengapuram, Tirunelveli District
                  </p>
                </div>

                <div className="w-10 h-10 rounded-xl liquid-glass flex items-center justify-center text-[#C9A46B] flex-shrink-0">
                  <Building className="w-5 h-5" />
                </div>
              </div>

              {/* Physical Address */}
              <div className="space-y-1.5 text-xs">
                <span className="text-[11px] font-mono text-white/50 uppercase tracking-wider block">
                  {isTamil ? "அலுவலக முகவரி:" : "POSTAL ADDRESS:"}
                </span>
                <p className="text-white/90 font-medium leading-relaxed">
                  {office.name}, {office.street},<br />
                  {office.locality}, {office.taluk},<br />
                  {office.district}, {office.state}
                </p>
              </div>

              {/* Verified Working Hours */}
              <div className="space-y-2 pt-2 border-t border-white/10 text-xs">
                <div className="flex items-center gap-2 text-white/50 text-[11px] font-mono uppercase tracking-wider">
                  <Clock className="w-3.5 h-3.5 text-[#C9A46B]" />
                  <span>{isTamil ? "அலுவலக நேரம்:" : "OFFICE HOURS (NOT 24 HOURS):"}</span>
                </div>

                {office.workingHours.map((wh, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-xl liquid-glass flex items-center justify-between text-xs"
                  >
                    <div>
                      <span className="font-semibold text-white block">
                        {isTamil ? wh.daysTa : wh.daysEn}
                      </span>
                      <span className="text-[10px] text-white/50 font-mono">
                        {isTamil ? wh.noteTa : wh.noteEn}
                      </span>
                    </div>
                    <span className="font-mono text-[#E2C496] font-bold">
                      {isTamil ? wh.timeTa : wh.timeEn}
                    </span>
                  </div>
                ))}
              </div>

              {/* Direct Phone Line */}
              <div className="pt-2 border-t border-white/10 flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-mono text-white/50 uppercase block">
                    {isTamil ? "பொறியாளர் நேரடி எண்:" : "CHIEF ENGINEER DIRECT LINE:"}
                  </span>
                  <a
                    href="tel:+917708247124"
                    className="text-base font-mono font-bold text-white hover:text-[#C9A46B] transition-colors"
                  >
                    +91 77082 47124
                  </a>
                </div>
                <span className="text-[11px] text-emerald-400 font-mono flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Verified Line</span>
                </span>
              </div>

            </div>

            {/* 4 Working Action Buttons (Section 13) */}
            <div className="grid grid-cols-2 gap-3 pt-1">
              {/* Button 1: Get Directions */}
              <a
                href={office.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="py-3.5 px-4 rounded-2xl liquid-glass hover:bg-white/10 text-white text-xs font-semibold flex items-center justify-center gap-2 transition-all hover:scale-105 active:scale-95"
              >
                <Navigation className="w-4 h-4 text-[#C9A46B]" />
                <span>{isTamil ? "வழிகாட்டுதல்" : "Get Directions"}</span>
              </a>

              {/* Button 2: Call Office */}
              <a
                href="tel:+917708247124"
                className="py-3.5 px-4 rounded-2xl liquid-glass hover:bg-white/10 text-white text-xs font-semibold flex items-center justify-center gap-2 transition-all hover:scale-105 active:scale-95"
              >
                <Phone className="w-4 h-4 text-[#C9A46B]" />
                <span>{isTamil ? "அழைக்க" : "Call Office"}</span>
              </a>

              {/* Button 3: Book Office Visit (Triggers Appointment Modal) */}
              <button
                onClick={onOpenAppointmentModal}
                className="py-3.5 px-4 rounded-2xl bg-white hover:bg-[#E2C496] text-black text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all hover:scale-105 active:scale-95 shadow-lg"
              >
                <Calendar className="w-4 h-4" />
                <span>{isTamil ? "நேரடி முன்பதிவு" : "Book Office Visit"}</span>
              </button>

              {/* Button 4: WhatsApp */}
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="py-3.5 px-4 rounded-2xl bg-[#25D366]/20 hover:bg-[#25D366]/30 text-[#25D366] border border-[#25D366]/30 text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all hover:scale-105 active:scale-95"
              >
                <MessageCircle className="w-4 h-4 fill-current" />
                <span>WhatsApp</span>
              </a>
            </div>

          </div>

          {/* Right Column (6 Cols): Embedded Google Maps Location */}
          <div className="lg:col-span-6 space-y-4">
            <div className="rounded-3xl overflow-hidden liquid-glass-strong border border-white/20 p-2 shadow-2xl relative">
              <div className="relative aspect-[4/3] sm:aspect-[16/11] w-full rounded-2xl overflow-hidden bg-zinc-900">
                <iframe
                  title="Jancy Builders Samugarengapuram Location"
                  src={office.embedMapUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0, filter: "invert(90%) hue-rotate(180deg) contrast(95%)" }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* GPS Coordinates Tag */}
            <div className="p-4 rounded-2xl liquid-glass flex items-center justify-between text-xs font-mono text-white/70">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#C9A46B]" />
                <span>GPS: 8.337495, 77.698087</span>
              </div>
              <a
                href={office.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#C9A46B] hover:underline"
              >
                Open Google Maps &rarr;
              </a>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
