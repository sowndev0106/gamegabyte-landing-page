import { assets, content } from '../content/content'
import { LazyVideo } from '../components/motion/LazyVideo'
import { Reveal } from '../components/motion/Reveal'
import { Container } from '../components/ui/Container'
import { Section } from '../components/ui/Section'
import { SectionHeader } from '../components/ui/SectionHeader'
import { CornerTicks } from '../components/ui/CornerTicks'
import { TrustBar } from './TrustBar'

export function Showreel() {
  return (
    <Section id="reel">
      <Container>
        <SectionHeader
          id="reel"
          title={content.reel.title}
          description="A minute of the work — interface design, campaign pages and launch art shipped for game teams."
        />
        <Reveal>
          {/* Corner ticks frame the player like a viewfinder instead of a plain rounded box. */}
          <div className="relative">
            <CornerTicks size="h-6 w-6" />
            <LazyVideo
              src={content.reel.src}
              poster={assets.reelPoster}
              aria-label={content.reel.ariaLabel}
              className="aspect-video w-full border border-white/10"
            />
          </div>
        </Reveal>
        <TrustBar />
      </Container>
    </Section>
  )
}
