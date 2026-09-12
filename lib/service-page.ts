import type { Project } from "@/lib/projects";

/** 서비스 쇼케이스 카피 스키마. 세 서비스가 같은 섹션 구조를 씁니다. */

export type ServiceItem = {
  icon?: string;
  title?: string;
  body?: string;
  step?: string;
};

export type ServiceSection = {
  name?: string;
  title?: string;
  body?: string;
  items?: ServiceItem[];
};

export type ServiceToken = {
  label: string;
  value: string;
};

export type ServicePageContent = {
  hero?: {
    title?: string;
    body?: string;
    screen?: string;
    /** 쇼케이스 모바일 구간에서 쓰는 PC 캡처. 비율이 다를 때 넣습니다. */
    screenSm?: string;
    device?: "phone" | "desktop";
    cta?: string;
    ctaSecondary?: string;
  };
  background?: ServiceSection;
  service?: ServiceSection;
  highlight?: ServiceSection;
  brand?: ServiceSection & {
    tokens?: ServiceToken[];
  };
  closing?: {
    title?: string;
    body?: string;
    cta?: string;
  };
};

export type ServicePageProps = {
  project: Project;
  content: ServicePageContent;
  prev?: Project;
  next?: Project;
};
