"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  MapPin,
  Phone,
  MessageCircle,
  Facebook,
  ExternalLink,
  Lock,
  ArrowRight,
  ShieldCheck,
  Calendar,
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

interface FooterExactProps {
  onOpenConsultation?: () => void;
}

export default function FooterExact({ onOpenConsultation }: FooterExactProps) {
  const { isTamil } = useLanguage();
  const currentYear = new Date().getFullYear();

  const whatsappMessage = encodeURIComponent(
    isTamil
      ? "வணக்கம் ஜான்சி பில்டர்ஸ், புதிய வீடு கட்டுமானம் தொடர்பாக Er. சகாய அந்தோணி ஸ்டாலின் அவர்களுடன் பேச விரும்புகிறேன்."
      : "Hello Jancy Builders, I would like to consult with Chief Engineer Er. Sahaya Antony Stalin regarding a new construction project."
  );
  const whatsappUrl = `https://wa.me/917708247124?text=${whatsappMessage}`;

  return (
    <footer className="w-full bg-black text-white relative border-t border-white/10 font-body overflow-hidden">
      
      {/* 1. FINAL CTA BANNER (Section 17) */}
      <div className="border-b border-white/10 py-16 sm:py-20 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#C9A46B]/5 to-transparent pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full liquid-glass text-xs font-mono text-[#C9A46B] uppercase tracking-widest">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>JANCY BUILDERS • SAMUGARENGAPURAM</span>
          </div>

          <h2 className="text-4xl sm:text-6xl lg:text-7xl font-heading italic text-white tracking-tight leading-[1.08] max-w-3xl mx-auto">
            {isTamil ? "உங்கள் கனவு இல்லத்தை உருவாக்குவோம்." : "Let's Build Your Dream Home."}
          </h2>

          <p className="text-sm sm:text-base text-white/70 max-w-xl mx-auto font-body leading-relaxed">
            {isTamil
              ? "தொழில்முறை சிவில் பொறியியல், வாஸ்து முறை வடிவமைப்பு மற்றும் உறுதியான கட்டுமான சேவைகளுக்கு இன்று எங்களை தொடர்பு கொள்ளுங்கள்."
              : "Bespoke architectural design, NABL-tested materials, and personal on-site engineering supervision across South Tamil Nadu."}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3.5 pt-2">
            <button
              onClick={onOpenConsultation}
              className="px-7 py-4 rounded-full bg-white hover:bg-[#E2C496] text-black font-bold text-xs uppercase tracking-wider flex items-center gap-2 transition-all hover:scale-105 active:scale-95 shadow-xl shadow-white/10"
            >
              <Calendar className="w-4 h-4" />
              <span>{isTamil ? "இலவச ஆலோசனை பெறுக" : "Schedule Free Consultation"}</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <a
              href="tel:+917708247124"
              className="px-6 py-4 rounded-full liquid-glass text-white hover:text-[#C9A46B] font-semibold text-xs uppercase tracking-wider flex items-center gap-2 transition-all hover:scale-105 active:scale-95"
            >
              <Phone className="w-4 h-4 text-[#C9A46B]" />
              <span>+91 77082 47124</span>
            </a>
          </div>
        </div>
      </div>

      {/* 2. MAIN FOOTER SPREAD */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
          
          {/* Col 1 (5 Cols): Brand & About */}
          <div className="lg:col-span-5 space-y-4 text-left">
            <Link href="/" className="relative h-12 w-48 block">
              <Image
                src="/logo/jancy-logo-darkmode.png"
                alt="Jancy Builders"
                fill
                className="object-contain object-left"
              />
            </Link>

            <p className="text-xs sm:text-sm text-white/70 leading-relaxed max-w-sm">
              {isTamil
                ? "ஜான்சி பில்டர்ஸ் — திருநெல்வேலி மாவட்டம் சாமுகரெங்கபுரத்தை தலைமையிடமாகக் கொண்ட முன்னணி சிவில் பொறியியல் மற்றும் கட்டுமான நிறுவனம். தலைமை சிவில் பொறியாளர் Er. சகாய அந்தோணி ஸ்டாலின் நேரடி கள மேற்பார்வை."
                : "Jancy Builders is a premier civil engineering, architectural design, and turnkey construction studio headquartered in Samugarengapuram, Tirunelveli. Personally supervised by Chief Civil Engineer Er. Sahaya Antony Stalin, B.E. (Civil)."}
            </p>

            <div className="pt-2 text-xs text-white/50 font-mono">
              <span>GST &amp; Professional Civil Engineering Licensed</span>
            </div>
          </div>

          {/* Col 2 (3 Cols): Quick Navigation */}
          <div className="lg:col-span-3 space-y-3 text-left">
            <span className="text-xs font-mono uppercase tracking-wider text-[#C9A46B] font-bold block">
              {isTamil ? "வழிகாட்டி" : "NAVIGATION"}
            </span>
            <div className="flex flex-col space-y-2 text-xs text-white/75">
              <Link href="/" className="hover:text-white transition-colors">
                {isTamil ? "முகப்பு" : "Home"}
              </Link>
              <Link href="#about" className="hover:text-white transition-colors">
                {isTamil ? "எங்களைப் பற்றி" : "About Jancy Builders"}
              </Link>
              <Link href="#services" className="hover:text-white transition-colors">
                {isTamil ? "கட்டுமான சேவைகள்" : "Services & Capabilities"}
              </Link>
              <Link href="#projects" className="hover:text-white transition-colors">
                {isTamil ? "கட்டுமானப் பணிகள்" : "Project Portfolio"}
              </Link>
              <Link href="#process" className="hover:text-white transition-colors">
                {isTamil ? "கட்டுமானப் பயணம்" : "Construction Journey"}
              </Link>
              <Link href="#estimator" className="hover:text-white transition-colors">
                {isTamil ? "செலவுக் கணக்கீடு" : "Cost Estimator"}
              </Link>
              <Link href="#office" className="hover:text-white transition-colors">
                {isTamil ? "அலுவலகம் வருக" : "Visit Our Office"}
              </Link>
              <Link href="#contact" className="hover:text-white transition-colors">
                {isTamil ? "நேரடித் தொடர்பு" : "Contact Engineer"}
              </Link>
            </div>
          </div>

          {/* Col 3 (4 Cols): Verified Headquarters & Hours */}
          <div className="lg:col-span-4 space-y-3 text-left">
            <span className="text-xs font-mono uppercase tracking-wider text-[#C9A46B] font-bold block">
              {isTamil ? "தலைமை அலுவலகம்" : "PHYSICAL HEADQUARTERS"}
            </span>

            <div className="space-y-1 text-xs text-white/75">
              <p className="font-semibold text-white">Jancy Home</p>
              <p>Perumal Kovil Street, Samugarengapuram,</p>
              <p>Radhapuram Taluk, Tirunelveli – 627112</p>
              <p className="text-white/50">Tamil Nadu, India</p>
            </div>

            <div className="pt-2 text-xs space-y-1 font-mono text-white/70">
              <p className="text-[#E2C496]">Mon – Sat: 9:00 AM – 7:30 PM</p>
              <p className="text-white/50">Sunday: By Prior Appointment Only</p>
            </div>

            <div className="pt-2">
              <a
                href="tel:+917708247124"
                className="text-xs font-mono text-white hover:text-[#C9A46B] block transition-colors"
              >
                Direct: +91 77082 47124
              </a>
            </div>
          </div>

        </div>

        {/* 3. BOTTOM STRIP: SOCIAL + COPYRIGHT + ADMIN PORTAL LINK */}
        <div className="mt-14 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-white/60">
          
          {/* Social Links: Official Facebook & WhatsApp */}
          <div className="flex items-center gap-3">
            <a
              href="https://www.facebook.com/JancyBuilder/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full liquid-glass text-white/80 hover:text-[#1877F2] transition-colors"
              title="Official Jancy Builder Facebook Page"
            >
              <Facebook className="w-3.5 h-3.5" />
              <span>Official Facebook</span>
              <ExternalLink className="w-3 h-3 opacity-60" />
            </a>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full liquid-glass text-white/80 hover:text-[#25D366] transition-colors"
              title="WhatsApp Consultation"
            >
              <MessageCircle className="w-3.5 h-3.5 fill-current" />
              <span>WhatsApp Chat</span>
            </a>
          </div>

          {/* Copyright & Office Staff Portal */}
          <div className="flex items-center gap-4 text-[11px] font-mono">
            <span>&copy; {currentYear} JANCY BUILDERS. ALL RIGHTS RESERVED.</span>
            <span>&bull;</span>
            <Link
              href="/admin"
              className="inline-flex items-center gap-1 text-white/50 hover:text-[#C9A46B] transition-colors"
              title="Office Staff Administration Portal"
            >
              <Lock className="w-3 h-3 text-[#C9A46B]" />
              <span>Office Staff Admin &rarr;</span>
            </Link>
          </div>

        </div>
      </div>

    </footer>
  );
}
