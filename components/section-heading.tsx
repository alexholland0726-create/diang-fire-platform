type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  description?: string;
};

export function SectionHeading({ eyebrow, title, description }: SectionHeadingProps) {
  return (
    <div className="mx-auto mb-10 max-w-3xl text-center">
      <div className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-gold">
        {eyebrow}
      </div>
      <h2 className="text-3xl font-semibold tracking-normal text-ink md:text-4xl">{title}</h2>
      {description && <p className="mt-4 text-base leading-7 text-steel">{description}</p>}
    </div>
  );
}
