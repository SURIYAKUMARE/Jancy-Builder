"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Facebook, MapPin, Phone, Clock, Star, ExternalLink, MessageCircle } from "lucide-react";

export default function FooterExact() {
  const currentYear = new Date().getFullYear();

  const whatsappMessage = encodeURIComponent(
    "Hello Jancy Builders, I would like to discuss a construction project with Er. Sahaya Antony Stalin."
  );
  const whatsappUrl = `https://wa.me/917708247124?text=${whatsappMessage}`;

  return (
    <footer id="footer" className="w-full bg-[#0B0F19] text-slate-400 pt-14 pb-8 border-t border-slate-800/80 scroll-mt-24">
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
              Led personally by Chief Civil Engineer <strong className="text-white">Er. Sahaya Antony Stalin</strong>, B.E. (Civil), Jancy Builders delivers architectural design, precision structural engineering, and turnkey construction across Tirunelveli and South Tamil Nadu.
            </p>
            <div className="flex items-center gap-1.5 pt-1 text-[#C29061]">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-current" />
                ))}
              </div>
              <span className="font-bold text-white text-[11px]">5.0 / 5.0 Star Client Rating</span>
            </div>
          </div>

          {/* Col 2: Office & Headquarters */}
          <div className="space-y-2.5">
            <span className="text-[11px] font-mono uppercase tracking-wider text-slate-300 font-bold block">
              Headquarters
            </span>
            <div className="flex items-start gap-2 text-slate-300">
              <MapPin className="w-4 h-4 text-[#C29061] flex-shrink-0 mt-0.5" />
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
              className="inline-flex items-center gap-1 text-[11px] text-[#C29061] hover:text-[#d8a573] font-medium pt-1 transition-colors"
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
              <Phone className="w-4 h-4 text-[#C29061] flex-shrink-0" />
              <a
                href="tel:+917708247124"
                className="text-white hover:text-[#C29061] font-semibold text-[13px] transition-colors"
              >
                +91 77082 47124
              </a>
            </div>
            <div className="flex items-center gap-2 text-slate-300">
              <Clock className="w-4 h-4 text-[#C29061] flex-shrink-0" />
              <span className="text-[12px]">Open 24 Hours • Mon – Sun</span>
            </div>
            <p className="text-slate-500 text-[11px] pt-1">
              Active Sites across Tirunelveli, Samugarengapuram, Durainagar, Silathikulam, Valliyur &amp; South Tamil Nadu.
            </p>
          </div>

          {/* Col 4: Quick Links & Handwriting Message */}
          <div className="space-y-3">
            <span className="text-[11px] font-mono uppercase tracking-wider text-slate-300 font-bold block">
              Navigation
            </span>
            <div className="grid grid-cols-2 gap-2 text-[12px]">
              <Link href="/" className="hover:text-white transition-colors">Home</Link>
              <Link href="/about" className="hover:text-white transition-colors">About Us</Link>
              <Link href="/services" className="hover:text-white transition-colors">Services</Link>
              <Link href="/projects" className="hover:text-white transition-colors">Projects</Link>
              <Link href="/gallery" className="hover:text-white transition-colors">Gallery</Link>
              <Link href="/process" className="hover:text-white transition-colors">Process</Link>
              <Link href="/estimator" className="hover:text-white transition-colors">Estimator</Link>
              <Link href="/contact" className="hover:text-white transition-colors">Contact</Link>
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

          {/* Copyright & Admin Link */}
          <div className="flex items-center gap-4 text-[11px] text-slate-500">
            <span>&copy; {currentYear} JANCY BUILDERS. Est. 2016. Samugarengapuram, Tirunelveli.</span>
            <span>&bull;</span>
            <Link href="/admin/hero" className="hover:text-[#C29061] text-slate-400 transition-colors">
              Admin CMS &rarr;
            </Link>
          </div>

        </div>

      </div>
    </footer>
  );
}
