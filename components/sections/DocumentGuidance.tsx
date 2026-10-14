"use client";

import React, { useState } from "react";
import {
  FileText,
  ShieldCheck,
  HelpCircle,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  AlertCircle,
  MessageCircle,
  Landmark,
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { motion, AnimatePresence } from "framer-motion";

export default function DocumentGuidance() {
  const { isTamil } = useLanguage();
  const [expandedDoc, setExpandedDoc] = useState<string | null>("patta");

  const documents = [
    {
      id: "sale_deed",
      icon: "📜",
      nameEn: "Sale Deed (Title Deed)",
      nameTa: "கிரயப் பத்திரம் (தாய் பத்திரம்)",
      purposeEn: "Proves legal ownership of the plot",
      purposeTa: "நிலத்தின் சட்டப்பூர்வ உரிமையை நிரூபிக்கும் ஆவணம்",
      descEn:
        "The registered deed showing who purchased the property and from whom. It contains plot survey numbers, boundary measurements, and registration office seals. Earlier parent documents (Thaai Pathiram) trace the chain of ownership for the past 30 years.",
      descTa:
        "நிலத்தை யாரிடமிருந்து யார் வாங்கினார்கள் என்பதை சார்பதிவாளர் அலுவலகத்தில் பதிவு செய்த ஆவணம். இதில் சர்வே எண், நான்கு எல்லை அளவுகள் மற்றும் முத்திரை இருக்கும். முந்தைய 30 ஆண்டு கால தாய் பத்திரங்களையும் சரிபார்ப்பது நல்லது.",
      tipEn: "Check that the survey number and boundaries in the deed match your physical plot on the ground.",
      tipTa: "பத்திரத்தில் உள்ள சர்வே எண் மற்றும் நான்கு எல்லைகள் நிலத்தில் உள்ள எல்லைகளோடு ஒத்துப்போகிறதா என கவனியுங்கள்.",
    },
    {
      id: "patta",
      icon: "📑",
      nameEn: "Patta & Chitta",
      nameTa: "பட்டா & சிட்டா",
      purposeEn: "Revenue department record of landholding",
      purposeTa: "வருவாய்த் துறையின் அதிகாரப்பூர்வ நிலப் பதிவு",
      descEn:
        "A Patta is an official document issued by the Tamil Nadu Revenue Department (Tahsildar) indicating the rightful owner who pays land tax. Chitta provides details of the land category (Nanjai / Punjai) and total area.",
      descTa:
        "பட்டா என்பது நிலம் தொடர்பான வருவாய்த் துறை பதிவு. நிலத்திற்கு யார் வரி செலுத்துகிறார் என்பதை உறுதிப்படுத்துகிறது. சிட்டா என்பது நிலத்தின் வகை (நன்செய் / புன்செய்) மற்றும் பரப்பளவை காட்டும் பதிவு.",
      tipEn: "Ensure the seller's name or your name is clearly updated on the official TN e-Services portal (eservices.tn.gov.in).",
      tipTa: "தமிழக அரசின் அதிகாரப்பூர்வ e-Services இணையதளத்தில் (eservices.tn.gov.in) உங்கள் பெயர் பட்டாவில் உள்ளதா என சரிபார்க்கலாம்.",
    },
    {
      id: "ec",
      icon: "🔍",
      nameEn: "Encumbrance Certificate (EC / Villangam)",
      nameTa: "வில்லங்கச் சான்றிதழ் (EC / வில்லங்கம்)",
      purposeEn: "Verifies no pending bank loans or legal disputes",
      purposeTa: "நிலத்தின் மீது கடன் அல்லது வில்லங்கம் இல்லை என்பதை அறிய",
      descEn:
        "Issued by the Sub-Registrar Office, the EC lists all registered transactions (sales, mortgages, leases, gift deeds) that occurred on the property over a specific period (typically 15 to 30 years). A 'Nil Encumbrance' certificate shows no active registered claims.",
      descTa:
        "சார்பதிவாளர் அலுவலகத்தால் வழங்கப்படும் ஆவணம். கடந்த 15 முதல் 30 ஆண்டுகளில் இந்த நிலத்தின் மீது ஏதேனும் அடமானம், வங்கி கடன் அல்லது உரிமை பரிமாற்றம் நடந்துள்ளதா என்பதை காட்டும். எந்த கடனும் இல்லை என்றால் 'வில்லங்கம் இல்லை' (Nil EC) என்று வரும்.",
      tipEn: "Always obtain an up-to-date EC from the TN Registration portal (tnreginet.gov.in) right up to the current date.",
      tipTa: "இன்றைய தேதி வரை வில்லங்கச் சான்றிதழை tnreginet.gov.in தளத்தில் பதிவிறக்கம் செய்து சரிபார்க்கலாம்.",
    },
    {
      id: "fmb",
      icon: "📐",
      nameEn: "FMB Sketch (Field Measurement Book)",
      nameTa: "புல வரைபடம் (FMB Sketch)",
      purposeEn: "Official government survey boundary map",
      purposeTa: "அரசு சர்வேயர் வரைந்த சரியான நில வரைபடம்",
      descEn:
        "The FMB sketch maintained at the Taluk office shows the precise geometric dimensions of your sub-division, neighboring plots, and road alignment. It protects against future boundary disputes with neighbors.",
      descTa:
        "வட்டாட்சியர் (Taluk) அலுவலகத்தில் பராமரிக்கப்படும் வரைபடம். உங்கள் நிலத்தின் வடிவம், நான்கு பக்க எல்லை அளவுகள் மற்றும் பக்கத்து நிலத்தின் எண்களை காட்டும். எல்லை பிரச்சனை வராமல் தடுக்க இது உதவும்.",
      tipEn: "A licensed civil engineer or government surveyor should measure your plot on-site using this sketch before digging foundations.",
      tipTa: "அஸ்திவாரம் தோண்டுவதற்கு முன் அரசு சர்வேயர் அல்லது சிவில் இன்ஜினியர் மூலம் FMB வரைபடத்தின்படி அளந்து கொள்வது நல்லது.",
    },
    {
      id: "approval",
      icon: "🏛️",
      nameEn: "DTCP / Local Panchayat Approval",
      nameTa: "DTCP / உள்ளாட்சி கட்டிட வரைபட அனுமதி",
      purposeEn: "Legal sanction to construct a residential building",
      purposeTa: "வீடு கட்டுவதற்கான முறையான அரசு அனுமதி",
      descEn:
        "Before laying bricks, a building plan prepared by a licensed civil engineer must be submitted to the local Village Panchayat / Town Municipality / DTCP. The approved plan confirms adherence to setbacks, road width, and floor area limits.",
      descTa:
        "வீடு கட்டத் தொடங்குவதற்கு முன், உரிமம் பெற்ற சிவில் இன்ஜினியர் தயாரித்த கட்டிட வரைபடத்தை கிராம ஊராட்சி அல்லது நகராட்சியில் சமர்ப்பித்து அனுமதி பெற வேண்டும். இது சாலை அகலம் மற்றும் இடைவெளி விதிகளின்படி இருக்க வேண்டும்.",
      tipEn: "Do not build without local body approval, as electricity connection and property tax assessment require the sanction order.",
      tipTa: "மின்சார இணைப்பு (EB) மற்றும் சொத்து வரி பதிவு செய்வதற்கு கட்டிட அனுமதி ஆணை கட்டாயம் தேவைப்படும்.",
    },
  ];

  return (
    <section id="documents" className="py-20 lg:py-28 bg-[#F8F6F1] text-[#202124] relative overflow-hidden border-t border-[#E2D9CC] scroll-mt-24">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 mb-3 px-3.5 py-1.5 rounded-full bg-[#B78A52]/10 border border-[#B78A52]/30">
            <span className="w-2 h-2 rounded-full bg-[#B78A52] animate-pulse" />
            <span className="text-[11px] font-mono font-bold uppercase tracking-[0.25em] text-[#B78A52]">
              {isTamil ? "முக்கியமான நில மற்றும் சட்ட ஆவணங்கள்" : "ESSENTIAL LAND & LEGAL GUIDANCE"}
            </span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black text-[#17191B] tracking-tight font-sans">
            {isTamil ? "வீடு கட்டத் தேவையான ஆவணங்கள்" : "Documents You May Need"}
          </h2>

          <p className="mt-3 text-sm sm:text-base text-[#55585D] max-w-2xl mx-auto leading-relaxed">
            {isTamil
              ? "சரியான ஆவணங்கள் உங்கள் வாழ்நாள் சேமிப்பிற்கு முழு பாதுகாப்பைத் தரும். தமிழ்நாட்டில் வீடு கட்டுவதற்கு முன் பொதுவாக தேவைப்படும் ஆவணங்களின் எளிய விளக்கம் இதோ."
              : "Clear documentation ensures legal security for your life savings. Here is a friendly, honest guide to common property documents in Tamil Nadu."}
          </p>
        </div>

        {/* Document Accordion Cards */}
        <div className="space-y-4 max-w-3xl mx-auto mb-10">
          {documents.map((doc) => {
            const isExpanded = expandedDoc === doc.id;
            return (
              <div
                key={doc.id}
                className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                  isExpanded
                    ? "bg-white border-[#B78A52] shadow-md"
                    : "bg-white/80 border-[#E2D9CC] hover:bg-white"
                }`}
              >
                <button
                  onClick={() => setExpandedDoc(isExpanded ? null : doc.id)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-3.5 min-w-0">
                    <span className="text-2xl flex-shrink-0">{doc.icon}</span>
                    <div className="min-w-0">
                      <h4 className="text-sm sm:text-base font-bold text-[#17191B] truncate">
                        {isTamil ? doc.nameTa : doc.nameEn}
                      </h4>
                      <p className="text-xs text-[#B78A52] font-medium mt-0.5 truncate font-mono">
                        {isTamil ? doc.purposeTa : doc.purposeEn}
                      </p>
                    </div>
                  </div>

                  <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center flex-shrink-0 text-slate-600">
                    {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </div>
                </button>

                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="px-5 pb-5 pt-1 border-t border-slate-100 space-y-3 text-xs"
                    >
                      <p className="text-slate-700 leading-relaxed text-xs sm:text-sm">
                        {isTamil ? doc.descTa : doc.descEn}
                      </p>

                      <div className="p-3 rounded-xl bg-[#F8F6F1] border border-[#E2D9CC] flex items-start gap-2.5">
                        <ShieldCheck className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                        <span className="text-[#202124] leading-relaxed font-medium">
                          <strong>{isTamil ? "முக்கியக் குறிப்பு: " : "Engineer's Tip: "}</strong>
                          {isTamil ? doc.tipTa : doc.tipEn}
                        </span>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* Responsible Engineering Disclaimer Box */}
        <div className="max-w-3xl mx-auto p-5 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 text-xs flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
          <div className="leading-relaxed">
            <h5 className="font-bold mb-1">
              {isTamil ? "சட்டப்பூர்வ வழிகாட்டல் குறிப்பு:" : "Responsible Legal Disclaimer:"}
            </h5>
            <p>
              {isTamil
                ? "ஊராட்சி, நகராட்சி மற்றும் நில வகையைப் பொறுத்து தேவையான ஆவணங்கள் மற்றும் அனுமதி கட்டணங்கள் மாறுபடலாம். ஒரு குறிப்பிட்ட ஆவணப் பட்டியலை மட்டும் வைத்து முழு சட்டப்பூர்வ உரிமையை உறுதி செய்ய முடியாது. ஜான்சி பில்டர்ஸ் உங்கள் நிலத்தின் ஆவணங்களை நேரில் சரிபார்த்து சரியான வழிகாட்டலை வழங்கும்."
                : "Building-approval requirements differ by local authority (Panchayat / Municipality), location, and land classification. No single checklist is universally sufficient. Jancy Builders reviews each client's plot records directly to advise on the exact statutory requirements without making false promises."}
            </p>
          </div>
        </div>

        {/* WhatsApp Assistance Button */}
        <div className="mt-8 text-center">
          <a
            href="https://wa.me/917708247124?text=Hello%20Er.%20Stalin,%20I%20have%20questions%20about%20my%20plot%20documents%20and%20building%20approval."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#17191B] hover:bg-[#25282B] text-white text-xs font-bold transition-all shadow-md"
          >
            <MessageCircle className="w-4 h-4 text-[#25D366]" />
            <span>
              {isTamil ? "ஆவணங்கள் பற்றி பொறியாளரிடம் இலவசமாக கேட்க" : "Ask Our Engineer About Your Documents (Free Advice)"}
            </span>
          </a>
        </div>

      </div>
    </section>
  );
}
