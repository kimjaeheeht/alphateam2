import {
  Camera,
  ImageIcon,
  Lightbulb,
  ListChecks,
  MapPin,
  ScanSearch,
  Search,
  Share2,
  Upload,
  type LucideIcon,
} from "lucide-react";

const icons: Record<string, LucideIcon> = {
  Camera,
  ImageIcon,
  Lightbulb,
  ListChecks,
  MapPin,
  ScanSearch,
  Search,
  Share2,
  Upload,
};

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
