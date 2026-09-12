/** 홈 히어로 배경 팔레트 — 여기 색만 바꾸면 됩니다. */
const homeHeroColors = {
  /** 좌상단 핑크 */
  pink: "#ff859e",
  /** 하단 중앙 노란 (살짝) */
  yellow: "rgba(255, 229, 144, 0.32)",
  /** 우상단 아이보리 */
  ivory: "#f3eee4",
  /** 우하단 스카이 */
  sky: "rgb(123, 239, 247)",
  /** 중앙 화이트 워시 */
  wash: "rgba(255, 255, 255, 0.52)",
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

/** 매니페스토 구간별 배경 — 01 핑크 / 02 아이보리·노랑 / 03 스카이 */
const manifestoPalettes: HeroPalette[] = [
  {
    pink: "#ff6b92",
    yellow: "rgba(255, 229, 144, 0.18)",
    ivory: "#f7eef2",
    sky: "rgba(123, 239, 247, 0.35)",
    wash: "rgba(255, 255, 255, 0.4)",
    base: ["#ff8aa8", "#f0b8cc", "#f0d6e0", "#d4e8f2", "#a8dce8"],
  },
  {
    pink: "rgba(255, 133, 158, 0.45)",
    yellow: "rgba(255, 220, 100, 0.55)",
    ivory: "#f6f0e2",
    sky: "rgba(123, 239, 247, 0.4)",
    wash: "rgba(255, 255, 255, 0.48)",
    base: ["#f0c4d0", "#edd8c0", "#f0e6c8", "#d8e8e0", "#b8dce8"],
  },
  {
    pink: "rgba(255, 133, 158, 0.4)",
    yellow: "rgba(255, 229, 144, 0.2)",
    ivory: "#eef6f7",
    sky: "#5ee0f0",
    wash: "rgba(255, 255, 255, 0.42)",
    base: ["#e0c8d8", "#d4d8e8", "#d0e8f0", "#9edff0", "#6ad4e8"],
  },
];

export const homeHero = {
  fill: buildHeroFill(homeHeroColors),
  /** 매니페스토 01·02·03에 대응하는 배경 */
  manifestoFills: manifestoPalettes.map(buildHeroFill),
  foreground: "#111111",
  /** 상단 작은 소속·기수 */
  brand: "HAI본부 알파팀 2기",
  /** 핵심 카피 — 2행 조판, 히어로에서 가장 크게 */
  headline: "생각을 서비스로",
  /** 원 3장(좌·중·우). color + opacities만 조절하면 됩니다. */
  circles: {
    color: "#ffffff",
    opacities: [0.2, 0.3, 0.2] as [number, number, number],
  },
};
