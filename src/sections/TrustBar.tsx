import { assets, content } from '../content/content'
import { Reveal } from '../components/motion/Reveal'

/**
 * Client marks as a divided panel rather than a centred logo row — two-up on
 * phones, four-up from md, sharing the page's hairline grid.
 */
export function TrustBar() {
  return (
    <Reveal className="mt-14">
      <p className="font-mono text-[9px] uppercase tracking-[0.22em] text-white/48">{content.reel.trust}</p>
      <div className="mt-4.5 grid grid-cols-2 border border-white/11">
        {assets.clients.map((client, i) => (
          <div
            key={client.name}
            className={`flex min-h-27.5 items-center justify-center p-6 ${
              i % 2 === 0 ? 'border-r border-white/11 md:border-r' : 'md:border-r md:border-white/11'
            } ${i < 2 ? 'border-b border-white/11 md:border-b-0' : ''} ${i === 3 ? 'md:border-r-0' : ''}`}
          >
            <img
              src={client.logo}
              alt={client.name}
              loading="lazy"
              className="max-h-9 w-auto object-contain opacity-70 grayscale transition duration-300 hover:opacity-100 hover:grayscale-0"
            />
          </div>
        ))}
      </div>
    </Reveal>
  )
}
