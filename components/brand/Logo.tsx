import { cn } from "@/lib/cn";
import type { Project } from "@/lib/projects";

type LogoProps = {
  project: Project;
  onDark?: boolean;
  className?: string;
  priority?: boolean;
};

export default function Logo({
  project,
  onDark = false,
  className,
  priority,
}: LogoProps) {
  return (
    // SVG는 next/image 최적화를 타면 깨질 수 있어 원본을 그대로 씁니다.
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={onDark ? project.assets.logoOnDark : project.assets.logo}
      alt={`${project.name} 로고`}
      width={180}
      height={48}
      decoding="async"
      fetchPriority={priority ? "high" : "auto"}
      className={cn("w-auto object-contain object-left", className ?? "h-8")}
    />
  );
}
