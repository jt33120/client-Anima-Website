import type { CSSProperties, MouseEvent, ReactNode } from "react";
import styles from "./AnimaButton.module.css";

// ============================================================
// BOUTONS — lavis aquarelle du kit Anima (remplace les aplats bruns)
//   rose  : action principale (rose fleur → pêche)
//   veil  : action secondaire, voile ivoire (lisible sur vidéo)
//   sage  : univers Feng Shui (aqua → sauge)
//   ivory : sur un panneau rose
//   tint  : teinte fournie par l'appelant (--tint-soft / --tint-accent / --tint-ink)
// ============================================================
type Variant = "rose" | "veil" | "sage" | "ivory" | "tint";
type Size = "sm" | "md" | "lg";

type AnimaButtonProps = {
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  href?: string;
  external?: boolean;
  onClick?: (e: MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => void;
  disabled?: boolean;
  fullWidth?: boolean;
  className?: string;
  style?: CSSProperties;
  type?: "button" | "submit";
  "aria-label"?: string;
};

export function AnimaButton({
  children, variant = "rose", size = "md", href, external, onClick, disabled,
  fullWidth, className = "", style, type = "button", ...aria
}: AnimaButtonProps) {
  const cls = [styles.btn, styles[variant], styles[size], fullWidth ? styles.full : "", className].join(" ");
  const inner = <span className={styles.label}>{children}</span>;

  if (href) {
    return (
      <a
        href={href}
        className={cls}
        style={style}
        onClick={onClick}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        {...aria}
      >
        {inner}
      </a>
    );
  }
  return (
    <button type={type} className={cls} style={style} onClick={onClick} disabled={disabled} {...aria}>
      {inner}
    </button>
  );
}
