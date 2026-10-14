"use client";

import React, { useState } from "react";
import {
  Calendar,
  Clock,
  User,
  Phone,
  FileText,
  MapPin,
  X,
  CheckCircle2,
  AlertCircle,
  MessageCircle,
  Sparkles,
  ArrowRight,
  Building,
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
  defaultPurpose = "House Construction",
}: AppointmentModalProps) {
  const { language, isTamil } = useLanguage();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("10:30 AM");
  const [purpose, setPurpose] = useState(defaultPurpose);
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [bookingResult, setBookingResult] = useState<{
    id: string;
    whatsappUrl: string;
    date: string;
    time: string;
  } | null>(null);

  // Time slot options
  const timeSlots = [
    "09:30 AM",
    "11:00 AM",
    "02:30 PM",
    "04:00 PM",
    "05:30 PM",
    "06:30 PM",
  ];

  // Purpose options
  const purposeOptions = [
    { id: "House Construction", en: "House Construction", ta: "புதிய வீடு கட்டுமானம்" },
    { id: "House Planning", en: "House Planning & Vastu", ta: "வீட்டு வரைபடம் & வாஸ்து" },
    { id: "Cost Estimation", en: "Cost Estimation (BOQ)", ta: "கட்டுமான மதிப்பீடு (BOQ)" },
    { id: "Renovation", en: "Home Renovation / Extension", ta: "வீட்டைப் புதுப்பிக்க / கூடுதல் தளம்" },
    { id: "Building Approval Guidance", en: "Building Approval Guidance", ta: "கட்டிட அனுமதி & ஆவண வழிகாட்டல்" },
    { id: "Other Consultation", en: "Other Civil Consultation", ta: "இதர சிவில் ஆலோசனைகள்" },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    if (!name.trim() || name.trim().length < 2) {
      setErrorMsg(isTamil ? "தயவுசெய்து உங்கள் பெயரை உள்ளிடவும்." : "Please enter your full name.");
      return;
    }

    const cleanPhone = phone.replace(/[\s\-\+]/g, "");
    if (!cleanPhone || cleanPhone.length < 10) {
      setErrorMsg(
        isTamil
          ? "தயவுசெய்து சரியான 10 இலக்க தொலைபேசி எண்ணை உள்ளிடவும்."
          : "Please enter a valid 10-digit mobile number."
      );
      return;
    }

    if (!date) {
      setErrorMsg(
        isTamil ? "சந்திப்பு தேதியைத் தேர்ந்தெடுக்கவும்." : "Please select your preferred visit date."
      );
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await fetch("/api/appointments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          phone: cleanPhone,
          date,
          time,
          purpose,
          message: message.trim(),
        }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setBookingResult({
          id: data.appointment.id,
          whatsappUrl: data.whatsappUrl,
          date: data.appointment.date,
          time: data.appointment.time,
        });
      } else {
        setErrorMsg(data.error || (isTamil ? "முன்பதிவு செய்ய முடியவில்லை." : "Failed to book appointment."));
      }
    } catch (err) {
      setErrorMsg(
        isTamil ? "சேவையகத்தை இணைக்க முடியவில்லை." : "Connection failed. Please call +91 77082 47124 directly."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setName("");
    setPhone("");
    setDate("");
    setMessage("");
    setBookingResult(null);
    setErrorMsg("");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleReset}
          className="fixed inset-0 bg-black/75 backdrop-blur-sm"
        />

        {/* Modal Dialog */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className="relative w-full max-w-lg bg-[#17191B] border border-white/15 rounded-3xl p-6 sm:p-8 shadow-2xl z-10 text-white overflow-hidden my-8"
        >
          {/* Close button */}
          <button
            onClick={handleReset}
            className="absolute top-5 right-5 p-2 rounded-full bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Success View */}
          {bookingResult ? (
            <div className="text-center py-6 space-y-5">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div>
                <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#B78A52] block mb-1">
                  {isTamil ? "முன்பதிவு கோரிக்கை பெறப்பட்டது" : "APPOINTMENT REQUEST RECEIVED"}
                </span>
                <h3 className="text-2xl font-black text-white font-sans">
                  {isTamil ? "உங்கள் சந்திப்பு கோரிக்கை பதிவானது!" : "Meeting Request Confirmed!"}
                </h3>
                <div className="inline-block mt-2 px-3 py-1 rounded-full bg-white/10 border border-white/15 text-xs font-mono text-slate-300">
                  ID: <span className="text-[#B78A52] font-bold">{bookingResult.id}</span>
                </div>
              </div>

              <div className="bg-[#1F2226] p-4 rounded-2xl border border-white/10 text-xs text-left space-y-2 text-slate-300">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-[#B78A52]" />
                  <span className="font-semibold text-white">
                    {bookingResult.date} at {bookingResult.time}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Building className="w-4 h-4 text-[#B78A52]" />
                  <span>Jancy Home, Perumal Kovil St, Samugarengapuram</span>
                </div>
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4 text-[#B78A52]" />
                  <span>Er. Sahaya Antony Stalin, B.E. (Civil)</span>
                </div>
              </div>

              <p className="text-xs text-slate-400 leading-relaxed max-w-sm mx-auto">
                {isTamil
                  ? "எங்கள் அலுவலகக் குழு உங்கள் சந்திப்பு நேரத்தை உறுதி செய்து வாட்ஸ்அப் அல்லது அழைப்பு மூலம் தகவல் தெரிவிக்கும்."
                  : "Our office staff has recorded your preferred time. We will call or WhatsApp you to confirm the appointment."}
              </p>

              <div className="space-y-2.5 pt-2">
                <a
                  href={bookingResult.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3.5 rounded-xl bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg transition-all"
                >
                  <MessageCircle className="w-4 h-4 fill-current" />
                  <span>
                    {isTamil ? "வாட்ஸ்அப்பில் அலுவலகத்திற்கு உறுதிப்படுத்த" : "Share Confirmation on WhatsApp"}
                  </span>
                </a>

                <button
                  onClick={handleReset}
                  className="w-full py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 text-xs font-semibold transition-colors"
                >
                  {isTamil ? "மூடுக" : "Close"}
                </button>
              </div>
            </div>
          ) : (
            /* Booking Form */
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#B78A52] block mb-1">
                  {isTamil ? "நேரடி அலுவலக சந்திப்பு" : "DIRECT OFFICE CONSULTATION"}
                </span>
                <h3 className="text-2xl font-black text-white font-sans tracking-tight">
                  {isTamil ? "அலுவலக சந்திப்பை முன்பதிவு செய்யுங்கள்" : "Book an Office Appointment"}
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  {isTamil
                    ? "சாமுகரெங்கபுரம் அலுவலகத்தில் தலைமைப் பொறியாளர் Er. ஸ்டாலின் அவர்களை நேரில் சந்திக்க"
                    : "Meet Chief Civil Engineer Er. Sahaya Antony Stalin at our Samugarengapuram office."}
                </p>
              </div>

              {errorMsg && (
                <div className="p-3 rounded-xl bg-red-500/15 border border-red-500/30 text-red-400 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}

              {/* Name & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1.5">
                    {isTamil ? "உங்கள் பெயர்" : "Your Name"} *
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      required
                      placeholder={isTamil ? "எ.கா: முருகன்" : "e.g. S. Murugan"}
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full pl-10 pr-3 py-2.5 rounded-xl bg-[#1F2226] border border-white/15 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-[#B78A52]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1.5">
                    {isTamil ? "தொலைபேசி எண்" : "Phone Number"} *
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="tel"
                      required
                      placeholder="98765 43210"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full pl-10 pr-3 py-2.5 rounded-xl bg-[#1F2226] border border-white/15 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-[#B78A52]"
                    />
                  </div>
                </div>
              </div>

              {/* Date & Time */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1.5">
                    {isTamil ? "விருப்பமான தேதி" : "Preferred Date"} *
                  </label>
                  <div className="relative">
                    <Calendar className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="date"
                      required
                      min={new Date().toISOString().split("T")[0]}
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className="w-full pl-10 pr-3 py-2.5 rounded-xl bg-[#1F2226] border border-white/15 text-white text-xs focus:outline-none focus:border-[#B78A52]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1.5">
                    {isTamil ? "விருப்பமான நேரம்" : "Preferred Time Slot"} *
                  </label>
                  <div className="relative">
                    <Clock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <select
                      value={time}
                      onChange={(e) => setTime(e.target.value)}
                      className="w-full pl-10 pr-3 py-2.5 rounded-xl bg-[#1F2226] border border-white/15 text-white text-xs focus:outline-none focus:border-[#B78A52]"
                    >
                      {timeSlots.map((slot) => (
                        <option key={slot} value={slot}>
                          {slot}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Purpose of Visit */}
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5">
                  {isTamil ? "சந்திப்பின் நோக்கம்" : "Purpose of Visit"}
                </label>
                <select
                  value={purpose}
                  onChange={(e) => setPurpose(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl bg-[#1F2226] border border-white/15 text-white text-xs focus:outline-none focus:border-[#B78A52]"
                >
                  {purposeOptions.map((opt) => (
                    <option key={opt.id} value={opt.id}>
                      {isTamil ? opt.ta : opt.en}
                    </option>
                  ))}
                </select>
              </div>

              {/* Optional message */}
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5">
                  {isTamil ? "குறிப்புகள் (விருப்பப்பட்டால்)" : "Optional Notes / Plot Details"}
                </label>
                <textarea
                  rows={2}
                  placeholder={
                    isTamil
                      ? "எ.கா: 1200 சதுர அடி நிலம் உள்ளது, G+1 வீடு கட்ட விரும்புகிறேன்..."
                      : "e.g. 1200 sq.ft plot in Samugarengapuram, planning ground+first floor..."
                  }
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full p-3 rounded-xl bg-[#1F2226] border border-white/15 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-[#B78A52]"
                />
              </div>

              {/* Notice */}
              <div className="p-3 rounded-xl bg-slate-900/60 border border-white/10 text-[11px] text-slate-400">
                <span className="text-[#B78A52] font-bold">
                  {isTamil ? "அலுவலக முகவரி: " : "Office Location: "}
                </span>
                {isTamil
                  ? "ஜான்சி ஹோம், பெருமாள் கோவில் தெரு, சாமுகரெங்கபுரம் (திங்கள் – சனி: காலை 9:00 முதல் இரவு 7:30 வரை)"
                  : "Jancy Home, Perumal Kovil Street, Samugarengapuram (Mon – Sat: 9:00 AM – 7:30 PM)"}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 rounded-xl bg-[#B78A52] hover:bg-[#a37742] text-slate-950 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-[#B78A52]/20 transition-all disabled:opacity-50"
              >
                {isSubmitting ? (
                  <span>{isTamil ? "பதிவாகிறது..." : "Booking..."}</span>
                ) : (
                  <>
                    <span>{isTamil ? "சந்திப்பை உறுதிப்படுத்துக" : "Request Appointment"}</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
