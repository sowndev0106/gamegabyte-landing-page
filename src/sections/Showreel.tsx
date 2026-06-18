import { assets, content } from '../content/content'
import { LazyVideo } from '../components/motion/LazyVideo'
import { Reveal } from '../components/motion/Reveal'
import { Container } from '../components/ui/Container'
import { Section } from '../components/ui/Section'
import { SectionHeading } from '../components/ui/SectionHeading'

export function Showreel() {
  return (
    <Section id="reel" className="bg-black">
      <Container>
        <SectionHeading eyebrow="Showreel 2025" title={content.reel.title} />
        <Reveal>
          <div className="overflow-hidden border border-white/10 bg-white/[0.035] p-2">
            <LazyVideo src={content.reel.src} poster={assets.poster} className="aspect-video w-full object-cover" />
          </div>
        </Reveal>
      </Container>
    </Section>
  )
}
