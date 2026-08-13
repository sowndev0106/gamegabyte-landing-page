import { content } from '../content/content'
import { Stagger, StaggerItem } from '../components/motion/Stagger'
import { Container } from '../components/ui/Container'
import { Section } from '../components/ui/Section'
import { SectionHeader } from '../components/ui/SectionHeader'

function initials(name: string) {
  return name
    .split(' ')
    .slice(0, 2)
    .map((part) => part[0])
    .join('')
    .toUpperCase()
}

export function Testimonials() {
  const testimonials = content.testimonials

  return (
    <Section id="testimonials" grid>
      <Container>
        <SectionHeader
          index="08"
          eyebrow="Testimonials"
          title="Trusted by game teams"
          description="Don't take our word for it — over 100+ people trust us."
        />

        <Stagger className={`grid gap-6 ${testimonials.length > 1 ? 'md:grid-cols-2' : ''}`}>
          {testimonials.map((testimonial) => (
            <StaggerItem
              key={testimonial.name}
              className="hud-surface relative flex flex-col p-8 sm:p-12"
            >
              <span aria-hidden="true" className="absolute -left-px -top-px h-8 w-8 border-l-2 border-t-2 border-accent" />
              <blockquote className="font-display text-2xl font-bold leading-snug text-white sm:text-3xl lg:text-[34px]">
                {testimonial.quote}
              </blockquote>
              <figcaption className="mt-auto flex items-center gap-4 border-t border-white/8 pt-8 lg:mt-12">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-accent font-display text-sm font-bold text-ink">
                  {initials(testimonial.name)}
                </span>
                <span className="leading-tight">
                  <strong className="block text-sm font-semibold text-white">{testimonial.name}</strong>
                  <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-white/60">
                    {testimonial.role}
                  </span>
                </span>
              </figcaption>
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </Section>
  )
}
