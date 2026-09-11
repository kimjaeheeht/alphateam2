import { cn } from "@/lib/cn";

type PhoneFrameProps = {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
};

export default function PhoneFrame({
  src,
  alt,
  className,
  priority,
}: PhoneFrameProps) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-t-[1.75rem] bg-white shadow-[0_24px_80px_rgba(17,17,17,0.16)]",
        className,
      )}
    >
      {/* PNG 스크린샷은 SVG와 같이 원본을 그대로 씁니다. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        width={270}
        height={520}
        decoding="async"
        fetchPriority={priority ? "high" : "auto"}
        className="block w-full"
      />
    </div>
  );
}
