import type { Metadata } from "next";
import { Playfair_Display, Lora, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";

/* ========================================
   FONT CONFIGURATION — 4-tier type system
   ======================================== */

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair-display",
  display: "swap",
  weight: ["400", "500", "600", "700", "800", "900"],
});

const lora = Lora({
  subsets: ["latin"],
  variable: "--font-lora",
  display: "swap",
  style: ["normal", "italic"],
  weight: ["400", "500", "600", "700"],
});

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  variable: "--font-ibm-plex-mono",
  display: "swap",
  weight: ["300", "400", "500"],
});

/* ========================================
   METADATA — SEO
   ======================================== */

export const metadata: Metadata = {
  title: "Sana Sheikh — AI Filmmaker & Visual Story Architect",
  description:
    "Portfolio of Sana Sheikh — multidisciplinary filmmaker working at the intersection of cinematic storytelling and generative intelligence. AI ads, music videos, short films, and virtual production.",
  keywords: [
    "AI filmmaker",
    "AI cinema",
    "generative filmmaking",
    "Sana Sheikh",
    "visual story architect",
    "Runway",
    "AI ads",
    "music videos",
  ],
  openGraph: {
    title: "Sana Sheikh — AI Filmmaker",
    description:
      "I direct. The machine executes. Portfolio of cinematic AI films, ads, and visual stories.",
    type: "website",
    locale: "en_US",
    url: "https://ivysana.xyz",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sana Sheikh — AI Filmmaker",
    description: "I direct. The machine executes.",
  },
};

import Nav from "@/components/layout/Nav";
import CustomCursor from "@/components/layout/CustomCursor";
import GrainOverlay from "@/components/layout/GrainOverlay";
import Loader from "@/components/layout/Loader";

/* ========================================
   ROOT LAYOUT
   ======================================== */

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`
        ${playfairDisplay.variable}
        ${lora.variable}
        ${ibmPlexMono.variable}
      `}
    >
      <body className="antialiased overflow-x-hidden relative selection:bg-accent/30">
        <Loader />
        <CustomCursor />
        <GrainOverlay />
        <Nav />
        {children}
      </body>
    </html>
  );
}
