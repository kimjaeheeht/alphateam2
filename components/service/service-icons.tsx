import {
  Bot,
  Camera,
  CircleHelp,
  Code,
  Frown,
  ImageIcon,
  KeyRound,
  Lightbulb,
  LineChart,
  ListChecks,
  MapPin,
  MessageCircle,
  ScanSearch,
  Search,
  Share2,
  SlidersHorizontal,
  Store,
  Trophy,
  Upload,
  type LucideIcon,
} from "lucide-react";

/** 콘텐츠의 icon 문자열과 Lucide 아이콘을 연결합니다. */
const icons: Record<string, LucideIcon> = {
  Bot,
  Camera,
  CircleHelp,
  Code,
  Frown,
  ImageIcon,
  KeyRound,
  Lightbulb,
  LineChart,
  ListChecks,
  MapPin,
  MessageCircle,
  ScanSearch,
  Search,
  Share2,
  SlidersHorizontal,
  Store,
  Trophy,
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
