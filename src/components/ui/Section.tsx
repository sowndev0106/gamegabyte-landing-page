import type { ReactNode } from 'react'

/**
 * Every section on the page shares one vertical rhythm and one dark ground.
 * Separation comes from the hairline rule and the optional grid texture rather
 * than from flat colour slabs.
 */
export function Section({
  id,
  children,
  backdrop,
  grid = false,
  className = '',
  ...rest
}: {
  id?: string
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
      className={`relative overflow-hidden border-t border-white/8 bg-ink py-20 sm:py-28 lg:py-36 ${className}`}
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
