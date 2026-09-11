"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import Image from "next/image";
import { animate, motion, useMotionValue, useReducedMotion, useTransform } from "framer-motion";
import { ChevronLeft, ChevronRight, Feather, Quote } from "lucide-react";
import { colors } from "../theme";
import { testimonials, type Testimonial } from "./testimonials";
import styles from "./Guestbook.module.css";

function Entry({ entry, index }: { entry: Testimonial; index: number }) {
  return <div className={styles.entry}>
    <div className={styles.pageHeading}><span>Une rencontre, un chemin</span><Feather size={16} aria-hidden="true" /></div>
    <Quote className={styles.quote} size={24} aria-hidden="true" />
    <blockquote>{entry.text}</blockquote>
    <div className={styles.signature}><p>{entry.name}</p>{entry.format && <span>{entry.format}</span>}</div>
    <span className={styles.folio}>{String(index + 1).padStart(2, "0")}</span>
  </div>;
}

function Frontispiece() {
  return <div className={styles.frontispiece}>
    <span className={styles.eyebrow}>Anima · éveil & retour à soi</span>
    <h2>Livre d’or</h2>
    <div className={styles.botanical}><Image src="/botanical/fairy-rose-watercolor.webp" alt="" width={640} height={960} sizes="180px" /></div>
    <p>Des mots déposés,<br />des chemins qui s’ouvrent.</p>
    <span className={styles.flourish} aria-hidden="true" />
  </div>;
}

function LeftPage({ index }: { index: number }) {
  if (index < 0) return <Frontispiece />;

  return <div className={styles.leftEntry}>
    <Entry entry={testimonials[index]} index={index} />
  </div>;
}

export function Guestbook() {
  const [current, setCurrent] = useState(0);
  const [turn, setTurn] = useState<{ from: number; to: number } | null>(null);
  const [wide, setWide] = useState(false);
  const reducedMotion = useReducedMotion();
  const turnLock = useRef(false);
  const touchStart = useRef<{ x: number; y: number } | null>(null);
  const angle = useMotionValue(0);
  const shadow = useTransform(angle, [-180, -90, 0], [0, .24, 0]);

  useEffect(() => {
    const media = window.matchMedia("(min-width: 768px)");
    const update = () => setWide(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (!turn) return;
    const forward = turn.to > turn.from;
    angle.set(forward ? 0 : -180);
    const controls = animate(angle, forward ? -180 : 0, {
      duration: wide && !reducedMotion ? .95 : 0, ease: [.4, .05, .25, 1],
      onComplete: () => { setCurrent(turn.to); setTurn(null); turnLock.current = false; },
    });
    return () => controls.stop();
  }, [turn, angle, wide, reducedMotion]);

  const goTo = (next: number) => {
    if (turnLock.current || next < 0 || next >= testimonials.length || next === current) return;
    if (reducedMotion || !wide) { setCurrent(next); return; }
    if (Math.abs(next - current) > 1) { setCurrent(next); return; }
    turnLock.current = true;
    setTurn({ from: current, to: next });
  };
  const bottom = turn && turn.to > turn.from ? turn.to : current;
  const leaf = turn && turn.to < turn.from ? turn.to : current;
  const leftPage = (turn?.to ?? current) - 1;
  const turningVerso = turn
    ? (turn.to > turn.from ? turn.to - 1 : turn.from - 1)
    : -1;
  const palette = {
    "--book-ink": colors.ink, "--book-muted": colors.inkSoft,
    "--book-copper": colors.rooted, "--book-pink": colors.warmHeart,
    "--book-cream": colors.cream, "--book-peach": colors.softLight,
    "--book-mint": colors.flow,
  } as CSSProperties;

  return <section className={styles.section} style={palette}>
    <header className={styles.header}>
      <span className={styles.eyebrow}>Témoignages</span>
      <h1>Ils ont franchi la porte</h1>
      <p>Quelques mots partagés par celles et ceux qui ont vécu l’expérience.</p>
    </header>
    <div className={styles.readingArea} role="region" aria-label="Livre d’or" tabIndex={0}
      onKeyDown={event => {
        if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
          event.preventDefault(); goTo(current + (event.key === "ArrowRight" ? 1 : -1));
        }
      }}
      onTouchStart={event => { const t = event.touches[0]; touchStart.current = { x: t.clientX, y: t.clientY }; }}
      onTouchEnd={event => {
        const start = touchStart.current; touchStart.current = null;
        if (!start) return;
        const t = event.changedTouches[0], dx = t.clientX-start.x, dy = t.clientY-start.y;
        if (Math.abs(dx) > 55 && Math.abs(dx) > Math.abs(dy)*1.5) goTo(current + (dx < 0 ? 1 : -1));
      }}>
      <div className={styles.book}>
        <div className={styles.leftPage} aria-hidden="true"><LeftPage index={leftPage} /></div>
        <div className={styles.reader}>
          {/* All entries reserve the tallest page without clipping or nested scrolling. */}
          <div className={styles.sizing} aria-hidden="true">{testimonials.map((entry,index) => <Entry key={entry.name} entry={entry} index={index} />)}</div>
          <article className={styles.restingPage} aria-hidden={turn ? true : undefined}>
            <motion.div key={bottom} initial={wide || reducedMotion ? false : { opacity: .3 }} animate={{ opacity: 1 }} transition={{ duration: .25 }}>
              <Entry entry={testimonials[bottom]} index={bottom} />
            </motion.div>
          </article>
          {turn && <motion.div className={styles.turningPage} aria-hidden="true" style={{ rotateY: angle }}>
            <div className={styles.recto}><Entry entry={testimonials[leaf]} index={leaf} /><motion.div className={styles.turnShadow} style={{ opacity: shadow }} /></div>
            <div className={styles.verso}><LeftPage index={turningVerso} /><motion.div className={styles.turnShadow} style={{ opacity: shadow }} /></div>
          </motion.div>}
        </div>
        <span className={styles.ribbon} aria-hidden="true" />
      </div>
      <div className={styles.navigation}>
        <button type="button" onClick={() => goTo(current-1)} disabled={current === 0} aria-disabled={current === 0 || !!turn} aria-label="Témoignage précédent"><ChevronLeft size={18} /><span>Précédent</span></button>
        <p aria-live="polite" aria-atomic="true">{current+1} <span>sur {testimonials.length}</span><span className={styles.srOnly}> — {testimonials[current].name}</span></p>
        <button type="button" onClick={() => goTo(current+1)} disabled={current === testimonials.length-1} aria-disabled={current === testimonials.length-1 || !!turn} aria-label="Témoignage suivant"><span>Suivant</span><ChevronRight size={18} /></button>
      </div>
      <nav className={styles.names} aria-label="Choisir un témoignage">{testimonials.map((entry,index) => <button type="button" key={entry.name} aria-current={current===index ? "page" : undefined} aria-disabled={!!turn} onClick={() => goTo(index)}>{entry.name}</button>)}</nav>
    </div>
    <p className={styles.closing}>Merci pour votre confiance et pour ces mots.</p>
  </section>;
}
