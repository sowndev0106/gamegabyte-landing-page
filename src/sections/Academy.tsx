import { content } from '../content/content'
import { Reveal } from '../components/motion/Reveal'
import { Button } from '../components/ui/Button'

export function Academy() {
  return (
    <section id="academy" className="bg-accent px-5 py-14 text-center text-ink">
      <Reveal>
        <div className="mx-auto max-w-4xl">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-ink/60">GABYTE ACADEMY</p>
          <h2 className="mt-4 font-display text-4xl font-bold leading-tight sm:text-5xl">{content.academy.title}</h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-ink/75">{content.academy.body}</p>
          <div className="mt-8">
            <Button href="#contact" variant="dark" showArrow={true}>
              {content.academy.cta}
            </Button>
          </div>
        </div>
      </Reveal>
    </section>
  )
}
