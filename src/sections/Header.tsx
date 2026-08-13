import { useEffect, useState } from 'react'
import { GamegabyteLogo } from '../components/brand/GamegabyteLogo'
import { content } from '../content/content'
import { Button } from '../components/ui/Button'
import { ArrowUpRight } from '../components/ui/ArrowUpRight'

// Stable identity so the observer below is not torn down on every render.
// Only in-page anchors: an absolute URL is not a valid CSS selector and would
// make querySelector throw.
const NAV_HREFS = content.nav.filter((item) => item.href.startsWith('#')).map((item) => item.href)

/** Highlights the nav item whose section currently owns the viewport. */
function useActiveSection(hrefs: readonly string[]) {
  const [active, setActive] = useState(hrefs[0])

  useEffect(() => {
    const targets = hrefs
      .map((href) => document.querySelector(href))
      .filter((el): el is Element => el !== null)
    if (!targets.length) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        if (visible) setActive(`#${visible.target.id}`)
      },
      { rootMargin: '-30% 0px -55% 0px', threshold: [0, 0.25, 0.5, 1] },
    )
    targets.forEach((target) => observer.observe(target))
    return () => observer.disconnect()
  }, [hrefs])

  return active
}

export function Header() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const active = useActiveSection(NAV_HREFS)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // While the mobile sheet is open, trap the page behind it and honour Escape.
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
    <header
      data-export="header"
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled || open
          ? 'border-b border-white/10 bg-ink/85 backdrop-blur-xl'
          : 'border-b border-transparent bg-transparent'
      }`}
    >
      <div className="mx-auto flex h-20 max-w-[1440px] items-center justify-between px-5 sm:px-12">
        <a href="#home" aria-label="Gamegabyte Studio home">
          <GamegabyteLogo className="h-8 sm:h-10 lg:h-11" />
        </a>

        <nav className="hidden items-center gap-10 font-mono text-xs uppercase tracking-[0.16em] lg:flex">
          {content.nav.map((item) => {
            const { label, href } = item
            const external = 'external' in item && item.external
            const isActive = !external && href === active
            return (
              <a
                key={label}
                href={href}
                {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                aria-current={isActive ? 'page' : undefined}
                className={`relative flex items-center gap-1.5 py-2 transition-colors ${
                  isActive ? 'text-accent' : 'text-white/70 hover:text-white'
                }`}
              >
                {label}
                {external && <ArrowUpRight className="h-3 w-3" />}
                <span
                  aria-hidden="true"
                  className={`absolute inset-x-0 -bottom-px h-px origin-left bg-accent transition-transform duration-300 ${
                    isActive ? 'scale-x-100' : 'scale-x-0'
                  }`}
                />
              </a>
            )
          })}
        </nav>

        <div className="hidden lg:block">
          <Button href="#contact" showArrow>
            Let's talk
          </Button>
        </div>

        <button
          type="button"
          className="inline-flex h-11 w-11 cursor-pointer items-center justify-center text-white lg:hidden"
          aria-label={open ? 'Close navigation' : 'Open navigation'}
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
        >
          <span className="relative block h-5 w-6">
            <span className={`absolute left-0 top-0 h-0.5 w-6 bg-current transition ${open ? 'translate-y-2 rotate-45' : ''}`} />
            <span className={`absolute left-0 top-2 h-0.5 w-6 bg-current transition ${open ? 'opacity-0' : ''}`} />
            <span className={`absolute left-0 top-4 h-0.5 w-6 bg-current transition ${open ? '-translate-y-2 -rotate-45' : ''}`} />
          </span>
        </button>
      </div>

      {open && (
        <div className="border-t border-white/10 bg-ink lg:hidden">
          <nav className="mx-auto flex max-w-[1440px] flex-col gap-2 px-5 py-6 sm:px-12">
            {content.nav.map((item) => {
              const { label, href } = item
              const external = 'external' in item && item.external
              const isActive = !external && href === active
              return (
                <a
                  key={label}
                  href={href}
                  {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                  aria-current={isActive ? 'page' : undefined}
                  className={`flex min-h-12 items-center gap-2 border-b border-white/8 font-mono text-sm uppercase tracking-[0.16em] transition-colors ${
                    isActive ? 'text-accent' : 'text-white hover:text-accent'
                  }`}
                  onClick={() => setOpen(false)}
                >
                  {label}
                  {external && <ArrowUpRight className="h-3 w-3" />}
                </a>
              )
            })}
            <div className="pt-4">
              <Button href="#contact" showArrow className="w-full">
                Let's talk
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
