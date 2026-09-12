import type { CSSProperties } from "react";

import { cn } from "@/lib/cn";

type HeroCirclesProps = {
  /** 원 색. 기본 흰색. */
  color?: string;
  /** 좌·중·우 투명도(0~1). 가운데가 가장 밝게 두는 것을 권장합니다. */
  opacities: [number, number, number];
  /** 첫 등장 시 벌어지며 나타나는 인트로. */
  animate?: boolean;
};

const circleClass = [
  "hero-circle hero-circle-a",
  "hero-circle hero-circle-b",
  "hero-circle hero-circle-c",
] as const;

/** 히어로·카드 배경용 원 3장. */
export default function HeroCircles({
  color = "#ffffff",
  opacities,
  animate = false,
}: HeroCirclesProps) {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      <div className={cn("hero-circles", animate && "hero-circles--intro")}>
        {opacities.map((opacity, index) => (
          <div
            key={circleClass[index]}
            className={cn(circleClass[index])}
            style={
              {
                background: color,
                "--circle-opacity": opacity,
              } as CSSProperties
            }
          />
        ))}
      </div>
    </div>
  );
}