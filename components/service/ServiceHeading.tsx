import { cn } from "@/lib/cn";

type ServiceHeadingProps = {
  name?: string;
  title?: string;
  body?: string;
  align?: "center" | "left";
  titleId?: string;
};

/** ??? / ? ?? / ??. ???? ?? ??? color? ?????. */
export default function ServiceHeading({
  name,
  title,
  body,
  align = "center",
  titleId,
}: ServiceHeadingProps) {
  if (!name && !title && !body) return null;

  return (
    <div className={cn(align === "center" && "mx-auto max-w-3xl text-center")}>
      {name ? (
        <p className="text-sm font-medium text-current/50">{name}</p>
      ) : null}
      {title ? (
        <h2
          id={titleId}
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
