import type { ReactNode } from 'react'
import { Reveal } from '../motion/Reveal'
import { sectionById, type SectionId } from '../../content/sections'

/**
 * The page's one section layout: a sidehead. The title sits in a column beside
 * its content instead of above it, and holds station while the body scrolls.
 *
 * The split and the heading size move together, because the type sets the
 * floor. `CAPABILITIES.` is the widest unbreakable line on the page — 359px at
 * 52px type — and a 30% column is 376px at 1440.
 *
 * The `vw` term matters more than the cap. Between the split turning on at
 * 1050px and the cap biting, the heading grows with the viewport at roughly the
 * same rate as its column, so too steep a slope clips at *every* width in that
 * band rather than at one. 3.6vw clipped from 1050 up to ~1428; 3.3vw clears the
 * whole range. Re-derive it if the split ratio or the copy changes.
 *
 * The index and eyebrow are read from the section registry rather than passed
 * in — free-string arguments are how numbering drifts out of order.
 */
export function SectionSplit({
  id,
  title,
  description,
  action,
  children,
}: {
  id: SectionId
  title: ReactNode
  description?: ReactNode
  action?: ReactNode
  children: ReactNode
}) {
  const { index, eyebrow } = sectionById(id)

  return (
    <div className="grid items-start gap-10 lg:grid-cols-[30%_minmax(0,1fr)] lg:gap-14">
      {/* Sticky so a tall body cannot scroll its own title out of view. Cleared
          by the 72px topbar plus a little air. */}
      <div className="lg:sticky lg:top-28">
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
          {description && <p className="mt-6 text-base leading-relaxed text-white/70">{description}</p>}
          {action && <div className="mt-8">{action}</div>}
        </Reveal>
      </div>

      {/* `min-w-0` or a wide child (the dossier rail, a long table row) pushes
          the track past its share and the split silently stops holding. */}
      <div className="min-w-0">{children}</div>
    </div>
  )
}
