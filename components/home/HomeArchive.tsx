import { MoveUpRight } from "lucide-react";

import Container from "@/components/layout/Container";
import ServiceHeading from "@/components/service/ServiceHeading";
import { homeContent } from "@/lib/content";

/** 노션 아카이브 링크. 서비스 소개 아래에 둡니다. */
export default function HomeArchive() {
  const { archive } = homeContent;

  return (
    <section
      className="bg-white py-20 sm:py-28"
      aria-labelledby="home-archive"
    >
      <Container>
        <ServiceHeading
          name={archive.name}
          title={archive.title}
          titleId="home-archive"
        />

        <ul className="mx-auto mt-8 grid max-w-4xl gap-6 sm:mt-10 md:grid-cols-2">
          {archive.items.map((item) => (
            <li key={item.title}>
              <a
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex h-full items-start justify-between gap-4 rounded-3xl bg-surface px-6 py-7 transition-[transform,box-shadow] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(17,17,17,0.08)] sm:rounded-4xl sm:px-8 sm:py-10"
              >
                <div className="min-w-0">
                  <p className="text-lg font-bold text-foreground sm:text-xl">
                    {item.title}
                  </p>
                  <p className="mt-2 text-sm text-muted sm:text-base">
                    {item.body}
                  </p>
                </div>
                <MoveUpRight
                  className="mt-1 size-5 shrink-0 text-foreground/40 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-foreground"
                  aria-hidden="true"
                />
              </a>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
