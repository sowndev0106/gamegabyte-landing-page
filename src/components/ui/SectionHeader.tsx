import type { ReactNode } from 'react'
import { Reveal } from '../motion/Reveal'
import { sectionById, type SectionId } from '../../content/sections'

/**
 * The page's one section-header pattern: the marker sits directly above the
 * heading, both flush to the page's left edge, and the supporting sentence sits
 * in a capped column to the right, resting on the heading's baseline.
 *
 * The heading is flush left on purpose. An earlier revision hung the marker in
 * its own 240px margin column, which pushed every heading 288px inwards; the
 * page's largest type then read as drifting toward the centre while the hero —
 * the one section with a flush-left headline — stayed at the edge. One left
 * edge for the whole page is the spine, and nothing gets to sit off it.
 *
 * The sentence moves right rather than stacking under the heading so the header
 * stays short and the width beside a big display line is doing something.
 *
 * The index and eyebrow are read from the section registry rather than passed
 * in — free-string arguments are how numbering drifts out of order.
 */
export function SectionHeader({
  id,
  title,
  description,
  action,
}: {
  id: SectionId
  title: ReactNode
  description?: ReactNode
  action?: ReactNode
}) {
  const { index, eyebrow } = sectionById(id)

  return (
    <Reveal>
      <div className="mb-10 grid items-end gap-6 lg:mb-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,360px)] lg:gap-12">
        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-accent">
            <span aria-hidden="true" className="text-white/45">
              [{index}]
            </span>{' '}
            {eyebrow}
          </p>
          {/* Down from clamp(38px,6vw,84px). At 84 the heading was the loudest
              thing on every screen and left no room to move into a column. */}
          <h2 className="mt-5 font-display text-[clamp(30px,4.2vw,60px)] font-extrabold uppercase leading-[0.9] tracking-tighter text-white">
            {title}
          </h2>
        </div>
        {(description || action) && (
          // `pb-2` lifts the sentence off the true baseline so it sits with the
          // heading's last line rather than under its descenders.
          <div className="lg:pb-2">
            {description && <p className="text-base leading-relaxed text-white/70">{description}</p>}
            {action && <div className="mt-8">{action}</div>}
          </div>
        )}
      </div>
    </Reveal>
  )
}
