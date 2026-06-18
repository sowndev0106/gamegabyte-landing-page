import { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { content, assets } from '../content/content'
import { Container } from '../components/ui/Container'
import { Button } from '../components/ui/Button'

export function Faq() {
  const [open, setOpen] = useState<number | null>(0)

  return (
    <section id="faq" className="relative overflow-hidden bg-brand px-4 py-16 sm:px-6 sm:py-24 lg:py-32">
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-[0.18] pointer-events-none"
        style={{ backgroundImage: `url(${assets.backgrounds.pattern})` }}
      />
      <Container className="relative z-10">
        <div className="mx-auto mb-16 max-w-3xl text-center text-white">
          <h2 className="font-display text-4xl font-bold uppercase tracking-tight sm:text-5xl lg:text-6xl">
            FAQ
          </h2>
          <p className="mt-4 text-lg text-white/80">
            We're not just another agency. We're strategic partners helping your game succeed in the fiercely competitive market.
          </p>
        </div>

        <div className="mx-auto max-w-3xl space-y-4">
          {content.faq.map((item, index) => {
            const isOpen = open === index
            return (
              <div 
                key={item.q} 
                className="overflow-hidden bg-white text-black rounded-lg transition-all duration-300"
              >
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : index)}
                  className="flex w-full items-center justify-between gap-6 p-6 text-left font-display text-lg font-bold sm:text-xl"
                >
                  <div className="flex items-center gap-4">
                    <span className="text-brand text-2xl font-black">{index + 1}</span>
                    <span>{item.q}</span>
                  </div>
                  <div 
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full transition-colors duration-200 ${
                      isOpen ? 'bg-[#601feb] text-white' : 'bg-[#f1f2f9] text-black'
                    }`}
                  >
                    <span className="text-xl leading-none">{isOpen ? '−' : '+'}</span>
                  </div>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                    >
                      <p className="px-6 pb-6 text-base leading-relaxed text-black/70 border-t border-gray-100 pt-4">
                        {item.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )
          })}
        </div>

        <div className="mt-12 text-center">
          <Button href="#contact" variant="accent" showArrow={true}>
            ask a question
          </Button>
        </div>
      </Container>
    </section>
  )
}
