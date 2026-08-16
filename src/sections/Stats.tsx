import { content } from '../content/content'
import { Reveal } from '../components/motion/Reveal'
import { CountUp } from '../components/motion/CountUp'
import { Container } from '../components/ui/Container'
import { Section } from '../components/ui/Section'
import { SectionHeader } from '../components/ui/SectionHeader'
import { Readout } from '../components/ui/Readout'

const SUPPORTING_LABELS = ['Experience', 'Method', 'Origin']

export function Stats() {
  const [primary, ...supporting] = content.stats

  return (
    <Section id="telemetry" grid data-export="stats">
      <Container>
        <SectionHeader id="telemetry" title={content.trust.title} description={content.trust.note} />

        <Reveal>
          <div className="grid border border-white/11 lg:grid-cols-[minmax(0,1.08fr)_minmax(0,0.92fr)]">
            <article className="relative flex min-h-85 flex-col justify-between overflow-hidden border-b border-white/11 p-7 lg:min-h-107.5 lg:border-r lg:border-b-0 lg:p-12">
              <span className="flex items-center gap-2.5 font-mono text-[10px] uppercase tracking-[0.18em] text-accent">
                <span aria-hidden="true" className="command-status-dot h-1.75 w-1.75 rounded-full bg-accent" />
                Studio signal / active
              </span>
              {/* A single wide ring, cropped by the panel — the telemetry
                  equivalent of a dial you only see part of. */}
              <span
                aria-hidden="true"
                className="pointer-events-none absolute -right-22.5 -bottom-35 h-97.5 w-97.5 rounded-full border border-accent/18"
              />
              <div className="relative z-10">
                <Readout
                  size="lg"
                  label="01 / Volume"
                  value={<CountUp value={primary.value} />}
                  title={primary.label}
                  note={primary.note}
                />
              </div>
            </article>

            <div className="grid lg:grid-cols-2">
              {supporting.map((stat, i) => (
                <article
                  key={stat.label}
                  className={`min-w-0 border-white/11 p-7 lg:p-8 ${
                    i < 2 ? 'border-b' : 'lg:col-span-2'
                  } ${i === 0 ? 'lg:border-r' : ''}`}
                >
                  <Readout
                    label={`0${i + 2} / ${SUPPORTING_LABELS[i]}`}
                    value={<CountUp value={stat.value} />}
                    title={stat.label}
                    note={stat.note}
                  />
                </article>
              ))}
            </div>
          </div>
        </Reveal>
      </Container>
    </Section>
  )
}
