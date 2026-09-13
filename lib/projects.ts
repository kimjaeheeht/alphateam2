export type ProjectSlug = "tripdito" | "torikong" | "ggparrot";

export type PageTheme = "home" | ProjectSlug;

/** 로고·마크 경로 */
export type BrandAssets = {
  logo: string;
  logoOnDark: string;
  mark: string;
};

/** 서비스 메타. accent는 포인트, onAccent는 그 위 글자색입니다. */
export type Project = {
  slug: ProjectSlug;
  name: string;
  nameEn: string;
  tagline: string;
  summary: string;
  href: `/${ProjectSlug}`;
  liveUrl: string;
  category: string;
  accent: string;
  secondary: string;
  onAccent: string;
  /** 히어로 배경. 없으면 accent 단색 */
  heroFill?: string;
  assets: BrandAssets;
};

export const projects: Project[] = [
  {
    slug: "tripdito",
    name: "트립디토",
    nameEn: "TripDito",
    tagline: "이미지 한 장으로, 여행 쇼핑",
    summary:
      "이미지 한 장으로 해외여행 쇼핑 리스트를 만들고, 현지 구매 동선을 잡아 줍니다.",
    href: "/tripdito",
    liveUrl: "https://trip-shopping.vercel.app/",
    category: "여행 쇼핑",
    accent: "#3182F6",
    secondary: "#62CBFF",
    onAccent: "#ffffff",
    heroFill: "#e8f3ff",
    assets: {
      logo: "/images/tripdito/logo.svg",
      logoOnDark: "/images/tripdito/logo-white.svg",
      mark: "/images/tripdito/mark.svg",
    },
  },
  {
    slug: "torikong",
    name: "토리콩",
    nameEn: "Torikong",
    tagline: "우리 아이만의 특별한 이야기",
    summary:
      "유아 교육 이야기에 쓸 캐릭터를 만들고, 에피소드 속에서도 같은 얼굴로 만나게 합니다.",
    href: "/torikong",
    liveUrl: "https://2607-tale-nest.vercel.app/",
    category: "에듀테크",
    accent: "#FF6087",
    secondary: "#FFBEC7",
    onAccent: "#ffffff",
    heroFill: "#FEF2F4",
    assets: {
      logo: "/images/torikong/logo.svg",
      logoOnDark: "/images/torikong/logo-white.svg",
      mark: "/images/torikong/mark-bg.svg",
    },
  },
  {
    slug: "ggparrot",
    name: "껄무새",
    nameEn: "GGPARROT",
    tagline: "코린이도 쉽게 시작하는 코인 매크로",
    summary:
      "전략을 만들고 과거 데이터로 돌려본 뒤, 실거래 없이 모의로 익힙니다.",
    href: "/ggparrot",
    liveUrl: "https://gg-parrot.vercel.app/",
    category: "핀테크 교육",
    accent: "#FCD535",
    secondary: "#FFE57C",
    onAccent: "#111111",
    assets: {
      logo: "/images/ggparrot/logo.svg",
      logoOnDark: "/images/ggparrot/logo-white.svg",
      mark: "/images/ggparrot/mark.svg",
    },
  },
];

export const heroCircleOpacities = [0.28, 0.28] as [number, number];

export const heroCircleOpacitiesOnLight = [0.38, 0.38] as [number, number];

/** slug로 서비스 메타를 찾습니다. */
export function getProject(slug: ProjectSlug) {
  const project = projects.find((item) => item.slug === slug);
  if (!project) {
    throw new Error(`Unknown project: ${slug}`);
  }
  return project;
}

/** 목록 순서 기준 이전·다음 서비스입니다. */
export function getAdjacentProjects(slug: ProjectSlug) {
  const index = projects.findIndex((item) => item.slug === slug);
  return {
    prev: index > 0 ? projects[index - 1] : undefined,
    next: index >= 0 && index < projects.length - 1 ? projects[index + 1] : undefined,
  };
}
