"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { useInView, useReducedMotion } from "framer-motion";
import { createRoseWind } from "./roseWind";
import styles from "./AnimatedRose.module.css";

export function AnimatedRose() {
  const ref = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isInView = useInView(ref, { margin: "60px" });
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !isInView || reducedMotion !== false) return;
    let disposed = false;
    let frame = 0;
    let renderer: ReturnType<typeof createRoseWind> = null;
    let last = 0;
    const draw = (now: number) => {
      if (disposed || document.hidden) return;
      renderer?.draw(last ? Math.min((now-last)/1000, 1/30) : 0);
      last = now;
      frame = requestAnimationFrame(draw);
    };
    const visibility = () => {
      cancelAnimationFrame(frame);
      last = 0;
      if (!document.hidden && renderer) frame = requestAnimationFrame(draw);
    };
    const loseContext = () => {
      cancelAnimationFrame(frame);
      renderer = null;
      delete canvas.dataset.ready;
    };
    const image = new window.Image();
    image.onload = () => {
      if (disposed) return;
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(canvas.clientWidth*ratio);
      canvas.height = Math.round(canvas.clientHeight*ratio);
      renderer = createRoseWind(canvas, image);
      if (!renderer) return;
      renderer.draw(0);
      canvas.dataset.ready = "true";
      visibility();
    };
    image.src = "/botanical/fairy-rose-watercolor.webp";
    document.addEventListener("visibilitychange", visibility);
    canvas.addEventListener("webglcontextlost", loseContext);
    return () => {
      disposed = true;
      image.onload = null;
      cancelAnimationFrame(frame);
      document.removeEventListener("visibilitychange", visibility);
      canvas.removeEventListener("webglcontextlost", loseContext);
      renderer?.dispose();
      delete canvas.dataset.ready;
    };
  }, [isInView, reducedMotion]);

  return (
    <div ref={ref} className={styles.rose} aria-hidden="true">
      <canvas ref={canvasRef} className={styles.canvas} />
      <Image src="/botanical/fairy-rose-watercolor.webp" alt="" width={640} height={960}
        sizes="(min-width: 768px) 208px, 176px" className={styles.image} draggable={false} />
    </div>
  );
}
