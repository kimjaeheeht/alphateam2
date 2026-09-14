import type { Project } from "@/lib/projects";

/** 서비스 페이지 카피 스키마. 세 서비스가 같은 섹션 구조를 씁니다. */

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

export type ServiceCharacter = {
  src: string;
  title: string;
  body?: string;
};

export type ServiceCharacters = {
  name?: string;
  title?: string;
  body?: string;
  items: ServiceCharacter[];
};

export type ServicePageContent = {
  hero?: {
    title?: string;
    /** 히어로 스크린샷. 2장 이상이면 교체 모션이 돌아갑니다. */
    screens?: string[];
    device?: "phone" | "desktop";
    cta?: string;
    ctaSecondary?: string;
  };
  background?: ServiceSection;
  service?: ServiceSection;
  highlight?: ServiceSection;
  brand?: ServiceSection & {
    tokens?: ServiceToken[];
    /** 껄무새처럼 캐릭터 소개가 필요할 때만 둡니다. */
    characters?: ServiceCharacters;
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
