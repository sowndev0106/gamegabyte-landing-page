import type { ReactNode } from 'react'

/**
 * A mono label above a display-weight value — the telemetry voice of the page.
 * The value span carries `data-readout-value` so the QA harness can count and
 * read the figures without depending on class names.
 */
export function Readout({
  label,
  value,
  title,
  note,
  size = 'md',
}: {
  /** The mono index line above the figure, e.g. `02 / Experience`. */
  label: ReactNode
  value: ReactNode
  /** What the figure counts. Reads directly under it, before any footnote. */
  title?: ReactNode
  note?: ReactNode
  size?: 'md' | 'lg'
}) {
  return (
    <div>
      <span className="font-mono text-[9px] uppercase tracking-[0.22em] text-white/48">{label}</span>
      <span
        data-readout-value
        className={`mt-6 block font-display font-bold leading-[0.84] tracking-[-0.055em] text-accent-bright ${
          size === 'lg' ? 'text-[clamp(96px,14vw,188px)]' : 'text-[clamp(46px,5vw,68px)]'
        }`}
      >
        {value}
      </span>
      {title && (
        <p className="mt-5 font-display text-[13px] font-bold uppercase tracking-[0.13em] text-white">{title}</p>
      )}
      {note && (
        <p className="mt-3 font-mono text-[10px] uppercase leading-relaxed tracking-[0.105em] text-white/60">{note}</p>
      )}
    </div>
  )
}
