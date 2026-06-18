import { content } from '../content/content'
import { Stagger, StaggerItem } from '../components/motion/Stagger'
import { Container } from '../components/ui/Container'
import { Section } from '../components/ui/Section'
import { SectionHeading } from '../components/ui/SectionHeading'

export function Services() {
  return (
    <Section id="services" className="bg-ink">
      <Container>
        <SectionHeading eyebrow="Our Services" title="From concept to complete website" />
        <Stagger className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {content.services.map((service, index) => (
            <StaggerItem
              key={service.title}
              className={`border border-white/10 bg-white/[0.045] p-6 ${index === 0 ? 'lg:col-span-2' : ''}`}
            >
              <p className="mb-8 font-display text-5xl font-bold text-white/10">0{index + 1}</p>
              <h3 className="font-display text-2xl font-bold text-white">{service.title}</h3>
              <p className="mt-4 leading-7 text-white/62">{service.body}</p>
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </Section>
  )
}
