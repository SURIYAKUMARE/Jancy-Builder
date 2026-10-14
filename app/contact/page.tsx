import React from "react";
import type { Metadata } from "next";
import ContactPageClient from "./ContactPageClient";

export const metadata: Metadata = {
  title: "Contact Jancy Builders | Samugarengapuram, Tirunelveli",
  description:
    "Contact Jancy Builders and Chief Civil Engineer Er. Sahaya Antony Stalin. Visit our registered office at Jancy Home, Perumal Kovil Street, Samugarengapuram, or call +91 77082 47124.",
  alternates: {
    canonical: "/contact",
  },
};

export default function ContactPage() {
  return <ContactPageClient />;
}
