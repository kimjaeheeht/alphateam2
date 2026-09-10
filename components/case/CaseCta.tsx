import { ArrowRight } from "lucide-react";

type CaseCtaProps = {
  href: string;
  children: React.ReactNode;
};

export default function CaseCta({ href, children }: CaseCtaProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-3 bg-black px-7 py-3.5 text-sm text-white transition-opacity hover:opacity-80"
    >
      {children}
      <ArrowRight className="size-4" aria-hidden="true" />
    </a>
  );
}
