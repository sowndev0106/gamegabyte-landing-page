import { content, assets } from '../content/content'
import { Stagger, StaggerItem } from '../components/motion/Stagger'
import { Container } from '../components/ui/Container'

export function WhyChooseUs() {
  return (
    <section id="about" className="relative overflow-hidden bg-ink py-16 sm:py-24 lg:py-32">
      <img 
        src={assets.backgrounds.pixelTrees} 
        alt="" 
        loading="lazy" 
        className="absolute inset-x-0 top-0 h-56 w-full object-cover opacity-14 pointer-events-none" 
      />
      <Container className="relative z-10">
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent">WHY CHOOSE US</p>
          <h2 className="mt-4 font-display text-4xl font-bold uppercase tracking-tight text-white sm:text-5xl">
            Strategic partners, not just an agency
          </h2>
        </div>
        
        <Stagger className="grid gap-5 sm:grid-cols-2">
          {content.why.map((item) => (
            <StaggerItem key={item.title} className="border border-white/10 bg-white/[0.035] p-6 flex flex-col justify-between min-h-[160px]">
              <h3 className="font-display text-2xl font-bold text-white capitalize">{item.title}</h3>
              <p className="mt-4 text-base leading-relaxed text-white/70">{item.body}</p>
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </section>
  )
}
