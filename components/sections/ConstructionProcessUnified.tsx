"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  MessageSquare,
  FileCheck,
  Compass,
  Layers,
  HardHat,
  Key,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Star,
  Sparkles,
  ShieldCheck,
  ArrowRight,
  Volume2,
  VolumeX,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { translations } from "@/lib/translations";

interface ConstructionProcessUnifiedProps {
  onOpenQuote?: () => void;
}

export default function ConstructionProcessUnified({ onOpenQuote }: ConstructionProcessUnifiedProps) {
  const { language, isTamil } = useLanguage();
  const t = translations[language];
  const [activeStageIdx, setActiveStageIdx] = useState(0);
  const [activeTestimonialIdx, setActiveTestimonialIdx] = useState(0);
  const [isSpeaking, setIsSpeaking] = useState(false);

  // The 6 exact canonical stages with bilingual content
  const processSteps = [
    {
      num: "01",
      name: "Consultation",
      nameTa: "ஆலோசனை & ஆய்வு",
      timeline: "Days 1 – 7",
      timelineTa: "1 முதல் 7 நாட்கள்",
      tagline: "Vision, Plot Survey & Concept",
      taglineTa: "எண்ணங்கள், நில ஆய்வு & திட்டம்",
      desc: "Plot boundary evaluation, topography check, and detailed requirements questionnaire conducted personally with Er. Sahaya Antony Stalin.",
      descTa: "தலைமைப் பொறியாளர் Er. சகாய அந்தோணி ஸ்டாலின் அவர்களுடன் நேரடி சந்திப்பு, நிலத்தின் அளவு மற்றும் மண் தரம் ஆய்வு, உங்கள் குடும்பத் தேவைகள் கேட்டறிதல்.",
      deliverables: [
        "On-site plot contour measurement",
        "Geotechnical soil feasibility assessment",
        "Client requirements & lifestyle brief",
        "Tentative turnkey budget outline",
      ],
      deliverablesTa: [
        "நிலத்தின் துல்லிய எல்லை மற்றும் மட்ட ஆய்வு",
        "மண் தன்மையின் ஆரம்ப கட்ட சரிபார்ப்பு",
        "குடும்ப வாழ்க்கை முறைக்கு ஏற்ப தேவைகள் பட்டியல்",
        "தோராயமான கட்டுமான பட்ஜெட் அறிக்கை",
      ],
      icon: MessageSquare,
      image: "/images/fb-projects/fb-2866252757935105/image_001.jpg",
    },
    {
      num: "02",
      name: "Planning",
      nameTa: "வரைபடம் & அனுமதி",
      timeline: "Days 8 – 21",
      timelineTa: "8 முதல் 21 நாட்கள்",
      tagline: "Soil SBC, Vastu & Sanctions",
      taglineTa: "மண் பரிசோதனை, வாஸ்து & அனுமதி",
      desc: "Comprehensive safe bearing capacity (SBC) laboratory testing, traditional Vastu Shastra orientation, and municipal permit preparation.",
      descTa: "அரசு சான்றளிக்கப்பட்ட ஆய்வகத்தில் மண் சுமைத் திறன் (SBC) பரிசோதனை, சரியான வாஸ்து அமைப்புடன் கூடிய பிளான் தயாரிப்பு, பஞ்சாயத்து / DTCP அனுமதி பெறுதல்.",
      deliverables: [
        "NABL certified soil SBC test report",
        "Complete Vastu compliant floor schematics",
        "Local panchayat / DTCP sanction filings",
        "Fixed-price itemized BOQ agreement",
      ],
      deliverablesTa: [
        "NABL சான்றளிக்கப்பட்ட மண் பரிசோதனை அறிக்கை",
        "முழுமையான வாஸ்து முறைப்படி அமைக்கப்பட்ட வரைபடம்",
        "ஊராட்சி / நகராட்சி அனுமதி விண்ணப்ப ஆவணங்கள்",
        "பொருட்கள் மற்றும் விலைப் பட்டியல் (BOQ) ஒப்பந்தம்",
      ],
      icon: FileCheck,
      image: "/images/fb-projects/fb-2866252757935105/image_002.jpg",
    },
    {
      num: "03",
      name: "Design",
      nameTa: "3D வடிவமைப்பு",
      timeline: "Days 22 – 35",
      timelineTa: "22 முதல் 35 நாட்கள்",
      tagline: "3D Elevations & Structural Drawings",
      taglineTa: "3D வெளித்தோற்றம் & கட்டுமான வரைபடம்",
      desc: "Photorealistic 3D exterior renderings, structural column-beam drawings, electrical schematics, and plumbing designs.",
      descTa: "வீடு கட்டி முடித்தால் எப்படி இருக்கும் என்பதை காட்டும் அசல் 3D வண்ண வரைபடம், தூண்கள் மற்றும் பீம்களுக்கான துல்லிய பொறியியல் கணக்கீடுகள்.",
      deliverables: [
        "High-definition 3D day/night elevations",
        "Structural RCC working drawings (IS 456)",
        "Plumbing & electrical layout schematics",
        "Material brand lock & finish catalog",
      ],
      deliverablesTa: [
        "பகல் மற்றும் இரவு நேர உயர்தர 3D வண்ண வரைபடங்கள்",
        "IS 456 இந்திய தர விதிமுறைப்படி தூண் & பீம் வரைபடம்",
        "குடிநீர், கழிவுநீர் & மின்சார வழித்தட வரைபடம்",
        "பயன்படுத்தப்படும் பிராண்டட் பொருட்களின் பட்டியல்",
      ],
      icon: Compass,
      image: "/images/fb-projects/fb-4017946504755476/image_001.jpg",
    },
    {
      num: "04",
      name: "Foundation",
      nameTa: "அடித்தளம்",
      timeline: "Months 2 – 3",
      timelineTa: "2 முதல் 3 மாதங்கள்",
      tagline: "Earthwork, Footings & Plinth Beams",
      taglineTa: "குழி தோண்டுதல், கான்கிரீட் & பீம்",
      desc: "Precision hydraulic excavation, PCC bed casting, anti-termite chemical soil shielding, and reinforced column footings with plinth tie-beams.",
      descTa: "பூமி பூஜை முடிந்து உறுதியான பாறை அடுக்கு வரை பள்ளம் தோண்டுதல், கரையான் தடுப்பு மருந்து தெளித்தல், உறுதியான M25 கான்கிரீட் பில்லர் மற்றும் பேஸ்மென்ட் பீம் அமைத்தல்.",
      deliverables: [
        "Heavy hydraulic excavation to hard strata",
        "Anti-termite subterranean barrier",
        "M25 grade isolated column footings",
        "Damp-proof course (DPC) & plinth beams",
      ],
      deliverablesTa: [
        "கடின பாறை தரைப்பகுதி வரை மெஷின் மூலம் குழி தோண்டுதல்",
        "அடித்தளத்தில் நீண்டகால கரையான் தடுப்பு மருந்து பூச்சு",
        "M25 கிரேடு ரெடிமிக்ஸ் கான்கிரீட் பில்லர் அமைத்தல்",
        "ஈரப்பதம் ஏறாமல் தடுக்கும் DPC பெல்ட் மற்றும் பேஸ்மென்ட்",
      ],
      icon: Layers,
      image: "/images/fb-projects/fb-1473695047740194/image_001.jpg",
    },
    {
      num: "05",
      name: "Construction",
      nameTa: "சுவர்கள் & தளம்",
      timeline: "Months 4 – 7",
      timelineTa: "4 முதல் 7 மாதங்கள்",
      tagline: "Porotherm Walls & Roof Slab Casting",
      taglineTa: "போரோதெர்ம் செங்கற்கள் & கூரை கான்கிரீட்",
      desc: "Superstructure execution using Wienerberger Porotherm eco-thermal hollow clay bricks, Fe550D rebar cages, and mechanized boom-placer concrete pouring.",
      descTa: "வீட்டை இயற்கையாகவே குளிர்ச்சியாக வைக்கும் வீனர்பெர்கர் போரோதெர்ம் களிமண் செங்கற்கள், Fe 550D தர சான்றிதழ் பெற்ற இரும்பு கம்பிகள், பம்ப் மூலம் தளம் போடுதல்.",
      deliverables: [
        "Wienerberger Porotherm thermal masonry",
        "Mechanized boom pump concrete placement",
        "Continuous 28-day water ponding curing",
        "Concealed electrical & plumbing rough-ins",
      ],
      deliverablesTa: [
        "அறை வெப்பநிலையைக் குறைக்கும் போரோதெர்ம் செங்கல் சுவர்",
        "கான்கிரீட் பூம் பிளேசர் மூலம் தரமான தளம் அமைத்தல்",
        "தொடர்ச்சியாக 28 நாட்கள் நீர் தேக்கி பக்குவப்படுத்துதல்",
        "சுவருக்குள் மறைமுக பிளம்பிங் மற்றும் வயரிங் குழாய்கள்",
      ],
      icon: HardHat,
      image: "/images/fb-projects/fb-2593310028926711/image_001.jpg",
    },
    {
      num: "06",
      name: "Handover",
      nameTa: "பினிஷிங் & சாவி",
      timeline: "Month 8",
      timelineTa: "8-வது மாதம்",
      tagline: "150-Point Snag Audit & Key Delivery",
      taglineTa: "150 தரப் பரிசோதனை & சாவி ஒப்படைப்பு",
      desc: "Rigorous quality audits, 15-Bar plumbing pressure testing, multi-coat waterproofing flood checks, and ceremonial key delivery with warranties.",
      descTa: "டைல்ஸ், பெயிண்ட், எலக்ட்ரிக்கல், பிளம்பிங் பரிசோதனை, மொட்டை மாடி நீர் கசிவு சோதனை, மற்றும் சான்றிதழ்களுடன் கூடிய மங்களகரமான சாவி ஒப்படைப்பு.",
      deliverables: [
        "150-point architectural finishing audit",
        "15-Bar hydrostatic pipe pressure check",
        "15-year structural warranty documentation",
        "Ceremonial key handover & puja ceremony",
      ],
      deliverablesTa: [
        "150 அம்சங்கள் கொண்ட முழுமையான கட்டிட தரப் பரிசோதனை",
        "15 பார் பிரஷர் சோதனை மூலம் பைப் கசிவு இல்லை என உறுதி",
        "15 ஆண்டுகள் கட்டுமான உத்தரவாத ஆவணங்கள்",
        "மங்களகரமான புதுமனை புகுவிழா சாவி ஒப்படைப்பு",
      ],
      icon: Key,
      image: "/images/fb-projects/fb-2996642819924777/image_001.jpg",
    },
  ];

  const handleToggleSpeak = () => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }
    window.speechSynthesis.cancel();
    const activeStep = processSteps[activeStageIdx];
    const textToSpeak = isTamil
      ? `${activeStep.nameTa}. ${activeStep.taglineTa}. ${activeStep.descTa}`
      : `${activeStep.name}. ${activeStep.tagline}. ${activeStep.desc}`;

    const utterance = new SpeechSynthesisUtterance(textToSpeak);
    utterance.lang = isTamil ? "ta-IN" : "en-IN";
    utterance.rate = 0.95;
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);
    setIsSpeaking(true);
    window.speechSynthesis.speak(utterance);
  };

  // Authentic client testimonials
  const testimonials = [
    {
      id: 1,
      quote:
        "Jancy Builders completed our family residence in Silathikulam on the promised date without a single rupee of cost escalation. Er. Stalin ensured superior plastering, teakwood doors, and uncompromising structural strength.",
      author: "Mr. S. Murugan",
      location: "Silathikulam Handover",
      project: "Turnkey Duplex Villa",
      initials: "SM",
      rating: 5,
    },
    {
      id: 2,
      quote:
        "The choice of Wienerberger Porotherm clay bricks recommended by Chief Engineer Stalin was exceptional. The house stays naturally cool even during peak summer months in Tirunelveli.",
      author: "Mr. Srinivas",
      location: "Samugarengapuram",
      project: "Eco-Thermal Villa",
      initials: "SR",
      rating: 5,
    },
    {
      id: 3,
      quote:
        "Watching the concrete boom placer cast our roof slab with complete laser leveling gave our family 100% confidence. Their transparency, daily WhatsApp logs, and engineering rigor are unmatched.",
      author: "Mr. Praveen & Naveen",
      location: "Durainagar Site",
      project: "Contemporary Duplex",
      initials: "PN",
      rating: 5,
    },
  ];

  const currentStep = processSteps[activeStageIdx];
  const currentTestimonial = testimonials[activeTestimonialIdx];

  const handlePrevTestimonial = () => {
    setActiveTestimonialIdx((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const handleNextTestimonial = () => {
    setActiveTestimonialIdx((prev) => (prev + 1) % testimonials.length);
  };

  return (
    <section
      id="process"
      className="py-20 lg:py-28 bg-[#17191B] text-white relative overflow-hidden border-t border-[#E2D9CC]/15 scroll-mt-24"
    >
      {/* Ambient Bronze Glow */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-[#B78A52]/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 left-0 w-96 h-96 bg-[#B78A52]/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 mb-3 px-3.5 py-1.5 rounded-full bg-[#B78A52]/15 border border-[#B78A52]/30">
            <span className="w-2 h-2 rounded-full bg-[#B78A52] animate-pulse" />
            <span className="text-[11px] font-mono font-bold uppercase tracking-[0.25em] text-[#B78A52]">
              {t.process.badge}
            </span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight font-sans">
            {t.process.title}
          </h2>

          <p className="mt-3 text-sm sm:text-base text-[#A5A5A2] max-w-2xl mx-auto leading-relaxed">
            {t.process.subtitle}
          </p>

          {/* Audio narration button */}
          <div className="mt-5 flex items-center justify-center">
            <button
              onClick={handleToggleSpeak}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#B78A52]/20 hover:bg-[#B78A52]/30 text-[#E7C188] border border-[#B78A52]/40 text-xs font-bold transition-all shadow-md active:scale-95"
            >
              {isSpeaking ? (
                <>
                  <VolumeX className="w-4 h-4 text-red-400 animate-pulse" />
                  <span>{isTamil ? "பேசுகிறது... (நிறுத்த தட்டவும்)" : "Speaking... (Tap to stop)"}</span>
                </>
              ) : (
                <>
                  <Volume2 className="w-4 h-4 text-[#B78A52]" />
                  <span>{isTamil ? "🔊 கேட்டுத் தெரிந்துகொள்ளுங்கள்" : "🔊 Listen to Explanation"}</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Desktop 6-Stage Timeline Bar */}
        <div className="hidden lg:grid lg:grid-cols-6 gap-3 mb-12 relative">
          <div className="absolute top-6 left-10 right-10 h-[2px] bg-white/10 z-0 pointer-events-none" />

          {processSteps.map((step, idx) => {
            const Icon = step.icon;
            const isActive = activeStageIdx === idx;
            return (
              <button
                key={step.num}
                onClick={() => {
                  setActiveStageIdx(idx);
                  if (isSpeaking && typeof window !== "undefined") {
                    window.speechSynthesis?.cancel();
                    setIsSpeaking(false);
                  }
                }}
                className={`relative z-10 flex flex-col items-center text-center p-3.5 rounded-2xl transition-all duration-300 ${
                  isActive
                    ? "bg-[#1F2226] border-2 border-[#B78A52] shadow-xl shadow-black/40 -translate-y-1"
                    : "bg-[#17191B]/80 hover:bg-[#1F2226] border border-white/10 text-[#A5A5A2]"
                }`}
              >
                <div
                  className={`w-11 h-11 rounded-full flex items-center justify-center mb-2.5 transition-colors ${
                    isActive
                      ? "bg-[#B78A52] text-[#17191B] font-bold shadow-md shadow-[#B78A52]/30"
                      : "bg-[#1F2226] text-[#A5A5A2] border border-white/10"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-mono font-bold text-[#B78A52] tracking-wider uppercase">
                  {isTamil ? "நிலை" : "STAGE"} {step.num}
                </span>
                <span className="text-xs font-bold text-white mt-0.5">
                  {isTamil ? step.nameTa : step.name}
                </span>
                <span className="text-[10px] font-mono text-slate-400 mt-0.5">
                  {isTamil ? step.timelineTa : step.timeline}
                </span>
              </button>
            );
          })}
        </div>

        {/* Mobile Stage Selector Pills */}
        <div className="flex lg:hidden items-center gap-2 overflow-x-auto pb-4 mb-6 scrollbar-none">
          {processSteps.map((step, idx) => {
            const isActive = activeStageIdx === idx;
            return (
              <button
                key={step.num}
                onClick={() => {
                  setActiveStageIdx(idx);
                  if (isSpeaking && typeof window !== "undefined") {
                    window.speechSynthesis?.cancel();
                    setIsSpeaking(false);
                  }
                }}
                className={`px-4 py-2 rounded-full text-xs font-bold transition-all whitespace-nowrap flex items-center gap-1.5 ${
                  isActive
                    ? "bg-[#B78A52] text-[#17191B] shadow-md"
                    : "bg-[#1F2226] text-[#A5A5A2] border border-white/10"
                }`}
              >
                <span>{step.num}</span>
                <span>{isTamil ? step.nameTa : step.name}</span>
              </button>
            );
          })}
        </div>

        {/* Active Stage Detailed Showcase Card */}
        <div className="rounded-3xl bg-[#1F2226] border border-white/10 p-6 sm:p-10 shadow-2xl mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Column: Details */}
            <div className="lg:col-span-7 space-y-5">
              <div className="flex items-center gap-3">
                <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-[#B78A52]/20 border border-[#B78A52]/40 text-[#B78A52]">
                  {isTamil ? `நிலை ${currentStep.num} / 06` : `STAGE ${currentStep.num} OF 06`}
                </span>
                <span className="text-xs font-mono text-slate-400">
                  {isTamil ? currentStep.timelineTa : currentStep.timeline}
                </span>
              </div>

              <div>
                <h3 className="text-2xl sm:text-3xl font-black text-white font-sans tracking-tight">
                  {isTamil ? currentStep.nameTa : currentStep.name}: {isTamil ? currentStep.taglineTa : currentStep.tagline}
                </h3>
                <p className="mt-2 text-sm text-[#A5A5A2] leading-relaxed">
                  {isTamil ? currentStep.descTa : currentStep.desc}
                </p>
              </div>

              {/* Deliverables Checklist */}
              <div className="pt-2 space-y-2.5">
                <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#B78A52] block">
                  {isTamil ? "முக்கிய பலன்கள் & தர சோதனைகள்:" : "KEY DELIVERABLES & COMPLIANCE:"}
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
                  {(isTamil ? currentStep.deliverablesTa : currentStep.deliverables).map((item, i) => (
                    <div key={i} className="flex items-start gap-2 text-slate-200">
                      <div className="w-4 h-4 rounded-full bg-[#B78A52]/20 text-[#B78A52] flex items-center justify-center flex-shrink-0 mt-0.5">
                        <CheckCircle2 className="w-3 h-3 stroke-[3]" />
                      </div>
                      <span className="leading-tight">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Stage Stepper Buttons */}
              <div className="pt-4 flex items-center gap-3">
                <button
                  disabled={activeStageIdx === 0}
                  onClick={() => {
                    setActiveStageIdx((prev) => Math.max(0, prev - 1));
                    if (isSpeaking && typeof window !== "undefined") {
                      window.speechSynthesis?.cancel();
                      setIsSpeaking(false);
                    }
                  }}
                  className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-white text-xs font-semibold disabled:opacity-40 transition-all border border-white/10"
                >
                  {isTamil ? "← முந்தைய நிலை" : "← Previous Stage"}
                </button>
                <button
                  disabled={activeStageIdx === processSteps.length - 1}
                  onClick={() => {
                    setActiveStageIdx((prev) => Math.min(processSteps.length - 1, prev + 1));
                    if (isSpeaking && typeof window !== "undefined") {
                      window.speechSynthesis?.cancel();
                      setIsSpeaking(false);
                    }
                  }}
                  className="px-5 py-2 rounded-xl bg-[#B78A52] hover:bg-[#a37742] text-slate-950 text-xs font-bold disabled:opacity-40 transition-all shadow-md flex items-center gap-1.5"
                >
                  <span>{isTamil ? "அடுத்த நிலை" : "Next Stage"}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Right Column: Authentic Site Photograph */}
            <div className="lg:col-span-5 relative aspect-[4/3] rounded-2xl overflow-hidden border border-white/15 shadow-xl bg-[#17191B]">
              <Image
                src={currentStep.image}
                alt={currentStep.name}
                fill
                className="object-cover transition-transform duration-700 hover:scale-105"
                sizes="(max-width: 1024px) 100vw, 40vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-3 left-3 right-3 text-left">
                <span className="text-[10px] font-mono text-[#B78A52] uppercase tracking-wider block">
                  AUTHENTIC DOCUMENTATION
                </span>
                <span className="text-xs text-white font-medium line-clamp-1">
                  Jancy Builders Verified Work Site • Tirunelveli District
                </span>
              </div>
            </div>

          </div>
        </div>

        {/* Real Client Testimonials Strip */}
        <div className="rounded-3xl bg-[#131517] border border-white/10 p-6 sm:p-10 shadow-xl">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-white/10">
            <div>
              <div className="flex items-center gap-1 mb-1 text-[#B78A52]">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
                <span className="text-xs font-mono font-bold text-white ml-2">5.0 / 5.0</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-white font-sans">
                Verified Client Testimonials
              </h3>
              <p className="text-xs text-[#A5A5A2] mt-0.5">
                Genuine feedback from homeowners across Tirunelveli district.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handlePrevTestimonial}
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors border border-white/10"
                aria-label="Previous Testimonial"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={handleNextTestimonial}
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors border border-white/10"
                aria-label="Next Testimonial"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="pt-6">
            <blockquote className="text-base sm:text-lg text-slate-200 italic font-serif leading-relaxed">
              &ldquo;{currentTestimonial.quote}&rdquo;
            </blockquote>

            <div className="mt-5 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#B78A52] text-slate-950 font-bold flex items-center justify-center text-xs">
                {currentTestimonial.initials}
              </div>
              <div>
                <h4 className="text-sm font-bold text-white leading-tight">
                  {currentTestimonial.author}
                </h4>
                <p className="text-xs text-[#B78A52] font-mono leading-tight mt-0.5">
                  {currentTestimonial.project} • {currentTestimonial.location}
                </p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
