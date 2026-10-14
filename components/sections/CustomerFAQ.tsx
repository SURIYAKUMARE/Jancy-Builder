"use client";

import React, { useState } from "react";
import {
  HelpCircle,
  ChevronDown,
  ChevronUp,
  MessageCircle,
  PhoneCall,
  Sparkles,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";

export default function CustomerFAQ() {
  const { isTamil } = useLanguage();
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const faqs = [
    {
      qEn: "How much does one square foot cost to build?",
      qTa: "ஒரு சதுர அடி வீடு கட்ட எவ்வளவு செலவாகும்?",
      aEn:
        "In Tirunelveli district, our approved turnkey construction starts at ₹2,400/sq.ft for Standard Quality, ₹3,200/sq.ft for Premium Porotherm Eco-Thermal homes, and ₹4,400/sq.ft for Ultra Luxury villas. These rates include civil structure, electrical, plumbing, flooring, and painting—ready to move in.",
      aTa:
        "திருநெல்வேலி பகுதியில் எங்கள் முழுமையான டர்ன்கீ (Turnkey) கட்டுமானச் செலவு: தரமான வழக்கமான வீடு சதுர அடிக்கு ₹2,400; வெயிலில் குளுமை தரும் போரோதெர்ம் செங்கல் வீடு சதுர அடிக்கு ₹3,200; அதிநவீன ஆடம்பர வில்லா சதுர அடிக்கு ₹4,400. இதில் அஸ்திவாரம் முதல் டைல்ஸ், பெயிண்டிங், வயரிங் வரை அனைத்தும் அடங்கும்.",
    },
    {
      qEn: "How much money do I need to start construction?",
      qTa: "வீடு கட்டத் தொடங்க முதலில் எவ்வளவு பணம் வேண்டும்?",
      aEn:
        "You do not need full funds upfront. We operate strictly on milestone-based payments. You only need an initial booking/planning advance (typically 5–10%) to initiate 2D floor plans, 3D designs, and soil testing. Subsequent payments are made step-by-step as foundation, walls, and slabs are completed.",
      aTa:
        "வீடு கட்ட மொத்தப் பணமும் உடனே தேவையில்லை. வேலை நடக்கும் நிலைக்கு ஏற்ப மட்டுமே தவணையாகப் பணம் செலுத்த வேண்டும். வரைபடம், மண் பரிசோதனை மற்றும் திட்டமிடலுக்கு 5% முதல் 10% முன்பணம் போதுமானது. அஸ்திவாரம் முடிந்ததும் அடுத்த தவணை, கூரை போட்டதும் அடுத்த தவணை என கொடுக்கலாம்.",
    },
    {
      qEn: "How long does building an independent house take?",
      qTa: "ஒரு தனி வீடு கட்டி முடிக்க எவ்வளவு காலம் ஆகும்?",
      aEn:
        "A typical single-floor house (1,000–1,500 sq.ft) takes approximately 5 to 6 months. A duplex or ground+first floor residence (2,000–3,500 sq.ft) takes about 7 to 9 months. We provide a milestone-linked timeline in your written contract with daily progress updates.",
      aTa:
        "சுமார் 1,000 முதல் 1,500 சதுர அடி கொண்ட ஒரு மாடி வீடு கட்ட 5 முதல் 6 மாதங்கள் ஆகும். இரண்டு அடுக்கு கொண்ட பெரிய வீடு (2,000–3,500 ச.அடி) கட்ட 7 முதல் 9 மாதங்கள் வரை ஆகும். ஒப்பந்தத்தில் குறிப்பிட்ட அதே நாளில் வீட்டை ஒப்படைக்கிறோம்.",
    },
    {
      qEn: "Do I need official building approval before starting?",
      qTa: "வீடு கட்டத் தொடங்குவதற்கு முன் அரசு அனுமதி தேவையா?",
      aEn:
        "Yes. Before laying the foundation, a building plan prepared by a licensed civil engineer must be approved by the local Village Panchayat / Town Municipality / DTCP. This approval is mandatory to obtain lawful electricity (TNEB) connection, drinking water lines, and property tax registration.",
      aTa:
        "ஆம், நிச்சயமாக தேவை. உரிமம் பெற்ற சிவில் இன்ஜினியர் வரைந்த வரைபடத்தை உள்ளூர் ஊராட்சி அல்லது நகராட்சியில் சமர்ப்பித்து அனுமதி பெற வேண்டும். இது புதிய மின்சார இணைப்பு (EB) மற்றும் குடிநீர் இணைப்பு பெறுவதற்கு மிகவும் அவசியம்.",
    },
    {
      qEn: "Why is soil testing required for my plot?",
      qTa: "என் நிலத்திற்கு மண் பரிசோதனை (Soil Test) ஏன் தேவைப்படலாம்?",
      aEn:
        "Soil condition determines how deep and wide your foundation footings must be. Hard gravel, black cotton clay, or water-logged soil behave very differently. Soil testing (SBC) ensures your home never sinks or cracks due to underground ground movement.",
      aTa:
        "நிலத்தின் அடியில் உள்ள மண்ணின் தன்மைக்கேற்பவே அஸ்திவாரத்தின் ஆழம் மற்றும் அகலத்தை முடிவு செய்ய முடியும். களிமண் அல்லது மணல் பாங்கான நிலத்தில் சரியான அளவு அஸ்திவாரம் அமைக்காவிட்டால் சுவர்களில் விரிசல் விழும். அதைத் தவிர்க்கவே மண் பரிசோதனை செய்யப்படுகிறது.",
    },
    {
      qEn: "Which construction materials should I choose?",
      qTa: "எந்த கட்டுமானப் பொருட்களை நான் தேர்வு செய்ய வேண்டும்?",
      aEn:
        "Material selection depends on your climate, budget, and architectural design. For Tirunelveli's hot summers, Wienerberger Porotherm eco-thermal hollow clay bricks keep rooms 6°C cooler. For structural steel, Fe550D high-ductility rebar from certified brands like TATA Tiscon or JSW is recommended.",
      aTa:
        "உங்கள் பகுதி காலநிலைக்கு ஏற்ற பொருட்களைத் தேர்வு செய்ய வேண்டும். நெல்லை போன்ற வெயில் அதிகம் உள்ள பகுதிகளுக்கு போரோதெர்ம் குளுமை செங்கற்கள் மிகச் சிறந்தது. கம்பிக்கு TATA, JSW போன்ற Fe550D தரமான இரும்புக் கம்பிகள் பயன்படுத்த வேண்டும்.",
    },
    {
      qEn: "Can I build on a small or irregular plot?",
      qTa: "சிறிய அல்லது குறுக்கான இடத்தில் வீடு கட்ட முடியுமா?",
      aEn:
        "Yes, absolutely. Using smart architectural space planning, cross-ventilation, and double-height skylights, we can turn small plots (e.g., 20x30 or 25x40 ft) into bright, spacious, and highly functional luxury homes.",
      aTa:
        "தாராளமாக கட்டலாம்! சிறிய அல்லது குறுக்கான நிலங்களிலும் சரியான 2D கட்டிட வரைபடம், இயற்கை வெளிச்சம் மற்றும் காற்றோட்டம் கிடைக்கும் வகையில் மிக அழகாகவும் விசாலமாகவும் வீடு கட்ட முடியும்.",
    },
    {
      qEn: "Can I renovate or add a floor to my existing house?",
      qTa: "ஏற்கனவே இருக்கும் வீட்டை புதுப்பிக்கவோ அல்லது முதல் மாடி கட்டவோ முடியுமா?",
      aEn:
        "Yes. We first conduct an on-site structural stability audit: testing the existing columns, beam capacity, and foundation footing strength to confirm it can safely support an additional floor before beginning work.",
      aTa:
        "ஆம், செய்யலாம். ஆனால் முதலில் பழைய வீட்டின் தூண்கள் மற்றும் அஸ்திவாரம் கூடுதல் எடையைத் தாங்குமா என்பதை சிவில் இன்ஜினியர் நேரில் ஆய்வு செய்து உறுதி செய்த பிறகே முதல் மாடி கட்டத் தொடங்க வேண்டும்.",
    },
    {
      qEn: "How can I check the construction quality of my house?",
      qTa: "என் வீட்டின் கட்டுமானத் தரம் சரியாக இருப்பதை எப்படி அறிவது?",
      aEn:
        "At Jancy Builders, we believe in total transparency: we share NABL 28-day concrete cube compressive strength test reports, 15-Bar hydraulic pipe leak tests, and daily WhatsApp photographic logs directly with you.",
      aTa:
        "கான்கிரீட்டின் பலத்தை நிரூபிக்கும் லேப் ரிப்போர்ட் (Cube Test), பைப் லைன் கசிவு இல்லை என்பதை காட்டும் 15-பார் பிரஷர் டெஸ்ட் மற்றும் தினசரி வேலைத்தள புகைப்படங்களை வாடிக்கையாளர்களுக்கு நேரடியாக வாட்ஸ்அப்பில் பகிர்கிறோம்.",
    },
    {
      qEn: "What should I check before making payments to a builder?",
      qTa: "பில்டருக்கு பணம் கொடுப்பதற்கு முன் எதைச் சரிபார்க்க வேண்டும்?",
      aEn:
        "Always verify that the specific milestone agreed in your written contract (e.g. Roof concrete poured and cured) has been physically completed and inspected on-site before releasing the corresponding payment installment.",
      aTa:
        "ஒப்பந்தத்தில் பேசியபடி அந்த குறிப்பிட்ட வேலை (உதாரணமாக: கூரை கான்கிரீட் போடப்பட்டு நீர் நனைத்தல் முடிந்தது) தளத்தில் முழுமையாக நிறைவடைந்துள்ளதா என்பதை நீங்களே நேரில் பார்த்து உறுதி செய்த பிறகே அடுத்த தவணைப் பணத்தை விடுவிக்க வேண்டும்.",
    },
  ];

  return (
    <section id="faq" className="py-20 lg:py-28 bg-[#F8F6F1] text-[#202124] relative overflow-hidden border-t border-[#E2D9CC] scroll-mt-24">
      <div className="max-w-[1100px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 mb-3 px-3.5 py-1.5 rounded-full bg-[#B78A52]/10 border border-[#B78A52]/30">
            <span className="w-2 h-2 rounded-full bg-[#B78A52] animate-pulse" />
            <span className="text-[11px] font-mono font-bold uppercase tracking-[0.25em] text-[#B78A52]">
              {isTamil ? "வாடிக்கையாளர்களுக்கான தெளிவான பதில்கள்" : "HOMEOWNER QUESTIONS & ANSWERS"}
            </span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black text-[#17191B] tracking-tight font-sans">
            {isTamil ? "வீடு கட்டுவது பற்றி கேள்விகள் இருக்கிறதா?" : "Questions About Building a House?"}
          </h2>

          <p className="mt-3 text-sm sm:text-base text-[#55585D] max-w-2xl mx-auto leading-relaxed">
            {isTamil
              ? "தமிழ்நாட்டில் முதல்முறை வீடு கட்டும் குடும்பங்கள் அடிக்கடி கேட்கும் 10 முக்கியமான கேள்விகளுக்கான எளிய, நேர்மையான பதில்கள்."
              : "Clear, practical answers to common questions asked by families building their first home in Tamil Nadu."}
          </p>
        </div>

        {/* FAQ Accordion */}
        <div className="space-y-3.5">
          {faqs.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                  isOpen
                    ? "bg-white border-[#B78A52] shadow-md"
                    : "bg-white/80 border-[#E2D9CC] hover:bg-white"
                }`}
              >
                <button
                  onClick={() => setOpenIdx(isOpen ? null : idx)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-3">
                    <span className="w-7 h-7 rounded-full bg-[#B78A52]/15 text-[#B78A52] font-mono font-bold text-xs flex items-center justify-center flex-shrink-0">
                      {idx + 1}
                    </span>
                    <h3 className="text-sm sm:text-base font-bold text-[#17191B]">
                      {isTamil ? faq.qTa : faq.qEn}
                    </h3>
                  </div>

                  <div className="w-7 h-7 rounded-full bg-slate-100 flex items-center justify-center flex-shrink-0 text-slate-500">
                    {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </div>
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="px-5 pb-5 pt-1 border-t border-slate-100 text-xs sm:text-sm text-[#55585D] leading-relaxed"
                    >
                      <p>{isTamil ? faq.aTa : faq.aEn}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* Still Have Questions Box */}
        <div className="mt-12 text-center p-8 rounded-3xl bg-white border border-[#E2D9CC] shadow-sm">
          <h4 className="text-base sm:text-lg font-bold text-[#17191B] mb-1 font-sans">
            {isTamil ? "வேறு ஏதேனும் சந்தேகம் உள்ளதா?" : "Have a Question Specific to Your Plot?"}
          </h4>
          <p className="text-xs text-[#55585D] mb-5 max-w-md mx-auto">
            {isTamil
              ? "எங்கள் தலைமை பொறியாளர் Er. சகாய அந்தோணி ஸ்டாலின் அவர்களிடம் நேரடியாக பேசி உங்கள் சந்தேகங்களைத் தீர்த்துக் கொள்ளலாம்."
              : "Speak directly with Chief Civil Engineer Er. Sahaya Antony Stalin for personalized advice regarding your soil, plan, or budget."}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <a
              href="tel:+917708247124"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-[#17191B] hover:bg-[#25282B] text-white text-xs font-bold transition-all shadow-md"
            >
              <PhoneCall className="w-4 h-4 text-[#B78A52]" />
              <span>{isTamil ? "நேரடியாக அழைக்க (+91 77082 47124)" : "Call Engineer Directly (+91 77082 47124)"}</span>
            </a>
            <a
              href="https://wa.me/917708247124?text=Hello%20Er.%20Stalin,%20I%20have%20a%20question%20about%20building%20my%20home."
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-[#25D366] hover:bg-[#20ba5a] text-white text-xs font-bold transition-all shadow-md"
            >
              <MessageCircle className="w-4 h-4 fill-current" />
              <span>{isTamil ? "வாட்ஸ்அப்பில் பேச" : "Ask on WhatsApp"}</span>
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}
