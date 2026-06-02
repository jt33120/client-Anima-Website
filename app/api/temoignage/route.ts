import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const MAX_LENGTH = 550;

export async function POST(req: NextRequest) {
  if (!process.env.RESEND_API_KEY) {
    return NextResponse.json({ error: "Service email non configuré" }, { status: 503 });
  }

  const { name, format, message } = await req.json();

  if (!name || !message) {
    return NextResponse.json({ error: "Champs manquants" }, { status: 400 });
  }

  const cleanName = String(name).trim().slice(0, 80);
  const cleanMessage = String(message).trim().slice(0, MAX_LENGTH);
  const cleanFormat = format ? String(format).trim().slice(0, 60) : "";

  // Bloc prêt à coller dans le tableau `testimonials` de AnimaApp.tsx
  const snippet = `  {\n    name: ${JSON.stringify(cleanName)},\n    text: ${JSON.stringify(cleanMessage)},\n    format: ${JSON.stringify(cleanFormat)},\n  },`;

  const resend = new Resend(process.env.RESEND_API_KEY);

  const { error } = await resend.emails.send({
    from: "Anima <contact@anima-retourasoi.fr>",
    to: ["contact@anima-retourasoi.fr"],
    subject: `[Livre d'or] Nouveau témoignage de ${cleanName}`,
    text:
      `Un nouveau témoignage vient d'être déposé via le livre d'or.\n\n` +
      `Prénom : ${cleanName}\n` +
      `Format : ${cleanFormat || "non précisé"}\n` +
      `Longueur : ${cleanMessage.length} / ${MAX_LENGTH} caractères\n\n` +
      `— Témoignage —\n${cleanMessage}\n\n` +
      `— Prêt à coller dans le tableau testimonials —\n${snippet}\n`,
  });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
