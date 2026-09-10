type CaseBandProps = {
  color: string;
};

export default function CaseBand({ color }: CaseBandProps) {
  return <div className="h-36 w-full sm:h-44" style={{ background: color }} />;
}
