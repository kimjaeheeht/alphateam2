import Container from "@/components/layout/Container";
import { homeContent } from "@/lib/content";

/** 매니페스토 카드 3장. 트립디토 기획 배경 카드와 같은 박스 그리드입니다. */
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
              <p className="text-sm text-muted">{item.step}</p>
              <div className="flex flex-col gap-2">
                <h3 className="whitespace-pre-line text-xl font-bold sm:text-2xl">
                  {item.title}
                </h3>
                <p className="text-sm text-muted sm:text-[15px]">{item.body}</p>
              </div>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
