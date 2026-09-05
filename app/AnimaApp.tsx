"use client";
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @next/next/no-img-element */
import { useState, useEffect, type ReactNode } from "react";
import { motion, AnimatePresence, useMotionValue, useTransform, animate } from "framer-motion";
import {
  Menu, X, Phone, Mail, MessageCircle, Video,
  MapPin, ArrowRight, Sparkles, Home, Feather, Quote, ChevronDown,
  ChevronLeft, ChevronRight, Sun, Compass
} from "lucide-react";
import { colors } from "./theme";
import { bookingUrl } from "./booking";


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
  { id: "accompagnements", label: "Accompagnements" },
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
        <div className="hidden md:flex items-center gap-4 lg:gap-7">
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
              "linear-gradient(to bottom, rgba(251,248,244,0) 40%, rgba(251,248,244,0.65) 75%, rgba(251,248,244,0.85) 100%)",
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

        {/* Grille : plein écran image sur mobile, deux colonnes sur desktop */}
        <div className="relative z-10 w-full h-full min-h-screen grid grid-cols-1 md:grid-cols-2 items-end md:items-center px-8 md:px-16 lg:px-24 md:gap-y-0 pb-24 md:pb-0">

          {/* Colonne gauche — Logo (caché sur mobile, déjà dans la nav) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, filter: "blur(10px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            transition={{ duration: 2.2, ease: "easeOut", delay: 0.5 }}
            className="hidden md:flex items-center md:justify-start relative"
          >
            <Logo size="hero" />
          </motion.div>

          {/* Colonne droite — Tagline + boutons */}
          <div className="flex flex-col items-center md:items-end text-center md:text-right gap-6 md:gap-8">
            {/* Mystic white halo behind tagline — mobile only */}
            <div className="relative md:static">
              <div
                className="absolute md:hidden pointer-events-none"
                style={{
                  inset: "-75% -55%",
                  background: "radial-gradient(ellipse at center, rgba(255,255,255,0.82) 0%, rgba(255,255,255,0.52) 30%, rgba(255,255,255,0.18) 56%, transparent 75%)",
                  filter: "blur(24px)",
                }}
              />
              <motion.p
                initial={{ opacity: 0, y: 14, filter: "blur(6px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ duration: 1.8, ease: "easeOut", delay: 1.0 }}
                className="text-xl md:text-xl italic leading-relaxed max-w-sm md:max-w-xs relative"
                style={{ fontFamily: "'Cormorant Garamond', serif", color: colors.ink, textShadow: "0 0 18px rgba(255,255,255,0.9), 0 0 6px rgba(255,255,255,0.6)" }}
              >
                Un espace doux pour se reconnecter à son essence,
                écouter sa voix intérieure, et rayonner pleinement qui l'on est.
              </motion.p>
            </div>
            <div className="flex flex-col gap-3 w-full max-w-sm md:max-w-xs">
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

        {/* Indicateur de scroll — caché sur mobile (boutons suffisent) */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:block"
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
              Au fond, toutes les réponses sont déjà en vous.
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
                Au fond, toutes les réponses sont déjà en vous. Nous sommes ici pour expérimenter, apprendre et évoluer.
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
const TarotCard = ({ duration, price, tagline, description, bookingHref }) => {
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
          className="absolute inset-0 rounded-lg shadow-xl p-3 md:p-6 flex flex-col overflow-hidden"
          style={{
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
            backgroundColor: colors.cream,
            border: `1px solid ${colors.rooted}33`,
          }}
        >
          <div className="text-center flex-1 min-h-0 overflow-hidden">
            <p className="text-xs tracking-[0.25em] uppercase mb-1 md:mb-2" style={{ color: colors.rooted, fontFamily: "'Cormorant Garamond', serif" }}>
              Lecture d'âme
            </p>
            <h3 className="text-xl md:text-3xl mb-1" style={{ fontFamily: "'Cormorant Garamond', serif", color: colors.ink, fontWeight: 400 }}>
              {duration}
            </h3>
            <p className="text-lg md:text-2xl mb-2 md:mb-3" style={{ fontFamily: "'Cormorant Garamond', serif", color: colors.warmHeart, fontWeight: 500 }}>
              {price} €
            </p>
            <div className="w-10 h-[1px] mb-2 md:mb-3 mx-auto" style={{ backgroundColor: colors.rooted }} />
            <p className="italic mb-1 md:mb-2" style={{ fontFamily: "'Cormorant Garamond', serif", color: colors.rooted, fontSize: "14px" }}>
              {tagline}
            </p>
            <p className="text-sm leading-relaxed line-clamp-3 md:line-clamp-none" style={{ fontFamily: "'Cormorant Garamond', serif", color: colors.inkSoft, fontSize: "12px", lineHeight: "1.45" }}>
              {description}
            </p>
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              window.open(bookingHref, "_blank", "noopener,noreferrer");
            }}
            className="w-full py-2 md:py-3 mt-auto flex-shrink-0 text-xs tracking-[0.2em] uppercase transition-all hover:shadow-md flex items-center justify-center gap-2"
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
    { duration: "15 min", price: 25, tagline: "Un éclairage flash", description: "Pour une question ciblée ou un blocage précis. Idéal pour obtenir une clarté et une prise de hauteur sur une thème particulier.", bookingHref: bookingUrl("lecture-d-ame-15min") },
    { duration: "30 min", price: 45, tagline: "Une conscientisation", description: "Pour approfondir plus en détail une thématique et identifier les schémas répétitifs et bloquants qui se jouent autour de vous et en vous. Conscience et mise en lumière.", bookingHref: bookingUrl("lecture-d-ame-30min") },
    { duration: "45 min", price: 65, tagline: "Un temps d'exploration", description: "Pour trouver des réponses et activer la transformation. Un espace de conscientisation et d'ouverture. Une lecture plus fine de soi.\nLibération et transformation.", bookingHref: bookingUrl("lecture-d-ame-45min") },
    { duration: "60 min", price: 80, tagline: "Une traversée complète", description: "Pour un accompagnement en conscience sur un ou plusieurs sujets multidimensionnels. Une reconnexion à soi afin de se repositionner dans son plan. Transcendance et alignement.", bookingHref: bookingUrl("lecture-d-ame-60min") },
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
// PAGE : ACCOMPAGNEMENTS HOLISTIQUES (programmes 2 mois)
// ============================================================

// Petit pétale décoratif — puce de liste dans le thème du site
const PetalBullet = ({ color = colors.rooted, opacity = 0.55 }: { color?: string; opacity?: number }) => (
  <svg width="11" height="14" viewBox="0 0 11 14" className="mt-[4px] shrink-0" aria-hidden="true">
    <path d="M5.5 0 C8.6 4 8.6 8.6 5.5 14 C2.4 8.6 2.4 4 5.5 0 Z" fill={color} opacity={opacity} />
  </svg>
);

// Médaillon lotus animé — emblème SVG décliné par formule.
// Trois calques empilés (anneaux statiques, pétales extérieurs CW,
// pétales intérieurs CCW, cœur pulsé) : chaque <svg> tourne autour de
// son propre centre, ce qui évite les aléas de transform-origin en SVG.
const LotusMedallion = ({ accent, soft, size = 128 }: { accent: string; soft: string; size?: number }) => {
  const petalOut = "M60 60 C52 43 52 24 60 11 C68 24 68 43 60 60 Z";
  const petalIn = "M60 60 C55 49 55 36 60 27 C65 36 65 49 60 60 Z";
  const outer = [0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330];
  const inner = [22.5, 67.5, 112.5, 157.5, 202.5, 247.5, 292.5, 337.5];
  return (
    <div className="relative shrink-0" style={{ width: size, height: size }}>
      {/* halo diffus */}
      <div
        className="absolute rounded-full pointer-events-none"
        style={{ inset: -size * 0.16, background: `radial-gradient(circle, ${accent}33 0%, transparent 66%)` }}
      />
      {/* anneaux statiques */}
      <svg viewBox="0 0 120 120" className="absolute inset-0 w-full h-full">
        <circle cx="60" cy="60" r="57" fill="none" stroke={accent} strokeWidth="0.6" opacity="0.45" />
        <circle cx="60" cy="60" r="48" fill="none" stroke={accent} strokeWidth="0.5" opacity="0.28" />
      </svg>
      {/* pétales extérieurs — rotation horaire */}
      <motion.svg
        viewBox="0 0 120 120"
        className="absolute inset-0 w-full h-full"
        animate={{ rotate: 360 }}
        transition={{ duration: 110, repeat: Infinity, ease: "linear" }}
      >
        {outer.map((a) => (
          <path key={a} d={petalOut} fill={soft} stroke={accent} strokeWidth="0.55" opacity="0.5" transform={`rotate(${a} 60 60)`} />
        ))}
      </motion.svg>
      {/* pétales intérieurs — rotation anti-horaire */}
      <motion.svg
        viewBox="0 0 120 120"
        className="absolute inset-0 w-full h-full"
        animate={{ rotate: -360 }}
        transition={{ duration: 150, repeat: Infinity, ease: "linear" }}
      >
        {inner.map((a) => (
          <path key={a} d={petalIn} fill={accent} opacity="0.26" transform={`rotate(${a} 60 60)`} />
        ))}
      </motion.svg>
      {/* cœur pulsé */}
      <motion.svg
        viewBox="0 0 120 120"
        className="absolute inset-0 w-full h-full"
        animate={{ scale: [1, 1.06, 1] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      >
        <circle cx="60" cy="60" r="9" fill={accent} opacity="0.85" />
        <circle cx="60" cy="60" r="3.8" fill={soft} />
      </motion.svg>
    </div>
  );
};

// Les 5 étapes du parcours
const ETAPES = [
  {
    n: "01",
    icon: Sparkles,
    title: "Séance d'ouverture — Lecture d'âme",
    meta: "2 heures",
    intro: "Cette première rencontre pose les bases de l'accompagnement. Ensemble, nous explorons :",
    points: [
      "votre énergie actuelle",
      "les blocages conscients et inconscients",
      "les schémas répétitifs",
      "les blessures émotionnelles",
      "vos ressources profondes",
      "les messages de votre âme",
      "votre potentiel d'évolution",
      "les axes de transformation prioritaires",
    ],
    outro: "À l'issue de cette séance, un axe de travail personnalisé est défini pour les huit semaines d'accompagnement.",
  },
  {
    n: "02",
    icon: MessageCircle,
    title: "Suivi personnalisé",
    meta: "Tout au long des 2 mois",
    intro: "Vous bénéficiez d'un accompagnement régulier via WhatsApp. Ce suivi comprend :",
    points: [
      "des échanges pour répondre à vos questionnements",
      "un soutien dans les périodes de doute",
      "des ajustements selon votre évolution",
      "des messages de guidance lorsque cela est nécessaire",
      "un accompagnement bienveillant entre les séances",
    ],
    outro: "L'objectif est que vous ne soyez jamais seul(e) dans votre processus de transformation.",
  },
  {
    n: "03",
    icon: Feather,
    title: "Exercices de transformation intérieure",
    meta: "Chaque semaine",
    intro: "Chaque semaine, vous recevez des pratiques adaptées à votre évolution. Selon vos besoins, elles peuvent inclure :",
    points: [
      "exercices de libération émotionnelle",
      "prises de conscience guidées",
      "travail sur les croyances limitantes",
      "exercices de pardon",
      "pratiques de reconnexion au corps",
      "méditations et visualisations",
      "rituels de transmutation énergétique",
      "journaling intuitif",
      "exercices d'ancrage et d'alignement",
    ],
    outro: "Chaque exercice est choisi en fonction de votre cheminement personnel.",
  },
  {
    n: "04",
    icon: Sun,
    title: "Soins énergétiques",
    meta: "Présentiel ou à distance",
    intro: "Durant l'accompagnement, des soins énergétiques viennent soutenir votre évolution. Ils permettent notamment :",
    points: [
      "d'harmoniser les centres énergétiques",
      "de libérer certaines mémoires",
      "d'apaiser le système émotionnel",
      "de favoriser l'ancrage",
      "de retrouver une meilleure circulation de l'énergie",
      "d'accompagner les transformations vécues pendant le programme",
    ],
    outro: "Chaque soin est adapté aux besoins du moment.",
  },
  {
    n: "05",
    icon: Compass,
    title: "Coaching holistique",
    meta: "Au fil des semaines",
    intro: "Au fil des semaines, nous travaillons ensemble sur :",
    points: [
      "la compréhension de vos fonctionnements",
      "la libération des schémas répétitifs",
      "la confiance en vous",
      "l'écoute de votre intuition",
      "l'alignement entre votre cœur, votre esprit et vos actions",
      "votre positionnement personnel",
      "la mise en place de nouveaux repères plus justes pour vous",
    ],
    outro: "L'objectif est d'intégrer durablement les changements dans votre quotidien.",
  },
];

// Les objectifs de l'accompagnement
const OBJECTIFS = [
  "retrouver davantage de clarté intérieure",
  "vous sentir plus aligné(e) avec vos valeurs",
  "mieux comprendre votre fonctionnement",
  "vous libérer de certains blocages émotionnels",
  "développer votre intuition",
  "renforcer votre confiance",
  "retrouver votre puissance personnelle",
  "avancer avec davantage de sérénité",
  "vous reconnecter à votre être profond",
  "prendre pleinement votre place sur votre chemin de vie",
];

// Les 3 formules — accent (décor), soft (lavis clair), deep (typo lisible)
const FORMULES = [
  {
    key: "essence",
    name: "Essence",
    tagline: "Revenir à soi",
    intro: "Une première étape pour retrouver son équilibre intérieur, comprendre les blocages qui freinent votre évolution et amorcer une profonde reconnexion à vous-même.",
    includes: [
      "Lecture d'âme (2 h)",
      "2 soins énergétiques (présentiel ou à distance)",
      "Exercices personnalisés de libération et de prise de conscience",
      "Suivi WhatsApp pendant 2 mois (réponse sous 48 h)",
      "Bilan de fin d'accompagnement",
    ],
    price: "490 €",
    payment: "Paiement possible en 2 fois",
    accent: "#8FA98C",
    soft: "#E4EDE1",
    deep: "#5F7E5A",
  },
  {
    key: "alignement",
    name: "Alignement",
    tagline: "Révéler sa véritable identité",
    intro: "Un accompagnement complet pour libérer les schémas limitants, renforcer la confiance en soi et avancer avec clarté sur son chemin de vie.",
    includes: [
      "Lecture d'âme approfondie (2 h)",
      "4 soins énergétiques (présentiel ou à distance)",
      "Coaching holistique personnalisé",
      "Exercices hebdomadaires de libération, transmutation et reconnexion",
      "Suivi WhatsApp privilégié pendant 2 mois",
      "Bilan complet avec conseils pour la suite",
    ],
    price: "690 €",
    payment: "Paiement possible en 3 fois",
    accent: "#C0894E",
    soft: "#F3E6D0",
    deep: "#9A6A2E",
    featured: true,
  },
  {
    key: "renaissance",
    name: "Renaissance",
    tagline: "Incarner pleinement qui vous êtes",
    intro: "Une immersion profonde pour celles et ceux qui souhaitent vivre une véritable transformation intérieure et s'aligner durablement avec leur mission de vie.",
    includes: [
      "Lecture d'âme approfondie (2 h)",
      "6 soins énergétiques personnalisés",
      "Coaching holistique premium",
      "Exercices et pratiques sur mesure chaque semaine",
      "Audios intuitifs et méditations personnalisées selon les besoins",
      "Suivi WhatsApp prioritaire pendant 2 mois",
      "Séance de clôture avec plan d'évolution personnalisé",
    ],
    price: "990 €",
    payment: "Paiement possible en 3 ou 4 fois",
    accent: "#A56B84",
    soft: "#EEDCE4",
    deep: "#7E4E63",
  },
];

const AccompagnementsPage = ({ setCurrentPage }) => {
  return (
    <div className="relative pt-24 pb-24 md:pt-40 md:pb-40" style={{ backgroundColor: colors.cream }}>
      <WatercolorBg variant="warm" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">

        {/* ── En-tête ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 md:mb-24"
        >
          <p className="text-sm tracking-[0.25em] uppercase mb-6" style={{ color: colors.rooted, fontFamily: "'Cormorant Garamond', serif" }}>
            Accompagnements holistiques
          </p>
          <div className="flex justify-center mb-8">
            <LotusMedallion accent={colors.rooted} soft={colors.softLight} size={126} />
          </div>
          <h1 className="text-4xl md:text-6xl mb-3 leading-tight" style={{ fontFamily: "'Cormorant Garamond', serif", color: colors.ink, fontWeight: 400 }}>
            Éveil à soi
          </h1>
          <p className="text-3xl md:text-5xl italic mb-6" style={{ fontFamily: "'Cormorant Garamond', serif", color: colors.rooted, fontWeight: 400 }}>
            & reconnexion à son chemin de vie
          </p>
          <div className="w-16 h-[1px] mx-auto mb-8" style={{ backgroundColor: colors.rooted }} />
          <p className="max-w-2xl mx-auto text-lg md:text-xl italic leading-relaxed mb-8" style={{ fontFamily: "'Cormorant Garamond', serif", color: colors.inkSoft }}>
            Une transformation profonde pour retrouver son alignement, libérer les blocages
            et avancer avec clarté sur son chemin de vie.
          </p>
          <span
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-xs tracking-[0.18em] uppercase"
            style={{ backgroundColor: colors.softLight + "55", color: colors.rooted, fontFamily: "'Cormorant Garamond', serif", border: `1px solid ${colors.rooted}22` }}
          >
            <Sparkles size={14} /> Un parcours de 2 mois · en présentiel ou à distance
          </span>
        </motion.div>

        {/* ── Introduction ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mx-auto mb-20 md:mb-32 space-y-6 text-lg leading-relaxed text-center"
          style={{ fontFamily: "'Cormorant Garamond', serif", color: colors.ink, fontSize: "19px", lineHeight: "1.8" }}
        >
          <p>
            Cet accompagnement est destiné aux personnes qui ressentent le besoin de se reconnecter à
            elles-mêmes, de retrouver leur pouvoir intérieur, de dépasser leurs schémas limitants et
            d'avancer sereinement sur leur chemin de vie.
          </p>
          <p style={{ color: colors.inkSoft }}>
            Pendant deux mois, je vous accompagne avec une approche globale alliant lecture d'âme,
            coaching intuitif, soins énergétiques et exercices de transformation intérieure.
          </p>
        </motion.div>

        {/* ── Le déroulé — 5 étapes ── */}
        <div className="mb-20 md:mb-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-center mb-14 md:mb-20"
          >
            <p className="text-sm tracking-[0.25em] uppercase mb-4" style={{ color: colors.rooted, fontFamily: "'Cormorant Garamond', serif" }}>
              Le déroulé
            </p>
            <h2 className="text-3xl md:text-4xl" style={{ fontFamily: "'Cormorant Garamond', serif", color: colors.ink, fontWeight: 400 }}>
              Un chemin en cinq temps
            </h2>
          </motion.div>

          <div className="relative max-w-3xl mx-auto">
            {/* ligne verticale du parcours */}
            <div
              className="absolute top-4 bottom-4 left-6 md:left-7 w-[2px] pointer-events-none"
              style={{ background: `linear-gradient(to bottom, transparent, ${colors.rooted}44 12%, ${colors.rooted}44 88%, transparent)` }}
              aria-hidden="true"
            />

            <div className="space-y-10 md:space-y-14">
              {ETAPES.map((e, i) => (
                <motion.div
                  key={e.n}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.6, delay: i * 0.05 }}
                  className="relative flex gap-5 md:gap-8"
                >
                  {/* marqueur */}
                  <div
                    className="relative z-10 shrink-0 w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: colors.cream, border: `1.5px solid ${colors.rooted}`, boxShadow: `0 8px 22px -12px ${colors.rooted}88` }}
                  >
                    <e.icon size={20} style={{ color: colors.rooted }} />
                  </div>

                  {/* contenu */}
                  <div
                    className="flex-1 rounded-xl p-5 md:p-7"
                    style={{ backgroundColor: "#FFFFFFA6", border: `1px solid ${colors.rooted}22`, boxShadow: `0 16px 44px -28px ${colors.ink}44` }}
                  >
                    <p className="text-xs tracking-[0.2em] uppercase mb-2" style={{ color: colors.rooted, fontFamily: "'Cormorant Garamond', serif" }}>
                      Étape {e.n} · {e.meta}
                    </p>
                    <h3 className="text-2xl md:text-3xl mb-3" style={{ fontFamily: "'Cormorant Garamond', serif", color: colors.ink, fontWeight: 400 }}>
                      {e.title}
                    </h3>
                    <p className="mb-4 leading-relaxed" style={{ fontFamily: "'Cormorant Garamond', serif", color: colors.inkSoft, fontSize: "17px", lineHeight: "1.7" }}>
                      {e.intro}
                    </p>
                    <div className="grid sm:grid-cols-2 gap-x-6 gap-y-2 mb-5">
                      {e.points.map((p) => (
                        <div key={p} className="flex items-start gap-2.5">
                          <PetalBullet />
                          <span style={{ fontFamily: "'Cormorant Garamond', serif", color: colors.ink, fontSize: "16px", lineHeight: "1.5" }}>{p}</span>
                        </div>
                      ))}
                    </div>
                    <p
                      className="italic text-[15px] leading-relaxed pl-4"
                      style={{ fontFamily: "'Cormorant Garamond', serif", color: colors.rooted, borderLeft: `2px solid ${colors.rooted}44` }}
                    >
                      {e.outro}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Les objectifs ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="max-w-4xl mx-auto mb-20 md:mb-32"
        >
          <div className="text-center mb-10 md:mb-14">
            <p className="text-sm tracking-[0.25em] uppercase mb-4" style={{ color: colors.rooted, fontFamily: "'Cormorant Garamond', serif" }}>
              Au terme de ces deux mois
            </p>
            <h2 className="text-3xl md:text-4xl mb-4" style={{ fontFamily: "'Cormorant Garamond', serif", color: colors.ink, fontWeight: 400 }}>
              Vous aurez amorcé une véritable reconnexion à vous-même
            </h2>
            <p className="italic text-lg" style={{ fontFamily: "'Cormorant Garamond', serif", color: colors.inkSoft }}>
              Vous pourrez notamment :
            </p>
          </div>
          <div
            className="p-7 md:p-10 rounded-2xl"
            style={{ backgroundColor: colors.softLight + "26", border: `1px solid ${colors.rooted}22` }}
          >
            <div className="grid sm:grid-cols-2 gap-x-10 gap-y-3">
              {OBJECTIFS.map((o) => (
                <div key={o} className="flex items-start gap-3">
                  <PetalBullet opacity={0.7} />
                  <span style={{ fontFamily: "'Cormorant Garamond', serif", color: colors.ink, fontSize: "17px", lineHeight: "1.6" }}>{o}</span>
                </div>
              ))}
            </div>
          </div>
          <p className="text-center italic text-xl mt-10 leading-relaxed max-w-2xl mx-auto" style={{ fontFamily: "'Cormorant Garamond', serif", color: colors.rooted }}>
            Cet accompagnement est une invitation à revenir à l'essentiel : vous-même.
          </p>
        </motion.div>

        {/* ── Les formules ── */}
        <div className="mb-8 md:mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-center mb-6"
          >
            <p className="text-sm tracking-[0.25em] uppercase mb-4" style={{ color: colors.rooted, fontFamily: "'Cormorant Garamond', serif" }}>
              Mes formules
            </p>
            <h2 className="text-3xl md:text-4xl mb-4" style={{ fontFamily: "'Cormorant Garamond', serif", color: colors.ink, fontWeight: 400 }}>
              Choisir son accompagnement
            </h2>
            <p className="italic text-lg max-w-2xl mx-auto" style={{ fontFamily: "'Cormorant Garamond', serif", color: colors.inkSoft }}>
              Trois formules, un même cheminement de deux mois — à la profondeur qui vous ressemble.
            </p>
          </motion.div>
        </div>

        <div className="grid md:grid-cols-3 gap-6 md:gap-5 items-stretch mb-8">
          {FORMULES.map((f, i) => (
            <motion.div
              key={f.key}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.12 }}
              className={`relative flex flex-col rounded-2xl p-7 md:p-8 ${f.featured ? "md:-translate-y-3" : ""}`}
              style={{
                backgroundColor: f.featured ? f.soft + "cc" : "#FFFFFFCC",
                border: `1px solid ${f.featured ? f.deep + "66" : f.accent + "44"}`,
                boxShadow: f.featured ? `0 30px 60px -30px ${f.deep}88` : `0 18px 44px -28px ${colors.ink}33`,
              }}
            >
              {f.featured && (
                <span
                  className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-[11px] tracking-[0.18em] uppercase whitespace-nowrap"
                  style={{ backgroundColor: f.deep, color: colors.cream, fontFamily: "'Cormorant Garamond', serif" }}
                >
                  Le plus choisi
                </span>
              )}

              <div className="flex justify-center mb-5 mt-2">
                <LotusMedallion accent={f.accent} soft={f.soft} size={96} />
              </div>

              <h3 className="text-center text-2xl tracking-[0.12em] uppercase mb-1" style={{ fontFamily: "'Cormorant Garamond', serif", color: colors.ink, fontWeight: 500 }}>
                {f.name}
              </h3>
              <p className="text-center italic mb-4" style={{ fontFamily: "'Cormorant Garamond', serif", color: f.deep, fontSize: "17px" }}>
                {f.tagline}
              </p>

              <p className="text-center leading-relaxed mb-5" style={{ fontFamily: "'Cormorant Garamond', serif", color: colors.inkSoft, fontSize: "15.5px", lineHeight: "1.65" }}>
                {f.intro}
              </p>

              <div className="w-10 h-[1px] mx-auto mb-5" style={{ backgroundColor: f.accent }} />

              <p className="text-xs tracking-[0.2em] uppercase mb-3" style={{ color: f.deep, fontFamily: "'Cormorant Garamond', serif" }}>
                Comprend
              </p>
              <div className="space-y-2.5 mb-7">
                {f.includes.map((inc) => (
                  <div key={inc} className="flex items-start gap-2.5">
                    <PetalBullet color={f.accent} opacity={0.85} />
                    <span style={{ fontFamily: "'Cormorant Garamond', serif", color: colors.ink, fontSize: "15.5px", lineHeight: "1.5" }}>{inc}</span>
                  </div>
                ))}
              </div>

              <div className="mt-auto">
                <div className="text-center mb-5">
                  <p className="text-4xl mb-1" style={{ fontFamily: "'Cormorant Garamond', serif", color: f.deep, fontWeight: 500 }}>
                    {f.price}
                  </p>
                  <p className="text-sm italic" style={{ fontFamily: "'Cormorant Garamond', serif", color: colors.inkSoft }}>
                    {f.payment}
                  </p>
                </div>
                <button
                  onClick={() => { setCurrentPage("contact"); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                  className="w-full py-3 flex items-center justify-center gap-2 text-xs tracking-[0.2em] uppercase transition-all hover:shadow-md rounded-sm"
                  style={{ backgroundColor: colors.rooted, color: colors.cream, fontFamily: "'Cormorant Garamond', serif", fontWeight: 500 }}
                >
                  Prendre contact <ArrowRight size={14} />
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        <p className="text-center text-sm italic max-w-xl mx-auto mb-24 md:mb-32" style={{ fontFamily: "'Cormorant Garamond', serif", color: colors.inkSoft }}>
          Chaque formule est un espace sur mesure. Une question, un doute avant de vous lancer ?
          Écrivez-moi, nous en parlons ensemble.
        </p>

        {/* ── Clôture ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1 }}
          className="max-w-3xl mx-auto text-center px-6 py-14 md:py-20 rounded-3xl relative overflow-hidden"
          style={{ backgroundColor: colors.warmHeart }}
        >
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: `radial-gradient(ellipse at top, ${colors.softLight}55 0%, transparent 60%)` }}
          />
          <Feather size={34} className="mx-auto mb-6 relative" style={{ color: "#ffffff", opacity: 0.75 }} />
          <p className="text-2xl md:text-3xl italic leading-relaxed mb-6 relative" style={{ fontFamily: "'Cormorant Garamond', serif", color: "#ffffff", fontWeight: 400 }}>
            Parce que la plus belle rencontre est celle que l'on fait avec soi-même.
          </p>
          <p className="max-w-xl mx-auto mb-8 leading-relaxed relative" style={{ fontFamily: "'Cormorant Garamond', serif", color: "#fff", opacity: 0.92, fontSize: "17px", lineHeight: "1.8" }}>
            Lorsque l'on se reconnecte à son être profond, les choix deviennent plus justes,
            les relations plus authentiques, et la vie reprend naturellement son sens.
          </p>
          <button
            onClick={() => { setCurrentPage("contact"); window.scrollTo({ top: 0, behavior: "smooth" }); }}
            className="relative inline-flex items-center gap-2 px-8 py-3 text-sm tracking-[0.18em] uppercase transition-all hover:shadow-lg"
            style={{ backgroundColor: colors.cream, color: colors.rooted, fontFamily: "'Cormorant Garamond', serif", fontWeight: 500 }}
          >
            Commencer mon accompagnement <ArrowRight size={16} />
          </button>
        </motion.div>

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
  {
    name: "Cindy",
    text: "J’y suis allée sans attente particulière, une expérience entre copine. Je pensais passer un moment agréable, sans plus. Finalement, j’ai été bluffée. Elle a su mettre des mots très justes sur mes doutes, mes questionnements et ce que je ressentais au fond de moi. Cet échange m’a permis de prendre du recul et de me réaligner sur plusieurs aspects de ma vie. Son écoute, sa bienveillance et la pertinence de ses ressentis m’ont vraiment marquée. Une très belle expérience que je recommande à ceux qui souhaitent vivre un moment de réflexion et d’introspection.",
    format: "Lecture 60 min",
  },
  {
    name: "Julian",
    text: "Je suis de nature plutôt rationnelle, et donc n’avais pas d’attente particulière. Pourtant la séance a été très bienveillante, une étrange sensation de familiarité et des remarques qui se sont avérées très pertinentes. Pas de crainte, car il est justement dit, c’est un retour à soi. Je recommande !",
    format: "Lecture 60 min",
  },
];

  // Le livre = une page de garde (couverture), les témoignages, puis une page de fin.
  type Page =
    | { type: "cover" }
    | { type: "end" }
    | { type: "testimonial"; name: string; text: string; format: string };
  const pages: Page[] = [
    { type: "cover" },
    ...testimonials.map((t) => ({ type: "testimonial" as const, ...t })),
    { type: "end" },
  ];
  const tCount = testimonials.length;
  const total = pages.length;
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
    const to = current + dir;
    if (to < 0 || to >= total) return; // pas de bouclage : un livre a un début et une fin
    setFlip({ dir, from: current, to });
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
    const page = pages[idx];

    // Reliure + ombre de pliure (côté spine, à gauche) — commune à toutes les pages.
    const binding = (
      <>
        <div className="absolute inset-y-0 left-0 w-12 pointer-events-none" style={{ background: `linear-gradient(to right, ${colors.rooted}26, transparent)` }} />
        <div className="absolute inset-y-0 left-0 w-[3px]" style={{ backgroundColor: colors.rooted, opacity: 0.45 }} />
      </>
    );

    // ── Page de garde (couverture intérieure) ──
    if (page.type === "cover") {
      return (
        <>
          {binding}
          <div className="h-full flex flex-col items-center justify-center pl-12 pr-7 md:pl-20 md:pr-12 text-center">
            <div className="w-12 h-[1px] mb-6" style={{ backgroundColor: colors.rooted, opacity: 0.6 }} />
            <p className="text-xs tracking-[0.3em] uppercase mb-5" style={{ color: colors.rooted, fontFamily: "'Cormorant Garamond', serif" }}>
              Livre d'Or
            </p>
            <h2 style={{ fontFamily: "'Dancing Script', cursive", color: colors.ink, fontSize: "clamp(42px, 9vw, 58px)", lineHeight: 1 }}>
              Anima
            </h2>
            <Feather size={30} className="my-7" style={{ color: colors.rooted, opacity: 0.5 }} />
            <p className="italic max-w-xs" style={{ fontFamily: "'Cormorant Garamond', serif", color: colors.inkSoft, fontSize: "clamp(14px, 4vw, 17px)", lineHeight: 1.7 }}>
              Les mots de celles et ceux qui ont franchi la porte.
            </p>
            <div className="w-12 h-[1px] mt-6 mb-6" style={{ backgroundColor: colors.rooted, opacity: 0.6 }} />
            <p className="text-xs tracking-[0.18em] uppercase" style={{ color: colors.stillness, fontFamily: "'Cormorant Garamond', serif" }}>
              Tournez la page →
            </p>
          </div>
        </>
      );
    }

    // ── Page de fin ──
    if (page.type === "end") {
      return (
        <>
          {binding}
          <div className="h-full flex flex-col items-center justify-center pl-12 pr-7 md:pl-20 md:pr-12 text-center">
            <Feather size={30} className="mb-7" style={{ color: colors.rooted, opacity: 0.5 }} />
            <p className="text-xs tracking-[0.3em] uppercase mb-5" style={{ color: colors.rooted, fontFamily: "'Cormorant Garamond', serif" }}>
              Fin
            </p>
            <p className="italic max-w-xs mb-3" style={{ fontFamily: "'Cormorant Garamond', serif", color: colors.ink, fontSize: "clamp(15px, 4.2vw, 19px)", lineHeight: 1.7 }}>
              Merci d'avoir parcouru ces pages.
            </p>
            <p className="italic max-w-xs" style={{ fontFamily: "'Cormorant Garamond', serif", color: colors.inkSoft, fontSize: "clamp(14px, 4vw, 17px)", lineHeight: 1.7 }}>
              Et si la prochaine histoire était la vôtre&nbsp;?
            </p>
            <div className="w-12 h-[1px] my-7" style={{ backgroundColor: colors.rooted, opacity: 0.6 }} />
            <p style={{ fontFamily: "'Dancing Script', cursive", color: colors.rooted, fontSize: "clamp(22px, 5vw, 30px)", lineHeight: 1 }}>
              Anima
            </p>
            <p className="text-xs tracking-[0.18em] uppercase mt-2" style={{ color: colors.inkSoft, fontFamily: "'Cormorant Garamond', serif" }}>
              éveil & retour à soi
            </p>
          </div>
        </>
      );
    }

    // ── Page de témoignage ──
    // La couverture est l'index 0, donc l'index de page correspond au numéro du témoignage.
    return (
      <>
        {binding}
        <div className="h-full flex flex-col pl-8 pr-5 md:pl-16 md:pr-12 py-6 md:py-14 text-center">
          <Quote size={20} className="flex-shrink-0 mb-3 md:mb-6 mx-auto" style={{ color: colors.rooted, opacity: 0.35 }} />
          <div className="flex-1 min-h-0 overflow-y-auto">
            <div className="min-h-full flex items-center">
              <p className="italic leading-relaxed w-full" style={{ fontFamily: "'Cormorant Garamond', serif", color: colors.ink, fontSize: "clamp(13px, 3.5vw, 18px)", lineHeight: "1.7" }}>
                {page.text}
              </p>
            </div>
          </div>
          <div className="flex-shrink-0 mt-4">
            <div className="w-12 h-[1px] mx-auto mb-3" style={{ backgroundColor: colors.rooted, opacity: 0.6 }} />
            <p style={{ fontFamily: "'Dancing Script', cursive", color: colors.rooted, fontSize: "clamp(20px, 3.5vw, 28px)", lineHeight: 1 }}>
              {page.name}
            </p>
            {page.format && (
              <p className="text-xs tracking-[0.18em] uppercase mt-2" style={{ color: colors.inkSoft, fontFamily: "'Cormorant Garamond', serif" }}>
                {page.format}
              </p>
            )}
            <p className="text-xs italic mt-4" style={{ color: colors.stillness, fontFamily: "'Cormorant Garamond', serif" }}>
              — {idx} / {tCount} —
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
            disabled={current === 0}
            aria-label="Page précédente"
            className="flex-shrink-0 w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center transition-all hover:scale-110 disabled:opacity-30 disabled:hover:scale-100 disabled:cursor-default"
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
            <div className="relative h-[600px] md:h-[560px]" style={{ transformStyle: "preserve-3d" }}>
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
            disabled={current === total - 1}
            aria-label="Page suivante"
            className="flex-shrink-0 w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center transition-all hover:scale-110 disabled:opacity-30 disabled:hover:scale-100 disabled:cursor-default"
            style={{ color: colors.rooted, backgroundColor: "#FFFFFF99", border: `1px solid ${colors.rooted}33` }}
          >
            <ChevronRight size={22} />
          </button>
        </motion.div>

        {/* Pastilles de navigation — une par témoignage (la couverture est l'index 0) */}
        <div className="flex items-center justify-center gap-3 mt-16">
          {testimonials.map((_, i) => {
            const pageIdx = i + 1;
            const active = pageIdx === current;
            return (
              <button
                key={i}
                onClick={() => jumpTo(pageIdx)}
                aria-label={`Aller au témoignage ${i + 1}`}
                className="rounded-full transition-all"
                style={{
                  width: active ? 26 : 9,
                  height: 9,
                  backgroundColor: active ? colors.rooted : colors.stillness,
                  opacity: active ? 1 : 0.5,
                }}
              />
            );
          })}
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
  const [sending, setSending] = useState(false);
  const [sendError, setSendError] = useState("");

  const submit = async (e?: React.MouseEvent) => {
    e?.preventDefault();
    if (sending) return;
    setSending(true);
    setSendError("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Erreur réseau");
      setSent(true);
      setTimeout(() => setSent(false), 5000);
      setForm({ name: "", email: "", subject: "general", message: "" });
    } catch {
      setSendError("Une erreur est survenue, merci de réessayer ou d'écrire directement à contact@anima-retourasoi.fr");
    } finally {
      setSending(false);
    }
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
                contact@anima-retourasoi.fr
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
            <div className="space-y-5">
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
                disabled={sending}
                className="px-8 py-3 text-sm tracking-[0.2em] uppercase transition-all hover:shadow-lg disabled:opacity-50"
                style={{ backgroundColor: colors.rooted, color: colors.cream, fontFamily: "'Cormorant Garamond', serif" }}
              >
                {sending ? "Envoi…" : "Envoyer le message"}
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

              {sendError && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-sm italic"
                  style={{ color: "#b94a48", fontFamily: "'Cormorant Garamond', serif" }}
                >
                  {sendError}
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
              <li>contact@anima-retourasoi.fr</li>
              <li>Bordeaux</li>
              <li>
                <a
                  href="https://www.instagram.com/anima_retourasoi?igsh=MXh2eW12a3BldnZnMA=="
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 hover:opacity-70 transition-opacity"
                  style={{ color: colors.rooted }}
                >
                  <svg width={15} height={15} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                    <circle cx="12" cy="12" r="4"/>
                    <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>
                  </svg>
                  <span>@anima_retourasoi</span>
                </a>
              </li>
              <li>
                <button onClick={() => setCurrentPage("mentions")} className="hover:underline italic">
                  Mentions légales
                </button>
              </li>
              <li>
                <button onClick={() => { setCurrentPage("cgv"); window.scrollTo({ top: 0 }); }} className="hover:underline italic">
                  CGV
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
const MentionsPage = () => {
  const Section = ({ title, children }: { title: string; children: ReactNode }) => (
    <div className="pb-8 mb-8" style={{ borderBottom: `1px solid ${colors.stillness}44` }}>
      <h2
        className="text-xl md:text-2xl mb-4"
        style={{ fontFamily: "'Cormorant Garamond', serif", color: colors.rooted, fontWeight: 500 }}
      >
        {title}
      </h2>
      <div style={{ fontFamily: "'Cormorant Garamond', serif", color: colors.ink, fontSize: "17px", lineHeight: "1.75" }}>
        {children}
      </div>
    </div>
  );

  const placeholder = (text: string) => (
    <span style={{ color: colors.warmHeart, fontStyle: "italic" }}>[{text}]</span>
  );

  return (
    <div className="relative pt-24 pb-24 md:pt-32 md:pb-32" style={{ backgroundColor: colors.cream }}>
      <WatercolorBg variant="default" />

      <div className="max-w-3xl mx-auto px-6 relative z-10">

        {/* En-tête */}
        <div className="mb-12 md:mb-16">
          <p className="text-xs tracking-[0.25em] uppercase mb-3" style={{ color: colors.rooted, fontFamily: "'Cormorant Garamond', serif" }}>
            Informations légales
          </p>
          <h1 className="text-4xl md:text-5xl mb-4" style={{ fontFamily: "'Cormorant Garamond', serif", color: colors.ink, fontWeight: 400 }}>
            Mentions légales
          </h1>
          <div className="w-16 h-[1px]" style={{ backgroundColor: colors.rooted }} />
          <p className="mt-4 text-sm italic" style={{ fontFamily: "'Cormorant Garamond', serif", color: colors.inkSoft }}>
            Conformément aux articles 6-III et 19 de la Loi n° 2004-575 du 21 juin 2004 pour la Confiance dans l'Économie Numérique (LCEN).
          </p>
        </div>

        <div>

          {/* 1. Éditeur */}
          <Section title="1. Éditeur du site">
            <p className="mb-2">
              <strong>Nom commercial :</strong> Anima — éveil & retour à soi
            </p>
            <p className="mb-2">
              <strong>Activité :</strong> Accompagnement spirituel — lecture d'âme & harmonisation Feng Shui
            </p>
            <p className="mb-2">
              <strong>SIRET :</strong> 103 410 601 00019
            </p>
            <p className="mb-2">
              <strong>Ville :</strong> Bordeaux, France
            </p>
            <p className="mb-2">
              <strong>Email :</strong>{" "}
              <a href="mailto:contact@anima-retourasoi.fr" style={{ color: colors.rooted, textDecoration: "underline" }}>
                contact@anima-retourasoi.fr
              </a>
            </p>
            <p className="mb-2">
              <strong>Site web :</strong>{" "}
              <a href="https://anima-retourasoi.fr" style={{ color: colors.rooted, textDecoration: "underline" }}>
                anima-retourasoi.fr
              </a>
            </p>
            <p>
              <strong>Directrice de publication :</strong> Anima — éveil & retour à soi
            </p>
          </Section>

          {/* 2. Hébergement */}
          <Section title="2. Hébergement">
            <p className="mb-1"><strong>Hébergeur :</strong> Vercel Inc.</p>
            <p className="mb-1"><strong>Adresse :</strong> 340 S Lemon Ave #4133, Walnut, CA 91789, États-Unis</p>
            <p>
              <strong>Site :</strong>{" "}
              <a href="https://vercel.com" target="_blank" rel="noopener noreferrer" style={{ color: colors.rooted, textDecoration: "underline" }}>
                vercel.com
              </a>
            </p>
          </Section>

          {/* 3. Propriété intellectuelle */}
          <Section title="3. Propriété intellectuelle et droits d'auteur">
            <p className="mb-3">
              L'ensemble des contenus présents sur ce site (textes, images, photographies, illustrations, logo, graphismes) sont la propriété exclusive d'Anima — éveil & retour à soi, sauf mention contraire expresse.
            </p>
            <p className="mb-3">
              Toute reproduction, représentation, modification, publication, adaptation ou exploitation de tout ou partie des éléments du site, quel que soit le moyen ou le procédé utilisé, est strictement interdite sans autorisation écrite préalable.
            </p>
            <p>
              Toute exploitation non autorisée du site ou de son contenu sera considérée comme constitutive d'une contrefaçon et poursuivie conformément aux articles L.335-2 et suivants du Code de la Propriété Intellectuelle.
            </p>
          </Section>

          {/* 4. Données personnelles / RGPD */}
          <Section title="4. Protection des données personnelles (RGPD)">
            <p className="mb-3">
              Conformément au Règlement Général sur la Protection des Données (UE) 2016/679 du 27 avril 2016 (RGPD) et à la loi Informatique et Libertés du 6 janvier 1978 modifiée, vous disposez de droits sur vos données personnelles.
            </p>
            <p className="mb-3">
              <strong>Données collectées :</strong> Le formulaire de contact collecte uniquement les informations que vous saisissez volontairement (prénom, adresse email, message). Ces données sont utilisées exclusivement pour répondre à votre demande.
            </p>
            <p className="mb-3">
              <strong>Durée de conservation :</strong> Vos données ne sont conservées que le temps nécessaire au traitement de votre demande, et au maximum 3 ans à compter du dernier contact.
            </p>
            <p className="mb-3">
              <strong>Absence de transfert :</strong> Vos données ne sont en aucun cas cédées, vendues ou transmises à des tiers à des fins commerciales.
            </p>
            <p className="mb-3">
              <strong>Vos droits :</strong> Conformément au RGPD, vous disposez d'un droit d'accès, de rectification, d'effacement, de limitation du traitement et d'opposition. Pour exercer ces droits, contactez-nous à{" "}
              <a href="mailto:contact@anima-retourasoi.fr" style={{ color: colors.rooted, textDecoration: "underline" }}>
                contact@anima-retourasoi.fr
              </a>.
            </p>
            <p>
              En cas de réclamation, vous pouvez contacter la{" "}
              <a href="https://www.cnil.fr" target="_blank" rel="noopener noreferrer" style={{ color: colors.rooted, textDecoration: "underline" }}>
                CNIL
              </a>{" "}
              (Commission Nationale de l'Informatique et des Libertés) — 3 Place de Fontenoy, TSA 80715, 75334 Paris Cedex 07.
            </p>
          </Section>

          {/* 5. Cookies */}
          <Section title="5. Cookies">
            <p className="mb-3">
              Ce site n'utilise pas de cookies de traçage ou de publicité. Des cookies techniques de session peuvent être déposés par l'hébergeur (Vercel) pour assurer le bon fonctionnement du site.
            </p>
            <p>
              Vous pouvez configurer votre navigateur pour refuser les cookies. Cette action peut toutefois limiter certaines fonctionnalités du site.
            </p>
          </Section>

          {/* 6. Limitation de responsabilité */}
          <Section title="6. Limitation de responsabilité">
            <p className="mb-3">
              Les informations contenues sur ce site sont fournies à titre indicatif. Anima s'efforce d'assurer leur exactitude mais ne peut garantir l'exhaustivité, l'exactitude ni la mise à jour permanente de ces informations.
            </p>
            <p className="mb-3">
              Anima ne saurait être tenu responsable des dommages directs ou indirects résultant de l'utilisation de ce site, notamment en cas d'indisponibilité technique, d'erreurs ou d'omissions dans les contenus.
            </p>
            <p>
              Ce site peut contenir des liens hypertextes vers des sites tiers. Anima n'exerce aucun contrôle sur ces sites et décline toute responsabilité quant à leur contenu.
            </p>
          </Section>

          {/* 7. Droit applicable */}
          <Section title="7. Droit applicable et juridiction compétente">
            <p className="mb-3">
              Les présentes mentions légales sont soumises au droit français.
            </p>
            <p>
              En cas de litige relatif à l'utilisation de ce site, et à défaut de résolution amiable, les tribunaux français seront compétents, et plus particulièrement ceux du ressort de{" "}
Bordeaux.
            </p>
          </Section>

          {/* 8. Avertissement */}
          <Section title="8. Avertissement important">
            <p className="mb-3" style={{ fontWeight: 500 }}>
              Les prestations proposées sur ce site — lecture d'âme, guidance spirituelle et harmonisation Feng Shui — relèvent d'un accompagnement personnel et énergétique.
            </p>
            <p className="mb-3">
              Ces services ne constituent en aucun cas un avis médical, un diagnostic, un traitement psychologique ou thérapeutique. Ils ne sauraient se substituer à une consultation médicale ou à un suivi professionnel de santé.
            </p>
            <p className="italic" style={{ color: colors.inkSoft }}>
              En cas de difficultés de santé physique ou mentale, consultez impérativement un professionnel de santé qualifié.
            </p>
          </Section>

          {/* 9. Lois de référence */}
          <div className="pt-2">
            <h2
              className="text-xl md:text-2xl mb-4"
              style={{ fontFamily: "'Cormorant Garamond', serif", color: colors.rooted, fontWeight: 500 }}
            >
              9. Textes de référence
            </h2>
            <ul
              className="space-y-1 text-sm"
              style={{ fontFamily: "'Cormorant Garamond', serif", color: colors.inkSoft, fontSize: "15px", lineHeight: "1.7" }}
            >
              <li>— Loi n° 78-17 du 6 janvier 1978 relative à l'informatique, aux fichiers et aux libertés</li>
              <li>— Loi n° 2004-575 du 21 juin 2004 pour la confiance dans l'économie numérique (LCEN)</li>
              <li>— Règlement (UE) 2016/679 du Parlement européen du 27 avril 2016 (RGPD)</li>
              <li>— Articles L.335-2 et suivants du Code de la Propriété Intellectuelle</li>
            </ul>
          </div>

        </div>

        <p className="mt-12 text-xs text-center italic" style={{ fontFamily: "'Cormorant Garamond', serif", color: colors.inkSoft }}>
          Dernière mise à jour : 30 mai 2026
        </p>
      </div>
    </div>
  );
};

// ============================================================
// PAGE : CONDITIONS GÉNÉRALES DE VENTE
// ============================================================
const CGVPage = () => {
  const Section = ({ title, children }: { title: string; children: ReactNode }) => (
    <div className="pb-8 mb-8" style={{ borderBottom: `1px solid ${colors.stillness}44` }}>
      <h2
        className="text-xl md:text-2xl mb-4"
        style={{ fontFamily: "'Cormorant Garamond', serif", color: colors.rooted, fontWeight: 500 }}
      >
        {title}
      </h2>
      <div style={{ fontFamily: "'Cormorant Garamond', serif", color: colors.ink, fontSize: "17px", lineHeight: "1.75" }}>
        {children}
      </div>
    </div>
  );

  return (
    <div className="relative pt-24 pb-24 md:pt-32 md:pb-32" style={{ backgroundColor: colors.cream }}>
      <WatercolorBg variant="default" />

      <div className="max-w-3xl mx-auto px-6 relative z-10">

        {/* En-tête */}
        <div className="mb-12 md:mb-16">
          <p className="text-xs tracking-[0.25em] uppercase mb-3" style={{ color: colors.rooted, fontFamily: "'Cormorant Garamond', serif" }}>
            Informations légales
          </p>
          <h1 className="text-4xl md:text-5xl mb-4" style={{ fontFamily: "'Cormorant Garamond', serif", color: colors.ink, fontWeight: 400 }}>
            Conditions générales de vente
          </h1>
          <div className="w-16 h-[1px]" style={{ backgroundColor: colors.rooted }} />
          <p className="mt-4 text-sm italic" style={{ fontFamily: "'Cormorant Garamond', serif", color: colors.inkSoft }}>
            En vigueur au 1er juin 2025. Toute réservation implique l'acceptation pleine et entière des présentes conditions.
          </p>
        </div>

        <div>

          {/* 1. Prestataire */}
          <Section title="1. Prestataire">
            <p>
              Les présentes conditions générales de vente sont proposées par <strong>Anima — éveil & retour à soi</strong>,
              praticienne en accompagnement spirituel basée à Bordeaux, France.
              Contact : <a href="mailto:contact@anima-retourasoi.fr" style={{ color: colors.rooted, textDecoration: "underline" }}>contact@anima-retourasoi.fr</a>
            </p>
          </Section>

          {/* 2. Services et tarifs */}
          <Section title="2. Services et tarifs">
            <p className="mb-4">Les prestations proposées sont les suivantes :</p>

            <div className="mb-6">
              <p className="mb-2 font-medium" style={{ color: colors.rooted }}>Lecture d'âme (à distance)</p>
              <table className="w-full text-sm" style={{ borderCollapse: "collapse" }}>
                <tbody>
                  {[
                    ["15 minutes", "25 €", "Éclairage flash sur une question ciblée"],
                    ["30 minutes", "45 €", "Approfondissement d'une thématique"],
                    ["45 minutes", "65 €", "Exploration et transformation"],
                    ["60 minutes", "80 €", "Traversée complète, accompagnement multidimensionnel"],
                  ].map(([dur, price, desc], i) => (
                    <tr key={i} style={{ borderBottom: `1px solid ${colors.stillness}33` }}>
                      <td className="py-2 pr-4 font-medium w-28">{dur}</td>
                      <td className="py-2 pr-4 w-16" style={{ color: colors.warmHeart, fontWeight: 500 }}>{price}</td>
                      <td className="py-2" style={{ color: colors.inkSoft, fontSize: "15px" }}>{desc}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div>
              <p className="mb-2 font-medium" style={{ color: colors.rooted }}>Feng Shui & harmonisation</p>
              <table className="w-full text-sm" style={{ borderCollapse: "collapse" }}>
                <tbody>
                  {[
                    ["Diagnostic", "70 €", "Lecture énergétique initiale (déductible d'un accompagnement)"],
                    ["Accompagnement complet", "Sur devis", "Entièrement personnalisé selon votre lieu et vos aspirations"],
                  ].map(([service, price, desc], i) => (
                    <tr key={i} style={{ borderBottom: `1px solid ${colors.stillness}33` }}>
                      <td className="py-2 pr-4 font-medium w-44">{service}</td>
                      <td className="py-2 pr-4 w-24" style={{ color: colors.warmHeart, fontWeight: 500 }}>{price}</td>
                      <td className="py-2" style={{ color: colors.inkSoft, fontSize: "15px" }}>{desc}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <p className="mt-4 text-sm italic" style={{ color: colors.inkSoft }}>
              Les tarifs sont indiqués en euros TTC. Anima se réserve le droit de modifier ses tarifs à tout moment,
              les prestations étant facturées au tarif en vigueur au moment de la réservation.
            </p>
          </Section>

          {/* 3. Réservation */}
          <Section title="3. Réservation">
            <p className="mb-3">
              Les séances de lecture d'âme sont réservées via la plateforme Cal.com (lien fourni sur le site).
              La réservation est confirmée dès réception de la confirmation automatique par email.
            </p>
            <p>
              Pour les prestations Feng Shui, la prise de contact s'effectue par email à{" "}
              <a href="mailto:contact@anima-retourasoi.fr" style={{ color: colors.rooted, textDecoration: "underline" }}>
                contact@anima-retourasoi.fr
              </a>{" "}
              afin de définir ensemble le cadre de l'accompagnement.
            </p>
          </Section>

          {/* 4. Paiement */}
          <Section title="4. Modalités de paiement">
            <p className="mb-3">
              Le règlement s'effectue selon les modalités précisées lors de la réservation (virement bancaire, PayPal, ou autre moyen convenu).
              Le paiement est demandé avant la séance ou selon les conditions définies pour les accompagnements sur devis.
            </p>
            <p>
              Aucun paiement n'est prélevé directement via ce site internet.
            </p>
          </Section>

          {/* 5. Annulation et remboursement */}
          <Section title="5. Annulation et remboursement">
            <p className="mb-3">
              <strong>Annulation par le client :</strong> Toute annulation doit être notifiée par email au moins{" "}
              <strong>48 heures avant</strong> la séance prévue. Dans ce cas, la séance pourra être reportée sans frais.
            </p>
            <p className="mb-3">
              En cas d'annulation moins de 48 heures avant la séance ou de non-présentation sans préavis, la séance sera due en intégralité.
            </p>
            <p>
              <strong>Annulation par Anima :</strong> En cas d'empêchement exceptionnel, Anima s'engage à prévenir dans les meilleurs délais
              et à proposer un report de séance ou un remboursement intégral.
            </p>
          </Section>

          {/* 6. Droit de rétractation */}
          <Section title="6. Droit de rétractation">
            <p className="mb-3">
              Conformément à l'article L221-28 du Code de la consommation, le droit de rétractation de 14 jours ne s'applique pas
              aux prestations de services pleinement exécutées avant la fin du délai de rétractation, avec l'accord exprès du consommateur.
            </p>
            <p>
              En réservant une séance à une date antérieure à 14 jours après la réservation, vous reconnaissez renoncer
              expressément à votre droit de rétractation pour cette prestation.
            </p>
          </Section>

          {/* 7. Responsabilité */}
          <Section title="7. Nature des prestations et responsabilité">
            <p className="mb-3">
              Les prestations proposées par Anima (lecture d'âme, guidance spirituelle, harmonisation Feng Shui) sont
              des accompagnements personnels à visée de bien-être et d'exploration intérieure.
            </p>
            <p className="mb-3" style={{ fontWeight: 500 }}>
              Elles ne constituent en aucun cas un acte médical, un diagnostic de santé, un traitement psychologique
              ou thérapeutique, et ne sauraient se substituer à un suivi médical ou psychologique professionnel.
            </p>
            <p>
              Anima ne saurait être tenu responsable des décisions prises par le client à la suite d'une prestation.
              Le client reste seul responsable de ses choix et actions.
            </p>
          </Section>

          {/* 8. Droit applicable */}
          <Section title="8. Droit applicable">
            <p>
              Les présentes conditions générales de vente sont soumises au droit français.
              En cas de litige, et à défaut de résolution amiable, les tribunaux français seront seuls compétents.
            </p>
          </Section>

        </div>

        <p className="mt-12 text-xs text-center italic" style={{ fontFamily: "'Cormorant Garamond', serif", color: colors.inkSoft }}>
          Dernière mise à jour : 30 mai 2026
        </p>
      </div>
    </div>
  );
};

// ============================================================
// APP ROOT
// ============================================================
export default function App() {
  const [currentPage, setCurrentPage] = useState("home");

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [currentPage]);

  const pages = {
    home: <HomePage setCurrentPage={setCurrentPage} />,
    about: <AboutPage />,
    guidance: <GuidancePage />,
    accompagnements: <AccompagnementsPage setCurrentPage={setCurrentPage} />,
    fengshui: <FengShuiPage setCurrentPage={setCurrentPage} />,
    testimonials: <TestimonialsPage />,
    contact: <ContactPage />,
    mentions: <MentionsPage />,
    cgv: <CGVPage />,
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
