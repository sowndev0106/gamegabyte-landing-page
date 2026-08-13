/**
 * Four accent brackets that frame a panel like a viewfinder. Purely decorative,
 * so the whole set is hidden from assistive tech.
 */
export function CornerTicks({ size = 'h-4 w-4' }: { size?: string }) {
  // `contents` keeps the ticks positioned against the caller's own relative box
  // rather than this wrapper, so z-index on each tick actually applies.
  const base = `pointer-events-none absolute z-10 border-accent ${size}`
  return (
    <span aria-hidden="true" className="contents">
      <span className={`${base} -left-px -top-px border-l-2 border-t-2`} />
      <span className={`${base} -right-px -top-px border-r-2 border-t-2`} />
      <span className={`${base} -bottom-px -left-px border-b-2 border-l-2`} />
      <span className={`${base} -bottom-px -right-px border-b-2 border-r-2`} />
    </span>
  )
}
