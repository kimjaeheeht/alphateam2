/** 홈 히어로 배경 팔레트 — 여기 색만 바꾸면 됩니다. */
const homeHeroColors = {
  /** 좌상단 핑크 */
  pink: "#ff859e",
  /** 하단 중앙 노란 (살짝) */
  yellow: "rgba(255, 229, 144, 0.32)",
  /** 우상단 아이보리 */
  ivory: "#f3eee4",
  /** 우하단 스카이 */
  sky: "rgb(152, 250, 242)",
  /** 중앙 화이트 워시 */
  wash: "rgba(255, 234, 211, 0.52)",
  /** 베이스 그라데이션 스톱 (핑크 → 라벤더 → 아이보리 → 연블루 → 시안) */
  base: ["#ffa3b8", "#eec4d8", "#ebe4d6", "#b5e4f2", "#78dcf0"] as const,
};

type HeroPalette = {
  pink: string;
  yellow: string;
  ivory: string;
  sky: string;
  wash: string;
  base: readonly [string, string, string, string, string];
};

function buildHeroFill(colors: HeroPalette) {
  return [
    `radial-gradient(ellipse 95% 70% at 0% 0%, ${colors.pink} 0%, transparent 58%)`,
    `radial-gradient(ellipse 65% 50% at 48% 82%, ${colors.yellow} 0%, transparent 60%)`,
    `radial-gradient(ellipse 80% 60% at 100% 0%, ${colors.ivory} 0%, transparent 55%)`,
    `radial-gradient(ellipse 95% 75% at 100% 100%, ${colors.sky} 0%, transparent 56%)`,
    `radial-gradient(ellipse 58% 48% at 40% 32%, ${colors.wash} 0%, transparent 52%)`,
    `linear-gradient(148deg, ${colors.base[0]} 0%, ${colors.base[1]} 30%, ${colors.base[2]} 48%, ${colors.base[3]} 72%, ${colors.base[4]} 100%)`,
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
      fill: "linear-gradient(180deg, #FCE7F3 0%, #FDF2F8 100%)",
      circles: ["rgba(236, 72, 153, 0.1)", "rgba(244, 114, 182, 0.2)"],
    },
    {
      fill: "linear-gradient(180deg, #FEF9C3 0%, #ECFDF5 100%)",
      circles: ["rgba(234, 179, 8, 0.15)", "rgba(29, 153, 129, 0.12)"],
    },
    {
      fill: "linear-gradient(180deg, #DBEAFE 0%, #EFF6FF 100%)",
      circles: ["rgba(59, 130, 246, 0.12)", "rgba(99, 102, 241, 0.15)"],
    },
  ] satisfies PhilosophyScene[],
  foreground: "#111111",
  /** 상단 작은 소속·기수 */
  brand: "HAI본부 알파팀 2기",
  /** 핵심 카피 — 2행 조판, 히어로에서 가장 크게 */
  headline: "생각을 서비스로",
  /** 원 3장(좌·중·우). color + opacities만 조절하면 됩니다. */
  circles: {
    color: "#ffffff",
    opacities: [0.25, 0.3, 0.25] as [number, number, number],
  },
};
