import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Inter, IBM_Plex_Mono } from "next/font/google";
import SmoothScroll from "@/components/SmoothScroll";
import "lenis/dist/lenis.css";
import "./globals.css";

/* ========================================
   FONT CONFIGURATION — 4-tier type system
   ======================================== */

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-cormorant",
  display: "swap",
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
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
  metadataBase: new URL("https://www.sanasheikh.me"),
  title: "Sana Sheikh — AI Film Director",
  description:
    "Original films, brand cinema, music videos and visual worlds directed by Sana Sheikh through an AI-native production process.",
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
      "Original films and visual worlds directed through an AI-native production process.",
    type: "website",
    locale: "en_US",
    url: "https://www.sanasheikh.me",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sana Sheikh — AI Filmmaker",
    description: "Original films and visual worlds, directed by Sana Sheikh.",
  },
  icons: {
    icon: [{ url: "/logo.svg", type: "image/svg+xml" }],
    shortcut: "/logo.svg",
    apple: "/logo.png",
  },
};

export const viewport: Viewport = {
  themeColor: "#030405",
};

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
      suppressHydrationWarning
      className={`
        ${cormorant.variable}
        ${inter.variable}
        ${ibmPlexMono.variable}
      `}
    >
      <body>
        <SmoothScroll />
        {children}
      </body>
    </html>
  );
}
