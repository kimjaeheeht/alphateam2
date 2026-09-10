"use client";

import { useEffect, useRef, useState } from "react";

import { HomeSnapContext } from "@/components/home/HomeSnapContext";
import { homeScenes } from "@/lib/home-scenes";

type HomeScene = (typeof homeScenes)[number];

const initialScene: HomeScene = homeScenes[0];

export default function HomeScrollCanvas({
  children,
}: {
  children: React.ReactNode;
}) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [scene, setScene] = useState<HomeScene>(initialScene);

  useEffect(() => {
    const root = scrollerRef.current;
    if (!root) return;

    const nodes = Array.from(root.querySelectorAll("[data-home-scene]"));
    if (nodes.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (!visible) return;

        const id = visible.target.getAttribute("data-home-scene");
        const next = homeScenes.find((item) => item.id === id);
        if (next) setScene(next);
      },
      {
        root,
        threshold: 0.55,
      },
    );

    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const root = scrollerRef.current;
    if (!root) return;

    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (media.matches) return;

    const rail = () =>
      root.querySelector<HTMLElement>(".home-slide-rail");

    const manifestoVisible = () => {
      const node = root.querySelector("[data-home-scene='manifesto']");
      if (!(node instanceof HTMLElement)) return false;
      const rootBox = root.getBoundingClientRect();
      const box = node.getBoundingClientRect();
      const overlap =
        Math.min(rootBox.bottom, box.bottom) - Math.max(rootBox.top, box.top);
      return overlap > root.clientHeight * 0.55;
    };

    const onKey = (event: KeyboardEvent) => {
      if (event.defaultPrevented) return;
      const keys = [
        "ArrowDown",
        "PageDown",
        "ArrowUp",
        "PageUp",
        "Home",
        "End",
        "ArrowLeft",
        "ArrowRight",
      ];
      if (!keys.includes(event.key)) return;
      if (
        event.target instanceof HTMLElement &&
        ["INPUT", "TEXTAREA", "SELECT"].includes(event.target.tagName)
      ) {
        return;
      }

      const slideRail = rail();
      const onManifesto = manifestoVisible();

      if (slideRail && onManifesto) {
        const max = slideRail.scrollWidth - slideRail.clientWidth;
        const atStart = slideRail.scrollLeft <= 2;
        const atEnd = slideRail.scrollLeft >= max - 2;

        if (event.key === "ArrowRight" || (event.key === "ArrowDown" && !atEnd)) {
          event.preventDefault();
          slideRail.scrollBy({
            left: slideRail.clientWidth,
            behavior: "smooth",
          });
          return;
        }
        if (event.key === "ArrowLeft" || (event.key === "ArrowUp" && !atStart)) {
          event.preventDefault();
          slideRail.scrollBy({
            left: -slideRail.clientWidth,
            behavior: "smooth",
          });
          return;
        }
        if (event.key === "ArrowUp" && atStart) {
          event.preventDefault();
          root.scrollTo({ top: 0, behavior: "smooth" });
          return;
        }
      }

      if (event.key === "ArrowLeft" || event.key === "ArrowRight") return;

      event.preventDefault();
      const height = root.clientHeight;
      if (event.key === "Home") {
        root.scrollTo({ top: 0, behavior: "smooth" });
        return;
      }
      if (event.key === "End") {
        root.scrollTo({ top: root.scrollHeight, behavior: "smooth" });
        return;
      }
      const dir =
        event.key === "ArrowDown" || event.key === "PageDown" ? 1 : -1;
      root.scrollBy({ top: dir * height, behavior: "smooth" });
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <HomeSnapContext.Provider value={scrollerRef}>
      <div
        ref={scrollerRef}
        className="home-snap relative min-h-0 flex-1"
        role="region"
        aria-label="알파팀 2기 소개"
        style={{
          backgroundColor: scene.background,
          color: scene.foreground,
          ["--muted" as string]: scene.muted,
        }}
      >
        {children}
        <ol
          aria-hidden="true"
          className="pointer-events-none absolute right-4 top-1/2 z-20 flex -translate-y-1/2 flex-col items-center gap-2 sm:right-6"
        >
          {homeScenes.map((item) => (
            <li
              key={item.id}
              className={
                item.id === scene.id
                  ? "h-5 w-1 rounded-full bg-current"
                  : "size-1 rounded-full bg-current/35"
              }
            />
          ))}
        </ol>
      </div>
    </HomeSnapContext.Provider>
  );
}
