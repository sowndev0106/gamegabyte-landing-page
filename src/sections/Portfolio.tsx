import { content, assets } from '../content/content'
import { Stagger, StaggerItem } from '../components/motion/Stagger'
import { Container } from '../components/ui/Container'
import { Section } from '../components/ui/Section'
import { SectionHeading } from '../components/ui/SectionHeading'

export function Portfolio() {
  return (
    <Section id="portfolio" className="bg-ink">
      <Container>
        <SectionHeading eyebrow="Case Studies" title={content.portfolio.title} />
        <p className="mx-auto mb-12 max-w-2xl text-center leading-7 text-white/62">{content.portfolio.intro}</p>
        <Stagger className="grid gap-5 lg:grid-cols-3">
          {content.portfolio.items.map((item, index) => (
            <StaggerItem key={item.title} className="group overflow-hidden border border-white/10 bg-white/[0.045]">
              <img
                src={assets.portfolio[index]}
                alt={item.title}
                loading="lazy"
                className="aspect-video w-full object-cover transition duration-500 group-hover:scale-105"
              />
              <div className="p-6">
                <p className="text-sm font-semibold uppercase tracking-[0.14em] text-accent">{item.tag}</p>
                <h3 className="mt-3 font-display text-2xl font-bold text-white">{item.title}</h3>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </Section>
  )
}
