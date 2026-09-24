"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Search,
  ArrowRight,
  Menu,
  X,
  Phone,
  MessageCircle,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface NavbarExactProps {
  onOpenQuote: () => void;
}

export default function NavbarExact({ onOpenQuote }: NavbarExactProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("Home");
  const [searchOpen, setSearchOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

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

  const navLinks = [
    { name: "Home", href: "#" },
    { name: "About", href: "#about" },
    { name: "Services", href: "#services" },
    { name: "Projects", href: "#projects" },
    { name: "Gallery", href: "#gallery" },
    { name: "Process", href: "#process" },
    { name: "Contact", href: "#contact" },
  ];

  const whatsappMessage = encodeURIComponent(
    "Hello Jancy Builders, I visited your website and would like to consult with Chief Engineer Er. Sahaya Antony Stalin regarding a new construction project."
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
        <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
          {navLinks.map((link) => {
            const isActive = activeTab === link.name;
            return (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setActiveTab(link.name)}
                className={`group relative py-2 text-sm font-semibold tracking-tight transition-colors duration-200 ${
                  isActive
                    ? "text-slate-950 font-bold"
                    : "text-slate-600 hover:text-slate-950 font-medium"
                }`}
              >
                <span>{link.name}</span>
                {/* Hover underline expands smoothly from center */}
                <span className={`absolute bottom-0 inset-x-0 h-[2px] bg-[#B88746] transition-transform duration-250 origin-center ${
                  isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                }`} />
              </a>
            );
          })}
        </nav>

        {/* Right CTA Group (Search + Divider + Phone + WhatsApp + Red Pill Button) */}
        <div className="hidden md:flex items-center gap-3.5">
          {/* Search Trigger */}
          <div className="relative">
            {searchOpen ? (
              <div className="flex items-center bg-gray-50 border border-gray-200 rounded-full px-3 py-1.5 animate-fadeIn">
                <input
                  type="text"
                  placeholder="Search projects..."
                  autoFocus
                  onBlur={() => setSearchOpen(false)}
                  className="bg-transparent text-xs text-slate-800 placeholder-slate-400 focus:outline-none w-36"
                />
                <button
                  onClick={() => setSearchOpen(false)}
                  className="text-slate-400 hover:text-slate-600"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <button
                onClick={() => setSearchOpen(true)}
                className="w-8 h-8 flex items-center justify-center rounded-full text-slate-600 hover:text-slate-900 hover:bg-gray-100 transition-colors"
                title="Search"
                aria-label="Search"
              >
                <Search className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Thin Vertical Divider */}
          <div className="h-6 w-[1px] bg-slate-200 hidden lg:block" />

          {/* Phone Call with "Talk to Our Expert" */}
          <a
            href="tel:+917708247124"
            className="hidden xl:flex items-center gap-2 text-slate-800 hover:text-[#C29061] transition-colors group/phone"
            title="Call Er. Sahaya Antony Stalin (+91 77082 47124)"
          >
            <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-700 group-hover/phone:bg-[#C29061] group-hover/phone:text-white transition-colors">
              <Phone className="w-3.5 h-3.5 stroke-[2.2]" />
            </div>
            <div className="flex flex-col text-left">
              <span className="text-xs font-bold text-slate-900 leading-tight">
                +91 77082 47124
              </span>
              <span className="text-[10px] text-slate-500 font-medium leading-tight">
                Talk to Our Expert
              </span>
            </div>
          </a>

          {/* Direct WhatsApp Action Button */}
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 bg-[#25D366] hover:bg-[#20ba5a] text-white px-3 py-1.5 rounded-full text-xs font-bold shadow-md shadow-[#25D366]/20 transition-all hover:scale-105"
            title="Chat directly on WhatsApp"
          >
            <MessageCircle className="w-3.5 h-3.5 fill-current" />
            <span className="hidden sm:inline">WhatsApp</span>
          </a>

          {/* Signature Red Pill CTA Button */}
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            onClick={onOpenQuote}
            className="group relative inline-flex items-center gap-2 bg-[#E50914] hover:bg-[#DC2626] text-white text-xs sm:text-sm font-bold px-5 py-2.5 rounded-full shadow-md shadow-red-600/25 transition-all duration-200"
          >
            <span>Get a Quote</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1" />
          </motion.button>
        </div>

        {/* Mobile Action Controls (WhatsApp + Phone + Hamburger) */}
        <div className="flex lg:hidden items-center gap-2">
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
            className="p-2 text-[#E50914] hover:bg-red-50 rounded-full"
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

      {/* Mobile Fullscreen Sliding Menu Panel (translateX(100%) -> translateX(0)) */}
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

            {/* Staggered Navigation Items (opacity 0 -> 1, translateX 20px -> 0) */}
            <nav className="flex flex-col space-y-4 my-auto py-8">
              {navLinks.map((link, idx) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + idx * 0.05, duration: 0.35, ease: "easeOut" }}
                  onClick={() => {
                    setActiveTab(link.name);
                    setMobileMenuOpen(false);
                  }}
                  className={`text-xl sm:text-2xl font-bold font-sans tracking-tight transition-colors flex items-center justify-between ${
                    activeTab === link.name ? "text-[#B88746]" : "text-slate-300 hover:text-white"
                  }`}
                >
                  <span>{link.name}</span>
                  <ArrowRight className="w-4 h-4 opacity-40" />
                </motion.a>
              ))}
            </nav>

            {/* Bottom Actions inside Menu */}
            <div className="pt-6 border-t border-white/10 space-y-3">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-[#25D366] hover:bg-[#20ba5a] text-white py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg"
              >
                <MessageCircle className="w-4 h-4 fill-current" />
                <span>Chat on WhatsApp (+91 77082 47124)</span>
              </a>

              <a
                href="tel:+917708247124"
                className="w-full bg-white/10 hover:bg-white/20 text-white py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 border border-white/10"
              >
                <Phone className="w-4 h-4 text-[#B88746]" />
                <span>Call Er. Sahaya Antony Stalin</span>
              </a>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenQuote();
                }}
                className="w-full bg-[#B88746] hover:bg-[#a3753b] text-slate-950 py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider shadow-lg flex items-center justify-center gap-2"
              >
                <span>Get a Free Quote</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
