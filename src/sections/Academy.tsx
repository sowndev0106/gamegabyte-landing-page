import { content } from '../content/content'
import { Reveal } from '../components/motion/Reveal'
import { Button } from '../components/ui/Button'
import { Container } from '../components/ui/Container'
import { Section } from '../components/ui/Section'

export function Academy() {
  return (
    <Section id="academy" className="bg-black">
      <Container>
        <Reveal>
          <div className="border border-accent/40 bg-accent p-8 text-center text-ink sm:p-14">
            <p className="text-sm font-bold uppercase tracking-[0.18em]">GaByte Academy</p>
            <h2 className="mt-4 font-display text-4xl font-bold leading-tight sm:text-6xl">{content.academy.title}</h2>
            <p className="mx-auto mt-5 max-w-xl text-lg text-ink/75">{content.academy.body}</p>
            <div className="mt-8">
              <Button href="#contact" variant="dark">Learn more</Button>
            </div>
          </div>
        </Reveal>
      </Container>
    </Section>
  )
}
