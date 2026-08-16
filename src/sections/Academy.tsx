import { content, assets } from '../content/content'
import { Reveal } from '../components/motion/Reveal'
import { Container } from '../components/ui/Container'
import { Section } from '../components/ui/Section'
import { SectionSplit } from '../components/ui/SectionSplit'
import { ArrowUpRight } from '../components/ui/ArrowUpRight'

// Derived from the href so the stated destination can never drift from the
// actual one.
const destinationHost = new URL(content.academy.href).host

const { course } = content.academy

/**
 * The training subsystem is the one node that lives off-site, so the panel
 * reads as a hand-off: the course key art on one side, the intake it belongs to
 * and its outbound control on the other.
 *
 * The art is the studio's own poster for the current master class, cropped to
 * the mascot. The poster's other half is a typeset billing block — course
 * number, date, schedule — and it is cropped out rather than shown: type baked
 * into a JPEG at whatever size the column happens to be is unreadable, unco-
 * pyable and unsearchable. Those four facts are set as real text beside it, and
 * they come from `content.academy.course`, off that same poster.
 *
 * Because the art now carries information (the instructor's signature, the
 * Master Classes lockup) it takes a real `alt` — it is no longer the decorative
 * battlefield background that stood in here before.
 *
 * The prototype showed four course tags. They were invented for the mock and
 * were never checked against the real curriculum, so they are deliberately not
 * shipped — add `academy.tags` to content.ts once the studio confirms them.
 */
export function Academy() {
  return (
    <Section id="academy">
      <Container>
        <SectionSplit id="academy" title={content.academy.title} description={content.academy.body}>

          <Reveal>
            <div className="grid overflow-hidden border border-white/11 lg:grid-cols-2">
              {/* Two rules keep the art's own marks — the lockup and the
                  signature, both along its bottom-left — inside the frame.
                  Stacked, the cell takes the crop's exact 800×1080 ratio, so
                  there is nothing to trim. Split, the cell is taller than it is
                  wide by more than the crop is, so cover fills the height and
                  trims width instead: `object-left` spends that trim on the
                  empty forest at the right rather than on the lockup. */}
              <div className="relative aspect-20/27 lg:aspect-auto lg:min-h-110">
                <img
                  src={assets.academyCourse}
                  alt={course.alt}
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover object-left"
                />
                {/* Stacked, the fade only has to carry the last third into the
                    copy below — a full-height ramp would put its darkest end
                    straight over the signature. */}
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-[linear-gradient(0deg,rgb(5_5_12/0.72),transparent_32%)] lg:bg-[linear-gradient(90deg,transparent,rgb(5_5_12/0.9))]"
                />
              </div>

              <div className="flex flex-col justify-between gap-10 p-7 lg:p-12">
                <div>
                  <span className="font-mono text-[9px] uppercase tracking-[0.22em] text-white/48">
                    {course.label}
                  </span>
                  <p className="mt-4 font-display text-[28px] leading-tight font-bold uppercase tracking-tight text-white">
                    {course.name}
                  </p>

                  {/* A fixed key column rather than `justify-between`: the
                      values then share one left edge instead of ragging off the
                      right, which is the page's alignment rule. */}
                  <dl className="mt-7 border-t border-white/11">
                    {course.rows.map((row) => (
                      <div
                        key={row.key}
                        className="grid grid-cols-[minmax(0,80px)_minmax(0,1fr)] items-baseline gap-x-5 border-b border-white/11 py-3"
                      >
                        <dt className="font-mono text-[9px] uppercase tracking-[0.16em] text-white/48">
                          {row.key}
                        </dt>
                        <dd className="text-sm leading-relaxed text-white/80">{row.value}</dd>
                      </div>
                    ))}
                  </dl>
                </div>

                <div>
                  <span className="font-mono text-[9px] uppercase tracking-[0.22em] text-white/48">
                    {content.academy.destination}
                  </span>
                  {/* A 37-character host does not fit any display step in this
                      column, and a URL is data rather than a title — it reads
                      as the mono caption to the control below it. */}
                  <p className="mt-2 font-mono text-[9px] uppercase leading-relaxed tracking-[0.16em] break-all text-white/60">
                    {destinationHost}
                  </p>

                  <a
                    href={content.academy.href}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-5 flex min-h-14 items-center justify-center gap-2 bg-accent px-8 font-display text-base font-bold uppercase text-ink transition-colors hover:bg-accent-bright"
                  >
                    {content.academy.cta}
                    <ArrowUpRight className="h-4 w-4" />
                  </a>
                </div>
              </div>
            </div>
          </Reveal>
        </SectionSplit>
      </Container>
    </Section>
  )
}
