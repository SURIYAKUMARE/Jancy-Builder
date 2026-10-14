"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export type Language = "en" | "ta";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  isTamil: boolean;
}

const LanguageContext = createContext<LanguageContextType>({
  language: "en",
  setLanguage: () => {},
  toggleLanguage: () => {},
  isTamil: false,
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>("en");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Check saved preference or browser setting
    try {
      const savedLang = localStorage.getItem("jancy_language") as Language | null;
      if (savedLang === "en" || savedLang === "ta") {
        setLanguageState(savedLang);
      } else if (typeof navigator !== "undefined" && navigator.language?.startsWith("ta")) {
        setLanguageState("ta");
      }
    } catch (e) {
      // Ignore localStorage errors
    }
    setMounted(true);
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    try {
      localStorage.setItem("jancy_language", lang);
    } catch (e) {
      // Ignore localStorage errors
    }
    if (typeof document !== "undefined") {
      document.documentElement.lang = lang;
    }
  };

  const toggleLanguage = () => {
    const nextLang = language === "en" ? "ta" : "en";
    setLanguage(nextLang);
  };

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        toggleLanguage,
        isTamil: language === "ta",
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  return context;
}
