"use client";

import { ChevronDown } from "lucide-react";
import { useEffect, useRef, useState, type ReactNode } from "react";

import HeroCircles from "@/components/case/HeroCircles";
import { cn } from "@/lib/cn";
import { homeContent } from "@/lib/content";
import { homeHero } from "@/lib/home-scenes";

const PHILOSOPHY = homeContent.philosophy;

function smoothstep(edge0: number, edge1: number, x: number) {
  const t = Math.min(1, Math.max(0, (x - edge0) / (edge1 - edge0)));
  return t * t * (3 - 2 * t);
}

/** 구간별 불투명도. fadeRatio가 클수록 전환·상승이 더 천천히 이어집니다. */
function philosophyOpacity(
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

/** 히어로 고정 + PHILOSOPHY 스크롤 문구 교차. children은 스티키 히어로를 덮고 올라옵니다. */
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

  /** reduced면 페이드·상승을 거의 끄고, 같은 마크업으로만 전환합니다. */
  const fadeRatio = reduced ? 0.02 : narrow ? 0.28 : 0.12;
  const risePx = reduced ? 0 : narrow ? 36 : 48;
  const heroOpacity = 1 - smoothstep(0.05, reduced ? 0.08 : 0.18, progress);
  const philosophyGate = smoothstep(
    narrow ? 0.12 : 0.14,
    reduced ? (narrow ? 0.2 : 0.18) : narrow ? 0.36 : 0.26,
    progress,
  );
  const philosophyProgress = Math.min(1, Math.max(0, (progress - 0.18) / 0.82));
  const activeIndex = Math.min(
    PHILOSOPHY.items.length - 1,
    Math.floor(philosophyProgress * PHILOSOPHY.items.length + 1e-6),
  );
  const circleShift = reduced
    ? 24
    : 24 * (1 - smoothstep(0.58, 0.92, progress));

  return (
    <div ref={trackRef} className="relative">
      <section
        className="sticky top-16 z-0 flex h-[calc(100svh-4rem)] flex-col items-center justify-center overflow-hidden"
        style={{ color: homeHero.foreground }}
        aria-label={PHILOSOPHY.name}
      >
        <div
          className="absolute inset-0"
          style={{
            background: homeHero.fill,
            opacity: 1 - philosophyGate,
          }}
          aria-hidden="true"
        />

        {/* PHILOSOPHY — 파스텔 단색 배경 */}
        {PHILOSOPHY.items.map((item, index) => {
          const scene = homeHero.philosophyScenes[index];
          const local = philosophyOpacity(
            philosophyProgress,
            index,
            PHILOSOPHY.items.length,
            fadeRatio,
          );

          return (
            <div
              key={`bg-${item.id}`}
              className="absolute inset-0"
              style={{
                background: scene.fill,
                opacity: local * philosophyGate,
              }}
              aria-hidden="true"
            />
          );
        })}

        <div
          className="absolute inset-0 origin-center will-change-transform"
          style={{
            opacity: 1 - philosophyGate,
            transform: `scale(${1 - philosophyGate * 0.42})`,
          }}
          aria-hidden="true"
        >
          <HeroCircles
            animate={!reduced}
            color={homeHero.circles.color}
            opacities={homeHero.circles.opacities}
            shift={circleShift}
          />
        </div>

        <div
          className="pointer-events-none absolute inset-0 z-10 flex flex-col items-center justify-center px-6 text-center will-change-transform sm:px-8"
          style={{
            opacity: heroOpacity,
            transform: reduced
              ? undefined
              : `translateY(${(1 - heroOpacity) * -40}px)`,
          }}
          aria-hidden={heroOpacity < 0.12}
        >
          <div className="hero-lockup--intro relative">
            <p className="absolute bottom-full left-1/2 mb-4 w-max -translate-x-1/2 text-base font-medium sm:mb-8 sm:text-xl">
              {homeHero.brand}
            </p>
            <h1 className="whitespace-pre-line text-[clamp(2.25rem,8vw,5.25rem)] font-bold leading-[1.2]">
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
            {PHILOSOPHY.items.map((item, index) => {
              const scene = homeHero.philosophyScenes[index];
              const local = philosophyOpacity(
                philosophyProgress,
                index,
                PHILOSOPHY.items.length,
                fadeRatio,
              );
              const opacity = local * philosophyGate;
              const visible = opacity > 0.02;

              return (
                <div
                  key={item.id}
                  className="absolute flex w-full max-w-6xl flex-col items-center text-center will-change-transform"
                  style={{
                    opacity,
                    transform: risePx
                      ? `translateY(${(1 - local) * risePx}px)`
                      : undefined,
                    pointerEvents: visible ? "auto" : "none",
                  }}
                  aria-hidden={!visible || opacity < 0.5}
                >
                  <div
                    className="pointer-events-none absolute top-3.5 left-1/2 w-[28vw] max-w-[12rem] -translate-x-1/2 -translate-y-1/2 aspect-square sm:top-4"
                    aria-hidden="true"
                  >
                    <div
                      className="absolute top-0 left-[-22%] size-full rounded-full"
                      style={{ background: scene.circles[0] }}
                    />
                    <div
                      className="absolute top-0 left-[22%] size-full rounded-full"
                      style={{ background: scene.circles[1] }}
                    />
                  </div>
                  <div className="relative z-10 flex flex-col items-center">
                    <div className="mb-8 flex items-center gap-2.5 sm:mb-10">
                      <span className="flex size-7 items-center justify-center rounded-full bg-foreground text-[10px] font-bold text-white sm:size-8 sm:text-[11px]">
                        {item.step}
                      </span>
                      <p className="text-sm font-medium text-foreground sm:text-lg">
                        {item.label}
                      </p>
                    </div>
                    <p className="text-[clamp(2.15rem,5.5vw,3.5rem)] font-bold leading-[1.3]">
                      {item.title}
                    </p>
                    <p className="mt-5 max-w-xl whitespace-pre-line text-foreground/60 sm:mt-8 sm:text-lg">
                      {item.body}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div
          className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 gap-2 transition-opacity duration-300"
          style={{ opacity: philosophyGate }}
          aria-hidden="true"
        >
          {PHILOSOPHY.items.map((item, index) => (
            <span
              key={item.id}
              className={cn(
                "h-1.5 rounded-full transition-[width,background-color] duration-300",
                index === activeIndex && philosophyGate > 0.4
                  ? "w-6 bg-foreground/70"
                  : "w-1.5 bg-foreground/25",
              )}
            />
          ))}
        </div>
      </section>

      {/* PHILOSOPHY 스크롤 거리 — 이 구간 동안 히어로가 고정됩니다 */}
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
