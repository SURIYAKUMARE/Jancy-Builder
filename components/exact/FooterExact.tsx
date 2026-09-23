"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Facebook, Instagram, Linkedin, Youtube } from "lucide-react";

export default function FooterExact() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-[#0B0F19] text-slate-400 py-6 sm:py-8 border-t border-slate-800/80">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Row */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          
          {/* Left: Official Logo */}
          <div className="flex items-center gap-3">
            <Link href="/" className="relative h-10 w-40 sm:h-11 sm:w-44 focus:outline-none">
              <Image
                src="/logo/jancy-logo-darkmode.png"
                alt="Jancy Builders - BUILD THE WORLD"
                fill
                className="object-contain object-left"
              />
            </Link>
          </div>

          {/* Center: Nav links */}
          <nav className="flex items-center flex-wrap justify-center gap-6 sm:gap-8 text-xs font-medium text-slate-400">
            <a href="#" className="hover:text-white transition-colors">Home</a>
            <a href="#about" className="hover:text-white transition-colors">About Us</a>
            <a href="#services" className="hover:text-white transition-colors">Services</a>
            <a href="#projects" className="hover:text-white transition-colors">Projects</a>
            <a href="#consultation" className="hover:text-white transition-colors">Contact</a>
          </nav>

          {/* Right: Social Media Icons + Watermark handwriting text */}
          <div className="flex items-center gap-6">
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

            {/* Handwriting Watermark script from reference screenshot */}
            <div className="hidden lg:block select-none pointer-events-none pl-4 border-l border-slate-800">
              <span className="font-['Caveat',cursive] text-lg sm:text-xl text-slate-400 font-medium tracking-wide">
                Together We Build a Better Tomorrow
              </span>
            </div>
          </div>

        </div>

        {/* Bottom copyright row */}
        <div className="mt-6 pt-4 border-t border-slate-800/50 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-400 gap-2">
          <span>&copy; {currentYear} Jancy Builders. All rights reserved. &bull; BUILD THE WORLD</span>
          <div className="flex items-center gap-4">
            <Link href="/admin/hero" className="hover:text-red-400 text-slate-400 transition-colors">
              Admin Portal CMS &rarr;
            </Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
