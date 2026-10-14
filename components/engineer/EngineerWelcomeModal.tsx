"use client";

import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  ArrowRight,
  Home,
  Compass,
  X,
  Volume2,
  VolumeX,
  Languages,
  CheckCircle2,
  ShieldCheck,
  Building2,
} from "lucide-react";

const Engineer3DCanvas = dynamic(
  () => import("./Engineer3DCanvas"),
  { ssr: false }
);

interface EngineerWelcomeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onExploreProjects: () => void;
  onStartDreamHome: () => void;
}

export default function EngineerWelcomeModal({
  isOpen,
  onClose,
  onExploreProjects,
  onStartDreamHome,
}: EngineerWelcomeModalProps) {
  const [lang, setLang] = useState<"en" | "ta">("en");
  const [isSpeaking, setIsSpeaking] = useState(false);

  // Speech synthesis for optional audio narration (User-Triggered ONLY)
  const handleToggleVoice = () => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;

    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    window.speechSynthesis.cancel();
    const textToSpeak =
      lang === "en"
        ? "Welcome to Jancy Builders. Let us build your dream into reality. I am your engineering guide."
        : "ஜான்சி பில்டர்ஸுக்கு அன்புடன் வரவேற்கிறோம். உங்கள் கனவு இல்லத்தை நிஜமாக்குவோம்.";

    const utterance = new SpeechSynthesisUtterance(textToSpeak);
    utterance.rate = 0.95;
    utterance.pitch = 1.0;

    // Pick Tamil or Indian English voice if present in system
    const voices = window.speechSynthesis.getVoices();
    const voice =
      lang === "ta"
        ? voices.find((v) => v.lang.includes("ta") || v.name.includes("Tamil"))
        : voices.find((v) => v.lang === "en-IN" || v.name.includes("India") || v.lang.includes("en"));

    if (voice) utterance.voice = voice;

    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    window.speechSynthesis.speak(utterance);
    setIsSpeaking(true);
  };

  // Cleanup speech on unmount
  useEffect(() => {
    return () => {
      if (typeof window !== "undefined" && "speechSynthesis" in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-8 bg-slate-950/75 backdrop-blur-md">
        {/* Backdrop dismiss click */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0"
        />

        {/* Modal Card with Split 3D Avatar + Architectural Welcome Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 20 }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl border border-[#E8DFD1] overflow-hidden z-10 grid grid-cols-1 md:grid-cols-12 max-h-[90vh]"
        >
          {/* Top Control Bar: Language, Audio & Close */}
          <div className="absolute top-4 right-4 z-30 flex items-center gap-2">
            {/* Language Toggle */}
            <button
              onClick={() => setLang((prev) => (prev === "en" ? "ta" : "en"))}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold bg-slate-100 hover:bg-slate-200 text-slate-800 transition-all border border-slate-300 shadow-sm"
              title="Toggle Language (English / தமிழ்)"
            >
              <Languages className="w-3.5 h-3.5 text-[#B88746]" />
              <span>{lang === "en" ? "தமிழ்" : "English"}</span>
            </button>

            {/* Audio Voice Narration Toggle (User-Triggered Only) */}
            <button
              onClick={handleToggleVoice}
              className={`p-2 rounded-full transition-all border shadow-sm ${
                isSpeaking
                  ? "bg-[#B88746] text-slate-950 border-[#B88746] animate-pulse"
                  : "bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-300"
              }`}
              title={isSpeaking ? "Mute Voice Narration" : "Listen to Voice Narration"}
            >
              {isSpeaking ? (
                <Volume2 className="w-4 h-4" />
              ) : (
                <VolumeX className="w-4 h-4" />
              )}
            </button>

            {/* Skip / Dismiss Button */}
            <button
              onClick={onClose}
              className="p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 hover:text-slate-950 transition-all border border-slate-300 shadow-sm"
              title="Skip into website"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* LEFT COLUMN: REAL-TIME 3D ENGINEER AVATAR */}
          <div className="md:col-span-5 bg-gradient-to-b from-[#1E293B] via-[#0F172A] to-[#020617] relative flex flex-col items-center justify-center p-4 min-h-[320px] md:min-h-[460px] overflow-hidden">
            {/* Subtle architectural background blueprint grid lines */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#38bdf812_1px,transparent_1px),linear-gradient(to_bottom,#38bdf812_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

            {/* Real-time 3D Engineer Canvas */}
            <div className="w-full h-full absolute inset-0">
              <Engineer3DCanvas isWelcoming={true} gesture="welcome" />
            </div>

            {/* Bottom Engineer ID Badge */}
            <div className="absolute bottom-4 left-4 right-4 z-20 bg-slate-900/85 backdrop-blur-md p-3 rounded-2xl border border-white/10 flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-emerald-400 animate-ping flex-shrink-0" />
              <div className="min-w-0">
                <h4 className="text-xs font-bold text-white truncate">
                  Er. Sahaya Antony Stalin, B.E. (Civil)
                </h4>
                <p className="text-[10px] text-slate-400 font-mono">
                  Chief Civil Engineer & Founder
                </p>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: WELCOME MESSAGE & ACTION BUTTONS */}
          <div className="md:col-span-7 p-6 sm:p-8 md:p-10 flex flex-col justify-between overflow-y-auto">
            <div className="space-y-4">
              {/* Eyebrow badge */}
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#B88746]/15 text-[#8C5D24] text-[11px] font-bold tracking-wider font-mono uppercase">
                  <Sparkles className="w-3 h-3 text-[#B88746]" />
                  <span>Jancy Builders • Tirunelveli</span>
                </span>
                <span className="text-[11px] text-slate-500 font-mono hidden sm:inline">
                  Est. 2016
                </span>
              </div>

              {/* Main Welcome Headline */}
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-950 font-sans tracking-tight leading-tight">
                {lang === "en" ? (
                  <>
                    Welcome to <span className="text-[#B88746]">Jancy Builders</span>.
                  </>
                ) : (
                  <>
                    <span className="text-[#B88746]">ஜான்சி பில்டர்ஸ்</span>-க்கு அன்புடன் வரவேற்கிறோம்.
                  </>
                )}
              </h2>

              {/* Welcome Quote / Message */}
              <div className="p-4 rounded-2xl bg-[#F8F5EE] border border-[#E8DFD1] relative">
                <p className="text-slate-800 text-base sm:text-lg font-medium leading-relaxed italic">
                  {lang === "en" ? (
                    `"Let us build your dream into reality. From structural precision and thermal Porotherm brickwork to turnkey handover, our engineering team is here to guide your journey."`
                  ) : (
                    `"உங்கள் கனவு இல்லத்தை மிகச் சிறந்த பொறியியல் தரத்துடன் நிஜமாக்குவோம். அஸ்திவாரம் முதல் சாவி ஒப்படைப்பு வரை உங்களுக்கு வழிகாட்ட தயாராக உள்ளோம்."`
                  )}
                </p>
              </div>

              {/* 3 Civil Engineering Guarantees */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs">
                <div className="flex items-center gap-2 text-slate-700">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span className="font-semibold">NABL Certified Concrete</span>
                </div>
                <div className="flex items-center gap-2 text-slate-700">
                  <Building2 className="w-4 h-4 text-[#B88746] flex-shrink-0" />
                  <span className="font-semibold">Porotherm Thermal Bricks</span>
                </div>
                <div className="flex items-center gap-2 text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-blue-600 flex-shrink-0" />
                  <span className="font-semibold">Zero Cost Escalation</span>
                </div>
              </div>
            </div>

            {/* TWO PRIMARY ACTION BUTTONS */}
            <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center gap-3">
              {/* Button 1: Explore Our Projects */}
              <button
                onClick={() => {
                  onClose();
                  onExploreProjects();
                }}
                className="w-full sm:w-1/2 flex items-center justify-center gap-2 bg-slate-950 hover:bg-slate-800 text-white font-bold text-xs uppercase tracking-wider px-6 py-4 rounded-2xl shadow-lg transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                <Compass className="w-4 h-4 text-[#B88746]" />
                <span>
                  {lang === "en" ? "Explore Our Projects" : "எங்கள் திட்டங்களை காணுங்கள்"}
                </span>
                <ArrowRight className="w-4 h-4 ml-1" />
              </button>

              {/* Button 2: Start Your Dream Home */}
              <button
                onClick={() => {
                  onClose();
                  onStartDreamHome();
                }}
                className="w-full sm:w-1/2 flex items-center justify-center gap-2 bg-[#B88746] hover:bg-[#a67435] text-slate-950 font-bold text-xs uppercase tracking-wider px-6 py-4 rounded-2xl shadow-lg shadow-[#B88746]/25 transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                <Home className="w-4 h-4" />
                <span>
                  {lang === "en" ? "Start Your Dream Home" : "உங்கள் கனவு இல்லம்"}
                </span>
              </button>
            </div>

            {/* Bottom Skip Note */}
            <div className="pt-3 text-center">
              <button
                onClick={onClose}
                className="text-xs text-slate-500 hover:text-slate-800 underline transition-colors"
              >
                {lang === "en"
                  ? "Continue directly to website (Guide available in bottom corner)"
                  : "நேரடியாக தளத்திற்கு செல்லுங்கள் (வழிகாட்டி கீழே உள்ளது)"}
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
