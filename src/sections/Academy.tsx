import { content, assets } from '../content/content'
import { Reveal } from '../components/motion/Reveal'
import { Container } from '../components/ui/Container'
import { Section } from '../components/ui/Section'
import { SectionSplit } from '../components/ui/SectionSplit'
import { ArrowUpRight } from '../components/ui/ArrowUpRight'

// Derived from the href so the stated destination can never drift from the
// actual one.
const destinationHost = new URL(content.academy.href).host

/**
 * The training subsystem is the one node that lives off-site, so the panel
 * reads as a hand-off: the artwork on one side, the destination and its
 * outbound control on the other.
 *
 * The prototype showed four course tags. They were invented for the mock and
 * were never checked against the real curriculum, so they are deliberately not
 * shipped — add `academy.tags` to content.ts once the studio confirms them.
 */
export function Academy() {
  return (
    <Section id="academy">
      <Container>
        <SectionSplit id="academy" title={content.academy.title} description={content.academy.body} >

          <Reveal>
            <div className="grid overflow-hidden border border-white/11 lg:grid-cols-2">
              <div className="relative min-h-70 lg:min-h-95">
                <img
                  src={assets.backgrounds.battlefield}
                  alt=""
                  aria-hidden="true"
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover"
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-[linear-gradient(0deg,rgb(5_5_12/0.9),transparent)] lg:bg-[linear-gradient(90deg,transparent,rgb(5_5_12/0.9))]"
                />
              </div>

              <div className="flex flex-col justify-between gap-10 p-7 lg:p-12">
                <div>
                  <span className="font-mono text-[9px] uppercase tracking-[0.22em] text-white/48">
                    {content.academy.destination}
                  </span>
                  {/* A 37-character host does not fit the panel-title step, and a
                      URL is data rather than a title — the grid-cell step suits it. */}
                  <p className="mt-4 font-display text-[22px] leading-tight font-bold break-all text-white">
                    {destinationHost}
                  </p>
                </div>

                <a
                  href={content.academy.href}
                  target="_blank"
                  rel="noreferrer"
                  className="flex min-h-14 items-center justify-center gap-2 bg-accent px-8 font-display text-base font-bold uppercase text-ink transition-colors hover:bg-accent-bright"
                >
                  {content.academy.cta}
                  <ArrowUpRight className="h-4 w-4" />
                </a>
              </div>
            </div>
          </Reveal>
        </SectionSplit>
      </Container>
    </Section>
  )
}
