import {
  Caveat, Homemade_Apple, La_Belle_Aurore, Nothing_You_Could_Do,
  Bad_Script, Annie_Use_Your_Telescope, Reenie_Beanie,
} from "next/font/google";
import { Flower2, Heart, Sparkles, Sun, type LucideIcon } from "lucide-react";

// ============================================================
// LIVRE D'OR — une écriture, une encre par personne, comme dans
// un vrai livre où chacun a pris le stylo.
// Les polices couvrent é, ’, œ, …, « » (sous-ensemble latin vérifié).
// preload: false — chargées seulement quand le livre s'affiche.
// ============================================================
const caveat = Caveat({ weight: "500", subsets: ["latin"], display: "swap", preload: false });
const homemadeApple = Homemade_Apple({ weight: "400", subsets: ["latin"], display: "swap", preload: false });
const belleAurore = La_Belle_Aurore({ weight: "400", subsets: ["latin"], display: "swap", preload: false });
const nothingYouCouldDo = Nothing_You_Could_Do({ weight: "400", subsets: ["latin"], display: "swap", preload: false });
const badScript = Bad_Script({ weight: "400", subsets: ["latin"], display: "swap", preload: false });
const annie = Annie_Use_Your_Telescope({ weight: "400", subsets: ["latin"], display: "swap", preload: false });
const reenie = Reenie_Beanie({ weight: "400", subsets: ["latin"], display: "swap", preload: false });

export type Hand = {
  font: string;      // famille next/font
  size: number;      // taille en rem (normalisée sur la hauteur d'x de chaque police)
  ad: number;        // (ascendante − descendante) / em : cale la ligne de base sur les réglures
  ink: string;       // encre du stylo
  tilt: number;      // inclinaison de la main sur la page (deg)
  inset: number;     // retrait gauche (rem)
  indent: number;    // alinéa de la première ligne (rem)
  doodle?: LucideIcon;
  underline?: boolean;
};

export const HANDS: Record<string, Hand> = {
  Ksenia: { font: caveat.style.fontFamily, size: 1.5, ad: 0.66, ink: "#2b3a67", tilt: -0.45, inset: 0, indent: 1.4, underline: true },
  Jenny: { font: homemadeApple.style.fontFamily, size: 1.02, ad: 0.45, ink: "#5a3b2e", tilt: 0.55, inset: 0.3, indent: 0, doodle: Heart },
  Laura: { font: belleAurore.style.fontFamily, size: 1.6, ad: 0.302, ink: "#2c4a8a", tilt: -0.7, inset: 0.15, indent: 0.8, doodle: Flower2 },
  Leslie: { font: nothingYouCouldDo.style.fontFamily, size: 1.34, ad: 0.54, ink: "#1f5c57", tilt: 0.35, inset: 0.5, indent: 0, doodle: Sun },
  Karine: { font: badScript.style.fontFamily, size: 1.16, ad: 0.676, ink: "#2e2420", tilt: -0.25, inset: 0, indent: 1.1, doodle: Sparkles },
  Cindy: { font: annie.style.fontFamily, size: 1.42, ad: 0.615, ink: "#4e3470", tilt: 0.5, inset: 0.2, indent: 0, underline: true },
  Julian: { font: reenie.style.fontFamily, size: 1.72, ad: 0.5, ink: "#33343a", tilt: -0.55, inset: 0.35, indent: 0 },
};
