import { content, assets } from '../content/content'
import { Stagger, StaggerItem } from '../components/motion/Stagger'
import { Container } from '../components/ui/Container'

export function Portfolio() {
  return (
    <section id="portfolio" className="bg-ink py-16 sm:py-24 lg:py-32">
      <Container>
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent">CASE STUDIES</p>
          <h2 className="mt-4 font-display text-4xl font-bold uppercase tracking-tight text-white sm:text-5xl">
            {content.portfolio.title}
          </h2>
          <p className="mt-4 text-lg text-white/60">
            {content.portfolio.intro}
          </p>
        </div>

        {/* Tag chips */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {content.portfolio.tags.map((tag) => (
            <span 
              key={tag} 
              className="inline-flex bg-[#e8e8fd] px-3 py-2 text-[13px] font-semibold text-[#5d5c81] uppercase tracking-wider"
            >
              {tag}
            </span>
          ))}
        </div>
        
        <Stagger className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {content.portfolio.items.map((item, index) => (
            <StaggerItem 
              key={item.title} 
              className="group overflow-hidden bg-white text-black"
            >
              <div className="aspect-[16/10] overflow-hidden">
                <img
                  src={assets.portfolio[index]}
                  alt={item.title}
                  loading="lazy"
                  className="w-full h-full object-cover transition duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-8">
                <span className="inline-flex bg-[#e8e8fd] px-3 py-2 text-[13px] font-semibold text-[#5d5c81] uppercase tracking-wider">
                  {item.tag}
                </span>
                <h3 className="mt-4 font-display text-2xl font-bold tracking-tight text-black">{item.title}</h3>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </section>
  )
}
