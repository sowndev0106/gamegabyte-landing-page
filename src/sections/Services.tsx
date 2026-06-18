import { content, assets } from '../content/content'
import { Stagger, StaggerItem } from '../components/motion/Stagger'
import { Container } from '../components/ui/Container'

export function Services() {
  return (
    <div id="services">
      {/* Services Grid Section */}
      <section className="relative overflow-hidden bg-brand px-4 py-16 sm:px-6 sm:py-24 lg:py-32">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-[0.18] pointer-events-none"
          style={{ backgroundImage: `url(${assets.backgrounds.pattern})` }}
        />
        <Container className="relative z-10">
          <div className="mx-auto mb-16 max-w-3xl text-center">
            <h2 className="font-display text-4xl font-bold uppercase tracking-tight text-white sm:text-5xl lg:text-6xl">
              Our services
            </h2>
          </div>
          
          <Stagger className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {content.services.map((service) => (
              <StaggerItem
                key={service.title}
                className="relative flex flex-col justify-between min-h-[275px] bg-white p-8 text-black transition duration-300 hover:-translate-y-1 hover:scale-[1.03]"
              >
                <div>
                  <h3 className="font-display text-2xl font-semibold capitalize tracking-[-0.04em]">
                    {service.title}
                  </h3>
                  <p className="mt-4 text-lg leading-normal text-black/70">
                    {service.body}
                  </p>
                </div>
                <div className="mt-8">
                  <a 
                    href="#portfolio" 
                    className="inline-flex items-center text-sm font-semibold uppercase tracking-wider text-brand hover:text-brand/80"
                  >
                    view our portfolio <span className="ml-1 text-base leading-none">↗</span>
                  </a>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </Container>
      </section>

      {/* Technology Band Section */}
      <section className="bg-gradient-to-b from-[#232323] to-black py-20 px-4 sm:px-6">
        <Container>
          <div className="mx-auto mb-16 max-w-3xl text-center">
            <h2 className="font-display text-4xl font-bold uppercase tracking-tight text-white sm:text-5xl">
              our technology
            </h2>
            <p className="mt-4 text-lg text-white/60">
              We leverage cutting-edge tools and innovative strategies to build immersive gaming experiences from the ground up.
            </p>
          </div>
          
          <Stagger className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {content.technology.map((tech) => (
              <StaggerItem
                key={tech.title}
                className="flex flex-col min-h-[260px] border border-white/10 bg-white/[0.045] p-8"
              >
                <h3 className="font-display text-xl font-bold text-white capitalize">{tech.title}</h3>
                <p className="mt-4 text-sm leading-relaxed text-white/70">{tech.body}</p>
              </StaggerItem>
            ))}
          </Stagger>
        </Container>
      </section>
    </div>
  )
}
