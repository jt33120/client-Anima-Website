"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import Image from "next/image";
import { animate, motion, useMotionValue, useReducedMotion, useTransform, type MotionValue } from "framer-motion";
import { ChevronLeft, ChevronRight, Feather, Quote } from "lucide-react";
import { colors } from "../theme";
import { testimonials, type Testimonial } from "./testimonials";
import styles from "./Guestbook.module.css";

const PAGE_COUNT = testimonials.length + 1;
const STRIPS = 20;

function Entry({ entry, index }: { entry: Testimonial; index: number }) {
  return <div className={styles.entry}>
    <div className={styles.pageHeading}><span>Une rencontre, un chemin</span><Feather size={16} aria-hidden="true" /></div>
    <Quote className={styles.quote} size={24} aria-hidden="true" />
    <blockquote>{entry.text}</blockquote>
    <div className={styles.signature}><p>{entry.name}</p>{entry.format && <span>{entry.format}</span>}</div>
    <span className={styles.folio}>{String(index + 1).padStart(2, "0")}</span>
  </div>;
}

function Page({ number }: { number: number }) {
  if (number > 0) return <Entry entry={testimonials[number - 1]} index={number - 1} />;
  return <div className={styles.frontispiece}>
    <span className={styles.eyebrow}>Anima · éveil & retour à soi</span>
    <h2>Livre d’or</h2>
    <div className={styles.botanical}><Image src="/botanical/fairy-rose-watercolor.webp" alt="" width={640} height={960} sizes="180px" /></div>
    <p>Des mots déposés,<br />des chemins qui s’ouvrent.</p>
    <span className={styles.flourish} aria-hidden="true" />
  </div>;
}

// Integrate one flexible sheet: each strip begins at the previous strip's edge,
// while the binding stays fixed. The outer edge leads and the paper follows.
function stripPose(progress: number, index: number, width: number) {
  const bend = Math.sin(Math.PI * progress) * .95;
  let x = 0, z = 0, angle = 0;
  for (let i = 0; i <= index; i++) {
    angle = -Math.PI * progress + bend * (1 - 2 * (i + .5) / STRIPS);
    if (i < index) {
      x += Math.cos(angle) * width / STRIPS;
      z -= Math.sin(angle) * width / STRIPS;
    }
  }
  return { x, z, angle };
}

function PaperStrip({ index, progress, width, recto, verso }: {
  index: number; progress: MotionValue<number>; width: number; recto: number; verso: number;
}) {
  const transform = useTransform(progress, value => {
    const pose = stripPose(value, index, width);
    return `translate3d(${pose.x}px,0,${pose.z}px) rotateY(${pose.angle}rad)`;
  });
  const shade = useTransform(progress, value => .13 * Math.abs(Math.sin(stripPose(value, index, width).angle)));
  const segmentWidth = width / STRIPS;
  return <motion.div className={styles.strip} style={{ width: segmentWidth + .4, transform }}>
    <div className={styles.recto}>
      <div className={styles.pageSlice} style={{ width, left: -index * segmentWidth }}><Page number={recto} /></div>
      <motion.div className={styles.turnShadow} style={{ opacity: shade }} />
    </div>
    <div className={styles.verso}>
      <div className={`${styles.pageSlice} ${styles.leftPage}`} style={{ width, left: -(STRIPS - 1 - index) * segmentWidth - .4 }}><Page number={verso} /></div>
      <motion.div className={styles.turnShadow} style={{ opacity: shade }} />
    </div>
  </motion.div>;
}

export function Guestbook() {
  // Fixed physical pages: cover, Ksenia, Jenny, Laura, Leslie, Karine, Cindy, Julian.
  // Landscape advances two pages; portrait reads every page individually.
  const [current, setCurrent] = useState(0);
  const [turn, setTurn] = useState<{ from: number; to: number; width: number } | null>(null);
  const [wide, setWide] = useState(false);
  const reducedMotion = useReducedMotion();
  const turnLock = useRef(false);
  const paper = useRef<HTMLDivElement>(null);
  const touchStart = useRef<{ x: number; y: number } | null>(null);
  const progress = useMotionValue(0);

  useEffect(() => {
    const media = window.matchMedia("(min-width: 768px)");
    const update = () => setWide(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (!turn) return;
    const finish = () => { setCurrent(turn.to); setTurn(null); turnLock.current = false; };
    const controls = animate(progress, turn.to > turn.from ? 1 : 0, {
      duration: wide && !reducedMotion ? 1.25 : 0,
      ease: [.38, .02, .22, 1], onComplete: finish,
    });
    // Settle a resized sheet before its measured geometry becomes stale.
    window.addEventListener("resize", finish, { once: true });
    return () => { controls.stop(); window.removeEventListener("resize", finish); };
  }, [turn, progress, wide, reducedMotion]);

  const first = wide ? current - current % 2 : current;
  const last = Math.min(first + (wide ? 1 : 0), PAGE_COUNT - 1);
  const goTo = (page: number) => {
    const next = wide ? page - page % 2 : page;
    if (turnLock.current || next < 0 || next >= PAGE_COUNT || next === first) return;
    if (!wide || reducedMotion || Math.abs(next - first) !== 2) { setCurrent(next); return; }
    turnLock.current = true;
    progress.set(next > first ? 0 : 1);
    setTurn({ from: first, to: next, width: (paper.current?.getBoundingClientRect().width ?? 0) / 2 });
  };
  const step = wide ? 2 : 1;
  const forward = !!turn && turn.to > turn.from;
  // During a forward turn the old left page stays put. During a backward turn
  // the previous left page is revealed. The moving leaf has two distinct faces.
  const left = turn ? (forward ? turn.from : turn.to) : first;
  const right = turn ? (forward ? turn.to + 1 : turn.from + 1) : last;
  const recto = turn ? Math.min(turn.from, turn.to) + 1 : 1;
  const visibleNames = testimonials.slice(Math.max(0, first - 1), last).map(entry => entry.name).join(" et ");
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
          event.preventDefault(); goTo(first + (event.key === "ArrowRight" ? step : -step));
        }
      }}
      onTouchStart={event => { const t = event.touches[0]; touchStart.current = { x: t.clientX, y: t.clientY }; }}
      onTouchEnd={event => {
        const start = touchStart.current; touchStart.current = null;
        if (!start) return;
        const t = event.changedTouches[0], dx = t.clientX-start.x, dy = t.clientY-start.y;
        if (Math.abs(dx) > 55 && Math.abs(dx) > Math.abs(dy)*1.5) goTo(first + (dx < 0 ? step : -step));
      }}>
      <div className={styles.book}>
        <div ref={paper} className={styles.paper}>
          <div className={styles.sizing} aria-hidden="true"><Page number={0} />{testimonials.map((entry,index) => <Entry key={entry.name} entry={entry} index={index} />)}</div>
          {wide ? <>
            <article className={`${styles.restingPage} ${styles.leftPage}`} aria-hidden={!!turn} data-page={left}><Page number={left} /></article>
            <article className={`${styles.restingPage} ${styles.rightPage}`} aria-hidden={!!turn} data-page={right}><Page number={right} /></article>
          </> : <article className={styles.restingPage} data-page={first}><Page number={first} /></article>}
          {turn && <div className={styles.turningPage} aria-hidden="true">
            {Array.from({ length: STRIPS }, (_,index) => <PaperStrip key={index} index={index} progress={progress} width={turn.width} recto={recto} verso={recto + 1} />)}
          </div>}
        </div>
        <span className={styles.ribbon} aria-hidden="true" />
      </div>
      <div className={styles.navigation}>
        <button type="button" onClick={() => goTo(first-step)} disabled={first === 0} aria-disabled={first === 0 || !!turn} aria-label="Page précédente"><ChevronLeft size={18} /><span>Précédent</span></button>
        <p aria-live="polite" aria-atomic="true">{last === 0 ? "Couverture" : <>{Math.max(1,first)}{last > Math.max(1,first) ? `–${last}` : ""} <span>sur {testimonials.length}</span></>}<span className={styles.srOnly}> — {visibleNames || "Livre d’or"}</span></p>
        <button type="button" onClick={() => goTo(first+step)} disabled={last === PAGE_COUNT-1} aria-disabled={last === PAGE_COUNT-1 || !!turn} aria-label="Page suivante"><span>Suivant</span><ChevronRight size={18} /></button>
      </div>
      <nav className={styles.names} aria-label="Choisir un témoignage">{testimonials.map((entry,index) => <button type="button" key={entry.name} aria-current={index+1 >= first && index+1 <= last ? "page" : undefined} aria-disabled={!!turn} onClick={() => goTo(index+1)}>{entry.name}</button>)}</nav>
    </div>
    <p className={styles.closing}>Merci pour votre confiance et pour ces mots.</p>
  </section>;
}
