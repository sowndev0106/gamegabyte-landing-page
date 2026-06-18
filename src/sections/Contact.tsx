import { useState } from 'react'
import { content } from '../content/content'
import { Reveal } from '../components/motion/Reveal'
import { Container } from '../components/ui/Container'
import { Section } from '../components/ui/Section'

export function Contact() {
  const [sent, setSent] = useState(false)

  return (
    <Section id="contact" className="bg-black">
      <Container>
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-display text-4xl font-bold text-white sm:text-6xl">{content.contact.title}</h2>
            <form className="mt-9 flex flex-col gap-4" onSubmit={(event) => { event.preventDefault(); setSent(true) }}>
              <textarea
                required
                rows={5}
                placeholder={content.contact.placeholder}
                className="border border-white/10 bg-white/[0.045] p-5 text-white outline-none placeholder:text-white/38 focus:border-accent"
              />
              <button type="submit" className="min-h-12 border border-accent bg-accent px-7 py-3 font-bold uppercase text-ink">
                Send
              </button>
              {sent && <p className="text-accent">Form submitted - thank you!</p>}
            </form>
          </div>
        </Reveal>
      </Container>
    </Section>
  )
}
