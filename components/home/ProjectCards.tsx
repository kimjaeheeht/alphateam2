import { ArrowRight } from "lucide-react";
import Link from "next/link";

import BrandImage from "@/components/brand/BrandImage";
import HeroPlanes from "@/components/case/HeroPlanes";
import Container from "@/components/layout/Container";
import { homeContent } from "@/lib/content";
import { heroPlanes, heroPlanesOnLight, projects } from "@/lib/projects";

export default function ProjectCards() {
  return (
    <section className="bg-background py-20 sm:py-28">
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm text-muted">{homeContent.projectsTitle}</p>
          <h2 className="mt-3 text-2xl font-medium sm:text-4xl">
            {homeContent.projectsBody}
          </h2>
        </div>
        <ul className="mt-8 grid gap-3 sm:mt-12 sm:gap-6 md:grid-cols-3">
          {projects.map((project) => (
            <li key={project.slug}>
              <Link
                href={project.href}
                className="group flex h-full items-center gap-4 bg-white md:flex-col md:items-stretch"
              >
                <div
                  className="relative flex h-20 w-28 shrink-0 items-center justify-center overflow-hidden md:h-auto md:w-full md:aspect-[16/10]"
                  style={{ background: project.accent }}
                >
                  <HeroPlanes
                    layers={
                      project.slug === "ggparrot" ? heroPlanesOnLight : heroPlanes
                    }
                  />
                  <BrandImage
                    src={
                      project.slug === "torikong"
                        ? project.assets.mark
                        : project.slug === "ggparrot"
                          ? project.assets.logo
                          : project.assets.logoOnDark
                    }
                    alt={project.name}
                    width={200}
                    height={56}
                    className="relative z-10 h-7 w-auto md:h-10"
                  />
                </div>
                <div className="flex min-w-0 flex-1 flex-col py-2 pr-3 md:px-6 md:py-6 md:pr-6">
                  <p className="text-[11px] text-neutral-500">
                    {project.category}
                  </p>
                  <h3 className="mt-1 text-base font-medium text-neutral-900 md:mt-3 md:text-lg">
                    {project.name}
                  </h3>
                  <p className="mt-1 hidden text-sm text-neutral-500 md:block">
                    {project.tagline}
                  </p>
                  <p className="mt-2 flex items-center gap-1 text-sm text-neutral-900 md:mt-6">
                    소개 보기
                    <ArrowRight
                      className="size-4 transition-transform group-hover:translate-x-0.5"
                      aria-hidden="true"
                    />
                  </p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
