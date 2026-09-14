import type { ServiceCharacter } from "@/lib/service-page";

type BrandCharactersProps = {
  name?: string;
  title?: string;
  body?: string;
  items: ServiceCharacter[];
};

/** 브랜드 소개 안의 캐릭터 카드 목록입니다. */
export default function BrandCharacters({
  name,
  title,
  body,
  items,
}: BrandCharactersProps) {
  if (items.length === 0) return null;

  return (
    <div className="mt-16 sm:mt-20">
      {name ? (
        <p className="text-sm font-medium text-current/60">{name}</p>
      ) : null}
      {title ? (
        <h3 className="mt-3 whitespace-pre-line text-xl font-bold sm:text-2xl">
          {title}
        </h3>
      ) : null}
      {body ? (
        <p className="mt-3 max-w-2xl whitespace-pre-line text-[15px] text-muted">
          {body}
        </p>
      ) : null}
      <ul className="mt-8 grid grid-cols-2 gap-4 sm:mt-10 sm:gap-6 lg:grid-cols-3">
        {items.map((item) => (
          <li
            key={item.src}
            className="flex flex-col items-center rounded-3xl bg-surface px-5 py-7 text-center sm:rounded-4xl sm:px-6 sm:py-8"
          >
            {/* SVG는 next/image 최적화를 타면 깨질 수 있어 원본을 그대로 씁니다. */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={item.src}
              alt=""
              width={100}
              height={100}
              decoding="async"
              className="size-20 object-contain sm:size-24"
            />
            <h4 className="mt-5 text-base font-medium sm:text-lg">{item.title}</h4>
            {item.body ? (
              <p className="mt-2 whitespace-pre-line text-sm text-muted">{item.body}</p>
            ) : null}
          </li>
        ))}
      </ul>
    </div>
  );
}
