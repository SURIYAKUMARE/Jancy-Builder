import React from "react";
import type { Metadata } from "next";
import ProcessPageClient from "./ProcessPageClient";

export const metadata: Metadata = {
  title: "Construction Process & Engineering Milestones | Jancy Builders",
  description:
    "Understand the 6-stage turnkey construction workflow of Jancy Builders: soil testing, architectural planning, mechanized RCC pouring, NABL cube tests, and ceremonial handover.",
  alternates: {
    canonical: "/process",
  },
};

export default function ProcessPage() {
  return <ProcessPageClient />;
}
