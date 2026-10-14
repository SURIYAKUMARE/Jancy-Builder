import React from "react";
import type { Metadata } from "next";
import EstimatorPageClient from "./EstimatorPageClient";

export const metadata: Metadata = {
  title: "Turnkey Construction Cost Estimator | Jancy Builders",
  description:
    "Calculate your house construction budget in Tamil Nadu using Jancy Builders' verified turnkey rates: Classic (₹2,400/sq.ft), Premium (₹3,200/sq.ft), and Ultra Luxury (₹4,400/sq.ft).",
  alternates: {
    canonical: "/estimator",
  },
};

export default function EstimatorPage() {
  return <EstimatorPageClient />;
}
