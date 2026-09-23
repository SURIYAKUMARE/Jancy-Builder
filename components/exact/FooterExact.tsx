"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Facebook, Instagram, Linkedin, Youtube, MapPin, Phone, Clock, Star, ExternalLink } from "lucide-react";

export default function FooterExact() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-[#0B0F19] text-slate-400 pt-10 pb-6 border-t border-slate-800/80">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Business Credentials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 pb-8 border-b border-slate-800/60 text-xs">
          
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
              Led by <strong className="text-white">Er. Sakay Antony Stalin</strong>, Jancy Builders has been transforming blueprints into landmark residences and commercial spaces since 2016.
            </p>
            <div className="flex items-center gap-1.5 pt-1 text-[#DC2626]">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-current" />
                ))}
              </div>
              <span className="font-bold text-white text-[11px]">5.0 / 5.0 Star Rated on Justdial</span>
            </div>
          </div>

          {/* Col 2: Office & Headquarters */}
          <div className="space-y-2.5">
            <span className="text-[11px] font-mono uppercase tracking-wider text-slate-300 font-bold block">
              Headquarters
            </span>
            <div className="flex items-start gap-2 text-slate-300">
              <MapPin className="w-4 h-4 text-[#DC2626] flex-shrink-0 mt-0.5" />
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
              rel="noreferrer"
              className="inline-flex items-center gap-1 text-[11px] text-[#DC2626] hover:text-red-400 font-medium pt-1 transition-colors"
            >
              <span>Get Directions (Google Maps)</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>

          {/* Col 3: Direct Contact & Availability */}
          <div className="space-y-2.5">
            <span className="text-[11px] font-mono uppercase tracking-wider text-slate-300 font-bold block">
              Direct Contact
            </span>
            <div className="flex items-center gap-2 text-slate-300">
              <Phone className="w-4 h-4 text-[#DC2626] flex-shrink-0" />
              <a
                href="tel:+917708247124"
                className="text-white hover:text-[#DC2626] font-semibold text-[13px] transition-colors"
              >
                +91 77082 47124
              </a>
            </div>
            <div className="flex items-center gap-2 text-slate-300">
              <Clock className="w-4 h-4 text-[#DC2626] flex-shrink-0" />
              <span className="text-[12px]">Open 24 Hours • Mon – Sun</span>
            </div>
            <p className="text-slate-500 text-[11px] pt-1">
              Serving Tirunelveli, Samugarengapuram, Vallioor, Kanyakumari, Coimbatore & South Tamil Nadu.
            </p>
          </div>

          {/* Col 4: Quick Links & Handwriting Message */}
          <div className="space-y-3">
            <span className="text-[11px] font-mono uppercase tracking-wider text-slate-300 font-bold block">
              Quick Navigation
            </span>
            <div className="grid grid-cols-2 gap-2 text-[12px]">
              <a href="#" className="hover:text-white transition-colors">Home</a>
              <a href="#about" className="hover:text-white transition-colors">About Us</a>
              <a href="#services" className="hover:text-white transition-colors">Services</a>
              <a href="#projects" className="hover:text-white transition-colors">Projects</a>
              <a href="#process" className="hover:text-white transition-colors">How It Works</a>
              <a href="#consultation" className="hover:text-white transition-colors">Free Quote</a>
            </div>
            <div className="pt-2">
              <span className="font-['Caveat',cursive] text-lg sm:text-xl text-slate-400 font-medium tracking-wide block">
                Together We Build a Better Tomorrow
              </span>
            </div>
          </div>

        </div>

        {/* Social & Bottom Bar */}
        <div className="pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs">
          
          {/* Social Icons */}
          <div className="flex items-center gap-2">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noreferrer"
              className="w-8 h-8 rounded-full bg-slate-800/80 hover:bg-[#DC2626] text-slate-300 hover:text-white flex items-center justify-center transition-colors"
              aria-label="Facebook"
            >
              <Facebook className="w-3.5 h-3.5" />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              className="w-8 h-8 rounded-full bg-slate-800/80 hover:bg-[#DC2626] text-slate-300 hover:text-white flex items-center justify-center transition-colors"
              aria-label="Instagram"
            >
              <Instagram className="w-3.5 h-3.5" />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noreferrer"
              className="w-8 h-8 rounded-full bg-slate-800/80 hover:bg-[#DC2626] text-slate-300 hover:text-white flex items-center justify-center transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-3.5 h-3.5" />
            </a>
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noreferrer"
              className="w-8 h-8 rounded-full bg-slate-800/80 hover:bg-[#DC2626] text-slate-300 hover:text-white flex items-center justify-center transition-colors"
              aria-label="YouTube"
            >
              <Youtube className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Copyright & Admin Link */}
          <div className="flex items-center gap-4 text-[11px] text-slate-500">
            <span>&copy; {currentYear} JANCY BUILDERS. Est. 2016. Samugarengapuram, Tirunelveli.</span>
            <span>&bull;</span>
            <Link href="/admin/hero" className="hover:text-red-400 text-slate-400 transition-colors">
              Admin CMS &rarr;
            </Link>
          </div>

        </div>

      </div>
    </footer>
  );
}
