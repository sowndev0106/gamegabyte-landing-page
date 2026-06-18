import { content } from '../content/content'
import { Container } from '../components/ui/Container'

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-black py-12">
      <Container className="flex flex-col items-center gap-8 text-center sm:flex-row sm:justify-between sm:text-left">
        <p className="font-display text-2xl font-black uppercase leading-[0.82] tracking-tight text-white">
          Game
          <span className="block tracking-[0.24em]">Gabyte</span>
        </p>
        <nav className="flex flex-wrap justify-center gap-x-6 gap-y-3 text-sm text-white/50">
          {content.footer.links.map((link) => (
            <a key={link} href="#" className="transition hover:text-accent">
              {link}
            </a>
          ))}
        </nav>
        <p className="text-sm text-white/40">{content.footer.tagline}</p>
      </Container>
    </footer>
  )
}
