"use client";

import React, { useState } from "react";
import { HeroConfig } from "@/types/hero";
import NavbarExact from "@/components/exact/NavbarExact";
import HeroExact from "@/components/exact/HeroExact";
import ServicesExact from "@/components/exact/ServicesExact";
import ProjectsExact from "@/components/exact/ProjectsExact";
import EngineerProfileSection from "@/components/sections/EngineerProfileSection";
import ConstructionProcessUnified from "@/components/sections/ConstructionProcessUnified";
import EstimatorSection from "@/components/sections/EstimatorSection";
import VisitOfficeSection from "@/components/office/VisitOfficeSection";
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
    <div className="min-h-screen w-full overflow-x-hidden bg-[#000000] text-[#FFFFFF] flex flex-col font-body selection:bg-[#C9A46B] selection:text-[#000000]">
      {/* 0. CINEMATIC ARCHITECTURAL CAD HAIRLINE INTRO */}
      <BrandIntro />

      {/* 1. FLOATING LIQUID GLASS NAVBAR */}
      <NavbarExact
        onOpenQuote={() => handleOpenQuoteWithTier()}
        onOpenAppointment={() => handleOpenAppointment("office_visit")}
      />

      {/* CANONICAL 8-SECTION CINEMATIC LIQUID-GLASS ARCHITECTURAL FLOW */}
      <main className="flex-grow">
        {/* SECTION 1: FULLSCREEN CINEMATIC HERO */}
        <HeroExact
          onOpenQuote={() => handleOpenQuoteWithTier()}
          onOpenAppointmentModal={() => handleOpenAppointment("house_construction")}
        />

        {/* SECTION 2: FULLSCREEN CAPABILITIES / SERVICES */}
        <ServicesExact onOpenQuote={() => handleOpenQuoteWithTier()} />

        {/* SECTION 3: CINEMATIC REAL PROJECT PORTFOLIO (257 REAL PHOTOS) */}
        <ProjectsExact onOpenQuote={() => handleOpenQuoteWithTier()} />

        {/* SECTION 4: MEET THE REAL ENGINEER (ER. SAHAYA ANTONY STALIN) */}
        <EngineerProfileSection
          onOpenAppointmentModal={() => handleOpenAppointment("consultation")}
          onOpenQuoteModal={() => handleOpenQuoteWithTier("premium")}
        />

        {/* SECTION 5: CONSTRUCTION JOURNEY (6 UNIFIED STAGES) */}
        <ConstructionProcessUnified onOpenQuote={() => handleOpenQuoteWithTier()} />

        {/* SECTION 6: CONSTRUCTION COST ESTIMATOR (DARK LIQUID GLASS) */}
        <EstimatorSection onOpenQuote={() => handleOpenQuoteWithTier()} />

        {/* SECTION 7: VISIT OUR OFFICE (SAMUGARENGAPURAM HQ) */}
        <VisitOfficeSection
          onOpenAppointmentModal={() => handleOpenAppointment("office_visit")}
        />

        {/* SECTION 8: CONTACT FORM (POSTS TO /api/enquiries) */}
        <ContactSection />
      </main>

      {/* PURE BLACK CINEMATIC FOOTER WITH FINAL CTA */}
      <FooterExact />

      {/* FLOATING WHATSAPP BUTTON */}
      <FloatingWhatsApp />

      {/* MOBILE FLOATING ACTION BAR */}
      <MobileBottomBar onOpenQuote={() => handleOpenQuoteWithTier()} />

      {/* COST ESTIMATE & DETAILED QUOTE MODAL */}
      <QuoteModal
        isOpen={isQuoteModalOpen}
        onClose={() => setIsQuoteModalOpen(false)}
        initialGrade={selectedPackageGrade}
      />

      {/* PHYSICAL OFFICE APPOINTMENT BOOKING MODAL */}
      <AppointmentModal
        isOpen={isAppointmentModalOpen}
        onClose={() => setIsAppointmentModalOpen(false)}
        defaultPurpose={appointmentPurpose}
      />
    </div>
  );
}
