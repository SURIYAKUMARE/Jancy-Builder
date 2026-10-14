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
  AlertCircle,
} from "lucide-react";
import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";

export default function ContactSection() {
  const { isTamil } = useLanguage();

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    location: "",
    service: "Turnkey House Construction",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [enquiryId, setEnquiryId] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success) {
        setIsSubmitted(true);
        setEnquiryId(data.enquiry?.id || "JB-" + Date.now().toString().slice(-4));
      } else {
        setErrorMessage(
          data.error ||
            (isTamil
              ? "பதிவு செய்வதில் பிழை ஏற்பட்டது. தயவுசெய்து தொலைபேசியில் தொடர்பு கொள்ளவும்."
              : "Submission failed. Please call us directly.")
        );
      }
    } catch (err) {
      console.error("Submission error:", err);
      setErrorMessage(
        isTamil
          ? "தொடர்பு பிழை ஏற்பட்டது. +91 77082 47124 என்ற எண்ணிற்கு அழைக்கவும்."
          : "Network error. Please call +91 77082 47124 directly."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const whatsappMessage = encodeURIComponent(
    isTamil
      ? `வணக்கம் Er. சகாய அந்தோணி ஸ்டாலின், நான் ஜான்சி பில்டர்ஸ் இணையதளம் மூலம் தொடர்பு கொள்கிறேன். இடம்: ${formData.location || "தமிழ்நாடு"}, பெயர்: ${formData.name || "வாடிக்கையாளர்"}, தொடர்பு: ${formData.phone || ""}. சேவை: ${formData.service}. விவரங்கள் பேச விரும்புகிறேன்.`
      : `Hello Er. Sahaya Antony Stalin, I am contacting you from the Jancy Builders website regarding my construction project in ${formData.location || "Tamil Nadu"}. Name: ${formData.name || "Customer"}, Phone: ${formData.phone || ""}, Service: ${formData.service}. I would like to schedule a consultation.`
  );
  const whatsappUrl = `https://wa.me/917708247124?text=${whatsappMessage}`;

  return (
    <section
      id="contact"
      className="py-20 lg:py-28 bg-[#F8F6F1] border-t border-b border-[#E2D9CC] relative overflow-hidden scroll-mt-20"
    >
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Title */}
        <div className="max-w-2xl mb-14">
          <div className="flex items-center gap-2 mb-2">
            <span className="h-[2px] w-8 bg-[#B78A52] block" />
            <span className="text-xs font-mono font-semibold uppercase tracking-[0.25em] text-[#B78A52]">
              {isTamil ? "தொடர்பு கொள்ள" : "GET IN TOUCH"}
            </span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-[#17191B] tracking-tight font-sans">
            {isTamil ? "உங்கள் கட்டுமானத் தேவையை பேசுங்கள்" : "Start Your Construction Journey"}
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#202124]/75 leading-relaxed">
            {isTamil
              ? "தலைமை சிவில் இன்ஜினியர் Er. சகாய அந்தோணி ஸ்டாலின், B.E. (Civil) அவர்களை நேரடியாக தொடர்பு கொண்டு உங்கள் வீட்டு திட்டத்திற்கான வரைபடம் மற்றும் நேரடி ஆலோசனையைப் பெறுங்கள்."
              : "Speak directly with Chief Civil Engineer Er. Sahaya Antony Stalin, B.E. (Civil) for precision structural estimation, architectural plans, and hassle-free turnkey execution."}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Left Column: Direct Verified Contact Info (5 Cols) */}
          <div className="lg:col-span-5 space-y-6">
            {/* Office Card */}
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#E2D9CC] shadow-xl shadow-black/5 space-y-5">
              <span className="text-xs font-mono uppercase tracking-wider text-[#B78A52] font-bold block">
                {isTamil ? "தலைமை அலுவலகம்" : "HEADQUARTERS & REGISTERED OFFICE"}
              </span>

              <div className="flex items-start gap-3 text-slate-700">
                <MapPin className="w-5 h-5 text-[#B78A52] flex-shrink-0 mt-1" />
                <div className="text-sm leading-relaxed">
                  <h4 className="font-bold text-slate-950 text-base">Jancy Home</h4>
                  <p>Perumal Kovil Street,</p>
                  <p>Samugarengapuram, Tirunelveli – 627112</p>
                  <p className="text-slate-500 font-medium">Tamil Nadu, India</p>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 space-y-2 text-xs">
                <div className="flex items-center justify-between font-semibold">
                  <div className="flex items-center gap-1.5 text-slate-700">
                    <Clock className="w-4 h-4 text-[#B78A52]" />
                    <span>
                      {isTamil
                        ? "திங்கள் – சனி: காலை 9:00 – இரவு 7:30"
                        : "Mon – Sat: 9:00 AM – 7:30 PM"}
                    </span>
                  </div>
                  <a
                    href="https://www.google.com/maps/search/?api=1&query=8.337495,77.698087"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#B78A52] hover:underline flex items-center gap-1 font-bold"
                  >
                    <span>{isTamil ? "வரைபடம்" : "Google Maps"}</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
                <p className="text-[11px] text-slate-500 pl-5.5">
                  {isTamil
                    ? "ஞாயிற்றுக்கிழமை: முன் அனுமதி மூலம் மட்டும்"
                    : "Sunday: By Prior Appointment Only"}
                </p>
              </div>
            </div>

            {/* Direct Phone & WhatsApp Strip */}
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#E8DFD1] shadow-xl shadow-black/5 space-y-4">
              <span className="text-xs font-mono uppercase tracking-wider text-[#B78A52] font-bold block">
                {isTamil ? "நேரடி தொடர்பு எண்கள்" : "DIRECT CLIENT LINES"}
              </span>

              <div className="flex items-center justify-between gap-4 flex-wrap">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#B78A52]/10 text-[#B78A52] flex items-center justify-center flex-shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] text-slate-500 font-mono block">
                      {isTamil ? "நேரடி அழைப்பு" : "PHONE / DIRECT CALL"}
                    </span>
                    <a
                      href="tel:+917708247124"
                      className="text-base font-bold text-slate-950 hover:text-[#B78A52] transition-colors"
                    >
                      +91 77082 47124
                    </a>
                  </div>
                </div>

                <a
                  href="tel:+917708247124"
                  className="px-4 py-2 rounded-full bg-slate-900 text-white text-xs font-bold hover:bg-slate-800 transition-colors"
                >
                  {isTamil ? "அழைக்க" : "Call Now"}
                </a>
              </div>

              <div className="flex items-center justify-between gap-4 flex-wrap pt-3 border-t border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#25D366]/15 text-[#25D366] flex items-center justify-center flex-shrink-0">
                    <MessageCircle className="w-5 h-5 fill-current" />
                  </div>
                  <div>
                    <span className="text-[11px] text-slate-500 font-mono block">
                      {isTamil ? "வாட்ஸ்அப் ஆலோசனை" : "WHATSAPP CONSULTATION"}
                    </span>
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
                  {isTamil ? "வாட்ஸ்அப் அரட்டை" : "Chat on WhatsApp"}
                </a>
              </div>
            </div>

            {/* Official Facebook Social Proof */}
            <div className="bg-[#1877F2]/10 p-5 rounded-2xl border border-[#1877F2]/20 flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-slate-900">
                  {isTamil ? "அதிகாரப்பூர்வ முகநூல் பக்கம்" : "Official Facebook Page"}
                </p>
                <p className="text-[11px] text-slate-600">
                  {isTamil
                    ? "நேரடி கட்டுமான தள வீடியோக்கள் & வாடிக்கையாளர் ஒப்படைப்பு"
                    : "Watch regular live site videos & client handovers"}
                </p>
              </div>
              <a
                href="https://www.facebook.com/JancyBuilder/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#1877F2] text-white text-xs font-bold hover:bg-[#166fe5] transition-colors shadow-sm"
              >
                <span>{isTamil ? "பார்வையிட" : "Follow"}</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

          {/* Right Column: In-Page Consultation Request Form (7 Cols) */}
          <div className="lg:col-span-7 bg-white p-8 sm:p-10 rounded-3xl border border-[#E2D9CC] shadow-2xl shadow-black/5">
            {isSubmitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-12 text-center space-y-4"
              >
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900">
                  {isTamil ? "உங்கள் விபரம் பெறப்பட்டது!" : "Consultation Request Received!"}
                </h3>
                <p className="text-sm text-slate-600 max-w-md mx-auto">
                  {isTamil ? (
                    <>
                      நன்றி! பதிவு எண்: <strong className="text-[#17191B] font-mono">{enquiryId}</strong>.
                      தலைமை பொறியாளர் Er. சகாய அந்தோணி ஸ்டாலின் விரைவில் உங்களை தொடர்பு கொள்வார்.
                    </>
                  ) : (
                    <>
                      Thank you. Reference ID: <strong className="text-[#17191B] font-mono">{enquiryId}</strong>.
                      Chief Civil Engineer Er. Sahaya Antony Stalin will contact you within 24 hours.
                    </>
                  )}
                </p>
                <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#20ba5a] text-white py-3 px-6 rounded-full text-xs font-semibold uppercase tracking-wider shadow-md transition-all hover:scale-105"
                  >
                    <MessageCircle className="w-4 h-4 fill-current" />
                    <span>{isTamil ? "வாட்ஸ்அப்பில் வரைபடம் அனுப்ப" : "Send Floor Plan on WhatsApp"}</span>
                  </a>
                  <button
                    onClick={() => {
                      setIsSubmitted(false);
                      setFormData({
                        name: "",
                        phone: "",
                        location: "",
                        service: "Turnkey House Construction",
                        message: "",
                      });
                    }}
                    className="text-xs text-slate-500 hover:text-slate-800 underline font-medium"
                  >
                    {isTamil ? "மற்றொரு கேள்வி சமர்ப்பிக்க" : "Submit another request"}
                  </button>
                </div>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="border-b border-slate-100 pb-4 mb-2">
                  <h3 className="text-xl font-bold text-[#17191B]">
                    {isTamil ? "கட்டுமான ஆலோசனை கேட்க" : "Request a Consultation"}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">
                    {isTamil
                      ? "உங்கள் தேவைக்கேற்ப துல்லியமான திட்ட மதிப்பீடு மற்றும் தள ஆய்வு பெற விபரங்களை உள்ளிடவும்."
                      : "Fill in your project requirements for an itemized BOQ estimate and complimentary site inspection."}
                  </p>
                </div>

                {errorMessage && (
                  <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 flex-shrink-0" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">
                      {isTamil ? "உங்கள் முழு பெயர் *" : "Your Full Name *"}
                    </label>
                    <input
                      type="text"
                      required
                      placeholder={isTamil ? "எ.கா. S. முருகன்" : "e.g. S. Murugan"}
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#B78A52] bg-slate-50/50"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">
                      {isTamil ? "மொபைல் எண் (WhatsApp) *" : "Phone Number (WhatsApp) *"}
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. 9876543210"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#B78A52] bg-slate-50/50"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">
                      {isTamil ? "கட்டுமான ஊர் / இடம் *" : "Site / Construction Location *"}
                    </label>
                    <input
                      type="text"
                      required
                      placeholder={
                        isTamil
                          ? "எ.கா. சாமுகரெங்கபுரம் / வள்ளியூர் / திருநெல்வேலி"
                          : "e.g. Samugarengapuram / Valliyur / Tirunelveli"
                      }
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#B78A52] bg-slate-50/50"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">
                      {isTamil ? "தேவையான சேவை" : "Service Required"}
                    </label>
                    <select
                      value={formData.service}
                      onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#B78A52] bg-slate-50/50"
                    >
                      <option value="Turnkey House Construction">
                        {isTamil ? "முழுமையான வீடு கட்டுதல் (Turnkey Construction)" : "Turnkey House Construction"}
                      </option>
                      <option value="Architectural Plan & 3D Elevation">
                        {isTamil ? "கட்டிட வரைபடம் & 3D வடிவமைப்பு" : "Architectural Plan & 3D Elevation"}
                      </option>
                      <option value="Structural Engineering & Estimation">
                        {isTamil ? "கட்டுமான மதிப்பீடு (BOQ & Estimation)" : "Structural Engineering & Estimation"}
                      </option>
                      <option value="Renovation & Remodeling">
                        {isTamil ? "வீடு புதுப்பித்தல் பணி (Renovation)" : "Renovation & Remodeling"}
                      </option>
                      <option value="Commercial Complex Construction">
                        {isTamil ? "வணிக வளாகக் கட்டுமானம்" : "Commercial Complex Construction"}
                      </option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    {isTamil ? "கட்டுமானக் குறிப்புகள் அல்லது விருப்பங்கள்" : "Project Requirements / Notes"}
                  </label>
                  <textarea
                    rows={3}
                    placeholder={
                      isTamil
                        ? "உங்கள் மனை அளவு, தளம் எண்ணிக்கை, பட்ஜெட் அல்லது விருப்பங்களை குறிப்பிடவும்..."
                        : "Tell us about your plot size, preferred number of floors, budget, or architectural style..."
                    }
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#B78A52] bg-slate-50/50 resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 rounded-full bg-[#17191B] hover:bg-[#B78A52] text-white font-semibold text-xs uppercase tracking-wider transition-all shadow-lg shadow-black/10 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 border border-[#B78A52]/30 hover:scale-[1.01]"
                >
                  {isSubmitting ? (
                    <span>{isTamil ? "அனுப்பப்படுகிறது..." : "Submitting Request..."}</span>
                  ) : (
                    <>
                      <span>{isTamil ? "ஆலோசனைக்கு கோரிக்கை வைக்க" : "Request a Consultation"}</span>
                      <Send className="w-4 h-4 text-[#B78A52] group-hover:text-white" />
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
