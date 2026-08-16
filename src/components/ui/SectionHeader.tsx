import type { ReactNode } from 'react'
import { Reveal } from '../motion/Reveal'
import { sectionById, type SectionId } from '../../content/sections'

/**
 * The page's one section-header pattern: marker, heading and supporting
 * sentence stacked against the page's single left edge.
 *
 * Flush left on purpose. An earlier revision hung the marker in its own 240px
 * margin column, which pushed every heading 288px inwards; the page's largest
 * type then read as drifting toward the centre while the hero — the one section
 * with a flush-left headline — stayed at the edge. One left edge for the whole
 * page is the spine, and nothing gets to sit off it.
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
      <div className="mb-10 lg:mb-14">
        <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-accent">
          <span aria-hidden="true" className="text-white/45">
            [{index}]
          </span>{' '}
          {eyebrow}
        </p>
        <h2 className="mt-5 font-display text-[clamp(38px,6vw,84px)] font-extrabold uppercase leading-[0.86] tracking-tighter text-white">
          {title}
        </h2>
        {description && <p className="mt-6 max-w-xl text-base leading-relaxed text-white/70">{description}</p>}
        {action && <div className="mt-8">{action}</div>}
      </div>
    </Reveal>
  )
}
