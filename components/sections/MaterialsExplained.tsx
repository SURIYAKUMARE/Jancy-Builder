"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  Sparkles,
  HelpCircle,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Layers,
  ShieldAlert,
  MessageSquare,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";

export default function MaterialsExplained() {
  const { isTamil } = useLanguage();
  const [selectedMaterialId, setSelectedMaterialId] = useState<string>("steel");
  const [explainSimply, setExplainSimply] = useState<boolean>(true);

  const materials = [
    {
      id: "steel",
      icon: "🏗️",
      nameEn: "Steel Reinforcement (TMT Rebar)",
      nameTa: "இரும்புக் கம்பிகள் (TMT Rebar)",
      tagEn: "The Backbone of Structural Safety",
      tagTa: "கட்டிடத்தின் எலும்புக்கூடு போன்ற பலம்",
      image: "/images/fb-projects/fb-1473695047740194/image_002.jpg",
      whatEn: "Steel bars (TMT) are placed inside concrete beams, columns, footings, and slabs to resist tension and earthquakes.",
      whatTa: "கான்கிரீட் தூண்கள், பீம்கள் மற்றும் மேற்கூரையின் உள்பகுதியில் இரும்புக் கம்பிகள் கட்டப்படுகின்றன. இது வீட்டை நிலநடுக்கம் மற்றும் விரிசல்களிலிருந்து பாதுகாக்கும்.",
      whereEn: "Inside foundation footings, ground plinth beams, vertical columns, and roof ceiling slabs.",
      whereTa: "அடித்தளம், கீழ் தள பீம்கள், செங்குத்து தூண்கள் மற்றும் மேற்கூரை கான்கிரீட் தளம்.",
      whyEn: "Concrete is strong under downward compression but weak when pulled. Steel provides the ductile strength so your home bends safely without sudden failure.",
      whyTa: "கான்கிரீட் எடையை தாங்கும், ஆனால் வளைந்து கொடுக்கும் சக்தி குறைவு. இரும்பு கம்பிகள் இணைக்கப்படும் போதுதான் கட்டிடம் விரிசல் விழாமல் பலமாக நிற்கும்.",
      checkEn: "Check for Fe550 or Fe550D grade ISI mark. Ensure bars are free from deep scaly rust and placed with correct concrete cover blocks.",
      checkTa: "Fe550 அல்லது Fe550D கிரேடு முத்திரை இருக்கிறதா என்பதை பார்க்க வேண்டும். துருப்பிடிக்காமல் இருக்கிறதா மற்றும் சரியான இடைவெளியில் கவர் பிளாக் வைக்கப்பட்டுள்ளதா என சரிபார்க்கவும்.",
      askEn: "Ask your engineer: 'Are the bar diameters and spacing following the structural drawing approved by the structural consultant?'",
      askTa: "பொறியாளரிடம் கேட்க வேண்டிய கேள்வி: 'ஸ்ட்ரக்சுரல் வரைபடத்தின்படி சரியான கம்பி அளவு மற்றும் இடைவெளி பின்பற்றப்பட்டுள்ளதா?'",
    },
    {
      id: "porotherm",
      icon: "🧱",
      nameEn: "Wienerberger Porotherm Eco-Clay Bricks",
      nameTa: "போரோதெர்ம் குளுமை செங்கற்கள்",
      tagEn: "Natural 6°C Cooling & Light Weight",
      tagTa: "இயற்கையான குளுமை தரும் செங்கல்",
      image: "/images/fb-projects/fb-2593310028926711/image_001.jpg",
      whatEn: "Perforated hollow blocks made of natural baked clay designed to trap air pockets and block harsh tropical heat.",
      whatTa: "இயற்கை களிமண்ணால் சுடப்பட்டு, காற்றுக் குழாய்கள் கொண்ட செங்கற்கள். இது வெயிலின் வெப்பத்தை வீட்டிற்குள் வரவிடாமல் தடுக்கிறது.",
      whereEn: "All external and internal room walls across the home.",
      whereTa: "வீட்டின் வெளிப்புற மற்றும் உட்புற சுவர்கள் அனைத்திலும்.",
      whyEn: "Keeps room temperatures up to 6°C cooler than outside heat in Tirunelveli. Weighs 60% less than concrete blocks, reducing stress on footings.",
      whyTa: "நெல்லை வெயிலிலும் வீட்டை இயல்பாகவே 6 டிகிரி வரை குளிர்ச்சியாக வைத்திருக்கும். எடை குறைவு என்பதால் அஸ்திவாரத்திற்கு அழுத்தம் குறையும்.",
      checkEn: "Inspect factory uniform dimensions, minimal transport breakage, and ensure precision thin-bed joint mortar is used.",
      checkTa: "அனைத்து கற்களும் ஒரே சீரான அளவில் இருக்கிறதா மற்றும் சரியான பசை கலவை (Thin-bed mortar) கொண்டு கட்டப்படுகிறதா என்று பார்க்க வேண்டும்.",
      askEn: "Ask your engineer: 'Are we using thin-bed mortar joints to maintain maximum thermal insulation across all walls?'",
      askTa: "பொறியாளரிடம் கேட்க வேண்டிய கேள்வி: 'வெப்பம் கடத்தாத தின்-பெட் கலவை கொண்டு சுவர்கள் கட்டப்படுகிறதா?'",
    },
    {
      id: "cement",
      icon: "🏛️",
      nameEn: "Cement (OPC / PPC)",
      nameTa: "சிமெண்ட் (OPC / PPC)",
      tagEn: "The Binding Agent of Your Foundation",
      tagTa: "கான்கிரீட்டை பிணைக்கும் முக்கிய பொருள்",
      image: "/images/fb-projects/fb-1473695047740194/image_003.jpg",
      whatEn: "Fine powder made from limestone that chemically reacts with water and sand to turn into solid rock.",
      whatTa: "சுண்ணாம்புக் கல்லில் இருந்து தயாரிக்கப்படும் பொடி. இது தண்ணீர் மற்றும் மணலுடன் சேரும் போது இறுகி பாறையாக மாறும்.",
      whereEn: "Used in RCC concrete mixes, mortar for brickwork, and interior/exterior plastering.",
      whereTa: "கான்கிரீட் கலவை, செங்கல் கட்டு வேலை மற்றும் பூச்சு வேலைகள் அனைத்திலும்.",
      whyEn: "Without high-grade cement, mortar will crumble and concrete will lose its load-carrying capacity.",
      whyTa: "தரமான சிமெண்ட் இல்லையென்றால் சுவர்கள் உதிரும், மேற்கூரையில் விரிசல்கள் மற்றும் கசிவுகள் ஏற்படும்.",
      checkEn: "Check manufacture date (use within 90 days of packing). Ensure no hard lumps inside bags when pressed by hand.",
      checkTa: "மூட்டை தயாரித்த தேதி 90 நாட்களுக்குள் இருக்க வேண்டும். கை வைத்து அழுத்தும் போது கட்டிகள் இல்லாமல் மென்மையாக இருக்க வேண்டும்.",
      askEn: "Ask your engineer: 'Which grade is selected for the roof slab vs wall plastering, and when was the batch manufactured?'",
      askTa: "பொறியாளரிடம் கேட்க வேண்டிய கேள்வி: 'கூரைக்கு என்ன கிரேடு சிமெண்ட், பூச்சு வேலைக்கு என்ன கிரேடு சிமெண்ட் பயன்படுத்துகிறீர்கள்?'",
    },
    {
      id: "sand",
      icon: "⏳",
      nameEn: "Sand (M-Sand & P-Sand)",
      nameTa: "மணல் (M-Sand & P-Sand)",
      tagEn: "Manufactured Sand for Superior Bonding",
      tagTa: "கட்டுமானத்திற்கான நவீன இயந்திர மணல்",
      image: "/images/fb-projects/fb-2866252757935105/image_003.jpg",
      whatEn: "Crushed hard blue granite rock graded through triple-wash VSI machines to replace scarce, silt-heavy river sand.",
      whatTa: "கரும்பாறைகளை இயந்திரம் மூலம் உடைத்து, தூசிகளை கழுவி சுத்தப்படுத்தப்பட்ட தரமான மணல்.",
      whereEn: "M-Sand for heavy concrete & masonry; finer P-Sand (Plastering Sand) for smooth wall finishes.",
      whereTa: "M-Sand கான்கிரீட் மற்றும் சுவர்களுக்கும், P-Sand மென்மையான பூச்சு வேலைகளுக்கும் பயன்படுத்தப்படும்.",
      whyEn: "River sand often contains clay and organic mud that weakens concrete. Properly washed M-Sand gives consistent engineering strength.",
      whyTa: "ஆற்று மணலில் வண்டல் மண் கலந்திருக்க வாய்ப்புள்ளது. சரியான M-மணலில் மண் கலப்பு இல்லாமல் கான்கிரீட் பலமாக இருக்கும்.",
      checkEn: "Take a handful in water: water should not turn muddy (silt content must be under 5%).",
      checkTa: "தண்ணீரில் சிறிது மணலை கலக்கும் போது தண்ணீர் சேறாக மாறக்கூடாது. தூசு 5% க்கு குறைவாக இருக்க வேண்டும்.",
      askEn: "Ask your engineer: 'Has the sand been tested for silt content and washed to ensure no hollow plastering sounds?'",
      askTa: "பொறியாளரிடம் கேட்க வேண்டிய கேள்வி: 'பூச்சு வேலைக்கு பயன்படுத்தும் மணலில் மண் கலப்பு இல்லாமல் சலித்து கழுவப்பட்டுள்ளதா?'",
    },
    {
      id: "concrete",
      icon: "🏗️",
      nameEn: "Concrete Design Mix (M20 / M25)",
      nameTa: "கான்கிரீட் கலவை (M20 / M25)",
      tagEn: "The Stone That Shields Your Family",
      tagTa: "உங்கள் வீட்டை காக்கும் பலமான கலவை",
      image: "/images/fb-projects/fb-1473695047740194/image_004.jpg",
      whatEn: "An exact engineered proportion of cement, sand, coarse aggregates (20mm blue metal), and potable water.",
      whatTa: "சிமெண்ட், மணல், ஜல்லி மற்றும் சுத்தமான தண்ணீர் ஆகியவை சரியான விகிதத்தில் கலக்கப்படும் கலவை.",
      whereEn: "All load-bearing elements: footings, ground beams, columns, lintels, and roof slabs.",
      whereTa: "அஸ்திவாரம், தாங்கு தூண்கள், பீம்கள் மற்றும் மேற்கூரை தளம்.",
      whyEn: "Adding too much water makes concrete easy to pour but halves its strength. Strict water-cement ratio is vital.",
      whyTa: "அதிக தண்ணீர் ஊற்றினால் கான்கிரீட் தரம் குறையும். சரியான தண்ணீர் அளவில் கலக்கப்பட்டால் பல தலைமுறைகளுக்கு வீட்டின் ஆயுள் நீடிக்கும்.",
      checkEn: "Ensure mechanical needle vibrators are used to remove trapped air pockets, and test cubes are cast for laboratory testing.",
      checkTa: "கான்கிரீட் போடும் போது வைப்ரேட்டர் (Vibrator) கருவி வைத்து காற்று இடைவெளிகள் அகற்றப்பட வேண்டும். 28 நாட்கள் தண்ணீர் விட்டு நனைக்க வேண்டும்.",
      askEn: "Ask your engineer: 'Can you show me the 7-day and 28-day concrete cube compressive test reports from the lab?'",
      askTa: "பொறியாளரிடம் கேட்க வேண்டிய கேள்வி: 'கான்கிரீட்டின் பலத்தை உறுதி செய்யும் க்யூப் டெஸ்ட் (Cube Test) ரிப்போர்ட் பார்க்க முடியுமா?'",
    },
    {
      id: "pipes",
      icon: "🚿",
      nameEn: "Plumbing Pipes (CPVC & UPVC)",
      nameTa: "பிளம்பிங் பைப் லைன்கள்",
      tagEn: "Leak-Proof Water Circulation",
      tagTa: "கசிவு இல்லாத பாதுகாப்பான தண்ணீர் குழாய்கள்",
      image: "/images/fb-projects/fb-4092601067865089/image_001.jpg",
      whatEn: "Lead-free chlorinated polyvinyl chloride pipes designed for high-temperature and pressurized drinking water.",
      whatTa: "சூடான மற்றும் குளிர்ந்த தண்ணீரை பாதுகாப்பாக கொண்டு செல்லும் தரமான தடிமனான பிளாஸ்டிக் குழாய்கள்.",
      whereEn: "Concealed inside bathroom walls, kitchen lines, overhead water tanks, and drainage shafts.",
      whereTa: "குளியலறை சுவர்களின் உள்பகுதி, கிச்சன், மேல்நிலை தொட்டி மற்றும் கழிவுநீர் வெளியேற்றம்.",
      whyEn: "A cheap pipe hidden inside a finished tiled wall can leak and ruin expensive plastering and false ceilings.",
      whyTa: "சுவருக்குள் வைக்கப்படும் குழாயில் கசிவு ஏற்பட்டால் டைல்ஸ் மற்றும் சுவர்கள் பாழாகிவிடும். மறுபடியும் உடைத்து மாற்ற அதிக செலவாகும்.",
      checkEn: "Must undergo a 15-Bar hydraulic pressure pump test for 24 hours BEFORE closing walls with plaster and tiles.",
      checkTa: "பூச்சு வேலை தொடங்குவதற்கு முன் பைப் லைன்களில் பிரஷர் பம்ப் வைத்து 24 மணி நேரம் தண்ணீர் கசிவு உள்ளதா என சோதிக்க வேண்டும்.",
      askEn: "Ask your engineer: 'Will you perform a 15-Bar hydraulic pressure test on all bathroom lines before concealing them?'",
      askTa: "பொறியாளரிடம் கேட்க வேண்டிய கேள்வி: 'சுவரை பூசுவதற்கு முன் பைப் லைன்களில் பிரஷர் டெஸ்ட் செய்து கசிவு இல்லை என்பதை உறுதி செய்வீர்களா?'",
    },
    {
      id: "wiring",
      icon: "⚡",
      nameEn: "Electrical Wiring (FRLS Copper)",
      nameTa: "மின்சார வயரிங் (தீப்பிடிக்காத காப்பர்)",
      tagEn: "Fire-Retardant Household Safety",
      tagTa: "தீ விபத்துகளை தடுக்கும் பாதுகாப்பு வயர்கள்",
      image: "/images/fb-projects/fb-4092601067865089/image_002.jpg",
      whatEn: "Pure electrolytic copper strands coated with flame-retardant low-smoke (FRLS) insulation.",
      whatTa: "தீ விபத்து நேர்ந்தாலும் புகையோ அல்லது தீயோ பரவாத தரமான காப்பர் மின் கம்பிகள்.",
      whereEn: "Inside concealed PVC wall conduits running to all switches, lights, air conditioners, and kitchen appliances.",
      whereTa: "சுவர்களுக்குள் அமைக்கப்பட்ட குழாய்கள் வழியாக அனைத்து ஸ்விட்ச் போர்டுகள் மற்றும் ஏசி பாயிண்ட்டுகளுக்கு செல்கிறது.",
      whyEn: "Short circuits are the #1 hazard in residential homes. Correct wire thickness (gauge) prevents overheating and fires.",
      whyTa: "தவறான வயரிங் தீ விபத்துகளை ஏற்படுத்தலாம். ஏசி, வாட்டர் ஹீட்டர் போன்றவற்றுக்கு சரியான தடிமன் உள்ள வயர்களை பயன்படுத்த வேண்டும்.",
      checkEn: "Look for ISI and FRLS markings on the wire casing. Check that earthing copper rods are deeply grounded in soil.",
      checkTa: "வயர்களில் FRLS என்ற முத்திரை இருக்க வேண்டும். வீட்டின் எர்த்திங் (Earthing) சரியாக மண்ணில் புதைக்கப்பட்டுள்ளதா என பார்க்கவும்.",
      askEn: "Ask your engineer: 'Are dedicated separate circuits and RCCB trip-switches provided for heavy loads like AC and geysers?'",
      askTa: "பொறியாளரிடம் கேட்க வேண்டிய கேள்வி: 'ஏசி மற்றும் ஹீட்டருக்கு தனி சர்க்யூட்டும், ஷாக் அடிக்காமல் இருக்க RCCB கருவியும் வைக்கப்படுகிறதா?'",
    },
    {
      id: "waterproofing",
      icon: "🛡️",
      nameEn: "Roof & Wet Area Waterproofing",
      nameTa: "வாட்டர்ப்ரூஃபிங் (கசிவு தடுப்பு)",
      tagEn: "Permanent Protection Against Rain Seepage",
      tagTa: "மழைக்காலத்தில் தண்ணீர் கசியாமல் தடுக்கும் முறை",
      image: "/images/fb-projects/fb-2996642819924777/image_002.jpg",
      whatEn: "Multi-layer elastomeric polymer coating applied over the concrete slab before laying terrace tiles.",
      whatTa: "மொட்டை மாடி கான்கிரீட் மீது பூசப்படும் தண்ணீர் புகாத ரப்பர் போன்ற ரசாயன அடுக்கு.",
      whereEn: "Terrace roof slabs, sunken bathroom floors, and balcony slabs exposed to rain.",
      whereTa: "மொட்டை மாடி கூரை, பாத்ரூம் தரை மற்றும் பால்கனி பகுதிகள்.",
      whyEn: "Rainwater entering through micro-cracks will corrode internal steel rebar, causing concrete ceiling spalling.",
      whyTa: "தண்ணீர் உள்ளே இறங்கினால் மேற்கூரை கம்பிகள் துருப்பிடித்து கான்கிரீட் பெயர்ந்து விழும். சுவர்களில் பாசி பிடிக்கும்.",
      checkEn: "Conduct a 72-hour flood test: block terrace drain points with water ponding and check bottom ceiling for any damp patches.",
      checkTa: "மாடியில் தண்ணீர் தேக்கி வைத்து 3 நாட்கள் (72 மணி நேரம்) கீழ்ப்பகுதியில் ஏதேனும் ஈரப்பதம் தெரிகிறதா என சோதிக்க வேண்டும்.",
      askEn: "Ask your engineer: 'What is the multi-coat waterproofing warranty on the terrace and will you perform a 72-hour ponding test?'",
      askTa: "பொறியாளரிடம் கேட்க வேண்டிய கேள்வி: 'மொட்டை மாடிக்கு எத்தனை அடுக்கு வாட்டர்ப்ரூஃபிங் செய்கிறீர்கள், எத்தனை ஆண்டுகள் உத்தரவாதம்?'",
    },
  ];

  const selectedMaterial = materials.find((m) => m.id === selectedMaterialId) || materials[0];

  return (
    <section id="materials" className="py-20 lg:py-28 bg-white text-[#202124] relative overflow-hidden border-t border-[#E2D9CC] scroll-mt-24">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14 pb-6 border-b border-[#E2D9CC]">
          <div>
            <div className="inline-flex items-center gap-2 mb-3 px-3.5 py-1.5 rounded-full bg-[#B78A52]/10 border border-[#B78A52]/30">
              <span className="w-2 h-2 rounded-full bg-[#B78A52] animate-pulse" />
              <span className="text-[11px] font-mono font-bold uppercase tracking-[0.25em] text-[#B78A52]">
                {isTamil ? "பொருட்கள் பற்றிய எளிய புரிதல்" : "KNOW WHAT GOES INTO YOUR HOME"}
              </span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-black text-[#17191B] tracking-tight font-sans">
              {isTamil ? "உங்கள் வீட்டில் பயன்படுத்தப்படும் பொருட்கள்" : "Know What Goes Into Your Home"}
            </h2>

            <p className="mt-2 text-sm sm:text-base text-[#55585D] max-w-2xl leading-relaxed">
              {isTamil
                ? "கட்டுமானப் பொருட்களைப் புரிந்துகொள்ள நீங்கள் பொறியியல் படிக்க வேண்டியதில்லை. எந்தப் பொருள் எதற்கு பயன்படுகிறது, நீங்கள் என்ன கேள்வி கேட்க வேண்டும் என்பதை எளிய தமிழில் விளக்குகிறோம்."
                : "You do not need an engineering degree to understand construction materials. Here is what we use, why it matters, and exact questions to ask your builder."}
            </p>
          </div>

          {/* Simple vs Technical Explanation Mode Pill */}
          <div className="flex items-center gap-2 bg-[#F8F6F1] p-1.5 rounded-full border border-[#E2D9CC]">
            <button
              onClick={() => setExplainSimply(true)}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
                explainSimply
                  ? "bg-[#B78A52] text-white shadow-sm"
                  : "text-[#55585D] hover:text-[#17191B]"
              }`}
            >
              {isTamil ? "எளிமையாக விளக்குங்கள்" : "Explain Simply"}
            </button>
            <button
              onClick={() => setExplainSimply(false)}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
                !explainSimply
                  ? "bg-[#17191B] text-white shadow-sm"
                  : "text-[#55585D] hover:text-[#17191B]"
              }`}
            >
              {isTamil ? "தொழில்நுட்ப விவரங்கள்" : "Technical Specs"}
            </button>
          </div>
        </div>

        {/* Material Selection Horizontal Pill Bar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
          {materials.map((mat) => {
            const isSelected = selectedMaterialId === mat.id;
            return (
              <button
                key={mat.id}
                onClick={() => setSelectedMaterialId(mat.id)}
                className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition-all whitespace-nowrap flex items-center gap-2 border ${
                  isSelected
                    ? "bg-[#17191B] text-white border-[#B78A52] shadow-md -translate-y-0.5"
                    : "bg-[#F8F6F1] hover:bg-slate-100 text-[#55585D] border-[#E2D9CC]"
                }`}
              >
                <span>{mat.icon}</span>
                <span>{isTamil ? mat.nameTa : mat.nameEn}</span>
              </button>
            );
          })}
        </div>

        {/* Detailed Material Showcase Card */}
        <div className="rounded-3xl bg-[#F8F6F1] border border-[#E2D9CC] p-6 sm:p-10 shadow-xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left: 5 Structured Answers */}
            <div className="lg:col-span-7 space-y-6">
              
              <div>
                <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#B78A52] uppercase mb-1">
                  <span>{selectedMaterial.icon}</span>
                  <span>{isTamil ? selectedMaterial.tagTa : selectedMaterial.tagEn}</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-black text-[#17191B] font-sans">
                  {isTamil ? selectedMaterial.nameTa : selectedMaterial.nameEn}
                </h3>
              </div>

              {/* 1. What is it? */}
              <div className="p-4 rounded-2xl bg-white border border-[#E2D9CC] shadow-sm">
                <h4 className="text-xs font-bold text-[#B78A52] uppercase font-mono tracking-wider mb-1">
                  {isTamil ? "1. இது என்ன பொருள்?" : "1. What is it?"}
                </h4>
                <p className="text-xs sm:text-sm text-[#202124] leading-relaxed">
                  {isTamil ? selectedMaterial.whatTa : selectedMaterial.whatEn}
                </p>
              </div>

              {/* 2. Where is it used? */}
              <div className="p-4 rounded-2xl bg-white border border-[#E2D9CC] shadow-sm">
                <h4 className="text-xs font-bold text-[#B78A52] uppercase font-mono tracking-wider mb-1">
                  {isTamil ? "2. உங்கள் வீட்டில் எங்கு பயன்படுத்தப்படுகிறது?" : "2. Where is it used?"}
                </h4>
                <p className="text-xs sm:text-sm text-[#202124] leading-relaxed">
                  {isTamil ? selectedMaterial.whereTa : selectedMaterial.whereEn}
                </p>
              </div>

              {/* 3. Why is it important? */}
              <div className="p-4 rounded-2xl bg-white border border-[#E2D9CC] shadow-sm">
                <h4 className="text-xs font-bold text-[#B78A52] uppercase font-mono tracking-wider mb-1">
                  {isTamil ? "3. இது ஏன் மிக முக்கியமானது?" : "3. Why is it important?"}
                </h4>
                <p className="text-xs sm:text-sm text-[#202124] leading-relaxed">
                  {isTamil ? selectedMaterial.whyTa : selectedMaterial.whyEn}
                </p>
              </div>

              {/* 4. What quality check matters? */}
              <div className="p-4 rounded-2xl bg-white border border-[#E2D9CC] shadow-sm">
                <h4 className="text-xs font-bold text-emerald-600 uppercase font-mono tracking-wider mb-1 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>{isTamil ? "4. என்ன தரத்தை சரிபார்க்க வேண்டும்?" : "4. Quality checks that matter:"}</span>
                </h4>
                <p className="text-xs sm:text-sm text-[#202124] leading-relaxed">
                  {isTamil ? selectedMaterial.checkTa : selectedMaterial.checkEn}
                </p>
              </div>

              {/* 5. What should you ask your engineer? */}
              <div className="p-4 rounded-2xl bg-[#17191B] text-white border border-[#B78A52]/40 shadow-sm">
                <h4 className="text-xs font-bold text-[#B78A52] uppercase font-mono tracking-wider mb-1 flex items-center gap-1.5">
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>{isTamil ? "5. உங்கள் பில்டரிடம் கேட்க வேண்டிய முக்கிய கேள்வி:" : "5. What should you ask your engineer?"}</span>
                </h4>
                <p className="text-xs sm:text-sm text-slate-200 leading-relaxed italic">
                  {isTamil ? selectedMaterial.askTa : selectedMaterial.askEn}
                </p>
              </div>

            </div>

            {/* Right: Authentic Photograph from Jancy Archive */}
            <div className="lg:col-span-5 relative aspect-[4/3] rounded-3xl overflow-hidden border border-[#E2D9CC] shadow-xl bg-[#17191B]">
              <Image
                src={selectedMaterial.image}
                alt={selectedMaterial.nameEn}
                fill
                className="object-cover transition-transform duration-700 hover:scale-105"
                sizes="(max-width: 1024px) 100vw, 40vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-4 left-4 right-4 text-left">
                <span className="text-[10px] font-mono text-[#B78A52] uppercase tracking-wider block font-bold">
                  {isTamil ? "நேரடி கட்டுமானப் புகைப்படம்" : "AUTHENTIC SITE PHOTO"}
                </span>
                <span className="text-xs text-white font-medium">
                  {isTamil ? "ஜான்சி பில்டர்ஸ் வேலைத்தளம் • திருநெல்வேலி மாவட்டம்" : "Verified Jancy Builders Work Site • Tirunelveli District"}
                </span>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
