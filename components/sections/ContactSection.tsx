"use client";

import React, { useState } from "react";
import {
  Phone,
  MessageCircle,
  MapPin,
  Send,
  CheckCircle2,
  Clock,
  AlertCircle,
  Calendar,
  Building,
} from "lucide-react";
import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import BlurText from "@/components/motion/BlurText";

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
    { id: "Building Approval", labelEn: "Building Plan Approval Guidance", labelTa: "கட்டிட அனுமதி ஆலோசனை" },
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
      setErrorMsg(err.message || (isTamil ? "தகவல் அனுப்புவதில் சிக்கல். மீண்டும் முயற்சிக்கவும்." : "Failed to send message. Please retry."));
    } finally {
      setIsSubmitting(false);
    }
  };

  const whatsappMessage = encodeURIComponent(
    isTamil
      ? "வணக்கம் Er. Stalin, எனது புதிய வீடு கட்டுமானம் தொடர்பாக தலைமை சிவில் பொறியாளரிடம் பேச விரும்புகிறேன்."
      : "Hello Er. Sahaya Antony Stalin, I would like to consult with you directly regarding my new house construction project."
  );
  const whatsappUrl = `https://wa.me/917708247124?text=${whatsappMessage}`;

  return (
    <section
      id="contact"
      className="w-full bg-black py-24 sm:py-32 text-white relative overflow-hidden scroll-mt-20 font-body border-t border-white/10"
    >
      {/* Background Ambient Glow */}
      <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-[#C9A46B]/5 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-14 space-y-3 text-left">
          <div className="inline-flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C9A46B]" />
            <span className="text-xs font-mono font-bold uppercase tracking-[0.25em] text-[#C9A46B]">
              {isTamil ? "// நேரடித் தொடர்பு" : "// DIRECT ENGINEER ACCESS"}
            </span>
          </div>

          {isTamil ? (
            <BlurText
              text="எங்கள் பொறியாளரிடம் நேரடியாகப் பேசுங்கள்"
              as="h2"
              isTamil={true}
              className="text-3xl sm:text-5xl font-tamil font-black text-white tracking-tight"
            />
          ) : (
            <BlurText
              text="Let's Talk About Your New Home."
              as="h2"
              italic={true}
              className="text-4xl sm:text-6xl font-heading font-normal text-white tracking-tight leading-[1.08]"
            />
          )}

          <p className="text-sm sm:text-base text-white/70 max-w-2xl leading-relaxed">
            {isTamil
              ? "புரோக்கர்கள் அல்லது விற்பனையாளர்கள் இல்லை. தலைமை சிவில் பொறியாளர் Er. சகாய அந்தோணி ஸ்டாலின் அவர்களிடம் நேரடியாகப் பேசி உங்கள் வீட்டுத் திட்டத்தைத் தொடங்குங்கள்."
              : "No brokers or salesmen. Speak directly with Chief Civil Engineer Er. Sahaya Antony Stalin, B.E. (Civil) for structural clarity, itemized BOQ estimates, and turnkey construction."}
          </p>
        </div>

        {/* 2-Column Contact Spread */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Left Column (5 Cols): Verified Headquarters & Contacts */}
          <div className="lg:col-span-5 space-y-6 text-left">
            
            <div className="p-6 sm:p-8 rounded-3xl liquid-glass-strong border border-white/15 space-y-6">
              <span className="text-xs font-mono uppercase tracking-wider text-[#C9A46B] font-bold block">
                {isTamil ? "தலைமை அலுவலகம்" : "HEADQUARTERS & REGISTERED OFFICE"}
              </span>

              <div className="space-y-1 text-xs">
                <h4 className="text-lg font-heading italic text-white">Jancy Home</h4>
                <p className="text-white/70 leading-relaxed font-body">
                  Perumal Kovil Street, Samugarengapuram,<br />
                  Radhapuram Taluk, Tirunelveli – 627112,<br />
                  Tamil Nadu, India
                </p>
              </div>

              <div className="pt-2 border-t border-white/10 space-y-1 text-xs">
                <div className="flex items-center gap-2 text-white/50 text-[11px] font-mono">
                  <Clock className="w-3.5 h-3.5 text-[#C9A46B]" />
                  <span>{isTamil ? "வேலை நேரம்:" : "OFFICE HOURS:"}</span>
                </div>
                <p className="text-white/80 font-mono">
                  {isTamil ? "திங்கள் – சனி: காலை 9:00 – இரவு 7:30" : "Mon – Sat: 9:00 AM – 7:30 PM"}
                </p>
                <p className="text-white/50 text-[11px]">
                  {isTamil ? "ஞாயிறு: முன் அனுமதி மூலம் மட்டுமே" : "Sunday: By Prior Appointment Only"}
                </p>
              </div>

              {/* Direct Buttons */}
              <div className="pt-4 border-t border-white/10 space-y-3">
                <a
                  href="tel:+917708247124"
                  className="w-full py-3.5 px-5 rounded-2xl liquid-glass text-white hover:text-[#C9A46B] text-xs font-bold uppercase tracking-wider flex items-center justify-between transition-all"
                >
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-[#C9A46B]" />
                    <span>Call: +91 77082 47124</span>
                  </div>
                  <span className="text-[10px] font-mono text-white/40">Direct</span>
                </a>

                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3.5 px-5 rounded-2xl bg-[#25D366]/20 hover:bg-[#25D366]/30 text-[#25D366] border border-[#25D366]/30 text-xs font-bold uppercase tracking-wider flex items-center justify-between transition-all"
                >
                  <div className="flex items-center gap-2">
                    <MessageCircle className="w-4 h-4 fill-current" />
                    <span>WhatsApp Engineer</span>
                  </div>
                  <span className="text-[10px] font-mono text-[#25D366]/80">Online</span>
                </a>

                <button
                  onClick={onOpenAppointmentModal}
                  className="w-full py-3.5 px-5 rounded-2xl liquid-glass-strong text-white hover:border-[#C9A46B]/60 text-xs font-bold uppercase tracking-wider flex items-center justify-between transition-all"
                >
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-[#C9A46B]" />
                    <span>{isTamil ? "அலுவலக சந்திப்பு முன்பதிவு" : "Book Office Consultation"}</span>
                  </div>
                  <span className="text-[10px] font-mono text-[#C9A46B]">&rarr;</span>
                </button>
              </div>

            </div>

          </div>

          {/* Right Column (7 Cols): Direct Enquiry Form */}
          <div className="lg:col-span-7">
            <div className="p-6 sm:p-8 rounded-3xl liquid-glass-strong border border-white/15 text-left">
              
              {isSubmitted ? (
                <div className="text-center py-12 space-y-4">
                  <div className="w-16 h-16 rounded-full bg-[#C9A46B]/20 text-[#C9A46B] flex items-center justify-center mx-auto border border-[#C9A46B]/30">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-heading italic text-white">
                    {isTamil ? "தகவல் பெறப்பட்டது!" : "Enquiry Received Successfully!"}
                  </h3>
                  <span className="text-xs font-mono text-[#E2C496] bg-white/5 px-3 py-1 rounded-full border border-white/10 inline-block">
                    Reference ID: {enquiryId}
                  </span>
                  <p className="text-xs sm:text-sm text-white/70 max-w-md mx-auto leading-relaxed">
                    {isTamil
                      ? "நன்றி! உங்கள் தகவல் பதிவு செய்யப்பட்டது. தலைமை சிவில் பொறியாளர் Er. சகாய அந்தோணி ஸ்டாலின் அவர்கள் விரைவில் உங்களைத் தொடர்பு கொள்வார்."
                      : "Thank you! Your construction enquiry has been logged. Chief Engineer Er. Sahaya Antony Stalin will review your requirements and reach out to you shortly."}
                  </p>
                  <button
                    onClick={() => {
                      setIsSubmitted(false);
                      setFormData({ name: "", phone: "", location: "", service: "House Construction", message: "" });
                    }}
                    className="mt-4 px-6 py-2.5 rounded-full liquid-glass text-xs font-bold text-white uppercase tracking-wider"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {errorMsg && (
                    <div className="p-3.5 rounded-xl bg-red-500/10 border border-red-500/30 text-xs text-red-400 flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 flex-shrink-0" />
                      <span>{errorMsg}</span>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-white/80 mb-1.5 font-body">
                        {isTamil ? "உங்கள் பெயர் *" : "Your Name *"}
                      </label>
                      <input
                        type="text"
                        required
                        placeholder={isTamil ? "எ.கா: சுந்தர்" : "e.g. Sundar Raj"}
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 text-xs focus:outline-none focus:border-[#C9A46B] transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-white/80 mb-1.5 font-body">
                        {isTamil ? "தொலைபேசி எண் (10 இலக்கம்) *" : "Phone Number (10 Digits) *"}
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="77082 47124"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 text-xs focus:outline-none focus:border-[#C9A46B] transition-colors font-mono"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-white/80 mb-1.5 font-body">
                        {isTamil ? "நிலத்தின் இடம் / ஊர்" : "Plot Location / City"}
                      </label>
                      <input
                        type="text"
                        placeholder={isTamil ? "எ.கா: வள்ளியூர்" : "e.g. Valliyur / Tirunelveli"}
                        value={formData.location}
                        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 text-xs focus:outline-none focus:border-[#C9A46B] transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-white/80 mb-1.5 font-body">
                        {isTamil ? "தேவைப்படும் சேவை" : "Service Required"}
                      </label>
                      <select
                        value={formData.service}
                        onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-zinc-950 border border-white/10 text-white text-xs focus:outline-none focus:border-[#C9A46B] transition-colors"
                      >
                        {serviceOptions.map((opt) => (
                          <option key={opt.id} value={opt.id} className="bg-zinc-950 text-white">
                            {isTamil ? opt.labelTa : opt.labelEn}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-white/80 mb-1.5 font-body">
                      {isTamil ? "உங்கள் செய்தி / கட்டிட விவரங்கள்" : "Project Details / Requirements"}
                    </label>
                    <textarea
                      rows={3}
                      placeholder={
                        isTamil
                          ? "நிலத்தின் அளவு, பட்ஜெட் அல்லது உங்கள் கேள்விகளை குறிப்பிடவும்..."
                          : "Mention plot area, budget range, or specific questions for the engineer..."
                      }
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 text-xs focus:outline-none focus:border-[#C9A46B] transition-colors resize-none font-body"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 rounded-2xl bg-gradient-to-r from-white via-slate-100 to-[#E2C496] disabled:opacity-50 text-black font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg transition-all hover:scale-[1.01] active:scale-95"
                  >
                    {isSubmitting ? (
                      <span>{isTamil ? "அனுப்பப்படுகிறது..." : "Submitting..."}</span>
                    ) : (
                      <>
                        <span>{isTamil ? "விவரங்களை அனுப்பவும்" : "Submit Construction Enquiry"}</span>
                        <Send className="w-4 h-4 text-black" />
                      </>
                    )}
                  </button>
                </form>
              )}

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
