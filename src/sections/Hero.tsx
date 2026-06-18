import { content, assets } from '../content/content'
import { Stagger, StaggerItem } from '../components/motion/Stagger'
import { Button } from '../components/ui/Button'
import { Container } from '../components/ui/Container'

export function Hero() {
  const [headlineLead, headlineAccent] = content.hero.headline
  const highlightSuffix = ' Game'
  const hasHighlightSuffix = headlineLead.endsWith(highlightSuffix)
  const headlinePrefix = hasHighlightSuffix ? headlineLead.slice(0, -highlightSuffix.length) : headlineLead

  return (
    <section id="home" className="relative flex min-h-[calc(100vh-5rem)] items-center overflow-hidden bg-black pt-20 lg:min-h-[calc(100vh-14rem)]">
      <img src={assets.backgrounds.hero} alt="" className="absolute inset-0 h-full w-full object-cover opacity-100" />
      <div className="absolute inset-0 bg-black/72" />
      <div className="absolute left-[17%] top-[31%] text-2xl font-black text-accent opacity-70">+</div>
      <div className="absolute right-[13%] top-[33%] text-2xl font-black text-purple-light opacity-80">+</div>
      <div className="absolute left-[15%] top-[53%] rotate-12 text-8xl font-black text-purple-light opacity-80">+</div>
      <Container className="relative z-10">
        <Stagger className="mx-auto flex max-w-[1160px] flex-col items-center gap-7 py-16 text-center lg:-mt-32 lg:py-24">
          <StaggerItem>
            <h1 className="font-display text-[36px] font-bold leading-tight text-white sm:text-5xl md:text-6xl lg:text-7xl xl:text-[90px]">
              <span className="block">
                {hasHighlightSuffix ? (
                  <>
                    {headlinePrefix} <span className="text-accent">Game</span>
                  </>
                ) : (
                  headlineLead
                )}
              </span>
              <span className="block">{headlineAccent}</span>
            </h1>
          </StaggerItem>
          <StaggerItem>
            <p className="max-w-3xl text-xl leading-8 text-white/90 sm:text-[26px] sm:leading-[1.4] md:text-[28px] lg:max-w-4xl">
              {content.hero.sub}
            </p>
          </StaggerItem>
          <StaggerItem>
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button href="#portfolio" variant="light" showArrow>
                {content.hero.primaryCta}
              </Button>
              <Button href="#contact" showArrow>
                {content.hero.secondaryCta}
              </Button>
            </div>
          </StaggerItem>
        </Stagger>
      </Container>
    </section>
  )
}
