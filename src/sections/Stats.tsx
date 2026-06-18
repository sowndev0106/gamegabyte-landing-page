import { content, assets } from '../content/content'
import { Reveal } from '../components/motion/Reveal'
import { Container } from '../components/ui/Container'

export function Stats() {
  return (
    <section className="relative overflow-hidden bg-black px-4 py-12 sm:px-6 sm:py-20 lg:py-40">
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-[0.05] pointer-events-none"
        style={{ backgroundImage: `url(${assets.backgrounds.pattern})` }}
      />
      <Container className="relative z-10">
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent">OUR NUMBER</p>
          <h2 className="mt-4 font-display text-3xl font-bold uppercase tracking-tight text-white sm:text-4xl md:text-5xl">
            {content.trust.title}
          </h2>
          <p className="mt-4 text-lg text-white/60">
            {content.trust.note}
          </p>
        </div>
        
        <div className="grid grid-cols-2 gap-6 sm:gap-8 md:grid-cols-4">
          {content.stats.map((stat, index) => (
            <Reveal key={stat.label} delay={index * 0.08} className="text-center">
              <p className="font-display text-5xl font-bold text-accent sm:text-[64px]">{stat.value}</p>
              <p className="mt-3 text-sm font-semibold uppercase tracking-[0.16em] text-white/80">{stat.label}</p>
              {stat.note && (
                <p className="mt-2 text-xs uppercase tracking-[0.14em] text-white/40">{stat.note}</p>
              )}
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  )
}
