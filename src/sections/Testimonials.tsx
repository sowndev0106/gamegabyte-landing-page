import { content } from '../content/content'
import { Reveal } from '../components/motion/Reveal'
import { Container } from '../components/ui/Container'
import { Section } from '../components/ui/Section'
import { SectionSplit } from '../components/ui/SectionSplit'

/**
 * One client voice, read as an incoming log rather than a carousel of cards.
 * The meta column names the source; the quote itself carries the weight.
 */
export function Testimonials() {
  const [log] = content.testimonials

  return (
    <Section id="testimonials" grid>
      <Container>
        <SectionSplit
          id="testimonials"
          title={content.testimonialsSection.title}
          description={content.testimonialsSection.intro}
        >

          <Reveal>
            <figure className="grid border border-white/11 lg:grid-cols-[minmax(0,240px)_minmax(0,1fr)]">
              <div className="flex min-h-30 flex-col justify-between border-b border-white/11 p-7 lg:border-r lg:border-b-0">
                <span className="font-mono text-[9px] uppercase leading-relaxed tracking-[0.22em] text-accent">
                  Log 01 / Human intelligence
                </span>
                <span className="mt-8 flex items-center gap-2.5 font-mono text-[9px] uppercase tracking-[0.22em] text-white/60">
                  <span aria-hidden="true" className="command-status-dot h-1.5 w-1.5 rounded-full bg-accent" />
                  {log.role.replace(/^CEO of /, '')}
                </span>
              </div>

              <div className="p-7 lg:p-12">
                <blockquote className="font-display text-[clamp(26px,3.4vw,52px)] leading-[1.06] font-bold text-white">
                  “{log.quote}”
                </blockquote>
                <figcaption className="mt-10 border-t border-white/11 pt-6">
                  <span className="block font-display text-sm font-bold text-white">{log.name}</span>
                  <span className="mt-1 block text-white/60">{log.role}</span>
                </figcaption>
              </div>
            </figure>
          </Reveal>
        </SectionSplit>
      </Container>
    </Section>
  )
}
