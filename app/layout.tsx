import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

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
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
