import type { ProjectSlug } from "@/lib/projects";
import type { ServicePageContent } from "@/lib/service-page";

/** 홈 PHILOSOPHY·진행 과정·서비스·아카이브 카피 */
export const homeContent = {
  philosophy: {
    name: "PHILOSOPHY",
    items: [
      {
        id: "m1",
        step: "01",
        label: "마음",
        title: "좋아하는 마음을 들여다봅니다.",
        body: "사람들이 좋아하고, 찾고, 나누는 순간에 주목합니다.",
      },
      {
        id: "m2",
        step: "02",
        label: "시선",
        title: "익숙한 일상을 다르게 바라봅니다.",
        body: "반복되는 행동과 무심코 지나친 불편을 다시 바라봅니다.",
      },
      {
        id: "m3",
        step: "03",
        label: "경험",
        title: "작은 생각을 끝까지 이어갑니다.",
        body: "생각에 머물지 않고, 사람들에게 닿는 경험으로 이어갑니다.",
      },
    ],
  },
  journey: {
    name: "진행 과정",
    title: "아이디어에서 서비스까지",
    items: [
      {
        value: "10+",
        label: "아이디어 발굴",
        body: "다양한 아이디어 제안",
      },
      {
        value: "7",
        label: "PoC 구현",
        body: "프로토타입 개발",
      },
      {
        value: "3",
        label: "서비스 후보",
        body: "발표 대상 선정",
      },
    ],
  },
  projectsName: "서비스 소개",
  projectsTitle: "세 개의 서비스를 소개합니다",
  archive: {
    name: "아카이브",
    title: "알파팀의 기록을 확인해보세요",
    items: [
      {
        title: "아이디어 라이브러리",
        body: "제안된 아이디어 보기",
        href: "https://app.notion.com/p/39bc7b7752ce80e6b655d8ca79cbea9f?source=copy_link",
      },
      {
        title: "프로젝트 진행 현황",
        body: "전체 PoC 프로젝트 보기",
        href: "https://app.notion.com/p/39fc7b7752ce800cb154f94d82e74287?source=copy_link",
      },
    ],
  },
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

/** 홈 카드·클로징 본문 공통 문구 (projects.tagline) */
export function getProjectPitch(project: { tagline: string }) {
  return project.tagline;
}

/** 클로징: `{서비스명}에서 직접 확인해 보세요!` + 피치 + 공통 CTA */
export function buildServiceClosing(project: {
  name: string;
  tagline: string;
}) {
  return {
    title: `${project.name}에서 직접 확인해 보세요!`,
    body: getProjectPitch(project),
    cta: serviceCtas.primary,
  };
}

/** 트립디토 카피 */
export const tripditoContent: ServicePageContent = {
  hero: {
    title: "캡처해둔 쇼핑템,\n이제 여행지에서\n바로 찾으세요!",
    screens: [
      "/images/tripdito/visual/01.png",
      "/images/tripdito/visual/02.png",
    ],
    cta: serviceCtas.primary,
    ctaSecondary: serviceCtas.secondary,
  },
  background: {
    name: serviceSectionNames.background,
    title: "캡처만 해두고,\n정작 여행지에서는 찾지 못한 경험!",
    items: [
      {
        icon: "Share2",
        body: "SNS에서 캡처해 두고 막상 여행지에서는 까먹고 돌아와서 캐리어를 풀면 생각났던 순간",
      },
      {
        icon: "Search",
        body: "바쁜 현생 속에서 쇼핑리스트를 만드는 일이 번거롭다고 느낀 경험",
      },
      {
        icon: "Lightbulb",
        body: "미리 캡처한 이미지를 가져갔지만 정작 어디서 파는지 몰라 아까운 여행 시간만 낭비했던 기억",
      },
    ],
  },
  service: {
    name: serviceSectionNames.service,
    title: "사진 한 장으로 끝내는\n똑똑한 쇼핑 리스트 완성!",
    body: "트립디토는 이미지 한 장이면 내 여행지에 맞춰 AI가 정보를 찾고,\n쇼핑 리스트로 만들어, 현지 구매까지 이어주는 서비스에요.",
    items: [
      {
        icon: "Upload",
        step: "01",
        title: "이미지 업로드",
        body: "사고 싶은 상품의 캡처 이미지를 업로드하세요.",
      },
      {
        icon: "ScanSearch",
        step: "02",
        title: "AI 상품 분석",
        body: "AI가 이미지를 분석해 정확한 상품 정보를 찾아줘요.",
      },
      {
        icon: "ListChecks",
        step: "03",
        title: "쇼핑 리스트 저장",
        body: "찾은 상품을 나만의 쇼핑 리스트에 쉽게 담아보세요.",
      },
      {
        icon: "MapPin",
        step: "04",
        title: "현지 판매처 연결",
        body: "내 위치에서 가장 가까운 현지 매장을 표시해줘요.",
      },
    ],
  },
  highlight: {
    name: serviceSectionNames.highlight,
    title: "소중한 여행, 알차게 즐기세요!\n번거로운 과정은 트립디토가 줄였어요.",
    items: [
      {
        icon: "ImageIcon",
        title: "AI 이미지 분석",
        body: "상품명을 몰라도 이미지 한 장으로 디토 AI가 정보를 찾고",
      },
      {
        icon: "ListChecks",
        title: "쇼핑 리스트",
        body: "쇼핑 리스트를 만들고, 다음 여행에서도 또 사고싶은 상품을 재사용해요.",
      },
      {
        icon: "MapPin",
        title: "주변 판매 지도",
        body: "아직 사지 않은 상품을 파는 가까운 상점을 지도에 표시해줘요.",
      },
      {
        icon: "Camera",
        title: "때샷 피드·랭킹",
        body: "우리만의 쇼핑 트랜드 공유! 다른 사람의 쇼핑 리스트를 내 리스트에도 담기",
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
};

/** 토리콩 카피 */
export const torikongContent: ServicePageContent = {
  hero: {
    title: "우리 아이를 위한\n교육 콘텐츠,\n이제 직접 만들어요!",
    screens: [
      "/images/torikong/visual/01.png",
      "/images/torikong/visual/02.png",
    ],
    device: "desktop",
    cta: serviceCtas.primary,
    ctaSecondary: serviceCtas.secondary,
  },
  background: {
    name: serviceSectionNames.background,
    title: "text",
    items: [
      { icon: "Share2", body: "text" },
      { icon: "Search", body: "text" },
      { icon: "Lightbulb", body: "text" },
    ],
  },
  service: {
    name: serviceSectionNames.service,
    title: "text",
    body: "text",
    items: [
      { icon: "Upload", step: "01", title: "text", body: "text" },
      { icon: "ScanSearch", step: "02", title: "text", body: "text" },
      { icon: "ListChecks", step: "03", title: "text", body: "text" },
      { icon: "MapPin", step: "04", title: "text", body: "text" },
    ],
  },
  highlight: {
    name: serviceSectionNames.highlight,
    title: "text",
    items: [
      { icon: "ImageIcon", title: "text", body: "text" },
      { icon: "ListChecks", title: "text", body: "text" },
      { icon: "MapPin", title: "text", body: "text" },
      { icon: "Camera", title: "text", body: "text" },
    ],
  },
  brand: {
    name: serviceSectionNames.brand,
    title: "작은 이야기의 씨앗이,\n토리콩으로 자랍니다.",
    body: "‘스토리(Story)’의 토리와 작고 친근한 이미지의 콩을 결합해\n아이들이 쉽게 부르고 기억할 수 있는 이름을 만들었습니다.\n\n작은 씨앗에서 새싹이 자라듯 하나의 이야기가 시작되는 모습을 담아,\n둥글고 부드러운 형태와 새싹 캐릭터로 친근하게 표현했습니다.",
    tokens: [
      { label: "토리", value: "Story에서 가져온 이야기의 의미" },
      { label: "콩과 새싹", value: "작은 이야기의 씨앗이 싹을 틔우고 자라나는 모습을 상징" },
      { label: "반짝임", value: "AI를 통해 아이디어가 콘텐츠로 만들어지는 순간을 표현" },
    ],
  },
};

/** 껄무새 카피 */
export const ggparrotContent: ServicePageContent = {
  hero: {
    title: "살껄 팔껄 후회 끝!\n만들고 겨루는\n 코인 전략 플랫폼",
    screens: [
      "/images/ggparrot/visual/01.png",
      "/images/ggparrot/visual/02.png",
    ],
    device: "desktop",
    cta: serviceCtas.primary,
    ctaSecondary: serviceCtas.secondary,
  },
  background: {
    name: serviceSectionNames.background,
    title: "text",
    items: [
      { icon: "Share2", body: "text" },
      { icon: "Search", body: "text" },
      { icon: "Lightbulb", body: "text" },
    ],
  },
  service: {
    name: serviceSectionNames.service,
    title: "text",
    body: "text",
    items: [
      { icon: "Upload", step: "01", title: "text", body: "text" },
      { icon: "ScanSearch", step: "02", title: "text", body: "text" },
      { icon: "ListChecks", step: "03", title: "text", body: "text" },
      { icon: "MapPin", step: "04", title: "text", body: "text" },
    ],
  },
  highlight: {
    name: serviceSectionNames.highlight,
    title: "text",
    items: [
      { icon: "ImageIcon", title: "text", body: "text" },
      { icon: "ListChecks", title: "text", body: "text" },
      { icon: "MapPin", title: "text", body: "text" },
      { icon: "Camera", title: "text", body: "text" },
    ],
  },
  brand: {
    name: serviceSectionNames.brand,
    title: "후회만 하던 껄무새가,\n전략을 알려주는 껄무새로.",
    body: "“살걸, 팔걸” 하며 지나간 투자를 아쉬워하는\n투자자들의 표현 ‘껄무새’에서 이름을 가져왔습니다.\n\n같은 말을 반복하는 앵무새의 이미지를 유쾌하게 뒤집어,\n선글라스를 쓰고 자신만만하게 전략을 알려주는 캐릭터로 표현했습니다.",
    tokens: [
      { label: "껄", value: "“살걸, 팔걸”처럼 투자 뒤에 남는 아쉬움과 후회" },
      { label: "앵무새", value: "같은 말을 반복하는 앵무새에서 가져온 캐릭터" },
      { label: "선글라스", value: "능청스럽고 자신감 있게 전략을 알려주는 껄무새의 상징" },
    ],
  },
};

/** slug → 쇼케이스 카피 */
export const serviceContent: Record<ProjectSlug, ServicePageContent> = {
  tripdito: tripditoContent,
  torikong: torikongContent,
  ggparrot: ggparrotContent,
};
