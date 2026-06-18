import { content } from '../content/content'
import { Stagger, StaggerItem } from '../components/motion/Stagger'
import { Container } from '../components/ui/Container'
import { Section } from '../components/ui/Section'
import { SectionHeading } from '../components/ui/SectionHeading'

export function WorkProcess() {
  return (
    <Section id="process" className="bg-black">
      <Container>
        <SectionHeading eyebrow="Our Work Process" title="From strategy to launch" />
        <Stagger className="grid gap-px overflow-hidden border border-white/10 bg-white/10 md:grid-cols-4">
          {content.process.map((step) => (
            <StaggerItem key={step.step} className="bg-black p-6">
              <span className="font-display text-5xl font-bold text-accent">{step.step}</span>
              <h3 className="mt-8 font-display text-xl font-bold text-white">{step.title}</h3>
              <p className="mt-4 text-sm leading-6 text-white/58">{step.body}</p>
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </Section>
  )
}
