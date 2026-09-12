import { cn } from "@/lib/cn";

type ServiceHeadingProps = {
  name?: string;
  title?: string;
  body?: string;
  align?: "center" | "left";
};

/** 섹션명 / 큰 제목 / 본문. 글자색은 부모 섹션의 color를 상속합니다. */
export default function ServiceHeading({
  name,
  title,
  body,
  align = "center",
}: ServiceHeadingProps) {
  if (!name && !title && !body) return null;

  return (
    <div className={cn(align === "center" && "mx-auto max-w-3xl text-center")}>
      {name ? (
        <p className="text-sm font-medium uppercase tracking-[0.1em] text-current/50">
          {name}
        </p>
      ) : null}
      {title ? (
        <h2
          className={cn(
            "whitespace-pre-line text-[clamp(1.75rem,4vw,2.75rem)] font-bold",
            name ? "mt-5" : undefined,
          )}
        >
          {title}
        </h2>
      ) : null}
      {body ? (
        <p
          className={cn(
            "mt-5 whitespace-pre-line text-[15px] text-current/70",
            align === "center" && "mx-auto max-w-2xl",
          )}
        >
          {body}
        </p>
      ) : null}
    </div>
  );
}
