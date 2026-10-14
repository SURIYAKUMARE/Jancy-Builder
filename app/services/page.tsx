import React from "react";
import type { Metadata } from "next";
import ServicesPageClient from "./ServicesPageClient";

export const metadata: Metadata = {
  title: "Civil Engineering & Construction Services | Jancy Builders",
  description:
    "Explore our verified architectural and civil engineering services: Turnkey Residential Villas, Commercial Landmarks, Porotherm Eco-Thermal Masonry, Structural Design, and Renovation.",
  alternates: {
    canonical: "/services",
  },
};

export default function ServicesPage() {
  return <ServicesPageClient />;
}
