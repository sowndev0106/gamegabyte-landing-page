import { content, assets } from '../content/content'
import { Reveal } from '../components/motion/Reveal'
import { Container } from '../components/ui/Container'
import { Section } from '../components/ui/Section'
import { SectionHeader } from '../components/ui/SectionHeader'
import { ArrowUpRight } from '../components/ui/ArrowUpRight'

/**
 * Three files in an asymmetric archive: one held open at full height, two
 * stacked beside it. The approved design carries no filter control — with three
 * projects and three distinct tags, each filter would resolve to one item.
 */
export function Portfolio() {
  const items = content.portfolio.items.map((item, index) => ({ ...item, image: assets.portfolio[index] }))

  return (
    <Section id="portfolio">
      <Container>
        <SectionHeader id="portfolio" title={content.portfolio.title} description={content.portfolio.intro} />

        <Reveal>
          <div className="grid grid-cols-1 grid-rows-[460px_280px_280px] gap-3.5 lg:grid-cols-[1.2fr_0.8fr] lg:grid-rows-[330px_330px]">
            {items.map((item, i) => (
              <a
                key={item.title}
                href={item.href}
                data-archive-item
                className={`group relative overflow-hidden border border-white/11 ${
                  i === 0 ? 'lg:row-span-2' : ''
                }`}
              >
                <img
                  src={item.image}
                  alt={item.title}
                  loading="lazy"
                  className="h-full w-full object-cover saturate-75 transition duration-500 group-hover:scale-[1.025] group-hover:saturate-125"
                />
                <div className="absolute inset-x-0 bottom-0 bg-[linear-gradient(transparent,rgb(3_2_19/0.96))] px-5.5 pt-15.5 pb-5.5">
                  <span className="flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.22em] text-accent">
                    {String(i + 1).padStart(2, '0')} / {item.tag}
                  </span>
                  <h3 className="mt-2.5 flex items-center gap-2 font-display text-[28px] leading-none font-bold text-white">
                    {item.title}
                    <ArrowUpRight className="h-4 w-4 opacity-0 transition-opacity group-hover:opacity-100" />
                  </h3>
                </div>
              </a>
            ))}
          </div>
        </Reveal>
      </Container>
    </Section>
  )
}
