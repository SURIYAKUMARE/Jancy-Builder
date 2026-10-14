import React from "react";
import type { Metadata } from "next";
import GalleryPageClient from "./GalleryPageClient";

export const metadata: Metadata = {
  title: "Authentic Construction Gallery | Jancy Builders",
  description:
    "View authentic Jancy Builders construction photos: active slab casting in Durainagar, Porotherm hollow brick masonry in Samugarengapuram, foundation footings in Ammachikovil, and turnkey handovers in Silathikulam.",
  alternates: {
    canonical: "/gallery",
  },
};

export default function GalleryPage() {
  return <GalleryPageClient />;
}
