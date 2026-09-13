import type { ReactNode } from "react";

import { cn } from "@/lib/cn";

type ServiceHeadingProps = {
  name?: string;
  title?: string;
  body?: string;
  align?: "center" | "left";
  titleId?: string;
  /** ??? ?(????) / ??(???)? ?? ?? ?? */
  aside?: ReactNode;
};

/** ??? / ? ?? / ??. ???? ?? ??? color? ?????. */
export default function ServiceHeading({
  name,
  title,
  body,
  align = "center",
  titleId,
  aside,
}: ServiceHeadingProps) {
  if (!name && !title && !body && !aside) return null;

  const heading = title ? (
    <h2
      id={titleId}
      className="whitespace-pre-line text-[clamp(1.75rem,4vw,2.75rem)] font-bold"
    >
      {title}
    </h2>
  ) : null;

  return (
    <div className={cn(align === "center" && "mx-auto max-w-3xl text-center")}>
      {name ? (
        <p className="text-sm font-medium text-current/50">{name}</p>
      ) : null}
      {aside && heading ? (
        <div
          className={cn(
            "flex flex-col-reverse gap-6 sm:flex-row sm:items-center sm:justify-between",
            name ? "mt-5" : undefined,
          )}
        >
          {heading}
          {aside}
        </div>
      ) : heading ? (
        <div className={name ? "mt-5" : undefined}>{heading}</div>
      ) : aside ? (
        aside
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
