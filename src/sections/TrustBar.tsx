import { assets } from '../content/content'
import { Reveal } from '../components/motion/Reveal'

export function TrustBar() {
  return (
    <Reveal className="mt-16 border-t border-white/8 pt-10">
      <p className="text-center font-mono text-[11px] uppercase tracking-[0.28em] text-white/55">
        Trusted by teams at
      </p>
      <div className="mt-8 flex flex-wrap items-center justify-center gap-x-14 gap-y-8">
        {assets.clients.map((client) => (
          <img
            key={client.name}
            src={client.logo}
            alt={client.name}
            loading="lazy"
            className="max-h-9 w-auto object-contain opacity-70 grayscale transition duration-300 hover:opacity-100 hover:grayscale-0"
          />
        ))}
      </div>
    </Reveal>
  )
}
