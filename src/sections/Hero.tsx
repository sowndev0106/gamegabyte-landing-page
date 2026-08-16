import { content, assets } from '../content/content'
import { sectionById } from '../content/sections'
import { Reveal } from '../components/motion/Reveal'
import { Stagger, StaggerItem } from '../components/motion/Stagger'
import { Button } from '../components/ui/Button'
import { Panel } from '../components/ui/Panel'
import { CornerTicks } from '../components/ui/CornerTicks'

const { index, eyebrow } = sectionById('home')

export function Hero() {
  return (
    <section
      id="home"
      // Fullscreen with a ceiling, expressed as one `min-height` rather than a
      // min/max pair: CSS resolves `min-height` AFTER `max-height`, so pairing
      // `min-h-svh` with a `max-h` silently does nothing — the min always wins.
      // `min(100svh, …)` caps the demand instead, which also lets the section
      // grow past the cap when the content needs it. That matters because this
      // element clips: a real `max-height` would cut a tall mobile layout off
      // rather than let it run on.
      className="hud-grid relative flex min-h-[min(100svh,1000px)] items-center overflow-hidden bg-ink pt-30 pb-14 md:pt-32.5 md:pb-15"
    >
      <img
        src={assets.backgrounds.hero}
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-[0.38]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,var(--color-ink)_4%,rgb(5_5_12/0.78)_51%,rgb(5_5_12/0.3)),linear-gradient(0deg,var(--color-ink),transparent_45%)]"
      />

      {/* Full-bleed on purpose — the hero is the one section that does not sit
          on the page's `Container` measure. The right track is capped rather
          than fluid even so: it holds a mono table, and past ~480px the row
          label and its status drift so far apart they stop reading as one row.

          `items-start` rather than `items-end`, so the table hangs from the top
          of the frame level with the eyebrow instead of floating at the bottom. */}
      {/* The row gap is mobile-only: stacked, the panel's corner tick otherwise
          lands on the secondary button. Side by side there is no row to space,
          and the credentials row carries its own margin. */}
      <div className="relative z-10 grid w-full grid-cols-[minmax(0,1fr)] items-start gap-x-[3vw] gap-y-14 px-4.5 md:grid-cols-[minmax(0,1.2fr)_minmax(330px,480px)] md:gap-y-0 md:px-12">
        {/* The headline's min-content width sets the grid track's automatic
            minimum, so the track must be clamped or a long word silently pushes
            the whole column past a narrow viewport and gets clipped. */}
        <div className="min-w-0">
          <Stagger>
            <StaggerItem>
              <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-accent">
                <span aria-hidden="true" className="text-white/45">
                  [{index}]
                </span>{' '}
                {eyebrow}
              </p>
            </StaggerItem>
            <StaggerItem>
              <h1 className="my-6 font-display text-[clamp(34px,14vw,74px)] font-extrabold uppercase leading-[0.82] tracking-[-0.065em] text-white md:text-[clamp(64px,7.2vw,112px)]">
                {content.hero.headline.map((line) => (
                  <span key={line.text} className={`block ${line.accent ? 'text-accent' : ''}`}>
                    {line.text}
                  </span>
                ))}
              </h1>
            </StaggerItem>
            <StaggerItem>
              <p className="max-w-162.5 text-base leading-relaxed text-white/70 md:text-lg">{content.hero.sub}</p>
            </StaggerItem>
            <StaggerItem>
              <div className="mt-8 flex flex-wrap gap-3.5">
                <Button href="#portfolio" variant="accent" showArrow>
                  {content.hero.primaryCta}
                </Button>
                <Button href="#contact" variant="ghost" showArrow={false}>
                  {content.hero.secondaryCta}
                </Button>
              </div>
            </StaggerItem>
          </Stagger>
        </div>

        {/* One divided panel rather than three floating ones: the other eleven
            sections all build a single bordered box subdivided by hairlines, and
            the hero was the only place on the page that did not. */}
        {/* Stretched to the left column's height from lg up. Top-aligning the
            panel left the whole lower-right quadrant empty — 178px at 1840,
            243px at 1440 — and the full-width rule underneath then read as a
            bare edge rather than a divider between two columns. Below lg the
            headline wraps enough that matching its height would stretch six
            table rows to 130px each, so the panel keeps its natural size there. */}
        <div className="relative min-w-0 lg:self-stretch">
          {/* Panel's ground is 1.5% white, which assumes ink behind it. Over the
              bright part of the art the rows stopped being readable, so the table
              carries its own scrim rather than the whole right edge being
              darkened — that dimmed the art everywhere to fix one box. It is a
              sibling rather than a Panel background because Tailwind resolves two
              competing background utilities by stylesheet order, not by which one
              the caller passed. */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -inset-6 bg-[radial-gradient(ellipse_at_center,var(--color-ink)_58%,transparent_100%)] opacity-88"
          />
          <Panel as="aside" aria-label={content.hero.dashboard.nodesLabel} className="relative flex h-full flex-col">
            <CornerTicks corners="diagonal" />

            <div className="flex items-center justify-between gap-4 border-b border-white/11 px-5 py-4">
              <span className="font-mono text-[9px] uppercase tracking-[0.22em] text-white/48">
                {content.hero.dashboard.nodesLabel}
              </span>
              <span aria-hidden="true" className="command-status-dot h-1.5 w-1.5 rounded-full bg-accent" />
            </div>

            {/* The rows absorb the stretch rather than a gap opening above the
                footer. Each row is a grid for its three columns and a flex child
                for its share of the height. */}
            <ul className="flex flex-1 flex-col">
              {content.services.map((service, i) => (
                <li
                  key={service.title}
                  data-hero-node
                  className="grid flex-1 grid-cols-[24px_minmax(0,1fr)_auto] items-center gap-3 border-b border-white/5 px-5 py-3.5 font-mono text-[10px] uppercase tracking-[0.12em] last:border-b-0"
                >
                  <span aria-hidden="true" className="text-white/28">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="text-white/78">{service.title}</span>
                  <span className="text-accent">{content.hero.dashboard.nodeStatus}</span>
                </li>
              ))}
            </ul>

            <div className="flex items-center justify-between gap-4 border-t border-white/11 px-5 py-4 font-mono text-[9px] uppercase tracking-[0.22em]">
              <span className="text-white/48">{content.hero.dashboard.focusLabel}</span>
              <span className="text-accent">{content.hero.dashboard.focusValue}</span>
            </div>
          </Panel>
        </div>

        {/* The credentials sit on their own full-width row so the rule above them
            runs the whole measure and passes under the node table, tying the two
            columns into one composition instead of stopping at the headline. */}
        <Reveal delay={0.3} className="col-span-full mt-12">
          <dl className="flex flex-wrap gap-4.5 border-t border-white/11 pt-5.5 md:gap-7">
            {content.hero.credentials.map((item) => (
              <div key={item.label}>
                <dt className="font-mono text-[8px] uppercase tracking-[0.18em] text-white/42">{item.label}</dt>
                <dd className="mt-2.5 font-display text-[13px] font-semibold text-white">{item.value}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  )
}
