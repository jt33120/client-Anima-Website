// ============================================================
// PALETTE "Color Direction" — issue du PDF fourni
// Single source of truth, shared by AnimaApp.tsx and the
// components (exposed as --anima-* CSS variables by AnimaApp).
// ============================================================
export const colors = {
  rooted: "#A87560",      // Marron cuivré (accents, logo)
  warmHeart: "#E89497",   // Rose (CTA primaires)
  softLight: "#F5C9AC",   // Pêche (fonds doux)
  flow: "#A8D9C9",        // Vert d'eau (Feng Shui)
  stillness: "#C9C9C9",   // Gris (bordures, secondaire)
  cream: "#FBF8F4",       // Fond général crème
  ink: "#3A2E28",         // Texte principal (brun très foncé, jamais noir pur)
  inkSoft: "#6B5A52",     // Texte secondaire

  // Kit d'identité ANIMA (palette des reels Instagram / TikTok)
  rose: "#F5C6CF",        // Rose fleur — lavis des boutons, pétales
  blush: "#EBD7CF",       // Rose du ciel — lumière douce
  paper: "#EFE5D9",       // Ivoire papier
  aqua: "#BDE3DB",        // Aqua clair — eau
  sage: "#79A59B",        // Sauge des feuilles
  line: "#AD8678",        // Brun rosé du trait — contours fins
  rosewood: "#6B3F37",    // Texte sur lavis rose (contraste ≥ 5,8:1)
  sageDeep: "#35594F",    // Texte sur lavis aqua (contraste ≥ 5,6:1)
  gold: "#C9A66B",        // Dorure du dos des cartes (filets, ornements — jamais du texte)
  goldDeep: "#7A5A2E",    // Or bruni pour le texte sur ivoire (contraste ≥ 5,2:1)
};

// Réseaux sociaux — l'avatar Anima y publie les reels repris sur le site.
export const socials = {
  instagram: { url: "https://www.instagram.com/anima_retourasoi/", handle: "@anima_retourasoi" },
  tiktok: { url: "https://www.tiktok.com/@anima.retour.soi", handle: "@anima.retour.soi" },
};
