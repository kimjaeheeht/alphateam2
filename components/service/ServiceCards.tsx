import { ServiceIcon } from "@/components/service/service-icons";
import { cn } from "@/lib/cn";
import type { ServiceItem } from "@/lib/service-page";

type ServiceCardsProps = {
  items: ServiceItem[];
  columns?: string;
  variant?: "story" | "feature" | "highlight";
  align?: "left" | "center";
  accentLast?: boolean;
  accent?: string;
  onAccent?: string;
};

export default function ServiceCards({
  items,
  columns = "md:grid-cols-3",
  variant = "story",
  align = "left",
  accentLast = false,
  accent,
  onAccent = "#ffffff",
}: ServiceCardsProps) {
  const lightAccent = onAccent.toLowerCase() !== "#ffffff";

  return (
    <ul className={cn("mt-16 grid gap-6", columns)}>
      {items.map((item, index) => {
        const featured = accentLast && index === items.length - 1;
        return (
          <li
            key={`${item.title ?? item.body}-${index}`}
            className={cn(
              "rounded-[1.75rem] px-8 py-10",
              featured
                ? lightAccent
                  ? "text-[#111]"
                  : "text-white"
                : variant === "feature"
                  ? "bg-[#eef0f3]"
                  : variant === "highlight"
                    ? "bg-white shadow-[0_12px_40px_rgba(17,17,17,0.08)]"
                    : "bg-white",
              align === "center" && "text-center",
            )}
            style={featured ? { background: accent } : undefined}
          >
            <div
              className={cn(
                "flex items-start gap-4",
                item.step ? "justify-between" : "",
                align === "center" && "justify-center",
              )}
            >
              <span
                className={cn(
                  "inline-flex size-11 items-center justify-center rounded-2xl",
                  featured
                    ? lightAccent
                      ? "bg-black/10 text-[#111]"
                      : "bg-white/20 text-white"
                    : variant === "feature"
                      ? "bg-white text-[#111]"
                      : "bg-[#eef0f3] text-[#111]",
                )}
              >
                <ServiceIcon name={item.icon} className="size-5" />
              </span>
              {item.step ? (
                <span className="text-sm text-[#929292]">{item.step}</span>
              ) : null}
            </div>
            {item.title ? (
              <h3 className="mt-8 text-xl font-medium">{item.title}</h3>
            ) : null}
            <p
              className={cn(
                item.title ? "mt-3" : "mt-8",
                "text-[15px]",
                featured
                  ? lightAccent
                    ? "text-[#111]/70"
                    : "text-white/90"
                  : "text-[#666666]",
              )}
            >
              {item.body}
            </p>
          </li>
        );
      })}
    </ul>
  );
}
