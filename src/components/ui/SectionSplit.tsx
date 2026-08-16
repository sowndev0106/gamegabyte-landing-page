import type { ReactNode } from 'react'
import { Reveal } from '../motion/Reveal'
import { sectionById, type SectionId } from '../../content/sections'

/**
 * Two section arrangements, and only two. A section picks one; it does not
 * invent a third.
 *
 * `split` (default) is a sidehead: the title sits in a 30% column beside its
 * content, and the two scroll together as one block. It suits a body made of
 * cells and readings, where the title is a label for a system.
 *
 * `stacked` gives the body the full measure and banners the title above it. Use
 * it where the content is imagery that a 70% column would waste — the reel and
 * the archive — not as an escape hatch when a split feels awkward.
 *
 * The split ratio and the heading size are one decision, because the type sets
 * the floor. `CAPABILITIES.` is the widest unbreakable line on the page — 359px
 * at 52px type — and a 30% column is 376px at 1440.
 *
 * The `vw` term matters more than the cap. Between the split turning on at
 * 1050px and the cap biting, the heading grows with the viewport at roughly the
 * same rate as its column, so too steep a slope clips at *every* width in that
 * band rather than at one. 3.6vw clipped from 1050 up to ~1428; 3.3vw clears the
 * whole range. Re-derive it if the ratio or the copy changes.
 *
 * The heading size is the same in both arrangements on purpose: a stacked
 * section has the width for a larger one, but two heading sizes on one page
 * read as two levels of importance that do not exist.
 *
 * The index and eyebrow are read from the section registry rather than passed
 * in — free-string arguments are how numbering drifts out of order.
 */
export function SectionSplit({
  id,
  title,
  description,
  action,
  layout = 'split',
  children,
}: {
  id: SectionId
  title: ReactNode
  description?: ReactNode
  action?: ReactNode
  layout?: 'split' | 'stacked'
  children: ReactNode
}) {
  const { index, eyebrow } = sectionById(id)

  const heading = (
    <Reveal>
      <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-accent">
        <span aria-hidden="true" className="text-white/45">
          [{index}]
        </span>{' '}
        {eyebrow}
      </p>
      <h2 className="mt-5 font-display text-[clamp(30px,3.3vw,52px)] font-extrabold uppercase leading-[0.9] tracking-tighter text-white">
        {title}
      </h2>
    </Reveal>
  )

  if (layout === 'stacked') {
    return (
      <>
        <div className="mb-10 grid items-end gap-6 lg:mb-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,360px)] lg:gap-14">
          {heading}
          {(description || action) && (
            // `pb-2` sets the sentence on the heading's last line rather than
            // under its descenders.
            <div className="lg:pb-2">
              {description && <p className="text-base leading-relaxed text-white/70">{description}</p>}
              {action && <div className="mt-8">{action}</div>}
            </div>
          )}
        </div>
        {children}
      </>
    )
  }

  return (
    <div className="grid items-start gap-10 lg:grid-cols-[30%_minmax(0,1fr)] lg:gap-14">
      <div>
        {heading}
        {(description || action) && (
          <Reveal>
            {description && <p className="mt-6 text-base leading-relaxed text-white/70">{description}</p>}
            {action && <div className="mt-8">{action}</div>}
          </Reveal>
        )}
      </div>

      {/* `min-w-0` or a wide child (the dossier rail, a long table row) pushes
          the track past its share and the split silently stops holding. */}
      <div className="min-w-0">{children}</div>
    </div>
  )
}
