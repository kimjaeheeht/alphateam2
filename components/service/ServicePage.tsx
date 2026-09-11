import { ArrowLeft, ArrowRight, MoveUpRight } from "lucide-react";
import Link from "next/link";

import Logo from "@/components/brand/Logo";
import Container from "@/components/layout/Container";
import PhoneFrame from "@/components/service/PhoneFrame";
import ServiceCards from "@/components/service/ServiceCards";
import ServiceHeading from "@/components/service/ServiceHeading";
import Button from "@/components/ui/Button";
import { cn } from "@/lib/cn";
import type { ServicePageProps } from "@/lib/service-page";

export default function ServicePage({
  project,
  content,
  prev,
  next,
}: ServicePageProps) {
  const serviceId = `${project.slug}-service`;
  const hasScreen = Boolean(content.hero.screen);
  const lightAccent = project.onAccent.toLowerCase() !== "#ffffff";

  return (
    <>
      <section
        className="relative overflow-hidden"
        style={{
          background: `linear-gradient(125deg, ${project.accent} 40%, ${project.secondary} 90%)`,
          color: project.onAccent,
        }}
      >
        <div
          className="pointer-events-none absolute -left-16 -top-10 size-[220px] rounded-full bg-white/10 sm:-left-24 sm:-top-16 sm:size-[360px] lg:-left-32 lg:top-[-20%] lg:size-[520px]"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute -right-12 top-1/2 size-[260px] -translate-y-1/2 rounded-full bg-white/20 sm:-right-14 sm:size-[420px] lg:-right-16 lg:size-[640px]"
          aria-hidden="true"
        />
        <Container className="relative min-h-[calc(100svh-4rem)] lg:min-h-[min(46rem,calc(100svh-4rem))]">
          <div
            className={cn(
              "relative z-10 flex min-h-[calc(100svh-4rem)] flex-col justify-center pt-16 lg:min-h-[min(46rem,calc(100svh-4rem))] lg:pt-24",
              hasScreen
                ? "pb-52 sm:pb-56 lg:w-1/2 lg:pb-24"
                : "pb-16 lg:w-full lg:pb-24",
            )}
          >
            <Logo project={project} onDark={!lightAccent} className="h-10" priority />
            <h1 className="mt-6 whitespace-pre-line text-[clamp(2rem,5vw,4rem)] font-bold">
              {content.hero.title}
            </h1>
            <p className="mt-6 max-w-xl whitespace-pre-line text-sm text-current/80 sm:text-lg">
              {content.hero.body}
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              <Button
                href={project.liveUrl}
                variant={lightAccent ? "solid" : "solid-white"}
                external
              >
                {content.hero.cta}
                <MoveUpRight className="size-4" aria-hidden="true" />
              </Button>
              <Button
                href={`#${serviceId}`}
                variant={lightAccent ? "outline" : "outline-white"}
              >
                {content.hero.ctaSecondary}
              </Button>
            </div>
          </div>
          {hasScreen ? (
            <div className="absolute inset-x-5 bottom-0 flex justify-center sm:inset-x-8 lg:inset-x-auto lg:right-8 lg:w-1/2 lg:justify-end">
              <PhoneFrame
                src={content.hero.screen ?? ""}
                alt={`${project.name} 서비스 화면`}
                className="w-[min(200px,58vw)] translate-y-8 sm:w-[240px] sm:translate-y-10 lg:w-[320px] lg:translate-y-12 xl:w-[360px]"
                priority
              />
            </div>
          ) : null}
        </Container>
      </section>

      <section className="bg-[#eef0f3] py-20 sm:py-28">
        <Container>
          <ServiceHeading
            name={content.background.name}
            title={content.background.title}
            body={content.background.body}
          />
          {content.background.items ? (
            <ServiceCards
              items={content.background.items}
              accentLast
              accent={project.accent}
              onAccent={project.onAccent}
            />
          ) : null}
        </Container>
      </section>

      <section id={serviceId} className="bg-white py-20 sm:py-28">
        <Container>
          <ServiceHeading
            name={content.service.name}
            title={content.service.title}
            body={content.service.body}
          />
          {content.service.items ? (
            <ServiceCards
              items={content.service.items}
              columns="sm:grid-cols-2 xl:grid-cols-4"
              variant="feature"
            />
          ) : null}
        </Container>
      </section>

      <section
        className="py-20 sm:py-28"
        style={{ background: project.accent }}
      >
        <Container>
          <ServiceHeading
            name={content.highlight.name}
            title={content.highlight.title}
            body={content.highlight.body}
            onDark={!lightAccent}
          />
          {content.highlight.items ? (
            <ServiceCards
              items={content.highlight.items}
              columns="sm:grid-cols-2 xl:grid-cols-4"
              variant="highlight"
              align="center"
            />
          ) : null}
        </Container>
      </section>

      <section className="bg-white py-20 sm:py-28">
        <Container>
          <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
            <ServiceHeading
              name={content.brand.name}
              title={content.brand.title}
              align="left"
            />
            <Logo project={project} />
          </div>
          {content.brand.body ? (
            <div className="mt-10 grid items-end gap-12 lg:grid-cols-2">
              <p className="max-w-xl whitespace-pre-line text-[#666]">
                {content.brand.body}
              </p>
              <dl>
                {content.brand.tokens.map((token, index) => (
                  <div
                    key={`${token.label}-${index}`}
                    className="flex items-baseline gap-8 border-t border-[#e8eef5] py-4 last:border-b"
                  >
                    <dt className="w-20 shrink-0 font-bold">{token.label}</dt>
                    <dd className="text-[#666]">{token.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          ) : null}
        </Container>
      </section>

      <section className="bg-[#eef0f3] py-20 text-center sm:py-28">
        <Container>
          <p className="text-[clamp(1.5rem,3.5vw,2.25rem)] font-bold">
            {content.closing.title}
          </p>
          {content.closing.body ? (
            <p className="mt-4 text-sm text-[#666] sm:text-base">
              {content.closing.body}
            </p>
          ) : null}
          <Button
            href={project.liveUrl}
            variant={lightAccent ? "solid" : "solid-accent"}
            external
            className="mt-8"
          >
            {content.closing.cta}
            <ArrowRight className="size-4" aria-hidden="true" />
          </Button>
        </Container>
      </section>

      <nav aria-label="다른 서비스" className="bg-white text-[#111]">
        <Container className="flex min-h-24 items-center justify-between gap-6 py-6">
          {prev ? (
            <Link href={prev.href} className="inline-flex items-center gap-2 text-lg hover:text-[var(--accent)]">
              <ArrowLeft className="size-4" aria-hidden="true" />
              {prev.name}
            </Link>
          ) : (
            <span />
          )}
          {next ? (
            <Link href={next.href} className="inline-flex items-center gap-2 text-lg hover:text-[var(--accent)]">
              {next.name}
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          ) : (
            <span />
          )}
        </Container>
      </nav>
    </>
  );
}
