import { content, assets } from '../content/content'
import { Marquee } from '../components/motion/Marquee'
import { Container } from '../components/ui/Container'

export function TrustBar() {
  return (
    <section className="border-y border-white/10 bg-black py-12">
      <Container>
        <div className="mb-8 grid gap-4 text-center sm:grid-cols-[1fr_auto_1fr] sm:items-center">
          <p className="text-sm uppercase tracking-[0.18em] text-white/50">{content.trust.title}</p>
          <img src={assets.brand.icon} alt="" className="mx-auto h-9 w-9" loading="lazy" />
          <p className="text-sm uppercase tracking-[0.18em] text-white/50">{content.trust.note}</p>
        </div>
        <Marquee speed={24}>
          {assets.clients.map((client) => (
            <div key={client.name} className="flex h-16 w-64 items-center justify-center">
              <img src={client.logo} alt={client.name} loading="lazy" className="max-h-12 max-w-52 object-contain opacity-70 grayscale" />
            </div>
          ))}
        </Marquee>
      </Container>
    </section>
  )
}
