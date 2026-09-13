import Link from "next/link";
import { ChevronRight } from "lucide-react";

import BrandImage from "@/components/brand/BrandImage";
import Container from "@/components/layout/Container";
import ServiceHeading from "@/components/service/ServiceHeading";
import { getProjectPitch, homeContent } from "@/lib/content";
import { projects } from "@/lib/projects";

export default function ProjectCards() {
  return (
    <section className="bg-surface-fresh py-20 sm:py-28">
      <Container>
        <ServiceHeading
          name={homeContent.projectsName}
          title={homeContent.projectsTitle}
        />

        <ul className="mt-8 grid gap-6 sm:mt-12 md:grid-cols-3">
          {projects.map((project) => (
            <li key={project.slug}>
              <Link
                href={project.href}
                aria-label={`${project.name} 자세히 보기`}
                className="group flex h-full flex-col items-center gap-6 rounded-3xl bg-white px-6 py-7 text-center shadow-none transition-[transform,box-shadow] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(17,17,17,0.08)] sm:rounded-4xl sm:px-8 sm:py-10"
              >
                <div className="flex h-12 items-center justify-center">
                  <BrandImage
                    src={project.assets.logo}
                    alt={project.name}
                    width={200}
                    height={56}
                    className="max-h-10 w-auto max-w-[9.5rem] object-contain"
                  />
                </div>
                <p className="text-sm leading-relaxed text-muted sm:text-base">
                  {getProjectPitch(project)}
                </p>
                <span className="inline-flex items-center gap-0.5 text-sm font-medium text-foreground">
                  자세히 보기
                  <ChevronRight
                    className="size-4 transition-transform duration-300 group-hover:translate-x-0.5"
                    aria-hidden="true"
                  />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
