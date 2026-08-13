import type { ReactNode } from 'react'
import { Reveal } from '../motion/Reveal'

/**
 * The page's one section-header pattern: a monospaced index + label, a display
 * heading on the left, and the supporting copy set beside it on wide screens.
 * Asymmetric on purpose — a column of centred headings reads as a template.
 */
export function SectionHeader({
  index,
  eyebrow,
  title,
  description,
  action,
}: {
  /** Two-digit section marker, e.g. "03". */
  index: string
  eyebrow: string
  title: ReactNode
  description?: ReactNode
  action?: ReactNode
}) {
  return (
    <Reveal>
      <div className="mb-12 grid gap-6 border-b border-white/8 pb-8 lg:mb-16 lg:grid-cols-12 lg:items-end lg:gap-10">
        <div className="lg:col-span-7">
          <p className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.28em] text-accent">
            <span aria-hidden="true" className="text-white/55">[{index}]</span>
            {eyebrow}
          </p>
          <h2 className="mt-5 font-display text-4xl font-bold uppercase leading-[0.95] tracking-tight text-white sm:text-5xl lg:text-6xl">
            {title}
          </h2>
        </div>
        {(description || action) && (
          <div className="flex flex-col items-start gap-6 lg:col-span-5 lg:items-end lg:text-right">
            {description && <p className="max-w-md text-base leading-relaxed text-white/70">{description}</p>}
            {action}
          </div>
        )}
      </div>
    </Reveal>
  )
}
