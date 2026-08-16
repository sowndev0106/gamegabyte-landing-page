import type { ReactNode } from 'react'
import { useMemo } from 'react'
import { SECTIONS, shellPath } from '../../content/sections'
import { CommandRail } from './CommandRail'
import { CommandTopbar } from './CommandTopbar'
import { MobileCommandBar } from './MobileCommandBar'
import { useActiveSection } from './useActiveSection'

/**
 * The page frame. Everything that persists across the whole document lives
 * here — rail, topbar, mobile bar — so sections stay unaware of navigation.
 */
export function CommandShell({
  children,
  footer,
  base = '',
}: {
  children: ReactNode
  footer?: ReactNode
  /**
   * Prefix for every section link. Empty on the homepage, where the sections
   * are on this document; `/` on the work pages, where `#services` alone would
   * point at an anchor that is not here.
   */
  base?: string
}) {
  const ids = useMemo(() => SECTIONS.map((section) => section.id), [])
  const observed = useActiveSection(ids)
  // Off the homepage none of those sections exist, so nothing is being read
  // and the rail shows no active tick rather than a stale one. The path readout
  // is the one thing that must NOT go quiet with it — see `shellPath`.
  const active = base ? '' : observed
  const path = shellPath(active, typeof location === 'undefined' ? '/' : location.pathname)

  return (
    <>
      <a
        href="#main"
        className="fixed left-3 top-3 z-100 -translate-y-[160%] bg-accent px-5 py-3 font-mono text-[9px] uppercase tracking-[0.16em] text-ink focus:translate-y-0"
      >
        Skip to content
      </a>

      <CommandRail active={active} base={base} />
      <CommandTopbar active={active} base={base} path={path} />
      <MobileCommandBar active={active} base={base} />

      {/* The footer sits beside `main`, not inside it — it is not page content. */}
      <div className="md:ml-23">
        <main id="main" className="min-h-screen bg-ink text-white">
          {children}
        </main>
        {footer}
      </div>
    </>
  )
}
