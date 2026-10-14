export interface TranslationDict {
  nav: {
    home: string;
    about: string;
    services: string;
    packages: string;
    projects: string;
    guide: string;
    process: string;
    estimator: string;
    contact: string;
    callEngineer: string;
    getQuote: string;
    languageToggle: string;
  };
  hero: {
    badge: string;
    title: string;
    subtitle: string;
    btnStart: string;
    btnProjects: string;
    btnCost: string;
    statsYears: string;
    statsProjects: string;
    statsQuality: string;
  };
  starter: {
    badge: string;
    title: string;
    subtitle: string;
    q1Title: string;
    q1Yes: string;
    q1No: string;
    q1Planning: string;
    q2Title: string;
    q2Placeholder: string;
    q3Title: string;
    q3Single: string;
    q3GroundFirst: string;
    q3Duplex: string;
    q3NotSure: string;
    q4Title: string;
    q5Title: string;
    q5Immediate: string;
    q5ThreeMonths: string;
    q5SixMonths: string;
    q5Exploring: string;
    summaryTitle: string;
    summaryDesc: string;
    nextSteps: string;
    whatsappBtn: string;
    restartBtn: string;
  };
  process: {
    badge: string;
    title: string;
    subtitle: string;
    listenBtn: string;
    listeningBtn: string;
  };
  materials: {
    badge: string;
    title: string;
    subtitle: string;
    explainSimply: string;
    showEngineering: string;
    whatIsIt: string;
    whereUsed: string;
    whyImportant: string;
    qualityChecks: string;
    askEngineer: string;
  };
  documents: {
    badge: string;
    title: string;
    subtitle: string;
    disclaimer: string;
    helpText: string;
  };
  trust: {
    badge: string;
    title: string;
    subtitle: string;
  };
  faq: {
    badge: string;
    title: string;
    subtitle: string;
  };
  contact: {
    badge: string;
    title: string;
    subtitle: string;
    callNow: string;
    chatWhatsapp: string;
    requestCallback: string;
    formTitle: string;
    nameLabel: string;
    phoneLabel: string;
    locationLabel: string;
    helpLabel: string;
    submitBtn: string;
    submittingBtn: string;
    successMsg: string;
    privacyNote: string;
  };
}

export const translations: Record<"en" | "ta", TranslationDict> = {
  en: {
    nav: {
      home: "Home",
      about: "About Us",
      services: "Our Services",
      packages: "Packages",
      projects: "Our Projects",
      guide: "Building Guide",
      process: "How We Build",
      estimator: "Cost Calculator",
      contact: "Contact",
      callEngineer: "Call Er. Stalin",
      getQuote: "Free Estimate",
      languageToggle: "தமிழ்",
    },
    hero: {
      badge: "PROFESSIONAL CIVIL ENGINEERING • TIRUNELVELI",
      title: "Your Dream Home Starts Here.",
      subtitle:
        "From planning to construction, we guide you through every step of building your home with complete transparency and zero stress.",
      btnStart: "Start Building Your Home",
      btnProjects: "View Our Projects",
      btnCost: "Check Construction Cost",
      statsYears: "Years Experience",
      statsProjects: "Homes Built",
      statsQuality: "NABL Quality Tested",
    },
    starter: {
      badge: "FIRST-TIME HOMEOWNER HELPER",
      title: "Let's Plan Your House",
      subtitle: "Answer 5 simple questions to understand where to begin, what you need, and your next steps.",
      q1Title: "1. Do you already own land?",
      q1Yes: "Yes, I Have Land",
      q1No: "No Land Yet",
      q1Planning: "Planning to Buy Land",
      q2Title: "2. Where do you want to build?",
      q2Placeholder: "e.g. Samugarengapuram, Tirunelveli, Valliyur",
      q3Title: "3. What type of house do you want?",
      q3Single: "Single Floor House (Ground Floor)",
      q3GroundFirst: "Ground + 1st Floor (G+1)",
      q3Duplex: "Luxury Duplex House",
      q3NotSure: "Not Sure Yet / Need Advice",
      q4Title: "4. What is your approximate budget?",
      q5Title: "5. When do you want to start?",
      q5Immediate: "Immediately (This Month)",
      q5ThreeMonths: "Within 3 Months",
      q5SixMonths: "Within 6 Months",
      q5Exploring: "Just Exploring Ideas",
      summaryTitle: "Your Home Building Roadmap",
      summaryDesc: "Based on your selections, here is your practical roadmap to construct your home:",
      nextSteps: "Recommended Immediate Steps:",
      whatsappBtn: "Share Summary on WhatsApp with Er. Stalin",
      restartBtn: "Start Over",
    },
    process: {
      badge: "STEP-BY-STEP EXPLANATION",
      title: "How We Build Your Home",
      subtitle:
        "Building a home does not have to be confusing. Here is what happens from our very first meeting to the day you receive your keys.",
      listenBtn: "Listen to Explanation",
      listeningBtn: "Speaking...",
    },
    materials: {
      badge: "MATERIALS EXPLAINED SIMPLY",
      title: "Know What Goes Into Your Home",
      subtitle:
        "You do not need an engineering degree to understand construction materials. Here is what we use, why it matters, and what to check.",
      explainSimply: "Explain Simply",
      showEngineering: "Detailed Engineering Specs",
      whatIsIt: "What is it?",
      whereUsed: "Where is it used in your home?",
      whyImportant: "Why is it important?",
      qualityChecks: "What quality check matters?",
      askEngineer: "What should you ask your engineer?",
    },
    documents: {
      badge: "ESSENTIAL LEGAL & LAND RECORDS",
      title: "Documents You May Need",
      subtitle:
        "Clear land records ensure smooth building approvals and safe investment. Here is an easy guide to the common documents required in Tamil Nadu.",
      disclaimer:
        "Note: Exact approval requirements differ based on local panchayat / municipality and land classification. We guide every client through their specific requirements.",
      helpText: "Have questions about your plot documents? Send us a message on WhatsApp for friendly advice.",
    },
    trust: {
      badge: "CUSTOMER PEACE OF MIND",
      title: "What Should You Know Before Starting Construction?",
      subtitle:
        "Building a home is your life's dream. Here are the transparent protections you deserve from any civil engineer or contractor.",
    },
    faq: {
      badge: "CLEAR ANSWERS FOR HOMEOWNERS",
      title: "Questions About Building a House?",
      subtitle:
        "Honest, practical answers to common questions asked by families building their first home in Tamil Nadu.",
    },
    contact: {
      badge: "DIRECT ENGINEER ACCESS",
      title: "Talk to Our Engineer",
      subtitle:
        "Speak directly with Er. Sahaya Antony Stalin, B.E. (Civil). No salesmen, no middle-men — just honest engineering guidance.",
      callNow: "Call Now (+91 77082 47124)",
      chatWhatsapp: "Chat on WhatsApp",
      requestCallback: "Request a Callback",
      formTitle: "Send a Simple Message",
      nameLabel: "Your Name",
      phoneLabel: "Phone Number",
      locationLabel: "Plot / Construction Location",
      helpLabel: "What help do you need?",
      submitBtn: "Request Free Consultation",
      submittingBtn: "Submitting...",
      successMsg: "Thank you! Er. Stalin will personally call you within 24 hours.",
      privacyNote: "We respect your privacy. Your phone number is strictly used for your project consultation.",
    },
  },
  ta: {
    nav: {
      home: "முகப்பு",
      about: "எங்களைப் பற்றி",
      services: "எங்கள் சேவைகள்",
      packages: "கட்டுமானத் தொகுப்புகள்",
      projects: "எங்கள் பணிகள்",
      guide: "கட்டுமான வழிகாட்டி",
      process: "கட்டுமான முறை",
      estimator: "செலவுக் கணக்கீடு",
      contact: "தொடர்பு",
      callEngineer: "பொறியாளரை அழைக்க",
      getQuote: "இலவச மதிப்பீடு",
      languageToggle: "English",
    },
    hero: {
      badge: "நம்பகமான சிவில் இன்ஜினியரிங் • திருநெல்வேலி",
      title: "உங்கள் கனவு இல்லம் இங்கே தொடங்குகிறது.",
      subtitle:
        "வீட்டுத் திட்டம் முதல் கட்டுமானம் வரை, ஒவ்வொரு கட்டத்திலும் முழுமையான வெளிப்படைத்தன்மையுடன் உங்களுக்கு வழிகாட்டுகிறோம்.",
      btnStart: "உங்கள் வீட்டு கட்டுமானத்தைத் தொடங்குங்கள்",
      btnProjects: "எங்கள் கட்டுமானப் பணிகளைப் பாருங்கள்",
      btnCost: "வீடு கட்டும் செலவை அறிய",
      statsYears: "ஆண்டுகள் அனுபவம்",
      statsProjects: "கட்டி முடிக்கப்பட்ட வீடுகள்",
      statsQuality: "NABL தரப் பரிசோதனை",
    },
    starter: {
      badge: "முதன்முறை வீடு கட்டுவோருக்கான உதவி",
      title: "உங்கள் வீட்டைத் திட்டமிடுவோம்",
      subtitle: "5 எளிய கேள்விகளுக்கு பதிலளித்து, நீங்கள் எங்கு தொடங்க வேண்டும், என்னென்ன தேவை என்பதை எளிமையாக தெரிந்துகொள்ளுங்கள்.",
      q1Title: "1. உங்களிடம் ஏற்கனவே நிலம் இருக்கிறதா?",
      q1Yes: "ஆம், என்னிடம் நிலம் இருக்கிறது",
      q1No: "இல்லை, நிலம் இல்லை",
      q1Planning: "நான் நிலம் வாங்கப் போகிறேன்",
      q2Title: "2. எந்த ஊரில் வீடு கட்டப் போகிறீர்கள்?",
      q2Placeholder: "எ.கா: சாமுகரெங்கபுரம், திருநெல்வேலி, வள்ளியூர்",
      q3Title: "3. எந்த மாதிரியான வீடு வேண்டும்?",
      q3Single: "ஒரு மாடி வீடு (தரைத் தளம் மட்டும்)",
      q3GroundFirst: "தரைத் தளம் + முதல் தளம் (G+1)",
      q3Duplex: "டூப்ளக்ஸ் வீடு",
      q3NotSure: "இன்னும் முடிவு செய்யவில்லை / ஆலோசனை வேண்டும்",
      q4Title: "4. உங்கள் வீட்டிற்கான தோராயமான பட்ஜெட் எவ்வளவு?",
      q5Title: "5. எப்போது கட்டுமானத்தைத் தொடங்க விரும்புகிறீர்கள்?",
      q5Immediate: "உடனடியாக (இந்த மாதமே)",
      q5ThreeMonths: "3 மாதங்களுக்குள்",
      q5SixMonths: "6 மாதங்களுக்குள்",
      q5Exploring: "இப்போதைக்கு தெரிந்துகொள்ள மட்டும்",
      summaryTitle: "உங்கள் வீடு கட்டும் வழிகாட்டி அறிக்கை",
      summaryDesc: "உங்கள் பதில்களின்படி, வீடு கட்ட நீங்கள் பின்பற்ற வேண்டிய எளிய வழிமுறைகள் இதோ:",
      nextSteps: "உடனடியாக செய்ய வேண்டிய முக்கிய படிகள்:",
      whatsappBtn: "இந்த விவரங்களை வாட்ஸ்அப்பில் பொறியாளருக்கு அனுப்ப",
      restartBtn: "மீண்டும் தொடங்குக",
    },
    process: {
      badge: "படிப்படியான எளிய விளக்கம்",
      title: "உங்கள் வீடு எப்படி கட்டப்படுகிறது?",
      subtitle:
        "வீடு கட்டுவது கடினமான விஷயம் அல்ல. நீங்கள் எங்களைச் சந்திக்கும் முதல் நாள் முதல் சாவி ஒப்படைக்கும் நாள் வரை என்னென்ன நடக்கும் என்பதை விளக்குகிறோம்.",
      listenBtn: "கேட்டுத் தெரிந்துகொள்ளுங்கள்",
      listeningBtn: "பேசுகிறது...",
    },
    materials: {
      badge: "பொருட்கள் பற்றிய எளிய புரிதல்",
      title: "உங்கள் வீட்டில் பயன்படுத்தப்படும் பொருட்களை அறிந்துகொள்ளுங்கள்",
      subtitle:
        "கட்டுமானப் பொருட்களைப் புரிந்துகொள்ள நீங்கள் பொறியியல் படிக்க வேண்டியதில்லை. எந்தப் பொருள் எதற்கு பயன்படுகிறது, எதை கவனிக்க வேண்டும் என்பதை இங்கே பாருங்கள்.",
      explainSimply: "எளிமையாக விளக்குங்கள்",
      showEngineering: "விரிவான தொழில்நுட்ப விவரங்கள்",
      whatIsIt: "இது என்ன பொருள்?",
      whereUsed: "உங்கள் வீட்டில் எங்கு பயன்படுத்தப்படுகிறது?",
      whyImportant: "இது ஏன் முக்கியமானது?",
      qualityChecks: "எந்தத் தரத்தை சரிபார்க்க வேண்டும்?",
      askEngineer: "பொறியாளரிடம் என்ன கேட்க வேண்டும்?",
    },
    documents: {
      badge: "முக்கியமான நில மற்றும் சட்ட ஆவணங்கள்",
      title: "வீடு கட்டத் தேவையான ஆவணங்கள்",
      subtitle:
        "சரியான நில ஆவணங்கள் உங்கள் வீட்டின் பாதுகாப்பான முதலீட்டை உறுதி செய்கின்றன. தமிழ்நாட்டில் வீடு கட்ட பொதுவாக தேவைப்படும் ஆவணங்களின் எளிய விளக்கம்.",
      disclaimer:
        "குறிப்பு: ஊராட்சி, நகராட்சி மற்றும் நில வகையைப் பொறுத்து தேவையான ஆவணங்கள் மாறுபடலாம். உங்கள் நிலத்திற்கு ஏற்ப தேவையான ஆவணங்களை நாங்களே சரிபார்த்து வழிகாட்டுகிறோம்.",
      helpText: "உங்கள் நிலத்தின் ஆவணங்கள் பற்றி சந்தேகம் உள்ளதா? வாட்ஸ்அப்பில் எங்களுக்கு செய்தி அனுப்புங்கள், உதவத் தயாராக இருக்கிறோம்.",
    },
    trust: {
      badge: "வாடிக்கையாளர் பாதுகாப்பு & வெளிப்படைத்தன்மை",
      title: "வீடு கட்டுவதற்கு முன் தெரிந்துகொள்ள வேண்டியவை",
      subtitle:
        "வீடு கட்டுவது உங்கள் வாழ்நாள் கனவு. எந்தவொரு பில்டர் அல்லது பொறியாளரிடமும் நீங்கள் எதிர்பார்க்க வேண்டிய அடிப்படை உரிமைகள் மற்றும் பாதுகாப்பு முறைகள்.",
    },
    faq: {
      badge: "வாடிக்கையாளர்களுக்கான தெளிவான பதில்கள்",
      title: "வீடு கட்டுவது பற்றி கேள்விகள் இருக்கிறதா?",
      subtitle:
        "தமிழ்நாட்டில் முதல்முறை வீடு கட்டும் குடும்பங்கள் அடிக்கடி கேட்கும் முக்கியமான கேள்விகளுக்கு எளிய மற்றும் உண்மையான பதில்கள்.",
    },
    contact: {
      badge: "பொறியாளருடன் நேரடித் தொடர்பு",
      title: "எங்கள் பொறியாளரிடம் பேசுங்கள்",
      subtitle:
        "தலைமை சிவில் பொறியாளர் Er. சகாய அந்தோணி ஸ்டாலின் அவர்களிடம் நேரடியாகப் பேசுங்கள். புரோக்கர்கள் அல்லது இடைத்தரகர்கள் இல்லை — நேர்மையான வழிகாட்டல் மட்டுமே.",
      callNow: "இப்போது அழைக்கவும் (+91 77082 47124)",
      chatWhatsapp: "வாட்ஸ்அப்பில் பேசவும்",
      requestCallback: "திரும்ப அழைக்கக் கோரவும்",
      formTitle: "எளிய செய்தி அனுப்பவும்",
      nameLabel: "உங்கள் பெயர்",
      phoneLabel: "தொலைபேசி எண்",
      locationLabel: "நிலம் / கட்டுமான இடம்",
      helpLabel: "உங்களுக்கு என்ன உதவி வேண்டும்?",
      submitBtn: "இலவச ஆலோசனையை பெறுக",
      submittingBtn: "அனுப்பப்படுகிறது...",
      successMsg: "நன்றி! பொறியாளர் ஸ்டாலின் அவர்கள் 24 மணி நேரத்திற்குள் உங்களை அழைப்பார்.",
      privacyNote: "உங்கள் தகவல்கள் பாதுகாப்பாக வைக்கப்படும். உங்கள் தொலைபேசி எண் ஆலோசனைக்கு மட்டுமே பயன்படுத்தப்படும்.",
    },
  },
};
