"use client";
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @next/next/no-img-element */
import { useState, useEffect } from "react";
import { motion, AnimatePresence, useMotionValue, useTransform, animate } from "framer-motion";
import {
  Menu, X, Phone, Mail, MessageCircle, Video,
  MapPin, ArrowRight, Sparkles, Home, Feather, Quote, ChevronDown,
  ChevronLeft, ChevronRight
} from "lucide-react";

// Icône Instagram en SVG inline (lucide-react a retiré l'export à cause de la marque)
const Instagram = ({ size = 16, className = "", ...props }: { size?: number; className?: string; [key: string]: unknown }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    {...props}
  >
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);


// ============================================================
// PALETTE "Color Direction" — issue du PDF fourni
// ============================================================
const colors = {
  rooted: "#A87560",      // Marron cuivré (accents, logo)
  warmHeart: "#E89497",   // Rose (CTA primaires)
  softLight: "#F5C9AC",   // Pêche (fonds doux)
  flow: "#A8D9C9",        // Vert d'eau (Feng Shui)
  stillness: "#C9C9C9",   // Gris (bordures, secondaire)
  cream: "#FBF8F4",       // Fond général crème
  ink: "#3A2E28",         // Texte principal (brun très foncé, jamais noir pur)
  inkSoft: "#6B5A52",     // Texte secondaire
};

// ============================================================
// LOGO (recréé en texte stylisé, typo cursive)
// ============================================================
const Logo = ({ size = "md" }: { size?: string; color?: string }) => {
  const sizeClasses: Record<string, string> = {
    sm: "w-24",
    md: "w-32 md:w-36",
    lg: "w-44 md:w-60",
    hero: "w-44 sm:w-52 md:w-64 lg:w-80",
    xl: "w-52 md:w-80 lg:w-[420px]",
  };
  return (
    <img
      src="/Logo PNG.png"
      alt="Anima"
      className={`block ${sizeClasses[size] ?? sizeClasses.md}`}
    />
  );
};

// ============================================================
// NAV
// ============================================================
const NAV_ITEMS = [
  { id: "home", label: "Accueil" },
  { id: "about", label: "À propos" },
  { id: "guidance", label: "Guidance" },
  { id: "fengshui", label: "Feng Shui" },
  { id: "testimonials", label: "Témoignages" },
  { id: "contact", label: "Contact" },
];

const Nav = ({ currentPage, setCurrentPage }) => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const go = (id) => {
    setCurrentPage(id);
    setOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "py-3 backdrop-blur-md" : "py-5"
      }`}
      style={{
        backgroundColor: scrolled ? "rgba(251, 248, 244, 0.85)" : "transparent",
        borderBottom: scrolled ? `1px solid ${colors.stillness}33` : "none",
      }}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <button onClick={() => go("home")} className="cursor-pointer">
          <Logo size="sm" />
        </button>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-8">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              onClick={() => go(item.id)}
              className="text-sm tracking-wide transition-colors relative group"
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                color: currentPage === item.id ? colors.rooted : colors.inkSoft,
                fontWeight: currentPage === item.id ? 600 : 400,
                fontSize: "15px",
              }}
            >
              {item.label}
              <span
                className="absolute -bottom-1 left-0 h-[1px] transition-all duration-300"
                style={{
                  width: currentPage === item.id ? "100%" : "0%",
                  backgroundColor: colors.rooted,
                }}
              />
            </button>
          ))}
        </div>

        {/* Mobile burger */}
        <button className="md:hidden" onClick={() => setOpen(!open)} style={{ color: colors.rooted }}>
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden overflow-hidden"
            style={{ backgroundColor: colors.cream }}
          >
            <div className="flex flex-col px-6 py-6 gap-4">
              {NAV_ITEMS.map((item) => (
                <button
                  key={item.id}
                  onClick={() => go(item.id)}
                  className="text-left py-2"
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    color: currentPage === item.id ? colors.rooted : colors.inkSoft,
                    fontSize: "18px",
                  }}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

// ============================================================
// TEXTURE DE FOND (grain aquarelle subtil)
// ============================================================
const WatercolorBg = ({ variant = "default" }) => {
  const gradients = {
    default: `radial-gradient(ellipse at top right, ${colors.softLight}33 0%, transparent 55%),
              radial-gradient(ellipse at bottom left, ${colors.flow}22 0%, transparent 55%)`,
    warm: `radial-gradient(ellipse at top left, ${colors.warmHeart}22 0%, transparent 50%),
           radial-gradient(ellipse at bottom right, ${colors.softLight}33 0%, transparent 60%)`,
    cool: `radial-gradient(ellipse at top, ${colors.flow}33 0%, transparent 60%),
           radial-gradient(ellipse at bottom, ${colors.softLight}22 0%, transparent 55%)`,
    rooted: `radial-gradient(ellipse at 30% 40%, ${colors.rooted}15 0%, transparent 60%),
             radial-gradient(ellipse at 70% 70%, ${colors.softLight}22 0%, transparent 55%)`,
  };
  return (
    <div className="absolute inset-0 pointer-events-none" style={{ background: gradients[variant] }} />
  );
};

// ============================================================
// HERO — page Accueil
// ============================================================
const HomePage = ({ setCurrentPage }) => {
  return (
    <div className="relative">
      {/* HERO */}
      <section className="relative min-h-screen flex flex-col overflow-hidden">

        {/* Image — Ken Burns très doux (zoom arrière sur 14 s) */}
        <motion.img
          src="/header_mainpage.jpg"
          alt=""
          aria-hidden="true"
          initial={{ scale: 1.07 }}
          animate={{ scale: 1 }}
          transition={{ duration: 14, ease: "easeOut" }}
          className="absolute inset-0 w-full h-full object-cover object-center"
        />

        {/* Voile latéral : fondu crème sur les bords, transparent au centre */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(to right, rgba(251,248,244,0.88) 0%, rgba(251,248,244,0.5) 20%, rgba(251,248,244,0) 38%, rgba(251,248,244,0) 62%, rgba(251,248,244,0.5) 80%, rgba(251,248,244,0.88) 100%)",
          }}
        />
        {/* Fondu bas */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(to bottom, rgba(251,248,244,0) 55%, rgba(251,248,244,0.55) 100%)",
          }}
        />

        {/* Brume initiale qui se dissipe — effet "réveil doux" */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={{ duration: 2.8, ease: "easeOut" }}
          style={{ backgroundColor: "rgba(251,248,244,0.7)" }}
        />

        {/* Grille deux colonnes + fleur au centre */}
        <div className="relative z-10 w-full h-full min-h-screen grid grid-cols-1 md:grid-cols-2 items-center px-8 md:px-16 lg:px-24 gap-y-8 md:gap-y-0 pt-28 md:pt-0">

          {/* Colonne gauche — Logo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, filter: "blur(10px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            transition={{ duration: 2.2, ease: "easeOut", delay: 0.5 }}
            className="flex items-center justify-center md:justify-start"
          >
            <Logo size="hero" />
          </motion.div>

          {/* Colonne droite — Tagline + boutons */}
          <div className="flex flex-col items-center md:items-end text-center md:text-right gap-8">
            <motion.p
              initial={{ opacity: 0, y: 14, filter: "blur(6px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 1.8, ease: "easeOut", delay: 1.0 }}
              className="text-lg md:text-xl italic leading-relaxed max-w-xs"
              style={{ fontFamily: "'Cormorant Garamond', serif", color: colors.inkSoft }}
            >
              Un espace doux pour se reconnecter à son essence,
              écouter sa voix intérieure, et rayonner pleinement qui l'on est.
            </motion.p>
            <div className="flex flex-col gap-3 w-full max-w-xs">
              <motion.button
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: "easeOut", delay: 1.6 }}
                onClick={() => setCurrentPage("guidance")}
                className="px-6 py-3 text-sm tracking-widest uppercase transition-all hover:shadow-lg"
                style={{
                  backgroundColor: colors.rooted,
                  color: colors.cream,
                  fontFamily: "'Cormorant Garamond', serif",
                  fontWeight: 500,
                  letterSpacing: "0.15em",
                }}
              >
                Lectures d'âme
              </motion.button>
              <motion.button
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: "easeOut", delay: 1.9 }}
                onClick={() => setCurrentPage("about")}
                className="px-6 py-3 text-sm tracking-widest uppercase transition-all border"
                style={{
                  borderColor: colors.rooted,
                  color: colors.rooted,
                  fontFamily: "'Cormorant Garamond', serif",
                  fontWeight: 500,
                  letterSpacing: "0.15em",
                }}
              >
                En savoir plus
              </motion.button>
            </div>
          </div>

        </div>

        {/* Indicateur de scroll — apparaît en dernier */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 2.4 }}
          style={{ color: colors.rooted }}
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <ChevronDown size={28} />
          </motion.div>
        </motion.div>
      </section>

      {/* SECTION 2 : "ma promesse" en 3 piliers */}
      <section className="py-20 md:py-44 relative overflow-hidden" style={{ backgroundColor: "#FDFAF6" }}>
        <WatercolorBg variant="warm" />
        <div className="max-w-5xl mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2
              className="text-4xl md:text-5xl mb-6"
              style={{ fontFamily: "'Cormorant Garamond', serif", color: colors.ink, fontWeight: 400 }}
            >
              Une porte vers vous-même
            </h2>
            <p className="max-w-2xl mx-auto italic" style={{ fontFamily: "'Cormorant Garamond', serif", color: colors.inkSoft, fontSize: "18px" }}>
              Car au fond, toutes les réponses sont déjà en vous.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-12">
            {[
              { icon: Sparkles, title: "Lecture d'âme", text: "Un espace de reconnexion à soi, à l'intuition et à la clarté intérieure." },
              { icon: Home, title: "Feng Shui", text: "Réharmoniser votre lieu de vie pour qu'il devienne un véritable soutien." },
              { icon: Feather, title: "Un chemin", text: "Partager avec authenticité et humilité, sans prétention de vérité absolue." },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.15 }}
                className="text-center px-4"
              >
                <div
                  className="w-16 h-16 mx-auto mb-6 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: colors.softLight + "55" }}
                >
                  <item.icon size={24} style={{ color: colors.rooted }} />
                </div>
                <h3 className="text-2xl mb-3" style={{ fontFamily: "'Cormorant Garamond', serif", color: colors.ink }}>
                  {item.title}
                </h3>
                <p className="leading-relaxed" style={{ fontFamily: "'Cormorant Garamond', serif", color: colors.inkSoft, fontSize: "17px" }}>
                  {item.text}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CITATION */}
      <section className="py-20 md:py-48 relative" style={{ backgroundColor: colors.cream }}>
        <WatercolorBg variant="rooted" />
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="max-w-3xl mx-auto px-6 text-center relative z-10"
        >
          <Quote size={40} className="mx-auto mb-6" style={{ color: colors.rooted, opacity: 0.5 }} />
          <p
            className="text-2xl md:text-3xl italic leading-relaxed mb-4"
            style={{ fontFamily: "'Cormorant Garamond', serif", color: colors.ink, fontWeight: 300 }}
          >
            « Cherchez et vous trouverez ; chaque épreuve et chaque joie
            vous rapprochent du Royaume de votre cœur. »
          </p>
          <p className="text-sm tracking-widest uppercase" style={{ color: colors.inkSoft, fontFamily: "'Cormorant Garamond', serif" }}>
            adapté de Luc 11:9 et 17:21
          </p>
        </motion.div>
      </section>
    </div>
  );
};

// ============================================================
// PAGE : À PROPOS (texte long)
// ============================================================
const AboutPage = () => {
  const paragraphs = [
    "Depuis ma plus tendre enfance, le monde spirituel a fait partie de moi. À cet âge, on ne met pas forcément de mots sur ce que l'on ressent. On vit, on perçoit, sans toujours comprendre. Et puis, il faut bien le dire, à une époque où ces sujets étaient parfois tabous ou incompris, il était plus simple de garder cela en soi.",
    "Comme beaucoup, j'ai ensuite été happée par le quotidien, les responsabilités, le rythme de la vie. J'ai mis de côté ces ressentis, jusqu'à ce qu'ils reviennent à moi, avec force, en 2019.",
    "Cette période a marqué le début de ce que l'on appelle une « nuit noire de l'âme ». Un passage intense, tant par les expériences que les ressentis mais profondément transformateur ce qui m'a amenée à plonger dans les profondeurs de mon être.",
    "Ce chemin intérieur s'est étendu sur plusieurs années, durant lesquelles j'ai rencontré toutes les facettes de moi-même : les parts lumineuses comme les plus sombres.",
    "Avec le recul, je comprends que rien de tout cela n'était négatif. Chaque expérience, chaque émotion, chaque étape a contribué à une chose essentielle : l'élévation de mon âme.",
    "Aujourd'hui, je me sens alignée et apaisée à ma place dans mon incarnation. Le travail sur soi c'est comme un fleuve qui ne cesse de couler : il avance sans interruption, se transforme au fil du temps, contourne les obstacles et poursuit toujours son chemin, même lorsqu'il semble ralentir ou changer de direction.",
  ];

  return (
    <div className="relative pt-32 pb-24" style={{ backgroundColor: colors.cream }}>
      <WatercolorBg variant="default" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 max-w-2xl mx-auto"
        >
          <p className="text-sm tracking-[0.25em] uppercase mb-4" style={{ color: colors.rooted, fontFamily: "'Cormorant Garamond', serif" }}>
            À propos
          </p>
          <h1 className="text-4xl md:text-6xl mb-6" style={{ fontFamily: "'Cormorant Garamond', serif", color: colors.ink, fontWeight: 400 }}>
            Mon chemin
          </h1>
          <div className="w-16 h-[1px] mx-auto" style={{ backgroundColor: colors.rooted }} />
        </motion.div>

        {/* All paragraphs + image side by side, image stretches to match total text height */}
        <div className="flex flex-col md:flex-row gap-12 items-stretch mb-6">
          <div className="flex-1 min-w-0">
            {paragraphs.map((p, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: i * 0.05 }}
                className="mb-6 leading-relaxed text-lg"
                style={{ fontFamily: "'Cormorant Garamond', serif", color: colors.ink, fontSize: "19px", lineHeight: "1.75" }}
              >
                {p}
              </motion.p>
            ))}
          </div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex-shrink-0 md:w-[340px] lg:w-[420px] p-3 h-72 md:h-auto"
            style={{
              backgroundColor: "#ffffff",
              border: `1px solid ${colors.rooted}22`,
              boxShadow: `0 16px 48px -20px ${colors.ink}28`,
            }}
          >
            <img
              src="/anima.jpg"
              alt="Anima"
              className="w-full h-full object-cover"
            />
          </motion.div>
        </div>
      </div>

      {/* ── Section 2 : Je tiens à être claire ── */}
      <section className="py-16 md:py-40 relative overflow-hidden">
        <WatercolorBg variant="warm" />
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-120px" }}
          transition={{ duration: 1.6, ease: "easeOut" }}
          className="max-w-xl mx-auto px-8 relative z-10"
        >
          <div
            className="p-6 md:p-14"
            style={{ backgroundColor: colors.softLight + "30", borderLeft: `3px solid ${colors.rooted}` }}
          >
            <p className="mb-8 leading-relaxed" style={{ fontFamily: "'Cormorant Garamond', serif", color: colors.ink, fontSize: "20px", lineHeight: "1.95" }}>
              <strong style={{ fontWeight: 600 }}>Je tiens à être claire avec vous :</strong> je suis une personne comme vous.
              J'ai une vie, un travail, un foyer et des responsabilités, un quotidien « classique ». Je n'ai pas la prétention
              de détenir une vérité absolue. Seulement celle de partager un chemin, le mien, avec authenticité et humilité.
            </p>
            <p className="italic" style={{ fontFamily: "'Cormorant Garamond', serif", color: colors.inkSoft, fontSize: "17px", lineHeight: "1.85" }}>
              N'étant pas une professionnelle de santé, mon approche ne remplace en aucun cas un suivi médical ou psychologique.
            </p>
          </div>
        </motion.div>
      </section>

      {/* ── Section 3 : Ce que je vous propose ── */}
      <section className="py-16 md:py-40 relative">
        <WatercolorBg variant="default" />
        <motion.p
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-120px" }}
          transition={{ duration: 1.6, ease: "easeOut" }}
          className="max-w-xl mx-auto px-8 text-center relative z-10"
          style={{ fontFamily: "'Cormorant Garamond', serif", color: colors.ink, fontSize: "21px", lineHeight: "1.95" }}
        >
          Ce que je vous propose est différent. Je me considère comme un canal, un accompagnant. Mon rôle n'est pas de
          vous dire qui vous êtes ou ce que vous devez faire, mais simplement d'<em>ouvrir une porte</em>.
        </motion.p>
      </section>

      {/* ── Section 4 : Une porte vers vous-même ── */}
      <section className="py-16 pb-20 md:py-32 md:pb-48 relative overflow-hidden">
        <WatercolorBg variant="rooted" />
        <div className="max-w-3xl mx-auto px-6 relative z-10">
          <div className="flex flex-col md:flex-row gap-8 items-center">
            {/* Rose illustration — blown by the wind */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1.4, ease: "easeOut" }}
              className="flex-shrink-0 flex justify-center md:w-44 relative"
              style={{ minHeight: 260 }}
            >
              {/* Floating petals detaching in the wind */}
              {([
                { left: 88, top: 62, dx: [0, 18, 40, 72], dy: [0, -18, -8, 6],  r: [0, 25, 60, 100],  fill: "#F2BEC0", w: 14, h: 9,  delay: 0,   dur: 4.2 },
                { left: 78, top: 44, dx: [0, 22, 48, 80], dy: [0, -22, -12, 0], r: [0, -40, -80, -110], fill: "#E89497", w: 11, h: 8,  delay: 1.5, dur: 3.8 },
                { left: 82, top: 78, dx: [0, 14, 38, 65], dy: [0, -10, 12, 4],  r: [0, 50, 110, 160], fill: "#D97A7E", w: 10, h: 7,  delay: 2.8, dur: 4.6 },
                { left: 92, top: 55, dx: [0, 28, 56, 88], dy: [0, -6,  16, 8],  r: [0, 30, 75, 130],  fill: "#F2BEC0", w: 9,  h: 6,  delay: 0.8, dur: 5.1 },
              ] as const).map((p, i) => (
                <motion.div
                  key={i}
                  className="absolute pointer-events-none"
                  style={{ left: p.left, top: p.top }}
                  animate={{ x: [...p.dx], y: [...p.dy], rotate: [...p.r], opacity: [0.9, 0.75, 0.45, 0] }}
                  transition={{ duration: p.dur, repeat: Infinity, delay: p.delay, ease: "easeOut" }}
                >
                  <svg width={p.w} height={p.h} viewBox={`0 0 ${p.w} ${p.h}`}>
                    <ellipse cx={p.w/2} cy={p.h/2} rx={p.w/2} ry={p.h/2} fill={p.fill} opacity="0.9"/>
                  </svg>
                </motion.div>
              ))}

              {/* Rose — whole stem sways, anchored at root */}
              <motion.svg
                width="130" height="240" viewBox="0 0 130 240"
                xmlns="http://www.w3.org/2000/svg"
                style={{ transformOrigin: "50% 100%", display: "block" }}
                animate={{ rotate: [-4, 7, -3, 8, -4] }}
                transition={{ duration: 5.5, repeat: Infinity, ease: [0.45, 0.05, 0.55, 0.95], repeatType: "mirror" }}
              >
                {/* Stem */}
                <motion.path
                  d="M65 148 Q60 178 63 228"
                  stroke="#8FAF8A" strokeWidth="2.5" strokeLinecap="round" fill="none"
                  animate={{ d: ["M65 148 Q60 178 63 228", "M65 148 Q68 178 66 228", "M65 148 Q60 178 63 228"] }}
                  transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut", repeatType: "mirror" }}
                />
                {/* Left leaf */}
                <motion.path
                  d="M63 192 Q40 177 44 158 Q55 168 63 192Z" fill="#9DBF97" opacity="0.85"
                  animate={{ d: ["M63 192 Q40 177 44 158 Q55 168 63 192Z","M63 192 Q42 180 47 162 Q56 170 63 192Z","M63 192 Q40 177 44 158 Q55 168 63 192Z"] }}
                  transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut", repeatType: "mirror" }}
                />
                <path d="M63 192 Q50 172 47 159" stroke="#7A9470" strokeWidth="1" fill="none"/>
                {/* Right leaf */}
                <motion.path
                  d="M63 170 Q88 157 86 140 Q74 153 63 170Z" fill="#9DBF97" opacity="0.85"
                  animate={{ d: ["M63 170 Q88 157 86 140 Q74 153 63 170Z","M63 170 Q85 160 84 144 Q73 156 63 170Z","M63 170 Q88 157 86 140 Q74 153 63 170Z"] }}
                  transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut", repeatType: "mirror", delay: 0.3 }}
                />
                <path d="M63 170 Q81 154 84 142" stroke="#7A9470" strokeWidth="1" fill="none"/>
                {/* Calyx */}
                <path d="M55 148 Q60 138 65 145 Q70 138 75 148 Q70 143 65 148 Q60 143 55 148Z" fill="#7A9470"/>
                {/* Flower head — independent flutter around top of stem */}
                <motion.g
                  style={{ transformOrigin: "65px 148px" }}
                  animate={{ rotate: [2, -4, 3, -5, 2] }}
                  transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut", repeatType: "mirror" }}
                >
                  {/* Outer petals layer 1 */}
                  <motion.path d="M65 95 Q38 70 34 48 Q50 62 65 78Z" fill="#F2BEC0" opacity="0.72"
                    animate={{ d: ["M65 95 Q38 70 34 48 Q50 62 65 78Z","M65 95 Q36 68 31 46 Q49 61 65 78Z","M65 95 Q38 70 34 48 Q50 62 65 78Z"] }}
                    transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut", repeatType: "mirror" }}
                  />
                  <motion.path d="M65 95 Q92 70 96 48 Q80 62 65 78Z" fill="#F2BEC0" opacity="0.72"
                    animate={{ d: ["M65 95 Q92 70 96 48 Q80 62 65 78Z","M65 95 Q95 67 100 45 Q82 61 65 78Z","M65 95 Q92 70 96 48 Q80 62 65 78Z"] }}
                    transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut", repeatType: "mirror", delay: 0.2 }}
                  />
                  <motion.path d="M65 95 Q32 90 24 74 Q44 78 60 88Z" fill="#EDADB0" opacity="0.72"
                    animate={{ d: ["M65 95 Q32 90 24 74 Q44 78 60 88Z","M65 95 Q30 88 21 72 Q42 77 60 88Z","M65 95 Q32 90 24 74 Q44 78 60 88Z"] }}
                    transition={{ duration: 3.1, repeat: Infinity, ease: "easeInOut", repeatType: "mirror", delay: 0.1 }}
                  />
                  <motion.path d="M65 95 Q98 90 106 74 Q86 78 70 88Z" fill="#EDADB0" opacity="0.72"
                    animate={{ d: ["M65 95 Q98 90 106 74 Q86 78 70 88Z","M65 95 Q101 87 110 72 Q88 77 70 88Z","M65 95 Q98 90 106 74 Q86 78 70 88Z"] }}
                    transition={{ duration: 3.1, repeat: Infinity, ease: "easeInOut", repeatType: "mirror", delay: 0.4 }}
                  />
                  <path d="M65 95 Q44 122 36 138 Q55 120 63 105Z" fill="#F2BEC0" opacity="0.65"/>
                  <path d="M65 95 Q86 122 94 138 Q75 120 67 105Z" fill="#F2BEC0" opacity="0.65"/>
                  {/* Mid petals layer 2 */}
                  <path d="M65 95 Q44 75 49 52 Q60 74 65 88Z" fill="#E89497" opacity="0.82"/>
                  <path d="M65 95 Q86 75 81 52 Q70 74 65 88Z" fill="#E89497" opacity="0.82"/>
                  <path d="M65 95 Q44 108 40 126 Q58 108 63 99Z" fill="#E89497" opacity="0.78"/>
                  <path d="M65 95 Q86 108 90 126 Q72 108 67 99Z" fill="#E89497" opacity="0.78"/>
                  {/* Inner petals layer 3 */}
                  <path d="M65 95 Q52 83 56 68 Q63 84 65 93Z" fill="#D97A7E" opacity="0.9"/>
                  <path d="M65 95 Q78 83 74 68 Q67 84 65 93Z" fill="#D97A7E" opacity="0.9"/>
                  <path d="M65 95 Q54 106 52 119 Q63 106 65 99Z" fill="#D97A7E" opacity="0.88"/>
                  <path d="M65 95 Q76 106 78 119 Q67 106 65 99Z" fill="#D97A7E" opacity="0.88"/>
                  {/* Center */}
                  <circle cx="65" cy="93" r="11" fill="#C96468" opacity="0.92"/>
                  <circle cx="65" cy="93" r="6" fill="#B85458"/>
                  <circle cx="62" cy="91" r="2" fill="#D98082" opacity="0.6"/>
                </motion.g>
              </motion.svg>
            </motion.div>

            {/* Pink framed box */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1.4, ease: "easeOut", delay: 0.2 }}
              className="flex-1 p-8 md:p-10 relative"
              style={{
                backgroundColor: colors.warmHeart,
                boxShadow: `inset 0 0 0 1px rgba(255,255,255,0.35)`,
              }}
            >
              <p
                className="mb-5 text-2xl md:text-3xl italic font-semibold text-center"
                style={{ fontFamily: "'Cormorant Garamond', serif", color: "white" }}
              >
                Une porte vers vous-même.
              </p>
              <p
                className="mb-5 leading-relaxed"
                style={{ fontFamily: "'Cormorant Garamond', serif", color: "white", fontSize: "18px", lineHeight: "1.85" }}
              >
                Car au fond, toutes les réponses sont déjà en vous. Nous sommes ici pour expérimenter, apprendre et évoluer.
                L'âme, dans son essence, cherche à grandir, à s'élever et à transcender. Et ce chemin peut prendre plusieurs
                formes : spirituelles, émotionnelles, concrètes, parfois même inconfortables et éprouvantes.
              </p>
              <p
                className="leading-relaxed"
                style={{ fontFamily: "'Cormorant Garamond', serif", color: "white", fontSize: "18px", lineHeight: "1.85" }}
              >
                À travers mon expérience et la maîtrise des outils, je souhaite simplement vous accompagner dans ce retour
                à vous. Vous aider à vous reconnecter à votre essence, à entendre votre voix intérieure, et à rayonner
                pleinement qui vous êtes.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Section 5 : Mot de clôture ── */}
      <section className="py-16 pb-16 md:py-40 md:pb-24 relative">
        <WatercolorBg variant="default" />
        <motion.p
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.6, ease: "easeOut" }}
          className="max-w-xl mx-auto px-8 text-center relative z-10"
          style={{ fontFamily: "'Cormorant Garamond', serif", color: colors.inkSoft, fontStyle: "italic", fontSize: "19px", lineHeight: "1.95" }}
        >
          Ayant en parallèle une autre activité professionnelle plus terre à terre et par respect pour cette
          dualité, et par choix de déontologie, je ne souhaite pas afficher mon image ici.
          Je préfère que la rencontre se fasse autrement. Parce qu'au fond, l'essentiel ne se voit pas… il se
          perçoit.
        </motion.p>
      </section>

    </div>
  );
};

// ============================================================
// PAGE : GUIDANCE (4 cartes flip façon tarot)
// ============================================================
const TarotCard = ({ duration, price, tagline, description, calendlyUrl }) => {
  const [flipped, setFlipped] = useState(false);

  return (
    <div
      className="relative w-full cursor-pointer"
      style={{ aspectRatio: '943 / 1483', perspective: "1200px" }}
      onClick={() => setFlipped(!flipped)}
    >
      <motion.div
        className="absolute inset-0"
        style={{ transformStyle: "preserve-3d" }}
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
      >
        {/* DOS DE CARTE */}
        <div
          className="absolute inset-0 shadow-xl overflow-hidden"
          style={{
            backfaceVisibility: "hidden",
            backgroundImage: `url('/cover2.png')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            borderRadius: "8px",
          }}
        />

        {/* RECTO DE CARTE */}
        <div
          className="absolute inset-0 rounded-lg shadow-xl p-3 md:p-6 flex flex-col justify-between"
          style={{
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
            backgroundColor: colors.cream,
            border: `1px solid ${colors.rooted}33`,
          }}
        >
          <div className="text-center">
            <p className="text-xs tracking-[0.25em] uppercase mb-2" style={{ color: colors.rooted, fontFamily: "'Cormorant Garamond', serif" }}>
              Lecture d'âme
            </p>
            <h3 className="text-xl md:text-3xl mb-1" style={{ fontFamily: "'Cormorant Garamond', serif", color: colors.ink, fontWeight: 400 }}>
              {duration}
            </h3>
            <p className="text-lg md:text-2xl mb-3" style={{ fontFamily: "'Cormorant Garamond', serif", color: colors.warmHeart, fontWeight: 500 }}>
              {price} €
            </p>
            <div className="w-10 h-[1px] mb-3 mx-auto" style={{ backgroundColor: colors.rooted }} />
            <p className="italic mb-2" style={{ fontFamily: "'Cormorant Garamond', serif", color: colors.rooted, fontSize: "15px" }}>
              {tagline}
            </p>
            <p className="text-sm leading-relaxed" style={{ fontFamily: "'Cormorant Garamond', serif", color: colors.inkSoft, fontSize: "13px", lineHeight: "1.5", whiteSpace: "pre-line" }}>
              {description}
            </p>
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              window.open(calendlyUrl, "_blank", "noopener,noreferrer");
            }}
            className="w-full py-2 md:py-3 mt-2 md:mt-4 text-xs tracking-[0.2em] uppercase transition-all hover:shadow-md flex items-center justify-center gap-2"
            style={{
              backgroundColor: colors.rooted,
              color: colors.cream,
              fontFamily: "'Cormorant Garamond', serif",
              fontWeight: 500,
            }}
          >
            Réserver <ArrowRight size={14} />
          </button>
        </div>
      </motion.div>
    </div>
  );
};

const GuidancePage = () => {
  const cards = [
    { duration: "15 min", price: 25, tagline: "Un éclairage flash", description: "Pour une question ciblée ou un blocage précis. Idéal pour obtenir une clarté et une prise de hauteur sur une thème particulier.", calendlyUrl: "https://calendly.com/anima-retourasoi/30min" },
    { duration: "30 min", price: 45, tagline: "Une conscientisation", description: "Pour approfondir plus en détail une thématique et identifier les schémas répétitifs et bloquants qui se jouent autour de vous et en vous. Conscience et mise en lumière.", calendlyUrl: "https://calendly.com/anima-retourasoi/lecture-d-ame-30min" },
    { duration: "45 min", price: 65, tagline: "Un temps d'exploration", description: "Pour trouver des réponses et activer la transformation. Un espace de conscientisation et d'ouverture. Une lecture plus fine de soi.\nLibération et transformation.", calendlyUrl: "https://calendly.com/anima-retourasoi/lecture-d-ame-45min" },
    { duration: "60 min", price: 80, tagline: "Une traversée complète", description: "Pour un accompagnement en conscience sur un ou plusieurs sujets multidimensionnels. Une reconnexion à soi afin de se repositionner dans son plan. Transcendance et alignement.", calendlyUrl: "https://calendly.com/anima-retourasoi/lecture-d-ame-60min" },
  ];

  return (
    <div className="relative pt-24 pb-24 md:pt-40 md:pb-40" style={{ backgroundColor: colors.cream }}>
      <WatercolorBg variant="warm" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        {/* En-tête */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 md:mb-20"
        >
          <p className="text-sm tracking-[0.25em] uppercase mb-4" style={{ color: colors.rooted, fontFamily: "'Cormorant Garamond', serif" }}>
            Guidance
          </p>
          <h1 className="text-4xl md:text-6xl mb-6" style={{ fontFamily: "'Cormorant Garamond', serif", color: colors.ink, fontWeight: 400 }}>
            Lecture d'âme
          </h1>
          <div className="w-16 h-[1px] mx-auto mb-8" style={{ backgroundColor: colors.rooted }} />
        </motion.div>

        {/* Introduction (mon approche) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mx-auto mb-16 md:mb-28"
        >
          <h2 className="text-3xl mb-6 text-center" style={{ fontFamily: "'Cormorant Garamond', serif", color: colors.ink, fontWeight: 400 }}>
            Mon approche
          </h2>
          <p className="text-xl italic text-center mb-10 leading-relaxed" style={{ fontFamily: "'Cormorant Garamond', serif", color: colors.rooted }}>
            La lecture d'âme n'est pas une simple réponse : c'est un espace de reconnexion à soi, un voyage intérieur.
          </p>

          <div className="space-y-5 text-lg leading-relaxed" style={{ fontFamily: "'Cormorant Garamond', serif", color: colors.ink, fontSize: "18px", lineHeight: "1.8" }}>
            <p>
              Elle vous invite à vous relier à une dimension plus subtile de votre être. Cette part invisible, intuitive et
              profondément consciente ; tout en apportant des éclairages concrets sur ce que vous vivez.
            </p>
            <p>
              C'est une reconnexion à son soi divin, cette version originelle de notre être dans une dimension universelle afin de vous apporter des réponses dans l'ici et maintenant et de vous permettre de cheminer vers le champ des possibles.
            </p>
            <p>
              C'est une porte qui s'ouvre vous offrant la possibilité d'évoluer en conscience, de transcender ce qui doit l'être et de mettre en lumière ce qui doit être libéré afin de vous repositionner dans votre plan d'incarnation.
            </p>
            <p>
              À travers cette lecture, les messages ne viennent pas seulement nourrir la compréhension mentale :
              ils révèlent ce qui, en vous, cherche à émerger, à s'aligner ou à être libéré.
            </p>
            <p>
              C'est une rencontre entre l'invisible et le tangible, entre perception fine et réalité vécue.
            </p>

            <div className="py-4 my-4 pl-6" style={{ borderLeft: `2px solid ${colors.rooted}55` }}>
              <p className="mb-3 font-medium" style={{ color: colors.rooted }}>C'est une porte qui s'ouvre pour vous permettre :</p>
              <ul className="space-y-2" style={{ color: colors.inkSoft }}>
                <li>— d'identifier ce qui demande à être libéré</li>
                <li>— de prendre conscience de tes schémas et blocages</li>
                <li>— de te repositionner de manière plus alignée dans ton plan, ton rythme, ta vérité</li>
              </ul>
            </div>

            <p className="italic" style={{ color: colors.inkSoft }}>
              Car si l'âme guide, c'est bien dans la matière que tout se transforme.
            </p>
          </div>
        </motion.div>

        {/* Modes de séance */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto mb-12 md:mb-24 p-6 md:p-8 rounded-sm"
          style={{ backgroundColor: colors.softLight + "33" }}
        >
          <h3 className="text-xl mb-5 text-center" style={{ fontFamily: "'Cormorant Garamond', serif", color: colors.ink, fontWeight: 500 }}>
            À distance
          </h3>
          <div className="grid grid-cols-3 gap-4 text-center">
            {[
              { icon: Phone, label: "Consultation distancielle", sub: "Audio" },
              { icon: MessageCircle, label: "WhatsApp", sub: "Audio ou message" },
              { icon: Video, label: "Visio", sub: "Zoom / Meet" },
            ].map((mode, i) => (
              <div key={i} className="flex flex-col items-center">
                <mode.icon size={22} style={{ color: colors.rooted }} className="mb-2" />
                <p className="text-sm font-medium" style={{ fontFamily: "'Cormorant Garamond', serif", color: colors.ink, fontSize: "15px" }}>
                  {mode.label}
                </p>
                <p className="text-xs italic" style={{ color: colors.inkSoft, fontFamily: "'Cormorant Garamond', serif" }}>
                  {mode.sub}
                </p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Instruction tirage */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-10 md:mb-16 italic text-lg"
          style={{ fontFamily: "'Cormorant Garamond', serif", color: colors.rooted }}
        >
          Tire une carte pour choisir ton format →
        </motion.p>

        {/* 4 cartes */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8 max-w-5xl mx-auto mb-12 md:mb-20">
          {cards.map((card, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
            >
              <TarotCard {...card} />
            </motion.div>
          ))}
        </div>

        <p className="text-center text-sm italic" style={{ color: colors.inkSoft, fontFamily: "'Cormorant Garamond', serif" }}>
          Clique sur une carte pour la retourner
        </p>
      </div>
    </div>
  );
};

// ============================================================
// PAGE : FENG SHUI
// ============================================================
const FengShuiPage = ({ setCurrentPage }) => {
  return (
    <div className="relative pt-24 pb-24 md:pt-40 md:pb-48" style={{ backgroundColor: colors.cream }}>
      <WatercolorBg variant="cool" />

      <div className="max-w-4xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 md:mb-24"
        >
          <p className="text-sm tracking-[0.25em] uppercase mb-4" style={{ color: colors.rooted, fontFamily: "'Cormorant Garamond', serif" }}>
            Feng Shui & harmonisation
          </p>
          <h1 className="text-4xl md:text-6xl mb-6" style={{ fontFamily: "'Cormorant Garamond', serif", color: colors.ink, fontWeight: 400 }}>
            Réharmonisez votre lieu de vie<br />
            <span className="italic" style={{ color: colors.rooted }}>pour transformer votre vie</span>
          </h1>
          <div className="w-16 h-[1px] mx-auto" style={{ backgroundColor: colors.rooted }} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="space-y-8 text-lg leading-relaxed mb-16 md:mb-28"
          style={{ fontFamily: "'Cormorant Garamond', serif", color: colors.ink, fontSize: "18px", lineHeight: "1.8" }}
        >
          <p className="text-xl italic" style={{ color: colors.rooted }}>
            Votre lieu de vie n'est pas neutre.
          </p>
          <p>
            Il influence votre énergie, vos émotions, vos relations et même la manière dont vos projets avancent.
            Et si certains blocages que vous vivez aujourd'hui ne venaient pas uniquement de vous… mais aussi de
            l'environnement dans lequel vous évoluez ?
          </p>
          <p>
            Le Feng Shui permet de remettre du mouvement là où tout semble figé, et de transformer votre intérieur
            en un véritable soutien à votre évolution personnelle.
          </p>
        </motion.div>

        {/* Image — atmosphère, ouverture, lumière */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="mb-16 md:mb-28 p-3 md:p-4"
          style={{
            backgroundColor: "#ffffff",
            border: `1px solid ${colors.rooted}33`,
            boxShadow: `0 12px 32px -16px ${colors.ink}33`,
          }}
        >
          <img
            src="/feng-shui/1.png"
            alt="Espace harmonisé, circulation du Chi"
            className="w-full h-[280px] md:h-[420px] object-cover"
          />
        </motion.div>

        {/* 2 colonnes : blocages vs harmonisation */}
        <div className="grid md:grid-cols-2 gap-6 mb-16 md:mb-28">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="p-8"
            style={{ backgroundColor: colors.stillness + "22", borderTop: `2px solid ${colors.stillness}` }}
          >
            <h3 className="text-xl mb-4" style={{ fontFamily: "'Cormorant Garamond', serif", color: colors.ink }}>
              Quand l'énergie circule mal
            </h3>
            <ul className="space-y-2" style={{ fontFamily: "'Cormorant Garamond', serif", color: colors.inkSoft, fontSize: "17px" }}>
              <li>— fatigue persistante</li>
              <li>— sensation de stagnation</li>
              <li>— blocages répétitifs</li>
              <li>— confusion ou manque de clarté</li>
              <li>— difficultés à concrétiser ses projets</li>
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="p-8"
            style={{ backgroundColor: colors.flow + "33", borderTop: `2px solid ${colors.flow}` }}
          >
            <h3 className="text-xl mb-4" style={{ fontFamily: "'Cormorant Garamond', serif", color: colors.ink }}>
              Un espace harmonisé soutient
            </h3>
            <ul className="space-y-2" style={{ fontFamily: "'Cormorant Garamond', serif", color: colors.inkSoft, fontSize: "17px" }}>
              <li>— la clarté mentale</li>
              <li>— l'apaisement émotionnel</li>
              <li>— l'élan de vie</li>
              <li>— la fluidité des projets</li>
              <li>— le sentiment d'alignement</li>
            </ul>
          </motion.div>
        </div>

        {/* Mon approche */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-16 md:mb-28 text-center max-w-2xl mx-auto"
        >
          <h2 className="text-3xl mb-6" style={{ fontFamily: "'Cormorant Garamond', serif", color: colors.ink, fontWeight: 400 }}>
            Mon approche
          </h2>
          <p className="text-lg leading-relaxed" style={{ fontFamily: "'Cormorant Garamond', serif", color: colors.ink, fontSize: "18px", lineHeight: "1.75" }}>
            J'allie une lecture énergétique du lieu à une analyse concrète et fonctionnelle de votre habitat.
            Mon travail ne se limite pas à « réorganiser une maison » : il s'agit de comprendre ce que votre espace
            raconte de votre vie actuelle, et comment le transformer pour soutenir celle que vous souhaitez créer.
          </p>
        </motion.div>

        {/* Diptyque — espaces d'intimité & de contemplation */}
        <div className="grid md:grid-cols-2 gap-4 md:gap-6 mb-16 md:mb-28">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="p-3 md:p-4"
            style={{
              backgroundColor: "#ffffff",
              border: `1px solid ${colors.rooted}33`,
              boxShadow: `0 12px 32px -16px ${colors.ink}33`,
            }}
          >
            <img
              src="/feng-shui/2.png"
              alt="Intérieur lumineux, harmonie et fluidité"
              className="w-full aspect-[3/4] object-cover"
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="p-3 md:p-4"
            style={{
              backgroundColor: "#ffffff",
              border: `1px solid ${colors.rooted}33`,
              boxShadow: `0 12px 32px -16px ${colors.ink}33`,
            }}
          >
            <img
              src="/feng-shui/5.jpeg"
              alt="Espace de contemplation, sérénité et ancrage"
              className="w-full aspect-[3/4] object-cover"
            />
          </motion.div>
        </div>

        {/* Étapes */}
        <div className="mb-16 md:mb-28">
          <h2 className="text-3xl mb-10 text-center" style={{ fontFamily: "'Cormorant Garamond', serif", color: colors.ink, fontWeight: 400 }}>
            Les étapes
          </h2>
          <div className="space-y-4">
            {[
              { n: "01", title: "Analyse de votre habitat", desc: "Lecture énergétique et symbolique de votre lieu de vie" },
              { n: "02", title: "Identification des déséquilibres", desc: "Repérage des zones de blocage, stagnation ou surcharge énergétique" },
              { n: "03", title: "Réajustement de l'espace", desc: "Propositions concrètes d'aménagement et d'harmonisation" },
              { n: "04", title: "Alignement avec vos objectifs de vie", desc: "Adaptation de votre intérieur selon vos aspirations : apaisement, renouveau, expansion, harmonie, stabilité" },
            ].map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="flex gap-6 items-start p-5 transition-all hover:bg-white/50"
                style={{ borderBottom: `1px solid ${colors.stillness}44` }}
              >
                <span className="text-4xl font-light" style={{ fontFamily: "'Cormorant Garamond', serif", color: colors.warmHeart }}>
                  {step.n}
                </span>
                <div>
                  <h4 className="text-xl mb-1" style={{ fontFamily: "'Cormorant Garamond', serif", color: colors.ink, fontWeight: 500 }}>
                    {step.title}
                  </h4>
                  <p style={{ fontFamily: "'Cormorant Garamond', serif", color: colors.inkSoft, fontSize: "17px" }}>
                    {step.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Diptyque — espaces réharmonisés */}
        <div className="grid md:grid-cols-2 gap-4 mb-16 md:mb-28">
          {[
            { src: "/feng-shui/3.png", alt: "Pièce réharmonisée, énergie apaisée" },
            { src: "/feng-shui/4.png", alt: "Espace de vie transformé, fluidité et clarté" },
          ].map((img, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: i * 0.1 }}
              className="p-2 md:p-3"
              style={{
                backgroundColor: "#ffffff",
                border: `1px solid ${colors.rooted}33`,
                boxShadow: `0 10px 28px -16px ${colors.ink}33`,
              }}
            >
              <img
                src={img.src}
                alt={img.alt}
                className="w-full aspect-[4/3] object-cover"
              />
            </motion.div>
          ))}
        </div>

        {/* Diagnostic + expertise */}
        <div className="grid md:grid-cols-2 gap-4 md:gap-6 mb-12 md:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="p-8 text-center"
            style={{ backgroundColor: colors.softLight + "44" }}
          >
            <p className="text-sm tracking-[0.25em] uppercase mb-3" style={{ color: colors.rooted, fontFamily: "'Cormorant Garamond', serif" }}>
              Diagnostic
            </p>
            <p className="text-4xl mb-4" style={{ fontFamily: "'Cormorant Garamond', serif", color: colors.ink, fontWeight: 400 }}>
              70 €
            </p>
            <p className="text-sm leading-relaxed mb-5" style={{ fontFamily: "'Cormorant Garamond', serif", color: colors.inkSoft, fontSize: "16px" }}>
              Un premier pas pour évaluer la vibration de votre maison et les axes prioritaires à travailler.
              <br /><em>Ce montant sera déduit d'un accompagnement ultérieur.</em>
            </p>
            <button
              onClick={() => setCurrentPage("contact")}
              className="px-6 py-2 text-xs tracking-[0.2em] uppercase"
              style={{ backgroundColor: colors.rooted, color: colors.cream, fontFamily: "'Cormorant Garamond', serif" }}
            >
              Réserver un diagnostic
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="p-8 text-center"
            style={{ backgroundColor: colors.flow + "44" }}
          >
            <p className="text-sm tracking-[0.25em] uppercase mb-3" style={{ color: colors.rooted, fontFamily: "'Cormorant Garamond', serif" }}>
              Accompagnement complet
            </p>
            <p className="text-4xl mb-4 italic" style={{ fontFamily: "'Cormorant Garamond', serif", color: colors.ink, fontWeight: 400 }}>
              Sur devis
            </p>
            <p className="text-sm leading-relaxed mb-5" style={{ fontFamily: "'Cormorant Garamond', serif", color: colors.inkSoft, fontSize: "16px" }}>
              Chaque accompagnement est entièrement personnalisé selon votre lieu et vos aspirations.
            </p>
            <button
              onClick={() => setCurrentPage("contact")}
              className="px-6 py-2 text-xs tracking-[0.2em] uppercase border"
              style={{ borderColor: colors.rooted, color: colors.rooted, fontFamily: "'Cormorant Garamond', serif" }}
            >
              Me contacter
            </button>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

// ============================================================
// PAGE : TÉMOIGNAGES
// ============================================================
const TestimonialsPage = () => {
  const testimonials = [
  {
    name: "Ksenia",
    text: "Anima est extrêmement douce et bienveillante, son tirage a été d’une précision incroyable nous apportant uniquement les messages que nous sommes prêts à entendre. Il est possible que certains de ces messages ne fassent pas écho sur le coup probablement car nous n’avons nous même pas encore identifié ces problématiques pour autant ils s’avèrent encore plus pertinents dans les mois voir les années qui suivent le tirage. Si vous souhaitez y voir plus clair et identifier les vraies problématiques qui vous bloquent aujourd’hui je recommande ».",
    format: "Lecture 60 min",
  },
  {
    name: "Jenny",
    text: "Un grand merci pour ce moment. Le tirage était vraiment top et les conseils très pertinents. On sent une belle connexion et beaucoup de bienveillance. Foncez les yeux fermés !",
    format: "Lecture 45 min",
  },
  {
    name: "Laura",
    text: "Anima m’a fait un tirage alors que je traversais une période de doutes, et j’ai été agréablement surprise. L’échange était fluide, bienveillant et très juste. On sent vraiment qu’elle exerce avec le cœur, avec une écoute sincère et sans jugement. Certaines choses évoquées étaient précises et m’ont beaucoup parlé. C’est à la fois surprenant et fascinant… Merci pour cette belle consultation.",
    format: "",
  },
  {
    name: "Leslie",
    text: "C’est une personne bienveillante, à l’écoute, qui m’a aidée à souffler, à me poser et à relativiser dans des moments où j’en avais besoin. Elle sait apporter de la chaleur, du réconfort et nous aide toujours à retrouver un peu de lumière et de positif dans nos énergies et notre quotidien.",
    format: "",
  },
  {
    name: "Karine",
    text: "J’ai eu l’occasion de découvrir Amina lors d’une séance de guidance, séance rythmée par la douceur de ses mots et de sa voix. Chaque tirage est réalisé avec beaucoup de pédagogie et laisse place ensuite à la réflexion, l’émotion, l’assimilation et la maturité. Après ces quelques mois passés, je réalise aujourd’hui le chemin parcouru et l’éveil réalisé… Quelle belle rencontre et quelle belle âme ! Si vous souhaitez partir à la recherche de votre « moi » le plus profond vous êtes à la bonne porte, Amina détient toutes les clés pour vous permettre d’avancer…",
    format: "Lecture 60 min",
  },
];

  const total = testimonials.length;
  const [current, setCurrent] = useState(0);
  const [flip, setFlip] = useState<{ dir: number; from: number; to: number } | null>(null);

  // Single motion value = the turning leaf's angle in degrees. Forward turns
  // 0 → -180 (leaf lifts from the right edge, pivots on the spine, lands on the
  // left). Backward runs -180 → 0. Both fold-shadows are derived from this angle
  // so the lighting tracks the real geometry, not a timer.
  const rot = useMotionValue(0);
  const absRot = useTransform(rot, (v) => Math.min(Math.abs(v), 180));
  // Front face is lit at 0°, in deepest shadow as it reaches the 90° edge.
  const frontShade = useTransform(absRot, [0, 90], [0, 0.55], { clamp: true });
  // Back face only shows past 90°; darkest at the edge, lit flat at 180°.
  const backShade = useTransform(absRot, [90, 180], [0.55, 0], { clamp: true });
  // The lifted leaf casts a soft travelling shadow on the page resting beneath.
  const castShade = useTransform(absRot, [0, 90, 180], [0, 0.28, 0], { clamp: true });

  const TURN_DURATION = 1.85;
  const TURN_EASE = [0.5, 0.02, 0.32, 1] as const;

  useEffect(() => {
    if (!flip) return;
    const from = flip.dir > 0 ? 0 : -180;
    const to = flip.dir > 0 ? -180 : 0;
    rot.set(from);
    const controls = animate(rot, to, {
      duration: TURN_DURATION,
      ease: TURN_EASE,
      onComplete: () => {
        setCurrent(flip.to);
        setFlip(null);
      },
    });
    return () => controls.stop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [flip]);

  const go = (dir: number) => {
    if (flip) return;
    setFlip({ dir, from: current, to: (current + dir + total) % total });
  };
  const jumpTo = (idx: number) => {
    if (flip || idx === current) return;
    setFlip({ dir: idx > current ? 1 : -1, from: current, to: idx });
  };

  // The static page resting at the bottom of the stack. Going forward it is
  // already the destination (revealed as the leaf lifts); going back it is the
  // page we are leaving (covered as the previous leaf drops onto it).
  const bottomIdx = flip ? (flip.dir > 0 ? flip.to : flip.from) : current;
  // The content printed on the front (recto) of the turning leaf.
  const leafIdx = flip ? (flip.dir > 0 ? flip.from : flip.to) : current;

  // Recto of a page — shared by the resting page and the leaf's front face.
  // Plain render helper (not a component) so it doesn't remount on each render.
  const pageRecto = (idx: number) => {
    const item = testimonials[idx];
    return (
      <>
        {/* Reliure + ombre de pliure (côté spine, à gauche) */}
        <div className="absolute inset-y-0 left-0 w-12 pointer-events-none" style={{ background: `linear-gradient(to right, ${colors.rooted}26, transparent)` }} />
        <div className="absolute inset-y-0 left-0 w-[3px]" style={{ backgroundColor: colors.rooted, opacity: 0.45 }} />
        <div className="h-full flex flex-col justify-between pl-8 pr-5 md:pl-16 md:pr-12 py-8 md:py-14 text-center">
          <div className="flex flex-col items-center flex-1 justify-center">
            <Quote size={24} className="mb-4 md:mb-6" style={{ color: colors.rooted, opacity: 0.35 }} />
            <p className="italic leading-relaxed overflow-y-auto" style={{ fontFamily: "'Cormorant Garamond', serif", color: colors.ink, fontSize: "clamp(14px, 2.2vw, 18px)", lineHeight: "1.75" }}>
              {item.text}
            </p>
          </div>
          <div className="mt-8">
            <div className="w-12 h-[1px] mx-auto mb-4" style={{ backgroundColor: colors.rooted, opacity: 0.6 }} />
            <p style={{ fontFamily: "'Dancing Script', cursive", color: colors.rooted, fontSize: "clamp(20px, 3.5vw, 28px)", lineHeight: 1 }}>
              {item.name}
            </p>
            {item.format && (
              <p className="text-xs tracking-[0.18em] uppercase mt-2" style={{ color: colors.inkSoft, fontFamily: "'Cormorant Garamond', serif" }}>
                {item.format}
              </p>
            )}
            <p className="text-xs italic mt-5" style={{ color: colors.stillness, fontFamily: "'Cormorant Garamond', serif" }}>
              — {idx + 1} / {total} —
            </p>
          </div>
        </div>
      </>
    );
  };

  const pageSurface = {
    backgroundColor: "#FFFEFB",
    borderRight: `1px solid ${colors.stillness}44`,
    borderTop: `1px solid ${colors.stillness}44`,
    borderBottom: `1px solid ${colors.stillness}44`,
  } as const;

  return (
    <div className="relative pt-24 pb-24 md:pt-40 md:pb-48" style={{ backgroundColor: colors.cream }}>
      <WatercolorBg variant="warm" />

      <div className="max-w-5xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 md:mb-20"
        >
          <p className="text-sm tracking-[0.25em] uppercase mb-4" style={{ color: colors.rooted, fontFamily: "'Cormorant Garamond', serif" }}>
            Témoignages
          </p>
          <h1 className="text-4xl md:text-6xl mb-6" style={{ fontFamily: "'Cormorant Garamond', serif", color: colors.ink, fontWeight: 400 }}>
            Ils ont franchi la porte
          </h1>
          <div className="w-16 h-[1px] mx-auto mb-6" style={{ backgroundColor: colors.rooted }} />
          <p className="italic text-lg max-w-2xl mx-auto" style={{ fontFamily: "'Cormorant Garamond', serif", color: colors.inkSoft }}>
            Quelques mots partagés par celles et ceux qui ont vécu l'expérience.
            <br />
            <span className="text-sm" style={{ color: colors.rooted }}>Tournez les pages du livre d'or.</span>
          </p>
        </motion.div>

        {/* ── Livre d'or ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
          className="relative mx-auto flex items-center justify-center gap-2 md:gap-5"
        >
          {/* Flèche précédente */}
          <button
            onClick={() => go(-1)}
            aria-label="Témoignage précédent"
            className="flex-shrink-0 w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center transition-all hover:scale-110 disabled:opacity-40"
            style={{ color: colors.rooted, backgroundColor: "#FFFFFF99", border: `1px solid ${colors.rooted}33` }}
          >
            <ChevronLeft size={22} />
          </button>

          {/* Corps du livre */}
          <div
            className="relative w-full"
            style={{ perspective: 1900, perspectiveOrigin: "50% 42%", maxWidth: 560 }}
          >
            {/* Tranche de pages empilées (épaisseur du livre) */}
            <div className="absolute inset-0 translate-x-[8px] translate-y-[9px] rounded-r-md" style={{ backgroundColor: "#E8DFD2", border: `1px solid ${colors.stillness}44` }} />
            <div className="absolute inset-0 translate-x-[5px] translate-y-[6px] rounded-r-md" style={{ backgroundColor: "#EFE7DC", border: `1px solid ${colors.stillness}44` }} />
            <div className="absolute inset-0 translate-x-[2px] translate-y-[3px] rounded-r-md" style={{ backgroundColor: "#F5EDE3", border: `1px solid ${colors.stillness}44` }} />

            {/* Zone de page */}
            <div className="relative h-[460px] md:h-[560px]" style={{ transformStyle: "preserve-3d" }}>
              {/* Page au repos (sous la pile) */}
              <div className="absolute inset-0 overflow-hidden rounded-r-md" style={{ ...pageSurface, zIndex: 1 }}>
                {pageRecto(bottomIdx)}
                {/* Ombre projetée par la feuille qui se soulève */}
                <motion.div
                  className="absolute inset-0 pointer-events-none"
                  style={{ opacity: castShade, background: `linear-gradient(to right, ${colors.ink}, transparent 60%)` }}
                />
              </div>

              {/* Feuille qui tourne (recto + verso) */}
              {flip && (
                <motion.div
                  className="absolute inset-0"
                  style={{ rotateY: rot, transformOrigin: "left center", transformStyle: "preserve-3d", zIndex: 20 }}
                >
                  {/* RECTO */}
                  <div
                    className="absolute inset-0 overflow-hidden rounded-r-md"
                    style={{ ...pageSurface, backfaceVisibility: "hidden", boxShadow: `0 24px 55px -26px ${colors.ink}55` }}
                  >
                    {pageRecto(leafIdx)}
                    <motion.div
                      className="absolute inset-0 pointer-events-none"
                      style={{ opacity: frontShade, background: `linear-gradient(to right, transparent, ${colors.ink} 130%)` }}
                    />
                  </div>

                  {/* VERSO (dos de la feuille — spine à droite une fois retournée) */}
                  <div
                    className="absolute inset-0 overflow-hidden rounded-l-md flex items-center justify-center"
                    style={{
                      backgroundColor: "#FBF3E9",
                      border: `1px solid ${colors.stillness}44`,
                      backfaceVisibility: "hidden",
                      transform: "rotateY(180deg)",
                      boxShadow: `0 24px 55px -26px ${colors.ink}55`,
                    }}
                  >
                    {/* Reliure côté droit + grain papier */}
                    <div className="absolute inset-y-0 right-0 w-12 pointer-events-none" style={{ background: `linear-gradient(to left, ${colors.rooted}26, transparent)` }} />
                    <div className="absolute inset-y-0 right-0 w-[3px]" style={{ backgroundColor: colors.rooted, opacity: 0.45 }} />
                    <div className="absolute inset-0 pointer-events-none" style={{ background: `radial-gradient(ellipse at center, transparent 55%, ${colors.softLight}33 100%)` }} />
                    {/* Petit fleuron au centre du dos */}
                    <div className="flex flex-col items-center gap-3 opacity-50">
                      <div className="w-10 h-[1px]" style={{ backgroundColor: colors.rooted }} />
                      <Feather size={26} style={{ color: colors.rooted }} />
                      <div className="w-10 h-[1px]" style={{ backgroundColor: colors.rooted }} />
                    </div>
                    <motion.div
                      className="absolute inset-0 pointer-events-none"
                      style={{ opacity: backShade, background: `linear-gradient(to left, transparent, ${colors.ink} 130%)` }}
                    />
                  </div>
                </motion.div>
              )}
            </div>
          </div>

          {/* Flèche suivante */}
          <button
            onClick={() => go(1)}
            aria-label="Témoignage suivant"
            className="flex-shrink-0 w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center transition-all hover:scale-110 disabled:opacity-40"
            style={{ color: colors.rooted, backgroundColor: "#FFFFFF99", border: `1px solid ${colors.rooted}33` }}
          >
            <ChevronRight size={22} />
          </button>
        </motion.div>

        {/* Pastilles de navigation */}
        <div className="flex items-center justify-center gap-3 mt-16">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => jumpTo(i)}
              aria-label={`Aller au témoignage ${i + 1}`}
              className="rounded-full transition-all"
              style={{
                width: i === current ? 26 : 9,
                height: 9,
                backgroundColor: i === current ? colors.rooted : colors.stillness,
                opacity: i === current ? 1 : 0.5,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

// ============================================================
// PAGE : CONTACT
// ============================================================
const ContactPage = () => {
  const [form, setForm] = useState({ name: "", email: "", subject: "general", message: "" });
  const [sent, setSent] = useState(false);

  const submit = (e) => {
    e.preventDefault();
    // TODO V2 : envoyer via Resend / API route Next.js
    setSent(true);
    setTimeout(() => setSent(false), 4000);
    setForm({ name: "", email: "", subject: "general", message: "" });
  };

  return (
    <div className="relative pt-24 pb-24 md:pt-40 md:pb-48" style={{ backgroundColor: colors.cream }}>
      <WatercolorBg variant="default" />

      <div className="max-w-4xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 md:mb-24"
        >
          <p className="text-sm tracking-[0.25em] uppercase mb-4" style={{ color: colors.rooted, fontFamily: "'Cormorant Garamond', serif" }}>
            Contact
          </p>
          <h1 className="text-4xl md:text-6xl mb-6" style={{ fontFamily: "'Cormorant Garamond', serif", color: colors.ink, fontWeight: 400 }}>
            Prendre contact
          </h1>
          <div className="w-16 h-[1px] mx-auto mb-6" style={{ backgroundColor: colors.rooted }} />
          <p className="italic text-lg max-w-xl mx-auto" style={{ fontFamily: "'Cormorant Garamond', serif", color: colors.inkSoft }}>
            Une question, un doute, l'envie d'échanger avant de réserver ?<br />
            Écris-moi, je te réponds avec soin.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Infos contact */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="space-y-6"
          >
            <div>
              <p className="text-xs tracking-[0.2em] uppercase mb-2" style={{ color: colors.rooted, fontFamily: "'Cormorant Garamond', serif" }}>
                <Mail size={14} className="inline mr-2" />Email
              </p>
              <p style={{ fontFamily: "'Cormorant Garamond', serif", color: colors.ink, fontSize: "17px" }}>
                contact@anima-retour-a-soi.fr
              </p>
            </div>
            <div>
              <p className="text-xs tracking-[0.2em] uppercase mb-2" style={{ color: colors.rooted, fontFamily: "'Cormorant Garamond', serif" }}>
                <Instagram size={14} className="inline mr-2" />Instagram
              </p>
              <p style={{ fontFamily: "'Cormorant Garamond', serif", color: colors.ink, fontSize: "17px" }}>
                [@handle_instagram]
              </p>
            </div>
          </motion.div>

          {/* Formulaire */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="md:col-span-2"
          >
            <div onSubmit={submit} className="space-y-5">
              <div className="grid md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs tracking-[0.15em] uppercase mb-2" style={{ color: colors.rooted, fontFamily: "'Cormorant Garamond', serif" }}>
                    Prénom
                  </label>
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    required
                    className="w-full px-4 py-3 bg-white/70 border focus:outline-none focus:border-opacity-100 transition-all"
                    style={{ borderColor: colors.rooted + "44", fontFamily: "'Cormorant Garamond', serif", color: colors.ink, fontSize: "16px" }}
                  />
                </div>
                <div>
                  <label className="block text-xs tracking-[0.15em] uppercase mb-2" style={{ color: colors.rooted, fontFamily: "'Cormorant Garamond', serif" }}>
                    Email
                  </label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    required
                    className="w-full px-4 py-3 bg-white/70 border focus:outline-none transition-all"
                    style={{ borderColor: colors.rooted + "44", fontFamily: "'Cormorant Garamond', serif", color: colors.ink, fontSize: "16px" }}
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs tracking-[0.15em] uppercase mb-2" style={{ color: colors.rooted, fontFamily: "'Cormorant Garamond', serif" }}>
                  Sujet
                </label>
                <select
                  value={form.subject}
                  onChange={(e) => setForm({ ...form, subject: e.target.value })}
                  className="w-full px-4 py-3 bg-white/70 border focus:outline-none transition-all"
                  style={{ borderColor: colors.rooted + "44", fontFamily: "'Cormorant Garamond', serif", color: colors.ink, fontSize: "16px" }}
                >
                  <option value="general">Question générale</option>
                  <option value="guidance">Lecture d'âme</option>
                  <option value="fengshui">Feng Shui</option>
                  <option value="other">Autre</option>
                </select>
              </div>

              <div>
                <label className="block text-xs tracking-[0.15em] uppercase mb-2" style={{ color: colors.rooted, fontFamily: "'Cormorant Garamond', serif" }}>
                  Message
                </label>
                <textarea
                  rows={6}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  required
                  className="w-full px-4 py-3 bg-white/70 border focus:outline-none transition-all resize-none"
                  style={{ borderColor: colors.rooted + "44", fontFamily: "'Cormorant Garamond', serif", color: colors.ink, fontSize: "16px" }}
                />
              </div>

              <button
                type="button"
                onClick={submit}
                className="px-8 py-3 text-sm tracking-[0.2em] uppercase transition-all hover:shadow-lg"
                style={{ backgroundColor: colors.rooted, color: colors.cream, fontFamily: "'Cormorant Garamond', serif" }}
              >
                Envoyer le message
              </button>

              {sent && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="italic"
                  style={{ color: colors.rooted, fontFamily: "'Cormorant Garamond', serif" }}
                >
                  ✓ Message envoyé — je te réponds sous 48h.
                </motion.p>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

// ============================================================
// FOOTER
// ============================================================
const Footer = ({ setCurrentPage }) => {
  return (
    <footer className="py-12 px-6 border-t" style={{ backgroundColor: colors.cream, borderColor: colors.stillness + "55" }}>
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-4 gap-8 mb-10">
          <div className="md:col-span-2">
            <Logo size="md" />
            <p className="mt-4 max-w-sm italic" style={{ fontFamily: "'Cormorant Garamond', serif", color: colors.inkSoft, fontSize: "16px" }}>
              Un espace doux pour se reconnecter à son essence et rayonner pleinement qui l'on est.
            </p>
          </div>

          <div>
            <p className="text-xs tracking-[0.2em] uppercase mb-3" style={{ color: colors.rooted, fontFamily: "'Cormorant Garamond', serif" }}>
              Navigation
            </p>
            <ul className="space-y-2">
              {NAV_ITEMS.map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => { setCurrentPage(item.id); window.scrollTo({ top: 0 }); }}
                    className="transition-colors hover:underline"
                    style={{ fontFamily: "'Cormorant Garamond', serif", color: colors.inkSoft, fontSize: "15px" }}
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-xs tracking-[0.2em] uppercase mb-3" style={{ color: colors.rooted, fontFamily: "'Cormorant Garamond', serif" }}>
              Contact
            </p>
            <ul className="space-y-2" style={{ fontFamily: "'Cormorant Garamond', serif", color: colors.inkSoft, fontSize: "15px" }}>
              <li>contact@anima-retour-a-soi.fr</li>
              <li>Bordeaux</li>
              <li>
                <button onClick={() => setCurrentPage("mentions")} className="hover:underline italic">
                  Mentions légales
                </button>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-6 text-center border-t" style={{ borderColor: colors.stillness + "44" }}>
          <p className="text-xs italic mb-2" style={{ fontFamily: "'Cormorant Garamond', serif", color: colors.inkSoft }}>
            N'étant pas professionnelle de santé, mon approche ne remplace en aucun cas un suivi médical ou psychologique.
          </p>
          <p className="text-xs" suppressHydrationWarning style={{ fontFamily: "'Cormorant Garamond', serif", color: colors.inkSoft }}>
            © {new Date().getFullYear()} Anima — éveil & retour à soi
          </p>
        </div>
      </div>
    </footer>
  );
};

// ============================================================
// PAGE : MENTIONS LÉGALES
// ============================================================
const MentionsPage = () => (
  <div className="relative pt-32 pb-24" style={{ backgroundColor: colors.cream }}>
    <div className="max-w-3xl mx-auto px-6">
      <h1 className="text-4xl mb-10" style={{ fontFamily: "'Cormorant Garamond', serif", color: colors.ink, fontWeight: 400 }}>
        Mentions légales
      </h1>
      <div className="space-y-6" style={{ fontFamily: "'Cormorant Garamond', serif", color: colors.ink, fontSize: "17px", lineHeight: "1.7" }}>
        {[
          { t: "Éditeur du site", c: "Anima\n[Statut juridique — À COMPLÉTER]\n[Adresse — À COMPLÉTER]\nSIRET : [À COMPLÉTER]\nEmail : contact@anima-retour-a-soi.fr\n" },
          { t: "Hébergement", c: "Vercel Inc.\n340 S Lemon Ave #4133\nWalnut, CA 91789, USA" },
          { t: "Propriété intellectuelle", c: "L'ensemble des contenus (textes, images, graphismes, logo) présents sur ce site sont la propriété exclusive de Anima, sauf mention contraire." },
          { t: "Données personnelles (RGPD)", c: "Les informations recueillies via le formulaire de contact sont destinées uniquement à répondre à votre demande. Aucune donnée n'est transmise à des tiers. Conformément au RGPD, vous disposez d'un droit d'accès, de rectification et de suppression de vos données." },
          { t: "Avertissement", c: "Les prestations proposées sur ce site (lecture d'âme, Feng Shui) relèvent d'un accompagnement personnel et ne constituent en aucun cas un avis ou un suivi médical, psychologique ou thérapeutique." },
        ].map((s, i) => (
          <div key={i}>
            <h2 className="text-xl mb-2" style={{ color: colors.rooted, fontWeight: 500 }}>{s.t}</h2>
            <p className="whitespace-pre-line">{s.c}</p>
          </div>
        ))}
      </div>
      <div className="mt-10 p-4 text-center text-sm italic" style={{ backgroundColor: colors.warmHeart + "22", color: colors.rooted, fontFamily: "'Cormorant Garamond', serif" }}>
        ⚠️ Les éléments entre crochets [ ] sont à compléter avant la mise en ligne.
      </div>
    </div>
  </div>
);

// ============================================================
// APP ROOT
// ============================================================
export default function App() {
  const [currentPage, setCurrentPage] = useState("home");

  const pages = {
    home: <HomePage setCurrentPage={setCurrentPage} />,
    about: <AboutPage />,
    guidance: <GuidancePage />,
    fengshui: <FengShuiPage setCurrentPage={setCurrentPage} />,
    testimonials: <TestimonialsPage />,
    contact: <ContactPage />,
    mentions: <MentionsPage />,
  };

  return (
    <div style={{ backgroundColor: colors.cream, color: colors.ink, fontFamily: "'Cormorant Garamond', serif" }}>
      {/* Google Fonts */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=Dancing+Script:wght@400;500;600&display=swap');
        body { margin: 0; }
        * { -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale; }
        input:focus, textarea:focus, select:focus { border-color: ${colors.rooted} !important; outline: none; }
        button { cursor: pointer; }
        ::selection { background: ${colors.softLight}; color: ${colors.ink}; }
      `}</style>

      <Nav currentPage={currentPage} setCurrentPage={setCurrentPage} />

      <AnimatePresence mode="wait">
        <motion.div
          key={currentPage}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
        >
          {pages[currentPage]}
        </motion.div>
      </AnimatePresence>

      <Footer setCurrentPage={setCurrentPage} />
    </div>
  );
}
