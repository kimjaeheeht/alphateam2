import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "껄무새",
  description: "코린이도 쉽게 시작하는 코인 매크로",
};

export default function GgparrotLayout({
  children,
}: LayoutProps<"/ggparrot">) {
  return children;
}
