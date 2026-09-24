"use client";

import React, { useState } from "react";
import {
  Phone,
  MessageCircle,
  MapPin,
  Send,
  CheckCircle2,
  Clock,
  ExternalLink,
  Shield,
  Sparkles,
} from "lucide-react";
import { motion } from "framer-motion";

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    projectType: "Luxury Villa",
    location: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [quoteId, setQuoteId] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const res = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success) {
        setIsSubmitted(true);
        setQuoteId(data.quoteId || "JB-CONFIRMED");
      }
    } catch (err) {
      console.error("Submission error:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const whatsappMessage = encodeURIComponent(
    `Hello Er. Sahaya Antony Stalin, I would like to schedule a site consultation for my construction project in ${formData.location || "Tamil Nadu"}. Name: ${formData.name || "Customer"}, Phone: ${formData.phone || ""}`
  );
  const whatsappUrl = `https://wa.me/917708247124?text=${whatsappMessage}`;

  return (
    <section id="contact" className="py-20 lg:py-28 bg-[#F7F4EE] border-t border-b border-[#E8DFD1] relative overflow-hidden scroll-mt-20">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Title */}
        <div className="max-w-2xl mb-14">
          <div className="flex items-center gap-2 mb-2">
            <span className="h-[2px] w-8 bg-[#B88746] block" />
            <span className="text-xs font-mono font-bold uppercase tracking-[0.25em] text-[#B88746]">
              GET IN TOUCH
            </span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-slate-950 tracking-tight font-sans">
            Start Your Construction Journey
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed">
            Speak directly with Chief Civil Engineer <strong>Er. Sahaya Antony Stalin</strong> for precision structural estimation, architectural plans, and hassle-free turnkey execution.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          
          {/* Left Column: Direct Verified Contact Info (5 Cols) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Office Card */}
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#E8DFD1] shadow-xl shadow-black/5 space-y-5">
              <span className="text-xs font-mono uppercase tracking-wider text-[#B88746] font-bold block">
                HEADQUARTERS &amp; REGISTERED OFFICE
              </span>

              <div className="flex items-start gap-3 text-slate-700">
                <MapPin className="w-5 h-5 text-[#B88746] flex-shrink-0 mt-1" />
                <div className="text-sm leading-relaxed">
                  <h4 className="font-bold text-slate-950 text-base">Jancy Home</h4>
                  <p>Perumal Kovil Street,</p>
                  <p>Samugarengapuram, Tirunelveli - 627112</p>
                  <p className="text-slate-500 font-medium">Tamil Nadu, India</p>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs font-semibold">
                <div className="flex items-center gap-1.5 text-slate-600">
                  <Clock className="w-4 h-4 text-[#B88746]" />
                  <span>Open 24 Hours • Mon – Sun</span>
                </div>
                <a
                  href="https://maps.google.com/?q=8.337495,77.698087"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#B88746] hover:underline flex items-center gap-1"
                >
                  <span>Google Maps</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>

            {/* Direct Phone & WhatsApp Strip */}
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#E8DFD1] shadow-xl shadow-black/5 space-y-4">
              <span className="text-xs font-mono uppercase tracking-wider text-[#B88746] font-bold block">
                DIRECT CLIENT LINES
              </span>

              <div className="flex items-center justify-between gap-4 flex-wrap">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#B88746]/10 text-[#B88746] flex items-center justify-center flex-shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] text-slate-500 font-mono block">PHONE / DIRECT CALL</span>
                    <a
                      href="tel:+917708247124"
                      className="text-base font-bold text-slate-950 hover:text-[#B88746] transition-colors"
                    >
                      +91 77082 47124
                    </a>
                  </div>
                </div>

                <a
                  href="tel:+917708247124"
                  className="px-4 py-2 rounded-full bg-slate-900 text-white text-xs font-bold hover:bg-slate-800 transition-colors"
                >
                  Call Now
                </a>
              </div>

              <div className="flex items-center justify-between gap-4 flex-wrap pt-3 border-t border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#25D366]/15 text-[#25D366] flex items-center justify-center flex-shrink-0">
                    <MessageCircle className="w-5 h-5 fill-current" />
                  </div>
                  <div>
                    <span className="text-[11px] text-slate-500 font-mono block">WHATSAPP CONSULTATION</span>
                    <a
                      href={whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-base font-bold text-slate-950 hover:text-[#25D366] transition-colors"
                    >
                      +91 77082 47124
                    </a>
                  </div>
                </div>

                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-full bg-[#25D366] text-white text-xs font-bold hover:bg-[#20ba5a] transition-colors shadow-sm"
                >
                  Chat on WhatsApp
                </a>
              </div>
            </div>

            {/* Official Facebook Social Proof */}
            <div className="bg-[#1877F2]/10 p-5 rounded-2xl border border-[#1877F2]/20 flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-slate-900">Official Facebook Page</p>
                <p className="text-[11px] text-slate-600">Watch regular live site videos &amp; client handovers</p>
              </div>
              <a
                href="https://www.facebook.com/JancyBuilder/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#1877F2] text-white text-xs font-bold hover:bg-[#166fe5] transition-colors shadow-sm"
              >
                <span>Follow</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>

          </div>

          {/* Right Column: In-Page Consultation Request Form (7 Cols) */}
          <div className="lg:col-span-7 bg-white p-8 sm:p-10 rounded-3xl border border-[#E8DFD1] shadow-2xl shadow-black/5">
            {isSubmitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-12 text-center space-y-4"
              >
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900">Consultation Request Received!</h3>
                <p className="text-sm text-slate-600 max-w-md mx-auto">
                  Thank you. Reference ID: <strong className="text-slate-950 font-mono">{quoteId}</strong>.
                  Chief Civil Engineer Er. Sahaya Antony Stalin will contact you within 24 hours.
                </p>
                <div className="pt-4">
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#20ba5a] text-white py-3 px-6 rounded-full text-xs font-bold uppercase tracking-wider shadow-md transition-all"
                  >
                    <MessageCircle className="w-4 h-4 fill-current" />
                    <span>Send Floor Plan on WhatsApp</span>
                  </a>
                </div>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="border-b border-slate-100 pb-4 mb-2">
                  <h3 className="text-xl font-bold text-slate-950">Request a Consultation</h3>
                  <p className="text-xs text-slate-500 mt-1">
                    Fill in your project requirements for an itemized BOQ estimate and complimentary site inspection.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">Your Full Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. S. Murugan"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#B88746] bg-slate-50/50"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">Phone Number (WhatsApp) *</label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. +91 98765 43210"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#B88746] bg-slate-50/50"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">Email Address</label>
                    <input
                      type="email"
                      placeholder="e.g. name@domain.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#B88746] bg-slate-50/50"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">Project Type</label>
                    <select
                      value={formData.projectType}
                      onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#B88746] bg-slate-50/50"
                    >
                      <option value="Luxury Villa">Luxury Villa</option>
                      <option value="Contemporary Duplex">Contemporary Duplex</option>
                      <option value="Independent House">Independent House</option>
                      <option value="Commercial Complex">Commercial Complex</option>
                      <option value="Renovation & Addition">Renovation &amp; Remodeling</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Site / Construction Location *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Samugarengapuram / Durainagar / Valliyur / Tirunelveli"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#B88746] bg-slate-50/50"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Project Requirements / Notes</label>
                  <textarea
                    rows={3}
                    placeholder="Tell us about your plot size, preferred number of floors, budget, or architectural style..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#B88746] bg-slate-50/50 resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 rounded-full bg-[#B88746] hover:bg-[#a3753b] text-white font-bold text-xs uppercase tracking-wider transition-all shadow-lg shadow-[#B88746]/25 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <span>Submitting Request...</span>
                  ) : (
                    <>
                      <span>Request a Consultation</span>
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

        </div>

      </div>
    </section>
  );
}
