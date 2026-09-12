import Container from "@/components/layout/Container";
import { ServiceIcon } from "@/components/service/service-icons";
import { homeContent } from "@/lib/content";

/** 매니페스토 카드 3장. 서비스 카드처럼 아이콘·스텝을 배치합니다. */
export default function HomeManifesto() {
  return (
    <section className="bg-surface py-20 sm:py-28" aria-labelledby="home-manifesto">
      <Container>
        <h2 id="home-manifesto" className="sr-only">
          매니페스토
        </h2>
        <ul className="grid gap-6 md:grid-cols-3">
          {homeContent.manifesto.map((item) => (
            <li
              key={item.id}
              className="flex flex-col gap-6 rounded-3xl bg-white px-6 py-7 sm:rounded-4xl sm:px-8 sm:py-10"
            >
              <div className="flex items-start justify-between gap-4">
                <span className="inline-flex size-11 shrink-0 items-center justify-center rounded-2xl bg-surface text-foreground">
                  <ServiceIcon name={item.icon} className="size-5" />
                </span>
                <span className="text-sm text-muted">{item.step}</span>
              </div>
              <div className="flex flex-col gap-3">
                <h3 className="whitespace-pre-line text-xl font-bold sm:text-2xl">
                  {item.title}
                </h3>
                <p className="whitespace-pre-line text-sm text-muted sm:text-base">
                  {item.body}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
