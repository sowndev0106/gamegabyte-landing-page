import { content, assets } from '../content/content'
import { Reveal } from '../components/motion/Reveal'
import { Button } from '../components/ui/Button'
import { Container } from '../components/ui/Container'
import { Section, GlowSpot } from '../components/ui/Section'

export function Academy() {
  return (
    <Section
      id="academy"
      backdrop={
        <>
          <img
            src={assets.backgrounds.battlefield}
            alt=""
            loading="lazy"
            className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-[0.09]"
          />
          <div aria-hidden="true" className="absolute inset-0 bg-linear-to-b from-ink via-transparent to-ink" />
          <GlowSpot className="left-1/2 top-1/2 h-[320px] w-[680px] -translate-x-1/2 -translate-y-1/2" />
        </>
      }
    >
      <Container>
        <Reveal>
          {/* An accent-edged panel rather than a full-bleed lime slab. */}
          <div className="hud-surface relative flex flex-col gap-8 p-8 sm:p-12 lg:flex-row lg:items-center lg:justify-between lg:p-16">
            <span aria-hidden="true" className="absolute inset-y-0 left-0 w-[3px] bg-accent" />
            <div className="max-w-xl">
              <p className="font-mono text-xs uppercase tracking-[0.28em] text-accent">
                <span aria-hidden="true" className="text-white/55">[07]</span> Academy
              </p>
              <h2 className="mt-5 font-display text-4xl font-bold uppercase leading-[0.95] tracking-tight text-white sm:text-5xl">
                {content.academy.title}
              </h2>
              <p className="mt-4 text-base leading-relaxed text-white/70">{content.academy.body}</p>
            </div>
            <Button href="#contact" variant="accent" showArrow className="shrink-0">
              {content.academy.cta}
            </Button>
          </div>
        </Reveal>
      </Container>
    </Section>
  )
}
