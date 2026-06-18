import { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { content } from '../content/content'
import { Container } from '../components/ui/Container'
import { Section } from '../components/ui/Section'
import { SectionHeading } from '../components/ui/SectionHeading'

export function Faq() {
  const [open, setOpen] = useState<number | null>(0)

  return (
    <Section id="faq" className="bg-ink">
      <Container>
        <SectionHeading eyebrow="FAQ" title="Questions, answered" />
        <div className="mx-auto max-w-3xl divide-y divide-white/10 border-y border-white/10">
          {content.faq.map((item, index) => (
            <div key={item.q}>
              <button
                type="button"
                onClick={() => setOpen(open === index ? null : index)}
                className="flex w-full items-center justify-between gap-6 py-6 text-left font-display text-xl font-bold text-white"
              >
                <span>{item.q}</span>
                <span className="text-3xl text-accent">{open === index ? '-' : '+'}</span>
              </button>
              <AnimatePresence initial={false}>
                {open === index && (
                  <motion.p
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="overflow-hidden pb-6 leading-7 text-white/62"
                  >
                    {item.a}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  )
}
