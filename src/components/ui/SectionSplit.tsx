import type { ReactNode } from 'react'
import { Reveal } from '../motion/Reveal'
import { sectionById, type SectionId } from '../../content/sections'

/**
 * The page's one section layout: a sidehead. The title sits in a column beside
 * its content instead of above it, and holds station while the body scrolls.
 *
 * The 38% split is set by the type, not by taste. At the section heading's
 * 60px, the widest unbreakable line on the page — `CAPABILITIES.` — measures
 * 418px. A 33% column is 413px at 1440, so it clips; 38% is 476px and leaves
 * enough slack for longer copy later. Narrowing the column means shrinking the
 * heading with it: 33% needs 48px type, 25% needs 40px.
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
    <div className="grid items-start gap-10 lg:grid-cols-[38%_minmax(0,1fr)] lg:gap-14">
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
          <h2 className="mt-5 font-display text-[clamp(30px,4.2vw,60px)] font-extrabold uppercase leading-[0.9] tracking-tighter text-white">
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
