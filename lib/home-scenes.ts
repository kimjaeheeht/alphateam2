export const homeScenes = [
  {
    id: "visual",
    background: "#f0c8dc",
    fill: "radial-gradient(ellipse 95% 70% at 0% 0%, #ff8fa3 0%, transparent 58%), radial-gradient(ellipse 95% 75% at 100% 100%, #5ed4ee 0%, transparent 56%), radial-gradient(ellipse 58% 48% at 40% 32%, rgba(255,255,255,0.62) 0%, transparent 52%), linear-gradient(148deg, #ffb0c0 0%, #efd0e8 40%, #c8e8f6 70%, #78dcf0 100%)",
    foreground: "#111111",
    muted: "rgba(17,17,17,0.48)",
    planes: [
      "rgba(255,255,255,0.42)",
      "rgba(255,255,255,0.26)",
      "rgba(255,255,255,0.14)",
    ] as [string, string, string],
  },
  {
    id: "manifesto",
    background: "#f7f8fa",
    foreground: "#111111",
    muted: "#6b6b6b",
    planes: [
      "rgba(255,255,255,0.7)",
      "rgba(200,210,230,0.35)",
      "rgba(255,255,255,0.2)",
    ] as [string, string, string],
  },
  {
    id: "projects",
    background: "#ececec",
    foreground: "#111111",
    muted: "#6b6b6b",
    planes: [
      "rgba(255,255,255,0.7)",
      "rgba(200,200,200,0.35)",
      "rgba(255,255,255,0.2)",
    ] as [string, string, string],
  },
] as const;

export type HomeSceneId = (typeof homeScenes)[number]["id"];
