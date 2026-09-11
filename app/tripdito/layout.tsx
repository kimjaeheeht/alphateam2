import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "트립디토",
  description: "이미지 한 장으로 해외여행 쇼핑리스트를 만들고, 현지 구매 동선을 잡아 주는 쇼핑 플랫폼.",
};

/** 트립디토 라우트 메타만 담당합니다. 본문은 page에서 그립니다. */
export default function TripditoLayout({
  children,
}: LayoutProps<"/tripdito">) {
  return children;
}
