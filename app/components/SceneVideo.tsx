"use client";
import { useEffect, useRef, useState } from "react";
import { Pause, Play } from "lucide-react";
import styles from "./SceneVideo.module.css";

// ============================================================
// SCÈNE VIDÉO — Anima animée (exports Grok, cf. scripts/build-videos.sh)
//
// - Poster WebP rendu immédiatement (SSR), vidéo chargée ensuite.
// - Variante 9:16 recadrée sur Anima quand le cadre est plus haut que large.
// - Lecture seulement à l'écran ; en pause hors champ (CPU, batterie).
// - Pas d'autoplay si « réduire les animations » ou « économie de données ».
// - Bouton pause / lecture (WCAG 2.2.2 : contenu animé > 5 s).
// ============================================================
type SceneVideoProps = {
  name: string;               // /public/videos/{name}.mp4 + .webp
  mobile?: boolean;           // existe-t-il {name}-mobile.mp4 ?
  focus?: number;             // position horizontale d'Anima (0–1) en 16:9
  eager?: boolean;            // hero : charge sans attendre le scroll
  controlsPosition?: "bottom-right" | "top-right" | "above-fade";
  className?: string;
};

export function SceneVideo({
  name, mobile = false, focus = 0.5, eager = false, controlsPosition = "bottom-right", className = "",
}: SceneVideoProps) {
  const frame = useRef<HTMLDivElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const userPaused = useRef(false);
  const autoplay = useRef(true);
  const visible = useRef(false);
  const [variant, setVariant] = useState<"desktop" | "mobile">("desktop");
  const [src, setSrc] = useState<string | null>(null);
  const [playing, setPlaying] = useState(false);

  const base = `/videos/${name}${variant === "mobile" ? "-mobile" : ""}`;

  // Choix du format et lancement du chargement.
  useEffect(() => {
    const el = frame.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const saveData = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData;
    autoplay.current = !reduce && !saveData;

    const portrait = mobile && el.clientWidth / Math.max(el.clientHeight, 1) < 1;
    const chosen = portrait ? "mobile" : "desktop";
    setVariant(chosen);
    const url = `/videos/${name}${chosen === "mobile" ? "-mobile" : ""}.mp4`;

    if (!autoplay.current) return; // poster seul ; le bouton lecture charge la vidéo
    if (eager) { setSrc(url); return; }
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setSrc(url); io.disconnect(); }
    }, { rootMargin: "300px 0px" });
    io.observe(el);
    return () => io.disconnect();
  }, [name, mobile, eager]);

  // Lecture uniquement quand la scène est visible.
  useEffect(() => {
    const el = frame.current;
    const v = video.current;
    if (!el || !v || !src) return;
    const io = new IntersectionObserver(([entry]) => {
      visible.current = entry.isIntersecting;
      if (entry.isIntersecting && autoplay.current && !userPaused.current) v.play().catch(() => {});
      else v.pause();
    }, { threshold: 0.15 });
    io.observe(el);
    return () => io.disconnect();
  }, [src]);

  const toggle = () => {
    const v = video.current;
    if (!v) return;
    if (v.paused) {
      userPaused.current = false;
      autoplay.current = true;
      if (!src) setSrc(`${base}.mp4`);
      v.play().catch(() => {});
    } else {
      userPaused.current = true;
      v.pause();
    }
  };

  return (
    <div ref={frame} className={`${styles.frame} ${className}`}>
      <video
        ref={video}
        className={styles.video}
        style={{ objectPosition: variant === "mobile" ? "50% 50%" : `${focus * 100}% 50%` }}
        src={src ?? undefined}
        poster={`${base}.webp`}
        muted
        loop
        playsInline
        preload={eager ? "auto" : "metadata"}
        aria-hidden="true"
        tabIndex={-1}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onCanPlay={() => {
          if (visible.current && autoplay.current && !userPaused.current) video.current?.play().catch(() => {});
        }}
      />
      <button
        type="button"
        onClick={toggle}
        className={`${styles.control} ${styles[controlsPosition]}`}
        aria-label={playing ? "Mettre la vidéo en pause" : "Lire la vidéo"}
      >
        {playing ? <Pause size={14} strokeWidth={1.75} /> : <Play size={14} strokeWidth={1.75} />}
      </button>
    </div>
  );
}
