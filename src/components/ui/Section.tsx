import type { ReactNode } from 'react'
import type { SectionId } from '../../content/sections'

/**
 * Every section shares one vertical rhythm and one dark ground. Separation
 * comes from the technical grid and the change of internal structure, not from
 * flat colour slabs or a rule between each one.
 *
 * `id` is typed against the section registry so a typo cannot silently break
 * the rail, the mobile menu and the heading number all at once.
 */
export function Section({
  id,
  children,
  backdrop,
  grid = false,
  className = '',
  ...rest
}: {
  id?: SectionId
  children: ReactNode
  /**
   * Absolutely-positioned art, gradients and glows. These MUST go here rather
   * than in `children`: positioned elements paint above static siblings, so a
   * backdrop passed as a child would wash out the section's own text.
   */
  backdrop?: ReactNode
  /** Draw the faint technical grid behind the content. */
  grid?: boolean
  className?: string
} & Record<`data-${string}`, string | undefined>) {
  return (
    <section
      id={id}
      className={`relative overflow-hidden bg-ink py-19.5 md:py-28 lg:py-32 ${className}`}
      {...rest}
    >
      {grid && (
        <div
          aria-hidden="true"
          className="hud-grid pointer-events-none absolute inset-0 opacity-60 [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]"
        />
      )}
      {backdrop}
      <div className="relative z-10">{children}</div>
    </section>
  )
}

/** Soft accent light used to give a dark section a focal point. */
export function GlowSpot({
  className = '',
  color = 'accent',
}: {
  className?: string
  color?: 'accent' | 'brand'
}) {
  const tint = color === 'accent' ? 'rgb(182 232 2 / 0.14)' : 'rgb(96 31 235 / 0.28)'
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute rounded-full blur-[120px] ${className}`}
      style={{ background: tint }}
    />
  )
}
