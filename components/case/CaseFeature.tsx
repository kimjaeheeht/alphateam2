import { cn } from "@/lib/cn";

type CaseFeatureProps = {
  kicker?: string;
  title: string;
  body?: string | string[];
  accent?: string;
  rails?: string;
  align?: "center" | "left";
  children?: React.ReactNode;
};

export default function CaseFeature({
  kicker,
  title,
  body,
  accent,
  rails,
  align = "center",
  children,
}: CaseFeatureProps) {
  const paragraphs = Array.isArray(body) ? body : body ? [body] : [];
  const centered = align === "center";

  const inner = (
    <div className={cn(rails ? "bg-white px-5 py-20 sm:px-16 sm:py-28" : "py-20 sm:py-28")}>
      <div
        className={cn(
          "mx-auto max-w-3xl",
          centered && "text-center",
        )}
      >
        {kicker ? (
          <p
            className="text-sm"
            style={{ color: accent }}
          >
            {kicker}
          </p>
        ) : null}
        <h2
          className={cn(
            "text-2xl font-medium sm:text-4xl",
            kicker && "mt-3",
          )}
        >
          {title}
        </h2>
        {paragraphs.length > 0 ? (
          <div
            className={cn(
              "mt-6 space-y-4 text-[15px] text-[#666]",
              centered && "mx-auto max-w-xl",
            )}
          >
            {paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        ) : null}
      </div>
      {children ? (
        <div className="mx-auto mt-14 max-w-4xl">{children}</div>
      ) : null}
    </div>
  );

  if (rails) {
    return (
      <section style={{ background: rails }} className="sm:px-[6vw]">
        {inner}
      </section>
    );
  }

  return <section className="bg-white">{inner}</section>;
}
