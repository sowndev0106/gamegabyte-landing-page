import type { ReactNode } from 'react'

/**
 * A mono label above a display-weight value — the telemetry voice of the page.
 * The value span carries `data-readout-value` so the QA harness can count and
 * read the figures without depending on class names.
 */
export function Readout({
  label,
  value,
  note,
  size = 'md',
}: {
  label: ReactNode
  value: ReactNode
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
      {note && (
        <p className="mt-3 font-mono text-[10px] uppercase leading-relaxed tracking-[0.105em] text-white/60">{note}</p>
      )}
    </div>
  )
}
