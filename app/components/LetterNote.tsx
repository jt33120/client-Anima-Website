import type { ReactNode } from "react";
import { Leaf, Moon } from "lucide-react";
import styles from "./LetterNote.module.css";

// ============================================================
// LETTRE — un mot personnel sur papier, scellé à la cire.
// L'accroche (lead) s'affiche en grand à gauche, le propos à
// droite, la mention (note) sous un filet. Le texte est fourni
// tel quel par la page : ce composant ne gère que le rendu.
// ============================================================
export const LetterNote = ({ lead, children, note }: { lead: ReactNode; children: ReactNode; note?: ReactNode }) => (
  <article className={styles.letter}>
    <span className={styles.seal} aria-hidden="true">
      <Moon size={26} strokeWidth={1.3} />
    </span>
    <p className={styles.message}>
      <strong className={styles.lead}>{lead}</strong>{" "}
      <span className={styles.body}>{children}</span>
    </p>
    {note && (
      <p className={styles.note}>
        <span className={styles.noteIcon} aria-hidden="true"><Leaf size={15} strokeWidth={1.5} /></span>
        <em>{note}</em>
      </p>
    )}
  </article>
);
