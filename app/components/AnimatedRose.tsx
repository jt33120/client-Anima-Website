"use client";

import { useRef } from "react";
import Image from "next/image";
import { useInView } from "framer-motion";
import styles from "./AnimatedRose.module.css";

/** Decorative watercolor rose; the breeze runs only while the rose is visible. */
export function AnimatedRose() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { margin: "60px" });

  return (
    <div ref={ref} className={styles.rose} aria-hidden="true" data-in-view={isInView}>
      <div className={styles.breeze}>
        <Image
          src="/botanical/fairy-rose-watercolor.webp"
          alt=""
          width={640}
          height={960}
          sizes="(min-width: 768px) 208px, 176px"
          className={styles.image}
          draggable={false}
        />
      </div>
    </div>
  );
}
