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
    { name: "Estimator", href: "#estimator" },
    { name: "Engineering", href: "#engineering" },
    { name: "Projects", href: "#projects" },
    { name: "Why Us", href: "#process" },
    { name: "Contact", href: "#footer" },
  ];

  const whatsappMessage = encodeURIComponent(
    "Hello Jancy Builders, I visited your website and would like to consult with Chief Engineer Er. Sakay Antony Stalin regarding a new construction project."
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
                className={`relative py-2 text-sm font-semibold tracking-tight transition-colors duration-200 ${
                  isActive
                    ? "text-slate-950 font-bold"
                    : "text-slate-600 hover:text-slate-950 font-medium"
                }`}
              >
                {link.name}
                {isActive && (
                  <motion.span
                    layoutId="navbar-active-indicator"
                    className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-[3px] bg-[#C29061] rounded-full"
                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                  />
                )}
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
            title="Call Er. Sakay Antony Stalin (+91 77082 47124)"
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
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-slate-800 hover:text-black focus:outline-none"
            aria-label="Toggle Navigation"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

      </div>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden mt-2 bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-slate-200 p-5 space-y-4"
          >
            <nav className="flex flex-col space-y-1.5">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => {
                    setActiveTab(link.name);
                    setMobileMenuOpen(false);
                  }}
                  className={`text-sm font-semibold py-2 px-3 rounded-xl transition-colors ${
                    activeTab === link.name
                      ? "bg-amber-50 text-[#C29061] font-bold"
                      : "text-slate-700 hover:bg-slate-50"
                  }`}
                >
                  {link.name}
                </a>
              ))}
            </nav>
            
            <div className="pt-3 border-t border-slate-100 flex flex-col gap-2.5">
              {/* WhatsApp Button */}
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-[#25D366] hover:bg-[#20ba5a] text-white text-center py-2.5 rounded-full font-bold text-xs flex items-center justify-center gap-2 shadow-sm"
              >
                <MessageCircle className="w-4 h-4 fill-current" />
                <span>Chat on WhatsApp (+91 77082 47124)</span>
              </a>

              {/* Call Button */}
              <a
                href="tel:+917708247124"
                className="w-full bg-slate-100 hover:bg-slate-200 text-slate-900 text-center py-2.5 rounded-full font-bold text-xs flex items-center justify-center gap-2"
              >
                <Phone className="w-3.5 h-3.5 text-[#E50914]" />
                <span>Call Er. Stalin (+91 77082 47124)</span>
              </a>

              {/* Quote Button */}
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenQuote();
                }}
                className="w-full bg-[#E50914] text-white text-center py-3 rounded-full font-bold text-xs shadow-md flex items-center justify-center gap-2"
              >
                <span>Get a Free Quote</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
