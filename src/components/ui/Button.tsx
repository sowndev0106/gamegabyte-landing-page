import { motion } from 'motion/react'
import type { ReactNode } from 'react'
import { ArrowUpRight } from './ArrowUpRight'

export function Button({
  children,
  href = '#',
  variant = 'accent',
  showArrow = true,
  className = '',
}: {
  children: ReactNode
  href?: string
  /**
   * `accent` / `light` / `ghost` sit on dark backgrounds.
   * `dark` is the solid variant for light or lime backgrounds.
   */
  variant?: 'accent' | 'light' | 'ghost' | 'dark'
  showArrow?: boolean
  className?: string
}) {
  const classes = {
    accent: 'border-accent bg-accent text-ink shadow-[0_0_28px_rgba(182,232,2,0.18)]',
    light: 'border-white bg-white text-ink',
    ghost: 'border-white/70 bg-transparent text-white hover:bg-white/10',
    dark: 'border-ink bg-ink text-white hover:bg-ink/90',
  }[variant]

  return (
    <motion.a
      href={href}
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.98 }}
      className={`inline-flex min-h-14 items-center justify-center gap-2 border px-8 py-4 text-base font-bold uppercase transition-colors ${classes} ${className}`}
    >
      {children}
      {showArrow && <ArrowUpRight className="h-4 w-4" />}
    </motion.a>
  )
}
