import {
  Camera,
  Heart,
  ImageIcon,
  Lightbulb,
  ListChecks,
  MapPin,
  RefreshCw,
  Rocket,
  ScanSearch,
  Search,
  Share2,
  Upload,
  type LucideIcon,
} from "lucide-react";

/** 콘텐츠의 icon 문자열과 Lucide 아이콘을 연결합니다. */
const icons: Record<string, LucideIcon> = {
  Camera,
  Heart,
  ImageIcon,
  Lightbulb,
  ListChecks,
  MapPin,
  RefreshCw,
  Rocket,
  ScanSearch,
  Search,
  Share2,
  Upload,
};

/** 카드 icon 이름으로 Lucide 아이콘을 그립니다. */
export function ServiceIcon({
  name,
  className,
}: {
  name: string;
  className?: string;
}) {
  const Icon = icons[name];
  if (!Icon) return null;
  return <Icon className={className} aria-hidden="true" />;
}
