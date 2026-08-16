import { assets, content } from '../content/content'
import { LazyVideo } from '../components/motion/LazyVideo'
import { Reveal } from '../components/motion/Reveal'
import { Container } from '../components/ui/Container'
import { Section } from '../components/ui/Section'
import { SectionSplit } from '../components/ui/SectionSplit'
import { CornerTicks } from '../components/ui/CornerTicks'
import { TrustBar } from './TrustBar'

export function Showreel() {
  return (
    <Section id="reel">
      <Container>
        <SectionSplit layout="stacked" id="reel" title={content.reel.title} description={content.reel.intro} >

          <Reveal>
            {/* Ticks at opposite corners frame the player as a monitored feed
                rather than a plain embed. */}
            <div className="relative border border-white/11 p-3.5 md:p-5">
              <CornerTicks size="h-6 w-6" corners="diagonal" />
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
        </SectionSplit>
      </Container>
    </Section>
  )
}
