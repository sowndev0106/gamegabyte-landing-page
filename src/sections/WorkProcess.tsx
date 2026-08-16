import { content } from '../content/content'
import { Reveal } from '../components/motion/Reveal'
import { Container } from '../components/ui/Container'
import { Section } from '../components/ui/Section'
import { SectionSplit } from '../components/ui/SectionSplit'

/**
 * The four steps hang off one vertical signal path, with a sticky orbital
 * panel holding station beside them — the sequence reads as one transmission
 * rather than four numbered cards.
 */
export function WorkProcess() {
  const { title, intro, engine, engineNote } = content.processSection

  return (
    <Section id="process" grid>
      <Container>
        <SectionSplit
          id="process"
          title={title.map((line) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
          description={intro}
        >

          <div className="grid gap-10 lg:grid-cols-2 lg:gap-20">
            <div
              aria-hidden="true"
              className="relative grid aspect-square place-items-center self-start border border-white/11 bg-[radial-gradient(circle,rgb(96_31_235/0.25),transparent_65%)] lg:sticky lg:top-27.5"
            >
              <span className="orbit-ring absolute inset-[16%] rounded-full border border-accent/24" />
              <span className="orbit-ring-inner absolute inset-[31%] rounded-full border border-dashed border-accent/24" />
              <span className="h-2.75 w-2.75 rounded-full bg-accent shadow-[0_0_24px_var(--color-accent)]" />
              <span className="absolute bottom-[11%] text-center font-mono text-[8px] leading-relaxed uppercase tracking-[0.18em] text-white/40">
                {engine}
                <br />
                {engineNote}
              </span>
            </div>

            <ol className="border-l border-white/11">
              {content.process.map((step, i) => (
                <li key={step.step} data-process-step className="relative min-h-52.5 py-4 pr-0 pb-13.5 pl-9 lg:pl-13">
                  <Reveal delay={i * 0.05}>
                    <span
                      aria-hidden="true"
                      className="absolute top-4.5 -left-1.5 h-2.75 w-2.75 bg-accent shadow-[0_0_18px_var(--color-accent)]"
                    />
                    <span className="font-mono text-[9px] uppercase tracking-[0.22em] text-accent">
                      {step.step} / {step.phase}
                    </span>
                    <h3 className="my-4 font-display text-[28px] leading-none font-bold text-white">{step.title}</h3>
                    <p className="max-w-135 leading-relaxed text-white/70">{step.body}</p>
                  </Reveal>
                </li>
              ))}
            </ol>
          </div>
        </SectionSplit>
      </Container>
    </Section>
  )
}
