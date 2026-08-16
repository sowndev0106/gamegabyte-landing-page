import { content } from '../content/content'
import { Reveal } from '../components/motion/Reveal'
import { Container } from '../components/ui/Container'
import { Section } from '../components/ui/Section'
import { SectionSplit } from '../components/ui/SectionSplit'

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
        <SectionSplit
          id="services"
          title={title.map((line) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
          description={intro}
        >

          <Reveal>
            <div className="border-y border-white/11 md:grid md:grid-cols-2">
              {rows.map((row) => (
                <div key={row.key} className="contents">
                  {/* The axis label spans the row rather than taking a cell of
                      its own. In a two-column matrix a keyed cell would sit in
                      the same column as a service and read as a seventh, empty
                      discipline. */}
                  <div className="border-b border-white/11 bg-accent/4.5 px-6 py-4 md:col-span-2">
                    <span className="font-mono text-[9px] uppercase leading-relaxed tracking-[0.22em] text-accent">
                      {row.key}
                    </span>
                  </div>
                  {row.services.map((service, i) => (
                    <article
                      key={service.title}
                      data-service-cell
                      // Three disciplines per axis into two columns leaves a
                      // hole; the third takes the whole row instead.
                      className={`min-h-47.5 border-b border-white/11 p-6 transition-colors hover:bg-accent/3.5 md:min-h-54.5 ${
                        i === 0 ? 'md:border-r' : ''
                      } ${i === 2 ? 'md:col-span-2' : ''}`}
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

            <div className="mt-7 grid grid-cols-2 border-t border-white/11">
              {content.technology.map((item) => (
                <div key={item.title} className="pt-5.5 pr-5.5">
                  <strong className="font-mono text-[9px] font-normal uppercase tracking-[0.22em] text-accent">
                    {item.title}
                  </strong>
                  <p className="mt-2 text-sm text-white/70">{item.body}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </SectionSplit>
      </Container>
    </Section>
  )
}
