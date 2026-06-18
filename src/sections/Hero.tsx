import { content, assets } from '../content/content'
import { Stagger, StaggerItem } from '../components/motion/Stagger'
import { Button } from '../components/ui/Button'
import { Container } from '../components/ui/Container'

export function Hero() {
  return (
    <section id="home" className="relative flex min-h-screen items-center overflow-hidden bg-black pt-24">
      <img src={assets.backgrounds.hero} alt="" className="absolute inset-0 h-full w-full object-cover opacity-20" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,rgba(96,31,235,0.20),transparent_32%),linear-gradient(180deg,rgba(0,0,0,0.38),#000_82%)]" />
      <div className="absolute left-[16%] top-[34%] text-3xl font-black text-accent opacity-70">+</div>
      <div className="absolute right-[13%] top-[33%] text-3xl font-black text-purple-light opacity-80">+</div>
      <div className="absolute left-[18%] top-[52%] rotate-12 text-8xl font-black text-purple-light opacity-80">+</div>
      <Container className="relative z-10">
        <Stagger className="mx-auto flex max-w-5xl translate-y-8 flex-col items-center gap-7 text-center sm:translate-y-14">
          <StaggerItem>
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-accent">{content.hero.tagline}</p>
          </StaggerItem>
          <StaggerItem>
            <h1 className="font-display text-5xl font-bold leading-[1.02] text-white sm:text-8xl lg:text-9xl">
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
