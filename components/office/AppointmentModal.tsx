"use client";

import React, { useState } from "react";
import {
  Calendar,
  Clock,
  User,
  Phone,
  X,
  CheckCircle2,
  AlertCircle,
  MessageCircle,
  ArrowRight,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";

interface AppointmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultPurpose?: string;
}

export default function AppointmentModal({
  isOpen,
  onClose,
  defaultPurpose = "house_construction",
}: AppointmentModalProps) {
  const { isTamil } = useLanguage();

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    preferredDate: "",
    preferredTime: "10:30 AM",
    purpose: defaultPurpose,
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [confirmedData, setConfirmedData] = useState<{
    appointmentId: string;
    whatsappUrl: string;
  } | null>(null);

  const timeSlots = [
    "10:00 AM",
    "11:30 AM",
    "02:30 PM",
    "04:00 PM",
    "05:30 PM",
    "06:30 PM",
  ];

  const purposeOptions = [
    {
      id: "house_construction",
      labelEn: "New House Construction",
      labelTa: "புதிய வீடு கட்டுமானம்",
    },
    {
      id: "house_planning",
      labelEn: "House Planning & Vastu Design",
      labelTa: "வீட்டுத் திட்டம் & வாஸ்து வரைபடம்",
    },
    {
      id: "cost_estimation",
      labelEn: "Detailed Cost Estimation",
      labelTa: "செலவு மதிப்பீடு & பட்ஜெட்",
    },
    {
      id: "renovation",
      labelEn: "House Renovation & Additional Floor",
      labelTa: "வீடு புதுப்பித்தல் & மேல் தளம்",
    },
    {
      id: "approval_guidance",
      labelEn: "Building Plan Approval Guidance",
      labelTa: "கட்டிட அனுமதி ஆலோசனை",
    },
    {
      id: "other",
      labelEn: "Other Civil Engineering Consultation",
      labelTa: "இதர சிவில் பொறியியல் ஆலோசனை",
    },
  ];

  const todayStr = new Date().toISOString().split("T")[0];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (!formData.name.trim() || formData.name.trim().length < 2) {
      setErrorMsg(isTamil ? "தயவுசெய்து உங்கள் பெயரை உள்ளிடவும்" : "Please enter your full name");
      return;
    }

    const cleanPhone = formData.phone.replace(/[^0-9]/g, "");
    if (cleanPhone.length < 10) {
      setErrorMsg(
        isTamil
          ? "சரியான 10 இலக்க தொலைபேசி எண்ணை உள்ளிடவும்"
          : "Please enter a valid 10-digit mobile number"
      );
      return;
    }

    if (!formData.preferredDate) {
      setErrorMsg(
        isTamil
          ? "தயவுசெய்து நீங்கள் வர விரும்பும் தேதியைத் தேர்வுசெய்யவும்"
          : "Please select your preferred visit date"
      );
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await fetch("/api/appointments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          phone: cleanPhone,
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Failed to record appointment");
      }

      setConfirmedData({
        appointmentId: data.appointmentId,
        whatsappUrl: data.whatsappUrl,
      });
    } catch (err: any) {
      setErrorMsg(
        err.message ||
          (isTamil
            ? "முன்பதிவு செய்வதில் சிக்கல் ஏற்பட்டது. மீண்டும் முயற்சிக்கவும்."
            : "Failed to book appointment. Please check your connection and retry.")
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setConfirmedData(null);
    setErrorMsg(null);
    setFormData({
      name: "",
      phone: "",
      preferredDate: "",
      preferredTime: "10:30 AM",
      purpose: defaultPurpose,
      message: "",
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[120] flex items-center justify-center p-3 sm:p-6 overflow-y-auto font-body">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/85 backdrop-blur-xl"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="relative w-full max-w-xl liquid-glass-strong bg-[#0F1115]/95 border border-white/20 rounded-3xl overflow-hidden z-10 my-auto text-left shadow-2xl"
        >
          {/* Header */}
          <div className="p-6 sm:p-7 border-b border-white/10 flex items-start justify-between relative">
            <div>
              <div className="inline-flex items-center gap-2 mb-1 text-[11px] font-mono font-bold tracking-widest text-[#C9A46B] uppercase">
                <Calendar className="w-3.5 h-3.5" />
                <span>
                  {isTamil ? "நேரடி அலுவலக சந்திப்பு" : "OFFICE APPOINTMENT BOOKING"}
                </span>
              </div>
              <h3 className="text-xl sm:text-2xl font-heading italic text-white">
                {isTamil
                  ? "பொறியாளருடன் சந்திப்பை முன்பதிவு செய்க"
                  : "Book an Office Meeting with Er. Stalin"}
              </h3>
              <p className="text-xs text-white/60 mt-1 font-body">
                Jancy Home, Perumal Kovil Street, Samugarengapuram, Tirunelveli.
              </p>
            </div>

            <button
              onClick={onClose}
              className="w-9 h-9 rounded-full liquid-glass hover:bg-white/20 text-white flex items-center justify-center transition-colors flex-shrink-0"
              aria-label="Close appointment modal"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Body */}
          <div className="p-6 sm:p-8">
            {confirmedData ? (
              /* Success confirmation state */
              <div className="space-y-6 text-center py-4">
                <div className="w-16 h-16 rounded-full bg-[#C9A46B]/20 text-[#C9A46B] flex items-center justify-center mx-auto border border-[#C9A46B]/30">
                  <CheckCircle2 className="w-8 h-8" />
                </div>

                <div className="space-y-2">
                  <span className="text-xs font-mono font-bold px-3 py-1 rounded-full liquid-glass text-[#E2C496] border border-white/10 inline-block">
                    {isTamil ? "கோரிக்கை எண்" : "REFERENCE ID"}: {confirmedData.appointmentId}
                  </span>
                  <h4 className="text-2xl font-heading italic text-white">
                    {isTamil ? "முன்பதிவு கோரிக்கை பதிவானது!" : "Appointment Request Received!"}
                  </h4>
                  <p className="text-xs sm:text-sm text-white/70 max-w-md mx-auto leading-relaxed">
                    {isTamil
                      ? `நன்றி ${formData.name}! உங்கள் சந்திப்பு கோரிக்கை பதிவாகியுள்ளது. எங்கள் அலுவலகக் குழு உங்கள் நேரத்தை (${formData.preferredDate} - ${formData.preferredTime}) தொலைபேசி மூலம் உறுதி செய்யும்.`
                      : `Thank you ${formData.name}! Your meeting request for ${formData.preferredDate} at ${formData.preferredTime} has been submitted. Our office will contact you to confirm.`}
                  </p>
                </div>

                <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
                  <a
                    href={confirmedData.whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:flex-1 py-3.5 px-5 rounded-2xl bg-[#25D366] hover:bg-[#20ba5a] text-black font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg"
                  >
                    <MessageCircle className="w-4 h-4 fill-current" />
                    <span>
                      {isTamil
                        ? "வாட்ஸ்அப்பில் விவரங்களை அனுப்பவும்"
                        : "Send Details on WhatsApp"}
                    </span>
                  </a>

                  <button
                    onClick={handleReset}
                    className="w-full sm:w-auto py-3.5 px-6 rounded-2xl liquid-glass text-white text-xs font-bold uppercase tracking-wider transition-colors"
                  >
                    {isTamil ? "மூடுக" : "Close Window"}
                  </button>
                </div>
              </div>
            ) : (
              /* Booking Form */
              <form onSubmit={handleSubmit} className="space-y-4">
                {errorMsg && (
                  <div className="p-3.5 rounded-xl bg-red-500/10 border border-red-500/30 text-xs text-red-400 flex items-start gap-2">
                    <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
                    <span>{errorMsg}</span>
                  </div>
                )}

                {/* Name & Phone Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-white/80 mb-1">
                      {isTamil ? "உங்கள் பெயர் *" : "Your Full Name *"}
                    </label>
                    <div className="relative">
                      <User className="w-4 h-4 text-white/40 absolute left-3.5 top-3" />
                      <input
                        type="text"
                        required
                        placeholder={isTamil ? "எ.கா: சுந்தர்" : "e.g. Sundar Raj"}
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-white/5 border border-white/15 text-xs text-white placeholder-white/30 focus:outline-none focus:border-[#C9A46B]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-white/80 mb-1">
                      {isTamil ? "தொலைபேசி எண் *" : "Phone Number (10 Digits) *"}
                    </label>
                    <div className="relative">
                      <Phone className="w-4 h-4 text-white/40 absolute left-3.5 top-3" />
                      <input
                        type="tel"
                        required
                        placeholder="77082 47124"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-white/5 border border-white/15 text-xs text-white placeholder-white/30 focus:outline-none focus:border-[#C9A46B] font-mono"
                      />
                    </div>
                  </div>
                </div>

                {/* Date & Time Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-white/80 mb-1">
                      {isTamil ? "விரும்பும் தேதி *" : "Preferred Date *"}
                    </label>
                    <input
                      type="date"
                      required
                      min={todayStr}
                      value={formData.preferredDate}
                      onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/15 text-xs text-white focus:outline-none focus:border-[#C9A46B]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-white/80 mb-1">
                      {isTamil ? "விரும்பும் நேரம் *" : "Preferred Time Slot *"}
                    </label>
                    <select
                      value={formData.preferredTime}
                      onChange={(e) => setFormData({ ...formData, preferredTime: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-950 border border-white/15 text-xs text-white focus:outline-none focus:border-[#C9A46B]"
                    >
                      {timeSlots.map((slot) => (
                        <option key={slot} value={slot} className="bg-zinc-950 text-white">
                          {slot}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Purpose of Visit */}
                <div>
                  <label className="block text-xs font-bold text-white/80 mb-1">
                    {isTamil ? "சந்திப்பின் நோக்கம் *" : "Purpose of Meeting *"}
                  </label>
                  <select
                    value={formData.purpose}
                    onChange={(e) => setFormData({ ...formData, purpose: e.target.value as any })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-950 border border-white/15 text-xs text-white focus:outline-none focus:border-[#C9A46B]"
                  >
                    {purposeOptions.map((opt) => (
                      <option key={opt.id} value={opt.id} className="bg-zinc-950 text-white">
                        {isTamil ? opt.labelTa : opt.labelEn}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Optional Message */}
                <div>
                  <label className="block text-xs font-bold text-white/80 mb-1">
                    {isTamil ? "கூடுதல் தகவல்கள் (விருப்பத்திற்குரியது)" : "Additional Notes (Optional)"}
                  </label>
                  <textarea
                    rows={2}
                    placeholder={
                      isTamil
                        ? "நிலத்தின் அளவு, இடம் அல்லது உங்கள் கேள்விகளை குறிப்பிடலாம்..."
                        : "Plot size, location, or specific questions for the engineer..."
                    }
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl bg-white/5 border border-white/15 text-xs text-white placeholder-white/30 focus:outline-none focus:border-[#C9A46B] resize-none"
                  />
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 rounded-2xl bg-gradient-to-r from-white via-slate-100 to-[#E2C496] disabled:opacity-50 text-black font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all hover:scale-[1.01] active:scale-95 shadow-lg mt-2"
                >
                  {isSubmitting ? (
                    <span>{isTamil ? "பதிவாகிறது..." : "Submitting..."}</span>
                  ) : (
                    <>
                      <span>{isTamil ? "சந்திப்பை முன்பதிவு செய்க" : "Confirm Appointment Request"}</span>
                      <ArrowRight className="w-4 h-4 text-black" />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
