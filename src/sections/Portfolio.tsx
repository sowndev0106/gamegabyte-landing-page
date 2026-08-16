import { useState } from 'react'
import { content, assets } from '../content/content'
import { Stagger, StaggerItem } from '../components/motion/Stagger'
import { Reveal } from '../components/motion/Reveal'
import { Container } from '../components/ui/Container'
import { Section } from '../components/ui/Section'
import { SectionHeader } from '../components/ui/SectionHeader'
import { ArrowUpRight } from '../components/ui/ArrowUpRight'

const ALL = 'ALL'

export function Portfolio() {
  const [filter, setFilter] = useState<string>(ALL)
  const filters = [ALL, ...content.portfolio.tags]

  const items = content.portfolio.items
    .map((item, index) => ({ ...item, image: assets.portfolio[index] }))
    .filter((item) => filter === ALL || item.tag === filter)

  return (
    <Section id="portfolio">
      <Container>
        <SectionHeader
          id="portfolio"
          title={content.portfolio.title}
          description={content.portfolio.intro}
        />

        <Reveal className="mb-10">
          <div
            className="flex flex-wrap gap-2 lg:justify-end"
            role="group"
            aria-label="Filter case studies by discipline"
          >
          {filters.map((tag) => {
            const active = filter === tag
            return (
              <button
                key={tag}
                type="button"
                onClick={() => setFilter(tag)}
                aria-pressed={active}
                className={`inline-flex min-h-11 cursor-pointer items-center border px-4 font-mono text-[11px] uppercase tracking-[0.18em] transition-colors ${
                  active
                    ? 'border-accent bg-accent text-ink'
                    : 'border-white/12 text-white/70 hover:border-white/40 hover:text-white'
                }`}
              >
                {tag}
              </button>
              )
            })}
          </div>
        </Reveal>

        {items.length === 0 ? (
          <p className="hud-surface p-12 text-center font-mono text-sm uppercase tracking-[0.18em] text-white/60">
            No case studies under this discipline yet.
          </p>
        ) : (
          <Stagger key={filter} className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((item) => (
              <StaggerItem key={item.title}>
                <a
                  href={item.href}
                  className="hud-surface hud-surface-interactive group flex h-full flex-col overflow-hidden"
                >
                  <div className="relative aspect-16/10 overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.title}
                      loading="lazy"
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    />
                    <div aria-hidden="true" className="absolute inset-0 bg-linear-to-t from-ink via-ink/20 to-transparent" />
                    <span className="absolute left-4 top-4 border border-white/20 bg-ink/70 px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.18em] text-accent backdrop-blur-sm">
                      {item.tag}
                    </span>
                  </div>
                  <div className="flex flex-1 items-end justify-between gap-4 p-6">
                    <h3 className="font-display text-xl font-bold tracking-tight text-white transition-colors group-hover:text-accent">
                      {item.title}
                    </h3>
                    <ArrowUpRight className="mb-1 h-4 w-4 shrink-0 text-white/30 transition duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent" />
                  </div>
                </a>
              </StaggerItem>
            ))}
          </Stagger>
        )}
      </Container>
    </Section>
  )
}
