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
  ArrowRight,
  Clock,
  Sparkles,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import BlurText from "@/components/motion/BlurText";

interface ConstructionProcessUnifiedProps {
  onOpenQuote?: () => void;
}

export default function ConstructionProcessUnified({ onOpenQuote }: ConstructionProcessUnifiedProps) {
  const { isTamil } = useLanguage();
  const [activeStageIdx, setActiveStageIdx] = useState(0);

  // The 6 exact canonical stages required by Section 11
  const processSteps = [
    {
      num: "01",
      nameEn: "Consultation",
      nameTa: "ஆலோசனை & தேவைகள்",
      timelineEn: "Step 01",
      timelineTa: "படி 01",
      taglineEn: "Vision, Lifestyle & Requirement Brief",
      taglineTa: "எண்ணங்கள், குடும்பத் தேவைகள் & பட்ஜெட்",
      descEn:
        "Direct meeting with Chief Civil Engineer Er. Sahaya Antony Stalin to discuss your plot orientation, family lifestyle, architectural preferences, and preliminary budget.",
      descTa:
        "தலைமைப் பொறியாளர் Er. சகாய அந்தோணி ஸ்டாலின் அவர்களுடன் நேரடி சந்திப்பு. உங்கள் நிலத்தின் அமைப்பு, குடும்ப உறுப்பினர்களின் தேவைகள் மற்றும் உத்தேச பட்ஜெட் குறித்து வெளிப்படையான கலந்துரையாடல்.",
      pointsEn: [
        "Family lifestyle & room requirements",
        "Budget orientation & timeline planning",
        "Vastu compliance and directional alignment",
      ],
      pointsTa: [
        "குடும்ப உறுப்பினர்களின் விருப்பங்கள் மற்றும் அறைகள்",
        "பட்ஜெட் மற்றும் கட்டுமான கால அளவு திட்டமிடல்",
        "வாஸ்து முறை மற்றும் திசைகள் சரிபார்ப்பு",
      ],
      icon: MessageSquare,
      image: "/images/fb-projects/fb-2866252757935105/image_001.jpg",
    },
    {
      num: "02",
      nameEn: "Site Inspection & Soil Testing",
      nameTa: "கள ஆய்வு & மண் பரிசோதனை",
      timelineEn: "Step 02",
      timelineTa: "படி 02",
      taglineEn: "Soil SBC Lab Test & Boundary Verification",
      taglineTa: "மண் உறுதித்தன்மை பரிசோதனை & எல்லை அளவீடு",
      descEn:
        "On-site boundary survey, laser leveling, and NABL laboratory Safe Bearing Capacity (SBC) borehole soil testing to engineer the exact foundation depth required.",
      descTa:
        "நிலத்தின் எல்லை மற்றும் மட்டத்தை லேசர் கருவிகள் மூலம் அளவிடுதல். அஸ்திவாரம் எந்த ஆழத்தில் அமைக்க வேண்டும் என்பதை அறிய மண் பரிசோதனை (SBC Test) செய்தல்.",
      pointsEn: [
        "NABL certified borehole soil testing",
        "Laser optical ground leveling survey",
        "Groundwater table & drainage check",
      ],
      pointsTa: [
        "ஆய்வக மண் பரிசோதனை அறிக்கை (SBC)",
        "லேசர் கருவி மூலம் தரைமட்ட அளவீடு",
        "நிலத்தடி நீர் மட்டம் & மழைநீர் வடிகால் ஆய்வு",
      ],
      icon: FileCheck,
      image: "/images/fb-projects/fb-3944641902085937/image_001.jpg",
    },
    {
      num: "03",
      nameEn: "Planning & Architectural Design",
      nameTa: "வரைபடம் & 3D வடிவமைப்பு",
      timelineEn: "Step 03",
      timelineTa: "படி 03",
      taglineEn: "2D Floor Plans & Photorealistic 3D Views",
      taglineTa: "2D வரைபடம் & அசல் 3D வண்ண தோற்றம்",
      descEn:
        "Creation of comprehensive architectural floor plans, high-resolution 3D elevations, structural column-beam drawings according to IS 456, and municipal approval dossiers.",
      descTa:
        "அனுமதிக்குரிய 2D வரைபடங்கள், வீடு கட்டி முடித்தால் எப்படி இருக்கும் என்பதை காட்டும் அழகான 3D வெளித்தோற்றம் மற்றும் அரசு அனுமதி கோப்புகள் தயாரித்தல்.",
      pointsEn: [
        "Architectural 2D floor layouts & furniture placement",
        "Day and night 3D exterior perspective renders",
        "IS 456 structural column, beam & slab detailing",
      ],
      pointsTa: [
        "2D மாடி வரைபடங்கள் & அறைகள் வடிவமைப்பு",
        "பகல் மற்றும் இரவு நேர 3D வெளித்தோற்றம்",
        "இந்திய தர விதிமுறைப்படி (IS 456) தூண், பீம் வரைபடம்",
      ],
      icon: Compass,
      image: "/images/fb-projects/fb-4017946504755476/image_001.jpg",
    },
    {
      num: "04",
      nameEn: "Estimate & Itemized Agreement",
      nameTa: "செலவு மதிப்பீடு & ஒப்பந்தம்",
      timelineEn: "Step 04",
      timelineTa: "படி 04",
      taglineEn: "Zero Hidden Escalations & Milestone Contracts",
      taglineTa: "மறைமுக செலவுகள் இல்லாத வெளிப்படையான ஒப்பந்தம்",
      descEn:
        "Every brick, steel rebar, and brand is itemized in a transparent Bill of Quantities (BOQ). A binding legal agreement locks the total project cost without midway price hikes.",
      descTa:
        "பயன்படுத்தப்படும் ஒவ்வொரு பொருள் மற்றும் பிராண்டுகளின் விவரங்கள் அடங்கிய விரிவான BOQ அறிக்கை. கட்டுமான காலத்தில் விலையேற்றம் செய்யப்படாது என உறுதி செய்யும் ஒப்பந்தம்.",
      pointsEn: [
        "Line-item BOQ for every construction material",
        "Milestone-linked transparent payment schedule",
        "Written guarantee of fixed project cost",
      ],
      pointsTa: [
        "ஒவ்வொரு கட்டுமானப் பொருட்களின் விரிவான பட்டியல்",
        "வேலை முடிவுக்கு ஏற்ப தவணை முறை கட்டண அட்டவணை",
        "எழுத்துப்பூர்வமான விலை உறுதி ஒப்பந்தம்",
      ],
      icon: Layers,
      image: "/images/projects/site-silathikulam-murugan.jpg",
    },
    {
      num: "05",
      nameEn: "Precision Construction",
      nameTa: "தரம் மிக்க கட்டுமானம்",
      timelineEn: "Step 05",
      timelineTa: "படி 05",
      taglineEn: "Fe550D Rebar, Porotherm Bricks & M25 Concrete",
      taglineTa: "Fe550D கம்பிகள், போரோதெர்ம் செங்கல் & தளம்",
      descEn:
        "Excavation to hard strata, anti-termite treatment, high-ductility Fe550D rebar cages, Wienerberger Porotherm clay masonry, and mechanized boom-placer concrete slab casting.",
      descTa:
        "பாறை அடுக்கு வரை குழி தோண்டுதல், கரையான் தடுப்பு மருந்து, Fe550D கம்பிகள் கொண்டு பில்லர் அமைத்தல், போரோதெர்ம் செங்கல் சுவர்கள் மற்றும் மெஷின் மூலம் தளம் போடுதல்.",
      pointsEn: [
        "Mechanized boom placer pump for dense concrete",
        "Wienerberger Porotherm eco-thermal brickwork",
        "Daily WhatsApp video reports from site to owner",
      ],
      pointsTa: [
        "மெஷின் மூலம் துல்லியமான கான்கிரீட் தளம்",
        "வீட்டை குளிர்ச்சியாக வைக்கும் போரோதெர்ம் சுவர்கள்",
        "வாட்ஸ்அப் மூலம் உரிமையாளருக்கு தினசரி வீடியோ ரிப்போர்ட்",
      ],
      icon: HardHat,
      image: "/images/projects/site-durainagar-praveen.jpg",
    },
    {
      num: "06",
      nameEn: "Quality Checks & Key Handover",
      nameTa: "தர பரிசோதனை & சாவி ஒப்படைப்பு",
      timelineEn: "Step 06",
      timelineTa: "படி 06",
      taglineEn: "Comprehensive Snag-List & Generational Home",
      taglineTa: "முழுமையான தர ஆய்வு & மகிழ்ச்சியான குடிபுகுதல்",
      descEn:
        "Rigorous 72-hour terrace ponding tests, electrical load balancing, plumbing pressure verification, deep cleaning, and ceremonial key handover on your auspicious date.",
      descTa:
        "மொட்டை மாடியில் 72 மணி நேரம் தண்ணீர் தேக்கி கசிவு ஆய்வு, மின்சாரம் மற்றும் பிளம்பிங் பரிசோதனை, முழுமையான சுத்தம் செய்தல் மற்றும் நல்ல நாளில் சாவி ஒப்படைப்பு.",
      pointsEn: [
        "72-hour terrace flood waterproofing certification",
        "Electrical earth resistance and RCCB trip testing",
        "Ceremonial key handover on your chosen muhurtham",
      ],
      pointsTa: [
        "72 மணி நேர மொட்டை மாடி கசிவு தடுப்பு சான்றிதழ்",
        "எர்த்திங் மற்றும் பிளம்பிங் முழுமையான சோதனை",
        "சுப முகூர்த்த நாளில் மங்களகரமான சாவி ஒப்படைப்பு",
      ],
      icon: Key,
      image: "/images/hero-sunset-villa.jpg",
    },
  ];

  const currentStep = processSteps[activeStageIdx];

  return (
    <section
      id="process"
      className="w-full bg-black py-24 sm:py-32 text-white relative overflow-hidden scroll-mt-20 font-body border-t border-white/10"
    >
      {/* Background Gold Ambient Lighting */}
      <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-[#C9A46B]/5 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-14 space-y-3">
          <div className="inline-flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C9A46B]" />
            <span className="text-xs font-mono font-bold uppercase tracking-[0.25em] text-[#C9A46B]">
              {isTamil ? "// கட்டுமானப் பயணம்" : "// HOW WE BUILD YOUR HOME"}
            </span>
          </div>

          {isTamil ? (
            <BlurText
              text="அஸ்திவாரம் முதல் சாவி ஒப்படைப்பு வரை ஒரு தெளிவான பயணம்."
              as="h2"
              isTamil={true}
              className="text-3xl sm:text-5xl font-tamil font-black text-white tracking-tight"
            />
          ) : (
            <BlurText
              text="A Structured Journey from Ground to Key Handover."
              as="h2"
              italic={true}
              className="text-4xl sm:text-6xl font-heading font-normal text-white tracking-tight leading-[1.08]"
            />
          )}

          <p className="text-sm sm:text-base text-white/70 max-w-2xl leading-relaxed">
            {isTamil
              ? "புதிதாக வீடு கட்டுபவர்களுக்கு புரியும் வகையில் 6 எளிய நிலைகளில் வெளிப்படையான கட்டுமான முறை. எந்த இடத்திலும் குழப்பம் இன்றி நம்பிக்கையுடன் அடியெடுத்து வையுங்கள்."
              : "Designed from a homeowner's perspective, our 6-stage construction process ensures complete transparency, milestone verification, and zero hidden costs."}
          </p>
        </div>

        {/* Horizontal Interactive Step Navigation (Desktop) */}
        <div className="hidden lg:grid grid-cols-6 gap-3 mb-10">
          {processSteps.map((step, idx) => {
            const isActive = activeStageIdx === idx;
            const Icon = step.icon;
            return (
              <button
                key={step.num}
                onClick={() => setActiveStageIdx(idx)}
                className={`p-4 rounded-2xl text-left transition-all duration-300 relative ${
                  isActive
                    ? "liquid-glass-strong border-[#C9A46B] shadow-xl shadow-[#C9A46B]/15"
                    : "liquid-glass hover:bg-white/5 opacity-70 hover:opacity-100"
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className={`text-xs font-mono font-bold ${isActive ? "text-[#C9A46B]" : "text-white/50"}`}>
                    {step.num}
                  </span>
                  <Icon className={`w-4 h-4 ${isActive ? "text-[#C9A46B]" : "text-white/40"}`} />
                </div>
                <h4 className="text-xs font-bold text-white tracking-wide truncate">
                  {isTamil ? step.nameTa : step.nameEn}
                </h4>
              </button>
            );
          })}
        </div>

        {/* Active Stage Detailed Presentation (Split Card) */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeStageIdx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="rounded-3xl liquid-glass-strong border border-white/15 overflow-hidden grid grid-cols-1 lg:grid-cols-12 gap-8 p-6 sm:p-10 items-center"
          >
            {/* Left Column (6 Cols): Genuine Construction Stage Photo */}
            <div className="lg:col-span-6 relative aspect-[16/10] sm:aspect-[4/3] rounded-2xl overflow-hidden bg-zinc-900 border border-white/10 shadow-2xl">
              <Image
                src={currentStep.image}
                alt={currentStep.nameEn}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
              
              {/* Stage Pill */}
              <div className="absolute top-4 left-4 px-3 py-1 rounded-full liquid-glass backdrop-blur-md text-[11px] font-mono font-bold text-[#E2C496]">
                <span>{isTamil ? currentStep.timelineTa : currentStep.timelineEn}</span>
              </div>
            </div>

            {/* Right Column (6 Cols): Description, Points, and Guidance */}
            <div className="lg:col-span-6 space-y-5 text-left">
              <div>
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#C9A46B] block">
                  STAGE {currentStep.num} OF 06
                </span>
                <h3 className="text-2xl sm:text-3xl font-heading italic text-white mt-1">
                  {isTamil ? currentStep.nameTa : currentStep.nameEn}
                </h3>
                <p className="text-xs font-mono text-[#E2C496] mt-0.5">
                  {isTamil ? currentStep.taglineTa : currentStep.taglineEn}
                </p>
              </div>

              <p className="text-sm text-white/80 leading-relaxed font-body">
                {isTamil ? currentStep.descTa : currentStep.descEn}
              </p>

              {/* Inclusions / Checklist */}
              <div className="space-y-2 pt-2 border-t border-white/10">
                <span className="text-[11px] font-mono text-white/50 uppercase tracking-wider block">
                  {isTamil ? "இந்த நிலையில் நடப்பவை:" : "KEY STAGE DELIVERABLES:"}
                </span>
                {(isTamil ? currentStep.pointsTa : currentStep.pointsEn).map((point, pIdx) => (
                  <div key={pIdx} className="flex items-center gap-2.5 text-xs text-white/90">
                    <CheckCircle2 className="w-4 h-4 text-[#C9A46B] flex-shrink-0" />
                    <span>{point}</span>
                  </div>
                ))}
              </div>

              {/* Action Buttons for Stage */}
              <div className="pt-4 flex items-center gap-3">
                <button
                  onClick={onOpenQuote}
                  className="px-5 py-2.5 rounded-full bg-white hover:bg-[#E2C496] text-black text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-colors shadow-lg"
                >
                  <span>{isTamil ? "மதிப்பீடு கேட்க" : "Plan This Stage"}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

                {/* Mobile Prev / Next Controls */}
                <div className="flex lg:hidden items-center gap-2 ml-auto">
                  <button
                    disabled={activeStageIdx === 0}
                    onClick={() => setActiveStageIdx((prev) => Math.max(0, prev - 1))}
                    className="px-3 py-2 rounded-xl liquid-glass text-xs disabled:opacity-30"
                  >
                    Prev
                  </button>
                  <button
                    disabled={activeStageIdx === processSteps.length - 1}
                    onClick={() => setActiveStageIdx((prev) => Math.min(processSteps.length - 1, prev + 1))}
                    className="px-3 py-2 rounded-xl liquid-glass text-xs disabled:opacity-30"
                  >
                    Next
                  </button>
                </div>
              </div>

            </div>
          </motion.div>
        </AnimatePresence>

      </div>
    </section>
  );
}
