/**
 * Accent brackets that frame a panel like a viewfinder. Purely decorative, so
 * the whole set is hidden from assistive tech.
 *
 * `diagonal` marks only the top-left and bottom-right, which reads as a feed
 * under observation rather than a fully boxed frame.
 */
export function CornerTicks({
  size = 'h-4 w-4',
  corners = 'all',
}: {
  size?: string
  corners?: 'all' | 'diagonal'
}) {
  // `contents` keeps the ticks positioned against the caller's own relative box
  // rather than this wrapper, so z-index on each tick actually applies.
  const base = `pointer-events-none absolute z-10 border-accent ${size}`
  return (
    <span aria-hidden="true" className="contents">
      <span className={`${base} -top-px -left-px border-t-2 border-l-2`} />
      {corners === 'all' && <span className={`${base} -top-px -right-px border-t-2 border-r-2`} />}
      {corners === 'all' && <span className={`${base} -bottom-px -left-px border-b-2 border-l-2`} />}
      <span className={`${base} -right-px -bottom-px border-r-2 border-b-2`} />
    </span>
  )
}
