"use client";

import { ChevronDown } from "lucide-react";

import ParallaxPlanes from "@/components/case/ParallaxPlanes";
import { useHomeSnap } from "@/components/home/HomeSnapContext";
import { homeScenes } from "@/lib/home-scenes";
import { heroPlanesHome } from "@/lib/projects";

const visual = homeScenes[0];

export default function HomeHero() {
  const scroller = useHomeSnap();

  return (
    <>
      <section
        className="home-hero-pin flex flex-col items-center justify-center overflow-hidden"
        style={{
          background: visual.fill,
          color: visual.foreground,
        }}
      >
        <ParallaxPlanes
          layers={heroPlanesHome}
          scroller={scroller}
          span="viewport"
        />
        <h1 className="relative z-10 pl-[0.38em] text-center text-[clamp(2rem,8vw,5.25rem)] font-bold tracking-[0.38em]">
          ALPHATEAM
        </h1>
        <ChevronDown
          className="relative z-10 mt-16 size-5 opacity-70"
          aria-hidden="true"
        />
        <span className="sr-only">아래로 스크롤</span>
      </section>
      <div
        data-home-scene="visual"
        className="home-snap-section"
        aria-hidden="true"
      />
    </>
  );
}
