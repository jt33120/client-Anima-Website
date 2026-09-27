import type { Metadata } from "next";
import type { CSSProperties } from "react";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";
import { colors } from "./theme";

// Palette exposée en variables CSS (--anima-*) pour les modules CSS —
// theme.ts reste l'unique source des couleurs.
const paletteVars = {
  "--anima-cream": colors.cream,
  "--anima-paper": colors.paper,
  "--anima-ink": colors.ink,
  "--anima-ink-soft": colors.inkSoft,
  "--anima-rose": colors.rose,
  "--anima-blush": colors.blush,
  "--anima-peach": colors.softLight,
  "--anima-warm": colors.warmHeart,
  "--anima-aqua": colors.aqua,
  "--anima-sage": colors.sage,
  "--anima-sage-deep": colors.sageDeep,
  "--anima-line": colors.line,
  "--anima-rosewood": colors.rosewood,
  "--anima-gold": colors.gold,
  "--anima-gold-deep": colors.goldDeep,
} as CSSProperties;

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Anima — Développement personnel & Lecture d'âme à Bordeaux",
  description: "Développement personnel et lecture d'âme à Bordeaux. Guidance spirituelle & harmonisation Feng Shui pour se reconnecter à son essence.",
  keywords: ["développement personnel", "lecture d'âme", "feng shui", "guidance spirituelle", "Bordeaux"],
  authors: [{ name: "Anima — éveil & retour à soi" }],
  openGraph: {
    title: "Anima — Développement personnel & Lecture d'âme à Bordeaux",
    description: "Développement personnel et lecture d'âme à Bordeaux. Guidance spirituelle & harmonisation Feng Shui.",
    url: "https://anima-retourasoi.fr",
    siteName: "Anima",
    locale: "fr_FR",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      style={paletteVars}
    >
      <body className="min-h-full flex flex-col">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
