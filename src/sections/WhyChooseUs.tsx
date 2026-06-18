import { content, assets } from '../content/content'
import { Stagger, StaggerItem } from '../components/motion/Stagger'
import { Container } from '../components/ui/Container'
import { Section } from '../components/ui/Section'
import { SectionHeading } from '../components/ui/SectionHeading'

export function WhyChooseUs() {
  return (
    <Section id="about" className="relative overflow-hidden bg-ink">
      <img src={assets.backgrounds.pixelTrees} alt="" loading="lazy" className="absolute inset-x-0 top-0 h-56 w-full object-cover opacity-14" />
      <Container className="relative">
        <SectionHeading eyebrow="Why choose us?" title="Strategic partners, not just an agency" />
        <Stagger className="grid gap-5 sm:grid-cols-2">
          {content.why.map((item) => (
            <StaggerItem key={item.title} className="border border-white/10 bg-black/42 p-7">
              <h3 className="font-display text-2xl font-bold text-white">{item.title}</h3>
              <p className="mt-4 leading-7 text-white/62">{item.body}</p>
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </Section>
  )
}
