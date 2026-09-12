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

/** 매니페스토 구간별 배경 — 01 로즈 / 02 피치·버터 / 03 스카이 */
const manifestoPalettes: HeroPalette[] = [
  {
    pink: "rgba(255, 96, 140, 0.55)",
    yellow: "rgba(245, 180, 83, 0.35)",
    ivory: "rgba(255, 244, 248, 0.95)",
    sky: "rgba(243, 69, 38, 0.4)",
    wash: "rgba(255, 216, 197, 0.5)",
    base: ["#ff8eac", "#ffb3c4", "#ffe4ec", "#ffd0dc", "#f5b8cc"],
  },
  {
    pink: "rgba(191, 209, 90, 0.7)",
    yellow: "rgba(255, 242, 128, 0.72)",
    ivory: "rgba(255, 236, 200, 0.85)",
    sky: "rgba(100, 200, 108, 0.65)",
    wash: "rgba(255, 248, 230, 0.28)",
    base: ["#ffb080", "#ffd078", "#f5e6c0", "#b8ddd0", "#8ecfc0"],
  },
  {
    pink: "rgba(120, 170, 255, 0.45)",
    yellow: "rgba(40, 240, 180, 0.4)",
    ivory: "rgba(236, 250, 255, 0.7)",
    sky: "rgba(8, 174, 224, 0.75)",
    wash: "rgba(29, 243, 250, 0.22)",
    base: ["#b8d4ff", "#a8e4f8", "#c4f2ee", "#7ed8f0", "#4ec4e8"],
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
    opacities: [0.25, 0.3, 0.25] as [number, number, number],
  },
};
