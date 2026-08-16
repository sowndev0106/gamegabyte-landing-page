import { content } from '../content/content'
import { PixelSprite } from '../components/brand/PixelSprite'
import { Reveal } from '../components/motion/Reveal'
import { Container } from '../components/ui/Container'
import { Section } from '../components/ui/Section'
import { SectionHeader } from '../components/ui/SectionHeader'

/**
 * Four parallel claims, so they sit as equal nodes in one divided system
 * rather than as a numbered sequence.
 */
export function WhyChooseUs() {
  const { title, intro } = content.advantagesSection

  return (
    <Section id="about" grid>
      <Container>
        <SectionHeader
          id="about"
          title={title.map((line) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
          description={intro}
        />

        <Reveal>
          <div className="grid border border-white/11 md:grid-cols-2 lg:grid-cols-4">
            {content.why.map((item, i) => (
              <article
                key={item.tag}
                data-advantage
                className={`relative flex min-h-65 flex-col overflow-hidden p-7 ${
                  i < content.why.length - 1 ? 'border-b border-white/11' : ''
                } md:border-b-0 ${i % 2 === 0 ? 'md:border-r md:border-white/11' : ''} ${
                  i < 2 ? 'md:border-b md:border-white/11' : ''
                } lg:border-b-0 ${i < 3 ? 'lg:border-r lg:border-white/11' : 'lg:border-r-0'}`}
              >
                <span className="font-mono text-[9px] uppercase tracking-[0.22em] text-accent">{item.tag}</span>
                <PixelSprite index={item.sprite} className="absolute top-6 right-5 h-16 w-16 opacity-65" />
                <h3 className="mt-auto font-display text-[22px] leading-tight font-bold text-white">{item.title}</h3>
                <p className="mt-3.5 leading-relaxed text-white/70">{item.body}</p>
                <span className="mt-6 text-right font-mono text-[8px] uppercase tracking-[0.18em] text-white/30">
                  {item.meta}
                </span>
              </article>
            ))}
          </div>
        </Reveal>
      </Container>
    </Section>
  )
}
