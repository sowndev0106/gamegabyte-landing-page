export function SectionHeading({ eyebrow, title, align = 'center' }: { eyebrow?: string; title: string; align?: 'left' | 'center' }) {
  return (
    <div className={`mb-12 ${align === 'center' ? 'text-center' : ''}`}>
      {eyebrow && <p className="mb-3 text-sm font-semibold uppercase tracking-[0.16em] text-accent">{eyebrow}</p>}
      <h2 className="font-display text-3xl font-bold leading-tight text-white sm:text-4xl md:text-5xl">{title}</h2>
    </div>
  )
}
