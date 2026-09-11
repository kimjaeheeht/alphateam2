import { cn } from "@/lib/cn";

type HeroScreenProps = {
  src: string;
  srcSm?: string;
  alt: string;
  device?: "phone" | "desktop";
  className?: string;
  priority?: boolean;
};

/** 히어로 우측 스크린샷. 하단은 섹션에 붙어 잘리도록 윗모서리만 둥급니다. */
export default function HeroScreen({
  src,
  srcSm,
  alt,
  device = "phone",
  className,
  priority,
}: HeroScreenProps) {
  const desktop = device === "desktop";

  return (
    <div
      className={cn(
        "overflow-hidden bg-white shadow-[0_24px_80px_rgba(17,17,17,0.16)]",
        desktop
          ? "aspect-[16/10] rounded-t-xl sm:rounded-t-2xl lg:aspect-[16/9]"
          : "rounded-t-2xl sm:rounded-t-4xl",
        className,
      )}
    >
      {/* PNG 스크린샷은 SVG와 같이 원본을 그대로 씁니다. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <picture>
        {srcSm ? (
          <source media="(max-width: 1023px)" srcSet={srcSm} />
        ) : null}
        <img
          src={src}
          alt={alt}
          width={desktop ? 1920 : 270}
          height={desktop ? 1080 : 520}
          decoding="async"
          fetchPriority={priority ? "high" : "auto"}
          className={cn(
            "block w-full",
            desktop && "h-full object-cover object-top",
          )}
        />
      </picture>
    </div>
  );
}
