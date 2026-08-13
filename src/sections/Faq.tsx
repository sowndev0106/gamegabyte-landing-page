import { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { content } from '../content/content'
import { Stagger, StaggerItem } from '../components/motion/Stagger'
import { Container } from '../components/ui/Container'
import { Section } from '../components/ui/Section'
import { SectionHeader } from '../components/ui/SectionHeader'
import { Button } from '../components/ui/Button'

export function Faq() {
  const [open, setOpen] = useState<number | null>(0)

  return (
    <Section id="faq">
      <Container>
        <SectionHeader
          index="07"
          eyebrow="FAQ"
          title="Questions, answered"
          description="Everything you need to know before starting a project with us."
          action={
            <Button href="#contact" variant="ghost" showArrow>
              Ask a question
            </Button>
          }
        />

        <Stagger>
          {content.faq.map((item, index) => {
            const isOpen = open === index
            return (
              <StaggerItem key={item.q} className="border-b border-white/8">
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : index)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-panel-${index}`}
                  className="group flex w-full cursor-pointer items-center gap-6 py-6 text-left"
                >
                  <span className="font-mono text-[11px] uppercase tracking-[0.24em] text-white/55">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <span
                    className={`flex-1 font-display text-lg font-bold transition-colors sm:text-xl ${
                      isOpen ? 'text-accent' : 'text-white group-hover:text-accent'
                    }`}
                  >
                    {item.q}
                  </span>
                  <span
                    aria-hidden="true"
                    className={`relative flex h-8 w-8 shrink-0 items-center justify-center border transition-colors ${
                      isOpen ? 'border-accent text-accent' : 'border-white/15 text-white/60'
                    }`}
                  >
                    <span className="absolute h-px w-3 bg-current" />
                    <span
                      className={`absolute h-3 w-px bg-current transition-transform duration-300 ${
                        isOpen ? 'scale-y-0' : 'scale-y-100'
                      }`}
                    />
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={`faq-panel-${index}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="overflow-hidden"
                    >
                      <p className="max-w-3xl pb-8 pl-12 text-base leading-relaxed text-white/70">
                        {item.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </StaggerItem>
            )
          })}
        </Stagger>
      </Container>
    </Section>
  )
}
