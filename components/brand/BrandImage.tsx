import { cn } from "@/lib/cn";

type BrandImageProps = {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  priority?: boolean;
};

export default function BrandImage({
  src,
  alt,
  width,
  height,
  className,
  priority,
}: BrandImageProps) {
  return (
    // SVG는 next/image 최적화를 타면 깨질 수 있어 원본을 그대로 씁니다.
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      decoding="async"
      fetchPriority={priority ? "high" : "auto"}
      className={cn("object-contain", className)}
    />
  );
}
