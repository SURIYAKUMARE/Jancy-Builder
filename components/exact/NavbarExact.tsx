"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ArrowRight,
  Menu,
  X,
  Phone,
  MessageCircle,
  Globe,
  Calendar,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";

interface NavbarExactProps {
  onOpenQuote: () => void;
  onOpenAppointment?: () => void;
}

export default function NavbarExact({ onOpenQuote, onOpenAppointment }: NavbarExactProps) {
  const { language, setLanguage, isTamil } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: isTamil ? "முகப்பு" : "Home", href: "/" },
    { name: isTamil ? "எங்களைப் பற்றி" : "About", href: "#about" },
    { name: isTamil ? "சேவைகள்" : "Services", href: "#services" },
    { name: isTamil ? "கட்டுமானப் பணிகள்" : "Projects", href: "#projects" },
    { name: isTamil ? "அலுவலகம்" : "Visit Office", href: "#office" },
    { name: isTamil ? "தொடர்பு" : "Contact", href: "#contact" },
  ];

  const whatsappMessage = encodeURIComponent(
    isTamil
      ? "வணக்கம் ஜான்சி பில்டர்ஸ், புதிய வீடு கட்டுமானம் தொடர்பாக தலைமைப் பொறியாளர் Er. சகாய அந்தோணி ஸ்டாலின் அவர்களுடன் பேச விரும்புகிறேன்."
      : "Hello Jancy Builders, I would like to consult with Chief Engineer Er. Sahaya Antony Stalin regarding a new construction project."
  );
  const whatsappUrl = `https://wa.me/917708247124?text=${whatsappMessage}`;

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-3 sm:top-5 inset-x-0 z-50 max-w-7xl mx-auto px-3 sm:px-6 pointer-events-none"
    >
      {/* Floating Liquid-Glass Capsule Container */}
      <div
        className={`pointer-events-auto w-full transition-all duration-300 px-4 sm:px-6 h-16 sm:h-20 flex items-center justify-between liquid-glass-pill ${
          isScrolled
            ? "shadow-2xl shadow-black/90 bg-[#0E0F12]/90 backdrop-blur-2xl border-white/15"
            : "bg-[#0E0F12]/75 backdrop-blur-xl border-white/10"
        }`}
      >
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-3 group focus:outline-none flex-shrink-0">
          <div className="relative h-10 w-36 sm:h-12 sm:w-44 transition-transform duration-200 group-hover:scale-[1.02]">
            <Image
              src="/logo/jancy-logo-darkmode.png"
              alt="Jancy Builders - Architectural & Civil Engineering"
              fill
              className="object-contain object-left"
              priority
            />
          </div>
        </Link>

        {/* Center Desktop Navigation (Clean Barlow typography) */}
        <nav className="hidden lg:flex items-center gap-6 xl:gap-8 font-body">
          {navLinks.map((link) => {
            const isActive =
              link.href === "/"
                ? pathname === "/"
                : pathname?.startsWith(link.href);

            return (
              <Link
                key={link.name}
                href={link.href}
                className={`relative py-1.5 text-xs xl:text-sm tracking-wide transition-colors duration-200 font-medium ${
                  isActive
                    ? "text-white font-semibold"
                    : "text-white/70 hover:text-white"
                }`}
              >
                <span>{link.name}</span>
                <span
                  className={`absolute -bottom-1 inset-x-0 h-[2px] bg-[#C9A46B] transition-transform duration-250 origin-center ${
                    isActive ? "scale-x-100" : "scale-x-0 hover:scale-x-100"
                  }`}
                />
              </Link>
            );
          })}
        </nav>

        {/* Right CTA Group (Language Toggle + WhatsApp + Liquid Glass CTA) */}
        <div className="hidden md:flex items-center gap-3 font-body">
          {/* Language Selector: தமிழ் | English */}
          <button
            onClick={() => setLanguage(language === "en" ? "ta" : "en")}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-white/5 hover:bg-white/10 text-white border border-white/10 transition-all hover:scale-105 active:scale-95"
            title={isTamil ? "Switch to English" : "தமிழுக்கு மாற்றவும்"}
            aria-label="Toggle language"
          >
            <Globe className="w-3.5 h-3.5 text-[#C9A46B]" />
            <span className="font-mono text-[11px] text-white/90">
              {language === "en" ? "தமிழ்" : "English"}
            </span>
          </button>

          {/* Quick WhatsApp Pill */}
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-full bg-white/5 hover:bg-[#25D366]/20 text-white/80 hover:text-[#25D366] border border-white/10 transition-all hover:scale-105"
            title="Chat on WhatsApp (+91 77082 47124)"
          >
            <MessageCircle className="w-4 h-4 fill-current" />
          </a>

          {/* Liquid Glass CTA Button: Get Consultation */}
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={onOpenAppointment || onOpenQuote}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-white via-slate-100 to-[#E2C496] text-black text-xs sm:text-sm font-semibold px-4 sm:px-5 py-2.5 rounded-full shadow-lg shadow-white/10 transition-all duration-300 group"
          >
            <span>{isTamil ? "ஆலோசனை பெற" : "Get Consultation"}</span>
            <ArrowRight className="w-3.5 h-3.5 text-black transition-transform duration-200 group-hover:translate-x-1" />
          </motion.button>
        </div>

        {/* Mobile Action Controls (Language + Menu Button) */}
        <div className="flex lg:hidden items-center gap-2">
          <button
            onClick={() => setLanguage(language === "en" ? "ta" : "en")}
            className="px-2.5 py-1 text-xs font-mono font-semibold rounded-full bg-white/5 text-white/90 border border-white/10 transition-all active:scale-95 flex items-center gap-1"
            title="Switch Language"
          >
            <Globe className="w-3 h-3 text-[#C9A46B]" />
            <span>{language === "en" ? "தமிழ்" : "EN"}</span>
          </button>

          <button
            onClick={() => setMobileMenuOpen(true)}
            className="p-2 rounded-full bg-white/5 text-white hover:text-[#C9A46B] border border-white/10 focus:outline-none"
            aria-label="Open Navigation"
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>

      </div>

      {/* Mobile Fullscreen Liquid Glass Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
            animate={{ opacity: 1, backdropFilter: "blur(24px)" }}
            exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
            transition={{ duration: 0.3 }}
            className="pointer-events-auto fixed inset-0 z-[100] bg-black/90 text-white flex flex-col justify-between p-6 sm:p-8"
          >
            {/* Top Bar inside Menu */}
            <div className="flex items-center justify-between pb-6 border-b border-white/10">
              <Link href="/" onClick={() => setMobileMenuOpen(false)} className="relative h-10 w-36">
                <Image
                  src="/logo/jancy-logo-darkmode.png"
                  alt="Jancy Builders"
                  fill
                  className="object-contain object-left"
                />
              </Link>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
                aria-label="Close Navigation"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Staggered Navigation Items */}
            <nav className="flex flex-col space-y-4 my-auto py-6 font-body">
              {navLinks.map((link, idx) => {
                const isActive =
                  link.href === "/"
                    ? pathname === "/"
                    : pathname?.startsWith(link.href);

                return (
                  <motion.div
                    key={link.name}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.08 + idx * 0.04, duration: 0.3 }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`text-2xl font-bold tracking-wide transition-colors flex items-center justify-between py-1.5 ${
                        isActive ? "text-[#C9A46B]" : "text-white/80 hover:text-white"
                      }`}
                    >
                      <span>{link.name}</span>
                      <ArrowRight className="w-4 h-4 opacity-40 text-[#C9A46B]" />
                    </Link>
                  </motion.div>
                );
              })}
            </nav>

            {/* Bottom Actions inside Menu */}
            <div className="pt-6 border-t border-white/10 space-y-3 font-body">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  if (onOpenAppointment) onOpenAppointment();
                  else onOpenQuote();
                }}
                className="w-full bg-white hover:bg-[#E2C496] text-black py-3.5 rounded-2xl font-bold text-xs uppercase tracking-wider shadow-lg flex items-center justify-center gap-2 transition-colors"
              >
                <Calendar className="w-4 h-4" />
                <span>{isTamil ? "ஆலோசனை முன்பதிவு செய்க" : "Get Consultation"}</span>
              </button>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-[#25D366]/20 hover:bg-[#25D366]/30 text-[#25D366] border border-[#25D366]/30 py-3.5 rounded-2xl font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4 fill-current" />
                <span>WhatsApp: +91 77082 47124</span>
              </a>

              <a
                href="tel:+917708247124"
                className="w-full bg-white/5 hover:bg-white/10 text-white/90 border border-white/10 py-3 rounded-2xl font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2"
              >
                <Phone className="w-4 h-4 text-[#C9A46B]" />
                <span>Call Er. Stalin</span>
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
