type CaseTagsProps = {
  tags: string[];
};

export default function CaseTags({ tags }: CaseTagsProps) {
  return (
    <section className="bg-white pb-20 sm:pb-28">
      <div className="mx-auto flex max-w-2xl flex-wrap items-center gap-2 px-5 sm:px-8">
        <span className="rounded-full bg-black px-3 py-1 text-[11px] text-white">
          Tag
        </span>
        {tags.map((tag) => (
          <span key={tag} className="text-sm text-[#666]">
            #{tag}
          </span>
        ))}
      </div>
    </section>
  );
}
