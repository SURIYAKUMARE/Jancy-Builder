import React from "react";
import type { Metadata } from "next";
import AboutPageClient from "./AboutPageClient";

export const metadata: Metadata = {
  title: "About Jancy Builders | Chief Civil Engineer Er. Sahaya Antony Stalin",
  description:
    "Learn about Jancy Builders, our civil engineering philosophy, and founder Er. Sahaya Antony Stalin, B.E. (Civil). Delivering turnkey luxury homes and structural permanence in Tirunelveli since 2016.",
  alternates: {
    canonical: "/about",
  },
};

export default function AboutPage() {
  return <AboutPageClient />;
}
