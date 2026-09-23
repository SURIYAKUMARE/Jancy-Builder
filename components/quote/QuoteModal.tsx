"use client";

import React, { useState } from "react";
import {
  X,
  CheckCircle2,
  Calculator,
  ArrowRight,
  MessageCircle,
  Phone,
  ShieldCheck,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { trackEvent } from "@/lib/analytics";

interface QuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialType?: string;
  initialArea?: number;
  initialGrade?: "standard" | "premium" | "ultra";
}

export default function QuoteModal({
  isOpen,
  onClose,
  initialType = "Luxury Villa",
  initialArea = 3500,
  initialGrade = "ultra",
}: QuoteModalProps) {
  const [projectType, setProjectType] = useState(initialType);
  const [areaSqFt, setAreaSqFt] = useState(initialArea);
  const [grade, setGrade] = useState<"standard" | "premium" | "ultra">(initialGrade);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [location, setLocation] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedQuoteId, setSubmittedQuoteId] = useState<string | null>(null);

  if (!isOpen) return null;

  // Pricing calculations matching exact rates
  const rates = {
    standard: 2400,
    premium: 3200,
    ultra: 4400,
  };

  const estimatedTotal = areaSqFt * rates[grade];
  const formattedEstimateCrores = (estimatedTotal / 10000000).toFixed(2);
  const formattedEstimateLakhs = Math.round(estimatedTotal / 100000);

  const getWhatsappUrl = () => {
    const gradeLabel =
      grade === "standard"
        ? "Standard Quality (₹2,400/sq.ft)"
        : grade === "premium"
        ? "Premium Elite (₹3,200/sq.ft)"
        : "Ultra Luxury Craft (₹4,400/sq.ft)";

    const message = `🏗️ *Turnkey Construction & BOQ Request*
*Jancy Builders — BUILD THE WORLD*
---------------------------------------------
👤 *Client Name:* ${name || "Valued Client"}
📱 *Contact Number:* ${phone}
📍 *Site Location:* ${location || "Samugarengapuram / Tirunelveli"}
🏛️ *Project Type:* ${projectType}
📐 *Built-Up Area:* ${areaSqFt.toLocaleString()} sq.ft
💎 *Specification Grade:* ${gradeLabel}
💰 *Tentative Budget:* ₹${formattedEstimateCrores} Crores (Approx. ₹${formattedEstimateLakhs} Lakhs)

✅ *Included:* Structural + MEP + Finishing + 100% Guaranteed Timeline

Hello Er. Sahaya Antony Stalin, I would like to request the comprehensive BOQ document and schedule an architectural site evaluation.`;

    return `https://wa.me/917708247124?text=${encodeURIComponent(message)}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    trackEvent("quote_submission", { projectType, areaSqFt, grade, location });

    const whatsappUrl = getWhatsappUrl();

    try {
      const res = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          phone,
          location,
          projectType,
          areaSqFt,
          packageTier: grade,
          estimatedTotal,
        }),
      });
      const data = await res.json();
      if (data.quoteId) {
        setSubmittedQuoteId(data.quoteId);
      } else {
        setSubmittedQuoteId(`JB-${Math.floor(100000 + Math.random() * 900000)}`);
      }
    } catch (err) {
      setSubmittedQuoteId(`JB-${Math.floor(100000 + Math.random() * 900000)}`);
    } finally {
      setIsSubmitting(false);
      // Automatically launch WhatsApp with pre-composed specification
      if (typeof window !== "undefined") {
        window.open(whatsappUrl, "_blank");
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/80 backdrop-blur-md overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 15 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        className="relative w-full max-w-xl rounded-3xl bg-[#0C1019] text-white shadow-2xl border border-white/15 overflow-hidden my-auto"
      >
        {/* Modal Header Matching media_1790183200649.png */}
        <div className="flex items-center justify-between px-6 pt-6 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#F59E0B]/20 border border-[#F59E0B]/30 flex items-center justify-center text-[#F59E0B]">
              <Calculator className="w-5 h-5 stroke-[2.2]" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-white font-sans leading-tight">
                Get a Free Construction Estimate
              </h3>
              <p className="text-xs text-slate-400 leading-tight mt-0.5">
                Precision architectural consultation with Jancy Builders
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-white flex items-center justify-center transition-colors"
            aria-label="Close Modal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {submittedQuoteId ? (
          /* Confirmation Screen */
          <div className="p-8 text-center space-y-4">
            <div className="mx-auto h-16 w-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center border border-emerald-500/40">
              <CheckCircle2 className="h-9 w-9" />
            </div>
            <h4 className="text-2xl font-bold text-white">Consultation Request Confirmed!</h4>
            <p className="text-sm text-slate-300 max-w-md mx-auto">
              Thank you, <span className="font-semibold text-white">{name || "Valued Client"}</span>. Your project reference ID is:
            </p>
            <div className="inline-block px-5 py-2.5 rounded-xl bg-slate-900 border border-[#F59E0B]/40 font-mono text-lg font-bold text-[#F59E0B] tracking-wider">
              {submittedQuoteId}
            </div>
            <p className="text-xs text-slate-400 max-w-md mx-auto">
              Our Chief Structural Engineer, <strong>Er. Sahaya Antony Stalin</strong>, will review your project and contact you at <strong className="text-slate-200">{phone}</strong> within 24 hours with a comprehensive site evaluation.
            </p>

            <div className="pt-3 flex flex-col sm:flex-row items-center justify-center gap-3">
              <a
                href={getWhatsappUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-[#25D366]/25 transition-all hover:scale-105"
              >
                <MessageCircle className="w-4 h-4 fill-current" />
                <span>Chat on WhatsApp Directly</span>
              </a>
              <button
                onClick={onClose}
                className="w-full sm:w-auto px-6 py-3 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs uppercase tracking-wider"
              >
                Close
              </button>
            </div>
          </div>
        ) : (
          /* Form Content Matching media_1790183200649.png */
          <form onSubmit={handleSubmit} className="px-6 pb-6 space-y-5">
            
            {/* 1. PROJECT TYPE */}
            <div>
              <label className="block text-[11px] font-mono uppercase tracking-wider text-slate-400 mb-2">
                1. PROJECT TYPE
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {["Luxury Villa", "Independent House", "Commercial Hub", "Duplex Residence"].map((type) => {
                  const isSelected = projectType === type;
                  return (
                    <button
                      key={type}
                      type="button"
                      onClick={() => setProjectType(type)}
                      className={`py-2 px-2.5 rounded-xl text-xs font-semibold border transition-all text-center ${
                        isSelected
                          ? "bg-[#1E190E] border-[#F59E0B] text-[#F59E0B] shadow-sm font-bold"
                          : "bg-slate-900/60 border-white/10 text-slate-300 hover:text-white hover:border-white/20"
                      }`}
                    >
                      {type}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 2. BUILT-UP AREA (SQ.FT) */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-[11px] font-mono uppercase tracking-wider text-slate-400">
                  2. BUILT-UP AREA (SQ.FT)
                </label>
                <span className="text-sm font-bold font-mono text-[#F59E0B]">
                  {areaSqFt.toLocaleString()} sq.ft
                </span>
              </div>
              <input
                type="range"
                min="1000"
                max="12000"
                step="250"
                value={areaSqFt}
                onChange={(e) => setAreaSqFt(Number(e.target.value))}
                className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-[#F59E0B]"
              />
            </div>

            {/* 3. SPECIFICATION GRADE */}
            <div>
              <label className="block text-[11px] font-mono uppercase tracking-wider text-slate-400 mb-2">
                3. SPECIFICATION GRADE
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                {[
                  { id: "standard" as const, title: "Standard Quality", rate: "₹2,400 / sq.ft" },
                  { id: "premium" as const, title: "Premium Elite", rate: "₹3,200 / sq.ft" },
                  { id: "ultra" as const, title: "Ultra Luxury Craft", rate: "₹4,400 / sq.ft" },
                ].map((pkg) => {
                  const isSelected = grade === pkg.id;
                  return (
                    <div
                      key={pkg.id}
                      onClick={() => setGrade(pkg.id)}
                      className={`p-3 rounded-2xl border cursor-pointer transition-all ${
                        isSelected
                          ? "bg-[#1E190E] border-[#F59E0B] shadow-md"
                          : "bg-slate-900/60 border-white/10 hover:border-white/20"
                      }`}
                    >
                      <h5 className="text-xs font-bold text-white">{pkg.title}</h5>
                      <p className="text-[11px] text-slate-400 font-mono mt-0.5">{pkg.rate}</p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* TENTATIVE TURNKEY BUDGET BOX Matching media_1790183200649.png */}
            <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-inner">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block">
                  TENTATIVE TURNKEY BUDGET
                </span>
                <div className="text-2xl sm:text-3xl font-black text-[#F59E0B] font-sans tracking-tight mt-0.5">
                  ₹{formattedEstimateCrores} Crores
                </div>
              </div>

              <div className="text-left sm:text-right">
                <span className="text-[11px] text-slate-400 block">
                  Includes Structural + MEP + Finishing
                </span>
                <span className="text-xs font-bold text-emerald-400 block mt-0.5">
                  100% Guaranteed Timeline
                </span>
              </div>
            </div>

            {/* Contact Input Fields */}
            <div className="space-y-3 pt-1">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] text-slate-300 font-medium mb-1">
                    Your Full Name
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. John Doe"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700/80 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-[#F59E0B] transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-[11px] text-slate-300 font-medium mb-1">
                    Contact Number
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91 98765 43210"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700/80 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-[#F59E0B] transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] text-slate-300 font-medium mb-1">
                  Site / Construction Location
                </label>
                <input
                  type="text"
                  required
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="e.g. Samugarengapuram / Tirunelveli / Coimbatore"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700/80 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-[#F59E0B] transition-colors"
                />
              </div>
            </div>

            {/* Vibrant Gold CTA Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              disabled={isSubmitting}
              type="submit"
              className="w-full py-3.5 px-6 rounded-full bg-[#F59E0B] hover:bg-[#D97706] text-slate-950 font-black text-xs sm:text-sm uppercase tracking-wider shadow-lg shadow-[#F59E0B]/25 flex items-center justify-center gap-2 transition-all"
            >
              <span>{isSubmitting ? "PROCESSING ESTIMATE..." : "REQUEST FULL BOQ & SITE INSPECTION"}</span>
              <ArrowRight className="w-4 h-4" />
            </motion.button>

            {/* Footer Note Matching media_1790183200649.png */}
            <div className="text-center pt-1">
              <p className="text-[11px] text-slate-400">
                Prefer speaking directly? Call Er. Sahaya Antony Stalin at{" "}
                <a
                  href="tel:+917708247124"
                  onClick={() => trackEvent("expert_call_click", { source: "quote_modal" })}
                  className="text-[#F59E0B] font-bold hover:underline"
                >
                  +91 77082 47124
                </a>{" "}
                (Open 24/7)
              </p>
            </div>

          </form>
        )}
      </motion.div>
    </div>
  );
}
