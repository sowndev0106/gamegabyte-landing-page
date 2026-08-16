import { content } from '../content/content'
import { Reveal } from '../components/motion/Reveal'
import { CountUp } from '../components/motion/CountUp'
import { Container } from '../components/ui/Container'
import { Section, GlowSpot } from '../components/ui/Section'
import { SectionHeader } from '../components/ui/SectionHeader'

export function Stats() {
  const primaryStat = content.stats[0]

  return (
    <Section
      id="telemetry"
      data-export="stats"
      grid
      backdrop={<GlowSpot className="left-[10%] top-[10%] h-[300px] w-[500px]" />}
    >
      <Container>
        <SectionHeader
          id="telemetry"
          title={content.trust.title}
          description={content.trust.note}
        />

        <Reveal>
          <div className="stats-command-board">
            <article className="stats-command-primary">
              <span className="stats-command-status">Studio signal / active</span>
              <div className="relative z-10">
                <CountUp value={primaryStat.value} className="stats-command-primary-value" />
                <p className="stats-command-label mt-8">{primaryStat.label}</p>
                {primaryStat.note && <p className="stats-command-note mt-3">{primaryStat.note}</p>}
              </div>
            </article>

            <div className="stats-command-secondary">
              {content.stats.slice(1).map((stat, index) => (
                <article key={stat.label} className="stats-command-reading">
                  <span className="stats-command-index">
                    {String(index + 2).padStart(2, '0')} / {index === 0 ? 'Experience' : index === 1 ? 'Method' : 'Origin'}
                  </span>
                  <CountUp value={stat.value} className="stats-command-value" />
                  <p className="stats-command-label mt-5">{stat.label}</p>
                  {stat.note && <p className="stats-command-note mt-2">{stat.note}</p>}
                  {index === 2 && (
                    <svg className="stats-signal-trace" viewBox="0 0 118 35" aria-hidden="true">
                      <polyline points="0,25 18,25 25,10 35,31 45,18 53,25 72,25 79,15 88,25 118,25" />
                    </svg>
                  )}
                </article>
              ))}
            </div>
          </div>
        </Reveal>
      </Container>
    </Section>
  )
}
