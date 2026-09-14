import { ArrowLeft, ArrowRight, MoveUpRight } from "lucide-react";
import Link from "next/link";

import Logo from "@/components/brand/Logo";
import Container from "@/components/layout/Container";
import HeroScreen from "@/components/service/HeroScreen";
import ServiceCards from "@/components/service/ServiceCards";
import ServiceHeading from "@/components/service/ServiceHeading";
import Button from "@/components/ui/Button";
import { cn } from "@/lib/cn";
import { serviceCtas } from "@/lib/content";
import type { ServicePageProps } from "@/lib/service-page";

/** 서비스 쇼케이스 공통 레이아웃. 브랜드 색과 카피만 바꿔 세 페이지가 같이 씁니다. */
export default function ServicePage({
  project,
  content,
  prev,
  next,
}: ServicePageProps) {
  const serviceId = `${project.slug}-service`;
  const hero = content.hero;
  const screens = hero?.screens ?? [];
  const hasScreen = screens.length > 0;
  const desktopScreen = hero?.device === "desktop";
  // onAccent가 흰색이 아니면 노란 껄무새처럼 밝은 포인트 컬러로 보고 글자·버튼을 검게 둡니다.
  const lightAccent = project.onAccent.toLowerCase() !== "#ffffff";
  // 연한 브랜드 배경(트립디토·토리콩)에서는 글자·로고·버튼을 다크로 둡니다.
  const lightHero = Boolean(project.heroFill);
  const heroFill = project.heroFill ?? project.accent;
  const heroColor = lightHero ? "#111111" : project.onAccent;
  const heroCircles =
    project.slug === "ggparrot"
      ? (["bg-white/25", "bg-white/30"] as const)
      : project.slug === "tripdito"
        ? (["bg-accent/6", "bg-accent/9"] as const)
        : lightHero
          ? (["bg-accent/5", "bg-accent/[0.08]"] as const)
          : (["bg-white/5", "bg-white/10"] as const);
  const hasHeroCta = Boolean(hero?.cta || hero?.ctaSecondary);
  const closing = content.closing;
  /** 히어로 제목 미입력 시 홈 카드와 같은 설명 사용 */
  const heroTitle = hero?.title ?? project.description;

  return (
    <>
      {/* 섹션 - 히어로 */}
      {hero ? (
        <section
          className="relative overflow-hidden"
          style={{
            background: heroFill,
            color: heroColor,
          }}
        >
          {/* 배경 도형 */}
          <div
            className={cn(
              "pointer-events-none absolute -left-16 -top-10 size-[220px] rounded-full sm:-left-24 sm:-top-16 sm:size-[360px] lg:-left-32 lg:top-[-20%] lg:size-[520px]",
              heroCircles[0],
            )}
            aria-hidden="true"
          />
          <div
            className={cn(
              "pointer-events-none absolute -right-12 top-1/2 size-[260px] -translate-y-1/2 rounded-full sm:-right-14 sm:size-[420px] lg:-right-16 lg:size-[640px]",
              heroCircles[1],
            )}
            aria-hidden="true"
          />

          <Container
            className={cn(
              "relative flex flex-col items-center gap-10 py-20 sm:py-28 lg:grid lg:items-center lg:gap-12 xl:min-h-[800px]",
              !hasScreen && "lg:grid-cols-1",
              hasScreen && desktopScreen && "lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]",
              hasScreen && !desktopScreen && "lg:grid-cols-2",
            )}
          >
            {/* 텍스트 영역 */}
            <div className="relative z-10 flex w-full flex-col justify-center">
              <Logo project={project} onDark={!lightAccent && !lightHero} className="h-10 sm:h-12" priority />
              {heroTitle ? (
                <h1 className="mt-6 whitespace-pre-line text-[clamp(2rem,5vw,3.8rem)] font-bold">
                  {heroTitle}
                </h1>
              ) : null}
              {hasHeroCta ? (
                <div className="mt-6 sm:mt-12 flex flex-wrap gap-3">
                  {hero.cta ? (
                    <Button
                      href={project.liveUrl}
                      variant={lightHero ? "solid-accent" : lightAccent ? "solid" : "solid-white"}
                      external
                    >
                      {hero.cta}
                      <MoveUpRight className="size-4" aria-hidden="true" />
                    </Button>
                  ) : null}
                  {hero.ctaSecondary ? (
                    <Button
                      href={`#${serviceId}`}
                      variant={lightHero ? "outline-accent" : lightAccent ? "outline" : "outline-white"}
                    >
                      {hero.ctaSecondary}
                    </Button>
                  ) : null}
                </div>
              ) : null}
            </div>

            {/* 화면 이미지 영역 — 폰·데스크탑 모두 세로 중앙 */}
            {hasScreen ? (
              <div
                className={cn(
                  "flex w-full items-center",
                  desktopScreen ? "justify-stretch" : "justify-center",
                )}
              >
                <HeroScreen
                  screens={screens}
                  alt={`${project.name} 서비스 화면`}
                  device={desktopScreen ? "desktop" : "phone"}
                  className={
                    desktopScreen
                      ? "w-full"
                      : "w-[min(200px,58vw)] sm:w-[240px] lg:w-[280px] xl:w-[300px]"
                  }
                  priority
                />
              </div>
            ) : null}
          </Container>
        </section>
      ) : null}

      {/* 섹션 - 기획 배경 */}
      {content.background ? (
        <section className="bg-white py-20 sm:py-28">
          <Container>
            <ServiceHeading
              name={content.background.name}
              title={content.background.title}
              body={content.background.body}
            />
            {content.background.items?.length ? (
              <ServiceCards
                items={content.background.items}
                accentLast
                accent={project.accent}
                onAccent={project.onAccent}
              />
            ) : null}
          </Container>
        </section>
      ) : null}

      {/* 섹션 - 서비스 소개 */}
      {content.service ? (
        <section id={serviceId} className="bg-surface py-20 sm:py-28">
          <Container>
            <ServiceHeading
              name={content.service.name}
              title={content.service.title}
              body={content.service.body}
            />
            {content.service.items?.length ? (
              <ServiceCards
                items={content.service.items}
                columns="sm:grid-cols-2 xl:grid-cols-4"
                variant="feature"
              />
            ) : null}
          </Container>
        </section>
      ) : null}

      {/* 섹션 - 핵심 기능 */}
      {content.highlight ? (
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
            {content.highlight.items?.length ? (
              <ServiceCards
                items={content.highlight.items}
                columns="sm:grid-cols-2 xl:grid-cols-4"
                variant="highlight"
              />
            ) : null}
          </Container>
        </section>
      ) : null}

      {/* 섹션 - 브랜드 소개 */}
      {content.brand ? (
        <section className="bg-white py-20 sm:py-28">
          <Container>
            <ServiceHeading
              name={content.brand.name}
              title={content.brand.title}
              align="left"
              aside={<Logo project={project} className="h-12 shrink-0 sm:h-16" />}
            />
            {content.brand.body || content.brand.tokens?.length ? (
              <div className="mt-10 grid items-center gap-12 lg:grid-cols-2">
                {content.brand.body ? (
                  <p className="max-w-xl whitespace-pre-line text-muted">
                    {content.brand.body}
                  </p>
                ) : null}
                {content.brand.tokens?.length ? (
                  <dl>
                    {content.brand.tokens.map((token, index) => (
                      <div
                        key={`${token.label}-${index}`}
                        className="flex items-baseline gap-8 border-t border-foreground/15 py-4 last:border-b"
                      >
                        <dt className="w-18 sm:w-28 shrink-0 font-bold">{token.label}</dt>
                        <dd className="text-muted">{token.value}</dd>
                      </div>
                    ))}
                  </dl>
                ) : null}
              </div>
            ) : null}
          </Container>
        </section>
      ) : null}

      {/* 섹션 - 바로가기 */}
      {closing?.title || closing?.body || closing?.cta ? (
        <section className="bg-surface py-20 text-center sm:py-28">
          <Container>
            {closing.title ? (
              <p className="whitespace-pre-line text-[clamp(1.5rem,3.5vw,2.25rem)] font-bold">
                {closing.title}
              </p>
            ) : null}
            {closing.body ? (
              <p className="mt-4 whitespace-pre-line text-sm text-muted sm:text-base">
                {closing.body}
              </p>
            ) : null}
            <Button
              href={project.liveUrl}
              variant={lightAccent ? "solid" : "solid-accent"}
              external
              className="mt-8"
            >
              {closing.cta ?? serviceCtas.primary}
              <MoveUpRight className="size-4" aria-hidden="true" />
            </Button>
          </Container>
        </section>
      ) : null}

      {/* 섹션 - 다른 서비스 네비게이션 */}
      <nav aria-label="다른 서비스 네비게이션">
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
