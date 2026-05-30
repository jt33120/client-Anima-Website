import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  const { name, email, subject, message } = await req.json();

  if (!name || !email || !message) {
    return NextResponse.json({ error: "Champs manquants" }, { status: 400 });
  }

  const subjectLabels: Record<string, string> = {
    general: "Question générale",
    lecture: "Lecture d'âme",
    fengshui: "Feng Shui",
    rdv: "Prise de rendez-vous",
  };

  const { error } = await resend.emails.send({
    from: "Anima <contact@anima-retourasoi.fr>",
    to: ["contact@anima-retour-a-soi.fr"],
    replyTo: email,
    subject: `[Anima] ${subjectLabels[subject] ?? subject} — de ${name}`,
    text: `Nouveau message via le formulaire de contact.\n\nPrénom : ${name}\nEmail : ${email}\nSujet : ${subjectLabels[subject] ?? subject}\n\n${message}`,
  });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
