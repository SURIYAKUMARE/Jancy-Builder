"use client";

import React, { useState, useEffect } from "react";
import {
  HardHat,
  Sparkles,
  Volume2,
  VolumeX,
  X,
  ChevronDown,
  ChevronUp,
  MapPin,
  Calculator,
  FileCheck,
  Hammer,
  Phone,
  Home,
  MessageCircle,
  HelpCircle,
  RotateCcw,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";

interface HomeBuildingGuideProps {
  onOpenQuote?: (tier?: "standard" | "premium" | "ultra") => void;
  onOpenStarter?: () => void;
}

export default function HomeBuildingGuide({
  onOpenQuote,
  onOpenStarter,
}: HomeBuildingGuideProps) {
  const { language, setLanguage, isTamil } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [activeTopic, setActiveTopic] = useState<string | null>(null);

  // Auto-prompt once on first visit after 2 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const welcomeText = {
    en: "Vanakkam! Welcome to Jancy Builders.\n\nAre you planning to build a house?\n\nI can explain the construction process, estimated costs, and important steps in simple language.\n\nHow can I help you today?",
    ta: "வணக்கம்! ஜான்சி பில்டர்ஸுக்கு உங்களை அன்புடன் வரவேற்கிறோம்.\n\nநீங்கள் வீடு கட்டப் போகிறீர்களா?\n\nவீடு கட்டும் முறை, செலவு மற்றும் முக்கியமான விஷயங்களை எளிமையாக விளக்குகிறேன்.\n\nஉங்களுக்கு என்ன உதவி வேண்டும்?",
  };

  // 6 Primary Option Buttons from user prompt
  const options = [
    {
      id: "have_land",
      icon: Home,
      titleEn: "I Have Land",
      titleTa: "என்னிடம் நிலம் இருக்கிறது",
      descEn: "Ready to plan your floor design & foundation",
      descTa: "வீட்டுத் திட்டம் மற்றும் அடித்தளம் அமைக்க தயார்",
      action: () => {
        setActiveTopic("have_land");
        const el = document.getElementById("starter");
        if (el) el.scrollIntoView({ behavior: "smooth" });
        else if (onOpenStarter) onOpenStarter();
      },
    },
    {
      id: "buy_land",
      icon: MapPin,
      titleEn: "I Plan to Buy Land",
      titleTa: "நான் நிலம் வாங்கப் போகிறேன்",
      descEn: "Tips to check Patta, road access & soil",
      descTa: "பட்டா, பாதை மற்றும் மண் சரிபார்க்க வழிகாட்டல்",
      action: () => {
        setActiveTopic("buy_land");
        const el = document.getElementById("documents");
        if (el) el.scrollIntoView({ behavior: "smooth" });
      },
    },
    {
      id: "check_cost",
      icon: Calculator,
      titleEn: "Check Construction Cost",
      titleTa: "வீடு கட்டும் செலவை அறிய",
      descEn: "Calculate budget per sq.ft with live estimate",
      descTa: "சதுர அடி வாரியாக உத்தேச செலவை கணக்கிடுங்கள்",
      action: () => {
        setActiveTopic("check_cost");
        const el = document.getElementById("estimator");
        if (el) el.scrollIntoView({ behavior: "smooth" });
      },
    },
    {
      id: "approvals",
      icon: FileCheck,
      titleEn: "Understand Building Approvals",
      titleTa: "கட்டிட அனுமதி பற்றி அறிய",
      descEn: "Learn about Panchayat / DTCP requirements",
      descTa: "ஊராட்சி மற்றும் DTCP வரைபட அனுமதி விபரங்கள்",
      action: () => {
        setActiveTopic("approvals");
        const el = document.getElementById("documents");
        if (el) el.scrollIntoView({ behavior: "smooth" });
      },
    },
    {
      id: "renovate",
      icon: Hammer,
      titleEn: "Renovate My House",
      titleTa: "என் வீட்டைப் புதுப்பிக்க",
      descEn: "Add a floor, waterproof, or remodel",
      descTa: "கூடுதல் மாடி, வாட்டர்ப்ரூஃபிங் அல்லது சீரமைப்பு",
      action: () => {
        setActiveTopic("renovate");
        const el = document.getElementById("services");
        if (el) el.scrollIntoView({ behavior: "smooth" });
      },
    },
    {
      id: "talk_engineer",
      icon: Phone,
      titleEn: "Talk to an Engineer",
      titleTa: "பொறியாளரிடம் பேச",
      descEn: "Direct call or WhatsApp with Er. Stalin",
      descTa: "பொறியாளர் ஸ்டாலின் அவர்களிடம் நேரடியாக பேச",
      action: () => {
        setActiveTopic("talk_engineer");
        const el = document.getElementById("contact");
        if (el) el.scrollIntoView({ behavior: "smooth" });
      },
    },
  ];

  // Voice narration helper (strictly user initiated)
  const handleToggleVoice = () => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) {
      alert(isTamil ? "உங்கள் உலாவியில் ஆடியோ வசதி இல்லை." : "Speech synthesis is not supported on this browser.");
      return;
    }

    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    window.speechSynthesis.cancel();
    const textToSpeak = isTamil ? welcomeText.ta : welcomeText.en;
    const utterance = new SpeechSynthesisUtterance(textToSpeak);
    utterance.rate = 0.92;

    const voices = window.speechSynthesis.getVoices();
    const voice = isTamil
      ? voices.find((v) => v.lang.includes("ta") || v.name.includes("Tamil"))
      : voices.find((v) => v.lang.includes("en-IN") || v.name.includes("India") || v.lang.includes("en"));

    if (voice) utterance.voice = voice;

    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    window.speechSynthesis.speak(utterance);
    setIsSpeaking(true);
  };

  return (
    <>
      {/* Floating Minimized Capsule / Pill */}
      <div className="fixed bottom-5 left-4 sm:left-6 z-40 font-sans print:hidden">
        {!isOpen && (
          <motion.button
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              setIsOpen(true);
              setHasInteracted(true);
            }}
            className="group flex items-center gap-3 px-4 py-3 rounded-full bg-[#17191B] text-white shadow-2xl border-2 border-[#B78A52] hover:bg-[#25282B] transition-all"
            aria-label="Open Home Building Guide"
          >
            <div className="w-8 h-8 rounded-full bg-[#B78A52]/20 text-[#B78A52] flex items-center justify-center relative">
              <HardHat className="w-4 h-4 text-[#B78A52]" />
              <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-400 border border-[#17191B] animate-pulse" />
            </div>
            <div className="text-left">
              <span className="text-[10px] font-mono text-[#B78A52] uppercase tracking-wider block font-bold leading-tight">
                {isTamil ? "வீட்டு வழிகாட்டி" : "Home Building Guide"}
              </span>
              <span className="text-xs font-bold text-white leading-tight block">
                {isTamil ? "உதவி வேண்டுமா?" : "Need Help Building?"}
              </span>
            </div>
          </motion.button>
        )}

        {/* Expanded Friendly Guide Modal / Card */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 20 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="w-[330px] sm:w-[400px] rounded-3xl bg-white text-[#202124] shadow-2xl border border-[#E2D9CC] overflow-hidden flex flex-col max-h-[85vh]"
            >
              {/* Header with Digital Assistant Identification */}
              <div className="bg-[#17191B] text-white px-5 py-4 flex items-center justify-between border-b border-white/10">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-[#B78A52]/20 border border-[#B78A52]/40 text-[#B78A52] flex items-center justify-center">
                    <HardHat className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold font-sans flex items-center gap-2">
                      <span>{isTamil ? "வீட்டு வழிகாட்டி" : "Home Building Guide"}</span>
                      <span className="text-[9px] font-mono font-bold uppercase px-2 py-0.5 rounded-full bg-[#B78A52]/20 text-[#B78A52] border border-[#B78A52]/30">
                        DIGITAL ASSISTANT
                      </span>
                    </h3>
                    <p className="text-[10px] text-slate-400 font-mono mt-0.5">
                      {isTamil ? "ஜான்சி பில்டர்ஸ் • எளிய உதவி" : "Jancy Builders • Friendly Helper"}
                    </p>
                  </div>
                </div>

                {/* Header Controls: Voice Narration + Language Switch + Minimize */}
                <div className="flex items-center gap-1.5">
                  {/* Voice Button */}
                  <button
                    onClick={handleToggleVoice}
                    className={`p-2 rounded-xl transition-all ${
                      isSpeaking
                        ? "bg-[#B78A52] text-slate-950 animate-pulse"
                        : "bg-white/10 hover:bg-white/20 text-slate-300"
                    }`}
                    title={isTamil ? "கேட்டுத் தெரிந்துகொள்ளுங்கள்" : "Listen to Explanation"}
                    aria-label="Toggle Voice Narration"
                  >
                    {isSpeaking ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
                  </button>

                  {/* Language Toggle */}
                  <button
                    onClick={() => setLanguage(isTamil ? "en" : "ta")}
                    className="px-2.5 py-1 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-bold font-mono text-[#B78A52] transition-colors"
                    title="Toggle Language"
                  >
                    {isTamil ? "EN" : "தமிழ்"}
                  </button>

                  {/* Minimize Button */}
                  <button
                    onClick={() => {
                      if (isSpeaking && typeof window !== "undefined") {
                        window.speechSynthesis.cancel();
                        setIsSpeaking(false);
                      }
                      setIsOpen(false);
                    }}
                    className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
                    aria-label="Minimize Guide"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Scrollable Content */}
              <div className="p-5 overflow-y-auto space-y-4 text-xs">
                
                {/* Welcome Speech Bubble */}
                <div className="p-4 rounded-2xl bg-[#F8F6F1] border border-[#E2D9CC] space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono font-bold text-[#B78A52] uppercase tracking-wider flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>{isTamil ? "வணக்கம்!" : "Welcome!"}</span>
                    </span>

                    {/* Listen Button directly inside the bubble */}
                    <button
                      onClick={handleToggleVoice}
                      className="text-[10px] font-bold text-[#B78A52] hover:underline flex items-center gap-1"
                    >
                      <Volume2 className="w-3 h-3" />
                      <span>{isTamil ? "🔊 கேட்டுத் தெரிந்துகொள்ளுங்கள்" : "🔊 Listen"}</span>
                    </button>
                  </div>

                  <p className="text-xs text-[#202124] leading-relaxed whitespace-pre-line font-medium">
                    {isTamil ? welcomeText.ta : welcomeText.en}
                  </p>
                </div>

                {/* Big Action Buttons */}
                <div>
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400 block mb-2 px-1">
                    {isTamil ? "உங்களுக்கு என்ன உதவி வேண்டும்? தேர்வு செய்யுங்கள்:" : "How can I help you? Tap an option:"}
                  </span>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {options.map((opt) => {
                      const Icon = opt.icon;
                      return (
                        <button
                          key={opt.id}
                          onClick={() => {
                            opt.action();
                            setIsOpen(false);
                          }}
                          className="flex items-start gap-2.5 p-3 rounded-2xl bg-white hover:bg-[#F8F6F1] border border-[#E2D9CC] hover:border-[#B78A52]/60 text-left transition-all shadow-sm group hover:-translate-y-0.5"
                        >
                          <div className="w-8 h-8 rounded-xl bg-[#B78A52]/10 text-[#B78A52] flex items-center justify-center flex-shrink-0 group-hover:bg-[#B78A52] group-hover:text-white transition-colors">
                            <Icon className="w-4 h-4" />
                          </div>
                          <div className="min-w-0">
                            <h4 className="text-xs font-bold text-[#17191B] leading-tight group-hover:text-[#B78A52] transition-colors">
                              {isTamil ? opt.titleTa : opt.titleEn}
                            </h4>
                            <p className="text-[10px] text-slate-500 leading-tight mt-0.5 line-clamp-1">
                              {isTamil ? opt.descTa : opt.descEn}
                            </p>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Direct Engineer Assurance Box */}
                <div className="p-3.5 rounded-2xl bg-[#17191B] text-white flex items-center justify-between gap-3">
                  <div className="leading-tight">
                    <span className="text-[10px] font-mono text-[#B78A52] block uppercase tracking-wider font-bold">
                      {isTamil ? "நேரடி பொறியாளர் தொடர்பு" : "DIRECT ENGINEER LINE"}
                    </span>
                    <span className="text-xs font-bold text-white block mt-0.5">
                      Er. Sahaya Antony Stalin, B.E.
                    </span>
                  </div>

                  <a
                    href="tel:+917708247124"
                    className="px-3.5 py-1.5 rounded-full bg-[#B78A52] hover:bg-[#a37742] text-slate-950 font-bold text-xs flex items-center gap-1.5 shadow-md transition-all"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span>{isTamil ? "அழைக்க" : "Call"}</span>
                  </a>
                </div>

              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
