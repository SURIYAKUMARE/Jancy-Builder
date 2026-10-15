"use client";

import React from "react";
import Image from "next/image";
import {
  Phone,
  MessageCircle,
  Calendar,
  CheckCircle2,
  Award,
  ShieldCheck,
  Building,
  ArrowRight,
  MapPin,
} from "lucide-react";
import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import BlurText from "@/components/motion/BlurText";

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
    roleEn: "Chief Civil Engineer & Founder",
    roleTa: "தலைமை சிவில் பொறியாளர் & நிறுவனர்",
    experienceEn: "10+ Years On-Site Civil Engineering Excellence",
    experienceTa: "10+ ஆண்டுகள் களப் பொறியியல் அனுபவம்",
    phone: "+91 77082 47124",
    office: "Jancy Home, Samugarengapuram, Tirunelveli – 627112",
    photo: "/images/fb-projects/fb-2866252757935105/image_001.jpg",
  };

  const whatsappMessage = encodeURIComponent(
    isTamil
      ? "வணக்கம் Er. Stalin, புதிய வீடு கட்டுமானம் தொடர்பாக தங்களிடம் நேரடியாக ஆலோசனை பெற விரும்புகிறேன்."
      : "Hello Er. Sahaya Antony Stalin, I would like to consult with you directly regarding my new house construction project."
  );
  const whatsappUrl = `https://wa.me/917708247124?text=${whatsappMessage}`;

  const pillars = [
    {
      titleEn: "Anna University Civil Graduate",
      titleTa: "அண்ணா பல்கலைக்கழக பொறியியல் பட்டதாரி",
      descEn: "Strict adherence to Indian Standard building codes (IS 456) and seismic ductile detailing.",
      descTa: "இந்திய தர நிர்ணய விதிமுறைகள் (IS 456) படி நிலநடுக்கத்தை தாங்கும் தூண்கள் மற்றும் கட்டமைப்பு.",
    },
    {
      titleEn: "100% Direct Site Supervision",
      titleTa: "பொறியாளர் நேரடி கள மேற்பார்வை",
      descEn: "Zero middle-men or sub-contractors. Er. Stalin personally inspects foundation, rebar tying, and slab casting.",
      descTa: "இடைத்தரகர்கள் இல்லை. அஸ்திவாரம், கம்பி கட்டுதல் முதல் கான்கிரீட் தளம் வரை பொறியாளரே நேரடியாக மேற்பார்வையிடுவார்.",
    },
    {
      titleEn: "Transparent Itemized BOQ",
      titleTa: "வெளிப்படையான பட்ஜெட் ஒப்பந்தம்",
      descEn: "Every rupee accounted for with zero surprise cost escalations throughout construction.",
      descTa: "ஒப்பந்தத்தில் குறிப்பிட்ட விலையைத் தவிர ஒரு ரூபாய் கூட இடையில் அதிகரிக்கப்படாது.",
    },
    {
      titleEn: "Laboratory-Tested Materials",
      titleTa: "ஆய்வக பரிசோதனை செய்யப்பட்ட பொருட்கள்",
      descEn: "Soil Safe Bearing Capacity (SBC) tests and cube compressive strength tests for every project.",
      descTa: "ஒவ்வொரு வீட்டிற்கும் மண் தரம் மற்றும் கான்கிரீட் உறுதித்தன்மை ஆய்வகத்தில் சோதிக்கப்படும்.",
    },
  ];

  return (
    <section
      id="engineer"
      className="w-full bg-black py-24 sm:py-32 text-white relative overflow-hidden scroll-mt-20 font-body border-t border-white/10"
    >
      {/* Background Ambient Glows */}
      <div className="absolute top-1/3 left-0 w-96 h-96 bg-[#C9A46B]/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Label */}
        <div className="inline-flex items-center gap-2 mb-3">
          <span className="w-1.5 h-1.5 rounded-full bg-[#C9A46B]" />
          <span className="text-xs font-mono font-bold uppercase tracking-[0.25em] text-[#C9A46B]">
            {isTamil ? "// தலைமைப் பொறியாளர்" : "// LEADERSHIP & INTEGRITY"}
          </span>
        </div>

        {/* Section Heading */}
        <div className="mb-14">
          {isTamil ? (
            <BlurText
              text="தலைமை சிவில் பொறியாளருடன் நேரடித் தொடர்பு"
              as="h2"
              isTamil={true}
              className="text-3xl sm:text-5xl font-tamil font-black text-white tracking-tight"
            />
          ) : (
            <BlurText
              text="Meet Chief Civil Engineer Er. Stalin."
              as="h2"
              italic={true}
              className="text-4xl sm:text-6xl font-heading font-normal text-white tracking-tight leading-[1.08]"
            />
          )}
        </div>

        {/* Split Screen Layout (Section 10) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left Column (5 Cols): Large Genuine Engineer Site Photo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-5 relative"
          >
            <div className="relative rounded-[1.5rem] overflow-hidden liquid-glass-strong border border-white/20 p-2 shadow-2xl">
              <div className="relative aspect-[4/5] w-full rounded-2xl overflow-hidden bg-zinc-900">
                <Image
                  src={engineer.photo}
                  alt={engineer.name}
                  fill
                  priority
                  className="object-cover object-top hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />

                {/* Floating On-Site Verification Badge */}
                <div className="absolute bottom-4 inset-x-4 p-3.5 rounded-xl liquid-glass backdrop-blur-xl border border-white/15 text-left">
                  <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#E2C496]">
                    <ShieldCheck className="w-4 h-4 text-[#C9A46B]" />
                    <span>ON-SITE SUPERVISION RECORD</span>
                  </div>
                  <p className="text-[11px] text-white/80 mt-1">
                    Samugarengapuram Eco-Thermal Porotherm Site Inspection
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column (7 Cols): Qualifications, Creed, Pillars, and 3 Liquid Glass Buttons */}
          <motion.div
            initial={{ opacity: 0, x: 25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-7 space-y-6"
          >
            <div>
              <span className="text-xs font-mono font-semibold uppercase tracking-wider text-[#C9A46B] block mb-1">
                {isTamil ? engineer.roleTa : engineer.roleEn}
              </span>
              <h3 className="text-3xl sm:text-4xl font-heading italic text-white tracking-tight">
                {engineer.name}
              </h3>
              <p className="text-sm font-mono text-white/70 mt-1">
                {engineer.qualification} • {isTamil ? engineer.experienceTa : engineer.experienceEn}
              </p>
            </div>

            <p className="text-sm sm:text-base text-white/80 leading-relaxed font-body">
              {isTamil
                ? "ஒரு வீடு என்பது வெறும் செங்கற்கள் மற்றும் கான்கிரீட் மட்டுமே அல்ல; அது உங்கள் குடும்பத்தின் வாழ்நாள் கனவு. எந்த இடைத்தரகர்களும் இன்றி, அடித்தளம் அமைப்பது முதல் இறுதி பூச்சு வரை நானே களத்தில் நின்று உங்கள் வீட்டின் தரத்தை உறுதி செய்கிறேன்."
                : "A home is not just a structure of bricks and concrete; it is a generational sanctuary for your family. By eliminating subcontractors and inspecting every footing and slab personally, I ensure uncompromising structural safety and transparent pricing."}
            </p>

            {/* 4 Verified Engineering Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
              {pillars.map((item, i) => (
                <div key={i} className="p-3.5 rounded-2xl liquid-glass text-left space-y-1">
                  <div className="flex items-center gap-2 text-xs font-bold text-white">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#C9A46B] flex-shrink-0" />
                    <span>{isTamil ? item.titleTa : item.titleEn}</span>
                  </div>
                  <p className="text-[11px] text-white/65 leading-relaxed pl-5">
                    {isTamil ? item.descTa : item.descEn}
                  </p>
                </div>
              ))}
            </div>

            {/* 3 Liquid-Glass Contact Buttons (Section 10) */}
            <div className="flex flex-wrap items-center gap-3 pt-3">
              {/* Button 1: Call Engineer */}
              <a
                href={`tel:${engineer.phone}`}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-full liquid-glass text-white hover:text-[#C9A46B] text-xs sm:text-sm font-semibold transition-all hover:scale-105 active:scale-95"
              >
                <Phone className="w-4 h-4 text-[#C9A46B]" />
                <span>{isTamil ? "பொறியாளரை அழைக்க" : "Call Engineer"}</span>
              </a>

              {/* Button 2: WhatsApp Engineer */}
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-[#25D366]/20 hover:bg-[#25D366]/30 text-[#25D366] border border-[#25D366]/30 text-xs sm:text-sm font-semibold transition-all hover:scale-105 active:scale-95"
              >
                <MessageCircle className="w-4 h-4 fill-current" />
                <span>{isTamil ? "வாட்ஸ்அப் ஆலோசனை" : "WhatsApp Engineer"}</span>
              </a>

              {/* Button 3: Request Consultation / Book Visit */}
              <button
                onClick={onOpenAppointmentModal}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-full liquid-glass-strong text-white text-xs sm:text-sm font-semibold hover:border-[#C9A46B]/60 transition-all hover:scale-105 active:scale-95"
              >
                <Calendar className="w-4 h-4 text-[#C9A46B]" />
                <span>{isTamil ? "சந்திப்பு முன்பதிவு" : "Request Consultation"}</span>
                <ArrowRight className="w-3.5 h-3.5 text-white/50" />
              </button>
            </div>

          </motion.div>

        </div>

      </div>
    </section>
  );
}
