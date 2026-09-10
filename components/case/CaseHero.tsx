import { ChevronDown } from "lucide-react";

import ParallaxPlanes from "@/components/case/ParallaxPlanes";
import { cn } from "@/lib/cn";

type CaseHeroProps = {
  wordmark: string;
  kicker: string;
  background: string;
  planes: [string, string, string];
  className?: string;
};

export default function CaseHero({
  wordmark,
  kicker,
  background,
  planes,
  className,
}: CaseHeroProps) {
  return (
    <section
      className={cn(
        "relative flex min-h-[calc(100svh-4rem)] flex-col items-center justify-center overflow-hidden text-foreground",
        className,
      )}
      style={{ background }}
    >
      <ParallaxPlanes layers={planes} />
      <p className="relative z-10 mb-5 tracking-[0.18em]">
        {kicker}
      </p>
      <h1 className="relative z-10 pl-[0.38em] text-center text-[clamp(2rem,8vw,5.25rem)] font-bold tracking-[0.38em]">
        {wordmark}
      </h1>
      <ChevronDown
        className="relative z-10 mt-16 size-5 opacity-70"
        aria-hidden="true"
      />
      <span className="sr-only">아래로 스크롤</span>
    </section>
  );
}
