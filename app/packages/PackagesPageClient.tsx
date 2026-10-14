"use client";

import React, { useState } from "react";
import NavbarExact from "@/components/exact/NavbarExact";
import FooterExact from "@/components/exact/FooterExact";
import FloatingWhatsApp from "@/components/common/FloatingWhatsApp";
import QuoteModal from "@/components/quote/QuoteModal";
import ConstructionPackages from "@/components/sections/ConstructionPackages";
import EstimatorSection from "@/components/sections/EstimatorSection";
import MobileBottomBar from "@/components/mobile/MobileBottomBar";
import FloatingEngineerAssistant from "@/components/engineer/FloatingEngineerAssistant";

export default function PackagesPageClient() {
  const [isQuoteOpen, setIsQuoteOpen] = useState(false);
  const [selectedTier, setSelectedTier] = useState<"standard" | "premium" | "ultra">("premium");

  const handleOpenQuote = (tier?: "standard" | "premium" | "ultra") => {
    if (tier) setSelectedTier(tier);
    setIsQuoteOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#F8F6F1] text-[#202124] flex flex-col font-sans selection:bg-[#B78A52]/20 selection:text-[#B78A52]">
      {/* Navbar */}
      <NavbarExact onOpenQuote={() => handleOpenQuote()} />

      {/* Main Content */}
      <main className="flex-grow pt-28 sm:pt-32">
        {/* Full Construction Packages Comparison Showcase */}
        <ConstructionPackages onOpenQuote={handleOpenQuote} />

        {/* Real-time Turnkey Cost Estimator */}
        <EstimatorSection onOpenQuote={() => handleOpenQuote()} />
      </main>

      {/* Footer & Floating Guides */}
      <FooterExact />
      <FloatingWhatsApp />
      <FloatingEngineerAssistant onOpenQuote={() => handleOpenQuote()} />
      <MobileBottomBar onOpenQuote={() => handleOpenQuote()} />

      {/* Interactive Turnkey Quote Modal */}
      <QuoteModal
        isOpen={isQuoteOpen}
        onClose={() => setIsQuoteOpen(false)}
        initialGrade={selectedTier}
      />
    </div>
  );
}
