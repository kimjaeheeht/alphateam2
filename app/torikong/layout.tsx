import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "토리콩",
  description: "text",
};

export default function TorikongLayout({
  children,
}: LayoutProps<"/torikong">) {
  return children;
}
