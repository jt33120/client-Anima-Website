"use client";
import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { Moon } from "lucide-react";
import { SceneVideo } from "./SceneVideo";
import styles from "./PageHero.module.css";

// ============================================================
// BANNIÈRE DE PAGE — Anima en mouvement, titre posé à gauche
// avec le halo blanc des reels. Les scènes laissent le côté
// gauche calme (cf. prompts Grok) : le texte n'y couvre personne.
// ============================================================
export const PageHero = ({
  video, focus, children,
}: { video: string; focus: number; children: ReactNode }) => (
  <section className={styles.hero}>
    {/* Calque visuel seul masqué : le titre, lui, ne s'efface pas */}
    <div className={styles.visual}>
      <SceneVideo name={video} mobile focus={focus} eager className={styles.media} controlsPosition="above-fade" />
      <div className={styles.topVeil} aria-hidden="true" />
      <div className={styles.sideVeil} aria-hidden="true" />
      <div className={styles.bottomVeil} aria-hidden="true" />
      <motion.div
        className={styles.mist}
        aria-hidden="true"
        initial={{ opacity: 1 }}
        animate={{ opacity: 0 }}
        transition={{ duration: 2.4, ease: "easeOut" }}
      />
    </div>
    <div className={styles.inner}>
      <motion.div
        className={styles.content}
        initial={{ opacity: 0, y: 16, filter: "blur(8px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ duration: 1.6, ease: "easeOut", delay: 0.5 }}
      >
        {children}
      </motion.div>
    </div>
  </section>
);

// Filet — croissant — filet : le séparateur de l'écran de fin des reels.
export const MoonDivider = ({ align = "center", className = "" }: { align?: "center" | "start"; className?: string }) => (
  <div
    className={`${styles.divider} ${align === "start" ? styles.dividerStart : ""} ${className}`}
    aria-hidden="true"
  >
    <span />
    <Moon size={13} strokeWidth={1.5} />
    <span />
  </div>
);
