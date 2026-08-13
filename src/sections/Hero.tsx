import { content, assets } from '../content/content'
import { Stagger, StaggerItem } from '../components/motion/Stagger'
import { Button } from '../components/ui/Button'
import { Container } from '../components/ui/Container'
import { GlowSpot } from '../components/ui/Section'

export function Hero() {
  const [headlineLead, headlineAccent] = content.hero.headline
  const highlightSuffix = ' Game'
  const hasHighlightSuffix = headlineLead.endsWith(highlightSuffix)
  const headlinePrefix = hasHighlightSuffix ? headlineLead.slice(0, -highlightSuffix.length) : headlineLead

  return (
    <section
      id="home"
      className="relative flex min-h-[calc(100vh-5rem)] items-center overflow-hidden bg-ink pt-24 pb-16 lg:min-h-screen"
    >
      <img src={assets.backgrounds.hero} alt="" className="absolute inset-0 h-full w-full object-cover" />
      <div className="absolute inset-0 bg-ink/85" />
      <div
        aria-hidden="true"
        className="hud-grid pointer-events-none absolute inset-0 opacity-70 [mask-image:radial-gradient(ellipse_at_50%_40%,black,transparent_70%)]"
      />
      <GlowSpot className="left-1/2 top-[18%] h-[380px] w-[620px] -translate-x-1/2" />
      <GlowSpot className="right-[8%] bottom-[6%] h-[320px] w-[420px]" color="brand" />

      <Container className="relative z-10">
        <Stagger className="mx-auto flex max-w-[1160px] flex-col items-center gap-7 text-center">
          <StaggerItem>
            <p className="font-mono text-xs uppercase tracking-[0.32em] text-accent sm:text-sm">
              <span aria-hidden="true" className="text-white/55">//</span> Game marketing studio
            </p>
          </StaggerItem>
          <StaggerItem>
            <h1 className="font-display text-[38px] font-bold leading-[0.98] tracking-tight text-white sm:text-6xl md:text-7xl xl:text-[92px]">
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
            <p className="max-w-2xl text-lg leading-relaxed text-white/75 sm:text-xl lg:max-w-3xl">
              {content.hero.sub}
            </p>
          </StaggerItem>
          <StaggerItem>
            {/* One primary CTA (accent); the case-study link is deliberately secondary. */}
            <div className="mt-2 flex w-full max-w-sm flex-col items-stretch justify-center gap-4 sm:w-auto sm:max-w-none sm:flex-row">
              <Button href="#contact" variant="accent" showArrow className="w-full sm:w-auto">
                {content.hero.secondaryCta}
              </Button>
              <Button href="#portfolio" variant="ghost" showArrow className="w-full sm:w-auto">
                {content.hero.primaryCta}
              </Button>
            </div>
          </StaggerItem>
          <StaggerItem className="w-full">
            <dl className="mt-10 grid w-full grid-cols-1 gap-px overflow-hidden border border-white/10 bg-white/8 sm:grid-cols-3">
              {content.hero.credentials.map((item) => (
                <div key={item.label} className="bg-ink px-6 py-5 text-left">
                  <dt className="font-mono text-[11px] uppercase tracking-[0.2em] text-white/55">{item.label}</dt>
                  <dd className="mt-1 font-display text-lg font-bold text-white">{item.value}</dd>
                </div>
              ))}
            </dl>
          </StaggerItem>
        </Stagger>
      </Container>
    </section>
  )
}
