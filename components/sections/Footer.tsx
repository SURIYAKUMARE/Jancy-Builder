"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Phone, Mail, MapPin, ShieldCheck, ArrowRight, Settings } from "lucide-react";

export default function Footer({ onOpenQuote }: { onOpenQuote: () => void }) {
  return (
    <footer className="bg-[#030509] border-t border-slate-900 text-slate-400 text-xs">
      {/* Top CTA Banner */}
      <div className="border-b border-slate-800/80 bg-gradient-to-r from-slate-950 via-[#0a1128] to-slate-950 py-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <div>
            <span className="text-[10px] font-mono text-yellow-500 uppercase tracking-widest font-bold">
              Ready to construct your masterpiece?
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold text-white mt-1">
              "FROM FOUNDATION TO FINISHED HOME."
            </h3>
            <p className="text-xs text-slate-400 mt-1 max-w-lg">
              Book a private structural consultation with our Chief Architect and receive a tailored BOQ estimation within 24 hours.
            </p>
          </div>

          <button
            onClick={onOpenQuote}
            className="px-6 py-3 rounded-xl bg-yellow-500 hover:bg-yellow-400 text-slate-950 font-bold text-xs uppercase tracking-wider transition-all shadow-xl shadow-yellow-500/25 active:scale-95 flex items-center space-x-2"
          >
            <span>Consult With Our Engineers</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
        {/* Brand Column */}
        <div className="lg:col-span-2 space-y-4">
          <div className="relative h-12 w-56">
            <Image
              src="/logo/jancy-logo.svg"
              alt="Jancy Builders"
              fill
              className="object-contain"
            />
          </div>
          <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
            Jancy Builders is a premier architectural engineering and luxury residential contracting enterprise. We transform empty plots of land into enduring architectural landmarks.
          </p>
          <div className="flex items-center space-x-2 text-[11px] text-yellow-400/90 font-mono">
            <ShieldCheck className="h-4 w-4 text-emerald-400" />
            <span>ISO 9001:2015 Certified Civil Engineering Firm</span>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-xs font-mono uppercase tracking-widest text-white font-bold mb-4">
            Construction Stages
          </h4>
          <ul className="space-y-2 text-xs">
            <li><Link href="#timelapse" className="hover:text-yellow-400 transition-colors">01 Empty Land & Survey</Link></li>
            <li><Link href="#timelapse" className="hover:text-yellow-400 transition-colors">03 Raft Foundation</Link></li>
            <li><Link href="#timelapse" className="hover:text-yellow-400 transition-colors">05 RCC Skeleton Structure</Link></li>
            <li><Link href="#timelapse" className="hover:text-yellow-400 transition-colors">08 Concealed MEP Piping</Link></li>
            <li><Link href="#timelapse" className="hover:text-yellow-400 transition-colors">12 Completed Masterpiece</Link></li>
          </ul>
        </div>

        {/* Services */}
        <div>
          <h4 className="text-xs font-mono uppercase tracking-widest text-white font-bold mb-4">
            Engineering Scope
          </h4>
          <ul className="space-y-2 text-xs">
            <li>Turnkey Luxury Villas</li>
            <li>Structural Reinforcement</li>
            <li>Commercial Corporate Hubs</li>
            <li>Biophilic Architecture</li>
            <li>Interior Millwork & MEP</li>
          </ul>
        </div>

        {/* Contact Info & Admin access */}
        <div>
          <h4 className="text-xs font-mono uppercase tracking-widest text-white font-bold mb-4">
            Corporate Office
          </h4>
          <ul className="space-y-3 text-xs">
            <li className="flex items-start space-x-2">
              <MapPin className="h-4 w-4 text-yellow-500 mt-0.5 flex-shrink-0" />
              <span>Jancy Towers, Prime Business District, Anna Salai, Chennai 600002</span>
            </li>
            <li className="flex items-center space-x-2">
              <Phone className="h-4 w-4 text-yellow-500 flex-shrink-0" />
              <span>+91 98765 43210</span>
            </li>
            <li className="flex items-center space-x-2">
              <Mail className="h-4 w-4 text-yellow-500 flex-shrink-0" />
              <span>projects@jancybuilders.com</span>
            </li>
            <li className="pt-2">
              <Link
                href="/admin/hero"
                className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 text-yellow-400 hover:text-yellow-300 transition-all font-mono text-[11px]"
              >
                <Settings className="h-3.5 w-3.5" />
                <span>Admin CMS Dashboard</span>
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Legal Bar */}
      <div className="border-t border-slate-900 py-6 px-6">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} Jancy Builders. All Rights Reserved. "BUILD THE WORLD".</p>
          <div className="flex items-center space-x-6">
            <span>RERA Registered Contractor</span>
            <span>Safety First Compliance</span>
            <Link href="/admin/hero" className="hover:text-yellow-400">Admin Login</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
