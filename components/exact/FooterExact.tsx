"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Facebook, MapPin, Phone, Clock, ExternalLink, MessageCircle, ShieldCheck, Lock } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function FooterExact() {
  const { isTamil } = useLanguage();
  const currentYear = new Date().getFullYear();

  const whatsappMessage = encodeURIComponent(
    isTamil
      ? "வணக்கம் Er. Sahaya Antony Stalin, நான் ஜான்சி பில்டர்ஸ் இணையதளத்தைப் பார்த்து தொடர்பு கொள்கிறேன்."
      : "Hello Er. Sahaya Antony Stalin, I would like to discuss a construction project with Jancy Builders."
  );
  const whatsappUrl = `https://wa.me/917708247124?text=${whatsappMessage}`;

  return (
    <footer id="footer" className="w-full bg-[#17191B] text-slate-400 pt-16 pb-10 border-t border-[#B78A52]/20 scroll-mt-24">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Business Credentials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 pb-10 border-b border-slate-800/60 text-xs">
          
          {/* Col 1: Brand & Founder */}
          <div className="space-y-3">
            <Link href="/" className="relative h-11 w-44 block focus:outline-none">
              <Image
                src="/logo/jancy-logo-darkmode.png"
                alt="Jancy Builders - BUILD THE WORLD"
                fill
                className="object-contain object-left"
              />
            </Link>
            <p className="text-slate-400 text-[12px] leading-relaxed pt-1">
              {isTamil ? (
                <>
                  தலைமை சிவில் பொறியாளர் <strong className="text-white">Er. சகாய அந்தோணி ஸ்டாலின்</strong>, B.E. (Civil) அவர்களின் நேரடி மேற்பார்வையில், திருநெல்வேலி மற்றும் தென் தமிழகத்தில் தரமான வீடு கட்டுமானம் மற்றும் திட்ட வரைபடங்களை ஜான்சி பில்டர்ஸ் வழங்குகிறது.
                </>
              ) : (
                <>
                  Led personally by Chief Civil Engineer <strong className="text-white">Er. Sahaya Antony Stalin</strong>, B.E. (Civil), Jancy Builders delivers architectural design, precision structural engineering, and turnkey construction across Tirunelveli and South Tamil Nadu.
                </>
              )}
            </p>
            <div className="flex items-center gap-1.5 pt-1 text-[#B78A52]">
              <ShieldCheck className="w-4 h-4 text-[#B78A52]" />
              <span className="font-semibold text-white text-[11px]">
                {isTamil ? "சான்றளிக்கப்பட்ட சிவில் பொறியாளர்" : "Registered Civil Engineer • Anna University"}
              </span>
            </div>
          </div>

          {/* Col 2: Office & Headquarters */}
          <div className="space-y-2.5">
            <span className="text-[11px] font-mono uppercase tracking-wider text-slate-300 font-bold block">
              {isTamil ? "தலைமை அலுவலகம்" : "Headquarters"}
            </span>
            <div className="flex items-start gap-2 text-slate-300">
              <MapPin className="w-4 h-4 text-[#B78A52] flex-shrink-0 mt-0.5" />
              <div className="leading-relaxed text-[12px]">
                <p className="font-semibold text-white">Jancy Home</p>
                <p>Perumal Kovil Street,</p>
                <p>Samugarengapuram, Tirunelveli - 627112</p>
                <p className="text-slate-400">Tamil Nadu, India</p>
              </div>
            </div>
            <a
              href="https://maps.google.com/?q=8.337495,77.698087"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-[11px] text-[#B78A52] hover:text-[#d8a573] font-medium pt-1 transition-colors"
            >
              <span>{isTamil ? "வழிகாட்டுதல் (Google Maps)" : "Get Directions (Google Maps)"}</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>

          {/* Col 3: Direct Contact & Confirmed Hours */}
          <div className="space-y-2.5">
            <span className="text-[11px] font-mono uppercase tracking-wider text-slate-300 font-bold block">
              {isTamil ? "தொடர்பு & நேரம்" : "Direct Contact & Hours"}
            </span>
            <div className="flex items-center gap-2 text-slate-300">
              <Phone className="w-4 h-4 text-[#B78A52] flex-shrink-0" />
              <a
                href="tel:+917708247124"
                className="text-white hover:text-[#B78A52] font-semibold text-[13px] transition-colors"
              >
                +91 77082 47124
              </a>
            </div>
            <div className="flex items-start gap-2 text-slate-300">
              <Clock className="w-4 h-4 text-[#B78A52] flex-shrink-0 mt-0.5" />
              <div className="text-[12px] leading-tight space-y-1">
                <span className="block font-medium">
                  {isTamil ? "திங்கள் – சனி: காலை 9:00 – இரவு 7:30" : "Mon – Sat: 9:00 AM – 7:30 PM"}
                </span>
                <span className="block text-slate-400 text-[11px]">
                  {isTamil ? "ஞாயிறு: முன் அனுமதி மூலம் மட்டுமே" : "Sunday: By Prior Appointment"}
                </span>
              </div>
            </div>
            <p className="text-slate-500 text-[11px] pt-1">
              Samugarengapuram, Tirunelveli, Durainagar, Silathikulam, Valliyur &amp; South Tamil Nadu.
            </p>
          </div>

          {/* Col 4: Quick Links */}
          <div className="space-y-3">
            <span className="text-[11px] font-mono uppercase tracking-wider text-slate-300 font-bold block">
              {isTamil ? "இணைப்புகள்" : "Navigation"}
            </span>
            <div className="grid grid-cols-2 gap-2 text-[12px]">
              <Link href="/" className="hover:text-white transition-colors">
                {isTamil ? "முகப்பு" : "Home"}
              </Link>
              <Link href="#about" className="hover:text-white transition-colors">
                {isTamil ? "எங்களைப் பற்றி" : "About"}
              </Link>
              <Link href="#services" className="hover:text-white transition-colors">
                {isTamil ? "சேவைகள்" : "Services"}
              </Link>
              <Link href="#projects" className="hover:text-white transition-colors">
                {isTamil ? "கட்டுமானப் பணிகள்" : "Projects"}
              </Link>
              <Link href="#guide" className="hover:text-white transition-colors">
                {isTamil ? "கட்டுமான வழிகாட்டி" : "Guide"}
              </Link>
              <Link href="#estimator" className="hover:text-white transition-colors">
                {isTamil ? "செலவுக் கணக்கீடு" : "Estimator"}
              </Link>
              <Link href="#office" className="hover:text-white transition-colors">
                {isTamil ? "அலுவலகம்" : "Visit Office"}
              </Link>
              <Link href="#contact" className="hover:text-white transition-colors">
                {isTamil ? "தொடர்பு" : "Contact"}
              </Link>
            </div>
            <div className="pt-2">
              <span className="font-serif italic text-sm text-slate-400 block">
                {isTamil ? "உங்கள் கனவு வீடு, எங்கள் பொறுப்பு." : "Your Dream Home, Our Responsibility."}
              </span>
            </div>
          </div>

        </div>

        {/* Social & Bottom Bar */}
        <div className="pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs">
          
          {/* Social Channels: Verified Facebook Page + Direct WhatsApp */}
          <div className="flex items-center gap-3">
            <a
              href="https://www.facebook.com/JancyBuilder/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1877F2]/15 hover:bg-[#1877F2] text-[#1877F2] hover:text-white border border-[#1877F2]/30 text-xs font-semibold transition-all shadow-sm"
              aria-label="Official Facebook Page"
              title="Official Jancy Builder Facebook Page"
            >
              <Facebook className="w-3.5 h-3.5" />
              <span>Facebook Page</span>
              <ExternalLink className="w-3 h-3" />
            </a>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#25D366]/15 hover:bg-[#25D366] text-[#25D366] hover:text-white border border-[#25D366]/30 text-xs font-semibold transition-all shadow-sm"
              aria-label="WhatsApp"
              title="Chat on WhatsApp (+91 77082 47124)"
            >
              <MessageCircle className="w-3.5 h-3.5 fill-current" />
              <span>WhatsApp Chat</span>
            </a>
          </div>

          {/* Copyright & Office Staff Admin Entry */}
          <div className="flex items-center gap-4 text-[11px] text-slate-500">
            <span>&copy; {currentYear} JANCY BUILDERS. Samugarengapuram, Tirunelveli.</span>
            <span>&bull;</span>
            <Link
              href="/admin"
              className="inline-flex items-center gap-1 text-slate-400 hover:text-[#B78A52] font-mono text-[11px] transition-colors"
              title="Office Staff Administration Portal"
            >
              <Lock className="w-3 h-3 text-[#B78A52]" />
              <span>Office Staff Admin &rarr;</span>
            </Link>
          </div>

        </div>

      </div>
    </footer>
  );
}
