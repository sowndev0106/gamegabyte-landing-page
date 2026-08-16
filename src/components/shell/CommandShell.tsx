import type { ReactNode } from 'react'
import { useMemo } from 'react'
import { SECTIONS } from '../../content/sections'
import { CommandRail } from './CommandRail'
import { CommandTopbar } from './CommandTopbar'
import { MobileCommandBar } from './MobileCommandBar'
import { useActiveSection } from './useActiveSection'

/**
 * The page frame. Everything that persists across the whole document lives
 * here — rail, topbar, mobile bar — so sections stay unaware of navigation.
 */
export function CommandShell({ children, footer }: { children: ReactNode; footer?: ReactNode }) {
  const ids = useMemo(() => SECTIONS.map((section) => section.id), [])
  const active = useActiveSection(ids)

  return (
    <>
      <a
        href="#main"
        className="fixed left-3 top-3 z-100 -translate-y-[160%] bg-accent px-5 py-3 font-mono text-[9px] uppercase tracking-[0.16em] text-ink focus:translate-y-0"
      >
        Skip to content
      </a>

      <CommandRail active={active} />
      <CommandTopbar />
      <MobileCommandBar active={active} />

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
