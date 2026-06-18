import { useState } from 'react'
import { GamegabyteLogo } from '../components/brand/GamegabyteLogo'
import { content } from '../content/content'
import { Button } from '../components/ui/Button'

export function Header() {
  const [open, setOpen] = useState(false)

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-black">
      <div className="mx-auto flex h-20 max-w-[1440px] items-center justify-between px-5 sm:px-12">
        <a href="#home" aria-label="Gamegabyte Studio home">
          <GamegabyteLogo className="scale-[0.72] origin-left sm:scale-[0.88] lg:scale-100" />
        </a>
        <nav className="hidden items-center gap-12 text-sm font-medium uppercase text-white/86 lg:flex">
          {content.nav.map(({ label, href }) => (
            <a
              key={label}
              href={href}
              aria-current={href === '#home' ? 'page' : undefined}
              className={href === '#home' ? 'text-accent' : 'transition hover:text-accent'}
            >
              {label}
            </a>
          ))}
        </nav>
        <div className="hidden lg:block">
          <Button href="#contact" showArrow>
            Let's talk
          </Button>
        </div>
        <button
          type="button"
          className="inline-flex h-11 w-11 items-center justify-center text-white lg:hidden"
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
        <div className="border-t border-white/10 bg-black lg:hidden">
          <nav className="mx-auto flex max-w-[1440px] flex-col gap-6 px-5 py-6 text-sm font-medium uppercase text-white sm:px-12">
            {content.nav.map(({ label, href }) => (
              <a
                key={label}
                href={href}
                aria-current={href === '#home' ? 'page' : undefined}
                className={href === '#home' ? 'text-accent' : 'transition hover:text-accent'}
                onClick={() => setOpen(false)}
              >
                {label}
              </a>
            ))}
            <div className="pt-2">
              <Button href="#contact" showArrow>
                Let's talk
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
