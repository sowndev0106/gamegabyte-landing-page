import type { ReactNode } from 'react'

/**
 * The page's one surface recipe: a hairline border on a barely-lifted ground.
 * Twelve sections styled in utilities would otherwise each invent their own
 * near-identical panel and drift apart.
 */
export function Panel({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <div className={`border border-white/11 bg-white/[0.015] ${className}`}>{children}</div>
}
