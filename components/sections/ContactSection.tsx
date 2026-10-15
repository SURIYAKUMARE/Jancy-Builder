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
  Calendar,
} from "lucide-react";
import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";

interface ContactSectionProps {
  onOpenAppointmentModal?: () => void;
}

export default function ContactSection({ onOpenAppointmentModal }: ContactSectionProps) {
  const { isTamil } = useLanguage();

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    location: "",
    service: "House Construction",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [enquiryId, setEnquiryId] = useState("");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const serviceOptions = [
    { id: "House Construction", labelEn: "Turnkey House Construction", labelTa: "முழுமையான வீடு கட்டுமானம்" },
    { id: "Architectural Planning", labelEn: "Architectural & Vastu Planning", labelTa: "வாஸ்து வரைபடம் & திட்டமிடல்" },
    { id: "Structural Design", labelEn: "Structural Engineering & RCC Drawings", labelTa: "கட்டமைப்பு & தூண் வரைபடம்" },
    { id: "Renovation", labelEn: "House Renovation / Floor Addition", labelTa: "வீடு புதுப்பித்தல் / மேல் தளம்" },
    { id: "Building Approval", labelEn: "Panchayat / DTCP Approval Assistance", labelTa: "கட்டிட அனுமதி பெறுதல்" },
    { id: "Commercial Construction", labelEn: "Commercial Building Construction", labelTa: "வணிக வளாக கட்டுமானம்" },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (!formData.name.trim() || formData.name.trim().length < 2) {
      setErrorMsg(isTamil ? "தயவுசெய்து உங்கள் பெயரை உள்ளிடவும்" : "Please enter your name");
      return;
    }

    const cleanPhone = formData.phone.replace(/[^0-9]/g, "");
    if (cleanPhone.length < 10) {
      setErrorMsg(isTamil ? "சரியான 10 இலக்க தொலைபேசி எண்ணை உள்ளிடவும்" : "Please enter a valid 10-digit phone number");
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await fetch("/api/enquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          phone: cleanPhone,
        }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Failed to submit enquiry");
      }

      setIsSubmitted(true);
      setEnquiryId(data.enquiryId || "ENQ-OK");
    } catch (err: any) {
      setErrorMsg(
        err.message ||
          (isTamil
            ? "செய்தி அனுப்புவதில் சிக்கல் ஏற்பட்டது. மீண்டும் முயற்சிக்கவும்."
            : "Failed to send enquiry. Please check and retry.")
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const whatsappMessage = encodeURIComponent(
    isTamil
      ? `வணக்கம் Er. Sahaya Antony Stalin, எனது புதிய வீடு கட்டுமானம் தொடர்பாக பேச விரும்புகிறேன். பெயர்: ${formData.name || "வாடிக்கையாளர்"}, இடம்: ${formData.location || "திருநெல்வேலி"}.`
      : `Hello Er. Sahaya Antony Stalin, I would like to consult regarding construction. Name: ${formData.name || "Customer"}, Location: ${formData.location || "Tirunelveli"}.`
  );
  const whatsappUrl = `https://wa.me/917708247124?text=${whatsappMessage}`;

  return (
    <section
      id="contact"
      className="py-20 lg:py-28 bg-[#FAF8F5] border-t border-b border-[#E2D9CC] relative overflow-hidden scroll-mt-20"
    >
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Title */}
        <div className="max-w-2xl mb-14">
          <div className="flex items-center gap-2 mb-2">
            <span className="h-[2px] w-8 bg-[#B78A52] block" />
            <span className="text-xs font-mono font-bold uppercase tracking-[0.25em] text-[#B78A52]">
              {isTamil ? "நேரடித் தொடர்பு" : "DIRECT ENGINEER ACCESS"}
            </span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-[#17191B] tracking-tight font-sans">
            {isTamil ? "எங்கள் பொறியாளரிடம் பேசுங்கள்" : "Contact Our Civil Engineer"}
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed">
            {isTamil
              ? "புரோக்கர்கள் அல்லது விற்பனையாளர்கள் இல்லை. தலைமை சிவில் பொறியாளர் Er. சகாய அந்தோணி ஸ்டாலின் அவர்களிடம் நேரடியாகப் பேசி உங்கள் வீட்டுத் திட்டத்தைத் தொடங்குங்கள்."
              : "Speak directly with Chief Civil Engineer Er. Sahaya Antony Stalin, B.E. (Civil) for structural design, transparent BOQ estimates, and turnkey construction."}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
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
                  <p>Samugarengapuram, Tirunelveli - 627112</p>
                  <p className="text-slate-500 font-medium">Tamil Nadu, India</p>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs font-semibold">
                <div className="flex items-center gap-1.5 text-slate-600">
                  <Clock className="w-4 h-4 text-[#B78A52]" />
                  <span>{isTamil ? "திங்கள் – சனி: 9:00 AM – 7:30 PM" : "Mon – Sat: 9:00 AM – 7:30 PM"}</span>
                </div>
                <span className="text-[#B78A52] text-[11px]">
                  {isTamil ? "ஞாயிறு: முன் அனுமதி" : "Sun: By Appt."}
                </span>
              </div>

              {/* Direct call & whatsapp */}
              <div className="pt-4 border-t border-slate-100 space-y-3">
                <div className="flex items-center justify-between gap-4 flex-wrap">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#B78A52]/10 text-[#B78A52] flex items-center justify-center flex-shrink-0">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-[11px] text-slate-500 font-mono block">
                        {isTamil ? "நேரடி அழைப்பு" : "DIRECT CALL"}
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
                    className="px-4 py-2 rounded-full bg-slate-900 text-white text-xs font-bold hover:bg-slate-800 transition-colors shadow-sm"
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
                        {isTamil ? "வாட்ஸ்அப் ஆலோசனை" : "WHATSAPP CHAT"}
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
                    WhatsApp
                  </a>
                </div>
              </div>

              {/* Book Appointment CTA */}
              <div className="pt-3 border-t border-slate-100">
                <button
                  onClick={() => {
                    if (onOpenAppointmentModal) onOpenAppointmentModal();
                    else {
                      const el = document.getElementById("office");
                      if (el) el.scrollIntoView({ behavior: "smooth" });
                    }
                  }}
                  className="w-full py-3 rounded-2xl bg-[#B78A52] hover:bg-[#9e743d] text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md transition-all hover:scale-[1.01]"
                >
                  <Calendar className="w-4 h-4" />
                  <span>{isTamil ? "அலுவலக சந்திப்பை முன்பதிவு செய்க" : "Book Office Appointment"}</span>
                </button>
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
                  {isTamil ? "கோரிக்கை வெற்றிகரமாக பதிவானது!" : "Consultation Request Received!"}
                </h3>
                <p className="text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                  {isTamil
                    ? `நன்றி! உங்கள் குறிப்பு எண்: ${enquiryId}. தலைமைப் பொறியாளர் Er. சகாய அந்தோணி ஸ்டாலின் அவர்கள் 24 மணி நேரத்திற்குள் உங்களைத் தொடர்புகொள்வார்.`
                    : `Thank you. Reference ID: ${enquiryId}. Chief Civil Engineer Er. Sahaya Antony Stalin will contact you within 24 hours.`}
                </p>
                <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#20ba5a] text-white py-3 px-6 rounded-full text-xs font-semibold uppercase tracking-wider shadow-md transition-all hover:scale-105"
                  >
                    <MessageCircle className="w-4 h-4 fill-current" />
                    <span>{isTamil ? "வாட்ஸ்அப்பில் வரைபடத்தை அனுப்ப" : "Send Floor Plan on WhatsApp"}</span>
                  </a>
                  <button
                    onClick={() => {
                      setIsSubmitted(false);
                      setFormData({
                        name: "",
                        phone: "",
                        location: "",
                        service: "House Construction",
                        message: "",
                      });
                    }}
                    className="py-3 px-6 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold uppercase tracking-wider"
                  >
                    {isTamil ? "புதிய செய்தி அனுப்ப" : "Send Another Message"}
                  </button>
                </div>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="border-b border-slate-100 pb-4 mb-2">
                  <h3 className="text-xl font-bold text-[#17191B]">
                    {isTamil ? "செய்தி அனுப்பவும்" : "Send an Enquiry"}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">
                    {isTamil
                      ? "உங்கள் கட்டுமான தேவைகளைக் குறிப்பிடவும். எங்கள் பொறியாளர் அலுவலகம் உடனடியாகத் தொடர்புகொள்ளும்."
                      : "Fill in your requirements for a complimentary technical consultation and preliminary site estimate."}
                  </p>
                </div>

                {errorMsg && (
                  <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700 flex items-start gap-2">
                    <AlertCircle className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" />
                    <span>{errorMsg}</span>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">
                      {isTamil ? "உங்கள் பெயர் *" : "Your Full Name *"}
                    </label>
                    <input
                      type="text"
                      required
                      placeholder={isTamil ? "எ.கா: சுந்தர் ராஜ்" : "e.g. Sundar Raj"}
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-[#B78A52] bg-slate-50/50"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">
                      {isTamil ? "தொலைபேசி எண் *" : "Phone Number (10 Digits) *"}
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="77082 47124"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-[#B78A52] bg-slate-50/50"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">
                      {isTamil ? "நிலம் / கட்டுமான இடம் *" : "Site / Plot Location *"}
                    </label>
                    <input
                      type="text"
                      required
                      placeholder={isTamil ? "எ.கா: சாமுகரெங்கபுரம், திருநெல்வேலி" : "e.g. Samugarengapuram, Tirunelveli"}
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-[#B78A52] bg-slate-50/50"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">
                      {isTamil ? "தேவையான சேவை *" : "Service Required *"}
                    </label>
                    <select
                      value={formData.service}
                      onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-[#B78A52] bg-slate-50/50"
                    >
                      {serviceOptions.map((s) => (
                        <option key={s.id} value={s.id}>
                          {isTamil ? s.labelTa : s.labelEn}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    {isTamil ? "செய்தி / கட்டுமான குறிப்புகள்" : "Project Details / Message"}
                  </label>
                  <textarea
                    rows={3}
                    placeholder={
                      isTamil
                        ? "சதுர அடி, பட்ஜெட் அல்லது உங்களுக்கு தேவையான வசதிகளைக் குறிப்பிடலாம்..."
                        : "Tell us about your plot size, preferred floor count, or specific construction ideas..."
                    }
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-[#B78A52] bg-slate-50/50 resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 rounded-xl bg-[#17191B] hover:bg-[#B78A52] text-white text-xs font-bold uppercase tracking-wider shadow-lg transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <span>{isTamil ? "பதிவாகிறது..." : "Submitting Enquiry..."}</span>
                  ) : (
                    <>
                      <span>{isTamil ? "ஆலோசனை கோரிக்கையை அனுப்புக" : "Request Engineering Consultation"}</span>
                      <Send className="w-3.5 h-3.5 text-[#B78A52]" />
                    </>
                  )}
                </button>

                <p className="text-[11px] text-slate-500 text-center pt-1">
                  🔒 {isTamil ? "உங்கள் தொலைபேசி எண் ஆலோசனைக்கு மட்டுமே பயன்படுத்தப்படும்." : "We respect your privacy. No marketing spam."}
                </p>
              </form>
            )}
          </div>

        </div>

      </div>
    </section>
  );
}
