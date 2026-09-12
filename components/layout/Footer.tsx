import Link from "next/link";

import { projects } from "@/lib/projects";

export default function Footer() {
  return (
    <footer className="mt-auto bg-[#1a1a1a] text-white">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-5 py-12 sm:flex-row sm:items-end sm:justify-between sm:px-8">
        <div>
          <p className="text-sm font-medium">알파팀 2기</p>
          <p className="mt-2 text-sm text-white/50">
          © 2026 HECTO. HAI본부 알파팀 2기
          </p>
        </div>
        <nav
          aria-label="서비스"
          className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-white/55"
        >
          <Link href="/" className="transition-colors hover:text-white">
            홈
          </Link>
          {projects.map((project) => (
            <Link
              key={project.slug}
              href={project.href}
              className="transition-colors hover:text-white"
            >
              {project.name}
            </Link>
          ))}
        </nav>
      </div>
    </footer>
  );
}
