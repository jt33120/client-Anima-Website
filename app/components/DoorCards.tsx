"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, type LucideIcon } from "lucide-react";
import styles from "./DoorCards.module.css";

// ============================================================
// « UNE PORTE VERS VOUS-MÊME » — trois portes en arche, chacune
// ouvrant sur la scène d'Anima de sa page. Toute la carte est
// cliquable ; au survol (souris), la scène s'anime.
// ============================================================
export type Door = {
  page: string;      // page de destination
  scene: string;     // /public/videos/{scene}-mobile.(mp4|webp) — format portrait
  focus?: string;    // cadrage du poster dans l'arche
  icon: LucideIcon;
  title: string;
  text: string;
};

function DoorCard({ door, index, onOpen }: { door: Door; index: number; onOpen: (page: string) => void }) {
  const video = useRef<HTMLVideoElement>(null);
  const [src, setSrc] = useState<string | undefined>();
  const [playing, setPlaying] = useState(false);
  const Icon = door.icon;

  // Anime la scène seulement avec une vraie souris et sans « réduire les animations ».
  const canAnimate = () =>
    window.matchMedia("(hover: hover) and (pointer: fine)").matches &&
    !window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const hovered = useRef(false);
  const enter = () => {
    if (!canAnimate()) return;
    hovered.current = true;
    if (!src) setSrc(`/videos/${door.scene}-mobile.mp4`); // la lecture démarre dans l'effet ci-dessous
    else video.current?.play().catch(() => {});
  };
  const leave = () => { hovered.current = false; video.current?.pause(); };

  // Première lecture : une fois la source posée sur l'élément par React.
  useEffect(() => {
    if (src && hovered.current) video.current?.play().catch(() => {});
  }, [src]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, delay: index * 0.15 }}
    >
      <article className={styles.card} onMouseEnter={enter} onMouseLeave={leave}>
        <div className={styles.door}>
          <div className={styles.arch}>
            <Image
              src={`/videos/${door.scene}-mobile.webp`}
              alt=""
              fill
              sizes="(min-width: 768px) 30vw, 8rem"
              className={styles.media}
              style={{ objectPosition: door.focus ?? "50% 35%" }}
            />
            <video
              ref={video}
              src={src}
              muted
              loop
              playsInline
              preload="none"
              aria-hidden="true"
              tabIndex={-1}
              className={`${styles.media} ${styles.video} ${playing ? styles.visible : ""}`}
              style={{ objectPosition: door.focus ?? "50% 35%" }}
              onPlaying={() => setPlaying(true)}
              onPause={() => setPlaying(false)}
            />
          </div>
          <span className={styles.medallion} aria-hidden="true"><Icon size={20} strokeWidth={1.6} /></span>
        </div>
        <div className={styles.body}>
          {/* le bouton du titre s'étend à toute la carte (motif « lien étiré ») */}
          <h3 className={styles.title}>
            <button type="button" className={styles.stretched} onClick={() => onOpen(door.page)}>{door.title}</button>
          </h3>
          <p className={styles.text}>{door.text}</p>
          <span className={styles.arrow} aria-hidden="true"><ArrowRight size={16} strokeWidth={1.6} /></span>
        </div>
      </article>
    </motion.div>
  );
}

export const DoorCards = ({ doors, onOpen }: { doors: Door[]; onOpen: (page: string) => void }) => (
  <div className={styles.grid}>
    {doors.map((door, i) => <DoorCard key={door.page} door={door} index={i} onOpen={onOpen} />)}
  </div>
);
