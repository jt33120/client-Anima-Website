import type { Metadata } from "next";
import WriteTestimonial from "./WriteTestimonial";

// Page volontairement non référencée : accessible uniquement par son lien direct.
export const metadata: Metadata = {
  title: "Partager un témoignage — Anima",
  description: "Déposez quelques mots sur votre expérience avec Anima.",
  robots: { index: false, follow: false },
};

export default function Page() {
  return <WriteTestimonial />;
}
