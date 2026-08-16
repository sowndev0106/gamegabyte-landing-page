import { content } from '../content/content'
import { Reveal } from '../components/motion/Reveal'
import { Container } from '../components/ui/Container'
import { Section } from '../components/ui/Section'
import { SectionHeader } from '../components/ui/SectionHeader'

/**
 * The six disciplines read as a matrix rather than six cards: a key column
 * names the axis, and each row is one half of the studio's throughput.
 */
export function Services() {
  const { inputKey, outputKey, title, intro } = content.systemsMatrix
  const rows = [
    { key: inputKey, services: content.services.slice(0, 3), offset: 0 },
    { key: outputKey, services: content.services.slice(3), offset: 3 },
  ]

  return (
    <Section id="services" grid>
      <Container>
        <SectionHeader
          id="services"
          title={title.map((line) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
          description={intro}
        />

        <Reveal>
          <div className="border-y border-white/11 md:grid md:grid-cols-[190px_repeat(3,minmax(0,1fr))]">
            {rows.map((row) => (
              <div key={row.key} className="contents">
                <div className="flex min-h-22.5 items-start border-b border-white/11 bg-accent/4.5 p-6 md:min-h-54.5 md:border-r">
                  <span className="font-mono text-[9px] uppercase leading-relaxed tracking-[0.22em] text-accent">
                    {row.key}
                  </span>
                </div>
                {row.services.map((service, i) => (
                  <article
                    key={service.title}
                    data-service-cell
                    className={`min-h-47.5 border-b border-white/11 p-6 transition-colors hover:bg-accent/3.5 md:min-h-54.5 ${
                      i < 2 ? 'md:border-r' : ''
                    }`}
                  >
                    <span className="font-mono text-[9px] uppercase tracking-[0.22em] text-accent">
                      {String(row.offset + i + 1).padStart(2, '0')} / {service.kind}
                    </span>
                    <h3 className="mt-11 font-display text-[22px] leading-tight font-bold text-white">
                      {service.title}
                    </h3>
                    <p className="mt-3 leading-relaxed text-white/70">{service.body}</p>
                  </article>
                ))}
              </div>
            ))}
          </div>

          <div className="mt-7 grid grid-cols-2 border-t border-white/11 md:grid-cols-4">
            {content.technology.map((item) => (
              <div key={item.title} className="pt-5.5 pr-5.5">
                <strong className="font-mono text-[9px] font-normal uppercase tracking-[0.18em] text-accent">
                  {item.title}
                </strong>
                <p className="mt-2 text-sm text-white/70">{item.body}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </Container>
    </Section>
  )
}
