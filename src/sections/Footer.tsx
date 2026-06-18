import { content } from '../content/content'
import { Container } from '../components/ui/Container'
import { GamegabyteLogo } from '../components/brand/GamegabyteLogo'

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-black py-16 sm:py-24">
      <Container className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
        <div className="flex flex-col gap-4">
          <GamegabyteLogo className="w-fit" />
          <p className="mt-4 text-sm text-white/50">
            © {new Date().getFullYear()} Gamegabyte. All rights reserved.
          </p>
        </div>

        {content.footer.columns.map((column) => (
          <div key={column.title} className="flex flex-col gap-4">
            <h3 className="font-display text-lg font-semibold uppercase text-white tracking-wider">
              {column.title}
            </h3>
            <nav className="flex flex-col gap-3 text-sm">
              {column.links.map((link) => (
                <a key={link} href="#" className="text-white/65 transition hover:text-accent">
                  {link}
                </a>
              ))}
            </nav>
          </div>
        ))}
      </Container>
      
      <div className="border-t border-white/10 mt-12 pt-8 text-center text-sm text-white/40">
        <Container>
          <p>{content.footer.tagline}</p>
        </Container>
      </div>
    </footer>
  )
}
