import { content } from '../content/content'
import { Container } from '../components/ui/Container'

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-black py-12">
      <Container className="flex flex-col gap-8 text-center sm:text-left">
        <p className="font-display text-2xl font-black uppercase leading-[0.82] tracking-tight text-white">
          Game
          <span className="block tracking-[0.24em]">Gabyte</span>
        </p>
        <div className="grid gap-8 sm:grid-cols-[repeat(3,minmax(0,1fr))]">
          {content.footer.columns.map((column) => (
            <div key={column.title}>
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-white/48">{column.title}</p>
              <nav className="mt-4 flex flex-col gap-3 text-sm text-white/50">
                {column.links.map((link) => (
                  <a key={link} href="#" className="transition hover:text-accent">
                    {link}
                  </a>
                ))}
              </nav>
            </div>
          ))}
        </div>
        <p className="text-sm text-white/40">{content.footer.tagline}</p>
      </Container>
    </footer>
  )
}
