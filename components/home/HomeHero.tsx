"use client";

import { ChevronDown } from "lucide-react";
import { useEffect, useRef, useState, type ReactNode } from "react";

import HeroCircles from "@/components/case/HeroCircles";
import { cn } from "@/lib/cn";
import { homeContent } from "@/lib/content";
import { homeHero } from "@/lib/home-scenes";

const MANIFESTO = homeContent.manifesto;

function smoothstep(edge0: number, edge1: number, x: number) {
  const t = Math.min(1, Math.max(0, (x - edge0) / (edge1 - edge0)));
  return t * t * (3 - 2 * t);
}

/** 구간별 불투명도. fadeRatio가 클수록 전환·상승이 더 천천히 이어집니다. */
function manifestoOpacity(
  progress: number,
  index: number,
  count: number,
  fadeRatio = 0.12,
) {
  const segment = 1 / count;
  const start = index * segment;
  const end = (index + 1) * segment;
  const fade = segment * fadeRatio;

  if (progress <= start - fade || progress >= end + fade) return 0;
  if (progress >= start + fade && progress <= end - fade) return 1;
  if (progress < start + fade) return smoothstep(start - fade, start + fade, progress);
  return 1 - smoothstep(end - fade, end + fade, progress);
}

type HomeHeroProps = {
  /** 히어로 위에 덮이며 올라올 다음 섹션 */
  children?: ReactNode;
};

/** 히어로 고정 + 스크롤 문구 교차. children은 스티키 히어로를 덮고 올라옵니다. */
export default function HomeHero({ children }: HomeHeroProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const spacerRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [reduced, setReduced] = useState(false);
  const [narrow, setNarrow] = useState(false);

  useEffect(() => {
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const viewport = window.matchMedia("(max-width: 639px)");
    const syncReduced = () => setReduced(motion.matches);
    const syncNarrow = () => setNarrow(viewport.matches);
    syncReduced();
    syncNarrow();
    motion.addEventListener("change", syncReduced);
    viewport.addEventListener("change", syncNarrow);

    let frame = 0;
    const update = () => {
      const track = trackRef.current;
      const spacer = spacerRef.current;
      if (!track || !spacer) return;
      const total = spacer.offsetHeight;
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
      motion.removeEventListener("change", syncReduced);
      viewport.removeEventListener("change", syncNarrow);
    };
  }, []);

  const fadeRatio = narrow ? 0.28 : 0.12;
  const risePx = narrow ? 36 : 48;
  const heroOpacity = reduced ? 1 : 1 - smoothstep(0.05, 0.18, progress);
  const manifestoGate = reduced
    ? 0
    : smoothstep(narrow ? 0.12 : 0.14, narrow ? 0.36 : 0.26, progress);
  const manifestoProgress = reduced
    ? 0
    : Math.min(1, Math.max(0, (progress - 0.18) / 0.82));
  const activeIndex = Math.min(
    MANIFESTO.length - 1,
    Math.floor(manifestoProgress * MANIFESTO.length + 1e-6),
  );
  /** 후반 스크롤에서 좌·우 원이 가운데로 모입니다. */
  const circleShift = 34 * (1 - smoothstep(0.58, 0.92, progress));

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
          <div className="relative z-10 px-6 text-center sm:px-8">
            <p className="mb-4 text-base font-medium sm:mb-8 sm:text-xl">
              {homeHero.brand}
            </p>
            <h1 className="whitespace-pre-line text-[clamp(2.35rem,9vw,6rem)] font-bold leading-[1.2]">
              {homeHero.headline}
            </h1>
          </div>
        </section>
        <section className="bg-surface py-20 sm:py-28" aria-label="매니페스토">
          <div className="mx-auto grid max-w-7xl gap-10 px-6 sm:px-8 md:grid-cols-3">
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
        {children}
      </>
    );
  }

  return (
    <div ref={trackRef} className="relative">
      <section
        className="sticky top-16 z-0 flex h-[calc(100svh-4rem)] flex-col items-center justify-center overflow-hidden"
        style={{ color: homeHero.foreground }}
      >
        <div
          className="absolute inset-0"
          style={{
            background: homeHero.fill,
            opacity: 1 - manifestoGate,
          }}
          aria-hidden="true"
        />
        {/* 매니페스토 전환 중 비침 방지용 단색 베이스 */}
        <div
          className="absolute inset-0 bg-white"
          style={{ opacity: manifestoGate }}
          aria-hidden="true"
        />
        {homeHero.manifestoFills.map((fill, index) => {
          const local = manifestoOpacity(
            manifestoProgress,
            index,
            MANIFESTO.length,
            fadeRatio,
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
          shift={circleShift}
        />

        <div
          className="pointer-events-none absolute inset-0 z-10 flex flex-col items-center justify-center px-6 text-center will-change-transform sm:px-8"
          style={{
            opacity: heroOpacity,
            transform: `translateY(${(1 - heroOpacity) * -40}px)`,
          }}
          aria-hidden={heroOpacity < 0.12}
        >
          <div className="hero-lockup--intro relative">
            <p className="absolute bottom-full left-1/2 mb-4 w-max -translate-x-1/2 text-base font-medium sm:mb-8 sm:text-xl">
              {homeHero.brand}
            </p>
            <h1 className="whitespace-pre-line text-[clamp(2.35rem,9vw,6rem)] font-bold leading-[1.2]">
              {homeHero.headline}
            </h1>
            <ChevronDown
              className="absolute top-full left-1/2 mt-16 size-5 -translate-x-1/2 opacity-70"
              aria-hidden="true"
            />
            <span className="sr-only">아래로 스크롤</span>
          </div>
        </div>

        <div className="absolute inset-0 z-10 px-6 sm:px-8">
          <div className="relative flex h-full w-full items-center justify-center">
            {MANIFESTO.map((item, index) => {
              const local = manifestoOpacity(
                manifestoProgress,
                index,
                MANIFESTO.length,
                fadeRatio,
              );
              const opacity = local * manifestoGate;
              const visible = opacity > 0.02;

              return (
                <div
                  key={item.id}
                  className="absolute flex w-full max-w-4xl flex-col items-center text-center will-change-transform"
                  style={{
                    opacity,
                    transform: `translateY(${(1 - local) * risePx}px)`,
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

      {/* 매니페스토 스크롤 거리 — 이 구간 동안 히어로가 고정됩니다 */}
      <div
        ref={spacerRef}
        className="pointer-events-none h-[440vh] sm:h-[360vh]"
        aria-hidden="true"
      />

      {/* 다음 섹션이 고정된 히어로 위를 덮으며 올라옵니다 */}
      <div className="relative z-10">{children}</div>
    </div>
  );
}
