import { content } from '../content/content'
import { Stagger, StaggerItem } from '../components/motion/Stagger'
import { Container } from '../components/ui/Container'
import { GamegabyteLogo } from '../components/brand/GamegabyteLogo'

export function Footer() {
  return (
    <footer data-export="footer" className="border-t border-white/10 bg-ink py-16 sm:py-20">
      <Stagger className="mx-auto grid w-full max-w-6xl gap-12 px-5 sm:grid-cols-2 sm:px-6 lg:grid-cols-4">
        <StaggerItem className="flex flex-col gap-5">
          <GamegabyteLogo className="w-fit" />
          <p className="max-w-xs text-sm leading-relaxed text-white/60">
            A game marketing studio building launch pages, campaigns and interfaces for game teams.
          </p>
        </StaggerItem>

        {content.footer.columns.map((column) => (
          <StaggerItem key={column.title} className="flex flex-col gap-5">
            <h3 className="font-mono text-[11px] uppercase tracking-[0.24em] text-white/55">
              {column.title}
            </h3>
            <nav className="flex flex-col gap-3 text-sm">
              {column.links.map((link) => (
                <a key={link} href="#" className="w-fit text-white/75 transition hover:text-accent">
                  {link}
                </a>
              ))}
            </nav>
          </StaggerItem>
        ))}
      </Stagger>

      <Container className="mt-14 border-t border-white/8 pt-8">
        <div className="flex flex-col items-center gap-6 sm:flex-row sm:justify-between">
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-white/50">
            © {new Date().getFullYear()} Gamegabyte — All rights reserved
          </p>
          <nav aria-label="Social media" className="flex flex-wrap items-center justify-center gap-x-6 gap-y-1">
            {content.footer.social.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="inline-flex min-h-11 items-center font-mono text-[11px] uppercase tracking-[0.18em] text-white/70 transition hover:text-accent"
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>
      </Container>
    </footer>
  )
}
