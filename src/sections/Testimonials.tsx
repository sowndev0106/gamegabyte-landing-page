import { content } from '../content/content'
import { Reveal } from '../components/motion/Reveal'
import { Container } from '../components/ui/Container'
import { Section } from '../components/ui/Section'

export function Testimonials() {
  return (
    <Section id="testimonials" className="bg-ink">
      <Container>
        <p className="mb-12 text-center text-sm uppercase tracking-[0.18em] text-white/48">{content.trust.proof}</p>
        {content.testimonials.map((testimonial) => (
          <Reveal key={testimonial.name}>
            <figure className="mx-auto max-w-4xl border border-white/10 bg-white/[0.045] p-8 text-center sm:p-12">
              <blockquote className="font-display text-2xl font-bold leading-relaxed text-white sm:text-4xl">
                "{testimonial.quote}"
              </blockquote>
              <figcaption className="mt-8 text-white/58">
                <span className="font-bold text-white">{testimonial.name}</span> / {testimonial.role}
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </Container>
    </Section>
  )
}
