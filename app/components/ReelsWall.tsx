"use client";
import { motion } from "framer-motion";
import { colors, socials } from "../theme";
import { SceneVideo } from "./SceneVideo";
import { AnimaButton } from "./AnimaButton";
import { InstagramIcon, TikTokIcon } from "./Social";
import styles from "./ReelsWall.module.css";

// ============================================================
// MUR DE REELS — le pont entre le site et les réseaux.
// Mêmes scènes, même avatar, citations reprises des reels publiés
// (montées au format 9:16 par scripts/build-videos.sh).
// ============================================================
const REELS = ["reel-silence", "reel-intuition", "reel-ciel"];

export const ReelsWall = () => (
  <section className={styles.section}>
    <div className="max-w-6xl mx-auto px-6 relative">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10 md:mb-16"
      >
        <div>
          <p className="text-sm tracking-[0.25em] uppercase mb-3" style={{ color: colors.rooted, fontFamily: "'Cormorant Garamond', serif" }}>
            Instagram · TikTok
          </p>
          <h2 className="text-4xl md:text-5xl" style={{ fontFamily: "'Cormorant Garamond', serif", color: colors.ink, fontWeight: 400 }}>
            {socials.instagram.handle}
          </h2>
        </div>
        <div className="flex flex-wrap gap-3">
          <AnimaButton href={socials.instagram.url} external variant="rose" size="sm">
            <InstagramIcon size={15} /> Instagram
          </AnimaButton>
          <AnimaButton href={socials.tiktok.url} external variant="veil" size="sm">
            <TikTokIcon size={14} /> TikTok
          </AnimaButton>
        </div>
      </motion.div>

      <div className={styles.track}>
        {REELS.map((name, i) => (
          <motion.div
            key={name}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.8, delay: i * 0.12 }}
            className={`${styles.card} ${i === 1 ? styles.raised : ""}`}
          >
            <SceneVideo name={name} className={styles.video} controlsPosition="top-right" />
            <a
              href={socials.instagram.url}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.link}
              aria-label={`Instagram — ${socials.instagram.handle}`}
            >
              <span className={styles.badge}>
                <InstagramIcon size={13} />
                {socials.instagram.handle}
              </span>
            </a>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);
