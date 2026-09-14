import type { ReactNode } from "react";

import { cn } from "@/lib/cn";

type ServiceHeadingProps = {
  name?: string;
  title?: string;
  body?: string;
  align?: "center" | "left";
  titleId?: string;
  /** 제목 옆 요소. 브랜드 소개에서는 로고를 둡니다. */
  aside?: ReactNode;
};

/** 섹션명 / 큰 제목 / 본문. 부모의 text color를 따릅니다. */
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
      className="whitespace-pre-line text-[clamp(1.625rem,3.5vw,2.4rem)] font-bold"
    >
      {title}
    </h2>
  ) : null;

  return (
    <div className={cn(align === "center" && "text-center")}>
      {name ? (
        <p className="text-sm font-medium text-current/60">{name}</p>
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
        <p className="mt-5 whitespace-pre-line text-[15px] text-current/70">
          {body}
        </p>
      ) : null}
    </div>
  );
}
