"use client";

import { ChevronDown } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import HeroCircles from "@/components/case/HeroCircles";
import { cn } from "@/lib/cn";
import { homeContent } from "@/lib/content";
import { homeHero } from "@/lib/home-scenes";

const MANIFESTO = homeContent.manifesto;

function smoothstep(edge0: number, edge1: number, x: number) {
  const t = Math.min(1, Math.max(0, (x - edge0) / (edge1 - edge0)));
  return t * t * (3 - 2 * t);
}

/** 구간별 불투명도. 짧은 크로스페이드만 두고 한 문구가 지배적으로 보이게 합니다. */
function manifestoOpacity(progress: number, index: number, count: number) {
  const segment = 1 / count;
  const start = index * segment;
  const end = (index + 1) * segment;
  const fade = segment * 0.12;

  if (progress <= start - fade || progress >= end + fade) return 0;
  if (progress >= start + fade && progress <= end - fade) return 1;
  if (progress < start + fade) return smoothstep(start - fade, start + fade, progress);
  return 1 - smoothstep(end - fade, end + fade, progress);
}

/** 히어로 고정 + 스크롤에 따라 문구가 교차로 바뀝니다. */
export default function HomeHero() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const syncReduced = () => setReduced(media.matches);
    syncReduced();
    media.addEventListener("change", syncReduced);

    let frame = 0;
    const update = () => {
      const track = trackRef.current;
      if (!track) return;
      const total = track.offsetHeight - window.innerHeight;
      if (total <= 0) {
        setProgress(0);
        return;
      }
      const scrolled = -track.getBoundingClientRect().top;
      setProgress(Math.min(1, Math.max(0, scrolled / total)));
    };

    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      media.removeEventListener("change", syncReduced);
    };
  }, []);

  const heroOpacity = reduced ? 1 : 1 - smoothstep(0.05, 0.18, progress);
  const manifestoGate = reduced ? 0 : smoothstep(0.14, 0.26, progress);
  const manifestoProgress = reduced
    ? 0
    : Math.min(1, Math.max(0, (progress - 0.18) / 0.82));
  const activeIndex = Math.min(
    MANIFESTO.length - 1,
    Math.floor(manifestoProgress * MANIFESTO.length + 1e-6),
  );

  if (reduced) {
    return (
      <>
        <section
          className="relative flex min-h-[calc(100svh-4rem)] flex-col items-center justify-center overflow-hidden"
          style={{ background: homeHero.fill, color: homeHero.foreground }}
        >
          <HeroCircles
            color={homeHero.circles.color}
            opacities={homeHero.circles.opacities}
          />
          <div className="relative z-10 px-5 text-center">
            <p className="text-base font-medium sm:text-xl">
              {homeHero.brand}
            </p>
            <h1 className="mt-4 whitespace-pre-line text-[clamp(2.35rem,9vw,6rem)] font-bold leading-[1.2] sm:mt-8">
              {homeHero.headline}
            </h1>
          </div>
        </section>
        <section className="bg-surface py-20 sm:py-28" aria-label="매니페스토">
          <div className="mx-auto grid max-w-7xl gap-10 px-5 sm:px-8 md:grid-cols-3">
            {MANIFESTO.map((item) => (
              <div key={item.id} className="text-center md:text-left">
                <p className="mb-3 text-sm font-medium text-muted sm:mb-6">
                  {item.step}
                </p>
                <p className="whitespace-pre-line text-3xl font-bold leading-[1.2] sm:text-4xl">
                  {item.title}
                </p>
                <p className="mt-4 whitespace-pre-line text-base text-muted sm:mt-8 sm:text-xl">
                  {item.body}
                </p>
              </div>
            ))}
          </div>
        </section>
      </>
    );
  }

  return (
    <div
      ref={trackRef}
      className="relative h-[360vh]"
      style={{ color: homeHero.foreground }}
    >
      <section className="sticky top-16 flex h-[calc(100svh-4rem)] flex-col items-center justify-center overflow-hidden">
        {/* 기본 배경 */}
        <div
          className="absolute inset-0"
          style={{ background: homeHero.fill }}
          aria-hidden="true"
        />
        {/* 매니페스토 구간별 배경 — 문구와 같은 타이밍으로 교차 */}
        {homeHero.manifestoFills.map((fill, index) => {
          const local = manifestoOpacity(
            manifestoProgress,
            index,
            MANIFESTO.length,
          );
          return (
            <div
              key={`bg-${MANIFESTO[index].id}`}
              className="absolute inset-0"
              style={{
                background: fill,
                opacity: local * manifestoGate,
              }}
              aria-hidden="true"
            />
          );
        })}

        <HeroCircles
          animate
          color={homeHero.circles.color}
          opacities={homeHero.circles.opacities}
        />

        {/* 히어로 선언 */}
        <div
          className="pointer-events-none absolute inset-0 z-10 flex flex-col items-center justify-center px-5 text-center will-change-transform"
          style={{
            opacity: heroOpacity,
            transform: reduced
              ? undefined
              : `translateY(${(1 - heroOpacity) * -40}px)`,
          }}
          aria-hidden={heroOpacity < 0.12}
        >
          <div className="hero-lockup--intro">
            <p className="text-base font-medium sm:text-xl">
              {homeHero.brand}
            </p>
            <h1 className="mt-4 whitespace-pre-line text-[clamp(2.35rem,9vw,6rem)] font-bold leading-[1.2] sm:mt-8">
              {homeHero.headline}
            </h1>
            <ChevronDown
              className="mx-auto mt-16 size-5 opacity-70"
              aria-hidden="true"
            />
            <span className="sr-only">아래로 스크롤</span>
          </div>
        </div>

        {/* 매니페스토 문구 교차 전환 */}
        <div className="absolute inset-0 z-10 flex items-center justify-center px-5">
          {MANIFESTO.map((item, index) => {
            const local = manifestoOpacity(
              manifestoProgress,
              index,
              MANIFESTO.length,
            );
            const opacity = local * manifestoGate;
            const visible = opacity > 0.02;

            return (
              <div
                key={item.id}
                className="absolute flex w-full max-w-4xl flex-col items-center text-center will-change-transform"
                style={{
                  opacity,
                  transform: `translateY(${(1 - local) * 48}px)`,
                  pointerEvents: visible ? "auto" : "none",
                }}
                aria-hidden={!visible || opacity < 0.5}
              >
                <p className="mb-3 text-sm font-medium text-current/45 sm:mb-8 sm:text-base">
                  {item.step}
                </p>
                <p className="whitespace-pre-line text-[clamp(2.35rem,7vw,4.75rem)] font-bold leading-[1.2]">
                  {item.title}
                </p>
                <p className="mt-4 max-w-2xl whitespace-pre-line text-base text-current/70 sm:mt-12 sm:text-xl">
                  {item.body}
                </p>
              </div>
            );
          })}
        </div>

        <div
          className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 gap-2 transition-opacity duration-300"
          style={{ opacity: manifestoGate }}
          aria-hidden="true"
        >
          {MANIFESTO.map((item, index) => (
            <span
              key={item.id}
              className={cn(
                "h-1.5 rounded-full transition-[width,background-color] duration-300",
                index === activeIndex && manifestoGate > 0.4
                  ? "w-6 bg-foreground/70"
                  : "w-1.5 bg-foreground/25",
              )}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
