import { assets, content } from '../content/content'
import { LazyVideo } from '../components/motion/LazyVideo'
import { Reveal } from '../components/motion/Reveal'
import { TrustBar } from './TrustBar'

export function Showreel() {
  return (
    <section id="reel" className="relative w-full bg-black py-8 sm:py-12 lg:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="mb-8 bg-gradient-to-r from-white via-[#f4f4f4] to-[#7a7a7a] bg-clip-text text-center font-display text-2xl font-bold capitalize text-transparent sm:mb-12 sm:text-3xl md:text-4xl lg:mb-16 lg:text-5xl xl:text-[56px]">
          {content.reel.title}
        </h2>
        <Reveal>
          <div className="mx-auto mb-8 aspect-video w-[90%] overflow-hidden rounded-lg sm:mb-12 sm:w-[85%] lg:mb-16 lg:w-[1166px]">
            <LazyVideo
              src={content.reel.src}
              poster={assets.reelPoster}
              aria-label={content.reel.ariaLabel}
              className="w-full h-full object-cover"
            />
          </div>
        </Reveal>
        <TrustBar />
      </div>
    </section>
  )
}
