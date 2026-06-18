import { content } from '../content/content'
import { Reveal } from '../components/motion/Reveal'
import { Container } from '../components/ui/Container'
import { Section } from '../components/ui/Section'

export function Stats() {
  return (
    <Section className="bg-black py-14 sm:py-18">
      <Container>
        <div className="grid grid-cols-2 gap-px border border-white/10 bg-white/10 text-center md:grid-cols-4">
          {content.stats.map((stat, index) => (
            <Reveal key={stat.label} delay={index * 0.08} className="bg-black p-8">
              <p className="font-display text-5xl font-bold text-accent sm:text-6xl">{stat.value}</p>
              <p className="mt-3 text-sm uppercase tracking-[0.16em] text-white/54">{stat.label}</p>
              {stat.note ? <p className="mt-2 text-xs uppercase tracking-[0.14em] text-white/36">{stat.note}</p> : null}
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  )
}
