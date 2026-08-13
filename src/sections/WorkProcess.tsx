import { content } from '../content/content'
import { motion, useReducedMotion } from 'motion/react'
import { Stagger, StaggerItem } from '../components/motion/Stagger'
import { Container } from '../components/ui/Container'
import { Section } from '../components/ui/Section'
import { SectionHeader } from '../components/ui/SectionHeader'

export function WorkProcess() {
  const reduceMotion = useReducedMotion()

  return (
    <Section id="process" grid>
      <Container>
        <SectionHeader
          index="04"
          eyebrow="Transmission path"
          title="From signal to launch"
          description="A readable process with motion that explains progression rather than decorating it."
        />

        <div className="relative">
          <div
            aria-hidden="true"
            className="absolute bottom-0 left-[11px] top-0 w-px bg-white/10 lg:bottom-auto lg:left-0 lg:right-0 lg:top-[11px] lg:h-px lg:w-auto"
          />
          <motion.div
            aria-hidden="true"
            className="absolute bottom-0 left-[11px] top-0 w-px origin-top bg-accent shadow-[0_0_16px_rgba(182,232,2,0.45)] lg:bottom-auto lg:left-0 lg:right-0 lg:top-[11px] lg:h-px lg:w-auto lg:origin-left"
            initial={reduceMotion ? false : { scaleY: 0, scaleX: 0 }}
            whileInView={reduceMotion ? undefined : { scaleY: 1, scaleX: 1 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 1.15, ease: [0.22, 1, 0.36, 1] }}
          />

          <Stagger className="grid gap-0 lg:grid-cols-4 lg:gap-8">
            {content.process.map((step) => (
              <StaggerItem
                key={step.step}
                className="relative min-h-[190px] pb-10 pl-12 last:pb-0 lg:min-h-0 lg:pb-0 lg:pl-0 lg:pt-14"
              >
                <span
                  aria-hidden="true"
                  className="process-signal-node absolute left-0 top-0 h-[22px] w-[22px] border border-accent bg-ink shadow-[0_0_18px_rgba(182,232,2,0.42)] lg:left-0"
                />
                <span className="font-mono text-[11px] font-bold uppercase tracking-[0.22em] text-accent">
                  {step.step}
                </span>
                <h3 className="mt-5 font-display text-xl font-bold text-white">{step.title}</h3>
                <p className="mt-4 max-w-[260px] text-base leading-relaxed text-white/70">{step.body}</p>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </Container>
    </Section>
  )
}
