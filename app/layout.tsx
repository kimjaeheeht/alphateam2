import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";

import SiteLayout from "@/components/layout/SiteLayout";
import "@/styles/globals.css";

const pretendard = localFont({
  src: "./fonts/PretendardVariable.woff2",
  display: "swap",
  weight: "45 920",
  variable: "--font-pretendard",
  fallback: [
    "Pretendard",
    "-apple-system",
    "BlinkMacSystemFont",
    "system-ui",
    "sans-serif",
  ],
});

export const metadata: Metadata = {
  title: {
    default: "알파팀 2기 쇼케이스",
    template: "%s | 알파팀 2기 쇼케이스",
  },
  description: "알파팀 2기의 세 가지 서비스 쇼케이스",
};

export const viewport: Viewport = {
  colorScheme: "light",
  themeColor: "#ffffff",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="ko"
      className={`${pretendard.variable} h-full antialiased`}
    >
      <body className={`${pretendard.className} min-h-full bg-background text-foreground`}>
        <SiteLayout>{children}</SiteLayout>
      </body>
    </html>
  );
}
