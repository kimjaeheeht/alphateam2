"use client";

import { usePathname } from "next/navigation";

import BrandMain from "@/components/layout/BrandMain";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";

type SiteLayoutProps = {
  children: React.ReactNode;
};

export default function SiteLayout({ children }: SiteLayoutProps) {
  const home = usePathname() === "/";

  return (
    <div
      className={
        home
          ? "flex h-dvh flex-col overflow-hidden"
          : "flex min-h-dvh flex-col"
      }
    >
      <Header />
      <BrandMain
        className={home ? "flex min-h-0 flex-1 flex-col overflow-hidden" : undefined}
      >
        {children}
      </BrandMain>
      {home ? null : <Footer />}
    </div>
  );
}
