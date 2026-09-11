import { cn } from "@/lib/cn";

const variants = {
  "outline-white":
    "border-white bg-transparent text-white hover:bg-white/10",
  outline:
    "border-[#111] bg-transparent text-[#111] hover:bg-black/5",
  "solid-white":
    "border-white bg-white text-[var(--accent)] hover:opacity-90",
  "solid-accent":
    "border-transparent bg-[var(--accent)] text-[var(--on-accent)] hover:opacity-90",
  solid: "border-transparent bg-black text-white hover:opacity-80",
} as const;

type ButtonProps = {
  href: string;
  children: React.ReactNode;
  variant?: keyof typeof variants;
  className?: string;
  external?: boolean;
};

export default function Button({
  href,
  children,
  variant = "outline-white",
  className,
  external,
}: ButtonProps) {
  return (
    <a
      href={href}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-full border px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base font-medium",
        variants[variant],
        className,
      )}
      {...(external
        ? { target: "_blank", rel: "noopener noreferrer" }
        : undefined)}
    >
      {children}
    </a>
  );
}
