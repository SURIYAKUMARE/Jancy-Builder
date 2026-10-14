import type { Metadata, Viewport } from "next";
import "./globals.css";
import ArchitecturalCursor from "@/components/common/ArchitecturalCursor";
import { LanguageProvider } from "@/context/LanguageContext";
import HomeBuildingGuide from "@/components/guide/HomeBuildingGuide";

export const metadata: Metadata = {
  metadataBase: new URL("https://jancy-builder.vercel.app"),
  title: {
    default: "Jancy Builders — Premium Architectural Design & Civil Engineering",
    template: "%s | Jancy Builders",
  },
  description:
    "Jancy Builders is a premier civil engineering, architectural design, and turnkey construction studio in Samugarengapuram, Tirunelveli. Led personally by Er. Sahaya Antony Stalin, B.E. (Civil).",
  keywords: [
    "Jancy Builders",
    "Er. Sahaya Antony Stalin",
    "Samugarengapuram builders",
    "Tirunelveli civil contractors",
    "Luxury villa construction",
    "Porotherm brick builders",
    "Turnkey construction Tamil Nadu",
    "Architectural planning",
    "House construction timelapse",
  ],
  authors: [{ name: "Er. Sahaya Antony Stalin (Jancy Builders)" }],
  creator: "Jancy Builders",
  publisher: "Jancy Builders",
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: "/logo/jancy-official-logo.png",
    apple: "/logo/jancy-official-logo.png",
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://jancy-builder.vercel.app",
    siteName: "Jancy Builders",
    title: "Jancy Builders — Engineering Trust. Building Tomorrow.",
    description:
      "Premier architectural design, precision civil engineering, and turnkey construction across Tirunelveli and South Tamil Nadu. Supervised by Er. Sahaya Antony Stalin.",
    images: [
      {
        url: "/images/hero-sunset-villa.jpg",
        width: 1200,
        height: 630,
        alt: "Jancy Builders Architectural Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Jancy Builders — Premium Architectural & Civil Engineering",
    description:
      "Turnkey luxury villas, commercial landmarks, and structural engineering in Samugarengapuram, Tirunelveli.",
    images: ["/images/hero-sunset-villa.jpg"],
  },
};

export const viewport: Viewport = {
  themeColor: "#17191B",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": ["HomeAndConstructionBusiness", "GeneralContractor"],
  name: "Jancy Builders",
  image: "https://jancy-builder.vercel.app/logo/jancy-official-logo.png",
  url: "https://jancy-builder.vercel.app",
  telephone: "+917708247124",
  priceRange: "₹₹₹",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Jancy Home, Perumal Kovil Street",
    addressLocality: "Samugarengapuram",
    addressRegion: "Tamil Nadu",
    postalCode: "627112",
    addressCountry: "IN",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 8.337495,
    longitude: 77.698087,
  },
  founder: {
    "@type": "Person",
    name: "Er. Sahaya Antony Stalin",
    jobTitle: "Chief Civil Engineer & Founder",
    hasCredential: "B.E. Civil Engineering",
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
      opens: "00:00",
      closes: "23:59",
    },
  ],
  sameAs: ["https://www.facebook.com/JancyBuilder/"],
  areaServed: [
    "Samugarengapuram",
    "Tirunelveli",
    "Valliyur",
    "Durainagar",
    "Silathikulam",
    "Kavalkinaru",
    "Palayamkottai",
    "Kanyakumari",
    "Tamil Nadu",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Caveat:wght@600;700&family=Cinzel:wght@500;700;800;900&family=Inter:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600;700&family=Noto+Sans+Tamil:wght@400;500;600;700;800&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Playfair+Display:ital,wght@0,600;0,700;0,900;1,600&family=Outfit:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen bg-[#F8F6F1] text-[#202124] antialiased selection:bg-[#B78A52]/20 selection:text-[#B78A52]">
        <LanguageProvider>
          <ArchitecturalCursor />
          {children}
          <HomeBuildingGuide />
        </LanguageProvider>
      </body>
    </html>
  );
}
