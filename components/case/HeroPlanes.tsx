type HeroPlanesProps = {
  layers: [string, string, string];
};

export default function HeroPlanes({ layers }: HeroPlanesProps) {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      <div className="hero-planes-stack">
        <div
          className="hero-plane hero-plane-a opacity-90"
          style={{ background: layers[0] }}
        />
        <div
          className="hero-plane hero-plane-b opacity-70"
          style={{ background: layers[1] }}
        />
        <div
          className="hero-plane hero-plane-c opacity-55"
          style={{ background: layers[2] }}
        />
      </div>
    </div>
  );
}
