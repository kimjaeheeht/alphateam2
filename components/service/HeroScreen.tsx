"use client";

import { useEffect, useState } from "react";

import { cn } from "@/lib/cn";

type HeroScreenProps = {
  screens: string[];
  alt: string;
  device?: "phone" | "desktop";
  className?: string;
  priority?: boolean;
  /** 이미지 교체 간격(ms). 기본 4초. */
  intervalMs?: number;
};

/** 히어로 우측 스크린샷. 2장 이상이면 크로스페이드로 교체합니다. */
export default function HeroScreen({
  screens,
  alt,
  device = "phone",
  className,
  priority,
  intervalMs = 3000,
}: HeroScreenProps) {
  const desktop = device === "desktop";
  const [active, setActive] = useState(0);
  const canSwap = screens.length > 1;

  useEffect(() => {
    if (!canSwap) return;

    const reduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    const id = window.setInterval(() => {
      setActive((current) => (current + 1) % screens.length);
    }, intervalMs);

    return () => window.clearInterval(id);
  }, [canSwap, intervalMs, screens.length]);

  if (screens.length === 0) return null;

  return (
    <div
      className={cn(
        "relative overflow-hidden bg-white shadow-[0_24px_80px_rgba(17,17,17,0.16)]",
        desktop
          ? "aspect-[16/10] rounded-xl sm:rounded-2xl"
          : "rounded-2xl sm:rounded-3xl",
        className,
      )}
    >
      {/* 폰은 첫 장으로 높이를 잡고, 데스크탑은 aspect로 잡습니다. */}
      {!desktop ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={screens[0]}
          alt=""
          width={563}
          height={1071}
          aria-hidden="true"
          className="invisible block h-auto w-full"
        />
      ) : null}

      {screens.map((src, index) => {
        const isActive = index === active;

        return (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={src}
            src={src}
            alt={isActive ? alt : ""}
            width={desktop ? 1920 : 563}
            height={desktop ? 1200 : 1071}
            decoding="async"
            fetchPriority={priority && index === 0 ? "high" : "auto"}
            aria-hidden={!isActive}
            className={cn(
              "absolute inset-0 block h-full w-full object-cover object-top transition-opacity duration-700 ease-out motion-reduce:transition-none",
              isActive ? "opacity-100" : "opacity-0",
            )}
          />
        );
      })}
    </div>
  );
}
