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
    <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-md border-b border-gray-100 transition-all shadow-sm">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-3 group focus:outline-none">
          <div className="relative h-12 w-44 sm:h-14 sm:w-52 transition-transform duration-200 group-hover:scale-[1.02]">
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
        <nav className="hidden md:flex items-center gap-8 lg:gap-10">
          {navLinks.map((link) => {
            const isActive = activeTab === link.name;
            return (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setActiveTab(link.name)}
                className={`relative py-2 text-sm font-medium tracking-tight transition-colors duration-200 ${
                  isActive
                    ? "text-slate-900 font-semibold"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                {link.name}
                {isActive && (
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-[2.5px] bg-[#DC2626] rounded-full" />
                )}
              </a>
            );
          })}
        </nav>

        {/* Right CTA & Search */}
        <div className="hidden md:flex items-center gap-4">
          {/* Search Trigger */}
          <div className="relative">
            {searchOpen ? (
              <div className="flex items-center bg-gray-50 border border-gray-200 rounded-full px-3 py-1.5 animate-fadeIn">
                <input
                  type="text"
                  placeholder="Search projects, services..."
                  autoFocus
                  onBlur={() => setSearchOpen(false)}
                  className="bg-transparent text-xs text-slate-800 placeholder-slate-400 focus:outline-none w-44"
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
                className="w-9 h-9 flex items-center justify-center rounded-full text-slate-600 hover:text-slate-900 hover:bg-gray-100 transition-colors"
                title="Search"
                aria-label="Search"
              >
                <Search className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Direct Phone Call Button */}
          <a
            href="tel:+917708247124"
            className="hidden lg:inline-flex items-center gap-2 text-slate-700 hover:text-[#DC2626] font-semibold text-xs py-2 px-3 rounded-full hover:bg-gray-100 transition-colors"
            title="Call Jancy Builders"
          >
            <Phone className="w-3.5 h-3.5 text-[#DC2626]" />
            <span>+91 77082 47124</span>
          </a>

          {/* Red Pill Get a Quote Button */}
          <button
            onClick={onOpenQuote}
            className="group relative inline-flex items-center gap-2 bg-[#DC2626] hover:bg-[#B91C1C] text-white text-sm font-medium px-5 py-2.5 rounded-full shadow-md shadow-red-500/20 active:scale-95 transition-all duration-200"
          >
            <span>Get a Quote</span>
            <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
          </button>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex md:hidden items-center gap-2">
          <button
            onClick={onOpenQuote}
            className="bg-[#DC2626] text-white text-xs font-semibold px-3 py-2 rounded-full"
          >
            Get a Quote
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-slate-700 hover:text-slate-900 focus:outline-none"
            aria-label="Toggle Navigation"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-gray-200 px-6 py-6 space-y-4 animate-fadeIn">
          <nav className="flex flex-col space-y-3">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => {
                  setActiveTab(link.name);
                  setMobileMenuOpen(false);
                }}
                className={`text-base font-medium py-2 px-3 rounded-lg transition-colors ${
                  activeTab === link.name
                    ? "bg-red-50 text-[#DC2626] font-semibold"
                    : "text-slate-700 hover:bg-gray-50"
                }`}
              >
                {link.name}
              </a>
            ))}
          </nav>
          <div className="pt-4 border-t border-gray-100 flex flex-col gap-3">
            <a
              href="tel:+917708247124"
              className="w-full bg-slate-100 hover:bg-slate-200 text-slate-900 text-center py-2.5 rounded-full font-semibold text-sm flex items-center justify-center gap-2"
            >
              <Phone className="w-4 h-4 text-[#DC2626]" />
              <span>Call +91 77082 47124</span>
            </a>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenQuote();
              }}
              className="w-full bg-[#DC2626] text-white text-center py-3 rounded-full font-semibold shadow-md flex items-center justify-center gap-2"
            >
              <span>Get a Quote</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
