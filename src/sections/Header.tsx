import { content } from '../content/content'
import { Button } from '../components/ui/Button'

export function Header() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-black">
      <div className="mx-auto flex h-20 max-w-[1440px] items-center justify-between px-5 sm:px-12">
        <a href="#home" aria-label="Gamegabyte Studio home">
          <span className="block font-display text-[28px] font-black uppercase leading-[0.78] tracking-tight text-white sm:text-[32px]">
            Game
            <span className="block text-[13px] tracking-[0.42em] sm:text-[15px]">Gabyte</span>
          </span>
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
        <div className="hidden sm:block">
          <Button href="#contact">Let's talk</Button>
        </div>
      </div>
    </header>
  )
}
