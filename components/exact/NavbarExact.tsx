"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Search, ArrowRight, Menu, X, Phone } from "lucide-react";

interface NavbarExactProps {
  onOpenQuote: () => void;
}

export default function NavbarExact({ onOpenQuote }: NavbarExactProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("Home");
  const [searchOpen, setSearchOpen] = useState(false);

  const navLinks = [
    { name: "Home", href: "#" },
    { name: "About Us", href: "#about" },
    { name: "Services", href: "#services" },
    { name: "Projects", href: "#projects" },
    { name: "Why Us", href: "#process" },
    { name: "Contact", href: "#consultation" },
  ];

  return (
    <header className="absolute top-3 sm:top-5 inset-x-0 z-50 max-w-[1440px] mx-auto px-3 sm:px-6">
      {/* Floating Capsule Container from Reference Crop media_1790167543176.png */}
      <div className="w-full bg-white/95 backdrop-blur-md rounded-2xl sm:rounded-2xl shadow-xl shadow-black/10 border border-white/60 px-4 sm:px-6 h-[72px] sm:h-20 flex items-center justify-between transition-all">
        
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
        <nav className="hidden lg:flex items-center gap-7 xl:gap-9">
          {navLinks.map((link) => {
            const isActive = activeTab === link.name;
            return (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setActiveTab(link.name)}
                className={`relative py-2 text-sm font-semibold tracking-tight transition-colors duration-200 ${
                  isActive
                    ? "text-slate-900 font-bold"
                    : "text-slate-700 hover:text-slate-950 font-medium"
                }`}
              >
                {link.name}
                {isActive && (
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-[3px] bg-[#E50914] rounded-full" />
                )}
              </a>
            );
          })}
        </nav>

        {/* Right CTA Group (Search + Divider + Phone + Red Pill Button) */}
        <div className="hidden md:flex items-center gap-4">
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
                className="w-8 h-8 flex items-center justify-center rounded-full text-slate-700 hover:text-slate-900 hover:bg-gray-100 transition-colors"
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
            className="hidden lg:flex items-center gap-2.5 text-slate-900 hover:text-[#E50914] transition-colors group/phone"
            title="Call Er. Stalin Antony"
          >
            <div className="w-8 h-8 rounded-full flex items-center justify-center text-[#E50914] group-hover/phone:scale-110 transition-transform">
              <Phone className="w-4 h-4 stroke-[2]" />
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

          {/* Red Pill CTA Button (From Reference Crop) */}
          <button
            onClick={onOpenQuote}
            className="group relative inline-flex items-center gap-2 bg-[#E50914] hover:bg-[#DC2626] text-white text-xs sm:text-sm font-semibold px-5 py-2.5 rounded-full shadow-md shadow-red-600/30 active:scale-95 transition-all duration-200"
          >
            <span>Get a Quote</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1" />
          </button>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex lg:hidden items-center gap-2">
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
      {mobileMenuOpen && (
        <div className="lg:hidden mt-2 bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl border border-gray-100 p-5 space-y-4 animate-fadeIn">
          <nav className="flex flex-col space-y-2">
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
                    ? "bg-red-50 text-[#E50914] font-bold"
                    : "text-slate-700 hover:bg-gray-50"
                }`}
              >
                {link.name}
              </a>
            ))}
          </nav>
          
          <div className="pt-3 border-t border-gray-100 flex flex-col gap-2.5">
            <a
              href="tel:+917708247124"
              className="w-full bg-slate-100 hover:bg-slate-200 text-slate-900 text-center py-2.5 rounded-full font-bold text-xs flex items-center justify-center gap-2"
            >
              <Phone className="w-3.5 h-3.5 text-[#E50914]" />
              <span>+91 77082 47124 &bull; Talk to Our Expert</span>
            </a>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenQuote();
              }}
              className="w-full bg-[#E50914] text-white text-center py-3 rounded-full font-bold text-xs shadow-md flex items-center justify-center gap-2"
            >
              <span>Get a Quote</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
