import { content } from '../content/content'
import { Stagger, StaggerItem } from '../components/motion/Stagger'
import { Container } from '../components/ui/Container'
import { GamegabyteLogo } from '../components/brand/GamegabyteLogo'

export function Footer() {
  return (
    <footer data-export="footer" className="border-t border-white/11 bg-ink py-15 md:py-20">
      <Container>
        <Stagger className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <StaggerItem className="col-span-full flex flex-col gap-5 lg:col-span-1">
            <GamegabyteLogo className="h-9 w-auto" />
            <p className="max-w-xs text-sm leading-relaxed text-white/60">
              A game marketing studio building launch pages, campaigns and interfaces for game teams.
            </p>
          </StaggerItem>

          {content.footer.columns.map((column) => (
            <StaggerItem key={column.title} data-footer-column className="flex flex-col gap-5">
              <h3 className="font-mono text-[9px] uppercase tracking-[0.22em] text-accent">{column.title}</h3>
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

        <div className="mt-14 flex flex-col gap-6 border-t border-white/11 pt-8 md:flex-row md:items-center md:justify-between">
          <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-white/50">
            © {new Date().getFullYear()} Gamegabyte — All rights reserved
          </p>
          <nav aria-label="Social media" className="flex flex-wrap items-center gap-x-6 gap-y-1">
            <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-white/40">
              {content.footer.tagline}
            </span>
            {content.footer.social.map((item) => (
              <a
                key={item.label}
                href={item.href}
                data-footer-social
                className="inline-flex min-h-11 items-center font-mono text-[9px] uppercase tracking-[0.18em] text-white/70 transition hover:text-accent"
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
