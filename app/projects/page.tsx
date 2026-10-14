import React from "react";
import type { Metadata } from "next";
import ProjectsPageClient from "./ProjectsPageClient";

export const metadata: Metadata = {
  title: "Architectural Portfolio & Work Sites | Jancy Builders",
  description:
    "Explore genuine Jancy Builders projects across Tirunelveli district: Durainagar Duplex, Samugarengapuram Porotherm Villa, Ammachikovil Site, Silathikulam Handover, Kavalkinaru Villa, and Valliyur Commercial Complex.",
  alternates: {
    canonical: "/projects",
  },
};

export default function ProjectsPage() {
  return <ProjectsPageClient />;
}
