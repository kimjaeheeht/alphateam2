import Container from "@/components/layout/Container";
import { homeContent } from "@/lib/content";

/** 알파랩 2기 여정 숫자. 매니페스토와 서비스 사이에 둡니다. */
export default function HomeJourney() {
  const { journey } = homeContent;

  return (
    <section
      className="relative bg-white py-20 sm:py-28"
      aria-labelledby="home-journey"
    >
      <Container>
        <h2
          id="home-journey"
          className="text-center text-[clamp(1.75rem,4vw,2.75rem)] font-bold"
        >
          {journey.title}
        </h2>

        <ul className="mt-12 grid grid-cols-3 gap-6 sm:mt-16 sm:gap-8">
          {journey.items.map((item) => (
            <li key={item.label} className="text-center">
              <p className="text-[clamp(2.5rem,6vw,3.75rem)] font-bold leading-none">
                {item.value}
                <span className="ml-1 text-[0.4em] font-medium text-muted">
                  {item.unit}
                </span>
              </p>
              <p className="mt-3 text-sm text-muted">{item.label}</p>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
