import type { ReactNode } from 'react'
import { Reveal } from '../motion/Reveal'
import { sectionById, type SectionId } from '../../content/sections'

/**
 * The page's one section-header pattern: a monospaced marker in a narrow left
 * column, the display heading beside it.
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
      <div className="mb-10 grid gap-6 lg:mb-14 lg:grid-cols-[minmax(0,240px)_minmax(0,1fr)] lg:gap-12">
        <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-accent">
          <span aria-hidden="true" className="text-white/45">
            [{index}]
          </span>{' '}
          {eyebrow}
        </p>
        <div>
          <h2 className="font-display text-[clamp(38px,6vw,84px)] font-extrabold uppercase leading-[0.86] tracking-[-0.05em] text-white">
            {title}
          </h2>
          {description && <p className="mt-6 max-w-xl text-base leading-relaxed text-white/70">{description}</p>}
          {action && <div className="mt-8">{action}</div>}
        </div>
      </div>
    </Reveal>
  )
}
