import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Jancy Builders — BUILD THE WORLD | From Foundation to Finished Home",
  description: "Experience the cinematic house construction timelapse by Jancy Builders. Premium architectural design, precision civil engineering, and luxury home construction from the ground up.",
  keywords: ["Jancy Builders", "Build The World", "House Construction", "Construction Timelapse", "Luxury Villa Builders", "Architectural Construction", "Civil Contractors"],
  authors: [{ name: "Jancy Builders" }],
  icons: {
    icon: "/logo/jancy-official-logo.png",
    apple: "/logo/jancy-official-logo.png",
  },
  openGraph: {
    title: "Jancy Builders — BUILD THE WORLD",
    description: "Watch an entire luxury residence rise from foundation to finished home.",
    images: ["/logo/jancy-official-logo.png"],
  },
};

export const viewport: Viewport = {
  themeColor: "#05080E",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
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
          href="https://fonts.googleapis.com/css2?family=Caveat:wght@600;700&family=Cinzel:wght@500;700;800;900&family=Inter:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600;700&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Playfair+Display:ital,wght@0,600;0,700;0,900;1,600&family=Outfit:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen bg-white text-slate-900 antialiased selection:bg-red-600/30 selection:text-red-900">
        {children}
      </body>
    </html>
  );
}
