"use client";
import { motion, useReducedMotion } from "framer-motion";
import { colors } from "../theme";

// ============================================================
// Assets célestes — portés depuis "Anima Celestial Assets.html".
// Géométrie, phases et constellation reprises à l'identique ; les
// animations (lueur, scintillement) passent par framer-motion plutôt
// que des keyframes CSS, et se figent proprement si l'utilisateur
// préfère un mouvement réduit (prefers-reduced-motion).
// ============================================================

// ─────────────────────────────────────────────
// 02 · Le séparateur lunaire
// 5 phases de lune en trait cuivré, sur un filet.
// ─────────────────────────────────────────────
const MOON_PHASES = [-0.85, -0.4, 0, 0.5, 1] as const; // décalage du terminateur : -1 nouvelle … 1 pleine
const MOON_R = 17;
const MOON_C = 20;

// Demi-disque droit refermé par une ellipse-terminateur (rx = |k|·r).
function moonPath(k: number): string {
  const rx = Math.abs(k) * MOON_R;
  const sweepInner = k >= 0 ? 1 : 0;
  return `M ${MOON_C} ${MOON_C - MOON_R} A ${MOON_R} ${MOON_R} 0 0 1 ${MOON_C} ${MOON_C + MOON_R} A ${rx} ${MOON_R} 0 0 ${sweepInner} ${MOON_C} ${MOON_C - MOON_R} Z`;
}

export function MoonPhaseDivider({
  label,
  className = "",
}: {
  label?: string;
  className?: string;
}) {
  const reduce = useReducedMotion();
  const hairline = `linear-gradient(90deg, transparent, ${colors.rooted}55 40%, ${colors.rooted}55 60%, transparent)`;

  return (
    <div
      role="separator"
      aria-orientation="horizontal"
      className={`flex flex-col items-center gap-4 py-12 md:py-20 ${className}`}
    >
      <motion.div
        initial={reduce ? false : { opacity: 0 }}
        whileInView={reduce ? undefined : { opacity: 1 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 1 }}
        className="flex w-full max-w-2xl items-center px-6"
        style={{ gap: "clamp(14px, 4vw, 26px)" }}
      >
        <span aria-hidden className="h-px flex-1" style={{ background: hairline }} />
        <div className="flex items-center" style={{ gap: "clamp(14px, 4vw, 26px)" }}>
          {MOON_PHASES.map((k, i) => {
            const isFull = i === MOON_PHASES.length - 1;
            return (
              <svg key={i} width={40} height={40} viewBox="0 0 40 40" aria-hidden>
                <circle
                  cx={MOON_C}
                  cy={MOON_C}
                  r={MOON_R}
                  fill={colors.cream}
                  stroke={colors.rooted}
                  strokeWidth={1.3}
                />
                {k > -1 &&
                  (isFull ? (
                    <motion.path
                      d={moonPath(k)}
                      fill={colors.rooted}
                      fillOpacity={0.16}
                      stroke={colors.rooted}
                      strokeWidth={0.8}
                      strokeOpacity={0.55}
                      animate={
                        reduce
                          ? undefined
                          : {
                              filter: [
                                `drop-shadow(0 0 0px ${colors.softLight}00)`,
                                `drop-shadow(0 0 8px ${colors.softLight}88)`,
                                `drop-shadow(0 0 0px ${colors.softLight}00)`,
                              ],
                            }
                      }
                      transition={
                        reduce ? undefined : { duration: 6, repeat: Infinity, ease: "easeInOut" }
                      }
                    />
                  ) : (
                    <path
                      d={moonPath(k)}
                      fill={colors.rooted}
                      fillOpacity={0.13}
                      stroke={colors.rooted}
                      strokeWidth={0.8}
                      strokeOpacity={0.55}
                    />
                  ))}
              </svg>
            );
          })}
        </div>
        <span aria-hidden className="h-px flex-1" style={{ background: hairline }} />
      </motion.div>

      {label && (
        <span
          className="italic"
          style={{ fontFamily: "'Cormorant Garamond', serif", color: colors.inkSoft, fontSize: "16px" }}
        >
          {label}
        </span>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────
// 03 · La trame d'étoiles
// Constellation cuivrée très discrète, en fond de section.
// Se pose comme WatercolorBg : absolue, décorative, sans capter
// les clics. Les étoiles scintillent, sauf en mouvement réduit.
// ─────────────────────────────────────────────
const STARS: ReadonlyArray<readonly [number, number]> = [
  [16, 12], [27, 22], [24, 38], [38, 30], [49, 15], [58, 28], [52, 44],
  [66, 52], [78, 40], [86, 22], [72, 16], [40, 52], [31, 58],
];
const LINKS: ReadonlyArray<readonly [number, number]> = [
  [0, 1], [1, 2], [1, 3], [3, 4], [4, 10], [10, 9], [9, 8], [8, 5],
  [5, 3], [5, 6], [6, 7], [6, 11], [2, 11], [11, 12],
];

export function ConstellationBackdrop({
  opacity = 0.5,
  className = "",
}: {
  opacity?: number;
  className?: string;
}) {
  const reduce = useReducedMotion();
  const fade = "linear-gradient(to bottom, #000 55%, transparent 100%)";

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-x-0 top-0 overflow-hidden ${className}`}
      style={{
        height: "min(72%, 560px)",
        opacity,
        WebkitMaskImage: fade,
        maskImage: fade,
      }}
    >
      <svg className="h-full w-full" viewBox="0 0 100 70" preserveAspectRatio="xMidYMid slice" fill="none">
        {LINKS.map(([a, b], i) => (
          <line
            key={i}
            x1={STARS[a][0]}
            y1={STARS[a][1]}
            x2={STARS[b][0]}
            y2={STARS[b][1]}
            stroke={colors.rooted}
            strokeWidth={0.28}
            strokeOpacity={0.3}
          />
        ))}
        {STARS.map(([cx, cy], i) => {
          const r = i % 4 === 0 ? 0.95 : 0.62;
          if (reduce) {
            return <circle key={i} cx={cx} cy={cy} r={r} fill={colors.rooted} opacity={0.7} />;
          }
          return (
            <motion.circle
              key={i}
              cx={cx}
              cy={cy}
              r={r}
              fill={colors.rooted}
              initial={{ opacity: 0.35 }}
              animate={{ opacity: [0.35, 1, 0.35] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: i * 0.4 }}
            />
          );
        })}
      </svg>
    </div>
  );
}
