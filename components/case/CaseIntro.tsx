import BrandImage from "@/components/brand/BrandImage";
import CaseCta from "@/components/case/CaseCta";

type CaseIntroProps = {
  logo: string;
  name: string;
  meta: { label: string; value: string }[];
  body: string[];
  note?: string;
  cta: string;
  href: string;
};

export default function CaseIntro({
  logo,
  name,
  meta,
  body,
  note,
  cta,
  href,
}: CaseIntroProps) {
  return (
    <section className="bg-white py-20 sm:py-28">
      <div className="mx-auto w-full max-w-2xl px-5 sm:px-8">
        <h2>
          <BrandImage
            src={logo}
            alt={name}
            width={240}
            height={72}
            className="h-11 w-auto sm:h-14"
          />
        </h2>
        <dl className="mt-12 grid grid-cols-3 gap-6">
          {meta.map((item) => (
            <div key={item.label}>
              <dt className="border-b border-black pb-2 text-[11px] font-medium tracking-[0.14em]">
                {item.label}
              </dt>
              <dd className="mt-3 text-sm leading-6">{item.value}</dd>
            </div>
          ))}
        </dl>
        <div className="mt-12 space-y-5 text-[15px] leading-8 text-[#555]">
          {body.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
        {note ? (
          <p className="mt-6 text-sm text-[#888]">{note}</p>
        ) : null}
        <div className="mt-12">
          <CaseCta href={href}>{cta}</CaseCta>
        </div>
      </div>
    </section>
  );
}
