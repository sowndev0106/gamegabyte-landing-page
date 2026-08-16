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
 * reads as a hand-off: the course poster on one side, the intake and its
 * outbound control on the other.
 *
 * Two constraints decide this panel's proportions, and they pull against each
 * other. The poster is a composed 16:9 frame — mascot on the left, its billing
 * block on the right — so it is shown whole at its own ratio rather than
 * cropped into a column; any half-width column is far more portrait than 16:9,
 * and `object-cover` there eats either the mascot or the billing block. But a
 * 16:9 image beside a column of copy is only as tall as its column is wide, so
 * if the copy outgrows it the poster ends up floating in a band of ink.
 *
 * Hence the one breakpoint on this card, and the number behind it. Beside the
 * poster the copy stands at ~323px: a name, two facts, a control and the host.
 * A 16:9 poster is that tall at ~574px wide, and 574px is 1.35 parts of a card
 * taking 70% of the page — which needs a **1700px** viewport. The band measures
 * 0 at 1700 and 1920, 43px at 1600 and 57px at 1536, so it is a measurement
 * rather than a round number: re-derive it if the split ratio, the poster or
 * this copy changes.
 *
 * Above 1700 the card splits, poster left. Below it the card stacks — poster
 * full width, the same three blocks in a row beneath — which is taller than the
 * split but shows the poster larger, and never letterboxes it. The course
 * number and the instructor stay out of the card in either arrangement; they
 * are in `academy.body`, where they cost it no height.
 *
 * 1700 is the only width on the site past `lg`, and it is deliberately an
 * arbitrary variant rather than a new named breakpoint — it is one card's
 * measurement, not a page-wide step other sections should start reaching for.
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
            <div className="grid overflow-hidden border border-white/11 min-[1700px]:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)]">
              {/* Centred, not stretched: the cell is a frame the poster hangs
                  in, so any height the copy beside it adds shows as ink above
                  and below rather than as a crop. */}
              <div className="flex items-center border-b border-white/11 min-[1700px]:border-r min-[1700px]:border-b-0">
                {/* Intrinsic ratio, not a cropping frame: the real dimensions on
                    the element reserve 16:9 before the bytes land and draw every
                    pixel of the poster once they do. */}
                <img
                  src={assets.academyCourse}
                  alt={course.alt}
                  width={1920}
                  height={1080}
                  loading="lazy"
                  className="block w-full"
                />
              </div>

              {/* The same three blocks in both arrangements — beside the poster
                  they run down a column, under it they run across a row — so
                  the switch is direction, not markup. Each fact is a mono label
                  over its value rather than a bordered table row, because that
                  pair reads the same standing up as lying down; a rule under a
                  row would have to be conditional on the arrangement.
                  `justify-between` spreads whatever slack the poster's height
                  leaves instead of pooling it into one dead gap. */}
              <div className="flex flex-wrap items-center justify-between gap-x-10 gap-y-7 p-7 lg:p-8 min-[1700px]:flex-col min-[1700px]:items-stretch min-[1700px]:gap-8">
                <p className="font-display text-[22px] leading-tight font-bold uppercase tracking-tight text-white">
                  {course.name}
                </p>

                {/* The two facts sit side by side in both arrangements. Run
                    down the column instead and the copy grows ~65px — enough to
                    outgrow the poster and reintroduce the very band the 1700px
                    switch exists to avoid. */}
                <dl className="flex flex-wrap gap-x-10 gap-y-5">
                  {course.rows.map((row) => (
                    <div key={row.key} className="min-w-0">
                      <dt className="font-mono text-[9px] uppercase tracking-[0.22em] text-white/48">
                        {row.key}
                      </dt>
                      <dd className="mt-2 text-sm leading-relaxed text-white/80">{row.value}</dd>
                    </div>
                  ))}
                </dl>

                <div className="w-full sm:w-auto min-[1700px]:w-auto">
                  <a
                    href={content.academy.href}
                    target="_blank"
                    rel="noreferrer"
                    className="flex min-h-13 items-center justify-center gap-2 bg-accent px-6 font-display text-base font-bold uppercase text-ink transition-colors hover:bg-accent-bright"
                  >
                    {content.academy.cta}
                    <ArrowUpRight className="h-4 w-4" />
                  </a>
                  {/* The one thing the poster cannot say: that this control
                      leaves the site, and for where. Derived, never retyped. */}
                  <p className="mt-3 font-mono text-[9px] uppercase leading-relaxed tracking-[0.16em] break-all text-white/48">
                    {destinationHost}
                  </p>
                </div>
              </div>
            </div>
          </Reveal>
        </SectionSplit>
      </Container>
    </Section>
  )
}
