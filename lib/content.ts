import type { ProjectSlug } from "@/lib/projects";
import type { ServicePageContent } from "@/lib/service-page";

/** 홈 매니페스토·서비스 목록 카피 */
export const homeContent = {
  manifesto: [
    {
      id: "m1",
      step: "01",
      title: "좋아하는 마음을,\n들여다봅니다.",
      body: "사람들이 좋아하고, 찾고, 나누는 순간에 주목합니다.",
    },
    {
      id: "m2",
      step: "02",
      title: "익숙한 일상을,\n다르게 바라봅니다.",
      body: "반복되는 행동과 무심코 지나친 불편을 다시 바라봅니다.",
    },
    {
      id: "m3",
      step: "03",
      title: "작은 생각을,\n끝까지 이어갑니다.",
      body: "생각에 머물지 않고, 사람들에게 닿는 경험으로 이어갑니다.",
    },
  ],
  projectsTitle: "서비스",
  projectsBody: "세 팀이 각자의 문제로 만든 서비스입니다.",
};

/** 공통 섹션명 */
export const serviceSectionNames = {
  background: "기획 배경",
  service: "서비스 소개",
  highlight: "핵심 기능",
  brand: "브랜드 소개",
} as const;

/** 공통 버튼명 */
export const serviceCtas = {
  primary: "서비스 바로가기",
  secondary: "서비스 소개",
} as const;

/** 트립디토 카피 */
export const tripditoContent: ServicePageContent = {
  hero: {
    title: "캡처해 둔 그 상품,\n여행지에서 바로 찾으세요!",
    // body: "이미지 한 장으로 상품을 찾고,\n쇼핑 리스트로 정리하고,\n현지 판매처까지 연결하는 여행 쇼핑 서비스",
    screen: "/images/tripdito/service-01.png",
    cta: serviceCtas.primary,
    ctaSecondary: serviceCtas.secondary,
  },
  background: {
    name: serviceSectionNames.background,
    title: "캡처만 해두고,\n현지에서 찾지 못해 포기",
    items: [
      {
        icon: "Share2",
        body: "SNS, 유튜브, 블로그와 지인의 추천에서 마음에 드는 상품을 캡처해 두지만, 막상 여행지에 가면 상품명도, 판매처도 기억나지 않습니다.",
      },
      {
        icon: "Search",
        body: "쇼핑 리스트를 다시 만들고 검색하는 일은 번거롭고, 결국 사고 싶었던 상품을 놓치기도 합니다.",
      },
      {
        icon: "Lightbulb",
        body: "추천 상품을 이미지로 저장해 두고도 실제 여행지에서는 상품명이나 구매처를 찾기 어려워 구매로 연결되지 않는 경험.",
      },
    ],
  },
  service: {
    name: serviceSectionNames.service,
    title: "이미지 한 장으로,\n현지에서 바로",
    body: "TripDito는 여행에서 사고 싶은 상품을 이미지 한 장으로 찾고,\n쇼핑 리스트로 정리한 뒤 현지 구매 동선까지 연결하는 여행 쇼핑 서비스입니다.",
    items: [
      {
        icon: "Upload",
        step: "01",
        title: "이미지 업로드",
        body: "여행 전에 저장해 둔 상품 이미지를 업로드합니다.",
      },
      {
        icon: "ScanSearch",
        step: "02",
        title: "AI 상품 정보 분석",
        body: "상품명을 몰라도 AI가 상품 정보를 찾아 줍니다.",
      },
      {
        icon: "ListChecks",
        step: "03",
        title: "쇼핑 리스트 저장",
        body: "분석한 상품을 내 리스트에 바로 담습니다.",
      },
      {
        icon: "MapPin",
        step: "04",
        title: "현지 구매처 연결",
        body: "현지에서 살 수 있는 구매처를 바로 연결합니다.",
      },
    ],
  },
  highlight: {
    name: serviceSectionNames.highlight,
    title: "여행 쇼핑의 번거로운 순간을\n하나씩 줄였습니다!",
    items: [
      {
        icon: "ImageIcon",
        title: "디토 AI 사진 분석",
        body: "상품명을 몰라도 이미지 한 장으로 상품 정보를 찾습니다.",
      },
      {
        icon: "ListChecks",
        title: "내 여행 리스트",
        body: "여행지별로 쇼핑 리스트를 만들고, 다시 사용할 수 있습니다.",
      },
      {
        icon: "MapPin",
        title: "주변 상점 MAP",
        body: "아직 사지 않은 상품을 파는 가까운 상점을 지도에서 찾습니다.",
      },
      {
        icon: "Camera",
        title: "때샷 · 랭킹",
        body: "다른 사람의 쇼핑 리스트를 보고 마음에 드는 상품을 내 리스트에 담습니다.",
      },
    ],
  },
  brand: {
    name: serviceSectionNames.brand,
    title: "Your Pick,\nMy Ditto.",
    body: "누군가의 Pick에 “나도”라고 공감하고,\n마음에 든 것을 내 여행의 Pick으로 담습니다.\n\n하트(좋아요)와 체크(담기)가 연결된 심볼은\n좋아하는 것을 발견하고, 나의 Pick으로 이어지는 경험을 의미합니다.",
    tokens: [
      { label: "Trip", value: "여행" },
      { label: "Ditto", value: "나도, 공감하는 마음" },
      { label: "Pick", value: "좋아하는 것을 선택하고 담는 경험" },
    ],
  },
  closing: {
    title: "TripDito에서 직접 확인해 보세요!",
    body: "이미지 한 장에서 시작되는 여행 쇼핑 경험",
    cta: serviceCtas.primary,
  },
};

const TEXT = "text";

/** 토리콩·껄무새 기획용 플레이스홀더. 섹션명·CTA만 채우고 본문은 text입니다. */
function placeholderContent(
  hero?: Pick<NonNullable<ServicePageContent["hero"]>, "screen" | "screenSm" | "device">,
): ServicePageContent {
  return {
    hero: {
      title: TEXT,
      body: TEXT,
      cta: serviceCtas.primary,
      ctaSecondary: serviceCtas.secondary,
      ...hero,
    },
    background: {
      name: serviceSectionNames.background,
      title: TEXT,
      items: [
        { icon: "Share2", body: TEXT },
        { icon: "Search", body: TEXT },
        { icon: "Lightbulb", body: TEXT },
      ],
    },
    service: {
      name: serviceSectionNames.service,
      title: TEXT,
      body: TEXT,
      items: [
        { icon: "Upload", step: "01", title: TEXT, body: TEXT },
        { icon: "ScanSearch", step: "02", title: TEXT, body: TEXT },
        { icon: "ListChecks", step: "03", title: TEXT, body: TEXT },
        { icon: "MapPin", step: "04", title: TEXT, body: TEXT },
      ],
    },
    highlight: {
      name: serviceSectionNames.highlight,
      title: TEXT,
      items: [
        { icon: "ImageIcon", title: TEXT, body: TEXT },
        { icon: "ListChecks", title: TEXT, body: TEXT },
        { icon: "MapPin", title: TEXT, body: TEXT },
        { icon: "Camera", title: TEXT, body: TEXT },
      ],
    },
    brand: {
      name: serviceSectionNames.brand,
      title: TEXT,
      body: TEXT,
      tokens: [
        { label: TEXT, value: TEXT },
        { label: TEXT, value: TEXT },
        { label: TEXT, value: TEXT },
      ],
    },
    closing: {
      title: TEXT,
      body: TEXT,
      cta: serviceCtas.primary,
    },
  };
}

export const torikongContent = placeholderContent({
  screen: "/images/torikong/service-01.png",
  device: "desktop",
});

export const ggparrotContent = placeholderContent({
  screen: "/images/ggparrot/service-01.png",
  screenSm: "/images/ggparrot/service-01-sm.png",
  device: "desktop",
});

/** slug → 쇼케이스 카피 */
export const serviceContent: Record<ProjectSlug, ServicePageContent> = {
  tripdito: tripditoContent,
  torikong: torikongContent,
  ggparrot: ggparrotContent,
};
