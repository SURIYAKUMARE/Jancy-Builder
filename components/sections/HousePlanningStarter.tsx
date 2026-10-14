"use client";

import React, { useState } from "react";
import {
  Compass,
  MapPin,
  Home,
  IndianRupee,
  Calendar,
  CheckCircle2,
  ArrowRight,
  RotateCcw,
  MessageCircle,
  HelpCircle,
  Sparkles,
  PhoneCall,
  Check,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { trackEvent } from "@/lib/analytics";

interface HousePlanningStarterProps {
  onOpenQuote?: () => void;
}

export default function HousePlanningStarter({ onOpenQuote }: HousePlanningStarterProps) {
  const { isTamil } = useLanguage();

  const [step, setStep] = useState<number>(1);
  const [hasLand, setHasLand] = useState<string>("yes");
  const [location, setLocation] = useState<string>("");
  const [houseType, setHouseType] = useState<string>("single");
  const [budgetRange, setBudgetRange] = useState<string>("35_60");
  const [timeline, setTimeline] = useState<string>("3_months");

  const houseTypes = [
    {
      id: "single",
      titleEn: "Single Floor House",
      titleTa: "ஒரு மாடி வீடு",
      descEn: "Ground floor only (Approx. 800 - 1,500 sq.ft)",
      descTa: "தரைத் தளம் மட்டும் (சுமார் 800 - 1,500 ச.அடி)",
      icon: "🏡",
    },
    {
      id: "ground_first",
      titleEn: "Ground + 1st Floor (G+1)",
      titleTa: "தரைத் தளம் + முதல் தளம்",
      descEn: "Spacious 2-level home for growing families",
      descTa: "குடும்பத்திற்கான விசாலமான இரண்டு அடுக்கு இல்லம்",
      icon: "🏢",
    },
    {
      id: "duplex",
      titleEn: "Luxury Duplex House",
      titleTa: "டூப்ளக்ஸ் வீடு",
      descEn: "Double height ceiling, contemporary architecture",
      descTa: "உயரமான கூரை மற்றும் நவீன வடிவமைப்பு",
      icon: "✨",
    },
    {
      id: "not_sure",
      titleEn: "Not Sure Yet / Need Advice",
      titleTa: "இன்னும் முடிவு செய்யவில்லை",
      descEn: "Our engineer will evaluate your plot & recommend",
      descTa: "உங்கள் நிலத்தை பார்த்து பொறியாளர் ஆலோசனை தருவார்",
      icon: "📐",
    },
  ];

  const budgetOptions = [
    { id: "under_35", labelEn: "Under ₹35 Lakhs", labelTa: "₹35 லட்சத்திற்குள்", noteEn: "Compact starter home (approx. 1,000–1,300 sq.ft)", noteTa: "அத்தியாவசிய குடும்ப வீடு (சுமார் 1,000–1,300 ச.அடி)" },
    { id: "35_60", labelEn: "₹35 Lakhs – ₹60 Lakhs", labelTa: "₹35 லட்சம் முதல் ₹60 லட்சம் வரை", noteEn: "Popular 3BHK turnkey villa (approx. 1,400–2,000 sq.ft)", noteTa: "பிரபலமான 3BHK தனி வீடு (சுமார் 1,400–2,000 ச.அடி)" },
    { id: "60_100", labelEn: "₹60 Lakhs – ₹1 Crore", labelTa: "₹60 லட்சம் முதல் ₹1 கோடி வரை", noteEn: "Spacious 4BHK with Porotherm eco-thermal brickwork", noteTa: "போரோதெர்ம் குளுமை செங்கற்கள் கொண்ட பெரிய இல்லம்" },
    { id: "above_100", labelEn: "Above ₹1 Crore", labelTa: "₹1 கோடிக்கு மேல்", noteEn: "Custom luxury architectural villa with Italian marble", noteTa: "இத்தாலியன் மார்பிள் மற்றும் நவீன ஆடம்பர பங்களா" },
  ];

  const timelineOptions = [
    { id: "immediate", labelEn: "Immediately (This Month)", labelTa: "உடனடியாக (இந்த மாதமே)" },
    { id: "3_months", labelEn: "Within 3 Months", labelTa: "3 மாதங்களுக்குள்" },
    { id: "6_months", labelEn: "Within 6 Months", labelTa: "6 மாதங்களுக்குள்" },
    { id: "exploring", labelEn: "Just Exploring Ideas", labelTa: "இப்போதைக்கு பார்க்க மட்டும்" },
  ];

  // Helper for generating custom WhatsApp message
  const handleSendWhatsAppSummary = () => {
    trackEvent("boq_whatsapp_click", { source: "house_planning_starter" });

    const landText =
      hasLand === "yes"
        ? (isTamil ? "நிலம் உள்ளது" : "Own Land Available")
        : hasLand === "planning"
        ? (isTamil ? "நிலம் வாங்கப் போகிறேன்" : "Planning to buy land")
        : (isTamil ? "நிலம் இல்லை" : "No land yet");

    const selectedHouseObj = houseTypes.find((h) => h.id === houseType);
    const houseText = isTamil ? selectedHouseObj?.titleTa : selectedHouseObj?.titleEn;

    const selectedBudgetObj = budgetOptions.find((b) => b.id === budgetRange);
    const budgetText = isTamil ? selectedBudgetObj?.labelTa : selectedBudgetObj?.labelEn;

    const selectedTimelineObj = timelineOptions.find((t) => t.id === timeline);
    const timelineText = isTamil ? selectedTimelineObj?.labelTa : selectedTimelineObj?.labelEn;

    const message = isTamil
      ? `வணக்கம் Er. ஸ்டாலின்,
நான் ஜான்சி பில்டர்ஸ் இணையதளத்தில் "வீட்டைத் திட்டமிடுவோம்" வழிகாட்டியைப் பயன்படுத்தினேன்.

📋 என் திட்ட விவரங்கள்:
• நில நிலை: ${landText}
• ஊர் / இடம்: ${location || "திருநெல்வேலி / சாமுகரெங்கபுரம்"}
• வீட்டின் வகை: ${houseText}
• உத்தேச பட்ஜெட்: ${budgetText}
• தொடங்க விரும்பும் காலம்: ${timelineText}

அடுத்த கட்டமாக என் திட்டத்திற்கு வரைபடம் மற்றும் வழிகாட்டல் தர முடியுமா?`
      : `Hello Er. Sahaya Antony Stalin,
I used the "Let's Plan Your House" starter tool on the Jancy Builders website.

📋 My Project Details:
• Land Status: ${landText}
• Location: ${location || "Tirunelveli / Samugarengapuram"}
• House Type: ${houseText}
• Budget Range: ${budgetText}
• Start Timeline: ${timelineText}

Could you please advise on the next steps and architectural planning for my plot?`;

    window.open(`https://wa.me/917708247124?text=${encodeURIComponent(message)}`, "_blank");
  };

  return (
    <section id="starter" className="py-20 lg:py-28 bg-[#F8F6F1] text-[#202124] relative overflow-hidden border-t border-[#E2D9CC] scroll-mt-24">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 mb-3 px-3.5 py-1.5 rounded-full bg-[#B78A52]/10 border border-[#B78A52]/30">
            <span className="w-2 h-2 rounded-full bg-[#B78A52] animate-pulse" />
            <span className="text-[11px] font-mono font-bold uppercase tracking-[0.25em] text-[#B78A52]">
              {isTamil ? "முதன்முறை வீடு கட்டுவோருக்கான எளிய வழிகாட்டி" : "FIRST-TIME HOMEOWNER STARTER"}
            </span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black text-[#17191B] tracking-tight font-sans">
            {isTamil ? "உங்கள் வீட்டைத் திட்டமிடுவோம்" : "Let's Plan Your House"}
          </h2>

          <p className="mt-3 text-sm sm:text-base text-[#55585D] max-w-2xl mx-auto leading-relaxed">
            {isTamil
              ? "வீடு கட்ட எங்கு தொடங்குவது என்று தெரியவில்லையா? இந்த 5 எளிய கேள்விகளுக்கு பதிலளியுங்கள், நீங்கள் என்ன செய்ய வேண்டும் என்பதை தெளிவாக விளக்குகிறோம்."
              : "Not sure where to begin? Answer 5 simple questions to get your personalized roadmap, estimated costs, and required documents."}
          </p>
        </div>

        {/* Wizard Container */}
        <div className="max-w-3xl mx-auto rounded-3xl bg-white border border-[#E2D9CC] shadow-xl overflow-hidden p-6 sm:p-10">
          
          {/* Progress Indicator */}
          <div className="mb-8">
            <div className="flex items-center justify-between text-xs font-mono font-bold mb-2">
              <span className="text-[#B78A52] uppercase tracking-wider">
                {isTamil ? `படி ${step} / 5` : `Step ${step} of 5`}
              </span>
              <span className="text-slate-400">
                {step === 6 ? (isTamil ? "முடிவு தயார்" : "Complete") : `${Math.round((step / 5) * 100)}%`}
              </span>
            </div>
            <div className="w-full h-2 bg-[#F8F6F1] rounded-full overflow-hidden border border-[#E2D9CC]">
              <div
                className="h-full bg-[#B78A52] transition-all duration-300"
                style={{ width: `${Math.min(100, (step / 5) * 100)}%` }}
              />
            </div>
          </div>

          {/* Step 1: Land Ownership */}
          {step === 1 && (
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-[#17191B]">
                  {isTamil ? "1. உங்களிடம் ஏற்கனவே நிலம் இருக்கிறதா?" : "1. Do you already own land?"}
                </h3>
                <p className="text-xs text-[#55585D] mt-1">
                  {isTamil
                    ? "நிலத்தின் நிலையை அடிப்படையாக வைத்து அடுத்த கட்ட முடிவுகளை எடுக்கலாம்."
                    : "Knowing whether you have a plot helps us advise on surveying, approvals, and timeline."}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  { id: "yes", icon: "🏡", titleEn: "Yes, I Have Land", titleTa: "ஆம், என்னிடம் நிலம் உள்ளது" },
                  { id: "planning", icon: "📍", titleEn: "Planning to Buy", titleTa: "வாங்கப் போகிறேன்" },
                  { id: "no", icon: "🔍", titleEn: "No Land Yet", titleTa: "இல்லை, நிலம் இல்லை" },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setHasLand(item.id)}
                    className={`p-5 rounded-2xl border text-center transition-all ${
                      hasLand === item.id
                        ? "bg-[#B78A52]/10 border-[#B78A52] shadow-sm text-[#17191B]"
                        : "bg-white border-[#E2D9CC] hover:bg-slate-50 text-slate-700"
                    }`}
                  >
                    <span className="text-3xl block mb-2">{item.icon}</span>
                    <span className="font-bold text-sm block">
                      {isTamil ? item.titleTa : item.titleEn}
                    </span>
                  </button>
                ))}
              </div>

              <div className="pt-4 flex justify-end">
                <button
                  onClick={() => setStep(2)}
                  className="px-6 py-3 rounded-full bg-[#17191B] hover:bg-[#25282B] text-white font-bold text-xs uppercase tracking-wider flex items-center gap-2 transition-all shadow-md"
                >
                  <span>{isTamil ? "அடுத்த கேள்வி" : "Next Question"}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          )}

          {/* Step 2: Location */}
          {step === 2 && (
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-[#17191B]">
                  {isTamil ? "2. எந்த ஊரில் வீடு கட்டப் போகிறீர்கள்?" : "2. Where do you want to build?"}
                </h3>
                <p className="text-xs text-[#55585D] mt-1">
                  {isTamil
                    ? "திருநெல்வேலி, சாமுகரெங்கபுரம், வள்ளியூர் அல்லது சுற்றியுள்ள பகுதிகள்."
                    : "Enter your village, town, or area in Tirunelveli district."}
                </p>
              </div>

              <div>
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder={isTamil ? "எ.கா: சாமுகரெங்கபுரம் / வள்ளியூர் / திருநெல்வேலி" : "e.g. Samugarengapuram, Valliyur, Tirunelveli"}
                  className="w-full px-4 py-3.5 rounded-2xl bg-[#F8F6F1] border border-[#E2D9CC] text-sm text-[#202124] focus:outline-none focus:border-[#B78A52] focus:bg-white transition-all"
                />

                {/* Quick Area Suggestions */}
                <div className="flex items-center gap-2 flex-wrap mt-3">
                  <span className="text-[11px] font-mono text-slate-400">
                    {isTamil ? "பொதுவான பகுதிகள்:" : "Quick select:"}
                  </span>
                  {["Samugarengapuram", "Valliyur", "Tirunelveli", "Durainagar", "Silathikulam"].map((loc) => (
                    <button
                      key={loc}
                      type="button"
                      onClick={() => setLocation(loc)}
                      className="px-3 py-1 rounded-full text-xs bg-slate-100 hover:bg-[#B78A52]/10 hover:text-[#B78A52] text-slate-600 transition-colors"
                    >
                      {loc}
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-4 flex justify-between items-center">
                <button
                  onClick={() => setStep(1)}
                  className="px-5 py-2.5 rounded-full border border-slate-200 text-slate-600 font-semibold text-xs hover:bg-slate-50 transition-all"
                >
                  {isTamil ? "முந்தைய படி" : "Back"}
                </button>
                <button
                  onClick={() => setStep(3)}
                  className="px-6 py-3 rounded-full bg-[#17191B] hover:bg-[#25282B] text-white font-bold text-xs uppercase tracking-wider flex items-center gap-2 transition-all shadow-md"
                >
                  <span>{isTamil ? "அடுத்த கேள்வி" : "Next Question"}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          )}

          {/* Step 3: House Type */}
          {step === 3 && (
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-[#17191B]">
                  {isTamil ? "3. எந்த மாதிரியான வீடு வேண்டும்?" : "3. What type of house do you want?"}
                </h3>
                <p className="text-xs text-[#55585D] mt-1">
                  {isTamil
                    ? "உங்கள் குடும்பத் தேவைக்கேற்ப சிறந்த வகையைத் தேர்ந்தெடுக்கவும்."
                    : "Select a configuration that fits your family's needs and lifestyle."}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {houseTypes.map((type) => (
                  <button
                    key={type.id}
                    onClick={() => setHouseType(type.id)}
                    className={`p-4 rounded-2xl border text-left transition-all flex items-start gap-3 ${
                      houseType === type.id
                        ? "bg-[#B78A52]/10 border-[#B78A52] shadow-sm"
                        : "bg-white border-[#E2D9CC] hover:bg-slate-50"
                    }`}
                  >
                    <span className="text-2xl">{type.icon}</span>
                    <div>
                      <h4 className="text-sm font-bold text-[#17191B]">
                        {isTamil ? type.titleTa : type.titleEn}
                      </h4>
                      <p className="text-xs text-slate-500 mt-0.5">
                        {isTamil ? type.descTa : type.descEn}
                      </p>
                    </div>
                  </button>
                ))}
              </div>

              <div className="pt-4 flex justify-between items-center">
                <button
                  onClick={() => setStep(2)}
                  className="px-5 py-2.5 rounded-full border border-slate-200 text-slate-600 font-semibold text-xs hover:bg-slate-50 transition-all"
                >
                  {isTamil ? "முந்தைய படி" : "Back"}
                </button>
                <button
                  onClick={() => setStep(4)}
                  className="px-6 py-3 rounded-full bg-[#17191B] hover:bg-[#25282B] text-white font-bold text-xs uppercase tracking-wider flex items-center gap-2 transition-all shadow-md"
                >
                  <span>{isTamil ? "அடுத்த கேள்வி" : "Next Question"}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          )}

          {/* Step 4: Budget Range */}
          {step === 4 && (
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-[#17191B]">
                  {isTamil ? "4. உங்கள் வீட்டிற்கான தோராயமான பட்ஜெட் எவ்வளவு?" : "4. What is your approximate budget?"}
                </h3>
                <p className="text-xs text-[#55585D] mt-1">
                  {isTamil
                    ? "பட்ஜெட் என்பது உத்தேசமானது மட்டுமே. உங்கள் அளவுக்கு ஏற்ப துல்லியமாக மாற்றிக்கொள்ளலாம்."
                    : "This gives us a sense of scale so we can suggest the right materials without overspending."}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {budgetOptions.map((b) => (
                  <button
                    key={b.id}
                    onClick={() => setBudgetRange(b.id)}
                    className={`p-4 rounded-2xl border text-left transition-all ${
                      budgetRange === b.id
                        ? "bg-[#B78A52]/10 border-[#B78A52] shadow-sm text-[#17191B]"
                        : "bg-white border-[#E2D9CC] hover:bg-slate-50"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-bold text-sm text-[#17191B]">
                        {isTamil ? b.labelTa : b.labelEn}
                      </span>
                      {budgetRange === b.id && <Check className="w-4 h-4 text-[#B78A52] stroke-[3]" />}
                    </div>
                    <p className="text-xs text-slate-500">
                      {isTamil ? b.noteTa : b.noteEn}
                    </p>
                  </button>
                ))}
              </div>

              <div className="pt-4 flex justify-between items-center">
                <button
                  onClick={() => setStep(3)}
                  className="px-5 py-2.5 rounded-full border border-slate-200 text-slate-600 font-semibold text-xs hover:bg-slate-50 transition-all"
                >
                  {isTamil ? "முந்தைய படி" : "Back"}
                </button>
                <button
                  onClick={() => setStep(5)}
                  className="px-6 py-3 rounded-full bg-[#17191B] hover:bg-[#25282B] text-white font-bold text-xs uppercase tracking-wider flex items-center gap-2 transition-all shadow-md"
                >
                  <span>{isTamil ? "அடுத்த கேள்வி" : "Next Question"}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          )}

          {/* Step 5: Timeline */}
          {step === 5 && (
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-[#17191B]">
                  {isTamil ? "5. எப்போது கட்டுமானத்தைத் தொடங்க விரும்புகிறீர்கள்?" : "5. When do you want to start?"}
                </h3>
                <p className="text-xs text-[#55585D] mt-1">
                  {isTamil
                    ? "வரைபடம், மண் பரிசோதனை மற்றும் அனுமதி பெற பொதுவாக 3 முதல் 4 வாரங்கள் தேவைப்படும்."
                    : "Planning, soil testing, and approval preparation usually take 3–4 weeks."}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {timelineOptions.map((t) => (
                  <button
                    key={t.id}
                    onClick={() => setTimeline(t.id)}
                    className={`p-4 rounded-2xl border text-left transition-all ${
                      timeline === t.id
                        ? "bg-[#B78A52]/10 border-[#B78A52] shadow-sm text-[#17191B]"
                        : "bg-white border-[#E2D9CC] hover:bg-slate-50"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-sm text-[#17191B]">
                        {isTamil ? t.labelTa : t.labelEn}
                      </span>
                      {timeline === t.id && <Check className="w-4 h-4 text-[#B78A52] stroke-[3]" />}
                    </div>
                  </button>
                ))}
              </div>

              <div className="pt-4 flex justify-between items-center">
                <button
                  onClick={() => setStep(4)}
                  className="px-5 py-2.5 rounded-full border border-slate-200 text-slate-600 font-semibold text-xs hover:bg-slate-50 transition-all"
                >
                  {isTamil ? "முந்தைய படி" : "Back"}
                </button>
                <button
                  onClick={() => setStep(6)}
                  className="px-7 py-3.5 rounded-full bg-[#B78A52] hover:bg-[#a37742] text-slate-950 font-bold text-xs uppercase tracking-wider flex items-center gap-2 transition-all shadow-md"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>{isTamil ? "என் வழிகாட்டியைப் பார்க்க" : "View My House Plan Summary"}</span>
                </button>
              </div>
            </motion.div>
          )}

          {/* Step 6: Final Customer Roadmap Summary */}
          {step === 6 && (
            <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} className="space-y-6">
              
              <div className="p-6 rounded-3xl bg-[#17191B] text-white">
                <div className="flex items-center gap-2 mb-2 text-[#B78A52]">
                  <CheckCircle2 className="w-5 h-5" />
                  <span className="text-xs font-mono font-bold uppercase tracking-wider">
                    {isTamil ? "உங்கள் வழிகாட்டி சுருக்கம்" : "YOUR PERSONAL ROADMAP"}
                  </span>
                </div>

                <h3 className="text-xl sm:text-2xl font-black text-white font-sans">
                  {isTamil ? "உங்கள் இல்லத்திற்கான செயல் திட்டம்" : "Your Home Building Action Plan"}
                </h3>

                {/* Summary Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 my-5 text-xs">
                  <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                    <span className="text-[10px] text-slate-400 block font-mono">
                      {isTamil ? "நில நிலை" : "LAND STATUS"}
                    </span>
                    <span className="font-bold text-white mt-0.5 block">
                      {hasLand === "yes" ? (isTamil ? "உங்களிடம் நிலம் உள்ளது" : "Plot Available") : (isTamil ? "நிலம் தேவை" : "Seeking Plot")}
                    </span>
                  </div>

                  <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                    <span className="text-[10px] text-slate-400 block font-mono">
                      {isTamil ? "இடம்" : "LOCATION"}
                    </span>
                    <span className="font-bold text-white mt-0.5 block truncate">
                      {location || "Tirunelveli Region"}
                    </span>
                  </div>

                  <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                    <span className="text-[10px] text-slate-400 block font-mono">
                      {isTamil ? "வீட்டின் வகை" : "HOUSE TYPE"}
                    </span>
                    <span className="font-bold text-white mt-0.5 block truncate">
                      {isTamil
                        ? houseTypes.find((h) => h.id === houseType)?.titleTa
                        : houseTypes.find((h) => h.id === houseType)?.titleEn}
                    </span>
                  </div>

                  <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                    <span className="text-[10px] text-slate-400 block font-mono">
                      {isTamil ? "தோராய பட்ஜெட்" : "BUDGET"}
                    </span>
                    <span className="font-bold text-[#B78A52] mt-0.5 block truncate">
                      {isTamil
                        ? budgetOptions.find((b) => b.id === budgetRange)?.labelTa
                        : budgetOptions.find((b) => b.id === budgetRange)?.labelEn}
                    </span>
                  </div>
                </div>

                {/* Next Steps Guidance */}
                <div className="pt-2 space-y-2 text-xs">
                  <span className="text-[11px] font-mono text-[#B78A52] uppercase font-bold tracking-wider block">
                    {isTamil ? "உடனடியாக செய்ய வேண்டிய 3 முக்கிய படிகள்:" : "RECOMMENDED NEXT STEPS:"}
                  </span>
                  <ul className="space-y-1.5 text-slate-300">
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#B78A52] mt-1.5 flex-shrink-0" />
                      <span>
                        {hasLand === "yes"
                          ? (isTamil ? "1. நிலத்தின் பட்டா மற்றும் எல்லை அளவீடுகளை சரிபார்க்கவும்." : "1. Verify plot boundaries and check Patta status.")
                          : (isTamil ? "1. பாதை அகலம் மற்றும் மண் தரம் உள்ள சரியான நிலத்தைத் தேர்வு செய்யவும்." : "1. Select plot with verified road access and clear ownership.")}
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#B78A52] mt-1.5 flex-shrink-0" />
                      <span>
                        {isTamil
                          ? "2. குடும்ப உறுப்பினர்களின் தேவைகளுக்கு ஏற்ப 2D கட்டிட வரைபடம் தயாரிக்கவும்."
                          : "2. Prepare 2D architectural floor plan respecting family needs and Vastu."}
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#B78A52] mt-1.5 flex-shrink-0" />
                      <span>
                        {isTamil
                          ? "3. எந்தெந்த பொருட்கள் பயன்படுத்தப்படும் என்பதை எழுத்துப்பூர்வமான BOQ மதிப்பீடாகப் பெறவும்."
                          : "3. Request an itemized Bill of Quantities (BOQ) with zero hidden escalations."}
                      </span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
                <button
                  onClick={handleSendWhatsAppSummary}
                  className="w-full sm:flex-1 py-3.5 px-6 rounded-full bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-[#25D366]/25 transition-all"
                >
                  <MessageCircle className="w-4 h-4 fill-current" />
                  <span>
                    {isTamil ? "வாட்ஸ்அப்பில் பொறியாளரிடம் ஆலோசிக்க" : "Discuss this Plan on WhatsApp"}
                  </span>
                </button>

                <button
                  onClick={() => setStep(1)}
                  className="w-full sm:w-auto py-3 px-5 rounded-full border border-slate-300 hover:bg-slate-100 text-slate-700 font-semibold text-xs flex items-center justify-center gap-1.5 transition-all"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>{isTamil ? "மீண்டும் மாற்றியமைக்க" : "Modify Answers"}</span>
                </button>
              </div>

            </motion.div>
          )}

        </div>

      </div>
    </section>
  );
}
