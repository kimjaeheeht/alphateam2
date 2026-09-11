import { ChevronDown } from "lucide-react";

import ParallaxPlanes from "@/components/case/ParallaxPlanes";
import { homeHero } from "@/lib/home-scenes";
import { heroPlanesHome } from "@/lib/projects";

export default function HomeHero() {
  return (
    <section
      className="relative flex min-h-[calc(100svh-4rem)] flex-col items-center justify-center overflow-hidden"
      style={{
        background: homeHero.fill,
        color: homeHero.foreground,
      }}
    >
      <ParallaxPlanes layers={heroPlanesHome} />
      <h1 className="relative z-10 pl-[0.38em] text-center text-[clamp(2rem,8vw,5.25rem)] font-bold tracking-[0.38em]">
        ALPHATEAM
      </h1>
      <ChevronDown
        className="relative z-10 mt-16 size-5 opacity-70"
        aria-hidden="true"
      />
      <span className="sr-only">아래로 스크롤</span>
    </section>
  );
}
