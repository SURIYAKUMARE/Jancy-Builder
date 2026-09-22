import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Jancy Builders — From Foundation to Finished Home | Build The World",
  description: "Experience the cinematic house construction journey with Jancy Builders. Premium architectural design, precision engineering, and luxury home construction from the ground up.",
  keywords: ["Jancy Builders", "House Construction", "Construction Timelapse", "Luxury Villa Builders", "Architectural Construction", "Civil Contractors"],
  authors: [{ name: "Jancy Builders" }],
  openGraph: {
    title: "Jancy Builders — From Foundation to Finished Home",
    description: "Watch a luxury home rise from empty land to completed architectural masterpiece.",
    images: ["/images/stages/stage-12.jpg"],
  },
};

export const viewport: Viewport = {
  themeColor: "#0A1128",
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
        <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700;800;900&family=Inter:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500;700&display=swap" rel="stylesheet" />
      </head>
      <body className="min-h-screen bg-[#060a12] text-slate-100 antialiased selection:bg-yellow-500/30 selection:text-yellow-200">
        {children}
      </body>
    </html>
  );
}
