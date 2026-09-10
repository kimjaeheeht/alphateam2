import BrandImage from "@/components/brand/BrandImage";
import { cn } from "@/lib/cn";

type CaseVisualProps = {
  src: string;
  alt: string;
  background?: string;
  className?: string;
};

export default function CaseVisual({
  src,
  alt,
  background = "#f4f6fa",
  className,
}: CaseVisualProps) {
  return (
    <div
      className={cn(
        "flex aspect-[16/10] items-center justify-center px-8 py-12",
        className,
      )}
      style={{ background }}
    >
      <BrandImage
        src={src}
        alt={alt}
        width={280}
        height={120}
        className="h-20 w-auto sm:h-28"
      />
    </div>
  );
}
