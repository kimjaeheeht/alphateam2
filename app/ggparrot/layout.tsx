import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "껄무새",
  description: "text",
};

export default function GgparrotLayout({
  children,
}: LayoutProps<"/ggparrot">) {
  return children;
}
