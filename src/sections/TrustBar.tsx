import { content, assets } from '../content/content'
import { Marquee } from '../components/motion/Marquee'
import { Container } from '../components/ui/Container'

const partners = ['Gameloft & Partners', 'Formerly From', 'AAA Studios', 'Mobile Titles', 'Indie Developers', 'Publishers']

export function TrustBar() {
  return (
    <section className="border-y border-white/10 bg-black py-12">
      <Container>
        <div className="mb-8 grid gap-4 text-center sm:grid-cols-[1fr_auto_1fr] sm:items-center">
          <p className="text-sm uppercase tracking-[0.18em] text-white/50">{content.trust.title}</p>
          <img src={assets.icon} alt="" className="mx-auto h-9 w-9" loading="lazy" />
          <p className="text-sm uppercase tracking-[0.18em] text-white/50">{content.trust.note}</p>
        </div>
        <Marquee speed={24}>
          {partners.map((p) => (
            <span key={p} className="font-display text-2xl font-bold uppercase text-white/42">
              {p}
            </span>
          ))}
        </Marquee>
      </Container>
    </section>
  )
}
