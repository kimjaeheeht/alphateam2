"use client";

import { useEffect, useRef, useState } from "react";

import Container from "@/components/layout/Container";
import { homeContent } from "@/lib/content";

const SLIDE_LOCK_MS = 700;

export default function HomeManifesto() {
  const sectionRef = useRef<HTMLElement>(null);
  const railRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const rail = railRef.current;
    if (!rail) return;

    const onScroll = () => {
      const width = rail.clientWidth || 1;
      setActive(Math.round(rail.scrollLeft / width));
    };

    rail.addEventListener("scroll", onScroll, { passive: true });
    return () => rail.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    const rail = railRef.current;
    if (!section || !rail) return;

    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    let locked = false;

    const go = (dir: 1 | -1) => {
      if (locked) return;
      locked = true;
      rail.scrollBy({
        left: dir * rail.clientWidth,
        behavior: media.matches ? "auto" : "smooth",
      });
      window.setTimeout(() => {
        locked = false;
      }, SLIDE_LOCK_MS);
    };

    const onWheel = (event: WheelEvent) => {
      if (media.matches) return;
      if (Math.abs(event.deltaX) > Math.abs(event.deltaY)) return;

      const width = rail.clientWidth || 1;
      const index = Math.round(rail.scrollLeft / width);
      const last = Math.max(0, Math.round(rail.scrollWidth / width) - 1);
      const atStart = index <= 0;
      const atEnd = index >= last;

      if (event.deltaY > 0 && !atEnd) {
        event.preventDefault();
        go(1);
        return;
      }
      if (event.deltaY < 0 && !atStart) {
        event.preventDefault();
        go(-1);
      }
    };

    section.addEventListener("wheel", onWheel, { passive: false });
    return () => section.removeEventListener("wheel", onWheel);
  }, []);

  const goTo = (index: number) => {
    const rail = railRef.current;
    if (!rail) return;
    rail.scrollTo({
      left: index * rail.clientWidth,
      behavior: "smooth",
    });
  };

  return (
    <section
      ref={sectionRef}
      data-home-scene="manifesto"
      className="home-snap-section relative flex flex-col bg-[#f7f8fa] text-foreground"
    >
      <div ref={railRef} className="home-slide-rail min-h-0 flex-1">
        {homeContent.manifesto.map((item) => (
          <article key={item.id} className="home-slide flex flex-col justify-center">
            <Container className="w-full">
              <h2 className="whitespace-pre-line text-[clamp(1.75rem,6.5vw,5.75rem)] font-bold">
                {item.title}
              </h2>
              <p className="mt-5 max-w-3xl text-base text-muted sm:mt-7 sm:text-xl lg:text-2xl">
                {item.body}
              </p>
              <ol className="mt-10 flex items-center gap-3 text-sm sm:mt-14 sm:text-base">
                {homeContent.manifesto.map((entry, index) => (
                  <li key={entry.id} className="flex items-center gap-3">
                    {index > 0 ? (
                      <span className="text-black/20" aria-hidden="true">
                        —
                      </span>
                    ) : null}
                    <button
                      type="button"
                      onClick={() => goTo(index)}
                      className={
                        index === active
                          ? "text-foreground"
                          : "text-black/30 transition-colors hover:text-black/70"
                      }
                    >
                      {entry.step}
                    </button>
                  </li>
                ))}
              </ol>
            </Container>
          </article>
        ))}
      </div>
    </section>
  );
}
