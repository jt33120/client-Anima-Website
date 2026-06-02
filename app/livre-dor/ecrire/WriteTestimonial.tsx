"use client";
/* eslint-disable @next/next/no-img-element */
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Feather, Quote } from "lucide-react";

// Palette reprise du site (AnimaApp.tsx)
const colors = {
  rooted: "#A87560",
  warmHeart: "#E89497",
  softLight: "#F5C9AC",
  flow: "#A8D9C9",
  stillness: "#C9C9C9",
  cream: "#FBF8F4",
  ink: "#3A2E28",
  inkSoft: "#6B5A52",
};

const MAX_LENGTH = 550;

// Libellé affiché → valeur enregistrée (cohérente avec le livre d'or)
const FORMATS: { label: string; value: string }[] = [
  { label: "Lecture d'âme · 15 minutes", value: "Lecture 15 min" },
  { label: "Lecture d'âme · 30 minutes", value: "Lecture 30 min" },
  { label: "Lecture d'âme · 45 minutes", value: "Lecture 45 min" },
  { label: "Lecture d'âme · 60 minutes", value: "Lecture 60 min" },
  { label: "Feng Shui · Diagnostic", value: "Feng Shui — Diagnostic" },
  { label: "Feng Shui · Accompagnement", value: "Feng Shui — Accompagnement" },
  { label: "Je préfère ne pas préciser", value: "" },
];

export default function WriteTestimonial() {
  const [form, setForm] = useState({ name: "", format: "Lecture 60 min", message: "" });
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");

  const remaining = MAX_LENGTH - form.message.length;

  const submit = async () => {
    if (sending) return;
    if (!form.name.trim() || !form.message.trim()) {
      setError("Merci d'indiquer votre prénom et quelques mots.");
      return;
    }
    setSending(true);
    setError("");
    try {
      const res = await fetch("/api/temoignage", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Erreur réseau");
      setSent(true);
    } catch {
      setError("Une erreur est survenue. Merci de réessayer dans un instant, ou d'écrire à contact@anima-retourasoi.fr");
    } finally {
      setSending(false);
    }
  };

  const inputStyle = {
    borderColor: colors.rooted + "44",
    fontFamily: "'Cormorant Garamond', serif",
    color: colors.ink,
    fontSize: "16px",
  } as const;

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center px-6 py-20" style={{ backgroundColor: colors.cream }}>
      {/* Fonts + halo doux */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=Dancing+Script:wght@400;500;600&display=swap');
        input:focus, textarea:focus, select:focus { border-color: ${colors.rooted} !important; outline: none; }
        ::selection { background: ${colors.softLight}; color: ${colors.ink}; }
      `}</style>
      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: `radial-gradient(ellipse at 50% 0%, ${colors.softLight}33, transparent 60%)` }}
      />

      <div className="relative w-full max-w-lg">
        <AnimatePresence mode="wait">
          {!sent ? (
            <motion.div
              key="form"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.6 }}
            >
              {/* En-tête */}
              <div className="text-center mb-10">
                <Quote size={28} className="mx-auto mb-5" style={{ color: colors.rooted, opacity: 0.4 }} />
                <p className="text-xs tracking-[0.3em] uppercase mb-4" style={{ color: colors.rooted, fontFamily: "'Cormorant Garamond', serif" }}>
                  Livre d'Or
                </p>
                <h1 className="text-4xl md:text-5xl mb-5" style={{ fontFamily: "'Cormorant Garamond', serif", color: colors.ink, fontWeight: 400 }}>
                  Partagez votre expérience
                </h1>
                <div className="w-12 h-[1px] mx-auto mb-5" style={{ backgroundColor: colors.rooted }} />
                <p className="italic" style={{ fontFamily: "'Cormorant Garamond', serif", color: colors.inkSoft, fontSize: "17px", lineHeight: 1.7 }}>
                  Si votre passage chez Anima a laissé une trace, vos mots trouveront ici une place.
                  Prenez le temps, écrivez avec le cœur.
                </p>
              </div>

              {/* Formulaire */}
              <div className="space-y-6">
                <div>
                  <label className="block text-xs tracking-[0.15em] uppercase mb-2" style={{ color: colors.rooted, fontFamily: "'Cormorant Garamond', serif" }}>
                    Votre prénom
                  </label>
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    maxLength={80}
                    placeholder="Comment vous appelez-vous ?"
                    className="w-full px-4 py-3 bg-white/70 border transition-all"
                    style={inputStyle}
                  />
                </div>

                <div>
                  <label className="block text-xs tracking-[0.15em] uppercase mb-2" style={{ color: colors.rooted, fontFamily: "'Cormorant Garamond', serif" }}>
                    Quelle expérience avez-vous vécue ?
                  </label>
                  <select
                    value={form.format}
                    onChange={(e) => setForm({ ...form, format: e.target.value })}
                    className="w-full px-4 py-3 bg-white/70 border transition-all"
                    style={inputStyle}
                  >
                    {FORMATS.map((f) => (
                      <option key={f.label} value={f.value}>
                        {f.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs tracking-[0.15em] uppercase mb-2" style={{ color: colors.rooted, fontFamily: "'Cormorant Garamond', serif" }}>
                    Votre témoignage
                  </label>
                  <textarea
                    rows={7}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value.slice(0, MAX_LENGTH) })}
                    maxLength={MAX_LENGTH}
                    placeholder="Ce que vous avez ressenti, ce qui s'est ouvert, ce que vous emportez avec vous…"
                    className="w-full px-4 py-3 bg-white/70 border transition-all resize-none"
                    style={inputStyle}
                  />
                  <p className="text-right text-xs mt-2 italic" style={{ color: remaining <= 30 ? colors.warmHeart : colors.inkSoft, fontFamily: "'Cormorant Garamond', serif" }}>
                    {form.message.length} / {MAX_LENGTH} caractères
                  </p>
                </div>

                <button
                  type="button"
                  onClick={submit}
                  disabled={sending}
                  className="w-full py-3 text-sm tracking-[0.2em] uppercase transition-all hover:shadow-lg disabled:opacity-50"
                  style={{ backgroundColor: colors.rooted, color: colors.cream, fontFamily: "'Cormorant Garamond', serif" }}
                >
                  {sending ? "Envoi…" : "Déposer mon témoignage"}
                </button>

                {error && (
                  <p className="text-sm italic text-center" style={{ color: colors.warmHeart, fontFamily: "'Cormorant Garamond', serif" }}>
                    {error}
                  </p>
                )}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="thanks"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7 }}
              className="text-center py-10"
            >
              <Feather size={40} className="mx-auto mb-7" style={{ color: colors.rooted, opacity: 0.6 }} />
              <h1 className="text-4xl md:text-5xl mb-5" style={{ fontFamily: "'Dancing Script', cursive", color: colors.ink }}>
                Merci du fond du cœur
              </h1>
              <div className="w-12 h-[1px] mx-auto mb-6" style={{ backgroundColor: colors.rooted }} />
              <p className="italic max-w-md mx-auto" style={{ fontFamily: "'Cormorant Garamond', serif", color: colors.inkSoft, fontSize: "18px", lineHeight: 1.8 }}>
                Votre témoignage a été reçu avec gratitude.
                Il rejoindra peut-être bientôt les pages du livre d'or.
              </p>
              <a
                href="/"
                className="inline-block mt-10 text-xs tracking-[0.2em] uppercase transition-all hover:opacity-70"
                style={{ color: colors.rooted, fontFamily: "'Cormorant Garamond', serif" }}
              >
                ← Retour à l'accueil
              </a>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
