"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import { HomeSnapContext } from "@/components/home/HomeSnapContext";
import { homeScenes } from "@/lib/home-scenes";
import { animateScrollTop } from "@/lib/home-snap-scroll";

type HomeScene = (typeof homeScenes)[number];

const initialScene: HomeScene = homeScenes[0];

const sceneLabels: Record<HomeScene["id"], string> = {
  visual: "히어로",
  manifesto: "매니페스토",
  projects: "프로젝트",
};

export default function HomeScrollCanvas({
  children,
}: {
  children: React.ReactNode;
}) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const snapLock = useRef(false);
  const [scene, setScene] = useState<HomeScene>(initialScene);

  const snapToTop = useCallback((top: number) => {
    const root = scrollerRef.current;
    if (!root || snapLock.current) return;
    snapLock.current = true;
    void animateScrollTop(root, top).finally(() => {
      window.setTimeout(() => {
        snapLock.current = false;
      }, 80);
    });
  }, []);

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

    const rail = () => root.querySelector<HTMLElement>(".home-slide-rail");

    const manifestoVisible = () => {
      const node = root.querySelector("[data-home-scene='manifesto']");
      if (!(node instanceof HTMLElement)) return false;
      const rootBox = root.getBoundingClientRect();
      const box = node.getBoundingClientRect();
      const overlap =
        Math.min(rootBox.bottom, box.bottom) - Math.max(rootBox.top, box.top);
      return overlap > root.clientHeight * 0.55;
    };

    const manifestoConsumesVertical = (deltaY: number) => {
      const slideRail = rail();
      if (!slideRail || !manifestoVisible()) return false;
      const max = slideRail.scrollWidth - slideRail.clientWidth;
      const atStart = slideRail.scrollLeft <= 2;
      const atEnd = slideRail.scrollLeft >= max - 2;
      return (deltaY > 0 && !atEnd) || (deltaY < 0 && !atStart);
    };

    const snapBy = (dir: 1 | -1) => {
      const height = root.clientHeight;
      const max = Math.max(0, Math.round(root.scrollHeight / height) - 1);
      const index = Math.round(root.scrollTop / height);
      const next = Math.min(max, Math.max(0, index + dir));
      snapToTop(next * height);
    };

    const onWheel = (event: WheelEvent) => {
      if (Math.abs(event.deltaX) > Math.abs(event.deltaY)) return;
      if (event.deltaY === 0) return;
      if (manifestoConsumesVertical(event.deltaY)) return;
      event.preventDefault();
      snapBy(event.deltaY > 0 ? 1 : -1);
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
      }

      if (event.key === "ArrowLeft" || event.key === "ArrowRight") return;

      event.preventDefault();
      const height = root.clientHeight;
      if (event.key === "Home") {
        snapToTop(0);
        return;
      }
      if (event.key === "End") {
        snapToTop(root.scrollHeight - height);
        return;
      }
      const dir =
        event.key === "ArrowDown" || event.key === "PageDown" ? 1 : -1;
      snapBy(dir);
    };

    root.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("keydown", onKey);
    return () => {
      root.removeEventListener("wheel", onWheel);
      window.removeEventListener("keydown", onKey);
    };
  }, [snapToTop]);

  return (
    <HomeSnapContext.Provider value={scrollerRef}>
      <div
        className="relative flex min-h-0 flex-1 flex-col"
        style={{ color: scene.foreground }}
      >
        <div
          ref={scrollerRef}
          className="home-snap min-h-0 flex-1"
          role="region"
          aria-label="알파팀 2기 소개"
          style={{
            backgroundColor: scene.background,
            color: scene.foreground,
            ["--muted" as string]: scene.muted,
          }}
        >
          {children}
        </div>
        <ol className="pointer-events-none absolute right-4 top-1/2 z-20 flex -translate-y-1/2 flex-col items-center gap-2 sm:right-6">
          {homeScenes.map((item) => (
            <li key={item.id}>
              <button
                type="button"
                onClick={() => {
                  const root = scrollerRef.current;
                  const node = root?.querySelector(
                    `[data-home-scene='${item.id}']`,
                  );
                  if (!root || !(node instanceof HTMLElement)) return;
                  const top =
                    node.getBoundingClientRect().top -
                    root.getBoundingClientRect().top +
                    root.scrollTop;
                  snapToTop(top);
                }}
                className={
                  item.id === scene.id
                    ? "block h-5 w-1 rounded-full bg-current pointer-events-auto"
                    : "block size-1 rounded-full bg-current/35 pointer-events-auto"
                }
                aria-label={`${sceneLabels[item.id]} 섹션으로 이동`}
                aria-current={item.id === scene.id ? "true" : undefined}
              />
            </li>
          ))}
        </ol>
      </div>
    </HomeSnapContext.Provider>
  );
}
