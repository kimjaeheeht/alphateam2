import { ServiceIcon } from "@/components/service/service-icons";
import { cn } from "@/lib/cn";
import type { ServiceItem } from "@/lib/service-page";

type ServiceCardsProps = {
  items: ServiceItem[];
  columns?: string;
  /** story: 기획 배경, feature: 서비스 소개, highlight: 핵심 기능 */
  variant?: "story" | "feature" | "highlight";
  align?: "left" | "center";
  accentLast?: boolean;
  accent?: string;
  onAccent?: string;
};

/** 섹션 카드 목록. variant로 배경·아이콘 박스 스타일을 나눕니다. */
export default function ServiceCards({
  items,
  columns = "md:grid-cols-3",
  variant = "story",
  align = "left",
  accentLast = false,
  accent,
  onAccent = "#ffffff",
}: ServiceCardsProps) {
  // 포인트 컬러가 밝으면 강조 카드 글자를 검게 둡니다.
  const lightAccent = onAccent.toLowerCase() !== "#ffffff";

  return (
    <ul className={cn("mt-8 grid gap-6 sm:mt-12", columns)}>
      {items.map((item, index) => {
        const featured = accentLast && index === items.length - 1;

        return (
          <li
            key={`${item.title ?? item.body ?? "item"}-${index}`}
            className={cn(
              "flex flex-col gap-6 rounded-3xl px-6 py-7 sm:rounded-4xl sm:px-8 sm:py-10",
              featured
                ? lightAccent
                  ? "text-foreground"
                  : "text-white"
                : variant === "feature"
                  ? "bg-white"
                  : variant === "highlight"
                    ? "bg-white text-foreground shadow-[0_12px_40px_rgba(17,17,17,0.08)]"
                    : "bg-surface",
              align === "center" && "text-center",
            )}
            style={featured ? { background: accent } : undefined}
          >
            {item.icon || item.step ? (
              <div
                className={cn(
                  "flex items-start gap-4",
                  item.step && "justify-between",
                  align === "center" && "justify-center",
                )}
              >
                {item.icon ? (
                  <span
                    className={cn(
                      "inline-flex size-11 shrink-0 items-center justify-center rounded-2xl",
                      featured
                        ? lightAccent
                          ? "bg-white/60 text-foreground"
                          : "bg-white/20 text-white"
                        : variant === "story"
                          ? "bg-white text-foreground"
                          : "bg-surface text-foreground",
                    )}
                  >
                    <ServiceIcon name={item.icon} className="size-5" />
                  </span>
                ) : null}
                {item.step ? (
                  <span className="text-sm text-muted">{item.step}</span>
                ) : null}
              </div>
            ) : null}
            {item.title || item.body ? (
              <div className="flex flex-col gap-2">
                {item.title ? (
                  <h3 className="whitespace-pre-line text-lg font-medium">{item.title}</h3>
                ) : null}
                {item.body ? (
                  <p
                    className={cn(
                      "whitespace-pre-line text-sm",
                      featured
                        ? lightAccent
                          ? "text-foreground/70"
                          : "text-white/90"
                        : "text-muted",
                    )}
                  >
                    {item.body}
                  </p>
                ) : null}
              </div>
            ) : null}
          </li>
        );
      })}
    </ul>
  );
}
