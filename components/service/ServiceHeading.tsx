import { cn } from "@/lib/cn";

type ServiceHeadingProps = {
  name: string;
  title: string;
  body?: string;
  align?: "center" | "left";
  onDark?: boolean;
};

export default function ServiceHeading({
  name,
  title,
  body,
  align = "center",
  onDark = false,
}: ServiceHeadingProps) {
  return (
    <div className={cn(align === "center" && "mx-auto max-w-3xl text-center")}>
      <p
        className={cn(
          "text-sm uppercase tracking-[0.1em] font-medium",
          onDark ? "text-white/80" : "text-black/50",
        )}
      >
        {name}
      </p>
      <h2
        className={cn(
          "mt-5 whitespace-pre-line text-[clamp(1.75rem,4vw,2.75rem)] font-bold",
          onDark && "text-white",
        )}
      >
        {title}
      </h2>
      {body ? (
        <p
          className={cn(
            "mt-5 whitespace-pre-line text-[15px]",
            onDark ? "text-white/80" : "text-[#666666]",
            align === "center" && "mx-auto max-w-2xl",
          )}
        >
          {body}
        </p>
      ) : null}
    </div>
  );
}
