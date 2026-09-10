import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "토리콩",
  description: "우리 아이만의 특별한 이야기",
};

export default function TorikongLayout({
  children,
}: LayoutProps<"/torikong">) {
  return children;
}
