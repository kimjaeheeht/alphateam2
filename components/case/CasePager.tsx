import Link from "next/link";

import type { Project } from "@/lib/projects";

type CasePagerProps = {
  prev?: Project;
  next?: Project;
};

export default function CasePager({ prev, next }: CasePagerProps) {
  return (
    <nav aria-label="다른 서비스" className="grid md:grid-cols-2">
      {prev ? (
        <Link
          href={prev.href}
          className="flex min-h-44 flex-col justify-end px-8 py-10 transition-opacity hover:opacity-90"
          style={{ background: prev.accent, color: prev.onAccent }}
        >
          <p className="text-[11px]">이전 서비스</p>
          <p className="mt-3 text-2xl">{prev.name}</p>
        </Link>
      ) : (
        <div className="hidden bg-[#f4f4f4] md:block" />
      )}
      {next ? (
        <Link
          href={next.href}
          className="flex min-h-44 flex-col justify-end px-8 py-10 text-right transition-opacity hover:opacity-90"
          style={{ background: next.accent, color: next.onAccent }}
        >
          <p className="text-[11px]">다음 서비스</p>
          <p className="mt-3 text-2xl">{next.name}</p>
        </Link>
      ) : (
        <div className="hidden bg-[#f4f4f4] md:block" />
      )}
    </nav>
  );
}
