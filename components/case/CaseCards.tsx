import { cn } from "@/lib/cn";

type CaseCardsProps = {
  color: string;
  items: { title: string; body: string }[];
};

export default function CaseCards({ color, items }: CaseCardsProps) {
  return (
    <section className="px-5 py-16 sm:px-10 sm:py-24" style={{ background: color }}>
      <ul
        className={cn(
          "mx-auto grid max-w-6xl gap-5",
          items.length === 4 ? "md:grid-cols-2 xl:grid-cols-4" : "md:grid-cols-3",
        )}
      >
        {items.map((item) => (
          <li
            key={item.title}
            className="rounded-2xl bg-white px-7 py-10 text-center text-[#111]"
          >
            <h3 className="text-xl font-medium">{item.title}</h3>
            <p className="mt-4 text-sm leading-7 text-[#666]">{item.body}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
