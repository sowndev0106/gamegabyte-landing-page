import type { ReactNode } from 'react'

/** The page's one content measure. Wider than a reading column on purpose — the
 *  Command OS layouts are structural, not editorial. */
export function Container({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-330 px-4.5 md:px-12 ${className}`}>{children}</div>
}
