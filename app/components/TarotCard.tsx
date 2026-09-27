"use client";
import { useRef, useState, type CSSProperties, type PointerEvent } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, Sparkle } from "lucide-react";
import { AnimaButton } from "./AnimaButton";
import styles from "./TarotCard.module.css";

// ============================================================
// CARTE DE TIRAGE — dos doré (cover2.png) et recto assorti :
// papier ivoire, double filet d'or, étoiles aux coins et une lune
// qui se remplit avec la durée (croissant → pleine lune).
// Posée de biais comme un tirage étalé, elle se redresse au survol
// et s'incline sous la souris ; le reflet de la dorure la suit.
// ============================================================
type Props = {
  index: number;       // position dans le tirage (inclinaison, phase de lune)
  total: number;
  duration: string;
  price: number;
  tagline: string;
  description: string;
  bookingHref: string;
};

// part éclairée de la lune pour chaque carte : croissant → pleine lune
const phase = (index: number, total: number) => (total > 1 ? 0.3 + (0.7 * index) / (total - 1) : 1);

export const TarotCard = ({ index, total, duration, price, tagline, description, bookingHref }: Props) => {
  const [flipped, setFlipped] = useState(false);
  // Une fois retournée, la carte quitte la 3D : Chrome ne floute plus le texte.
  const [settled, setSettled] = useState(false);
  const flip = (next: boolean) => { setSettled(false); setFlipped(next); };
  const tilt = useRef<HTMLDivElement>(null);

  // Inclinaison 3D + reflet : souris uniquement, et jamais avec « réduire les animations ».
  const move = (e: PointerEvent<HTMLDivElement>) => {
    const el = tilt.current;
    if (!el || e.pointerType !== "mouse" || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width;
    const y = (e.clientY - r.top) / r.height;
    el.style.setProperty("--tilt", `rotateX(${(0.5 - y) * 10}deg) rotateY(${(x - 0.5) * 12}deg)`);
    el.style.setProperty("--mx", `${x * 100}%`);
    el.style.setProperty("--my", `${y * 100}%`);
  };
  const reset = () => {
    const el = tilt.current;
    if (!el) return;
    ["--tilt", "--mx", "--my"].forEach((p) => el.style.removeProperty(p));
  };

  // éventail : les cartes du bord penchent davantage et descendent un peu
  const spread = total > 1 ? index / (total - 1) - 0.5 : 0; // -0.5 … 0.5
  const slot = {
    "--rest": `${spread * 7}deg`,
    "--drop": `${Math.abs(spread) * 1.4}rem`,
    "--lit": phase(index, total),
  } as CSSProperties;

  return (
    <div className={`${styles.slot} ${flipped ? styles.isFlipped : ""} ${flipped && settled ? styles.settled : ""}`} style={slot}>
      <div ref={tilt} className={styles.tilt} onPointerMove={move} onPointerLeave={reset} onClick={() => flip(!flipped)}>
        <motion.div
          className={styles.flipper}
          animate={{ rotateY: flipped ? 180 : 0 }}
          transition={{ duration: 0.9, ease: [0.45, 0.05, 0.25, 1] }}
          onAnimationComplete={() => setSettled(true)}
        >
          {/* DOS */}
          <div className={`${styles.face} ${styles.back}`} inert={flipped}>
            <Image src="/cover2.png" alt="" fill sizes="(min-width: 1024px) 15rem, (min-width: 640px) 45vw, 72vw" className={styles.backArt} />
            {/* bouton réel pour le clavier et les lecteurs d'écran : il retourne la carte */}
            <button
              type="button"
              className={styles.flipButton}
              aria-expanded={flipped}
              aria-label={`Lecture d'âme — ${duration}`}
              onClick={(e) => { e.stopPropagation(); flip(true); }}
            />
          </div>

          {/* RECTO */}
          <div className={`${styles.face} ${styles.front}`} inert={!flipped}>
            <div className={styles.frame} aria-hidden="true">
              {["tl", "tr", "bl", "br"].map((c) => (
                <span key={c} className={`${styles.corner} ${styles[c]}`}><Sparkle size={9} strokeWidth={1.4} /></span>
              ))}
            </div>

            <div className={styles.content}>
              <span className={styles.moon} aria-hidden="true" />
              <p className={styles.eyebrow}>Lecture d&apos;âme</p>
              <h3 className={styles.duration}>
                <button
                  type="button"
                  className={styles.flipBack}
                  aria-expanded={flipped}
                  onClick={(e) => { e.stopPropagation(); flip(false); }}
                >
                  {duration}
                </button>
              </h3>
              <p className={styles.price}>{price} €</p>
              <div className={styles.divider} aria-hidden="true"><span /><Sparkle size={8} strokeWidth={1.4} /><span /></div>
              <p className={styles.tagline}>{tagline}</p>
              <p className={styles.description}>{description}</p>
            </div>

            <AnimaButton
              href={bookingHref}
              external
              onClick={(e) => e.stopPropagation()}
              variant="rose"
              size="sm"
              fullWidth
              className={styles.cta}
            >
              Réserver <ArrowRight size={14} />
            </AnimaButton>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
