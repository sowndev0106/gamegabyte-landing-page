import { content } from '../content/content'
import { Stagger, StaggerItem } from '../components/motion/Stagger'
import { Container } from '../components/ui/Container'
import { Section } from '../components/ui/Section'
import { SectionHeader } from '../components/ui/SectionHeader'
import { PointerGlow } from '../components/ui/PointerGlow'

const serviceSymbols = ['//', '◇', '◎', '<>', '↗', '#'] as const

export function Services() {
  return (
    <Section id="services" grid className="services-grid-background">
      <Container>
        <SectionHeader
          id="services"
          title="Services + Stack"
          description="Six disciplines in one launch system. Technical detail stays compact and supports the work."
        />

        <Stagger className="services-card-grid grid border border-white/10 sm:grid-cols-2 lg:grid-cols-3">
          {content.services.map((service, index) => (
            <StaggerItem key={service.title} className="bg-white/[0.014]">
              <PointerGlow className="h-full">
                <a
                  href="#portfolio"
                  className="group relative z-10 flex h-full min-h-[260px] flex-col p-7 transition-colors hover:bg-white/[0.025] sm:p-8"
                >
                  <span className="font-mono text-2xl leading-none text-accent transition-transform duration-300 group-hover:translate-x-1">
                    {serviceSymbols[index]}
                  </span>
                  <h3 className="mt-12 font-display text-2xl font-semibold tracking-[-0.02em] text-white transition-colors group-hover:text-accent">
                    {service.title}
                  </h3>
                  <p className="mt-3 max-w-sm text-base leading-relaxed text-white/70">{service.body}</p>
                </a>
              </PointerGlow>
            </StaggerItem>
          ))}
        </Stagger>

        <Stagger className="mt-8 grid border-t border-white/10 sm:grid-cols-2 lg:grid-cols-4">
          {content.technology.map((tech) => (
            <StaggerItem key={tech.title} className="py-6 sm:pr-6 lg:py-7">
              <h3 className="font-mono text-[11px] uppercase tracking-[0.22em] text-accent">
                {tech.title}
              </h3>
              <p className="mt-4 text-sm leading-relaxed text-white/70">{tech.body}</p>
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </Section>
  )
}
