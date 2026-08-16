import logoUrl from '../../assets/logo.svg'

/**
 * `className` replaces the sizing rather than merging with it — Tailwind
 * resolves conflicts by stylesheet order, not attribute order, so a baked-in
 * `h-8` would beat a caller's height at random.
 */
export function GamegabyteLogo({ className = 'h-8 w-auto' }: { className?: string }) {
  return <img src={logoUrl} className={className} alt="Gamegabyte" />
}
