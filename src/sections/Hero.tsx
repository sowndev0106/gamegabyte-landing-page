import { content, assets } from '../content/content'
import { sectionById } from '../content/sections'
import { Marquee } from '../components/motion/Marquee'
import { Stagger, StaggerItem } from '../components/motion/Stagger'
import { Button } from '../components/ui/Button'
import { Panel } from '../components/ui/Panel'

const { index, eyebrow } = sectionById('home')

/** Decorative signal bars. Deliberately unlabelled — they carry no figure. */
const BAR_HEIGHTS = ['27%', '42%', '39%', '68%', '76%', '62%', '88%', '100%']

export function Hero() {
  const projects = content.stats[0]
  const shipped = content.hero.credentials[1]

  return (
    <section
      id="home"
      className="hud-grid relative grid min-h-245 grid-cols-[minmax(0,1fr)] items-end overflow-hidden bg-ink pt-30 pb-14 md:min-h-240 md:grid-cols-[minmax(0,1.2fr)_minmax(330px,0.8fr)] md:px-12 md:pt-32.5 md:pb-15"
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

      {/* The headline's min-content width sets the grid track's automatic
          minimum, so the track must be clamped or a long word silently pushes
          the whole column past a narrow viewport and gets clipped. */}
      <div className="relative z-10 min-w-0 px-4.5 pb-12 md:px-0 md:pr-[3vw]">
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
          <StaggerItem>
            <dl className="mt-12 flex flex-wrap gap-4.5 border-t border-white/11 pt-5.5 md:gap-7">
              {content.hero.credentials.map((item) => (
                <div key={item.label}>
                  <dt className="font-mono text-[8px] uppercase tracking-[0.18em] text-white/42">{item.label}</dt>
                  <dd className="mt-2.5 font-display text-[13px] font-semibold text-white">{item.value}</dd>
                </div>
              ))}
            </dl>
          </StaggerItem>
        </Stagger>
      </div>

      <div className="relative z-10 flex min-w-0 flex-col gap-3.5 px-4.5 md:px-0 md:pb-12">
        <Panel className="p-5.5">
          <div className="flex items-end justify-between gap-5">
            <span className="font-mono text-[9px] uppercase tracking-[0.22em] text-white/48">
              {content.hero.dashboard.projectsLabel}
            </span>
            <strong className="font-display text-3xl leading-none font-bold text-accent">{projects.value}</strong>
          </div>
          <div aria-hidden="true" className="mt-5 flex h-19.5 items-end gap-1.75">
            {BAR_HEIGHTS.map((height, i) => (
              <i
                key={i}
                style={{ height }}
                className="flex-1 bg-[linear-gradient(var(--color-accent),rgb(182_232_2/0.06))] opacity-75"
              />
            ))}
          </div>
        </Panel>

        <Panel className="p-5.5">
          <div className="flex items-end justify-between gap-5">
            <div>
              <span className="font-mono text-[9px] uppercase tracking-[0.22em] text-white/48">
                {content.hero.dashboard.focusLabel}
              </span>
              <strong className="mt-3 block font-display text-3xl leading-none font-bold text-white">
                {content.hero.dashboard.focusValue}
              </strong>
            </div>
            <span className="font-mono text-[9px] uppercase tracking-[0.22em] text-accent">{shipped.value}</span>
          </div>
        </Panel>

        <Panel className="p-5.5">
          <span className="font-mono text-[9px] uppercase tracking-[0.22em] text-white/48">
            {content.hero.dashboard.nodesLabel}
          </span>
          <ul className="mt-4.5 grid grid-cols-2 gap-2.5">
            {content.services.map((service) => (
              <li
                key={service.title}
                className="flex items-center gap-2 font-mono text-[8px] leading-snug uppercase tracking-[0.12em] text-white/70 before:h-1.25 before:w-1.25 before:shrink-0 before:bg-accent before:shadow-[0_0_10px_var(--color-accent)] before:content-['']"
              >
                {service.title}
              </li>
            ))}
          </ul>
        </Panel>
      </div>

      <div className="relative z-10 col-span-full mt-12 border-y border-white/11 py-3.5">
        <Marquee speed={34}>
          {content.technology.map((item) => (
            <span
              key={item.title}
              className="font-mono text-[9px] whitespace-nowrap uppercase tracking-[0.16em] text-accent"
            >
              {item.title} — {item.body}
            </span>
          ))}
        </Marquee>
      </div>
    </section>
  )
}
