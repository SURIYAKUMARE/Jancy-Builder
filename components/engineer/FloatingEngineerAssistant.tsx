"use client";

import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  HardHat,
  Sparkles,
  MessageSquare,
  Calculator,
  Compass,
  Phone,
  X,
  ChevronDown,
  Volume2,
  VolumeX,
  Languages,
  CheckCircle2,
  Building,
  HelpCircle,
} from "lucide-react";

interface FloatingEngineerAssistantProps {
  onOpenQuote?: () => void;
}

export default function FloatingEngineerAssistant({
  onOpenQuote,
}: FloatingEngineerAssistantProps) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [lang, setLang] = useState<"en" | "ta">("en");
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("home");

  // Detect active page / scroll section to provide contextual engineering advice
  useEffect(() => {
    if (pathname.includes("/services")) {
      setActiveSection("services");
    } else if (pathname.includes("/projects")) {
      setActiveSection("projects");
    } else if (pathname.includes("/process")) {
      setActiveSection("process");
    } else if (pathname.includes("/estimator")) {
      setActiveSection("estimator");
    } else if (pathname.includes("/contact")) {
      setActiveSection("contact");
    } else {
      setActiveSection("home");
    }
  }, [pathname]);

  // Contextual guidance dictionary
  const guidance = {
    home: {
      en: "Discover how we transform ideas into beautiful buildings with NABL certified concrete and Porotherm thermal bricks.",
      ta: "எங்கள் கட்டுமான சிறப்புகள், NABL சான்றளிக்கப்பட்ட கான்கிரீட் மற்றும் போரோதெர்ம் செங்கற்கள் மூலம் உங்கள் கனவு இல்லத்தை உருவாக்குவோம்.",
    },
    services: {
      en: "Explore our professional construction and architectural services from residential villas to commercial landmarks.",
      ta: "எங்களின் முதன்மையான குடியிருப்பு மற்றும் வணிக வளாக கட்டுமான சேவைகளை பார்வையிடுங்கள்.",
    },
    projects: {
      en: "Take a look at our construction work and completed projects across Tirunelveli, Vallioor, and Kanyakumari.",
      ta: "திருநெல்வேலி, வள்ளியூர் பகுதிகளில் எங்களால் கட்டி முடிக்கப்பட்ட மற்றும் நேரலை கட்டுமானங்களை பாருங்கள்.",
    },
    process: {
      en: "Let me guide you through our 6-stage turnkey construction workflow from soil testing to ceremonial key handover.",
      ta: "மண் பரிசோதனை முதல் சாவி ஒப்படைப்பு வரையிலான எங்களின் 6-படி கட்டுமான முறையை உங்களுக்கு விளக்குகிறேன்.",
    },
    estimator: {
      en: "Let's calculate an estimated turnkey budget for your dream home with itemized material specifications.",
      ta: "உங்கள் வீட்டின் பரப்பளவை கொண்டு துல்லியமான உத்தேச கட்டுமான பட்ஜெட்டை இப்போதே கணக்கிடுங்கள்.",
    },
    contact: {
      en: "Ready to begin? Connect directly with our engineering team or message me on WhatsApp.",
      ta: "கட்டுமானத்தை தொடங்க தயாரா? எங்கள் பொறியியல் குழுவுடன் நேரடியாக வாட்ஸ்அப் அல்லது போன் மூலம் இணையுங்கள்.",
    },
  };

  const activeMessage =
    guidance[activeSection as keyof typeof guidance] || guidance.home;

  // Audio Voice Narration (strictly user triggered)
  const handleToggleVoice = () => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;

    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    window.speechSynthesis.cancel();
    const textToSpeak = lang === "en" ? activeMessage.en : activeMessage.ta;
    const utterance = new SpeechSynthesisUtterance(textToSpeak);
    utterance.rate = 0.95;

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

  const whatsappMessage = encodeURIComponent(
    `Hello Er. Sahaya Antony Stalin, I am using the Jancy Builders website guide and would like to discuss my construction project.`
  );
  const whatsappUrl = `https://wa.me/917708247124?text=${whatsappMessage}`;

  return (
    <div className="fixed bottom-6 left-6 z-40 font-sans print:hidden">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.88, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 15 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="mb-3 w-[320px] sm:w-[360px] bg-white rounded-3xl shadow-2xl border border-[#E8DFD1] overflow-hidden"
          >
            {/* Header Strip with Engineer Title & Controls */}
            <div className="bg-slate-950 p-4 text-white flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative w-10 h-10 rounded-full bg-[#B88746]/20 border border-[#B88746] flex items-center justify-center text-[#B88746] overflow-hidden">
                  <HardHat className="w-5 h-5 text-[#B88746]" />
                </div>
                <div>
                  <h4 className="text-xs font-bold truncate">
                    Er. Sahaya Antony Stalin
                  </h4>
                  <div className="flex items-center gap-1.5 text-[10px] text-emerald-400 font-mono">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span>Active Engineering Guide</span>
                  </div>
                </div>
              </div>

              {/* Language & Sound & Close Controls */}
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setLang((prev) => (prev === "en" ? "ta" : "en"))}
                  className="px-2 py-1 rounded-md text-[10px] font-bold bg-white/10 hover:bg-white/20 transition-all font-mono"
                  title="Toggle Language"
                >
                  {lang === "en" ? "தமிழ்" : "EN"}
                </button>

                <button
                  onClick={handleToggleVoice}
                  className={`p-1.5 rounded-md transition-all ${
                    isSpeaking
                      ? "bg-[#B88746] text-slate-950 animate-pulse"
                      : "text-slate-400 hover:text-white"
                  }`}
                  title={isSpeaking ? "Mute Voice" : "Play Voice Narration"}
                >
                  {isSpeaking ? (
                    <Volume2 className="w-3.5 h-3.5" />
                  ) : (
                    <VolumeX className="w-3.5 h-3.5" />
                  )}
                </button>

                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 text-slate-400 hover:text-white transition-colors"
                  title="Minimize"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Contextual Speech Box */}
            <div className="p-4 bg-[#FBF9F5] border-b border-slate-100">
              <div className="flex items-start gap-2.5">
                <Sparkles className="w-4 h-4 text-[#B88746] flex-shrink-0 mt-0.5" />
                <p className="text-xs text-slate-800 leading-relaxed font-medium">
                  {lang === "en" ? activeMessage.en : activeMessage.ta}
                </p>
              </div>
            </div>

            {/* Quick Action Navigation Grid */}
            <div className="p-3 bg-white space-y-1.5">
              <span className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-wider block px-1">
                {lang === "en" ? "Quick Engineering Actions" : "விரைவு இணைப்புகள்"}
              </span>

              <div className="grid grid-cols-2 gap-2 text-xs">
                {/* Cost Estimator */}
                <Link
                  href="/estimator"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-2 p-2 rounded-xl bg-slate-50 hover:bg-[#B88746]/10 text-slate-800 hover:text-[#8C5D24] transition-all border border-slate-200"
                >
                  <Calculator className="w-3.5 h-3.5 text-[#B88746]" />
                  <span className="font-semibold text-[11px]">Cost Estimator</span>
                </Link>

                {/* Construction Process */}
                <Link
                  href="/process"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-2 p-2 rounded-xl bg-slate-50 hover:bg-[#B88746]/10 text-slate-800 hover:text-[#8C5D24] transition-all border border-slate-200"
                >
                  <Building className="w-3.5 h-3.5 text-[#B88746]" />
                  <span className="font-semibold text-[11px]">6-Stage Process</span>
                </Link>

                {/* Projects Portfolio */}
                <Link
                  href="/projects"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-2 p-2 rounded-xl bg-slate-50 hover:bg-[#B88746]/10 text-slate-800 hover:text-[#8C5D24] transition-all border border-slate-200"
                >
                  <Compass className="w-3.5 h-3.5 text-[#B88746]" />
                  <span className="font-semibold text-[11px]">Real Projects</span>
                </Link>

                {/* Direct WhatsApp Consultation */}
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 p-2 rounded-xl bg-[#25D366]/10 hover:bg-[#25D366]/20 text-emerald-800 transition-all border border-[#25D366]/30"
                >
                  <MessageSquare className="w-3.5 h-3.5 text-[#25D366]" />
                  <span className="font-semibold text-[11px]">WhatsApp Er. Stalin</span>
                </a>
              </div>

              {/* Consultation Modal Trigger */}
              {onOpenQuote && (
                <button
                  onClick={() => {
                    setIsOpen(false);
                    onOpenQuote();
                  }}
                  className="w-full mt-2 py-2.5 px-4 rounded-xl bg-slate-950 hover:bg-slate-800 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-md"
                >
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#B88746]" />
                  <span>
                    {lang === "en" ? "Request Free Turnkey Quote" : "இலவச மதிப்பீடு கோரிக்கை"}
                  </span>
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Trigger Pill / Avatar Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen((prev) => !prev)}
        className="group relative flex items-center gap-2.5 bg-slate-950 hover:bg-slate-900 text-white pl-2.5 pr-4 py-2.5 rounded-full shadow-2xl border border-white/20 transition-all shadow-black/30"
        title="Open Civil Engineer Website Guide"
      >
        {/* Animated Avatar Circle */}
        <div className="relative w-8 h-8 rounded-full bg-[#B88746] flex items-center justify-center text-slate-950 font-bold overflow-hidden shadow-inner">
          <HardHat className="w-4 h-4 text-slate-950" />
          <span className="absolute top-0 right-0 w-2 h-2 rounded-full bg-emerald-400 border border-slate-950" />
        </div>

        {/* Text Label */}
        <div className="flex flex-col text-left">
          <span className="text-[11px] font-bold tracking-tight text-white flex items-center gap-1.5">
            <span>Engineer Guide</span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping hidden sm:inline-block" />
          </span>
          <span className="text-[9px] text-[#E8C59A] font-mono leading-none">
            Er. Stalin • Assist
          </span>
        </div>
      </motion.button>
    </div>
  );
}
