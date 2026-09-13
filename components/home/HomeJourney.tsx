import Container from "@/components/layout/Container";
import ServiceHeading from "@/components/service/ServiceHeading";
import { cn } from "@/lib/cn";
import { homeContent } from "@/lib/content";

/** 알파랩 2기 여정 숫자. PHILOSOPHY와 서비스 사이에 둡니다. */
export default function HomeJourney() {
  const { journey } = homeContent;

  return (
    <section
      className="relative bg-white py-20 sm:py-28"
      aria-labelledby="home-journey"
    >
      <Container>
        <div className="mx-auto max-w-5xl">
          <ServiceHeading
            name={journey.name}
            title={journey.title}
            titleId="home-journey"
          />

          <div className="relative mt-8 sm:mt-12">
            <div
              aria-hidden
              className="pointer-events-none absolute top-20 right-[16.666%] left-[16.666%] hidden h-px -translate-y-1/2 bg-foreground/15 sm:block lg:top-[6.5rem]"
            />

            <ul className="relative flex flex-col gap-8 sm:grid sm:grid-cols-3 sm:gap-8">
              {journey.items.map((item, index) => {
                const isLast = index === journey.items.length - 1;

                return (
                  <li
                    key={item.label}
                    className="flex items-center gap-5 sm:flex-col sm:items-center sm:gap-0 sm:text-center"
                  >
                    <div className="relative shrink-0">
                      {!isLast ? (
                        <div
                          aria-hidden
                          className="absolute top-full left-1/2 h-8 w-px -translate-x-1/2 bg-transparent sm:hidden"
                        />
                      ) : null}
                      <div
                        className={cn(
                          "relative z-10 flex size-[5.5rem] sm:size-[10rem] lg:size-[13rem] items-center justify-center rounded-full bg-surface-fresh border sm:border-2",
                          isLast
                            ? "border-foreground"
                            : "border-transparent",
                        )}
                      >
                        <p className="text-2xl font-bold leading-none tracking-tight text-foreground sm:text-[clamp(2.5rem,6.5vw,4.25rem)]">
                          {item.value}
                        </p>
                      </div>
                    </div>
                    <div className="min-w-0 flex-1 text-left sm:mt-5 sm:text-center">
                      <p className="text-lg font-bold text-foreground sm:text-xl">
                        {item.label}
                      </p>
                      <p className="mt-1 text-sm text-muted sm:mt-2 sm:text-base">
                        {item.body}
                      </p>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </Container>
    </section>
  );
}
