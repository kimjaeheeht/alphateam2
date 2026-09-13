/** 홈 히어로 배경 팔레트 — 로고 컬러(#D3E4FD, #606DFF) 기준 */
const homeHeroColors = {
  /** 좌상단 — 보라·인디고 */
  pink: "rgba(96, 109, 255, 0.55)",
  /** 하단 중앙 — 연스카이 */
  yellow: "rgba(145, 218, 255, 0.4)",
  /** 우상단 — 연라벤더 */
  ivory: "rgba(190, 200, 255, 0.35)",
  /** 우하단 — 하늘색 */
  sky: "rgba(70, 170, 255, 0.6)",
  /** 중앙 와이드 — 살짝 오른쪽 (흰 원 대비용) */
  wash: "rgba(170, 195, 255, 0.5)",
  /** 중앙 코어 — 오른쪽 인디고 */
  mid: "rgba(130, 155, 255, 0.35)",
};

type HeroPalette = {
  pink: string;
  yellow: string;
  ivory: string;
  sky: string;
  wash: string;
  mid: string;
};

/** 코너 + 중앙 컬러 워시. 맨 아래는 흰 단색으로 비침을 막습니다. */
function buildHeroFill(colors: HeroPalette) {
  return [
    `radial-gradient(ellipse 95% 70% at 0% 0%, ${colors.pink} 0%, transparent 58%)`,
    `radial-gradient(ellipse 65% 50% at 48% 82%, ${colors.yellow} 0%, transparent 60%)`,
    `radial-gradient(ellipse 80% 60% at 100% 0%, ${colors.ivory} 0%, transparent 55%)`,
    `radial-gradient(ellipse 95% 75% at 100% 100%, ${colors.sky} 0%, transparent 56%)`,
    `radial-gradient(ellipse 72% 62% at 58% 48%, ${colors.wash} 0%, transparent 65%)`,
    `radial-gradient(ellipse 42% 38% at 62% 50%, ${colors.mid} 0%, transparent 58%)`,
    "rgba(255, 255, 255, 1)",
  ].join(", ");
}

/** PHILOSOPHY 슬라이드별 파스텔 배경 + 겹친 원 2색 */
export type PhilosophyScene = {
  fill: string;
  circles: [string, string];
};

export const homeHero = {
  fill: buildHeroFill(homeHeroColors),
  philosophyScenes: [
    {
      fill: "linear-gradient(180deg, #FCE8F3 30%, #FFF7FB 90%)",
      circles: ["rgba(251, 146, 188, 0.22)", "rgba(244, 114, 182, 0.28)"],
    },
    {
      fill: "linear-gradient(180deg, #FEF6C8 30%, #F0FDF7 90%)",
      circles: ["rgba(253, 224, 71, 0.28)", "rgba(110, 231, 183, 0.24)"],
    },
    {
      fill: "linear-gradient(180deg, #D9EBFE 30%, #F5F9FF 90%)",
      circles: ["rgba(125, 195, 252, 0.26)", "rgba(147, 181, 253, 0.3)"],
    },
  ] satisfies PhilosophyScene[],
  foreground: "#111111",
  /** 상단 작은 소속·기수 */
  brand: "HAI본부 알파팀 2기",
  /** 핵심 카피 — 2행 조판, 히어로에서 가장 크게 */
  headline: "생각을 서비스로",
  /** 원 2장(좌·우). color + opacities만 조절하면 됩니다. */
  circles: {
    color: "#ffffff",
    opacities: [0.42, 0.42] as [number, number],
  },
};
