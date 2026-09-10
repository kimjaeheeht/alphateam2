"use client";

import { usePathname } from "next/navigation";

import { cn } from "@/lib/cn";
import type { PageTheme } from "@/lib/projects";

function themeFromPath(pathname: string): PageTheme {
  if (pathname.startsWith("/tripdito")) return "tripdito";
  if (pathname.startsWith("/torikong")) return "torikong";
  if (pathname.startsWith("/ggparrot")) return "ggparrot";
  return "home";
}

type BrandMainProps = {
  children: React.ReactNode;
  className?: string;
};

export default function BrandMain({ children, className }: BrandMainProps) {
  const theme = themeFromPath(usePathname());

  return (
    <main
      data-theme={theme}
      className={cn("flex-1 bg-background text-foreground", className)}
    >
      {children}
    </main>
  );
}
