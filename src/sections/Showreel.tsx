import { assets, content } from '../content/content'
import { LazyVideo } from '../components/motion/LazyVideo'
import { Reveal } from '../components/motion/Reveal'
import { Container } from '../components/ui/Container'
import { Section } from '../components/ui/Section'
import { SectionHeader } from '../components/ui/SectionHeader'
import { TrustBar } from './TrustBar'

export function Showreel() {
  return (
    <Section id="reel">
      <Container>
        <SectionHeader id="reel" title={content.reel.title} description={content.reel.intro} />

        <Reveal>
          {/* Ticks at opposite corners frame the player as a monitored feed
              rather than a plain embed. */}
          <div className="relative border border-white/11 p-3.5 md:p-5">
            <span
              aria-hidden="true"
              className="absolute -top-px -left-px h-6 w-6 border-t-2 border-l-2 border-accent"
            />
            <span
              aria-hidden="true"
              className="absolute -right-px -bottom-px h-6 w-6 border-r-2 border-b-2 border-accent"
            />
            <LazyVideo
              src={content.reel.src}
              poster={assets.reelPoster}
              status={content.reel.status}
              labels={content.reel.controls}
              aria-label={content.reel.ariaLabel}
              className="aspect-video w-full"
            />
          </div>
        </Reveal>

        <TrustBar />
      </Container>
    </Section>
  )
}
