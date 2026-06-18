import { content } from '../content/content'
import { Button } from '../components/ui/Button'

const links = [
  ['Home', '#home'],
  ['Our Services', '#services'],
  ['GaByte Academy', '#academy'],
  ['Case Studies', '#portfolio'],
  ['About Us', '#why'],
] as const

export function Header() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-black/86 backdrop-blur">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 sm:px-8">
        <a href="#home" aria-label="Gamegabyte Studio home">
          <span className="block font-display text-2xl font-black uppercase leading-[0.82] tracking-tight text-white sm:text-3xl">
            Game
            <span className="block tracking-[0.24em]">Gabyte</span>
          </span>
        </a>
        <nav className="hidden items-center gap-10 text-sm font-medium uppercase text-white/82 lg:flex">
          {links.map(([label, href]) => (
            <a key={label} href={href} className={label === content.nav[0] ? 'text-accent' : 'transition hover:text-accent'}>
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
