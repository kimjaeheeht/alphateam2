import Link from "next/link";

import BrandImage from "@/components/brand/BrandImage";
import Container from "@/components/layout/Container";
import { homeContent } from "@/lib/content";
import { projects } from "@/lib/projects";

export default function ProjectCards() {
  return (
    <section className="bg-surface py-20 sm:py-28">
      <Container>
        <h2 className="text-center text-[clamp(1.75rem,4vw,2.75rem)] font-bold">
          {homeContent.projectsTitle}
        </h2>

        <ul className="mt-10 grid gap-5 sm:mt-14 sm:gap-6 md:grid-cols-3">
          {projects.map((project) => (
            <li key={project.slug}>
              <Link
                href={project.href}
                aria-label={project.name}
                className="group flex h-full flex-col items-center rounded-3xl bg-white px-6 py-10 text-center shadow-none transition-[transform,box-shadow] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(17,17,17,0.08)] sm:rounded-4xl sm:px-8 sm:py-12"
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
                <p className="mt-6 text-[15px] leading-relaxed text-muted">
                  {project.tagline}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
