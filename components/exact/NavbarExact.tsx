"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Search,
  ArrowRight,
  Menu,
  X,
  Phone,
  MessageCircle,
  Globe,
  Calendar,
  Lock,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { translations } from "@/lib/translations";

interface NavbarExactProps {
  onOpenQuote: () => void;
  onOpenAppointment?: () => void;
}

export default function NavbarExact({ onOpenQuote, onOpenAppointment }: NavbarExactProps) {
  const { language, setLanguage, isTamil } = useLanguage();
  const t = translations[language];
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  // Monitor scroll for smooth floating glass transition
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Requested Navigation Structure (Requirement 15)
  const navLinks = [
    { name: t.nav.home, href: "/" },
    { name: t.nav.about, href: "/#about" },
    { name: t.nav.services, href: "/#services" },
    { name: t.nav.projects, href: "/#projects" },
    { name: t.nav.guide, href: "/#process" },
    { name: t.nav.estimator, href: "/#estimator" },
    { name: t.nav.office, href: "/#office" },
    { name: t.nav.contact, href: "/#contact" },
  ];

  const whatsappMessage = encodeURIComponent(
    isTamil
      ? "வணக்கம் ஜான்சி பில்டர்ஸ், உங்கள் இணையதளத்தைப் பார்த்தேன். புதிய வீடு கட்டுமானம் தொடர்பாக தலைமைப் பொறியாளர் Er. சகாய அந்தோணி ஸ்டாலின் அவர்களுடன் பேச விரும்புகிறேன்."
      : "Hello Jancy Builders, I visited your website and would like to consult with Chief Engineer Er. Sahaya Antony Stalin regarding a new construction project."
  );
  const whatsappUrl = `https://wa.me/917708247124?text=${whatsappMessage}`;

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-3 sm:top-5 inset-x-0 z-50 max-w-[1440px] mx-auto px-3 sm:px-6 transition-all duration-300"
    >
      {/* Floating Capsule Container with Dynamic Scroll Glassmorphism */}
      <div
        className={`w-full rounded-2xl transition-all duration-300 px-4 sm:px-6 h-[72px] sm:h-20 flex items-center justify-between ${
          isScrolled
            ? "bg-white/95 backdrop-blur-xl shadow-2xl shadow-black/10 border border-slate-200/90"
            : "bg-white/90 backdrop-blur-md shadow-xl shadow-black/5 border border-white/80"
        }`}
      >
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-3 group focus:outline-none flex-shrink-0">
          <div className="relative h-11 w-40 sm:h-12 sm:w-48 transition-transform duration-200 group-hover:scale-[1.02]">
            <Image
              src="/logo/jancy-official-logo.png"
              alt="Jancy Builders - BUILD THE WORLD"
              fill
              className="object-contain object-left"
              priority
            />
          </div>
        </Link>

        {/* Center Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-5 xl:gap-7">
          {navLinks.map((link) => {
            const isActive =
              link.href === "/"
                ? pathname === "/"
                : pathname?.startsWith(link.href);

            return (
              <Link
                key={link.name}
                href={link.href}
                className={`group relative py-2 text-sm font-semibold tracking-tight transition-colors duration-200 ${
                  isActive
                    ? "text-slate-950 font-bold"
                    : "text-slate-600 hover:text-slate-950 font-medium"
                }`}
              >
                <span>{link.name}</span>
                {/* Hover / Active underline */}
                <span
                  className={`absolute bottom-0 inset-x-0 h-[2px] bg-[#B88746] transition-transform duration-250 origin-center ${
                    isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                  }`}
                />
              </Link>
            );
          })}
        </nav>

        {/* Right CTA Group (Language Toggle + Phone + WhatsApp + Red Pill Button) */}
        <div className="hidden md:flex items-center gap-3">
          {/* Dynamic Language Toggle Button (தமிழ் / English) */}
          <button
            onClick={() => setLanguage(language === "en" ? "ta" : "en")}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold bg-[#B88746]/10 hover:bg-[#B88746]/20 text-[#8B5E28] border border-[#B88746]/30 shadow-sm transition-all hover:scale-105 active:scale-95"
            title={isTamil ? "Switch to English" : "தமிழுக்கு மாறவும்"}
            aria-label="Toggle language"
          >
            <Globe className="w-3.5 h-3.5 text-[#B88746]" />
            <span className="font-semibold">{language === "en" ? "தமிழ்" : "English"}</span>
          </button>

          {/* Thin Vertical Divider */}
          <div className="h-6 w-[1px] bg-slate-200 hidden xl:block" />

          {/* Phone Call with "Talk to Our Expert" */}
          <a
            href="tel:+917708247124"
            className="hidden xl:flex items-center gap-2 text-slate-800 hover:text-[#B88746] transition-colors group/phone"
            title="Call Er. Sahaya Antony Stalin (+91 77082 47124)"
          >
            <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-700 group-hover/phone:bg-[#B88746] group-hover/phone:text-white transition-colors">
              <Phone className="w-3.5 h-3.5 stroke-[2.2]" />
            </div>
            <div className="flex flex-col text-left">
              <span className="text-xs font-bold text-slate-900 leading-tight">
                +91 77082 47124
              </span>
              <span className="text-[10px] text-slate-500 font-medium leading-tight">
                {isTamil ? "Er. ஸ்டாலின் (சிவில் இன்ஜினியர்)" : "Er. Stalin (Chief Civil Eng.)"}
              </span>
            </div>
          </a>

          {/* Thin Vertical Divider */}
          <div className="h-6 w-[1px] bg-slate-200 hidden xl:block" />

          {/* Direct WhatsApp Action Button */}
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 bg-[#25D366] hover:bg-[#20ba5a] text-white px-3.5 py-2 rounded-full text-xs font-bold shadow-md shadow-[#25D366]/20 transition-all hover:scale-105"
            title="Chat directly on WhatsApp"
          >
            <MessageCircle className="w-3.5 h-3.5 fill-current" />
            <span className="hidden sm:inline">WhatsApp</span>
          </a>

          {/* Book Office Visit CTA Button */}
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => {
              if (onOpenAppointment) onOpenAppointment();
              else {
                const el = document.getElementById("office");
                if (el) el.scrollIntoView({ behavior: "smooth" });
              }
            }}
            className="group relative inline-flex items-center gap-2 bg-[#B78A52] hover:bg-[#a37742] text-slate-950 text-xs sm:text-sm font-bold px-4 py-2.5 rounded-full shadow-lg shadow-[#B78A52]/20 transition-all"
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>{t.nav.bookVisit}</span>
          </motion.button>

          {/* Discreet Office Staff Login */}
          <Link
            href="/admin"
            className="p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-slate-900 transition-colors"
            title={t.nav.officeLogin}
            aria-label="Office Staff Login"
          >
            <Lock className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Mobile Action Controls (Language + WhatsApp + Phone + Hamburger) */}
        <div className="flex lg:hidden items-center gap-1.5">
          {/* Quick Mobile Language Toggle Button */}
          <button
            onClick={() => setLanguage(language === "en" ? "ta" : "en")}
            className="px-2.5 py-1 text-xs font-bold rounded-full bg-[#B88746]/10 text-[#8B5E28] border border-[#B88746]/40 transition-all active:scale-95 flex items-center gap-1"
            title="Switch Language"
          >
            <Globe className="w-3 h-3 text-[#B88746]" />
            <span>{language === "en" ? "தமிழ்" : "EN"}</span>
          </button>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 text-white bg-[#25D366] hover:bg-[#20ba5a] rounded-full shadow-sm"
            title="WhatsApp"
          >
            <MessageCircle className="w-4 h-4 fill-current" />
          </a>
          <a
            href="tel:+917708247124"
            className="p-2 text-[#B78A52] hover:bg-[#B78A52]/10 rounded-full"
            title="Call"
          >
            <Phone className="w-4 h-4" />
          </a>
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="p-2 text-slate-800 hover:text-black focus:outline-none"
            aria-label="Open Navigation"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>

      </div>

      {/* Mobile Fullscreen Sliding Menu Panel */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-[100] bg-[#111318] text-white flex flex-col justify-between p-6 sm:p-8 overflow-y-auto"
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
            <nav className="flex flex-col space-y-3.5 my-auto py-6">
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
                    transition={{ delay: 0.08 + idx * 0.04, duration: 0.3, ease: "easeOut" }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`text-xl sm:text-2xl font-bold font-sans tracking-tight transition-colors flex items-center justify-between py-1 ${
                        isActive ? "text-[#B88746]" : "text-slate-300 hover:text-white"
                      }`}
                    >
                      <span>{link.name}</span>
                      <ArrowRight className="w-4 h-4 opacity-40" />
                    </Link>
                  </motion.div>
                );
              })}
            </nav>

            {/* Bottom Actions inside Menu */}
            <div className="pt-6 border-t border-white/10 space-y-3">
              {/* Full width language toggle in mobile menu */}
              <button
                onClick={() => setLanguage(language === "en" ? "ta" : "en")}
                className="w-full bg-white/10 hover:bg-white/20 text-[#E7C188] py-3 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 border border-[#B88746]/30 transition-colors"
              >
                <Globe className="w-4 h-4 text-[#B88746]" />
                <span>
                  {language === "en"
                    ? "தமிழ் மொழிக்கு மாற்றவும் (Switch to Tamil)"
                    : "Switch to English"}
                </span>
              </button>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-[#25D366] hover:bg-[#20ba5a] text-white py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg"
              >
                <MessageCircle className="w-4 h-4 fill-current" />
                <span>
                  {isTamil
                    ? "வாட்ஸ்அப்பில் பேசவும் (+91 77082 47124)"
                    : "Chat on WhatsApp (+91 77082 47124)"}
                </span>
              </a>

              <a
                href="tel:+917708247124"
                className="w-full bg-white/10 hover:bg-white/20 text-white py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 border border-white/10"
              >
                <Phone className="w-4 h-4 text-[#B88746]" />
                <span>
                  {isTamil
                    ? "பொறியாளர் ஸ்டாலினை அழைக்க"
                    : "Call Er. Sahaya Antony Stalin"}
                </span>
              </a>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  if (onOpenAppointment) onOpenAppointment();
                  else {
                    const el = document.getElementById("office");
                    if (el) el.scrollIntoView({ behavior: "smooth" });
                  }
                }}
                className="w-full bg-[#B78A52] hover:bg-[#a17845] text-slate-950 py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider shadow-lg flex items-center justify-center gap-2"
              >
                <Calendar className="w-4 h-4" />
                <span>{t.nav.bookVisit}</span>
              </button>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenQuote();
                }}
                className="w-full bg-white/10 hover:bg-white/15 text-white py-3 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 border border-white/15"
              >
                <span>{t.nav.getQuote}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <Link
                href="/admin"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full py-2.5 rounded-xl text-slate-400 hover:text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
              >
                <Lock className="w-3.5 h-3.5" />
                <span>{t.nav.officeLogin}</span>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
