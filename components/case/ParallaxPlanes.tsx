"use client";

import { useEffect, useRef, type RefObject } from "react";

type ParallaxPlanesProps = {
  layers: [string, string, string];
  scroller?: RefObject<HTMLElement | null>;
  span?: "full" | "viewport";
};

const STACK = [-1, 0, 1] as const;

export default function ParallaxPlanes({
  layers,
  scroller,
  span = "full",
}: ParallaxPlanesProps) {
  const layerRefs = [
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
  ];

  useEffect(() => {
    const nodes = layerRefs.map((item) => item.current).filter(Boolean);
    if (nodes.length === 0) return;

    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;

    const apply = (progress: number) => {
      const p = media.matches ? 0 : progress;
      layerRefs.forEach((item, index) => {
        const node = item.current;
        if (!node) return;
        const extra = p * 32 * STACK[index];
        node.style.transform = `translate(calc(${STACK[index]} * var(--plane-shift) + ${extra}px), calc(${STACK[index]} * var(--plane-shift) + ${extra}px))`;
      });
    };

    const readProgress = () => {
      if (scroller?.current) {
        const el = scroller.current;
        if (span === "viewport") {
          return Math.min(1, el.scrollTop / Math.max(el.clientHeight, 1));
        }
        const max = el.scrollHeight - el.clientHeight;
        return max <= 0 ? 0 : el.scrollTop / max;
      }
      return Math.min(
        1,
        window.scrollY / Math.max(window.innerHeight * 0.85, 1),
      );
    };

    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => apply(readProgress()));
    };

    apply(readProgress());

    const target: HTMLElement | Window = scroller?.current ?? window;
    target.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });

    return () => {
      cancelAnimationFrame(frame);
      target.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [scroller, span]);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      <div className="hero-planes-stack">
        <div
          ref={layerRefs[0]}
          className="hero-plane hero-plane-a opacity-90 transition-colors duration-700 ease-out will-change-transform motion-reduce:transition-none"
          style={{ background: layers[0] }}
        />
        <div
          ref={layerRefs[1]}
          className="hero-plane hero-plane-b opacity-70 transition-colors duration-700 ease-out will-change-transform motion-reduce:transition-none"
          style={{ background: layers[1] }}
        />
        <div
          ref={layerRefs[2]}
          className="hero-plane hero-plane-c opacity-55 transition-colors duration-700 ease-out will-change-transform motion-reduce:transition-none"
          style={{ background: layers[2] }}
        />
      </div>
    </div>
  );
}
