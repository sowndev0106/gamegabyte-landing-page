import { useEffect, useState } from 'react'
import { content } from '../../content/content'
import { SECTIONS } from '../../content/sections'

/**
 * The below-md navigation. `aria-expanded`, `aria-controls` and the sheet's
 * `hidden` state are the contract the QA harness asserts against — keep them.
 */
export function MobileCommandBar({ active }: { active: string }) {
  const [open, setOpen] = useState(false)

  // While the sheet is open, trap the page behind it and honour Escape.
  useEffect(() => {
    if (!open) return
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false)
    }
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', onKey)
    }
  }, [open])

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 flex h-17.5 items-center justify-between border-b border-white/11 bg-ink/95 px-4.5 backdrop-blur-xl md:hidden">
        <a href="#home" className="font-display text-[15px] font-extrabold uppercase tracking-[0.08em]">
          {content.shell.brand}
        </a>
        <button
          type="button"
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((value) => !value)}
          className="min-h-10.5 min-w-12 cursor-pointer border border-white/11 font-mono text-[8px] uppercase tracking-[0.18em]"
        >
          {content.shell.menu}
        </button>
      </header>

      <nav
        id="mobile-menu"
        hidden={!open}
        aria-label="Command sections"
        className="fixed inset-x-0 top-17.5 z-49 grid grid-cols-2 border-b border-white/11 bg-ink/98 md:hidden"
      >
        {SECTIONS.map((section) => (
          <a
            key={section.id}
            href={`#${section.id}`}
            aria-current={active === section.id ? 'true' : undefined}
            onClick={() => setOpen(false)}
            className="border-b border-r border-white/11 px-4.5 py-4 font-mono text-[9px] uppercase tracking-[0.16em] text-white/70"
          >
            {section.index} / {section.label}
          </a>
        ))}
      </nav>
    </>
  )
}
