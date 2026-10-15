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
  Check,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

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
  initialArea = 2200,
  initialGrade = "premium",
}: QuoteModalProps) {
  const [projectType, setProjectType] = useState(initialType);
  const [areaSqFt, setAreaSqFt] = useState(initialArea);
  const [grade, setGrade] = useState<"standard" | "premium" | "ultra">(initialGrade);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [location, setLocation] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [submittedQuoteId, setSubmittedQuoteId] = useState<string | null>(null);

  React.useEffect(() => {
    if (initialGrade) setGrade(initialGrade);
  }, [initialGrade, isOpen]);

  if (!isOpen) return null;

  const rates = {
    standard: 2400,
    premium: 3200,
    ultra: 4400,
  };

  const estimatedTotal = areaSqFt * rates[grade];
  const formattedEstimateCrores = (estimatedTotal / 10000000).toFixed(2);
  const formattedEstimateLakhs = Math.round(estimatedTotal / 100000);

  const getWhatsappUrl = () => {
    const message = `Hello Er. Sahaya Antony Stalin, I would like to request an official construction estimate from Jancy Builders.
Type: ${projectType}
Area: ${areaSqFt.toLocaleString()} sq.ft
Grade: ${grade.toUpperCase()} (₹${rates[grade]}/sq.ft)
Estimated Investment: Approx. ₹${formattedEstimateLakhs} Lakhs
Location: ${location || "Tirunelveli District"}`;
    return `https://wa.me/917708247124?text=${encodeURIComponent(message)}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    const cleanPhone = phone.replace(/[^0-9]/g, "");
    if (cleanPhone.length < 10) {
      setErrorMessage("Please enter a valid 10-digit mobile number");
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          phone: cleanPhone,
          location: location.trim() || "Tirunelveli District",
          projectType,
          builtUpArea: areaSqFt,
          tier: grade,
          estimatedTotal,
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Failed to submit quote request");
      }

      setSubmittedQuoteId(data.quoteId || "JB-ESTIMATE-OK");
    } catch (err: any) {
      setErrorMessage(err.message || "Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center p-3 sm:p-5 bg-black/85 backdrop-blur-xl overflow-y-auto font-body">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        className="relative w-full max-w-xl rounded-3xl liquid-glass-strong bg-[#0F1115]/95 text-white shadow-2xl border border-white/20 overflow-hidden my-auto text-left"
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 pt-6 pb-4 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl liquid-glass flex items-center justify-center text-[#C9A46B]">
              <Calculator className="w-5 h-5 stroke-[2.2]" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-heading italic text-white leading-tight">
                Get a Free Construction Estimate
              </h3>
              <p className="text-xs text-white/60 leading-tight mt-0.5">
                Precision civil engineering consultation with Jancy Builders
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full liquid-glass hover:bg-white/20 text-white flex items-center justify-center transition-colors"
            aria-label="Close Modal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {submittedQuoteId ? (
          /* Confirmation Screen */
          <div className="p-8 text-center space-y-4">
            <div className="mx-auto h-16 w-16 rounded-full bg-[#C9A46B]/20 text-[#C9A46B] flex items-center justify-center border border-[#C9A46B]/40">
              <CheckCircle2 className="h-8 w-8" />
            </div>
            <h4 className="text-2xl font-heading italic text-white">Estimate Request Received</h4>
            <div className="inline-block px-5 py-2 rounded-xl liquid-glass font-mono text-base font-bold text-[#E2C496]">
              {submittedQuoteId}
            </div>
            <p className="text-xs text-white/70 max-w-md mx-auto leading-relaxed">
              Chief Civil Engineer <strong>Er. Sahaya Antony Stalin</strong> will review your specifications and contact you at <strong className="text-white">{phone}</strong> with a detailed BOQ.
            </p>

            <div className="pt-3 flex flex-col sm:flex-row items-center justify-center gap-3">
              <a
                href={getWhatsappUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-[#25D366] hover:bg-[#20ba5a] text-black font-bold text-xs uppercase tracking-wider shadow-lg"
              >
                <MessageCircle className="w-4 h-4 fill-current" />
                <span>Chat on WhatsApp Directly</span>
              </a>
              <button
                onClick={onClose}
                className="w-full sm:w-auto px-6 py-3 rounded-full liquid-glass text-white font-bold text-xs uppercase tracking-wider"
              >
                Close
              </button>
            </div>
          </div>
        ) : (
          /* Form Content */
          <form onSubmit={handleSubmit} className="px-6 pt-5 pb-6 space-y-4">
            {/* 1. PROJECT TYPE */}
            <div>
              <label className="block text-[11px] font-mono uppercase tracking-wider text-white/60 mb-1.5">
                1. Project Typology
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {["Luxury Villa", "Independent House", "Duplex Residence", "Commercial Hub"].map((type) => {
                  const isSelected = projectType === type;
                  return (
                    <button
                      key={type}
                      type="button"
                      onClick={() => setProjectType(type)}
                      className={`py-2 px-2.5 rounded-xl text-xs font-semibold border transition-all text-center ${
                        isSelected
                          ? "liquid-glass-strong border-[#C9A46B] text-[#E2C496] shadow-sm font-bold"
                          : "liquid-glass text-white/60 hover:text-white"
                      }`}
                    >
                      {type}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 2. BUILT-UP AREA */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-[11px] font-mono uppercase tracking-wider text-white/60">
                  2. Built-Up Area (sq.ft)
                </label>
                <span className="text-sm font-bold font-mono text-[#E2C496]">
                  {areaSqFt.toLocaleString()} sq.ft
                </span>
              </div>
              <input
                type="range"
                min="800"
                max="8000"
                step="100"
                value={areaSqFt}
                onChange={(e) => setAreaSqFt(Number(e.target.value))}
                className="w-full accent-[#C9A46B] cursor-pointer h-2 bg-white/10 rounded-lg appearance-none"
              />
            </div>

            {/* 3. MATERIAL GRADE */}
            <div>
              <label className="block text-[11px] font-mono uppercase tracking-wider text-white/60 mb-1.5">
                3. Material Package
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: "standard" as const, name: "Standard", rate: "₹2,400" },
                  { id: "premium" as const, name: "Porotherm", rate: "₹3,200" },
                  { id: "ultra" as const, name: "Ultra", rate: "₹4,400" },
                ].map((tier) => {
                  const isSelected = grade === tier.id;
                  return (
                    <button
                      key={tier.id}
                      type="button"
                      onClick={() => setGrade(tier.id)}
                      className={`py-2 px-2.5 rounded-xl text-xs font-semibold border transition-all text-center ${
                        isSelected
                          ? "liquid-glass-strong border-[#C9A46B] text-white shadow-sm font-bold"
                          : "liquid-glass text-white/60 hover:text-white"
                      }`}
                    >
                      <span className="block">{tier.name}</span>
                      <span className="text-[10px] text-[#C9A46B] font-mono">{tier.rate}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Estimated Display */}
            <div className="p-3.5 rounded-xl liquid-glass flex items-center justify-between">
              <span className="text-xs text-white/70">Estimated Turnkey Cost:</span>
              <span className="text-lg font-heading italic text-[#E2C496]">
                ~₹{formattedEstimateLakhs} Lakhs
              </span>
            </div>

            {/* 4. CONTACT DETAILS */}
            <div className="space-y-3 pt-1">
              <div>
                <input
                  type="text"
                  required
                  placeholder="Your Full Name *"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/15 text-xs text-white placeholder-white/30 focus:outline-none focus:border-[#C9A46B]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <input
                  type="tel"
                  required
                  placeholder="Mobile (10 Digits) *"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/15 text-xs text-white placeholder-white/30 focus:outline-none focus:border-[#C9A46B] font-mono"
                />
                <input
                  type="text"
                  placeholder="Plot Location / City"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/15 text-xs text-white placeholder-white/30 focus:outline-none focus:border-[#C9A46B]"
                />
              </div>
            </div>

            {errorMessage && (
              <p className="text-xs text-red-400">{errorMessage}</p>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-white via-slate-100 to-[#E2C496] disabled:opacity-50 text-black font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg"
            >
              {isSubmitting ? (
                <span>Generating Estimate...</span>
              ) : (
                <>
                  <span>Request Official Itemized BOQ</span>
                  <ArrowRight className="w-4 h-4 text-black" />
                </>
              )}
            </button>
          </form>
        )}
      </motion.div>
    </div>
  );
}
