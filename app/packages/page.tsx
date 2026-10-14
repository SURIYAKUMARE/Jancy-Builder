import React from "react";
import type { Metadata } from "next";
import PackagesPageClient from "./PackagesPageClient";

export const metadata: Metadata = {
  title: "Construction Packages & Turnkey Pricing | Jancy Builders",
  description:
    "Explore transparent, fixed-price civil engineering construction packages in Tirunelveli: Standard Quality (₹2,400/sq.ft), Premium Elite Porotherm (₹3,200/sq.ft), and Ultra Luxury Craft (₹4,400/sq.ft). Zero cost escalation guarantee.",
  alternates: {
    canonical: "/packages",
  },
};

export default function PackagesPage() {
  return <PackagesPageClient />;
}
