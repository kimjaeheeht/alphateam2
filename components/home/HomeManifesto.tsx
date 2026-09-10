"use client";

import { useEffect, useRef, useState } from "react";

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
      const scroller = section.closest(".home-snap");

      if (event.deltaY > 0 && !atEnd) {
        event.preventDefault();
        go(1);
        return;
      }
      if (event.deltaY < 0 && !atStart) {
        event.preventDefault();
        go(-1);
        return;
      }
      if (
        event.deltaY < 0 &&
        atStart &&
        scroller instanceof HTMLElement
      ) {
        event.preventDefault();
        if (locked) return;
        locked = true;
        scroller.scrollTo({
          top: 0,
          behavior: media.matches ? "auto" : "smooth",
        });
        window.setTimeout(() => {
          locked = false;
        }, SLIDE_LOCK_MS);
        return;
      }
      if (event.deltaY > 0 && atEnd && scroller instanceof HTMLElement) {
        event.preventDefault();
        if (locked) return;
        locked = true;
        scroller.scrollBy({
          top: scroller.clientHeight,
          behavior: media.matches ? "auto" : "smooth",
        });
        window.setTimeout(() => {
          locked = false;
        }, SLIDE_LOCK_MS);
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
      className="home-snap-section relative bg-[#f7f8fa] text-[#111]"
    >
      <div ref={railRef} className="home-slide-rail">
        {homeContent.manifesto.map((item) => (
          <article key={item.id} className="home-slide flex flex-col justify-end px-6 pb-14 sm:px-12 sm:pb-16 lg:px-20">
            <p className="text-[11px] tracking-[0.22em] text-black/40">
              {homeContent.kicker}
            </p>
            <h2 className="mt-8 max-w-4xl whitespace-pre-line text-[clamp(2rem,6vw,4.75rem)] font-medium leading-[1.25] tracking-tight">
              {item.title}
            </h2>
            <p className="mt-6 max-w-xl text-[15px] leading-8 text-[#555] sm:text-base">
              {item.body}
            </p>
            <ol className="mt-14 flex items-center gap-3 text-sm tracking-[0.18em] sm:mt-16">
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
                        ? "text-[#111]"
                        : "text-black/30 transition-colors hover:text-black/70"
                    }
                  >
                    {entry.step}
                  </button>
                </li>
              ))}
            </ol>
          </article>
        ))}
      </div>
    </section>
  );
}
