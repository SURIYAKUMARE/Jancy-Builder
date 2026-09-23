"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Phone, Mail, MapPin, ShieldCheck, ArrowRight, Settings, Sparkles } from "lucide-react";

export default function Footer({ onOpenQuote }: { onOpenQuote: () => void }) {
  return (
    <footer className="bg-[#030509] border-t border-white/10 text-slate-400 text-xs relative">
      {/* Top Banner */}
      <div className="border-b border-white/5 bg-gradient-to-r from-slate-950 via-[#0a0f1d] to-slate-950 py-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <div className="space-y-1">
            <span className="text-[10px] font-mono text-red-500 uppercase tracking-widest font-bold flex items-center justify-center md:justify-start space-x-1.5">
              <Sparkles className="h-3.5 w-3.5" />
              <span>YOUR VISION. OUR CRAFT.</span>
            </span>
            <h3 className="text-2xl sm:text-4xl font-bold text-white font-serif tracking-tight">
              From Foundation to Finished Home.
            </h3>
            <p className="text-xs text-slate-400 max-w-lg">
              Partner with Jancy Builders to bring world-class architectural engineering to your residential and commercial projects.
            </p>
          </div>

          <button
            onClick={onOpenQuote}
            className="px-6 py-3.5 rounded-xl btn-brand-primary text-white font-bold text-xs uppercase tracking-wider transition-all shadow-xl active:scale-95 flex items-center space-x-2"
          >
            <span>Consult Chief Engineer</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Main Grid */}
      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
        {/* Brand Column */}
        <div className="lg:col-span-2 space-y-4">
          <div className="relative h-14 w-60 drop-shadow-[0_0_15px_rgba(229,9,20,0.3)]">
            <Image
              src="/logo/jancy-logo-darkmode.png"
              alt="Jancy Builders - Build The World"
              fill
              className="object-contain object-left"
            />
          </div>
          <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
            Jancy Builders is a luxury civil contracting and architectural development enterprise. We build enduring modern homes and landmarks from the ground up.
          </p>
          <div className="flex items-center space-x-2 text-[11px] text-sky-400 font-mono">
            <ShieldCheck className="h-4 w-4 text-emerald-400" />
            <span>ISO 9001:2015 Certified Civil Engineering Enterprise</span>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-xs font-mono uppercase tracking-widest text-white font-bold mb-4">
            Construction Phases
          </h4>
          <ul className="space-y-2 text-xs">
            <li><Link href="#timelapse" className="hover:text-red-400 transition-colors">01 Empty Land Survey</Link></li>
            <li><Link href="#timelapse" className="hover:text-red-400 transition-colors">03 Raft Foundation</Link></li>
            <li><Link href="#timelapse" className="hover:text-red-400 transition-colors">05 RCC Concrete Framing</Link></li>
            <li><Link href="#timelapse" className="hover:text-red-400 transition-colors">08 Concealed MEP Piping</Link></li>
            <li><Link href="#timelapse" className="hover:text-red-400 transition-colors">12 Completed Residence</Link></li>
          </ul>
        </div>

        {/* Services */}
        <div>
          <h4 className="text-xs font-mono uppercase tracking-widest text-white font-bold mb-4">
            Specializations
          </h4>
          <ul className="space-y-2 text-xs">
            <li>Turnkey Luxury Villas</li>
            <li>Structural Strengthening</li>
            <li>Commercial Landmark Towers</li>
            <li>Biophilic Architecture</li>
            <li>Bespoke Interior Finishes</li>
          </ul>
        </div>

        {/* Corporate Office */}
        <div>
          <h4 className="text-xs font-mono uppercase tracking-widest text-white font-bold mb-4">
            Corporate Office
          </h4>
          <ul className="space-y-3 text-xs">
            <li className="flex items-start space-x-2">
              <MapPin className="h-4 w-4 text-red-500 mt-0.5 flex-shrink-0" />
              <span>Jancy Towers, Prime Commercial District, Anna Salai, Chennai 600002</span>
            </li>
            <li className="flex items-center space-x-2">
              <Phone className="h-4 w-4 text-red-500 flex-shrink-0" />
              <span>+91 98765 43210</span>
            </li>
            <li className="flex items-center space-x-2">
              <Mail className="h-4 w-4 text-red-500 flex-shrink-0" />
              <span>projects@jancybuilders.com</span>
            </li>
            <li className="pt-2">
              <Link
                href="/admin/hero"
                className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-white/10 text-amber-400 hover:text-amber-300 transition-all font-mono text-[11px]"
              >
                <Settings className="h-3.5 w-3.5" />
                <span>Admin CMS Portal</span>
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Legal */}
      <div className="border-t border-white/5 py-6 px-6">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-500 gap-4 font-mono">
          <p>© {new Date().getFullYear()} Jancy Builders. All Rights Reserved. "BUILD THE WORLD".</p>
          <div className="flex items-center space-x-6">
            <span>RERA Registered</span>
            <span>Zero Accident Safety Protocol</span>
            <Link href="/admin/hero" className="hover:text-red-400">Admin Login</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
