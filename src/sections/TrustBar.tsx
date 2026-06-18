import { assets } from '../content/content'

export function TrustBar() {
  return (
    <div className="mx-auto flex w-full max-w-[980px] flex-wrap items-center justify-center gap-x-12 gap-y-6 px-5 opacity-80">
      {assets.clients.map((client) => (
        <img key={client.name} src={client.logo} alt={client.name} loading="lazy" className="max-h-8 w-auto object-contain grayscale" />
      ))}
    </div>
  )
}
