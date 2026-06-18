import { content, assets } from '../content/content'
import { Stagger, StaggerItem } from '../components/motion/Stagger'
import { Button } from '../components/ui/Button'
import { Container } from '../components/ui/Container'

export function Hero() {
  return (
    <section id="home" className="relative flex min-h-screen items-center overflow-hidden bg-black pt-20">
      <img src={assets.backgrounds.hero} alt="" className="absolute inset-0 h-full w-full object-cover opacity-[0.08]" />
      <div className="absolute inset-0 bg-black/70" />
      <div className="absolute left-[17%] top-[31%] text-2xl font-black text-accent opacity-70">+</div>
      <div className="absolute right-[13%] top-[33%] text-2xl font-black text-purple-light opacity-80">+</div>
      <div className="absolute left-[15%] top-[53%] rotate-12 text-8xl font-black text-purple-light opacity-80">+</div>
      <Container className="relative z-10">
        <Stagger className="mx-auto flex max-w-[980px] translate-y-20 flex-col items-center gap-7 text-center sm:translate-y-28">
          <StaggerItem>
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-accent">{content.hero.tagline}</p>
          </StaggerItem>
          <StaggerItem>
            <h1 className="font-display text-[58px] font-bold leading-[1.04] text-white sm:text-[92px] lg:text-[118px]">
              We Are The <span className="text-accent">Game</span>
              <br />
              Marketing Studio
            </h1>
          </StaggerItem>
          <StaggerItem>
            <p className="max-w-2xl text-lg leading-8 text-white/76 sm:text-xl">{content.hero.sub}</p>
          </StaggerItem>
          <StaggerItem>
            <div className="flex flex-wrap justify-center gap-4">
              <Button href="#portfolio" variant="light">Case Study</Button>
              <Button href="#contact">Connect with us</Button>
            </div>
          </StaggerItem>
        </Stagger>
      </Container>
    </section>
  )
}
