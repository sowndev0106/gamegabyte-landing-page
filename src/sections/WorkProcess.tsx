import { content } from '../content/content'
import { Stagger, StaggerItem } from '../components/motion/Stagger'
import { Container } from '../components/ui/Container'

export function WorkProcess() {
  return (
    <section id="process" className="bg-black py-16 sm:py-24 lg:py-32">
      <Container>
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent">OUR WORK PROCESS</p>
          <h2 className="mt-4 font-display text-4xl font-bold uppercase tracking-tight text-white sm:text-5xl">
            From strategy to launch
          </h2>
        </div>
        
        <Stagger className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {content.process.map((step) => (
            <StaggerItem key={step.step} className="border-t border-white/20 bg-white/[0.035] p-6 flex flex-col justify-between min-h-[220px]">
              <div>
                <span className="font-display text-5xl font-bold text-accent">{step.step}</span>
                <h3 className="mt-8 font-display text-xl font-bold text-white capitalize">{step.title}</h3>
              </div>
              <p className="mt-4 text-sm leading-relaxed text-white/70">{step.body}</p>
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </section>
  )
}
