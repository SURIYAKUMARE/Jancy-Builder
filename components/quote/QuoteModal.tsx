"use client";

import React, { useState } from "react";
import { X, CheckCircle2, Calculator, ArrowRight, Building, Phone, Mail, User, MapPin } from "lucide-react";

interface QuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function QuoteModal({ isOpen, onClose }: QuoteModalProps) {
  const [projectType, setProjectType] = useState("Luxury Villa");
  const [areaSqFt, setAreaSqFt] = useState(3500);
  const [floors, setFloors] = useState("G+1 (2 Floors)");
  const [packageTier, setPackageTier] = useState<"standard" | "premium" | "luxury">("luxury");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [location, setLocation] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedQuoteId, setSubmittedQuoteId] = useState<string | null>(null);

  if (!isOpen) return null;

  // Pricing calculations per sq ft based on package
  const rates = {
    standard: 2400,
    premium: 3200,
    luxury: 4400,
  };

  const estimatedTotal = areaSqFt * rates[packageTier];
  const formattedEstimate = (estimatedTotal / 10000000).toFixed(2); // In Crores

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

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
          floors,
          packageTier,
          estimatedTotal,
        }),
      });
      const data = await res.json();
      if (data.quoteId) {
        setSubmittedQuoteId(data.quoteId);
      }
    } catch (err) {
      console.error("Quote submission error:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl overflow-hidden rounded-2xl glass-panel-gold border border-yellow-500/30 shadow-2xl bg-[#090E1A]">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950/80">
          <div className="flex items-center space-x-2.5">
            <div className="p-2 rounded-xl bg-yellow-500/20 text-yellow-400">
              <Calculator className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">Get a Free Construction Estimate</h3>
              <p className="text-xs text-slate-400">Precision architectural consultation with Jancy Builders</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {submittedQuoteId ? (
          /* Confirmation Screen */
          <div className="p-8 text-center space-y-4">
            <div className="mx-auto h-16 w-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center border border-emerald-500/40">
              <CheckCircle2 className="h-10 w-10" />
            </div>
            <h4 className="text-2xl font-bold text-white">Consultation Request Confirmed!</h4>
            <p className="text-sm text-slate-300 max-w-md mx-auto">
              Thank you, <span className="font-semibold text-white">{name || "Valued Client"}</span>. Your project reference ID is:
            </p>
            <div className="inline-block px-5 py-2.5 rounded-xl bg-slate-900 border border-yellow-500/40 font-mono text-lg font-bold text-yellow-400 tracking-wider">
              {submittedQuoteId}
            </div>
            <p className="text-xs text-slate-400 max-w-md mx-auto">
              Our Chief Structural Architect will contact you at <strong className="text-slate-200">{phone}</strong> within 24 hours with a comprehensive site evaluation and detailed BOQ breakdown.
            </p>
            <button
              onClick={onClose}
              className="mt-4 px-6 py-2.5 rounded-xl bg-yellow-500 hover:bg-yellow-400 text-slate-950 font-bold text-xs uppercase tracking-wider"
            >
              Close
            </button>
          </div>
        ) : (
          /* Form Screen */
          <form onSubmit={handleSubmit} className="p-6 space-y-5 max-h-[80vh] overflow-y-auto">
            {/* Project Type */}
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-slate-400 mb-2">
                1. Project Type
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {["Luxury Villa", "Independent House", "Commercial Hub", "Duplex Residence"].map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setProjectType(t)}
                    className={`py-2 px-3 rounded-xl text-xs font-semibold border transition-all text-center ${
                      projectType === t
                        ? "bg-yellow-500/20 border-yellow-400 text-yellow-300 shadow-sm"
                        : "bg-slate-900/60 border-slate-800 text-slate-400 hover:text-slate-200"
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            {/* Built-up Area Slider */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-xs font-mono uppercase tracking-wider text-slate-400">
                  2. Built-up Area (Sq.Ft)
                </label>
                <span className="text-sm font-bold font-mono text-yellow-400">
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
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-yellow-400"
              />
            </div>

            {/* Finish Tier */}
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-slate-400 mb-2">
                3. Specification Grade
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: "standard", label: "Standard Quality", rate: "₹2,400 / sq.ft" },
                  { id: "premium", label: "Premium Elite", rate: "₹3,200 / sq.ft" },
                  { id: "luxury", label: "Ultra Luxury Craft", rate: "₹4,400 / sq.ft" },
                ].map((tier) => (
                  <button
                    key={tier.id}
                    type="button"
                    onClick={() => setPackageTier(tier.id as any)}
                    className={`p-3 rounded-xl border text-left transition-all ${
                      packageTier === tier.id
                        ? "bg-yellow-500/15 border-yellow-400 text-yellow-300 shadow-sm"
                        : "bg-slate-900/60 border-slate-800 text-slate-400 hover:text-slate-200"
                    }`}
                  >
                    <p className="text-xs font-bold text-white">{tier.label}</p>
                    <p className="text-[10px] font-mono text-slate-400 mt-0.5">{tier.rate}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Live Estimate Card */}
            <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-mono uppercase text-slate-400 tracking-wider">
                  Tentative Turnkey Budget
                </span>
                <p className="text-2xl font-black text-gold-gradient font-serif">
                  ₹{formattedEstimate} Crores
                </p>
              </div>
              <div className="text-right">
                <span className="text-[10px] font-mono text-slate-500">Includes Structural + MEP + Finishing</span>
                <p className="text-xs font-bold text-emerald-400">100% Guaranteed Timeline</p>
              </div>
            </div>

            {/* Contact Information */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1">Your Full Name</label>
                <input
                  required
                  type="text"
                  placeholder="e.g. John Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:border-yellow-400 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1">Contact Number</label>
                <input
                  required
                  type="tel"
                  placeholder="+91 98765 43210"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:border-yellow-400 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono text-slate-400 mb-1">Site / Construction Location</label>
              <input
                required
                type="text"
                placeholder="e.g. Samugarengapuram / Tirunelveli / Coimbatore"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:border-yellow-400 focus:outline-none"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-yellow-500 to-amber-500 hover:from-yellow-400 hover:to-amber-400 disabled:opacity-50 text-slate-950 font-bold text-xs uppercase tracking-wider transition-all shadow-xl shadow-yellow-500/20 active:scale-95 flex items-center justify-center space-x-2"
            >
              {isSubmitting ? (
                <span>Generating Detailed Estimate...</span>
              ) : (
                <>
                  <span>Request Full BOQ & Site Inspection</span>
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </button>

            {/* Direct Helpline */}
            <div className="pt-2 text-center text-[11px] text-slate-400">
              Prefer speaking directly? Call Er. Sakay Antony Stalin at{" "}
              <a href="tel:+917708247124" className="text-yellow-400 hover:underline font-bold">
                +91 77082 47124
              </a>{" "}
              (Open 24/7)
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
