import type { ReactNode } from 'react'

/**
 * The page's gutter, not a centred measure.
 *
 * This used to cap at 1320px and centre. That put every section on a different
 * left edge from the hero, which is full-bleed off the rail — and the mismatch
 * grew with the viewport: 14px at 1440, 221px at 1853, 574px at 2560. On a page
 * whose whole structure reads from one left edge, the largest type drifting
 * toward the centre on wide screens was the single worst thing about it.
 *
 * Pinning the cap to the left instead of centring fixed the edges but left
 * 1148px of dead space on the right at 2560. Dropping the cap fixes both: every
 * section starts where the hero starts, at any width, with no void.
 */
export function Container({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <div className={`w-full px-4.5 md:px-12 ${className}`}>{children}</div>
}
