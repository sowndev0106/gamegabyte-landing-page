import { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { content } from '../content/content'
import { Stagger, StaggerItem } from '../components/motion/Stagger'
import { Container } from '../components/ui/Container'
import { Section } from '../components/ui/Section'
import { SectionHeader } from '../components/ui/SectionHeader'

/**
 * Diagnostic records rather than an accordion: any number can stay expanded, so
 * two related answers can be read side by side.
 */
export function Faq() {
  const [open, setOpen] = useState<ReadonlySet<number>>(new Set())

  const toggle = (index: number) =>
    setOpen((current) => {
      const next = new Set(current)
      if (next.has(index)) next.delete(index)
      else next.add(index)
      return next
    })

  return (
    <Section id="faq" grid>
      <Container>
        <SectionHeader id="faq" title={content.faqSection.title} description={content.faqSection.intro} />

        <Stagger className="border-t border-white/11">
          {content.faq.map((item, index) => {
            const isOpen = open.has(index)
            return (
              <StaggerItem key={item.q} className="border-b border-white/11">
                <button
                  type="button"
                  onClick={() => toggle(index)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-panel-${index}`}
                  className="group grid w-full cursor-pointer grid-cols-[38px_1fr_auto] items-center gap-2.5 py-6 text-left md:grid-cols-[5.625rem_1fr_auto] md:gap-6"
                >
                  <span className="font-mono text-[11px] tracking-[0.24em] text-accent">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <span
                    className={`font-display text-lg font-bold transition-colors md:text-2xl ${
                      isOpen ? 'text-accent' : 'text-white group-hover:text-accent'
                    }`}
                  >
                    {item.q}
                  </span>
                  <span
                    aria-hidden="true"
                    className={`relative flex h-8 w-8 shrink-0 items-center justify-center transition-colors ${
                      isOpen ? 'text-accent' : 'text-white/60'
                    }`}
                  >
                    <span className="absolute h-px w-3.5 bg-current" />
                    <span
                      className={`absolute h-3.5 w-px bg-current transition-transform duration-300 ${
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
                      <p className="max-w-3xl pb-8 pl-12 text-base leading-relaxed text-white/70 md:pl-22.5">
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
