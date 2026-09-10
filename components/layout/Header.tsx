"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

import { projects } from "@/lib/projects";

const navItems = [
  { href: "/", label: "홈" },
  ...projects.map((project) => ({
    href: project.href,
    label: project.name,
  })),
];

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname.startsWith(href);
}

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-black/10 bg-white/90 text-[#111] backdrop-blur-md">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between gap-4 px-5 sm:px-8">
        <Link
          href="/"
          className="shrink-0 text-sm tracking-tight"
          onClick={() => setOpen(false)}
        >
          알파팀 2기
        </Link>
        <nav aria-label="주요 메뉴" className="hidden items-center gap-8 text-sm md:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={
                isActive(pathname, item.href)
                  ? "text-[#111]"
                  : "text-[#6b6b6b] transition-colors hover:text-[#111]"
              }
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <button
          type="button"
          className="inline-flex size-10 items-center justify-center md:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
          <span className="sr-only">메뉴</span>
        </button>
      </div>
      {open ? (
        <nav
          id="mobile-nav"
          aria-label="모바일 메뉴"
          className="border-t border-black/10 bg-white px-5 py-3 md:hidden"
        >
          <ul className="flex flex-col">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`block py-2 text-sm ${
                    isActive(pathname, item.href)
                      ? "text-[#111]"
                      : "text-[#6b6b6b]"
                  }`}
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      ) : null}
    </header>
  );
}
