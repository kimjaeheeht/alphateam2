import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "토리콩",
  description: "text",
};

/** 토리콩 라우트 메타만 담당합니다. */
export default function TorikongLayout({
  children,
}: LayoutProps<"/torikong">) {
  return children;
}
