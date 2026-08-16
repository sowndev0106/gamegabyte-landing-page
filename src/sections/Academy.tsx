import { content, assets } from '../content/content'
import { Reveal } from '../components/motion/Reveal'
import { Container } from '../components/ui/Container'
import { Section } from '../components/ui/Section'
import { ArrowUpRight } from '../components/ui/ArrowUpRight'
import { sectionById } from '../content/sections'

const { index, eyebrow } = sectionById('academy')

/**
 * The training subsystem is the one node that lives off-site, so it reads as a
 * terminal handing off to an external destination rather than as page content.
 *
 * The prototype showed four course tags. They were invented for the mock and
 * were never checked against the real curriculum, so they are deliberately not
 * shipped — add `academy.tags` to content.ts once the studio confirms them.
 */
export function Academy() {
  return (
    <Section id="academy">
      <Container>
        <Reveal>
          <div className="grid overflow-hidden border border-white/11 lg:min-h-127.5 lg:grid-cols-2">
            <div className="relative min-h-70">
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

            <div className="flex flex-col justify-center p-7 lg:p-12">
              <p className="font-mono text-[11px] uppercase leading-relaxed tracking-[0.22em] text-accent">
                <span aria-hidden="true" className="text-white/45">
                  [{index}]
                </span>{' '}
                {eyebrow}
              </p>
              <h2 className="mt-6 font-display text-[clamp(34px,4.6vw,64px)] leading-[0.9] font-extrabold uppercase tracking-tighter text-white">
                {content.academy.title}
              </h2>
              <p className="mt-5 leading-relaxed text-white/70">{content.academy.body}</p>
              <a
                href={content.academy.href}
                target="_blank"
                rel="noreferrer"
                className="mt-9 flex min-h-14 items-center justify-center gap-2 bg-accent px-8 font-display text-base font-bold uppercase text-ink transition-colors hover:bg-accent-bright"
              >
                {content.academy.cta}
                <ArrowUpRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </Reveal>
      </Container>
    </Section>
  )
}
