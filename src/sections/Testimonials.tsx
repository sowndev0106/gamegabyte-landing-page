import { content } from '../content/content'
import { Reveal } from '../components/motion/Reveal'
import { Container } from '../components/ui/Container'

export function Testimonials() {
  const testimonial = content.testimonials[0]

  return (
    <section id="testimonials" className="bg-black py-16 sm:py-24">
      <Container>
        <p className="mb-12 text-center text-xs uppercase tracking-[0.2em] text-white/50">
          DON'T TAKE OUR WORD FOR IT. OVER 100+ PEOPLE TRUST US.
        </p>
        {testimonial && (
          <Reveal>
            <div className="mx-auto max-w-3xl bg-white/[0.055] px-8 py-10 text-center">
              <blockquote className="font-display text-2xl font-bold leading-snug text-white sm:text-3xl">
                "{testimonial.quote}"
              </blockquote>
              <div className="mt-8 text-sm text-white/60">
                <strong className="text-white">{testimonial.name}</strong> — {testimonial.role}
              </div>
            </div>
          </Reveal>
        )}
      </Container>
    </section>
  )
}
