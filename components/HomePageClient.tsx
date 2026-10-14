"use client";

import React, { useState } from "react";
import NavbarExact from "@/components/exact/NavbarExact";
import HeroExact from "@/components/exact/HeroExact";
import EngineerProfileSection from "@/components/sections/EngineerProfileSection";
import OfficeSection from "@/components/sections/OfficeSection";
import HousePlanningStarter from "@/components/sections/HousePlanningStarter";
import AboutEditorial from "@/components/sections/AboutEditorial";
import ServicesExact from "@/components/exact/ServicesExact";
import ConstructionPackages from "@/components/sections/ConstructionPackages";
import ProjectsExact from "@/components/exact/ProjectsExact";
import ConstructionProcessUnified from "@/components/sections/ConstructionProcessUnified";
import MaterialsExplained from "@/components/sections/MaterialsExplained";
import DocumentGuidance from "@/components/sections/DocumentGuidance";
import CustomerTrust from "@/components/sections/CustomerTrust";
import EstimatorSection from "@/components/sections/EstimatorSection";
import CustomerFAQ from "@/components/sections/CustomerFAQ";
import ContactSection from "@/components/sections/ContactSection";
import FooterExact from "@/components/exact/FooterExact";
import FloatingWhatsApp from "@/components/common/FloatingWhatsApp";
import QuoteModal from "@/components/quote/QuoteModal";
import AppointmentModal from "@/components/office/AppointmentModal";
import MobileBottomBar from "@/components/mobile/MobileBottomBar";

interface HomePageClientProps {
  initialConfig?: any;
}

export default function HomePageClient({ initialConfig }: HomePageClientProps = {}) {
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState<boolean>(false);
  const [selectedPackageGrade, setSelectedPackageGrade] = useState<"standard" | "premium" | "ultra">("premium");
  const [isAppointmentModalOpen, setIsAppointmentModalOpen] = useState<boolean>(false);

  const handleOpenQuoteWithTier = (tier?: "standard" | "premium" | "ultra") => {
    if (tier) setSelectedPackageGrade(tier);
    setIsQuoteModalOpen(true);
  };

  const handleOpenAppointment = () => {
    setIsAppointmentModalOpen(true);
  };

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-[#F8F6F1] text-[#202124] flex flex-col font-sans selection:bg-[#B78A52]/20 selection:text-[#B78A52]">
      {/* 1. EXACT WHITE NAVBAR WITH BILINGUAL TOGGLE & OFFICE LINK */}
      <NavbarExact
        onOpenQuote={() => handleOpenQuoteWithTier()}
        onOpenAppointment={handleOpenAppointment}
      />

      {/* COMPLETE PROFESSIONAL & REALISTIC CONSTRUCTION STRUCTURE */}
      <main className="flex-grow">
        {/* 1. HOME: CINEMATIC REAL-PHOTO HERO WITH USER HEADINGS & 3 MAIN BUTTONS */}
        <HeroExact
          onOpenQuote={() => handleOpenQuoteWithTier()}
          onOpenAppointment={handleOpenAppointment}
        />

        {/* 2. GENUINE CIVIL ENGINEER INTRODUCTION & GUIDANCE (Er. Sahaya Antony Stalin, B.E.) */}
        <EngineerProfileSection
          onOpenAppointment={handleOpenAppointment}
          onOpenConsultation={() => handleOpenQuoteWithTier("premium")}
        />

        {/* 3. HOUSE PLANNING STARTER: 5-STEP HOMEOWNER HELPER & ROADMAP */}
        <HousePlanningStarter onOpenQuote={() => handleOpenQuoteWithTier()} />

        {/* 4. ABOUT JANCY BUILDERS: EDITORIAL FOUNDER CREED & VERIFIED PILLARS */}
        <AboutEditorial onOpenQuote={() => handleOpenQuoteWithTier()} />

        {/* 5. SERVICES: 4 ARCHITECTURAL & CIVIL DISCIPLINES */}
        <ServicesExact onOpenQuote={() => handleOpenQuoteWithTier()} />

        {/* 6. CONSTRUCTION PACKAGES: DEEJOS-INSPIRED COMPARISON & MATRIX */}
        <ConstructionPackages onOpenQuote={handleOpenQuoteWithTier} />

        {/* 7. REAL PROJECT PORTFOLIO: 257 AUTHENTIC SITE PHOTOS & BEFORE/AFTER */}
        <ProjectsExact onOpenQuote={() => handleOpenQuoteWithTier()} />

        {/* 8. CONSTRUCTION PROCESS: 6 CANONICAL STAGES WITH AUDIO NARRATION */}
        <ConstructionProcessUnified onOpenQuote={() => handleOpenQuoteWithTier()} />

        {/* 9. MATERIALS EXPLAINED SIMPLY: WHAT GOES INTO YOUR HOME */}
        <MaterialsExplained />

        {/* 10. DOCUMENT GUIDANCE: ESSENTIAL LAND & BUILDING APPROVAL RECORDS */}
        <DocumentGuidance />

        {/* 11. VISIT OUR OFFICE (JANCY HOME, SAMUGARENGAPURAM - CONFIRMED HOURS & MAPS) */}
        <OfficeSection onOpenAppointment={handleOpenAppointment} />

        {/* 12. CUSTOMER TRUST & PROTECTIONS: WHAT YOU MUST KNOW BEFORE BUILDING */}
        <CustomerTrust />

        {/* 13. COST ESTIMATOR: TRANSPARENT RATES & INSTANT BOQ GENERATOR */}
        <EstimatorSection onOpenQuote={() => handleOpenQuoteWithTier()} />

        {/* 14. CUSTOMER FAQ: HONEST ANSWERS FOR FIRST-TIME HOMEOWNERS */}
        <CustomerFAQ />

        {/* 15. CONTACT: SAMUGARENGAPURAM HQ & DIRECT ENQUIRY FORM */}
        <ContactSection />
      </main>

      {/* 16. EXACT DARK FOOTER */}
      <FooterExact />

      {/* 17. FLOATING WHATSAPP BUTTON WITH RADAR PING */}
      <FloatingWhatsApp />

      {/* 18. MOBILE STICKY BOTTOM ACTION BAR */}
      <MobileBottomBar onOpenQuote={() => handleOpenQuoteWithTier()} />

      {/* 19. WORKING APPOINTMENT BOOKING MODAL */}
      <AppointmentModal
        isOpen={isAppointmentModalOpen}
        onClose={() => setIsAppointmentModalOpen(false)}
      />

      {/* 20. ESTIMATE & QUOTE MODAL */}
      <QuoteModal
        isOpen={isQuoteModalOpen}
        onClose={() => setIsQuoteModalOpen(false)}
        initialGrade={selectedPackageGrade}
      />
    </div>
  );
}
