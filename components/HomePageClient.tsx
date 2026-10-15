"use client";

import React, { useState, useEffect } from "react";
import { HeroConfig } from "@/types/hero";
import NavbarExact from "@/components/exact/NavbarExact";
import HeroExact from "@/components/exact/HeroExact";
import EngineerProfileSection from "@/components/sections/EngineerProfileSection";
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
import VisitOfficeSection from "@/components/office/VisitOfficeSection";
import CustomerFAQ from "@/components/sections/CustomerFAQ";
import ContactSection from "@/components/sections/ContactSection";
import FooterExact from "@/components/exact/FooterExact";
import FloatingWhatsApp from "@/components/common/FloatingWhatsApp";
import QuoteModal from "@/components/quote/QuoteModal";
import AppointmentModal from "@/components/office/AppointmentModal";
import BrandIntro from "@/components/intro/BrandIntro";
import MobileBottomBar from "@/components/mobile/MobileBottomBar";

interface HomePageClientProps {
  initialConfig: HeroConfig;
}

export default function HomePageClient({ initialConfig }: HomePageClientProps) {
  const [config, setConfig] = useState<HeroConfig>(initialConfig);
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState<boolean>(false);
  const [isAppointmentModalOpen, setIsAppointmentModalOpen] = useState<boolean>(false);
  const [appointmentPurpose, setAppointmentPurpose] = useState<string>("house_construction");
  const [selectedPackageGrade, setSelectedPackageGrade] = useState<"standard" | "premium" | "ultra">("premium");

  const handleOpenQuoteWithTier = (tier?: "standard" | "premium" | "ultra") => {
    if (tier) setSelectedPackageGrade(tier);
    setIsQuoteModalOpen(true);
  };

  const handleOpenAppointment = (purpose: string = "house_construction") => {
    setAppointmentPurpose(purpose);
    setIsAppointmentModalOpen(true);
  };

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-[#F8F6F1] text-[#202124] flex flex-col font-sans selection:bg-[#B78A52]/20 selection:text-[#B78A52]">
      {/* 0. ARCHITECTURAL HAIRLINE INTRO ANIMATION */}
      <BrandIntro />

      {/* 1. EXACT WHITE NAVBAR */}
      <NavbarExact
        onOpenQuote={() => handleOpenQuoteWithTier()}
        onOpenAppointment={() => handleOpenAppointment("office_visit")}
      />

      {/* COMPLETE PROFESSIONAL & REAL CIVIL ENGINEERING PORTAL */}
      <main className="flex-grow">
        {/* 1. HOME: AUTHENTIC PHOTOGRAPHY & DIRECT CIVIL ENGINEERING HERO */}
        <HeroExact
          onOpenQuote={() => handleOpenQuoteWithTier()}
          onOpenAppointmentModal={() => handleOpenAppointment("house_construction")}
        />

        {/* 2. CHIEF CIVIL ENGINEER PROFILE: ER. SAHAYA ANTONY STALIN */}
        <EngineerProfileSection
          onOpenAppointmentModal={() => handleOpenAppointment("consultation")}
          onOpenQuoteModal={() => handleOpenQuoteWithTier("premium")}
        />

        {/* 3. HOUSE PLANNING STARTER: 5-STEP HOMEOWNER HELPER & ROADMAP */}
        <HousePlanningStarter onOpenQuote={() => handleOpenQuoteWithTier()} />

        {/* 4. ABOUT JANCY BUILDERS: EDITORIAL FOUNDER CREED & PILLARS (#about) */}
        <AboutEditorial onOpenQuote={() => handleOpenQuoteWithTier()} />

        {/* 5. SERVICES: 4 ARCHITECTURAL DISCIPLINES (#services) */}
        <ServicesExact onOpenQuote={() => handleOpenQuoteWithTier()} />

        {/* 6. CONSTRUCTION PACKAGES: SPECIFICATIONS & ITEMIZATION (#packages) */}
        <ConstructionPackages onOpenQuote={handleOpenQuoteWithTier} />

        {/* 7. OUR PROJECTS: 257 AUTHENTIC SITE PHOTOS & BEFORE/AFTER (#projects) */}
        <ProjectsExact onOpenQuote={() => handleOpenQuoteWithTier()} />

        {/* 8. CONSTRUCTION PROCESS: 8-STAGE WORKFLOW & MILESTONES */}
        <ConstructionProcessUnified onOpenQuote={() => handleOpenQuoteWithTier()} />

        {/* 9. HOMEOWNER CONSTRUCTION GUIDE (#guide) */}
        <section id="guide" className="scroll-mt-24">
          {/* MATERIALS EXPLAINED SIMPLY: WHAT GOES INTO YOUR HOME */}
          <MaterialsExplained />

          {/* DOCUMENT GUIDANCE: ESSENTIAL LAND & APPROVAL RECORDS */}
          <DocumentGuidance />

          {/* CUSTOMER TRUST & PROTECTIONS: WHAT YOU MUST KNOW BEFORE BUILDING */}
          <CustomerTrust />
        </section>

        {/* 10. COST ESTIMATOR: INTERACTIVE SLIDER & INSTANT BOQ GENERATOR (#estimator) */}
        <EstimatorSection onOpenQuote={() => handleOpenQuoteWithTier()} />

        {/* 11. PHYSICAL OFFICE & VISITS: SAMUGARENGAPURAM HQ (#office) */}
        <VisitOfficeSection
          onOpenAppointmentModal={() => handleOpenAppointment("office_visit")}
        />

        {/* 12. CUSTOMER FAQ: HONEST ANSWERS FOR FIRST-TIME BUILDERS */}
        <CustomerFAQ />

        {/* 13. CONTACT: DIRECT ENGINEER LINE & ENQUIRIES (#contact) */}
        <ContactSection />
      </main>

      {/* 14. FOOTER */}
      <FooterExact />

      {/* 15. FLOATING WHATSAPP BUTTON */}
      <FloatingWhatsApp />

      {/* 16. MOBILE STICKY BOTTOM ACTION BAR */}
      <MobileBottomBar onOpenQuote={() => handleOpenQuoteWithTier()} />

      {/* 17. COST ESTIMATE & DETAILED QUOTE MODAL */}
      <QuoteModal
        isOpen={isQuoteModalOpen}
        onClose={() => setIsQuoteModalOpen(false)}
        initialGrade={selectedPackageGrade}
      />

      {/* 18. PHYSICAL OFFICE APPOINTMENT BOOKING MODAL */}
      <AppointmentModal
        isOpen={isAppointmentModalOpen}
        onClose={() => setIsAppointmentModalOpen(false)}
        defaultPurpose={appointmentPurpose}
      />
    </div>
  );
}
