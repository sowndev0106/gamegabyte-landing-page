import { content } from '../content/content'
import { Reveal } from '../components/motion/Reveal'
import { CountUp } from '../components/motion/CountUp'
import { Container } from '../components/ui/Container'
import { Section } from '../components/ui/Section'
import { SectionSplit } from '../components/ui/SectionSplit'
import { Readout } from '../components/ui/Readout'

const SUPPORTING_LABELS = ['Speed', 'Delivery', 'Method', 'Origin']

/**
 * One emphasised figure and a 2×2 field of four supporting ones.
 *
 * The count is the layout. Four supporting readouts fill the right half exactly
 * — the earlier three left the last cell spanning both columns with a void
 * beside it, which read as a gap rather than as an instrument's empty housing.
 * Adding or removing a stat therefore is not a content-only change: five is the
 * number this arrangement holds.
 *
 * The panel keeps the pinned-panel pattern (label at the top edge, figure at
 * the bottom, void between) but no longer sets its own height. Two supporting
 * rows decide it, and the panel stretches to match — a `min-h` tall enough to
 * exceed them would put the void back.
 */
export function Stats() {
  const [primary, ...supporting] = content.stats

  return (
    <Section id="telemetry" grid data-export="stats">
      <Container>
        <SectionSplit id="telemetry" title={content.trust.title} description={content.trust.note} >

          <Reveal>
            {/* Not `lg:grid-cols-2`. An even split leaves a supporting cell a
                quarter of the body column — 85px inside its padding at the `lg`
                breakpoint, which is narrower than the word PRODUCTION and
                narrower than the label `03 / DELIVERY`. 0.78fr buys the four
                cells ~115px there while still leaving the emphasised panel more
                room than its figure needs. */}
            <div className="grid border border-white/11 lg:grid-cols-[minmax(0,0.78fr)_minmax(0,1fr)]">
              <article className="relative flex min-h-72 flex-col justify-between overflow-hidden border-b border-white/11 p-7 lg:border-r lg:border-b-0 lg:p-10">
                <span className="flex items-center gap-2.5 font-mono text-[9px] uppercase tracking-[0.22em] text-accent">
                  <span aria-hidden="true" className="command-status-dot h-1.75 w-1.75 rounded-full bg-accent" />
                  Studio signal / active
                </span>
                {/* A single wide ring, cropped by the panel — the telemetry
                    equivalent of a dial you only see part of. It sits in the
                    top-right void rather than the bottom-right corner: the
                    panel is no longer wide enough for a bottom ring to clear
                    the figure, and an arc drawn through `25+` reads as a
                    mistake rather than as an instrument. */}
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute -top-14 -right-18 h-60 w-60 rounded-full border border-accent/18 lg:-top-20 lg:-right-24 lg:h-80 lg:w-80"
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

              {/* Row 1 carries the bottom hairline, column 1 the right one. The
                  single-column stack below `sm` needs a rule under cell 03 that
                  the 2×2 must not have, hence the one `sm:border-b-0`. */}
              <div className="grid sm:grid-cols-2">
                {supporting.map((stat, i) => (
                  <article
                    key={stat.label}
                    className={`min-w-0 border-white/11 p-5.5 lg:p-6.5 ${
                      i < 2 ? 'border-b' : i === 2 ? 'border-b sm:border-b-0' : ''
                    } ${i % 2 === 0 ? 'sm:border-r' : ''}`}
                  >
                    <Readout
                      label={`0${i + 2} / ${SUPPORTING_LABELS[i]}`}
                      value={<CountUp value={stat.value} />}
                      unit={'unit' in stat ? stat.unit : undefined}
                      title={stat.label}
                      note={stat.note}
                    />
                  </article>
                ))}
              </div>
            </div>
          </Reveal>
        </SectionSplit>
      </Container>
    </Section>
  )
}
