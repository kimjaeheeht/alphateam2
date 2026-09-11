import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "껄무새",
  description: "text",
};

/** 껄무새 라우트 메타만 담당합니다. */
export default function GgparrotLayout({
  children,
}: LayoutProps<"/ggparrot">) {
  return children;
}
