"use client";

import React, { useState, useEffect } from "react";
import { Phone, MessageCircle, Calculator, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface MobileBottomBarProps {
  onOpenQuote: () => void;
}

export default function MobileBottomBar({ onOpenQuote }: MobileBottomBarProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Show sticky bottom bar after scrolling past initial hero (120px)
    const handleScroll = () => {
      if (window.scrollY > 120) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    // Run once on mount in case page loaded scrolled down
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const whatsappMessage = encodeURIComponent(
    "Hello Jancy Builders, I would like to get a turnkey construction cost estimate and site consultation with Er. Sakay Antony Stalin."
  );
  const whatsappUrl = `https://wa.me/917708247124?text=${whatsappMessage}`;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.aside
          aria-label="Quick Actions"
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="fixed bottom-0 inset-x-0 z-40 md:hidden bg-[#111318]/95 backdrop-blur-xl border-t border-white/10 px-3 py-2.5 pb-[max(0.625rem,env(safe-area-inset-bottom))] shadow-2xl shadow-black/80"
        >
          <div className="max-w-md mx-auto flex items-center gap-2">
            {/* Primary Action: Get Free Estimate Modal */}
            <button
              onClick={onOpenQuote}
              className="flex-1 bg-[#B88746] hover:bg-[#a3753b] active:scale-[0.98] text-slate-950 font-bold text-xs sm:text-sm py-3 px-3.5 rounded-xl shadow-lg shadow-[#B88746]/25 flex items-center justify-center gap-1.5 transition-all select-none"
            >
              <Calculator className="w-4 h-4 stroke-[2.5]" />
              <span className="tracking-wide uppercase font-sans">Get Free Estimate</span>
              <ChevronRight className="w-3.5 h-3.5 stroke-[2.5]" />
            </button>

            {/* Quick Call Button */}
            <a
              href="tel:+917708247124"
              className="bg-white/10 hover:bg-white/20 active:scale-[0.98] text-white border border-white/15 font-semibold text-xs py-3 px-3.5 rounded-xl flex items-center justify-center gap-1.5 transition-all select-none"
              title="Call Er. Sakay Antony Stalin"
            >
              <Phone className="w-4 h-4 text-[#B88746]" />
              <span className="font-mono">Call</span>
            </a>

            {/* WhatsApp Quick Icon Button */}
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-11 h-11 bg-[#25D366] hover:bg-[#20ba5a] active:scale-[0.98] text-white rounded-xl flex items-center justify-center flex-shrink-0 shadow-md transition-all select-none"
              title="Chat on WhatsApp"
            >
              <MessageCircle className="w-5 h-5 fill-current" />
            </a>
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  );
}
