import { content, assets } from '../content/content'
import { Stagger, StaggerItem } from '../components/motion/Stagger'
import { Container } from '../components/ui/Container'
import { Section } from '../components/ui/Section'
import { SectionHeader } from '../components/ui/SectionHeader'

export function CaseStudy() {
  const study = content.caseStudy

  return (
    <Section
      id="case-study"
      backdrop={
        <>
          <img
            src={assets.backgrounds.mech}
            alt=""
            loading="lazy"
            className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-[0.07]"
          />
          <div aria-hidden="true" className="absolute inset-0 bg-linear-to-b from-ink via-transparent to-ink" />
        </>
      }
    >
      <Container>
        <SectionHeader
          id="case-study"
          title={study.title}
          description={study.intro}
        />
      </Container>

      {/* Full-bleed rail: the screens are wide, so let them run past the container. */}
      <Stagger className="flex snap-x snap-mandatory gap-5 overflow-x-auto px-5 pb-6 sm:px-6 lg:px-[max(1.5rem,calc((100vw-72rem)/2))]">
        {study.screens.map((screen, index) => (
          <StaggerItem
            key={screen.src}
            className="hud-surface hud-surface-interactive w-[85vw] shrink-0 snap-start overflow-hidden sm:w-[560px]"
          >
            <img
              src={screen.src}
              alt={`${study.title} — ${screen.label}`}
              loading="lazy"
              className="aspect-video w-full object-cover"
            />
            <div className="flex items-center gap-3 px-5 py-4">
              <span className="font-mono text-[11px] uppercase tracking-[0.24em] text-white/55">
                {String(index + 1).padStart(2, '0')}
              </span>
              <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-white/80">
                {screen.label}
              </span>
            </div>
          </StaggerItem>
        ))}
      </Stagger>

      <Container>
        <p className="mt-6 font-mono text-[11px] uppercase tracking-[0.2em] text-white/55">
          Scroll for more screens →
        </p>
      </Container>
    </Section>
  )
}
