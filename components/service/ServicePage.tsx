import { ArrowLeft, ArrowRight, MoveUpRight } from "lucide-react";
import Link from "next/link";

import Logo from "@/components/brand/Logo";
import Container from "@/components/layout/Container";
import HeroScreen from "@/components/service/HeroScreen";
import ServiceCards from "@/components/service/ServiceCards";
import ServiceHeading from "@/components/service/ServiceHeading";
import Button from "@/components/ui/Button";
import { cn } from "@/lib/cn";
import type { ServicePageProps } from "@/lib/service-page";

/** 서비스 쇼케이스 공통 레이아웃. 브랜드 색과 카피만 바꿔 세 페이지가 같이 씁니다. */
export default function ServicePage({
  project,
  content,
  prev,
  next,
}: ServicePageProps) {
  const serviceId = `${project.slug}-service`;
  const hasScreen = Boolean(content.hero.screen);
  const desktopScreen = content.hero.device === "desktop";
  // onAccent가 흰색이 아니면 노란 껄무새처럼 밝은 포인트 컬러로 보고 글자·버튼을 검게 둡니다.
  const lightAccent = project.onAccent.toLowerCase() !== "#ffffff";

  return (
    <>
      {/* 섹션 - 히어로 */}
      <section
        className="relative overflow-hidden"
        style={{
          background: `linear-gradient(125deg, ${project.accent} 40%, ${project.secondary} 90%)`,
          color: project.onAccent,
        }}
      >
        {/* 배경 도형 */}
        <div
          className="pointer-events-none absolute -left-16 -top-10 size-[220px] rounded-full bg-white/10 sm:-left-24 sm:-top-16 sm:size-[360px] lg:-left-32 lg:top-[-20%] lg:size-[520px]"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute -right-12 top-1/2 size-[260px] -translate-y-1/2 rounded-full bg-white/20 sm:-right-14 sm:size-[420px] lg:-right-16 lg:size-[640px]"
          aria-hidden="true"
        />

        <Container
          className={cn(
            "relative flex min-h-[calc(100svh-4rem)] flex-col gap-10 pt-16 lg:min-h-[min(46rem,calc(100svh-4rem))] lg:grid lg:gap-12 lg:pt-24",
            !hasScreen && "lg:grid-cols-1",
            hasScreen && desktopScreen && "lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]",
            hasScreen && !desktopScreen && "lg:grid-cols-2",
          )}
        >
          {/* 텍스트 영역 */}
          <div className="relative z-10 flex flex-col justify-center lg:pb-24">
            <Logo project={project} onDark={!lightAccent} className="h-12" priority />
            <h1 className="mt-6 whitespace-pre-line text-[clamp(2rem,5vw,4rem)] font-bold">
              {content.hero.title}
            </h1>
            <p className="mt-6 max-w-xl whitespace-pre-line text-current/80 font-medium sm:text-lg">
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

          {/* 화면 이미지 영역 */}
          {hasScreen ? (
            <div
              className={cn(
                "mt-auto flex",
                desktopScreen
                  ? "justify-stretch lg:mt-0 lg:items-end"
                  : "justify-center lg:mt-0 lg:items-end lg:justify-end",
              )}
            >
              <HeroScreen
                src={content.hero.screen ?? ""}
                srcSm={content.hero.screenSm}
                alt={`${project.name} 서비스 화면`}
                device={desktopScreen ? "desktop" : "phone"}
                className={
                  desktopScreen
                    ? "w-full translate-y-6 sm:translate-y-8 lg:translate-y-10"
                    : "w-[min(200px,58vw)] translate-y-8 sm:w-[240px] sm:translate-y-10 lg:w-[320px] lg:translate-y-12 xl:w-[360px]"
                }
                priority
              />
            </div>
          ) : null}
        </Container>
      </section>

      {/* 섹션 - 기획 배경 */}
      <section className="bg-surface py-20 sm:py-28">
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

      {/* 섹션 - 서비스 소개 */}
      <section id={serviceId} className="py-20 sm:py-28">
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

      {/* 섹션 - 핵심 기능 */}
      <section
        className="py-20 sm:py-28"
        style={{ background: project.accent, color: project.onAccent }}
      >
        <Container>
          <ServiceHeading
            name={content.highlight.name}
            title={content.highlight.title}
            body={content.highlight.body}
          />
          {content.highlight.items ? (
            <ServiceCards
              items={content.highlight.items}
              columns="sm:grid-cols-2 xl:grid-cols-4"
              variant="highlight"
            />
          ) : null}
        </Container>
      </section>

      {/* 섹션 - 브랜드 소개 */}
      <section className="bg-white py-20 sm:py-28">
        <Container>
          <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
            {/* 제목 */}
            <ServiceHeading
              name={content.brand.name}
              title={content.brand.title}
              align="left"
            />
            {/* 로고 */}
            <Logo project={project} />
          </div>
          {content.brand.body ? (
            <div className="mt-10 grid items-end gap-12 lg:grid-cols-2">
              {/* 본문 */}
              <p className="max-w-xl whitespace-pre-line text-muted">
                {content.brand.body}
              </p>
              {/* 키워드 */}
              <dl>
                {content.brand.tokens.map((token, index) => (
                  <div
                    key={`${token.label}-${index}`}
                    className="flex items-baseline gap-8 border-t border-foreground/10 py-4 last:border-b"
                  >
                    <dt className="w-20 shrink-0 font-bold">{token.label}</dt>
                    <dd className="text-muted">{token.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          ) : null}
        </Container>
      </section>

      {/* 섹션 - 바로가기 */}
      <section className="bg-surface py-20 text-center sm:py-28">
        <Container>
          <p className="text-[clamp(1.5rem,3.5vw,2.25rem)] font-bold">
            {content.closing.title}
          </p>
          {content.closing.body ? (
            <p className="mt-4 text-sm text-muted sm:text-base">
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
            <MoveUpRight className="size-4" aria-hidden="true" />
          </Button>
        </Container>
      </section>

      {/* 섹션 - 다른 서비스 */}
      <nav aria-label="다른 서비스">
        <Container className="flex min-h-24 items-center justify-between gap-6 py-6">
          {prev ? (
            <Link href={prev.href} className="inline-flex items-center gap-2 text-lg hover:text-accent">
              <ArrowLeft className="size-4" aria-hidden="true" />
              {prev.name}
            </Link>
          ) : (
            <span />
          )}
          {next ? (
            <Link href={next.href} className="inline-flex items-center gap-2 text-lg hover:text-accent">
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
