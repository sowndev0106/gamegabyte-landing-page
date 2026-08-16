import type { ReactNode } from 'react'

/**
 * A mono label above a display-weight value — the telemetry voice of the page.
 * The value span carries `data-readout-value` so the QA harness can count and
 * read the figures without depending on class names.
 */
export function Readout({
  label,
  value,
  unit,
  title,
  note,
  size = 'md',
}: {
  /** The mono index line above the figure, e.g. `02 / Speed`. */
  label: ReactNode
  value: ReactNode
  /**
   * The dimension of a figure that is not a bare count — `Days`, `Week`. Set in
   * the same display voice one step down rather than in mono, so `3 DAYS` still
   * reads as one figure and not as a figure with a caption stuck to it. It is
   * inside `data-readout-value` on purpose: the QA harness reads the figure the
   * way a visitor does, unit included.
   */
  unit?: ReactNode
  /** What the figure counts. Reads directly under it, before any footnote. */
  title?: ReactNode
  note?: ReactNode
  size?: 'md' | 'lg'
}) {
  const isLg = size === 'lg'

  return (
    <div>
      <span className="font-mono text-[9px] uppercase tracking-[0.22em] text-white/48">{label}</span>
      {/* The `md` slope is derived, not picked. A supporting cell in the
          telemetry board is 0.28 of the 70% body column, so its inner width
          runs from ~115px at the `lg` breakpoint to ~193px at 1440 — and
          `100%`, the widest figure, is ~2.5em. 3.6vw clears that at every width
          in the band; a steeper slope clips at 1050 while looking fine at 1440.
          Re-derive it if the split ratio, the cell padding or the widest figure
          changes. */}
      <span
        data-readout-value
        className={`block font-display font-bold leading-[0.84] tracking-[-0.055em] text-accent-bright ${
          isLg ? 'mt-6 text-[clamp(72px,8.4vw,124px)]' : 'mt-4 text-[clamp(32px,3.6vw,52px)]'
        }`}
      >
        {value}
        {/* A non-breaking space, not a margin: the gap has to exist in
            `textContent` too, or the figure reads as `3Days` to a screen reader
            and to the QA harness. Non-breaking so `1 WEEK` cannot wrap. */}
        {unit && (
          <>
            {' '}
            <span className="text-[0.46em] uppercase tracking-[-0.03em]">{unit}</span>
          </>
        )}
      </span>
      {title && (
        <p
          className={`font-display text-[13px] font-bold uppercase tracking-[0.13em] text-white ${
            isLg ? 'mt-5' : 'mt-4'
          }`}
        >
          {title}
        </p>
      )}
      {note && (
        <p
          className={`font-mono text-[9px] uppercase leading-relaxed tracking-[0.16em] text-white/60 ${
            isLg ? 'mt-3' : 'mt-2'
          }`}
        >
          {note}
        </p>
      )}
    </div>
  )
}
