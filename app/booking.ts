// ============================================================
// RÉSERVATION — Cal.com
// Source unique des liens de réservation des lectures d'âme.
// Pour changer de compte, modifier CAL_USERNAME ; pour renommer
// un créneau, modifier le slug correspondant dans Cal.com puis ici.
// ============================================================
export const CAL_USERNAME = "anima-retourasoi";

export const bookingUrl = (slug: string) =>
  `https://cal.com/${CAL_USERNAME}/${slug}`;
